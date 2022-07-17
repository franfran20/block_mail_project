import { useEffect, useRef, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { blockMailAbi, nftAbi, tokenAbi } from "../constants/abi";
import style from "../styles/components/sendMail.module.css";
import { Web3Storage } from "web3.storage";
import { connectLit, encrypt } from "../utils/lit";
import { contractAddress } from "../constants/networkMapping";
import { disconnectWeb3 } from "lit-js-sdk";

export default function SendMail() {
  const [message, setMessage] = useState();
  const [maticAmount, setMaticAmount] = useState("0");
  const [receiver, setReceiver] = useState("");
  const [encryptedLink, setEncryptedLink] = useState("");
  const [mailId, setMailId] = useState();
  const [title, setTitle] = useState("");
  const {
    Moralis,
    account: connectedAcct,
    chainId,
    isWeb3Enabled,
  } = useMoralis();

  useEffect(() => {
    connectLit();
  }, [isWeb3Enabled]);

  const chainID = parseInt(chainId).toString();
  const contractAddrr = contractAddress[chainID];
  const WEB3_STOARGE_TOKEN = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;

  function makeStorageClient() {
    return new Web3Storage({ token: WEB3_STOARGE_TOKEN });
  }

  function addPublicGateway(cid, mailId) {
    return "https://" + cid + ".ipfs.dweb.link/" + mailId + ".json";
  }

  console.log(contractAddrr);

  const { runContractFunction: getMailId } = useWeb3Contract({
    abi: blockMailAbi,
    contractAddress: contractAddrr,
    functionName: "getMailId",
    params: {},
  });

  async function handleMailId() {
    const NEXT_MAIL_ID = (await getMailId()).toString();
    setMailId(parseInt(NEXT_MAIL_ID) + 1);
  }

  function callHandleMailId() {
    handleMailId();
  }

  useEffect(() => {
    callHandleMailId();
  }, [isWeb3Enabled]);

  async function makeFileObjectsAndStore(_message) {
    await disconnectWeb3();
    console.log(mailId);
    const packagedData = await encrypt(_message, mailId.toString());
    const blob = new Blob([JSON.stringify(packagedData)], {
      type: "application/json",
    });
    const files = [new File([blob], `${mailId}.json`)];

    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log(`stored mail ${mailId} with cid:`, cid);
    const publicLink = addPublicGateway(cid, mailId).toString();
    setEncryptedLink(publicLink);
  }

  const { error, runContractFunction: sendBlockMail } = useWeb3Contract({
    abi: blockMailAbi,
    contractAddress: contractAddrr,
    functionName: "sendBlockMail",
    params: {
      _message: encryptedLink,
      _title: title,
      _receiver: receiver,
    },
    msgValue: maticAmount,
  });

  const handleError = (err) => {
    if (error) {
      if (error.data) {
        if (error.data.message.includes("Not allowed to mail user")) {
          return (
            <p className={style.error}>
              This address has not given you permission to mail them.
            </p>
          );
        }
      }
    }
  };

  return (
    <>
      <div className={style.sendMailContainer}>
        <h2 className={style.header}>Construct Mail</h2>

        <div className={style.title}>
          <p>Title:</p>

          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title for messsage here.."
          />
        </div>
        <div className={style.title}>
          <p>Receiver:</p>
          <input
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Receiver Address..."
          />
        </div>

        <textarea
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write message here..."
          className={style.messageInput}
        />

        <div className={style.params}>
          <h3>Options</h3>
          <div className={style.flex}>
            <p>Matic Amount:</p>
            <input
              onChange={(e) => setMaticAmount(e.target.value * 10 ** 18)}
              type="number"
              placeholder="Input Matic amount..."
              className={style.maticAmount}
            />
          </div>
          <button
            className={style.encrypt}
            onClick={async () => await makeFileObjectsAndStore(message)}
          >
            Encrypt
          </button>
          <div className={style.encryptedLink}>
            <h3>
              EncryptedLink:
              <span>
                {encryptedLink
                  ? encryptedLink
                  : "Click encrypt and wait to sign tx"}
              </span>
            </h3>
          </div>

          <div className={style.encryptedLinkDIV}>
            <p>Input encrypted link below:</p>
            <input
              onChange={(e) => setEncryptedLink(e.target.value)}
              placeholder="Input Encrypted link here..."
              className={style.maticAmount}
            />
          </div>
        </div>
        {error ? handleError(error) : ""}
        <div className={style.buttons}>
          <button
            className={style.store}
            onClick={async () =>
              await sendBlockMail({
                onSucess: async (tx) => await tx.wait(2),
              })
            }
          >
            Send Mail
          </button>
        </div>
      </div>
    </>
  );
}

import LitJsSdk, { LitNodeClient } from "lit-js-sdk";
import { canUserDecryptAbi } from "../constants/abi";
import { contractAddress } from "../constants/networkMapping";

const client = new LitJsSdk.LitNodeClient({});
const chain = "mumbai";
const contractAddr = contractAddress["80001"];

export async function connectLit() {
  await client.connect({ debug: false });
  console.log("Connected!");
  window.litNodeClient = client;
}

export async function encrypt(stringMessage, mailId) {
  if (!litNodeClient) {
    await connectLit();
  }

  const evmContractConditions = [
    {
      contractAddress: contractAddr,
      functionName: "canUserDecrypt",
      functionParams: [mailId, ":userAddress"],
      functionAbi: canUserDecryptAbi,
      chain: "mumbai",
      returnValueTest: {
        key: "",
        comparator: "=",
        value: "true",
      },
    },
  ];

  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
  const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
    stringMessage
  );
  console.log("Saving encryption key.....");
  const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
    evmContractConditions,
    symmetricKey,
    authSig,
    chain,
  });
  const encryptedKey = LitJsSdk.uint8arrayToString(
    encryptedSymmetricKey,
    "base16"
  );
  console.log("Packaging data.....");
  const packagedData = {
    encryptedString: Buffer.from(await encryptedString.arrayBuffer()).toString(
      "hex"
    ),
    encryptedSymmetricKey: encryptedKey,
    evmContractConditions,
  };
  console.log(Buffer.from(await encryptedString.arrayBuffer()).toString("hex"));
  return packagedData;
}

export async function decryptMessage(messageLink, messageHexString) {
  if (!window.litNodeClient) {
    await connectLit();
  }
  console.log("decrypting message....");
  // const symmetricKey = await getEncryptedKey(messageLink);

  const data = await fetch(messageLink);
  console.log("mlink", messageLink);
  const dataOnIpfs = JSON.parse(await data.text());

  console.log("getting all the data..");
  console.log("Data on ipfs", dataOnIpfs);
  const evmContractConditions = dataOnIpfs.evmContractConditions;
  console.log("evm contract cond", evmContractConditions);

  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

  const encryptedSymmetricKey = dataOnIpfs.encryptedSymmetricKey;
  const getEncryptionKeyParams = {
    evmContractConditions,
    toDecrypt: encryptedSymmetricKey,
    chain,
    authSig,
  };
  console.log("encrypted key", encryptedSymmetricKey);
  // symmetric key
  const symmetricKey = await window.litNodeClient.getEncryptionKey(
    getEncryptionKeyParams
  );
  console.log("Gotten key", symmetricKey);
  const decryptedString = await LitJsSdk.decryptString(
    new Blob([hexStringToArrayBuffer(messageHexString)]),
    symmetricKey
  );
  console.log("decryptedString", decryptedString);
  return decryptedString;
}

function hexStringToArrayBuffer(hexString) {
  hexString = hexString.replace(/^0x/, "");
  if (hexString.length % 2 != 0) {
    // eslint-disable-next-line no-console
    console.log(
      "WARNING: expecting an even number of characters in the hexString"
    );
  }
  const bad = hexString.match(/[G-Z\s]/i);
  if (bad) {
    // eslint-disable-next-line no-console
    console.log("WARNING: found non-hex characters", bad);
  }
  const pairs = hexString.match(/[\dA-F]{2}/gi);
  const integers = pairs.map(function (s) {
    return parseInt(s, 16);
  });
  const array = new Uint8Array(integers);
  return array.buffer;
}

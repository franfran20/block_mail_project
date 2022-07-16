import { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { blockMailAbi } from "../constants/abi";
import { contractAddress } from "../constants/networkMapping";
import styles from "../styles/components/accessControl.module.css";

export default function AccessControl() {
  const [allowAddress, setAllowAddress] = useState("");
  const [disallowAddress, setDisallowAddress] = useState("");
  const { chainId } = useMoralis();
  const chainID = parseInt(chainId).toString();
  const contractAddrr = contractAddress[chainID];

  const { runContractFunction: allowSender } = useWeb3Contract({
    abi: blockMailAbi,
    contractAddress: contractAddrr,
    functionName: "allowSender",
    params: {
      _addressToAllow: allowAddress,
    },
  });

  const { runContractFunction: disallowSender } = useWeb3Contract({
    abi: blockMailAbi,
    contractAddress: contractAddrr,
    functionName: "disallowSender",
    params: {
      _addressToDisallow: disallowAddress,
    },
  });

  return (
    <div className={styles.accessControl}>
      <h1>ACCESS CONTROL</h1>
      <p>
        With access control YOU have the power to decide who gets to send you
        mails and who does not. This means you have the power to say choose who
        you want to receive mails from.
      </p>

      <h3 className={styles.header}>Control Conditions</h3>

      <h2>Allow User</h2>
      <input
        onChange={(e) => setAllowAddress(e.target.value)}
        placeholder="Allow User...."
      />
      <button
        onClick={async () =>
          await allowSender({ onSuccess: async (tx) => await tx.wait(1) })
        }
      >
        Allow
      </button>

      <h2>Disallow User</h2>
      <input
        onChange={(e) => setDisallowAddress(e.target.value)}
        placeholder="Disallow User...."
      />
      <button
        onClick={async () =>
          await disallowSender({ onSuccess: async (tx) => await tx.wait(2) })
        }
      >
        Disallow
      </button>
    </div>
  );
}

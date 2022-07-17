import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { getAllMailData, getAllMailId } from ".";
import styles from "../styles/components/MailInfo.module.css";
import { decryptMessage } from "../utils/lit";

export default function MailInfo({ mailData }) {
  const [decryptedMessage, setDecryptedMessage] = useState();
  const { isWeb3Enabled, Moralis } = useMoralis();

  const fetchDecryptedMessage = async () => {
    const res = await fetch(mailData.result[0].message);
    const data = await res.json();
    console.log(data);
    const encryptedString = data.encryptedString;
    setDecryptedMessage(encryptedString);
  };

  useEffect(() => {
    fetchDecryptedMessage();
  }, [isWeb3Enabled]);

  console.log(decryptedMessage);

  async function decrypt() {
    const decryptedString = await decryptMessage(
      mailData.result[0].message,
      decryptedMessage
    );
    setDecryptedMessage(decryptedString);
  }

  return (
    <div className={styles.MailInfoContainer}>
      <div className={styles.info}>
        <div className={styles.fromAndMatic}>
          <div>
            <p>From:</p>
            <span>{mailData.result[0].from}</span>
          </div>
          <div>
            <p>MATIC:</p>
            <span>{Moralis.Units.FromWei(mailData.result[0].nativeAsset)}</span>
          </div>
        </div>

        <div className={styles.titleDiv}>
          <p>Title:</p>
          <span>{mailData.result[0].title}</span>
        </div>

        <div className={styles.message}>
          <h2>Message</h2>
          <div>{decryptedMessage} </div>
          <button onClick={decrypt}>Sign {"&"} Decrypt Message</button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getAllMailId();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const mailData = await getAllMailData(params.id);
  return {
    props: {
      mailData,
    },
  };
}

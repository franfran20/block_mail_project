import styles from "../styles/Home.module.css";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { BlockMailBox } from "../components/BlockMailBox";
import { NoMailsYet } from "../components/NoMailsYet";

export async function getAllMailId() {
  const fetchURL = process.env.NEXT_PUBLIC_GET_MAIL_ID_URL;
  const res = await fetch(fetchURL);
  const allMails = await res.json();
  console.log(allMails);

  return allMails.result.map((mail) => {
    return {
      params: {
        id: mail.mailID,
      },
    };
  });
}

export async function getAllMailData(id) {
  const fetchURL = `${
    process.env.NEXT_PUBLIC_GET_ALL_MAIL_DATA_URL + "&id=" + id
  }`;
  const res = await fetch(fetchURL);
  const singleMail = await res.json();
  return {
    id,
    ...singleMail,
  };
}

export default function Home() {
  const { account } = useMoralis();
  const { isLoading, data: mails } = useMoralisQuery(
    "AllUserMailsss",
    (query) => query.equalTo("receiver", account).descending("mailID")
  );

  console.log(mails);
  const { Moralis } = useMoralis();
  return (
    <div className={styles.BlockMailBoxContainer}>
      <h2 className={styles.header}>Recent BlockMails</h2>
      <div>
        {isLoading ? (
          <p className={styles.isLoading}>Loading.....</p>
        ) : mails.length == 0 ? (
          <NoMailsYet />
        ) : (
          <div>
            {mails.map((mail) => {
              const { mailID, title, message, receiver, from, nativeAsset } =
                mail.attributes;
              return (
                <BlockMailBox
                  key={mailID}
                  mailID={mailID}
                  message={message}
                  receiver={receiver}
                  from={from}
                  nativeAsset={Moralis.Units.FromWei(nativeAsset)}
                  title={title}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

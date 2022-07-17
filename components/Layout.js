import { useMoralis } from "react-moralis";
import styles from "../styles/components/Layout.module.css";
import { truncateStr } from "../utils/helperFunctions";
import Head from "next/head";
import { connectLit } from "../utils/lit";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export const Layout = ({ children }) => {
  const { isWeb3Enabled, enableWeb3, account, Moralis, deactivateWeb3 } =
    useMoralis();
  const [userAddress, setUserAddress] = useState();

  async function handleConnect() {
    await enableWeb3();
    await connectLit();
  }

  useEffect(() => {
    if (window.localStorage.getItem("connected")) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found");
      }
    });
  }, []);

  let address = account;

  if (isWeb3Enabled) {
    return (
      <React.Fragment>
        <div>
          <Head>
            <title>Block Mail Test 1</title>
            <link rel="icon" href="/newlogo.png" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins&family=Press+Start+2P&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins&family=Press+Start+2P&display=swap"
              rel="stylesheet"
            />
          </Head>
          <div className={styles.layoutContaier}>
            <nav className={styles.nav}>
              <Link href="https://twitter.com/FranFran_E">
                <img src="twitter1.png" className={styles.twitter} />
              </Link>
              <p className={styles.formattedAddr}>{truncateStr(address, 16)}</p>
            </nav>

            <div className={styles.sideBar}>
              <div>
                <img src="newlogo.png" />
                <h3>BlockMail.</h3>
              </div>
              <Link href="/">Recent Mails</Link>
              <Link href="/accessControl">Access Control</Link>
              <Link href="/sendMail">Send BlockMail</Link>
            </div>

            <div className={styles.content}>{children}</div>
            <footer></footer>
          </div>
          <div className={styles.smallDevice}>
            <img src="newlogo.png" className="img" />
            <h2>Device to screen size too small.</h2>
            <p>
              Please use a device with a bigger screen e.g laptop, desktop e.t.c
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>
          <Head>
            <title>Block Mail Test 1</title>
            <link rel="icon" href="/newlogo.png" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins&family=Press+Start+2P&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins&family=Press+Start+2P&display=swap"
              rel="stylesheet"
            />
          </Head>
          <div className={styles.layoutContaier}>
            <div className={styles.web3notEnabled}>
              <img src="newlogo.png" />
              <div>
                <h1>Welcome to BlockMail</h1>
                <h2>
                  The secure way to send and receive mails on the decentralized
                  web.
                </h2>
                <button onClick={handleConnect}>Connect</button>
              </div>
            </div>
          </div>
          <div className={styles.smallDevice}>
            <img src="newlogo.png" className={styles.img} />
            <h2>Device to screen size too small.</h2>
            <p>
              Please use a device with a bigger screen e.g laptop, desktop e.t.c
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

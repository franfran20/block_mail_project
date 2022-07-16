import Link from "next/link";
import { useMoralis } from "react-moralis";
import { ADDRESS_ZERO } from "../constants/AddressZero";
import styles from "../styles/Home.module.css";

export const BlockMailBox = (props) => {
  const { isWeb3Enabled } = useMoralis();

  if (isWeb3Enabled) {
    return (
      <Link href={`/${mailID}`}>
        <div className={styles.blockMailBox}>
          <img
            className={styles.logoMessage}
            src="newlogo.png"
            width="100px"
            height="60px"
          />
          <table>
            <tbody>
              <tr className={styles.subHeader}>
                <th>ID</th>
                <th>MATIC</th>
                <th>From</th>
              </tr>
              <tr className={styles.subText}>
                <td>#{props.mailID}</td>
                <td>{props.nativeAsset == 0 ? "None" : nativeAsset}</td>

                <td>{props.from}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Link>
    );
  }

  if (!isWeb3Enabled) {
    return <div>NO connection</div>;
  }
};

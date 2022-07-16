import Link from "next/link";
import { useMoralis } from "react-moralis";
import { ADDRESS_ZERO } from "../constants/AddressZero";
import styles from "../styles/Home.module.css";

export const BlockMailBox = ({
  mailID,
  message,
  title,
  reciever,
  from,
  nativeAsset,
}) => {
  const { isWeb3Enabled } = useMoralis();

  if (isWeb3Enabled) {
    return (
      <Link className={styles.blockMailBox} href={`/${mailID}`}>
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
              <td>#{mailID}</td>
              <td>{nativeAsset == 0 ? "None" : nativeAsset}</td>

              <td>{from}</td>
            </tr>
          </tbody>
        </table>
      </Link>
    );
  }

  if (!isWeb3Enabled) {
    return <div>NO connection</div>;
  }
};

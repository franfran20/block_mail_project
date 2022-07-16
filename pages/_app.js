import { MoralisProvider, useMoralis } from "react-moralis";
import { Layout } from "../components/Layout";
import "../styles/globals.css";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoralisProvider>
  );
}

export default MyApp;

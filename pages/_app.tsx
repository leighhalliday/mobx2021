import { AppProps } from "next/app";
// import { BlockchainStore, StoreProvider } from "src/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

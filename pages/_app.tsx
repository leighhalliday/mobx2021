import { AppProps } from "next/app";
import { BlockchainStore, StoreProvider } from "src/store";
import "../styles/globals.css";

const store = new BlockchainStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;

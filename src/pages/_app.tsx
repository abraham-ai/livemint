import React, { useState, useContext } from "react";
import type { AppProps } from "next/app";
import AppContext from "context/AppContext";
import "styles/globals.css";
import WalletProviderGoerli from "providers/WalletProviderGoerli";

function App({ Component, pageProps }: AppProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        username,
        setUsername,
      }}
    >
      <WalletProviderGoerli>
        <Component {...pageProps} />
      </WalletProviderGoerli>
    </AppContext.Provider>
  );
}

export default App;

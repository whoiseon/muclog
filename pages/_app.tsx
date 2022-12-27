import type { AppProps } from 'next/app';
import GlobalStyle from "styles/globals";
import {ThemeProvider} from "@emotion/react";
import {useEffect, useState} from "react";
import {darkTheme, lightTheme} from "styles/theme";

import {onAuthStateChanged} from "@firebase/auth";
import {auth} from "lib/firebase";

import { useMediaQuery } from "react-responsive";

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery({ maxWidth: 768})

  const [isDark, setIsDark] = useState(true);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        {
          init
            ? (
                <Component
                  {...pageProps}
                  isDark={isDark}
                  setIsDark={setIsDark}
                  isLoggedIn={isLoggedIn}
                  isMobile={isMobile}
                />
            )
            : "Initializing"
        }
      </ThemeProvider>
    </>
  )
}

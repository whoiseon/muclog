
import type { AppProps } from 'next/app';
import GlobalStyle from "styles/globals";
import {ThemeProvider} from "@emotion/react";
import {useEffect, useLayoutEffect, useState} from "react";
import {darkTheme, lightTheme} from "styles/theme";
import {Provider, useSelector} from "react-redux";
import store, {RootState} from "store";

import { useMediaQuery } from "react-responsive";
import {onAuthStateChanged, User} from "@firebase/auth";
import {auth} from "lib/firebase";

import Loading from "components/common/Loading";
import MobileLayout from "components/mobile/Layout";
import PCLayout from "components/pc/Layout";
import useLocalStorage from "hooks/useLocalStorage";

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [isDark, setIsDark] = useState(true);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [darkThemeStorage, setDarkThemeStorage] = useLocalStorage("darkTheme", true);

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

  useEffect(() => {
    setIsDark(darkThemeStorage);
  }, []);

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyle />
          {
            init
              ? isMobile
                ? (
                  <MobileLayout
                    isLoggedIn={isLoggedIn}
                    setIsDark={setIsDark}
                    isDark={isDark}
                  >
                    <Component
                      {...pageProps}
                      isDark={isDark}
                      setIsDark={setIsDark}
                      isLoggedIn={isLoggedIn}
                      isMobile={isMobile}
                    />
                  </MobileLayout>
                )
                : (
                  <PCLayout
                    isLoggedIn={isLoggedIn}
                    isDark={isDark}
                    setIsDark={setIsDark}
                  >
                    <Component
                      {...pageProps}
                      isDark={isDark}
                      setIsDark={setIsDark}
                      isLoggedIn={isLoggedIn}
                      isMobile={isMobile}
                    />
                  </PCLayout>
                )
              : <Loading
                isDark={isDark}
              />
          }
        </ThemeProvider>
      </Provider>
    </>
  )
}

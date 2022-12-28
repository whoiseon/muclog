import type { AppProps } from 'next/app';
import GlobalStyle from "styles/globals";
import {ThemeProvider} from "@emotion/react";
import {useEffect, useState} from "react";
import {darkTheme, lightTheme} from "styles/theme";
import {Provider} from "react-redux";
import store from "store";

import { useMediaQuery } from "react-responsive";
import {onAuthStateChanged, User} from "@firebase/auth";
import {auth} from "lib/firebase";

import Loading from "components/common/Loading";
import MobileLayout from "components/mobile/Layout";
import PCLayout from "components/pc/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const [isDark, setIsDark] = useState(true);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserInfo(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
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
                    userInfo={userInfo}
                  >
                    <Component
                      {...pageProps}
                      isDark={isDark}
                      setIsDark={setIsDark}
                      isLoggedIn={isLoggedIn}
                      isMobile={isMobile}
                      userInfo={userInfo}
                    />
                  </MobileLayout>
                )
                : (
                  <PCLayout
                    isLoggedIn={isLoggedIn}
                    userInfo={userInfo}
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
              : <Loading />
          }
        </ThemeProvider>
      </Provider>
    </>
  )
}

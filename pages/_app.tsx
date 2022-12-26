import type { AppProps } from 'next/app';
import GlobalStyle from "styles/globals";
import {ThemeProvider} from "@emotion/react";
import {useState} from "react";
import {darkTheme, lightTheme} from "styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState(true);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Component {...pageProps} isDark={isDark} setIsDark={setIsDark} />
      </ThemeProvider>
    </>
  )
}

import {Dispatch, SetStateAction} from "react";

import GlobalHeader from "components/pc/Layout/GlobalHeader";

interface LayoutProps {
  children: JSX.Element,
  isLoggedIn: boolean,
  isDark: boolean,
  setIsDark: Dispatch<SetStateAction<boolean>>,
}

export default function Layout({ children, isDark, setIsDark, isLoggedIn }: LayoutProps) {
  return isLoggedIn
    ? (
      <>
        <GlobalHeader
          isDark={isDark}
          setIsDark={setIsDark}
        />
        <main>
          { children }
        </main>
      </>
    )
    : children
}
import {Dispatch, SetStateAction, useState} from "react";

import GlobalHeader from "components/mobile/Layout/GlobalHeader";
import {Main, MenuModal} from "components/mobile/Layout/styles";
import Menus from "components/mobile/Layout/Menus";
import {User} from "@firebase/auth";

interface LayoutProps {
  children: JSX.Element,
  isLoggedIn: boolean,
  isDark: boolean,
  setIsDark: Dispatch<SetStateAction<boolean>>,
  userInfo: User | null
}

export default function Layout({ children, isLoggedIn, isDark, setIsDark, userInfo }: LayoutProps) {
  const [menuActive, setMenuActive] = useState(false);

  return isLoggedIn
    ? (
      <>
        <GlobalHeader
          setMenuActive={setMenuActive}
        />
        <Main>
          { children }
        </Main>
        <MenuModal data-layout="mobile-menu" menuActive={menuActive}>
          <Menus
            setMenuActive={setMenuActive}
            setIsDark={setIsDark}
            isDark={isDark}
            userInfo={userInfo}
          />
        </MenuModal>
      </>
    )
    : children
}
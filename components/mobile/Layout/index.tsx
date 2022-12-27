import GlobalHeader from "components/mobile/Layout/GlobalHeader";
import {Main, MenuModal} from "components/mobile/Layout/styles";
import {useState} from "react";
import Menus from "components/mobile/Layout/Menus";

interface LayoutProps {
  children: JSX.Element,
  isLoggedIn: boolean
}

export default function Layout({ children, isLoggedIn }: LayoutProps) {
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
        <MenuModal menuActive={menuActive}>
          <Menus setMenuActive={setMenuActive} />
        </MenuModal>
        {/*<footer>*/}
        {/*  footer*/}
        {/*</footer>*/}
      </>
    )
    : children
}
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import GlobalHeader from "components/mobile/Layout/GlobalHeader";
import {Main, MenuModal} from "components/mobile/Layout/styles";
import Menus from "components/mobile/Layout/Menus";
import {AppDispatch} from "store";
import {auth} from "lib/firebase";
import {fetchUserInfoRequest} from "store/slices/user/userSlice";
import {UserRequestParams} from "store/slices/user/type";
import {fetchLogsRequest} from "store/slices/log/logSlice";

interface LayoutProps {
  children: JSX.Element,
  isLoggedIn: boolean,
  isDark: boolean,
  setIsDark: Dispatch<SetStateAction<boolean>>,
}

export default function Layout({ children, isLoggedIn, isDark, setIsDark }: LayoutProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      dispatch(fetchUserInfoRequest({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email
      } as UserRequestParams))
    }
  }, []);

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
          />
        </MenuModal>
      </>
    )
    : children
}
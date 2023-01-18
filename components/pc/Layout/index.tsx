import {Dispatch, SetStateAction, useEffect} from "react";

import GlobalHeader from "components/pc/Layout/GlobalHeader";
import {useDispatch} from "react-redux";
import {AppDispatch} from "store";
import {auth} from "lib/firebase";
import {fetchUserInfoRequest} from "store/slices/user/userSlice";
import {UserRequestParams} from "store/slices/user/type";
import {Main} from "components/pc/Layout/styles";

interface LayoutProps {
  children: JSX.Element,
  isLoggedIn: boolean,
  isDark: boolean,
  setIsDark: Dispatch<SetStateAction<boolean>>,
}

export default function Layout({ children, isDark, setIsDark, isLoggedIn }: LayoutProps) {
  const dispatch = useDispatch<AppDispatch>();

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
          isDark={isDark}
          setIsDark={setIsDark}
        />
        <Main>
          { children }
        </Main>
      </>
    )
    : children
}
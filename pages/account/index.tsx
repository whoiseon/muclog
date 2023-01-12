import {useCallback} from "react";
import MobileUserFeed from "components/mobile/Feed";
import MobileAuth from "components/mobile/Auth";
import PCProfile from "components/pc/Profile";
import PCAuth from "components/pc/Auth";
import MobileMyAccount from "components/mobile/MyAccount";
import Head from "next/head";
import {useSelector} from "react-redux";
import {RootState} from "store";

interface HomeProps {
  isLoggedIn: boolean,
  isMobile: boolean,
}

export default function Account({ isLoggedIn, isMobile }: HomeProps) {
  const { displayName } = useSelector((state: RootState) => state.user);

  const handleMobileDetect = useCallback(() => {
    if (isMobile) {
      if (isLoggedIn) {
        return <MobileMyAccount />
      } else {
        return <MobileAuth />
      }
    } else {
      if (isLoggedIn) {
        return <PCProfile />
      } else {
        return <PCAuth />
      }
    }
  }, [isMobile, isLoggedIn]);

  return (
    <>
      <Head>
        <title>Muclog { displayName }의 계정</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        handleMobileDetect()
      }
    </>
  );
};

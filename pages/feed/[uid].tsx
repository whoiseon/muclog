import {useCallback} from "react";
import Head from 'next/head';

import MobileUserFeed from "components/mobile/Feed";
import MobileAuth from "components/mobile/Auth";
import PCUserFeed from "components/pc/Feed";
import PCAuth from "components/pc/Auth";
import {useSelector} from "react-redux";
import {RootState} from "store";

interface HomeProps {
  isLoggedIn: boolean,
  isMobile: boolean,
}

export default function Uid({ isLoggedIn, isMobile }: HomeProps) {
  const { displayName } = useSelector((state: RootState) => state.user);

  const handleMobileDetect = useCallback(() => {
    if (isMobile) {
      if (isLoggedIn) {
        return <MobileUserFeed />
      } else {
        return <MobileAuth />
      }
    } else {
      if (isLoggedIn) {
        return <PCUserFeed />
      } else {
        return <PCAuth />
      }
    }
  }, [isMobile, isLoggedIn]);

  return (
    <>
      <Head>
        <title>Muclog - {displayName} λμ νΌλ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        handleMobileDetect()
      }
    </>
  )
}

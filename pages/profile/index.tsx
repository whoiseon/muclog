import {useCallback} from "react";
import Head from 'next/head';

import MobileProfile from "components/mobile/Profile";
import MobileAuth from "components/mobile/Auth";
import PCProfile from "components/pc/Profile";
import PCAuth from "components/pc/Auth";

interface HomeProps {
  isLoggedIn: boolean,
  isMobile: boolean,
}

export default function Home({ isLoggedIn, isMobile }: HomeProps) {
  const handleMobileDetect = useCallback(() => {
    if (isMobile) {
      if (isLoggedIn) {
        return <MobileProfile />
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
        <title>Muclog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        handleMobileDetect()
      }
    </>
  )
}

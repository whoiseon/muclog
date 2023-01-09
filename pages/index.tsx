import {Dispatch, SetStateAction, useCallback} from "react";
import Head from 'next/head';

import {User} from "@firebase/auth";

import MobileRoot from "components/mobile/Root";
import MobileAuth from "components/mobile/Auth";
import PCRoot from "components/pc/Root";
import PCAuth from "components/pc/Auth";

interface HomeProps {
  isLoggedIn: boolean,
  isMobile: boolean,
}

export default function Home({ isLoggedIn, isMobile }: HomeProps) {
  const handleMobileDetect = useCallback(() => {
    if (isMobile) {
      if (isLoggedIn) {
        return <MobileRoot />
      } else {
        return <MobileAuth />
      }
    } else {
      if (isLoggedIn) {
        return <PCRoot />
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

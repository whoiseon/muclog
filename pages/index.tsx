import {Dispatch, SetStateAction} from "react";
import Head from 'next/head';

import Root from "components/Root";
import Auth from "components/Auth";

interface HomeProps {
  isLoggedIn: boolean,
  isMobile: boolean,
}

export default function Home({ isLoggedIn, isMobile }: HomeProps) {
  return (
    <>
      <Head>
        <title>Muclog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        isLoggedIn
          ? <Root />
          : <Auth />
      }
    </>
  )
}

import {Dispatch, SetStateAction, useState} from "react";
import Head from 'next/head';

import { auth } from "lib/firebase";
import Root from "components/Root";
import Auth from "components/Auth";

interface HomeProps {
  isDark: boolean,
  setIsDark: Dispatch<SetStateAction<boolean>>
}

export default function Home({ isDark, setIsDark }: HomeProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

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

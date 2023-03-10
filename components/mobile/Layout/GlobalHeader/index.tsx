import Image from "next/image";
import Link from "next/link";

import {Header, Icon, Logo, Menu, Search} from "components/mobile/Layout/GlobalHeader/styles";
import {Dispatch, SetStateAction, useCallback, useEffect} from "react";
import {useRouter} from "next/router";

interface GlobalHeaderProps {
  setMenuActive: Dispatch<SetStateAction<boolean>>,
  setSearchActive: Dispatch<SetStateAction<boolean>>
}

export default function GlobalHeader({ setMenuActive, setSearchActive }: GlobalHeaderProps) {
  const router = useRouter();

  const handleShowMenu = useCallback(() => {
    setMenuActive((prev) => !prev)
  }, []);

  const handleShowSearch = useCallback(() => {
    setSearchActive((prev) => !prev);
  }, []);

  return (
    <Header data-layout="global-header">
      <Search>
        <button name="icon" onClick={handleShowSearch}>
          <Icon>
            <Image
              src="/image/icon/search-icon.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </Icon>
        </button>
      </Search>
      <Logo>
        <Link href="/">
          <Image
            src="/image/logo/logo.svg"
            alt="Logo"
            priority
            width={44}
            height={34}
          />
        </Link>
      </Logo>
      <Menu>
        <button name="icon" onClick={handleShowMenu}>
          <Icon>
            <Image
              src="/image/icon/menu-icon.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </Icon>
        </button>
      </Menu>
    </Header>
  );
};

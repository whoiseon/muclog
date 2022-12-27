import Image from "next/image";
import Link from "next/link";

import {Header, Icon, Logo, Menu, Search} from "components/mobile/Layout/GlobalHeader/styles";
import {Dispatch, SetStateAction, useCallback} from "react";

interface GlobalHeaderProps {
  setMenuActive: Dispatch<SetStateAction<boolean>>
}

export default function GlobalHeader({ setMenuActive }: GlobalHeaderProps) {
  const handleShowMenu = useCallback(() => {
    setMenuActive((prev) => !prev)
  }, []);

  return (
    <Header data-layout="global-header">
      <Search>
        <button name="icon">
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
            width={46}
            height={24}
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

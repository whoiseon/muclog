import Link from "next/link";
import {useRouter} from "next/router";
import {Dispatch, SetStateAction, useCallback} from "react";

import {ArrowIcon, CloseButton, Icon, MyName, Wrapper} from "components/mobile/Layout/Menus/styles";
import Image from "next/image";

import {signOut} from "@firebase/auth";
import {auth} from "lib/firebase";

interface MenusProps {
  setMenuActive: Dispatch<SetStateAction<boolean>>
}

export default function Menus({ setMenuActive }: MenusProps) {
  const router = useRouter();

  const handleCloseMenu = useCallback(() => {
    setMenuActive(false);
  }, []);

  const onLogOutClick = useCallback(async () => {
    await signOut(auth);
    await router.push("/");
    setMenuActive(false);
  }, []);

  return (
    <Wrapper>
      <MyName>
        Profile
      </MyName>
      <CloseButton onClick={handleCloseMenu}>
        <Image
          src="/image/icon/dark/close-dark-icon.svg"
          alt="Close"
          width={18}
          height={18}
        />
      </CloseButton>
      <ul>
        <li>
          <Link href="/profile">
            <div>
              <Icon>
                <Image
                  src="/image/icon/account-icon.svg"
                  alt="Account"
                  width={18}
                  height={18}
                />
              </Icon>
              <span>계정</span>
            </div>
            <ArrowIcon>
              <Image
                src="/image/icon/menu-arrow-icon.svg"
                alt="Menu Arrow"
                width={18}
                height={12}
              />
            </ArrowIcon>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <div>
              <Icon>
                <Image
                  src="/image/icon/profile-icon.svg"
                  alt="Profile"
                  width={18}
                  height={18}
                />
              </Icon>
              <span>프로필</span>
            </div>
            <ArrowIcon>
              <Image
                src="/image/icon/menu-arrow-icon.svg"
                alt="Menu Arrow"
                width={18}
                height={12}
              />
            </ArrowIcon>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={onLogOutClick}>
            로그아웃
          </button>
        </li>
      </ul>
    </Wrapper>
  );
};

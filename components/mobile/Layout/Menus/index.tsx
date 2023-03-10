import Link from "next/link";
import {useRouter} from "next/router";
import {Dispatch, SetStateAction, useCallback, useState} from "react";

import {
  ArrowIcon,
  CloseButton, DarkModeToggle,
  Icon, MyBackground, MyName,
  MyProfile, Profile,
  Wrapper
} from "components/mobile/Layout/Menus/styles";
import Image from "next/image";

import {signOut, User} from "@firebase/auth";
import {auth} from "lib/firebase";
import GlobalConfirmModal from "components/common/GlobalConfirmModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "store";
import {fetchUserLogout} from "store/slices/user/userSlice";
import useLocalStorage from "hooks/useLocalStorage";

interface MenusProps {
  setMenuActive: Dispatch<SetStateAction<boolean>>,
  isDark: boolean,
  setIsDark: Dispatch<SetStateAction<boolean>>,
}

export default function Menus({ setMenuActive, isDark, setIsDark }: MenusProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const userInfo = useSelector((state: RootState) => state.user);

  const [logoutConfirmModal, setLogoutConfirmModal] = useState(false);

  const [darkThemeStorage, setDarkThemeStorage] = useLocalStorage("darkTheme", true);

  const onClickMovePage = useCallback(() => {
    setMenuActive(false);
  }, []);

  const openLogoutConfirmModal = useCallback(() => {
    setLogoutConfirmModal(true);
  }, []);

  const handleMoveMyFeed = useCallback(() => {
    router.push(`/feed/${userInfo?.uid}`);
    setMenuActive(false);
  }, [userInfo]);

  const handleCloseMenu = useCallback(() => {
    setMenuActive(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await dispatch(fetchUserLogout());
    await router.push("/");
    setMenuActive(false);
  }, []);

  const handleDarkModeToggle = useCallback(() => {
    setIsDark((prev) => !prev);
    setDarkThemeStorage((prev) => !prev);
  }, [darkThemeStorage]);

  return (
    <Wrapper>
      <MyBackground
        profileColor={userInfo?.profileColor}
      />
      <MyProfile
        data-layout="mobile-menu-header"
        onClick={handleMoveMyFeed}
      >
        <Profile data-layout="mobile-menu-profile">
          {
            userInfo?.photoURL
              ? (
                <Image
                  src={userInfo?.photoURL}
                  alt="No profile"
                  width={86}
                  height={86}
                />
              )
              : (
                <Image
                  src="/image/icon/no-profile-icon.svg"
                  alt="No profile"
                  width={86}
                  height={86}
                />
              )
          }
        </Profile>
        <MyName>
          <p>{ userInfo?.displayName }</p>
          <p>{ userInfo?.email }</p>
        </MyName>
      </MyProfile>
      <CloseButton onClick={handleCloseMenu}>
        <Image
          src="/image/icon/dark/close-dark-icon.svg"
          alt="Close"
          width={18}
          height={18}
        />
      </CloseButton>
      <ul data-layout="mobile-menu-ul">
        <li>
          <Link href="/" onClick={onClickMovePage}>
            <div>
              <Icon>
                <Image
                  src="/image/icon/home-icon.svg"
                  alt="Home"
                  width={18}
                  height={18}
                />
              </Icon>
              <span>???</span>
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
          <Link href={`/feed/${userInfo?.uid}`} onClick={onClickMovePage}>
            <div>
              <Icon>
                <Image
                  src="/image/icon/profile-icon.svg"
                  alt="Profile"
                  width={18}
                  height={18}
                />
              </Icon>
              <span>?????????</span>
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
      <ul data-layout="mobile-menu-ul">
        <li>
          <button onClick={openLogoutConfirmModal}>
            ????????????
          </button>
        </li>
      </ul>
      <DarkModeToggle>
        <button onClick={handleDarkModeToggle}>
          {
            darkThemeStorage
              ? (
                <Image
                  src="/image/icon/dark/light-mode-icon.svg"
                  alt="Light mode"
                  width={24}
                  height={24}
                />
              )
              : (
                <Image
                  src="/image/icon/light/dark-mode-icon.svg"
                  alt="Dark mode"
                  width={24}
                  height={24}
                />
              )
          }
        </button>
      </DarkModeToggle>
      {
        logoutConfirmModal && (
          <GlobalConfirmModal
            onClick={handleLogout}
            setModal={setLogoutConfirmModal}
            title="????????????"
            text="????????? ???????????? ????????????????"
            buttonText="????????????"
          />
        )
      }
    </Wrapper>
  );
};

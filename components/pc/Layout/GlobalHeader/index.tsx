import Link from "next/link";
import Image from "next/image";
import {useSelector} from "react-redux";
import {RootState} from "store";

import {Header, Logo, Profile, Search} from "components/pc/Layout/GlobalHeader/styles";
import {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";
import SearchModal from "components/pc/Layout/SearchModal";
import ProfileModal from "components/pc/Layout/ProfileModal";

interface GlobalHeaderProps {
  isDark: boolean,
  setIsDark: Dispatch<SetStateAction<boolean>>,
}

export default function GlobalHeader({ isDark, setIsDark }: GlobalHeaderProps) {
  const userInfo = useSelector((state: RootState) => state.user);

  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [profileModal, setProfileModal] = useState(false);

  const openProfileModal = useCallback(() => {
    setProfileModal(true);
  }, []);

  const handleDarkModeToggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setIsSearch((prev) => !prev);
  }, []);

  return (
    <>
      <Header data-layout="desktop-global-header">
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
        <Search>
          <button
            data-layout="searchButton"
            onClick={handleSearchToggle}
          >
            <Image
              src="/image/icon/search-icon.svg"
              alt="search"
              width={14}
              height={14}
            />
            <span>
              {
                keyword
                  ? keyword
                  : "Muclog 검색"
              }
            </span>
          </button>
        </Search>
        <Profile>
          <button onClick={handleDarkModeToggle}>
            {
              isDark
                ? (
                  <Image
                    src="/image/icon/dark/light-mode-icon.svg"
                    alt="Light mode"
                    width={20}
                    height={20}
                  />
                )
                : (
                  <Image
                    src="/image/icon/light/dark-mode-icon.svg"
                    alt="Dark mode"
                    width={20}
                    height={20}
                  />
                )
            }
          </button>
          <button
            type="button"
            onClick={openProfileModal}
          >
            {
              userInfo?.photoURL
                ? (
                  <Image
                    src={userInfo?.photoURL}
                    alt="profile"
                    width={36}
                    height={36}
                  />
                )
                : (
                  <Image
                    src="/image/icon/no-profile-icon.svg"
                    alt="No profile"
                    width={36}
                    height={36}
                  />
                )
            }
          </button>
        </Profile>
        {
          profileModal && (
            <ProfileModal
              setModal={setProfileModal}
            />
          )
        }
      </Header>
      {
        isSearch && (
          <SearchModal
            keyword={keyword}
            setKeyword={setKeyword}
            setModal={setIsSearch}
          />
        )
      }
    </>
  )
}
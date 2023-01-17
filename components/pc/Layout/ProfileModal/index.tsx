import {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from "react";

import {
  Background,
  MyBackground,
  MyName,
  MyProfile,
  Profile,
  Tools,
  Wrapper
} from "components/pc/Layout/ProfileModal/styles";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "store";
import Image from "next/image";
import {useRouter} from "next/router";
import GlobalConfirmModal from "components/common/GlobalConfirmModal";
import {signOut} from "@firebase/auth";
import {auth} from "lib/firebase";
import {fetchUserLogout} from "store/slices/user/userSlice";

interface ProfileModalProps {
  setModal: Dispatch<SetStateAction<boolean>>
}

export default function ProfileModal({ setModal }: ProfileModalProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const ModalRef = useRef<any>(null);

  const userInfo = useSelector((state: RootState) => state.user);

  const [logoutConfirmModal, setLogoutConfirmModal] = useState(false);

  const openLogoutConfirmModal = useCallback(() => {
    setLogoutConfirmModal(true);
  }, []);

  const onClickCloseModal = useCallback((e: any) => {
    if (ModalRef.current && !ModalRef.current.contains(e.target)) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [ModalRef]);

  const handleLogout = useCallback(async () => {
    await dispatch(fetchUserLogout());
    await router.push("/");
    setModal(false);
  }, []);

  const handleMoveMyFeed = useCallback(() => {
    router.push(`/feed/${userInfo?.uid}`);
    setModal(false);
  }, [userInfo]);

  useEffect(() => {
    document.addEventListener("mousedown", onClickCloseModal);

    return () => {
      document.removeEventListener("mousedown", onClickCloseModal);
    };
  });

  return (
    <Background
      ref={ModalRef}
    >
      <Wrapper
        data-layout="desktopProfileModal"
      >
        <MyBackground
          profileColor={userInfo?.profileColor}
        />
        <MyProfile
          onClick={handleMoveMyFeed}
        >
          <Profile
            data-layout="desktop-profile-border"
          >
            {
              userInfo?.photoURL
                ? (
                  <Image
                    src={userInfo?.photoURL}
                    alt="Profile"
                    width={56}
                    height={56}
                  />
                )
                : (
                  <Image
                    src="/image/icon/no-profile-icon.svg"
                    alt="No profile"
                    width={56}
                    height={56}
                  />
                )
            }
          </Profile>
          <MyName>
            <p>{ userInfo?.displayName }</p>
            <p>{ userInfo?.email }</p>
          </MyName>
        </MyProfile>
        <Tools>
          <li>
            <button
              type="button"
              data-layout="desktopProfileLogoutButton"
              onClick={openLogoutConfirmModal}
            >
              로그아웃
            </button>
          </li>
        </Tools>
      </Wrapper>
      {
        logoutConfirmModal && (
          <GlobalConfirmModal
            onClick={handleLogout}
            setModal={setLogoutConfirmModal}
            title="로그아웃"
            text="정말로 로그아웃 하시겠어요?"
            buttonText="로그아웃"
            isDesktop={true}
          />
        )
      }
    </Background>
  );
};

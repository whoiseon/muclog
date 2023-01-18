import {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

import {
  ModalWrapper,
  Wrapper
} from "components/mobile/WriteForm/styles";
import WriteModal from "components/mobile/WriteForm/WriteModal";
import {RootState} from "store";
import DesktopWriteModal from "components/pc/DesktopWriteModal";

interface WriteFormProps {
  isDesktop?: boolean
}

export default function WriteForm({ isDesktop }: WriteFormProps) {
  const router = useRouter();

  const userInfo = useSelector((state: RootState) => state.user);

  const [writeModal, setWriteModal] = useState(false);

  const openWriteModal = useCallback(() => {
    setWriteModal(true);
  }, []);

  useEffect(() => {
    if (writeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [writeModal]);

  return (
    <>
      <Wrapper
        isDesktop={isDesktop}
      >
        <button
          onClick={openWriteModal}
          data-layout={isDesktop ? "desktopWriteButton" : "writeButton"}
          type="button"
        >
          <div>
            {
              userInfo?.photoURL
                ? (
                  <Image
                    src={userInfo?.photoURL}
                    alt="No profile"
                    width={32}
                    height={32}
                  />
                )
                : (
                  <Image
                    src="/image/icon/no-profile-icon.svg"
                    alt="No profile"
                    width={32}
                    height={32}
                  />
                )
            }
          </div>
          <span>지금 무슨 생각을 하고 계신가요?</span>
        </button>
      </Wrapper>
      {
        isDesktop
          ? (
            writeModal && (
              <DesktopWriteModal
                setWriteModal={setWriteModal}
              />
            )
          )
          : (
            <ModalWrapper writeActive={writeModal}>
              <WriteModal
                setWriteModal={setWriteModal}
                writeModal={writeModal}
              />
            </ModalWrapper>
          )
      }
    </>
  )
}
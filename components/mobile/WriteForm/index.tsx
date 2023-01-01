import {useCallback, useEffect, useState} from "react";
import Image from "next/image";

import {
  ModalWrapper,
  Wrapper
} from "components/mobile/WriteForm/styles";
import {User} from "@firebase/auth";
import WriteModal from "components/mobile/WriteForm/WriteModal";

interface WriteFormProps {
  userInfo: User | null,
}

export default function WriteForm({ userInfo }: WriteFormProps) {
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
      <Wrapper>
        <button
          onClick={openWriteModal}
          data-layout="writeButton"
          type="button"
        >
          <div>
            {
              userInfo?.photoURL
                ? (
                  <Image
                    src="/image/icon/no-profile-icon.svg"
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
        {/*<TextareaTools>*/}
        {/*  <button type="button">*/}
        {/*    <div>*/}
        {/*      <Image*/}
        {/*        src="/image/icon/picture-icon.svg"*/}
        {/*        alt="Picture"*/}
        {/*        width={18}*/}
        {/*        height={18}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </button>*/}
        {/*  <button type="submit">*/}
        {/*    <div>*/}
        {/*      <Image*/}
        {/*        src="/image/icon/send-icon.svg"*/}
        {/*        alt="Send"*/}
        {/*        width={18}*/}
        {/*        height={18}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </button>*/}
        {/*</TextareaTools>*/}
      </Wrapper>
      <ModalWrapper writeActive={writeModal}>
        <WriteModal
          userInfo={userInfo}
          setWriteModal={setWriteModal}
        />
      </ModalWrapper>
    </>
  )
}
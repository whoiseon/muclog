import {Dispatch, SetStateAction, useCallback, useEffect, useRef} from "react";

import {Background, Wrapper} from "components/pc/Layout/ProfileModal/styles";

interface ProfileModalProps {
  setModal: Dispatch<SetStateAction<boolean>>
}

export default function ProfileModal({ setModal }: ProfileModalProps) {
  const ModalRef = useRef<any>(null);

  const onClickCloseModal = useCallback((e: any) => {
    if (ModalRef.current && !ModalRef.current.contains(e.target)) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [ModalRef]);

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
        123
      </Wrapper>
    </Background>
  );
};

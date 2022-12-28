import {Dispatch, SetStateAction, useCallback, useEffect, useRef} from "react";
import {Wrapper} from "components/common/SmallModal/styles";

interface ModalProps {
  setMoreModal: Dispatch<SetStateAction<boolean>>
  modalTop: number,
  modalLeft: number,
  children: string | JSX.Element,
}

export default function SmallModal({ children, setMoreModal, modalTop, modalLeft }: ModalProps) {
  const ModalRef = useRef<HTMLDivElement>(null);

  const onClickCloseModal = useCallback(() => {
    setMoreModal(false);
  }, [setMoreModal]);

  useEffect(() => {
    const handler = (e: any) => {
      if (ModalRef.current && !ModalRef.current.contains(e.target)) {
        setMoreModal(false);
      } else {
        setMoreModal(true);
      }
    }

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <Wrapper
      onClick={onClickCloseModal}
      ref={ModalRef}
      top={modalTop}
      right={modalLeft}
      data-layout="smallModal"
    >
      { children }
    </Wrapper>
  );
};

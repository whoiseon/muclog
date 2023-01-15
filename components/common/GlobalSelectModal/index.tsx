import {Dispatch, MouseEvent, SetStateAction, useCallback, useEffect, useRef} from "react";
import {Background} from "components/common/GlobalSelectModal/styles";

interface ModalProps {
  setModal: Dispatch<SetStateAction<boolean>>
  children: string | JSX.Element,
}

export default function GlobalSelectModal({ children, setModal }: ModalProps) {

  const onClickBackground = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setModal(false);
    }
  }, [setModal]);

  return (
    <Background
      onClick={onClickBackground}
      data-layout="globalSelectModal"
    >
      { children }
    </Background>
  );
};

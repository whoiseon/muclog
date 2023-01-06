import {Dispatch, MouseEvent, SetStateAction, useCallback} from "react";
import {Background, Buttons, Main, Wrapper} from "components/common/GlobalUpdateModal/styles";

interface GlobalModalProps {
  onClick: () => void,
  setModal: Dispatch<SetStateAction<boolean>>,
  title: string,
  children: JSX.Element,
  buttonText: string,
}

export default function GlobalUpdateModal({setModal, title, children, buttonText, onClick}: GlobalModalProps) {
  const onClickBackground = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setModal(false);
    }
  }, []);

  const onClickCloseModal = useCallback(() => {
    setModal(false);
  }, []);

  return (
    <Background
      onClick={onClickBackground}
    >
      <Wrapper
        data-layout="globalConfirmModal"
      >
        <h1>
          { title }
        </h1>
        <Main>
          { children }
        </Main>
        <Buttons>
          <button
            type="button"
            data-button="red"
            onClick={onClick}
          >
            { buttonText }
          </button>
          <button
            type="button"
            data-button="border"
            onClick={onClickCloseModal}
          >
            취소
          </button>
        </Buttons>
      </Wrapper>
    </Background>
  );
};

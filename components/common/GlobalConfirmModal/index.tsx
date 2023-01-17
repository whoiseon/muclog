import {Background, Buttons, Text, Wrapper} from "components/common/GlobalConfirmModal/styles";
import {Dispatch, SetStateAction, useCallback, MouseEvent, useRef} from "react";

interface GlobalModalProps {
  onClick: () => void,
  setModal: Dispatch<SetStateAction<boolean>>,
  title: string,
  text: string,
  buttonText: string,
  isDesktop?: boolean,
}

export default function GlobalConfirmModal({ onClick, setModal, title, text, buttonText, isDesktop }: GlobalModalProps) {
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
        isDesktop={isDesktop}
      >
        <h1>
          { title }
        </h1>
        <Text
          isDesktop={isDesktop}
        >
          <p>{ text }</p>
        </Text>
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

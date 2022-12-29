import {Background, Buttons, Text, Wrapper} from "components/common/GlobalConfirmModal/styles";
import {Dispatch, SetStateAction, useCallback, MouseEvent, useRef} from "react";

interface GlobalModalProps {
  onClick: () => void,
  setDeleteModal: Dispatch<SetStateAction<boolean>>,
  title: string,
  text: string,
  buttonText: string,
}

export default function GlobalConfirmModal({ onClick, setDeleteModal, title, text, buttonText }: GlobalModalProps) {
  const onClickBackground = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setDeleteModal(false);
    }
  }, []);

  const onClickCloseModal = useCallback(() => {
    setDeleteModal(false);
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
        <Text>
          <p>{ text }</p>
        </Text>
        <Buttons>
          <button
            type="button"
            data-button="red"
          >
            삭제
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

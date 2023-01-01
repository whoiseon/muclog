import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useRef, useState} from "react";
import Image from "next/image";

import {addDoc, collection} from "@firebase/firestore";
import {db} from "lib/firebase";
import {User} from "@firebase/auth";

import useInput from "hooks/useInput";
import {
  CloseButton,
  Form,
  Header, PictureBox,
  SubmitButton,
  Textarea,
  Title,
  WriteTools
} from "components/mobile/WriteForm/WriteModal/styles";
import TextareaAutosize from "react-textarea-autosize";

interface WriteModalProps {
  userInfo: User | null,
  setWriteModal: Dispatch<SetStateAction<boolean>>
}

export default function WriteModal({ userInfo, setWriteModal }: WriteModalProps) {
  const TextRef = useRef<any>(null);

  const [content, onChangeContent, setContent] = useInput("");
  const [attachment, setAttachment] = useState();

  const contentsReplaceNewline = useCallback(() => {
    return content.replaceAll("\n", "<br />");
  }, [content]);

  const handleCloseModal = useCallback(() => {
    setWriteModal(false);
  }, []);

  const handleFocusTextarea = useCallback(() => {
    const end = TextRef.current.value.length;

    TextRef.current.setSelectionRange(end, end);
    TextRef.current.focus();
  }, [TextRef]);

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "logs"), {
        content: contentsReplaceNewline(),
        createdAt: Date.now(),
        creatorName: userInfo?.displayName,
        creatorId: userInfo?.uid,
        creatorProfile: userInfo?.photoURL
      });

      setContent("");
      setWriteModal(false);
    } catch (error) {
      console.log(error);
    }
  }, [content]);

  const onFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    const theFile: any = files && files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result }
      } = finishedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      onClick={handleFocusTextarea}
      data-layout="writeForm"
    >
      <Header data-layout="writeFormHeader">
        <CloseButton
          type="button"
          onClick={handleCloseModal}
        >
          <Image
            src="/image/icon/dark/close-dark-icon.svg"
            alt="Close"
            width={18}
            height={18}
          />
        </CloseButton>
        <Title>
          게시물 작성하기
        </Title>
        <SubmitButton type="submit">
          게시
        </SubmitButton>
      </Header>
      <Textarea>
        <TextareaAutosize
          ref={TextRef}
          placeholder="지금 무슨 생각을 하고 계신가요?"
          maxLength={120}
          value={content}
          onChange={onChangeContent}
          rows={1}
          required
        />
      </Textarea>
      <WriteTools
        data-layout="writeFormTools"
      >
        <ul>
          <li>
            <PictureBox>
              <label htmlFor="picture_upload">
                <div>
                  <Image
                    src="/image/icon/picture-icon.svg"
                    alt="Picture"
                    width={18}
                    height={18}
                  />
                </div>
                <span>사진 추가하기</span>
              </label>
              <input type="file" id="picture_upload" onChange={onFileChange} />
            </PictureBox>
          </li>
        </ul>
      </WriteTools>
    </Form>
  );
};
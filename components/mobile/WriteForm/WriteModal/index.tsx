import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";
import {useSelector} from "react-redux";

import {addDoc, collection} from "@firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import {User} from "@firebase/auth";
import {db, storage} from "lib/firebase";

import { v4 as randomFileNameUuid } from "uuid";

import useInput from "hooks/useInput";
import {
  CloseButton,
  Form,
  Header, PictureBox, PicturePreview,
  SubmitButton,
  Textarea,
  Title,
  WriteTools
} from "components/mobile/WriteForm/WriteModal/styles";
import TextareaAutosize from "react-textarea-autosize";
import {RootState} from "store";

interface WriteModalProps {
  setWriteModal: Dispatch<SetStateAction<boolean>>
  writeModal: boolean
}

export default function WriteModal({ setWriteModal, writeModal }: WriteModalProps) {
  const userInfo = useSelector((state: RootState) => state.user);

  const TextRef = useRef<any>(null);

  const [content, onChangeContent, setContent] = useInput("");
  const [attachment, setAttachment] = useState("");

  const contentsReplaceNewline = useCallback(() => {
    return content.replaceAll("\n", "<br />");
  }, [content]);

  const handleCloseModal = useCallback(() => {
    setWriteModal(false);
    TextRef.current.blur();
    setContent("");
    setAttachment("");
  }, [TextRef]);

  const handleFocusTextarea = useCallback(() => {
    const end = TextRef.current.value.length;

    TextRef.current.setSelectionRange(end, end);
    TextRef.current.focus();
  }, [TextRef]);

  const handleClearAttachment = useCallback(() => {
    setAttachment("");
  }, []);

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let attachmentUrl = "";

      if (attachment !== "") {
        const attachmentRef = ref(storage, `${userInfo?.email}/logs/${randomFileNameUuid()}`);
        const response = await uploadString(attachmentRef, attachment, "data_url");

        attachmentUrl = await getDownloadURL(response.ref);
      }

      await addDoc(collection(db, "logs"), {
        content: contentsReplaceNewline(),
        createdAt: Date.now(),
        creatorName: userInfo?.displayName,
        creatorId: userInfo?.uid,
        creatorProfile: userInfo?.photoURL,
        commentCount: 0,
        attachmentUrl,
        liked: []
      });

      setContent("");
      setAttachment("");
      setWriteModal(false);
    } catch (error) {
      console.log(error);
    }
  }, [userInfo, content, attachment, randomFileNameUuid]);

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
          ????????? ????????????
        </Title>
        <SubmitButton
          type="submit"
          disabled={content.length <= 0}
        >
          ??????
        </SubmitButton>
      </Header>
      {
        attachment && (
          <PicturePreview>
            <Image
              src={attachment}
              alt="Image Preview"
              fill
              style={{
                objectFit: 'cover',
                padding: '20px',
                borderRadius: '26px'
              }}
            />
            <button
              type="button"
              onClick={handleClearAttachment}
            >
              <Image
                src="/image/icon/image-delete-icon.svg"
                alt="Image Clear"
                width={24}
                height={18}
              />
            </button>
          </PicturePreview>
        )
      }
      <Textarea>
        <TextareaAutosize
          ref={TextRef}
          placeholder="?????? ?????? ????????? ?????? ?????????????"
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
                <span>?????? ????????????</span>
              </label>
              <input
                type="file"
                id="picture_upload"
                accept="image/*"
                onChange={onFileChange}
              />
            </PictureBox>
          </li>
        </ul>
      </WriteTools>
    </Form>
  );
};

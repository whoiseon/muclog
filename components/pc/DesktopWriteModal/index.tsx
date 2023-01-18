import {ChangeEvent, Dispatch, FormEvent, MouseEvent, SetStateAction, useCallback, useRef, useState} from "react";
import {
  Background,
  CloseButton,
  Form,
  Submit,
  Textarea,
  Wrapper,
  WriteTools
} from "components/pc/DesktopWriteModal/styles";
import {useSelector} from "react-redux";
import {RootState} from "store";
import useInput from "hooks/useInput";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import {db, storage} from "lib/firebase";
import {v4 as randomFileNameUuid} from "uuid";
import {addDoc, collection} from "@firebase/firestore";
import {PicturePreview} from "components/mobile/WriteForm/WriteModal/styles";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";

interface DesktopWriteModalProps {
  setWriteModal: Dispatch<SetStateAction<boolean>>
}

export default function DesktopWriteModal({ setWriteModal }: DesktopWriteModalProps) {
  const userInfo = useSelector((state: RootState) => state.user);

  const TextRef = useRef<any>(null);

  const [content, onChangeContent, setContent] = useInput("");
  const [attachment, setAttachment] = useState("");

  const contentsReplaceNewline = useCallback(() => {
    return content.replaceAll("\n", "<br />");
  }, [content]);

  const handleFocusTextarea = useCallback(() => {
    const end = TextRef.current.value.length;

    TextRef.current.setSelectionRange(end, end);
    TextRef.current.focus();
  }, [TextRef]);

  const handleCloseModal = useCallback(() => {
    setWriteModal(false);
    TextRef.current.blur();
    setContent("");
    setAttachment("");
  }, [TextRef]);

  const onClickBackground = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setWriteModal(false);
    }
  }, []);

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
    <Background
      onClick={onClickBackground}
    >
      <Wrapper
        data-layout="globalConfirmModal"
      >
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
        <h1>게시물 작성하기</h1>
        <Form
          onSubmit={onSubmit}
          onClick={handleFocusTextarea}
          data-layout="writeForm"
        >
          <Textarea>
            <TextareaAutosize
              ref={TextRef}
              placeholder="지금 무슨 생각을 하고 계신가요?"
              value={content}
              onChange={onChangeContent}
              rows={1}
              required
            />
          </Textarea>
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
          <WriteTools>
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
            <input
              type="file"
              id="picture_upload"
              accept="image/*"
              onChange={onFileChange}
            />
          </WriteTools>
          <Submit>
            <button
              type="submit"
              disabled={content.length <= 0}
            >
              게시
            </button>
          </Submit>
        </Form>
      </Wrapper>
    </Background>
  );
};

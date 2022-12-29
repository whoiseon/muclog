import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";

import { db } from "lib/firebase";
import {collection, addDoc} from "@firebase/firestore";
import TextareaAutosize from "react-textarea-autosize";

import {Editor, FocusUnderline, Form, LogList, Textarea, TextareaTools} from "components/mobile/WriteForm/styles";
import {User} from "@firebase/auth";

interface WriteFormProps {
  userInfo: User | null,
}

export default function WriteForm({ userInfo }: WriteFormProps) {
  const contentRef = useRef<any>(null);

  const [content, setContent] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  const onChangeContent = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }, []);

  const onFocusTextarea = useCallback(() => {
    setIsWriting(true);
  }, []);

  const onBlurTextarea = useCallback(() => {
    setIsWriting(false);
  }, []);

  const contentsReplaceNewline = useCallback(() => {
    return content.replaceAll("\n", "<br />");
  }, [content]);

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
    } catch (error) {
      console.log(error);
    }
  }, [content]);

  return (
    <Form onSubmit={onSubmit}>
      <Editor>
        <Textarea focus={isWriting}>
          <TextareaAutosize
            ref={contentRef}
            placeholder="지금 무슨 생각을 하고 계신가요?..."
            maxLength={120}
            value={content}
            onChange={onChangeContent}
            onFocus={onFocusTextarea}
            onBlur={onBlurTextarea}
            rows={1}
            required
          />
        </Textarea>
        <TextareaTools>
          <button type="button">
            <div>
              <Image
                src="/image/icon/picture-icon.svg"
                alt="Picture"
                width={18}
                height={18}
              />
            </div>
          </button>
          <button type="submit">
            <div>
              <Image
                src="/image/icon/send-icon.svg"
                alt="Send"
                width={18}
                height={18}
              />
            </div>
          </button>
        </TextareaTools>
        {isWriting && <FocusUnderline/>}
      </Editor>
    </Form>
  )
}
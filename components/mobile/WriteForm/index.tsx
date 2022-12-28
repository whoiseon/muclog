import {ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";

import { db } from "lib/firebase";
import {collection, addDoc, query, doc, onSnapshot, DocumentData, orderBy} from "@firebase/firestore";
import Parser from "html-react-parser";

import useInput from "hooks/useInput";
import {Editor, Form} from "components/mobile/WriteForm/styles";
import LogList from "components/mobile/LogList";
import {User} from "@firebase/auth";

interface WriteFormProps {
  userInfo: User | null
}

export default function WriteForm({ userInfo }: WriteFormProps) {
  const contentRef = useRef<any>();

  const [content, setContent] = useState("");
  const [logs, setLogs] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "logs"), orderBy("createdAt", "desc"))
    onSnapshot(q, (snapshot) => {
      const logArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLogs(logArray);
    })
  }, []);

  const onChangeContent = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    handleResizeHeight();
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
      });

      setContent("");
    } catch (error) {
      console.log(error);
    }
  }, [content]);

  return (
    <Form onSubmit={onSubmit}>
      <Editor>
        <textarea
          ref={contentRef}
          placeholder="지금 무슨 생각을 하고 계신가요?..."
          maxLength={120}
          value={content}
          onChange={onChangeContent}
          rows={1}
        />
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
      </Editor>
      <LogList data={logs} />
    </Form>
  )
}
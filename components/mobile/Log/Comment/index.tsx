import Image from "next/image";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

import {
  addDoc,
  collection,
  doc,
  DocumentData, increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where
} from "@firebase/firestore";

import {
  Content,
  Info,
  Profile,
  ReplyMoreButton,
  ReplyWrapper,
  Text,
  Wrapper
} from "components/mobile/Log/Comment/styles";
import moment from "moment";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {RootState} from "store";
import useInput from "hooks/useInput";
import {db} from "lib/firebase";
import Reply from "components/mobile/Log/Reply";

interface CommentProps {
  data: DocumentData
}

export default function Comment({ data }: CommentProps) {
  const router = useRouter();

  const userInfo = useSelector((state: RootState) => state.user);

  const [replyContent, onChangeReplyContent, setReplyContent] = useInput("");
  const [replies, setReplies] = useState<DocumentData[]>([]);

  const [isReply, setIsReply] = useState(false);
  const [replyLimit, setReplyLimit] = useState(3);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("commentId", "==", data.id),
      where("isReply", "==", true),
      orderBy("createdAt", "asc"),
      limit(replyLimit)
    );

    onSnapshot(q, (snapshot) => {
      const replyArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReplies(replyArray);
    })
  }, [data, replyLimit, setReplies]);

  const handleMoveUserFeed = (uid: string) => () => {
    router.push(`/feed/${uid}`);
  };

  const handleToggleReply = useCallback(() => {
    setIsReply((prev) => !prev);
  }, [setIsReply]);

  const handleReplyLimitIncrement = useCallback(() => {
    setReplyLimit((prev) => prev + 3);
  }, [setReplyLimit]);

  const onSubmitReply = useCallback( async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const logRef = doc(db, "logs", data.logId);

      await addDoc(collection(db, "comments"), {
        logId: data.logId,
        content: replyContent,
        createdAt: Date.now(),
        creatorName: userInfo?.displayName,
        creatorId: userInfo?.uid,
        creatorProfile: userInfo?.photoURL,
        isReply: true,
        commentId: data.id,
      });

      await updateDoc(logRef, {
        commentCount: increment(1),
      });

      setReplyContent("");
    } catch (error) {
      console.log(error);
    }
  }, [data, replyContent, userInfo, setReplyContent]);

  return (
    <Wrapper data-layout="comment">
      <Profile
        onClick={handleMoveUserFeed(data.creatorId)}
      >
        {
          data.creatorProfile
            ? (
              <Image
                src={data.creatorProfile}
                alt="No profile"
                width={32}
                height={32}
              />
            )
            : (
              <Image
                src="/image/icon/no-profile-icon.svg"
                alt="No profile"
                width={32}
                height={32}
              />
            )
        }
      </Profile>
      <Content>
        <Info
          onClick={handleMoveUserFeed(data.creatorId)}
        >
          <span>{data.creatorName}</span>
          <span>
            {
              moment(data.createdAt).locale('ko').fromNow()
            }
          </span>
        </Info>
        <Text data-layout="commentText">
          <p>{data.content}</p>
        </Text>
        <button
          onClick={handleToggleReply}
        >
          답글 달기
        </button>
        <ReplyWrapper>
          {
            replies.map((reply, i) => {
              return (
                <Reply
                  key={reply.id}
                  data={reply}
                />
              )
            })
          }
          {
            replies.length >= replyLimit && (
              <ReplyMoreButton>
                <button
                  type="button"
                  onClick={handleReplyLimitIncrement}
                >
                  <span>더 많은 답글을 보고싶어요!</span>
                </button>
              </ReplyMoreButton>
            )
          }
        </ReplyWrapper>
        {
          (isReply || replies.length > 0) && (
            <form onSubmit={onSubmitReply}>
              {
                userInfo?.photoURL
                  ? (
                    <Image
                      src={userInfo?.photoURL}
                      alt="profile"
                      width={32}
                      height={32}
                    />
                  )
                  : (
                    <Image
                      src="/image/icon/no-profile-icon.svg"
                      alt="No profile"
                      width={32}
                      height={32}
                    />
                  )
              }
              <input
                value={replyContent}
                placeholder="답글을 입력하세요..."
                onChange={onChangeReplyContent}
              />
            </form>
          )
        }
      </Content>
    </Wrapper>
  );
};

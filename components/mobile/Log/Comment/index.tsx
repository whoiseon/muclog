import Image from "next/image";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

import {db, storage} from "lib/firebase";
import {
  addDoc,
  collection, deleteDoc,
  doc,
  DocumentData, getDocs, increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where
} from "@firebase/firestore";

import {
  MoreButton,
  CommentWrapper,
  Content,
  Info,
  Profile,
  ReplyMoreButton,
  ReplyWrapper,
  Text,
  Wrapper, EditForm
} from "components/mobile/Log/Comment/styles";
import moment from "moment";
import {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {RootState} from "store";
import useInput from "hooks/useInput";
import Reply from "components/mobile/Log/Reply";
import SmallModal from "components/common/SmallModal";
import GlobalConfirmModal from "components/common/GlobalConfirmModal";

interface CommentProps {
  data: DocumentData,
}

export default function Comment({ data }: CommentProps) {
  const router = useRouter();

  const userInfo = useSelector((state: RootState) => state.user);

  const replyRef = useRef<any>(null);
  const EditInputRef = useRef<any>(null);

  const [isOwner, setIsOwner] = useState(data.creatorId === userInfo.uid);

  const [replyContent, onChangeReplyContent, setReplyContent] = useInput("");
  const [newContent, onChangeNewContent, setNewContent]= useInput(data.content);
  const [replies, setReplies] = useState<DocumentData[]>([]);

  const [isReply, setIsReply] = useState(replies.length > 0);
  const [editing, setEditing] = useState(false);
  const [replyLimit, setReplyLimit] = useState(3);

  const [moreModal, setMoreModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [updateConfirmModal, setUpdateConfirmModal] = useState(false);

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

  const openMoreModal = useCallback(() => {
    setMoreModal(prev => !prev);
  }, []);

  const openUpdateConfirmModal = useCallback(() => {
    setUpdateConfirmModal(true);
  }, []);

  const openDeleteConfirmModal = useCallback(() => {
    setDeleteConfirmModal(true);
  }, [setDeleteConfirmModal]);

  const handleMoveUserFeed = (uid: string) => () => {
    router.push(`/feed/${uid}`);
  };

  const handleToggleReply = useCallback(() => {
    setIsReply((prev) => !prev);
  }, [setIsReply]);

  const handleReplyLimitIncrement = useCallback(() => {
    setReplyLimit((prev) => prev + 3);
  }, [setReplyLimit]);

  const handleDeleteComment = useCallback( async () => {
    try {
      const logRef = doc(db, "logs", data.logId);
      const CommentRef = doc(db, "comments", data.id);

      await deleteDoc(CommentRef);

      if (replies.length > 0) {
        const q = query(
          collection(db, "comments"),
          where("commentId", "==", data.id)
        )

        const deleteReplies = await getDocs(q);

        if (deleteReplies.docs.length !== 0) {
          await deleteReplies.forEach((doc) => {
            deleteDoc(doc.ref);
          })

          await updateDoc(logRef, {
            commentCount: increment(-(deleteReplies.docs.length)),
          });
        }
      }

      await updateDoc(logRef, {
        commentCount: increment(-1),
      });

      setDeleteConfirmModal(false);
    } catch (error) {
      console.log(error);
    }
  }, [replies]);

  const handleToggleEditing = useCallback(() => {
    setEditing(prev => !prev);
    setUpdateConfirmModal(false);
  }, []);

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

  const onSubmitCommentUpdate = useCallback( async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const commentRef = doc(db, "comments", data.id);

      await updateDoc(commentRef, {
        content: newContent,
      })

      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  }, [newContent]);

  useEffect(() => {
    if (editing) {
      const end = EditInputRef.current.value.length;

      EditInputRef.current.setSelectionRange(end, end);
      EditInputRef.current.focus();
    }
  }, [EditInputRef, editing]);

  return (
    <>
      <Wrapper data-layout="comment">
        <CommentWrapper>
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
            {
              editing
                ? (
                  <EditForm onSubmit={onSubmitCommentUpdate}>
                    <input
                      type="text"
                      ref={EditInputRef}
                      value={newContent}
                      onChange={onChangeNewContent}
                    />
                    <div>
                      <button
                        type="button"
                        data-button="border"
                        onClick={handleToggleEditing}
                      >
                        취소
                      </button>
                      <button type="submit">
                        수정
                      </button>
                    </div>
                  </EditForm>
                )
                : (
                  <Text
                    data-layout="commentText"
                    onClick={openMoreModal}
                  >
                    <p>{data.content}</p>
                    {
                      moreModal && (
                        <SmallModal
                          setMoreModal={setMoreModal}
                        >
                          {
                            isOwner
                              ? (
                                <ul>
                                  <li>
                                    <button onClick={openUpdateConfirmModal}>
                                      <span>수정</span>
                                    </button>
                                  </li>
                                  <li>
                                    <button onClick={openDeleteConfirmModal}>
                                      <span>삭제</span>
                                    </button>
                                  </li>
                                </ul>
                              )
                              : (
                                <ul>
                                  <li>
                                    <button>
                                      <span>신고</span>
                                    </button>
                                  </li>
                                </ul>
                              )
                          }
                        </SmallModal>
                      )
                    }
                  </Text>
                )
            }
            {
              !editing && (
                <button
                  onClick={handleToggleReply}
                  data-layout="replyButton"
                >
                  답글 달기
                </button>
              )
            }
          </Content>
        </CommentWrapper>
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
            <form
              ref={replyRef}
              onSubmit={onSubmitReply}
            >
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
      </Wrapper>
      {
        deleteConfirmModal && (
          <GlobalConfirmModal
            onClick={handleDeleteComment}
            setModal={setDeleteConfirmModal}
            title="댓글 삭제"
            text="정말로 댓글을 삭제하시겠어요?"
            buttonText="삭제"
          />
        )
      }
      {
        updateConfirmModal && (
          <GlobalConfirmModal
            onClick={handleToggleEditing}
            setModal={setUpdateConfirmModal}
            title="수정하기"
            text="정말로 코멘트를 수정하시겠어요?"
            buttonText="수정"
          />
        )
      }
    </>
  );
};

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
import {ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {RootState} from "store";
import useInput from "hooks/useInput";
import Reply from "components/mobile/Log/Reply";
import GlobalSelectModal from "components/common/GlobalSelectModal";
import GlobalConfirmModal from "components/common/GlobalConfirmModal";
import GlobalUpdateModal from "components/common/GlobalUpdateModal";
import {ReportWrapper} from "components/mobile/Log/styles";
import {reportData} from "public/data/report";
import {$COLOR_MAIN, $COLOR_WHITE} from "styles/variables";
import SmallModal from "components/pc/SmallModal";

interface CommentProps {
  data: DocumentData,
  isDesktop?: boolean,
}

export default function Comment({ data, isDesktop }: CommentProps) {
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
  const [report, setReport] = useState("선정적인 내용을 포함하고 있습니다.");

  const [moreModal, setMoreModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [updateConfirmModal, setUpdateConfirmModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);

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
    setMoreModal(false);
    setUpdateConfirmModal(true);
  }, []);

  const openDeleteConfirmModal = useCallback(() => {
    setMoreModal(false);
    setDeleteConfirmModal(true);
  }, [setDeleteConfirmModal]);

  const openReportModal = useCallback(() => {
    setMoreModal(false);
    setReportModal(true);
  }, []);

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

  const onChangeReport = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setReport(event.target.value);
  }, [setReport]);

  const handleReport = useCallback( async () => {
    try {
      await addDoc(collection(db, "reports"), {
        reporterId: userInfo?.uid,
        reporterName: userInfo?.displayName,
        createdAt: Date.now(),
        solution: false,
        content: report,
        reportedLogId: data.logId,
        reportedCommentId: data.id,
        reportedCreatorId: data.creatorId,
        reportedCreatorName: data.creatorName,
        type: "comment"
      });

      setReport("");
      setReportModal(false);
    } catch (error) {
      console.log(error);
    }
  }, [userInfo, report, data]);

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
            {
              moreModal
                ? isDesktop
                  ? (
                    <SmallModal
                      setMoreModal={setMoreModal}
                      modalTop={0}
                      modalLeft={0}
                      modalBottom={isOwner ? -70 : -33}
                      isLeft={true}
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
                                <button onClick={openReportModal}>
                                  <span>신고</span>
                                </button>
                              </li>
                            </ul>
                          )
                      }
                    </SmallModal>
                  )
                  : (
                    <GlobalSelectModal
                      setModal={setMoreModal}
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
                                <button onClick={openReportModal}>
                                  <span>신고</span>
                                </button>
                              </li>
                            </ul>
                          )
                      }
                    </GlobalSelectModal>
                  )
                : null
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
                  isDesktop={isDesktop}
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
                  <span>더 많은 답글을 확인할래요!</span>
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
            isDesktop={isDesktop}
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
            isDesktop={isDesktop}
          />
        )
      }
      {
        reportModal && (
          <GlobalUpdateModal
            onClick={handleReport}
            setModal={setReportModal}
            title="신고하기"
            buttonText="제출"
            isDesktop={isDesktop}
          >
            <ReportWrapper>
              <p>
                문제를 가장 잘 설명하는 사유를 선택해주세요.
              </p>
              <ul>
                {
                  reportData.map((data, i) => {
                    const isActive = report === data.text
                    const activeStyle = {
                      backgroundColor: $COLOR_MAIN,
                      color: $COLOR_WHITE
                    }

                    return (
                      <li key={data.id}>
                        <input
                          type="radio"
                          name="select"
                          value={data.text}
                          id={data.id}
                          onChange={onChangeReport}
                        />
                        <div data-layout="report-label">
                          <label
                            htmlFor={data.id}
                            style={isActive ? activeStyle : {}}
                          >
                            {data.text}
                          </label>
                          {
                            isActive && (
                              <Image
                                src="/image/icon/check-icon.svg"
                                alt="checked"
                                width={18}
                                height={12}
                              />
                            )
                          }
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </ReportWrapper>
          </GlobalUpdateModal>
        )
      }
    </>
  );
};

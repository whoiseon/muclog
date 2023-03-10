import {ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";

import {db} from "lib/firebase";
import { storage } from "lib/firebase";
import { ref, deleteObject } from "@firebase/storage";
import {
  DocumentData,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection, query, orderBy, limit, onSnapshot, where, increment, getDocs
} from "@firebase/firestore";

import {
  Attachment, CommentList,
  Content,
  CreatedAt, EditForm, Info,
  LogInfo, LogTools,
  MoreButton, NoComments,
  Profile, ReportWrapper,
  UserName,
  Wrapper
} from "components/mobile/Log/styles";
import GlobalConfirmModal from "components/common/GlobalConfirmModal";
import GlobalSelectModal from "components/common/GlobalSelectModal";
import TextareaAutosize from "react-textarea-autosize";
import useInput from "hooks/useInput";
import {$COLOR_MAIN, $COLOR_WHITE} from "styles/variables";
import Comment from "components/mobile/Log/Comment";
import {useSelector} from "react-redux";
import {RootState} from "store";
import moment from "moment";
import "moment/locale/ko";
import ImageViewModal from "components/mobile/Log/ImageViewModal";
import {router} from "next/client";
import {useRouter} from "next/router";
import GlobalUpdateModal from "components/common/GlobalUpdateModal";
import {reportData} from "public/data/report";
import UnLimitContent from "components/common/UnLimitContent";
import SmallModal from "components/pc/SmallModal";

interface LogProps {
  data: DocumentData,
  isOwner: boolean,
  isDesktop?: boolean,
}

export default function Log({ data, isOwner, isDesktop }: LogProps) {
  const router = useRouter();

  const userInfo = useSelector((state: RootState) => state.user);

  const EditTextareaRef = useRef<any>(null);

  const [commentContent, onChangeCommentContent, setCommentContent] = useInput("");

  const [comments, setComments] = useState<DocumentData[]>([]);
  const [commentsLimit, setCommentsLimit] = useState(5)

  const [isLiked, setIsLiked] = useState<boolean>(data.liked.includes(userInfo?.uid));
  const [editing, setEditing] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [openImageView, setOpenImageView] = useState(false);

  const [report, setReport] = useState("???????????? ????????? ???????????? ????????????.");

  const contentsReplaceNewline = useCallback(() => {
    return data.content.replaceAll("<br />", "\n");
  }, [data.content]);

  const [newLog, onChangeNewLog, setNewLog] = useInput(contentsReplaceNewline());

  const [moreModal, setMoreModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [updateConfirmModal, setUpdateConfirmModal] = useState(false);
  const [imageDeleteConfirmModal, setImageDeleteConfirmModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("logId", "==", data.id),
      where("isReply", "==", false),
      orderBy("createdAt", "asc"),
      limit(commentsLimit)
    );

    onSnapshot(q, (snapshot) => {
      const commentArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(commentArray);
    })
  }, [openComment, commentsLimit]);

  const openDeleteConfirmModal = useCallback(() => {
    setMoreModal(false);
    setDeleteConfirmModal(true);
  }, []);

  const openUpdateConfirmModal = useCallback(() => {
    setMoreModal(false);
    setUpdateConfirmModal(true);
  }, []);

  const openImageDeleteConfirmModal = useCallback(() => {
    setImageDeleteConfirmModal(true);
  }, []);

  const openMoreModal = useCallback(() => {
    setMoreModal(prev => !prev);
  }, []);

  const openCommentList = useCallback(() => {
    setOpenComment(prev => !prev);
  }, []);

  const openImageViewModal = useCallback(() => {
    setOpenImageView(true);
  }, []);

  const openReportModal = useCallback(() => {
    setMoreModal(false);
    setReportModal(true);
  }, []);

  const handleDeleteLog = useCallback( async () => {
    try {
      const logRef = doc(db, "logs", data.id);

      await deleteDoc(logRef);

      if (data.attachmentUrl !== "") {
        const attachmentRef = ref(storage, data.attachmentUrl);
        await deleteObject(attachmentRef);
      }

      const q = query(
        collection(db, "comments"),
        where("logId", "==", data.id)
      )

      const deleteComments = await getDocs(q);

      if (deleteComments.docs.length !== 0) {
        await deleteComments.forEach((doc) => {
          deleteDoc(doc.ref);
        })
      }

    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleToggleEditing = useCallback(() => {
    setEditing(prev => !prev);
    setUpdateConfirmModal(false);
  }, []);

  const handleCancelEditing = useCallback(() => {
    setEditing(false);
    setNewLog(contentsReplaceNewline());
  }, [contentsReplaceNewline]);

  const handleImageDelete = useCallback( async () => {
    try {
      const attachmentRef = ref(storage, data.attachmentUrl);
      const logsRef = doc(db, "logs", data.id);

      await updateDoc(logsRef, {
        attachmentUrl: ""
      });

      await deleteObject(attachmentRef);

      setImageDeleteConfirmModal(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleReport = useCallback( async () => {
    try {
      await addDoc(collection(db, "reports"), {
        reporterId: userInfo?.uid,
        reporterName: userInfo?.displayName,
        createdAt: Date.now(),
        solution: false,
        content: report,
        reportedLogId: data.id,
        reportedCommentId: "",
        reportedCreatorId: data.creatorId,
        reportedCreatorName: data.creatorName,
        type: "log"
      });

      setReport("");
      setReportModal(false);
    } catch (error) {
      console.log(error);
    }
  }, [userInfo, report, data]);

  const handleMoveUserFeed = (uid: string) => () => {
    router.push(`/feed/${uid}`);
  };

  useEffect(() => {
    if (openImageView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [openImageView]);

  const handleLike = useCallback( async () => {
    try {
      const logRef = doc(db, 'logs', data.id);

      if (!isLiked) {
        await updateDoc(logRef, {
          liked: arrayUnion(userInfo?.uid)
        });
      } else {
        await updateDoc(logRef, {
          liked: arrayRemove(userInfo?.uid)
        })
      }

      setIsLiked(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  }, [data, isLiked, userInfo]);

  const handleCommentLimitIncrement = useCallback(() => {
    setCommentsLimit((prev) => prev + 5);
  }, []);

  const newContentReplaceNewline = useCallback(() => {
    return newLog.replaceAll("\n", "<br />");
  }, [newLog]);

  const onSubmitUpdate = useCallback( async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const logRef = doc(db, "logs", data.id);

      await updateDoc(logRef, {
        content: newContentReplaceNewline()
      })

      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  }, [newContentReplaceNewline]);

  const onSubmitComment = useCallback( async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const logRef = doc(db, "logs", data.id);

      await addDoc(collection(db, "comments"), {
        logId: data.id,
        content: commentContent,
        createdAt: Date.now(),
        creatorName: userInfo?.displayName,
        creatorId: userInfo?.uid,
        creatorProfile: userInfo?.photoURL,
        isReply: false,
        commentId: "",
      })

      await updateDoc(logRef, {
        commentCount: increment(1),
      });

      setCommentContent("");
    } catch (error) {
      console.log(error);
    }
  }, [userInfo, data, commentContent]);

  const onChangeReport = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setReport(event.target.value);
  }, [setReport]);

  useEffect(() => {
    if (editing) {
      const end = EditTextareaRef.current.value.length;

      EditTextareaRef.current.setSelectionRange(end, end);
      EditTextareaRef.current.focus();
    }
  }, [EditTextareaRef, editing]);

  useEffect(() => {
    if ((!isDesktop && moreModal) || deleteConfirmModal || updateConfirmModal || imageDeleteConfirmModal || reportModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isDesktop, moreModal, deleteConfirmModal,
    updateConfirmModal, imageDeleteConfirmModal ,reportModal]);

  return (
    <>
      <Wrapper
        data-layout="logs"
        isDesktop={isDesktop}
      >
        <LogInfo>
          <Profile onClick={handleMoveUserFeed(data.creatorId)}>
            {
              data.creatorProfile
                ? (
                  <Image
                    src={data.creatorProfile}
                    alt="No profile"
                    width={36}
                    height={36}
                  />
                )
                : (
                  <Image
                    src="/image/icon/no-profile-icon.svg"
                    alt="No profile"
                    width={36}
                    height={36}
                  />
                )
            }
          </Profile>
          <Info>
            <UserName onClick={handleMoveUserFeed(data.creatorId)}>
              <p>{ data.creatorName }</p>
            </UserName>
            <CreatedAt>
              <p>
                {
                  moment(data.createdAt).locale('ko').fromNow()
                }
              </p>
            </CreatedAt>
          </Info>
        </LogInfo>
        {
          editing
            ? (
              <EditForm onSubmit={onSubmitUpdate}>
                <TextareaAutosize
                  ref={EditTextareaRef}
                  data-layout="editTextarea"
                  value={newLog}
                  onChange={onChangeNewLog}
                  placeholder="????????? ????????? ??????????????????!"
                  maxLength={120}
                  rows={1}
                  required
                />
                <div>
                  <button
                    type="button"
                    data-button="border"
                    onClick={handleCancelEditing}
                  >
                    ??????
                  </button>
                  <button
                    type="submit"
                  >
                    ??????
                  </button>
                </div>
              </EditForm>
            )
            : <Content
              dangerouslySetInnerHTML={{ __html: data.content }}
              isDesktop={isDesktop}
            />
        }
        {
          data.attachmentUrl && (
            <Attachment>
              <Image
                src={data.attachmentUrl}
                alt="log image"
                // priority={true}
                fill
                onClick={openImageViewModal}
                placeholder="blur"
                blurDataURL={`/image/logo/logo.svg`}
              />
              {
                editing && (
                  <button
                    type="button"
                    onClick={openImageDeleteConfirmModal}
                  >
                    <Image
                      src="/image/icon/image-delete-icon.svg"
                      alt="Image Clear"
                      width={24}
                      height={18}
                    />
                  </button>
                )
              }
            </Attachment>
          )
        }
        <MoreButton>
          <button type="button" onClick={openMoreModal}>
            <Image
              src="/image/icon/log-more-icon.svg"
              alt="More"
              width={18}
              height={5}
            />
          </button>
          {
            moreModal
              ? isDesktop
                ? (
                  <SmallModal
                    setMoreModal={setMoreModal}
                    modalTop={20}
                    modalLeft={50}
                  >
                    {
                      isOwner
                        ? (
                          <ul>
                            <li>
                              <button onClick={openUpdateConfirmModal}>
                                <span>??????</span>
                              </button>
                            </li>
                            <li>
                              <button onClick={openDeleteConfirmModal}>
                                <span>??????</span>
                              </button>
                            </li>
                          </ul>
                        )
                        : (
                          <ul>
                            <li>
                              <button onClick={openReportModal}>
                                <span>??????</span>
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
                                <span>??????</span>
                              </button>
                            </li>
                            <li>
                              <button onClick={openDeleteConfirmModal}>
                                <span>??????</span>
                              </button>
                            </li>
                          </ul>
                        )
                        : (
                          <ul>
                            <li>
                              <button onClick={openReportModal}>
                                <span>??????</span>
                              </button>
                            </li>
                          </ul>
                        )
                    }
                  </GlobalSelectModal>
                )
              : null
          }
        </MoreButton>
        <LogTools data-layout="logsTools">
          <button
            type="button"
            onClick={handleLike}
            style={isLiked ? { backgroundColor: $COLOR_MAIN } : {}}
          >
            <Image
              src={isLiked ? "/image/icon/like-active-icon.svg" : "/image/icon/like-false-icon.svg"}
              alt="Like false"
              width={16}
              height={16}
            />
            <span
              style={isLiked ? { color: $COLOR_WHITE } : {}}
            >
              { data.liked.length }
            </span>
          </button>
          <button
            type="button"
            onClick={openCommentList}
            style={openComment ? { opacity: '0.2' } : {}}
          >
            <Image
              src="/image/icon/comment-icon.svg"
              alt="Comment icon"
              width={16}
              height={16}
            />
            <span>
              { data.commentCount }
            </span>
          </button>
        </LogTools>
        {
          openComment && (
            <CommentList data-layout="commentWrapper">
              {
                comments.length <= 0
                  ? (
                    <NoComments>
                      <Image
                        src="/image/icon/no-comments-icon.svg"
                        alt="No comment list"
                        width={32}
                        height={32}
                      />
                      <span>
                        ????????? ????????? ????????????!
                      </span>
                    </NoComments>
                  )
                  : (
                    <>
                      {
                        comments.map((comment: any, i: number) => {
                          return (
                            <Comment
                              key={comment.id}
                              data={comment}
                              isDesktop={isDesktop}
                            />
                          )
                        })
                      }
                      {
                        data.commentCount > commentsLimit && (
                          <UnLimitContent
                            text="??? ?????? ??????????????? ???????????????!"
                            limit={5}
                            setLimit={setCommentsLimit}
                          />
                        )
                      }
                    </>
                  )
              }
              <form
                onSubmit={onSubmitComment}
                data-layout="commentInput"
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
                  value={commentContent}
                  placeholder="????????? ???????????????..."
                  onChange={onChangeCommentContent}
                />
              </form>
            </CommentList>
          )
        }
      </Wrapper>
      {
        deleteConfirmModal && (
          <GlobalConfirmModal
            onClick={handleDeleteLog}
            setModal={setDeleteConfirmModal}
            title="?????? ??????"
            text="????????? ????????? ??????????????????????"
            buttonText="??????"
            isDesktop={isDesktop}
          />
        )
      }
      {
        updateConfirmModal && (
          <GlobalConfirmModal
            onClick={handleToggleEditing}
            setModal={setUpdateConfirmModal}
            title="????????????"
            text="????????? ????????? ??????????????????????"
            buttonText="??????"
            isDesktop={isDesktop}
          />
        )
      }
      {
        imageDeleteConfirmModal && (
          <GlobalConfirmModal
            onClick={handleImageDelete}
            setModal={setImageDeleteConfirmModal}
            title="????????????"
            text="????????? ????????? ??????????????????????"
            buttonText="??????"
            isDesktop={isDesktop}
          />
        )
      }
      {
        openImageView && (
          <ImageViewModal
            data={data}
            setOpenImageView={setOpenImageView}
            isDesktop={isDesktop}
          />
        )
      }
      {
        reportModal && (
          <GlobalUpdateModal
            onClick={handleReport}
            setModal={setReportModal}
            title="????????????"
            buttonText="??????"
            isDesktop={isDesktop}
          >
            <ReportWrapper>
              <p>
                ????????? ?????? ??? ???????????? ????????? ??????????????????.
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

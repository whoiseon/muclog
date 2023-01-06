import {FormEvent, useCallback, useEffect, useRef, useState} from "react";
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
  Attachment, CommentList, CommentMoreButton,
  Content,
  CreatedAt, EditForm, Info,
  LogInfo, LogTools,
  MoreButton, NoComments,
  Profile,
  UserName,
  Wrapper
} from "components/mobile/Log/styles";
import GlobalConfirmModal from "components/common/GlobalConfirmModal";
import SmallModal from "components/common/SmallModal";
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

interface LogProps {
  data: DocumentData,
  isOwner: boolean,
}

export default function Log({ data, isOwner }: LogProps) {
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

  const contentsReplaceNewline = useCallback(() => {
    return data.content.replaceAll("<br />", "\n");
  }, [data.content]);

  const [newLog, onChangeNewLog, setNewLog] = useInput(contentsReplaceNewline());

  const [moreModal, setMoreModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [updateConfirmModal, setUpdateConfirmModal] = useState(false);
  const [imageDeleteConfirmModal, setImageDeleteConfirmModal] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("logId", "==", data.id),
      orderBy("createdAt", "desc"),
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
    setDeleteConfirmModal(true);
  }, []);

  const openUpdateConfirmModal = useCallback(() => {
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

  const handleDeleteLog = useCallback( async () => {
    try {
      const logRef = doc(db, "logs", data.id)

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

  useEffect(() => {
    if (editing) {
      const end = EditTextareaRef.current.value.length;

      EditTextareaRef.current.setSelectionRange(end, end);
      EditTextareaRef.current.focus();
    }
  }, [EditTextareaRef, editing]);

  return (
    <>
      <Wrapper data-layout="logs">
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
                  placeholder="당신의 로그를 수정해보세요!"
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
                    취소
                  </button>
                  <button
                    type="submit"
                  >
                    수정
                  </button>
                </div>
              </EditForm>
            )
            : <Content dangerouslySetInnerHTML={{ __html: data.content }} />
        }
        {
          data.attachmentUrl && (
            <Attachment>
              <Image
                src={data.attachmentUrl}
                alt={data.attachmentUrl}
                priority
                fill
                onClick={openImageViewModal}
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
            moreModal && (
              <SmallModal
                setMoreModal={setMoreModal}
                modalTop={14}
                modalLeft={48}
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
                        작성된 댓글이 없습니다!
                      </span>
                    </NoComments>
                  )
                  : (
                    <>
                      {
                        comments.map((comment: any, i: number) => {
                          return (
                            <Comment key={comment.id} data={comment} />
                          )
                        })
                      }
                      {
                        data.commentCount > commentsLimit && (
                          <CommentMoreButton>
                            <button
                              type="button"
                              onClick={handleCommentLimitIncrement}
                            >
                              <span>더 많은 코멘트를 보고싶어요!</span>
                            </button>
                          </CommentMoreButton>
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
                  placeholder="댓글을 입력하세요..."
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
            title="로그 삭제"
            text="정말로 로그를 삭제하시겠어요?"
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
            text="정말로 로그를 수정하시겠어요?"
            buttonText="수정"
          />
        )
      }
      {
        imageDeleteConfirmModal && (
          <GlobalConfirmModal
            onClick={handleImageDelete}
            setModal={setImageDeleteConfirmModal}
            title="삭제하기"
            text="정말로 사진을 삭제하시겠어요?"
            buttonText="삭제"
          />
        )
      }
      {
        openImageView && (
          <ImageViewModal
            data={data}
            setOpenImageView={setOpenImageView}
          />
        )
      }
    </>
  );
};

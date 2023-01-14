import {ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import Image from "next/image";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  increment,
  query,
  updateDoc,
  where
} from "@firebase/firestore";

import useInput from "hooks/useInput";
import {Content, Info, Profile, Text, Wrapper} from "./styles";
import moment from "moment";
import SmallModal from "components/common/SmallModal";
import GlobalConfirmModal from "components/common/GlobalConfirmModal";
import {db} from "lib/firebase";
import {EditForm} from "components/mobile/Log/Comment/styles";
import {useSelector} from "react-redux";
import {RootState} from "store";
import GlobalUpdateModal from "components/common/GlobalUpdateModal";
import {ReportWrapper} from "components/mobile/Log/styles";
import {reportData} from "public/data/report";
import {$COLOR_MAIN, $COLOR_WHITE} from "styles/variables";

interface ReplyProps {
  data: DocumentData,
}

export default function Reply({ data }: ReplyProps) {
  const router = useRouter();

  const userInfo = useSelector((state: RootState) => state.user);

  const EditInputRef = useRef<any>(null);

  const [isOwner, setIsOwner] = useState(data.creatorId === userInfo.uid);

  const [newContent, onChangeNewContent, setNewContent]= useInput(data.content);
  const [editing, setEditing] = useState(false);
  const [report, setReport] = useState("선정적인 내용을 포함하고 있습니다.");

  const [moreModal, setMoreModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [updateConfirmModal, setUpdateConfirmModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);

  const openUpdateConfirmModal = useCallback(() => {
    setUpdateConfirmModal(true);
  }, []);

  const openDeleteConfirmModal = useCallback(() => {
    setDeleteConfirmModal(true);
  }, [setDeleteConfirmModal]);

  const openMoreModal = useCallback(() => {
    setMoreModal(prev => !prev);
  }, []);

  const openReportModal = useCallback(() => {
    setReportModal(true);
  }, []);

  const handleMoveUserFeed = (uid: string) => () => {
    router.push(`/feed/${uid}`);
  };

  const handleDeleteReply = useCallback( async () => {
    try {
      const logRef = doc(db, "logs", data.logId);
      const CommentRef = doc(db, "comments", data.id);

      await deleteDoc(CommentRef);

      await updateDoc(logRef, {
        commentCount: increment(-1),
      });

      setDeleteConfirmModal(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleToggleEditing = useCallback(() => {
    setEditing(prev => !prev);
    setUpdateConfirmModal(false);
  }, []);

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

  const onSubmitReplyUpdate = useCallback( async (event: FormEvent<HTMLFormElement>) => {
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
      <Wrapper
        data-layout="reply"
      >
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
                <EditForm onSubmit={onSubmitReplyUpdate}>
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
                                  <button onClick={openReportModal}>
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
        </Content>
        <Image
          src="/image/icon/reply-icon.svg"
          alt="Reply icon"
          width={18}
          height={14}
        />
      </Wrapper>
      {
        deleteConfirmModal && (
          <GlobalConfirmModal
            onClick={handleDeleteReply}
            setModal={setDeleteConfirmModal}
            title="답글 삭제"
            text="정말로 답글을 삭제하시겠어요?"
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
            text="정말로 답글을 수정하시겠어요?"
            buttonText="수정"
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

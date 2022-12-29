import {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";

import {db} from "lib/firebase";
import {DocumentData, doc, deleteDoc, updateDoc} from "@firebase/firestore";
import dayjs from "dayjs";

import {
  Content,
  CreatedAt, EditForm, Info,
  LogInfo,
  MoreButton,
  Profile,
  UserName,
  Wrapper
} from "components/mobile/Log/styles";
import GlobalConfirmModal from "components/common/GlobalConfirmModal";
import SmallModal from "components/common/SmallModal";
import TextareaAutosize from "react-textarea-autosize";
import useInput from "hooks/useInput";

interface LogProps {
  data: DocumentData,
  isOwner: boolean,
}

export default function Log({ data, isOwner }: LogProps) {
  const EditTextareaRef = useRef<any>(null);

  const [editing, setEditing] = useState(false);

  const contentsReplaceNewline = useCallback(() => {
    return data.content.replaceAll("<br />", "\n");
  }, [data.content]);

  const [newLog, onChangeNewLog, setNewLog] = useInput(contentsReplaceNewline());

  const [moreModal, setMoreModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [updateConfirmModal, setUpdateConfirmModal] = useState(false);

  const openDeleteConfirmModal = useCallback(() => {
    setDeleteConfirmModal(true);
  }, []);

  const openUpdateConfirmModal = useCallback(() => {
    setUpdateConfirmModal(true);
  }, []);

  const openMoreModal = useCallback(() => {
    setMoreModal(prev => !prev);
  }, []);

  const handleDeleteLog = useCallback( async () => {
    try {
      await deleteDoc(doc(db, "logs", data.id));
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

  const newContentReplaceNewline = useCallback(() => {
    return newLog.replaceAll("\n", "<br />");
  }, [newLog]);

  const onSubmitUpdate = useCallback( async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const logsRef = doc(db, "logs", data.id)

      await updateDoc(logsRef, {
        content: newContentReplaceNewline()
      })

      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  }, [data.content, newContentReplaceNewline]);

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
          <Profile>
            {
              data.creatorProfile
                ? (
                  <Image
                    src="/image/icon/no-profile-icon.svg"
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
            <UserName>
              <p>{ data.creatorName }</p>
            </UserName>
            <CreatedAt>
              <p>{ dayjs(data.createdAt).format("MM-DD") }</p>
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
        <MoreButton>
          <button type="button" onClick={openMoreModal}>
            <Image
              src="/image/icon/log-more-icon.svg"
              alt="More"
              width={5}
              height={18}
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
    </>
  );
};

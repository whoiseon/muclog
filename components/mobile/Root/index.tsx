import {useRouter} from "next/router";

import {User} from "@firebase/auth";

import {LogList, Wrapper} from "components/mobile/Root/styles";
import WriteForm from "components/mobile/WriteForm";
import Log from "components/mobile/Log";
import {useCallback, useEffect, useState} from "react";
import {collection, DocumentData, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db} from "lib/firebase";
import GlobalConfirmModal from "components/common/GlobalConfirmModal";

interface RootProps {
  userInfo: User | null
}

export default function Root({ userInfo }: RootProps) {
  const [logs, setLogs] = useState<DocumentData[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);

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


  const onDeleteClick = useCallback(() => {

  }, []);

  return (
    <Wrapper>
      <WriteForm userInfo={userInfo} />
      <LogList>
        {
          logs.map((log) => {
            return <Log
              key={log.id}
              data={log}
              isOwner={log.creatorId === userInfo?.uid}
              setDeleteModal={setDeleteModal}
            />
          })
        }
      </LogList>
      {
        deleteModal && (
          <GlobalConfirmModal
            onClick={onDeleteClick}
            setDeleteModal={setDeleteModal}
            title="로그 삭제"
            text="정말로 로그를 삭제하시겠어요?"
            buttonText="삭제하기"
          />
        )
      }
    </Wrapper>
  )
}
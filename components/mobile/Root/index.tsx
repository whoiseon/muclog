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
            />
          })
        }
      </LogList>
    </Wrapper>
  )
}
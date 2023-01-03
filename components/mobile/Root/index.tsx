import {useCallback, useEffect, useState} from "react";

import {User} from "@firebase/auth";

import {collection, DocumentData, onSnapshot, orderBy, limit, query} from "@firebase/firestore";
import {db} from "lib/firebase";

import {LogList, Wrapper} from "components/mobile/Root/styles";
import Log from "components/mobile/Log";
import LogSkeleton from "components/common/Skeleton/LogSkeleton";
import WriteForm from "components/mobile/WriteForm";

interface RootProps {
  userInfo: User | null
}

export default function Root({ userInfo }: RootProps) {
  const [logs, setLogs] = useState<DocumentData[]>([]);
  const [logsLimit, setLogsLimit] = useState(20);

  useEffect(() => {
    const q = query(collection(db, "logs"), orderBy("createdAt", "desc"), limit(logsLimit));
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
          logs.length > 0
            ? (
              logs.map((log) => {
                return <Log
                  key={log.id}
                  data={log}
                  isOwner={log.creatorId === userInfo?.uid}
                  userInfo={userInfo}
                />
              })
            )
            : (
              Array.from(Array(5).keys()).map((v, i) => {
                return (
                  <LogSkeleton key={v + i} />
                )
              })
            )
        }
      </LogList>
    </Wrapper>
  )
}
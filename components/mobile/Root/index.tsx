import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {collection, DocumentData, onSnapshot, orderBy, limit, query} from "@firebase/firestore";
import {db} from "lib/firebase";

import {LogList, Wrapper} from "components/mobile/Root/styles";
import Log from "components/mobile/Log";
import LogSkeleton from "components/common/Skeleton/LogSkeleton";
import WriteForm from "components/mobile/WriteForm";
import {AppDispatch, RootState} from "store";
import UnLimitContent from "components/common/UnLimitContent";

export default function Root() {
  const dispatch = useDispatch<AppDispatch>();

  const userInfo = useSelector((state: RootState) => state.user);

  const [logs, setLogs] = useState<DocumentData[]>([]);
  const [logsLimit, setLogsLimit] = useState(20);

  useEffect(() => {
    const q = query(
      collection(db, "logs"),
      orderBy("createdAt", "desc"),
      limit(logsLimit)
    );

    onSnapshot(q, (snapshot) => {
      const logArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLogs(logArray);
    })
  }, [logsLimit]);

  return (
    <Wrapper>
      <WriteForm />
      <LogList>
        {
          logs.length > 0
            ? (
              logs.map((log) => {
                return <Log
                  key={log.id}
                  data={log}
                  isOwner={log.creatorId === userInfo?.uid}
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
        {
          logs.length >= logsLimit && (
            <UnLimitContent
              text="더 많은 로그들을 확인할래요!"
              limit={20}
              setLimit={setLogsLimit}
            />
          )
        }
      </LogList>
    </Wrapper>
  )
}
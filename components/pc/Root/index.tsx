import {LogList, Wrapper} from "components/pc/Root/styles";
import WriteForm from "components/mobile/WriteForm";
import {useSelector} from "react-redux";
import {RootState} from "store";
import {useEffect, useState} from "react";
import {collection, DocumentData, limit, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db} from "lib/firebase";
import Log from "components/mobile/Log";
import LogSkeleton from "components/common/Skeleton/LogSkeleton";
import UnLimitContent from "components/common/UnLimitContent";

export default function Root() {
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
      <WriteForm
        isDesktop={true}
      />
      <LogList>
        {
          logs.length > 0
            ? (
              logs.map((log) => {
                return <Log
                  key={log.id}
                  data={log}
                  isOwner={log.creatorId === userInfo?.uid}
                  isDesktop={true}
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
};

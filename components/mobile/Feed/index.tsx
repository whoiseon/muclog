import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import Image from "next/image";

import {MyBackground, MyName, MyProfile, Profile, Wrapper} from "components/mobile/Feed/styles";
import {RootState} from "store";
import {useCallback, useEffect, useState} from "react";
import {collection, doc, DocumentData, getDoc, limit, onSnapshot, orderBy, query, where} from "@firebase/firestore";
import {db} from "lib/firebase";
import WriteForm from "components/mobile/WriteForm";
import Log from "components/mobile/Log";
import LogSkeleton from "components/common/Skeleton/LogSkeleton";
import Loading from "components/common/Loading";

export default function Feed() {
  const router = useRouter();

  const myInfo = useSelector((state: RootState) => state.user);

  const [myLogsLimit, setMyLogsLimit] = useState(20);
  const [myLogs, setMyLogs] = useState<DocumentData[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);

  const [isMyFeed, setIsMyFeed] = useState(myInfo?.uid === router.query.uid);
  const [loading, setLoading] = useState(true);

  const getUserInfo = useCallback( async () => {
    const userCollection = doc(db, "Users", `${router.query.uid}`);
    const userSnap = await getDoc(userCollection);

    setUserInfo(userSnap.data());
  }, [router.query.uid])

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "logs"),
      where("creatorId", "==", router.query.uid),
      orderBy("createdAt", "desc"),
      limit(myLogsLimit)
    );

    onSnapshot(q, (snapshot) => {
      const logArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMyLogs(logArray);
    })
  }, [myLogsLimit, myInfo]);

  useEffect(() => {
    setIsMyFeed(myInfo?.uid === router.query.uid);

    if (userInfo) {
      setLoading(false);
    }
  }, [userInfo, myInfo, router.query.uid]);

  return (
    <>
      {
        !loading
          ? (
            <Wrapper>
              <MyBackground data-layout="mobile-menu-header-background" />
              <MyProfile
                data-layout="mobile-menu-header"
              >
                <Profile data-layout="mobile-menu-profile">
                  {
                    userInfo?.photoURL
                      ? (
                        <Image
                          src={userInfo?.photoURL}
                          alt="No profile"
                          priority
                          width={86}
                          height={86}
                        />
                      )
                      : (
                        <Image
                          src="/image/icon/no-profile-icon.svg"
                          alt="No profile"
                          priority
                          width={86}
                          height={86}
                        />
                      )
                  }
                  {
                    isMyFeed && (
                      <button data-layout="profile-photo-change-button">
                        <Image
                          src="/image/icon/photo-icon.svg"
                          alt="Photo"
                          width={16}
                          height={16}
                        />
                      </button>
                    )
                  }
                </Profile>
                <MyName>
                  <div>
                    { userInfo?.displayName }
                    {
                      isMyFeed && (
                        <button>
                          수정
                        </button>
                      )
                    }
                  </div>
                  <div>
                    { userInfo?.email }
                  </div>
                </MyName>
              </MyProfile>
              {isMyFeed && <WriteForm />}
              {
                myLogs.length > 0
                  ? (
                    myLogs.map((log) => {
                      return <Log
                        key={log.id}
                        data={log}
                        isOwner={log.creatorId === myInfo?.uid}
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
            </Wrapper>
          )
          : <Loading />
      }
    </>
  );
};

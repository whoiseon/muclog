import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import Image from "next/image";

import {
  ColorInputWrapper,
  MyBackground,
  MyName,
  MyProfile, NameChangeWrapper,
  PhotoChangeWrapper,
  Profile,
  Wrapper
} from "components/mobile/Feed/styles";
import {AppDispatch, RootState} from "store";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where
} from "@firebase/firestore";
import {db, auth} from "lib/firebase";
import WriteForm from "components/mobile/WriteForm";
import Log from "components/mobile/Log";
import LogSkeleton from "components/common/Skeleton/LogSkeleton";
import Loading from "components/common/Loading";
import GlobalUpdateModal from "components/common/GlobalUpdateModal";
import {updateProfileColor, updateProfileImage, updateUserName} from "store/slices/user/userSlice";
import {ProfileImageUpdateParams, UserNameUpdateParams} from "store/slices/user/type";

export default function Feed() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const myInfo = useSelector((state: RootState) => state.user);

  const [myLogsLimit, setMyLogsLimit] = useState(20);
  const [myLogs, setMyLogs] = useState<DocumentData[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [attachment, setAttachment] = useState("");

  const [isMyFeed, setIsMyFeed] = useState(myInfo?.uid === router.query.uid);
  const [loading, setLoading] = useState(true);
  const [profileColor, setProfileColor] = useState("");

  const [backgroundUpdateModal, setBackgroundUpdateModal] = useState(false);
  const [photoUpdateModal, setPhotoUpdateModal] = useState(false);

  const [myName, setMyName] = useState<string | null>("");
  const [nameUpdateModal, setNameUpdateModal] = useState(false);

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
    setProfileColor(userInfo?.profileColor);

    if (userInfo) {
      setLoading(false);
    }
  }, [userInfo, myInfo, router.query.uid]);

  const onChangeProfileColor = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setProfileColor(event.target.value);
  }, []);

  const openBackgroundUpdateModal = useCallback(() => {
    setBackgroundUpdateModal(true);
  }, []);

  const handleUpdateProfileColor = useCallback( async () => {
    if (profileColor !== userInfo?.profileColor) {
      await dispatch(updateProfileColor({
        uid: userInfo?.uid,
        color: profileColor
      }))
    }

    getUserInfo();
    setBackgroundUpdateModal(false);
  }, [userInfo, profileColor, getUserInfo]);

  const handleResetProfileColor = useCallback(() => {
    setProfileColor(userInfo?.profileColor)
  }, [userInfo?.profileColor]);

  const onFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    const theFile: any = files && files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result }
      } = finishedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }, []);

  const openPhotoUpdateModal = useCallback(() => {
    setPhotoUpdateModal(true);
  }, []);

  const handleUpdatePhoto = useCallback( async () => {
    if (attachment && attachment !== myInfo?.photoURL) {
      await dispatch(updateProfileImage({
        uid: myInfo?.uid,
        email: myInfo?.email,
        image: attachment
      } as ProfileImageUpdateParams));
    }

    await getUserInfo();
    setPhotoUpdateModal(false);
  }, [attachment, myInfo, getUserInfo]);

  const openNameUpdateModal = useCallback(() => {
    setNameUpdateModal(true);
    setMyName(myInfo?.displayName);
  }, [myInfo]);

  const handleUpdateName = useCallback( async () => {
    if (myName && myName !== myInfo?.displayName) {
      await dispatch(updateUserName({
        uid: myInfo?.uid,
        displayName: myName,
      } as UserNameUpdateParams));
    }

    await getUserInfo();
    setNameUpdateModal(false);
  }, [myInfo, myName, getUserInfo]);

  const onChangeMyName = (event: ChangeEvent<HTMLInputElement>) => {
    setMyName(event.target.value);
  };

  return (
    <>
      {
        !loading
          ? (
            <Wrapper>
              <MyBackground
                style={{
                  backgroundColor: userInfo?.profileColor
                }}
              >
                {
                  isMyFeed && (
                    <button
                      onClick={openBackgroundUpdateModal}
                    >
                      <Image
                        src="/image/icon/brush-icon.svg"
                        alt="Photo"
                        width={20}
                        height={20}
                      />
                    </button>
                  )
                }
              </MyBackground>
              <MyProfile
                data-layout="mobile-feed-profile"
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
                      <button
                        onClick={openPhotoUpdateModal}
                        data-layout="profile-photo-change-button"
                      >
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
                        <button
                          onClick={openNameUpdateModal}
                        >
                          <Image
                            src="/image/icon/config-icon.svg"
                            alt="Name change"
                            width={14}
                            height={14}
                          />
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
      {
        backgroundUpdateModal && (
          <GlobalUpdateModal
            onClick={handleUpdateProfileColor}
            setModal={setBackgroundUpdateModal}
            title="프로필 색상 변경"
            buttonText="변경"
          >
            <ColorInputWrapper>
              <p>변경할 색상</p>
              <input
                type="color"
                value={profileColor}
                onChange={onChangeProfileColor}
              />
              {
                profileColor !== userInfo?.profileColor && (
                  <>
                    <p>현재 적용된 색상</p>
                    <div
                      onClick={handleResetProfileColor}
                      style={{
                        backgroundColor: userInfo?.profileColor
                      }}
                    />
                  </>
                )
              }
            </ColorInputWrapper>
          </GlobalUpdateModal>
        )
      }
      {
        photoUpdateModal && (
          <GlobalUpdateModal
            onClick={handleUpdatePhoto}
            setModal={setPhotoUpdateModal}
            title="프로필 사진 변경"
            buttonText="변경"
          >
            <PhotoChangeWrapper>
              <div>
                <label
                  data-layout="profile-photo-picker"
                  htmlFor="profile_upload"
                >
                  {
                    attachment
                      ? (
                        <Image
                          src={attachment}
                          alt="photo preview"
                          fill
                        />
                      )
                      : (
                        <span>사진을 선택해주세요</span>
                      )
                  }
                </label>
                <input
                  type="file"
                  id="profile_upload"
                  accept="image/*"
                  onChange={onFileChange}
                />
              </div>
            </PhotoChangeWrapper>
          </GlobalUpdateModal>
        )
      }
      {
        nameUpdateModal && (
          <GlobalUpdateModal
            onClick={handleUpdateName}
            setModal={setNameUpdateModal}
            title="닉네임 변경"
            buttonText="변경"
          >
            <NameChangeWrapper>
              <input
                type="text"
                value={myName || ""}
                onChange={onChangeMyName}
              />
            </NameChangeWrapper>
          </GlobalUpdateModal>
        )
      }
    </>
  );
};

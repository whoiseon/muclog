import {DocumentData} from "@firebase/firestore";
import {
  Content,
  CreatedAt, Info,
  LogInfo,
  MoreButton,
  Profile,
  UserName,
  Wrapper
} from "components/mobile/Log/styles";
import dayjs from "dayjs";
import Image from "next/image";
import {useCallback, useState} from "react";
import SmallModal from "components/common/SmallModal";

interface LogProps {
  data: DocumentData,
  isOwner: boolean
}

export default function Log({ data, isOwner }: LogProps) {
  const [moreModal, setMoreModal] = useState(false);

  const handleMoreModal = useCallback(() => {
    setMoreModal(prev => !prev);
  }, []);

  return (
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
      <Content dangerouslySetInnerHTML={{ __html: data.content }} />
      <MoreButton>
        <button type="button" onClick={handleMoreModal}>
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
              modalLeft={38}
            >
              {
                isOwner
                  ? (
                    <ul>
                      <li>
                        <button>
                          <span>수정</span>
                        </button>
                      </li>
                      <li>
                        <button>
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
  );
};

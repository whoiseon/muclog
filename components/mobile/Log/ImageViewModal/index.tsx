import {Dispatch, SetStateAction, useCallback} from "react";

import {DocumentData} from "@firebase/firestore";

import {
  Attachment,
  Background, Content, CreatedAt,
  Header,
  Info,
  LogInfo,
  Profile,
  UserName,
  Wrapper
} from "components/mobile/Log/ImageViewModal/styles";
import Image from "next/image";
import moment from "moment";

interface ImageViewModalProps {
  data: DocumentData,
  setOpenImageView: Dispatch<SetStateAction<boolean>>
}

export default function ImageViewModal({ data, setOpenImageView }: ImageViewModalProps) {
  const closeImageViewModal = useCallback(() => {
    setOpenImageView(false);
  }, []);

  return (
    <Background>
      <Header>
        <button
          type="button"
          onClick={closeImageViewModal}
        >
          <Image
            src="/image/icon/dark/close-dark-icon.svg"
            alt="close"
            width={20}
            height={20}
          />
        </button>
      </Header>
      <Wrapper>
        <LogInfo>
          <Profile>
            {
              data.creatorProfile
                ? (
                  <Image
                    src={data.creatorProfile}
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
              <p>
                {
                  moment(data.createdAt).locale('ko').fromNow()
                }
              </p>
            </CreatedAt>
          </Info>
        </LogInfo>
        <Content dangerouslySetInnerHTML={{ __html: data.content }} />
        <Attachment>
          <Image
            src={data.attachmentUrl}
            alt={data.attachmentUrl}
            priority
            fill
          />
        </Attachment>
      </Wrapper>
    </Background>
  );
};

import {useRouter} from "next/router";

import {DocumentData} from "@firebase/firestore";

import {Content, Info, Profile, ReplyWrapper, Text, Wrapper} from "components/mobile/Log/Comment/styles";
import Image from "next/image";
import moment from "moment";

interface ReplyProps {
  data: DocumentData
}

export default function Reply({ data }: ReplyProps) {
  const router = useRouter();

  const handleMoveUserFeed = (uid: string) => () => {
    router.push(`/feed/${uid}`);
  };

  return (
    <Wrapper
      data-layout="reply"
    >
      <Profile
        onClick={handleMoveUserFeed(data.creatorId)}
      >
        {
          data.creatorProfile
            ? (
              <Image
                src={data.creatorProfile}
                alt="No profile"
                width={32}
                height={32}
              />
            )
            : (
              <Image
                src="/image/icon/no-profile-icon.svg"
                alt="No profile"
                width={32}
                height={32}
              />
            )
        }
      </Profile>
      <Content>
        <Info
          onClick={handleMoveUserFeed(data.creatorId)}
        >
          <span>{data.creatorName}</span>
          <span>
            {
              moment(data.createdAt).locale('ko').fromNow()
            }
          </span>
        </Info>
        <Text data-layout="commentText">
          <p>{data.content}</p>
        </Text>
      </Content>
      <Image
        src="/image/icon/reply-icon.svg"
        alt="Reply icon"
        width={18}
        height={14}
      />
    </Wrapper>
  );
};

import Image from "next/image";

import {DocumentData} from "@firebase/firestore";

import {Content, Info, Profile, Text, Wrapper} from "components/mobile/Log/Comment/styles";
import dayjs from "dayjs";

interface CommentProps {
  data: DocumentData
}

export default function Comment({ data }: CommentProps) {
  return (
    <Wrapper data-layout="comment">
      <Profile>
        {
          data.creatorProfile
            ? (
              <Image
                src="/image/icon/no-profile-icon.svg"
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
        <Info>
          <span>{data.creatorName}</span>
          <span>{dayjs(data.createdAt).format("MM-DD")}</span>
        </Info>
        <Text data-layout="commentText">
          {data.content}
        </Text>
      </Content>
    </Wrapper>
  );
};

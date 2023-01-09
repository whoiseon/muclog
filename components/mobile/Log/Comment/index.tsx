import Image from "next/image";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

import {DocumentData} from "@firebase/firestore";

import {Content, Info, Profile, Text, Wrapper} from "components/mobile/Log/Comment/styles";
import moment from "moment";
import {FormEvent, useCallback, useState} from "react";
import {RootState} from "store";
import useInput from "hooks/useInput";

interface CommentProps {
  data: DocumentData
}

export default function Comment({ data }: CommentProps) {
  const router = useRouter();

  const userInfo = useSelector((state: RootState) => state.user);

  const [replyContent, onChangeReplyContent, setReplyContent] = useInput("");
  const [isReply, setIsReply] = useState(false);

  const handleMoveUserFeed = (uid: string) => () => {
    router.push(`/feed/${uid}`);
  };

  const handleToggleReply = useCallback(() => {
    setIsReply((prev) => !prev);
  }, [setIsReply]);

  const onSubmitReply = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  return (
    <Wrapper data-layout="comment">
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
        <button
          onClick={handleToggleReply}
        >
          답글 달기
        </button>
        {
          isReply && (
            <form onSubmit={onSubmitReply}>
              {
                userInfo?.photoURL
                  ? (
                    <Image
                      src={userInfo?.photoURL}
                      alt="profile"
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
              <input
                value={replyContent}
                placeholder="답글을 입력하세요..."
                onChange={onChangeReplyContent}
              />
            </form>
          )
        }
      </Content>
    </Wrapper>
  );
};

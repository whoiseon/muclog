import Skeleton from "components/common/Skeleton/index";
import {Wrapper, CreatedAt, Info, LogInfo, Profile, UserName, Content} from "components/mobile/Log/styles";

export default function LogSkeleton() {
  return (
    <Wrapper data-layout="logs">
      <LogInfo>
        <Profile>
          <Skeleton type="image" />
        </Profile>
        <Info>
          <UserName>
            <Skeleton type="nickname" />
          </UserName>
          <CreatedAt>
            <Skeleton type="date" />
          </CreatedAt>
        </Info>
      </LogInfo>
      <Content>
        <Skeleton type="content" />
      </Content>
    </Wrapper>
  );
};

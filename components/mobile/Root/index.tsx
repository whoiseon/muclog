import {useRouter} from "next/router";

import {User} from "@firebase/auth";

import {Wrapper} from "components/mobile/Root/styles";
import WriteForm from "components/mobile/WriteForm";

interface RootProps {
  userInfo: User | null
}

export default function Root({ userInfo }: RootProps) {
  const router = useRouter();

  return (
    <Wrapper>
      <WriteForm userInfo={userInfo} />
    </Wrapper>
  )
}
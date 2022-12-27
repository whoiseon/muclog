import {auth} from "lib/firebase";
import {signOut} from "@firebase/auth";
import {useRouter} from "next/router";
import {Wrapper} from "components/mobile/Root/styles";

export default function Root() {
  const router = useRouter();

  return (
    <Wrapper>
      Hello, Muclog
    </Wrapper>
  )
}
import {auth} from "lib/firebase";
import {signOut} from "@firebase/auth";
import {useRouter} from "next/router";

export default function Root() {
  const router = useRouter();

  const onLogOutClick = async () => {
    await signOut(auth);
    await router.push("/");
  };

  return (
    <div>
      <div>
        <button onClick={onLogOutClick}>Log out</button>
      </div>
    </div>
  )
}
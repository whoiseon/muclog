import {useRouter} from "next/router";
import {signOut} from "@firebase/auth";
import {auth} from "lib/firebase";

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
};

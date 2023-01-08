import {useCallback} from "react";
import Image from "next/image";
import Link from "next/link";

import {DocumentData} from "@firebase/firestore";

import {ArrowIcon, Profile, Wrapper} from "components/mobile/Layout/Search/UserProfile/styles";

interface UserProfileParams {
  data: DocumentData,
  onClose: () => void
}

export default function UserProfile({ data, onClose }: UserProfileParams) {
  return (
    <Link
      href={`/feed/${data.uid}`}
      onClick={onClose}
    >
      <Wrapper>
        <Profile>
          {
            data?.photoURL
              ? (
                <Image
                  src={data?.photoURL}
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
          <p>
            { data.displayName }
          </p>
        </Profile>
        <ArrowIcon>
          <Image
            src="/image/icon/menu-arrow-icon.svg"
            alt="Menu Arrow"
            width={18}
            height={12}
          />
        </ArrowIcon>
      </Wrapper>
    </Link>
  );
};

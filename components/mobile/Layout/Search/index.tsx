import {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";
import Image from "next/image";

import {db} from "lib/firebase";
import {collection, DocumentData, endAt, onSnapshot, orderBy, query, startAt} from "@firebase/firestore";

import {EmptyUser, Wrapper} from "components/mobile/Layout/Search/styles";
import {debounce} from "utils/debounce";
import {useDispatch} from "react-redux";
import UserProfile from "components/mobile/Layout/Search/UserProfile";

interface SearchProps {
  setSearchActive: Dispatch<SetStateAction<boolean>>
}

export default function Search({ setSearchActive }: SearchProps) {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<DocumentData[]>([]);

  const onCloseSearchModal = useCallback(() => {
    setSearchActive(false);
    setKeyword("");
    setSearchResult([]);
  }, []);

  const handleSearchDebounce = useCallback(
    debounce((value: string) => {
      if (value !== "") {
        const q = query(
          collection(db, "Users"),
          orderBy("displayName"),
          startAt(value),
          endAt(value + "\uf8ff")
        );

        onSnapshot(q, (snapshot) => {
          const searchArray = snapshot.docs.map(doc => ({
            ...doc.data(),
          }));

          setSearchResult(searchArray);
        })
      }
    }, 200),
    [debounce]
  );

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    handleSearchDebounce(event.target.value);

    if (event.target.value === "") {
      setSearchResult([]);
    }
  };

  return (
    <Wrapper>
      <header>
        <button
          type="button"
          onClick={onCloseSearchModal}
        >
          <Image
            src="/image/icon/route-back-icon.svg"
            alt="history back"
            width={24}
            height={24}
          />
        </button>
        <div>
          <input
            type="text"
            value={keyword}
            onChange={onChangeKeyword}
            placeholder="Muclog 검색"
          />
        </div>
      </header>
      {
        searchResult.length > 0
          ? (
            searchResult.map((result, i) => {
              return (
                <UserProfile
                  key={result.uid}
                  data={result}
                  onClose={onCloseSearchModal}
                />
              )
            })
          )
          : keyword === ""
            ? (
              <EmptyUser>
                <h1>누구의 프로필이 궁금하신가요?</h1>
              </EmptyUser>
            )
            : (
              <EmptyUser>
                <h1>찾을 수 없는 회원님이네요..</h1>
              </EmptyUser>
            )
      }
    </Wrapper>
  );
};

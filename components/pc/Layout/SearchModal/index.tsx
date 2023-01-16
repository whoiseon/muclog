import {ChangeEvent, Dispatch, MouseEvent, SetStateAction, useCallback, useEffect, useRef, useState} from "react";

import {collection, DocumentData, endAt, onSnapshot, orderBy, query, startAt} from "@firebase/firestore";

import {Background, EmptyUser, Input, UserList, Wrapper} from "components/pc/Layout/SearchModal/styles";
import Image from "next/image";
import {debounce} from "utils/debounce";
import {db} from "lib/firebase";
import UserProfile from "components/mobile/Layout/Search/UserProfile";

interface SearchModalProps {
  keyword: string,
  setKeyword: Dispatch<SetStateAction<string>>,
  setModal: Dispatch<SetStateAction<boolean>>,
}

export default function SearchModal({ keyword, setKeyword, setModal }: SearchModalProps) {
  const InputRef = useRef<any>(null);

  const [searchResult, setSearchResult] = useState<DocumentData[]>([]);

  const onClickBackground = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setModal(false);
    }
  }, []);

  const onCloseSearchModal = useCallback(() => {
    setKeyword("");
    setModal(false);
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

  useEffect(() => {
    const end = InputRef.current.value.length;

    InputRef.current.setSelectionRange(end, end);
    InputRef.current.focus();
  }, [InputRef]);

  useEffect(() => {
    if (keyword) {
      handleSearchDebounce(keyword);
    }
  }, [keyword, handleSearchDebounce]);

  return (
    <Background
      onClick={onClickBackground}
    >
      <div
        onClick={onClickBackground}
      >
        <Wrapper
          data-layout="desktopSearchModal"
        >
          <Input>
            <input
              type="text"
              ref={InputRef}
              value={keyword}
              onChange={onChangeKeyword}
            />
            <Image
              src="/image/icon/search-icon.svg"
              alt="search"
              width={14}
              height={14}
            />
          </Input>
          <UserList>
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
          </UserList>
        </Wrapper>
      </div>
    </Background>
  )
}
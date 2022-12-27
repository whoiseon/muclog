import {FormEvent, MouseEvent, useCallback, useState} from "react";
import useInput from "hooks/useInput";

import { auth } from "lib/firebase";
import {
  createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider,
  signInWithEmailAndPassword, signInWithPopup, updateProfile
} from "@firebase/auth";

import {Background, SocialLogin, ToggleAccount, Welcome, Wrapper} from "components/Auth/styles";

export default function Auth() {
  const [newAccount, setNewAccount] = useState(false);

  const [name, onChangeName, setName] = useInput("");
  const [email, onChangeEmail, setEmail] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [error, setError] = useState("");

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let data

      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
        // await updateProfile(data, {
        //   displayName: name
        // })
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error: any) {
      console.log(error.code);
    }
  }, [newAccount, email, password]);

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = useCallback(async (event: any) => {
    const { target: { name } } = event;
    let provider = new GoogleAuthProvider();

    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(auth, provider)
  }, []);

  return (
    <Background>
      <Wrapper>
        <Welcome>
          <h1>
            {
              newAccount
                ? "처음 뵐게요 만나서 반가워요!"
                : "오늘도 오셨네요 환영해요!"
            }
          </h1>
          <p>
            {
              newAccount
                ? "합류하신 것을 축하드려요!"
                : "자유롭게 의견을 공유해보세요!"
            }
          </p>
        </Welcome>
        <SocialLogin>
          <p>
            SNS 로그인
          </p>
          <div>
            <button
              type="button"
              name="google"
              onClick={onSocialClick}
            >
              구글 계정으로 로그인
            </button>
            <button
              type="button"
              name="github"
              onClick={onSocialClick}
            >
              깃허브 계정으로 로그인
            </button>
          </div>
        </SocialLogin>
        <form onSubmit={onSubmit}>
          <p>
            {
              newAccount ? "가입 정보" : "계정 정보"
            }
          </p>
          {
            newAccount && (
              <input
                type="text"
                placeholder="이름 또는 닉네임"
                required
                value={name}
                onChange={onChangeName}
              />
            )
          }
          <input
            type="email"
            placeholder="이메일"
            required
            value={email}
            onChange={onChangeEmail}
          />
          <input
            type="password"
            placeholder="비밀번호"
            required
            value={password}
            onChange={onChangePassword}
          />
          <button type="submit">
            {
              newAccount
                ? "회원가입"
                : "로그인"
            }
          </button>
          { error }
          <ToggleAccount>
            {
              newAccount
                ? "이미 회원이신가요?"
                : "아직 회원이 아니신가요?"
            }
            <span onClick={toggleAccount}>
              {
                newAccount
                  ? "로그인"
                  : "회원가입"
              }
          </span>
          </ToggleAccount>
        </form>
      </Wrapper>
    </Background>
  );
};

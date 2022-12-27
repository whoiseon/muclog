import {
  Background,
  ErrorMessage,
  InputWrapper,
  Left,
  Right,
  ToggleAccount,
  Welcome,
  Wrapper
} from "components/pc/Auth/styles";
import {FormEvent, useCallback, useEffect, useState} from "react";
import useInput from "hooks/useInput";
import Image from "next/image";

import {auth} from "lib/firebase";
import {
  createUserWithEmailAndPassword, GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword, signInWithPopup, updateProfile
} from "@firebase/auth";

import {SocialIcon, SocialLogin} from "components/pc/Auth/styles";
import Animation from "components/common/Animation";

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
        await updateProfile(data.user, {
          displayName: name
        })
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error: any) {
      setError(error.code);
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

  const handleErrorTranslate = (error: string) => {
    switch (error) {
      case 'auth/user-not-found':
        return '아이디와 비밀번호를 다시 확인해주세요.';
      case 'auth/wrong-password':
        return '비밀번호를 다시 확인해주세요.';
      case 'auth/invalid-email':
        return '이메일 형식에 맞지 않습니다.';
      default:
        return error;
    }
  }

  useEffect(() => {
    setError("");
  }, [newAccount])

  return (
    <Background>
      <Wrapper>
        <Left>
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
          {
            !newAccount && (
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
                    <SocialIcon>
                      <Image
                        src="/image/icon/dark/google-sns-dark-icon.svg"
                        alt="Google login"
                        width={22}
                        height={22}
                      />
                    </SocialIcon>
                  </button>
                  <button
                    type="button"
                    name="github"
                    onClick={onSocialClick}
                  >
                    <SocialIcon>
                      <Image
                        src="/image/icon/dark/github-sns-dark-icon.svg"
                        alt="Github login"
                        width={22}
                        height={22}
                      />
                    </SocialIcon>
                  </button>
                </div>
              </SocialLogin>
            )
          }
          <form onSubmit={onSubmit}>
            {
              newAccount && (
                <InputWrapper>
                  <p>이름 또는 닉네임</p>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={onChangeName}
                  />
                </InputWrapper>
              )
            }
            <InputWrapper>
              <p>이메일</p>
              <input
                type="text"
                required
                value={email}
                onChange={onChangeEmail}
              />
            </InputWrapper>
            <InputWrapper>
              <p>비밀번호</p>
              <input
                type="password"
                required
                value={password}
                onChange={onChangePassword}
              />
            </InputWrapper>
            {error && <ErrorMessage>{handleErrorTranslate(error)}</ErrorMessage>}
            <button type="submit">
              {
                newAccount
                  ? "회원가입"
                  : "로그인"
              }
            </button>
          </form>
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
        </Left>
        <Right>
          <Animation />
        </Right>
      </Wrapper>
    </Background>
  )
}
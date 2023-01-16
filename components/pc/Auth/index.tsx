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
  GithubAuthProvider, GoogleAuthProvider,
  signInWithPopup
} from "@firebase/auth";

import {SocialIcon, SocialLogin} from "components/pc/Auth/styles";
import Animation from "components/common/Animation";
import {fetchLoginRequest, fetchSignUpRequest} from "store/slices/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "store";

export default function Auth() {
  const dispatch = useDispatch<AppDispatch>();

  const { signUpError, loginError, loginLoading, signUpLoading } = useSelector((state: RootState) => state.user);

  const [newAccount, setNewAccount] = useState(false);

  const [name, onChangeName, setName] = useInput("");
  const [email, onChangeEmail, setEmail] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [error, setError] = useState("");

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newAccount) {
      dispatch(fetchSignUpRequest({
        name,
        email,
        password
      }));
    } else {
      dispatch(fetchLoginRequest({
        email,
        password
      }));
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

  useEffect(() => {
    if (signUpError) {
      setError(signUpError);
    } else if (loginError) {
      setError(loginError);
    }
  }, [signUpError, loginError]);

  useEffect(() => {
    setError("");
    setName("");
    setEmail("");
    setPassword("");
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
                    name="Google"
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
                    name="Github"
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
            {error && <ErrorMessage>{ error }</ErrorMessage>}
            <button
              type="submit"
              data-button={loginLoading || signUpLoading ? "border" : ""}
              disabled={loginLoading || signUpLoading}
            >
              {
                newAccount
                  ? signUpLoading
                    ? "회원가입 중..."
                    : "회원가입"
                  : loginLoading
                    ? "로그인 중..."
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
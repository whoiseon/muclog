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
                  ? "?????? ????????? ????????? ????????????!"
                  : "????????? ???????????? ????????????!"
              }
            </h1>
            <p>
              {
                newAccount
                  ? "???????????? ?????? ???????????????!"
                  : "???????????? ????????? ??????????????????!"
              }
            </p>
          </Welcome>
          {
            !newAccount && (
              <SocialLogin>
                <p>
                  SNS ?????????
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
                  <p>?????? ?????? ?????????</p>
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
              <p>?????????</p>
              <input
                type="text"
                required
                value={email}
                onChange={onChangeEmail}
              />
            </InputWrapper>
            <InputWrapper>
              <p>????????????</p>
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
                    ? "???????????? ???..."
                    : "????????????"
                  : loginLoading
                    ? "????????? ???..."
                    : "?????????"
              }
            </button>
          </form>
          <ToggleAccount>
            {
              newAccount
                ? "?????? ???????????????????"
                : "?????? ????????? ????????????????"
            }
            <span onClick={toggleAccount}>
              {
                newAccount
                  ? "?????????"
                  : "????????????"
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
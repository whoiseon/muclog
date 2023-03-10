import {FormEvent, MouseEvent, useCallback, useEffect, useState} from "react";
import useInput from "hooks/useInput";

import { auth } from "lib/firebase";
import {
  createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider,
  signInWithEmailAndPassword, signInWithPopup, updateProfile
} from "@firebase/auth";

import {
  Background,
  ErrorMessage,
  SocialIcon,
  SocialLogin,
  ToggleAccount,
  Welcome,
  Wrapper
} from "components/mobile/Auth/styles";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "store";
import {fetchLoginRequest, fetchLoginWithSocial, fetchSignUpRequest} from "store/slices/user/userSlice";

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

  const onSocialClick = useCallback((name: string) => (event: any) => {
    dispatch(fetchLoginWithSocial({
      name,
    }));
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
                  onClick={onSocialClick("Google")}
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
                  onClick={onSocialClick("Github")}
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
          <p>
            {
              newAccount ? "?????? ??????" : "?????? ??????"
            }
          </p>
          {
            newAccount && (
              <input
                type="text"
                placeholder="?????? ?????? ?????????"
                required
                value={name}
                onChange={onChangeName}
              />
            )
          }
          <input
            type="email"
            placeholder="?????????"
            required
            value={email}
            onChange={onChangeEmail}
          />
          <input
            type="password"
            placeholder="????????????"
            required
            value={password}
            onChange={onChangePassword}
          />
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
        </form>
      </Wrapper>
    </Background>
  );
};

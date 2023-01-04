export interface userState {
  uid: string | null,
  email: string | null,
  displayName: string | null,
  photoURL: string| null,
  type: string | null,
  loginLoading: boolean,
  loginSuccess: boolean,
  loginError: string | null,
  signUpLoading: boolean,
  signUpSuccess: boolean,
  signUpError: string | null
  fetchUserInfoLoading: boolean,
  fetchUserInfoSuccess: boolean,
  fetchUserInfoError: string | null,
}

export interface SignUpRequestParams {
  name: string,
  email: string,
  password: string
}

export interface LoginRequestParams {
  email: string,
  password: string
}

export interface SocialLoginRequestParams {
  name: string,
}


export interface UserRequestParams {
  uid: string,
  email: string,
}
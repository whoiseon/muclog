export interface authState {
  token: string | null,
  uid: string | null,
  email: string | null,
  type: string | null,
  loginLoading: boolean,
  loginSuccess: boolean,
  loginError: string | null,
  signUpLoading: boolean,
  signUpSuccess: boolean,
  signUpError: string | null
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

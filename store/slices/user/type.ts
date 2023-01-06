export interface userState {
  uid: string | null,
  email: string | null,
  displayName: string | null,
  profileColor: string | null
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
  updateProfileColorLoading: boolean,
  updateProfileColorSuccess: boolean,
  updateProfileColorError: string | null,
  updateProfileImageLoading: boolean,
  updateProfileImageSuccess: boolean,
  updateProfileImageError: string | null
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

export interface ProfileColorUpdateParams {
  uid: string,
  color: string,
}

export interface ProfileImageUpdateParams {
  uid: string,
  email: string,
  image: string,
}
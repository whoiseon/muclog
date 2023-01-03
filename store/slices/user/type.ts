export interface userState {
  email: string | null,
  displayName: string | null,
  photoURL: string| null,
  fetchLoading: boolean,
  fetchSuccess: boolean,
  fetchError: string | null,
}

export interface UserRequestParams {
  uid: string,
  email: string,
}
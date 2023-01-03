import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {auth, db} from "lib/firebase";
import {doc, getDoc, setDoc, updateDoc} from "@firebase/firestore";
import {
  AuthProvider,
  createUserWithEmailAndPassword, GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword, signInWithPopup,
  updateProfile
} from "@firebase/auth";

import {authState, LoginRequestParams, SignUpRequestParams, SocialLoginRequestParams} from "store/slices/auth/type";
import {fetchUserInfoRequest} from "store/slices/user/userSlice";
import {UserRequestParams} from "store/slices/user/type";

const initialState: authState = {
  token: null,
  uid: null,
  email: null,
  type: null,
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
  signUpLoading: false,
  signUpSuccess: false,
  signUpError: null
}

export const fetchSignUpRequest = createAsyncThunk(
  "auth/FETCH_SIGNUP_REQUEST",
  async ({ name, email, password }: SignUpRequestParams, { rejectWithValue, dispatch }) => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credential.user, {
        displayName: name,
      });

      const userCollection = doc(db, "Users", credential.user.uid);

      await setDoc(userCollection, {
        uid: credential.user.uid,
        type: "email",
        email,
        displayName: name,
        photoURL: credential.user.photoURL,
      });

      dispatch(fetchUserInfoRequest(<UserRequestParams>{
        uid: credential.user.uid,
        email: credential.user.email
      }))

      return {
        token: await credential.user.getIdToken(),
        email: credential.user.email,
        uid: credential.user.uid,
        type: "email"
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          throw rejectWithValue('아이디와 비밀번호를 다시 확인해주세요.');
        case 'auth/wrong-password':
          throw rejectWithValue('비밀번호를 다시 확인해주세요.');
        case 'auth/invalid-email':
          throw rejectWithValue('이메일 형식에 맞지 않습니다.');
        case 'auth/email-already-in-use':
          throw rejectWithValue('이미 사용중인 이메일입니다.');
        case 'auth/weak-password':
          throw rejectWithValue('비밀번호는 6자 이상 입력해주세요.');
        default:
          throw rejectWithValue('회원가입 오류');
      }
    }
  }
);

export const fetchLoginRequest = createAsyncThunk(
  "auth/FETCH_LOGIN_REQUEST",
  async ({ email, password }: LoginRequestParams, { rejectWithValue, dispatch }) => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(fetchUserInfoRequest(<UserRequestParams>{
        uid: credential.user.uid,
        email: credential.user.email
      }))

      return {
        token: await credential.user.getIdToken(),
        email: credential.user.email,
        uid: credential.user.uid,
        type: "email"
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          throw rejectWithValue('아이디와 비밀번호를 다시 확인해주세요.');
        case 'auth/wrong-password':
          throw rejectWithValue('비밀번호를 다시 확인해주세요.');
        case 'auth/weak-password':
          throw rejectWithValue('비밀번호는 6자 이상 입력해주세요.');
        default:
          throw rejectWithValue('로그인 오류');
      }
    }
  }
);

export const fetchLoginWithSocial = createAsyncThunk(
  "auth/FETCH_LOGIN_WITH_SOCIAL",
  async ({ name }: SocialLoginRequestParams, { rejectWithValue, dispatch }) => {
    try {
      const provider = name === "Google"
        ? new GoogleAuthProvider()
        : new GithubAuthProvider()

      const credential = await signInWithPopup(auth, provider);

      const userCollection = doc(db, 'Users', credential.user.uid);
      const userSnap = await getDoc(userCollection);

      if (userSnap.exists()) {
        await updateDoc(userSnap.ref, {
          uid: credential.user.uid,
          type: `${name} Auth`,
          email: credential.user.email,
          displayName: credential.user.displayName,
          photoURL: credential.user.photoURL,
        });
      } else {
        await setDoc(userCollection, {
          uid: credential.user.uid,
          type: `${name} Auth`,
          email: credential.user.email,
          displayName: credential.user.displayName,
          photoURL: credential.user.photoURL,
        });
      }

      dispatch(fetchUserInfoRequest(<UserRequestParams>{
        uid: credential.user.uid,
        email: credential.user.email
      }))

      return {
        token: await credential.user.getIdToken(),
        email: credential.user.email,
        uid: credential.user.uid,
        type: `${name} Auth`
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          throw rejectWithValue('');
        default:
          throw rejectWithValue("로그인 오류");
      }
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => (
    builder
      .addCase(fetchSignUpRequest.pending, (state, action) => {
        state.signUpLoading = true;
        state.signUpSuccess = false;
        state.signUpError = null;
      })
      .addCase(fetchSignUpRequest.fulfilled, (state, action) => {
        state.signUpError = null;
        state.signUpLoading = false;
        state.signUpSuccess = true;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.type = action.payload.type;
      })
      .addCase(fetchSignUpRequest.rejected, (state, action) => {
        state.signUpLoading = false;
        state.signUpSuccess = false;
        state.signUpError = action.payload as string;
        state.token = null;
        state.email = null;
        state.uid = null;
      })
      .addCase(fetchLoginRequest.pending, (state, action) => {
        state.loginLoading = true;
        state.loginSuccess = false;
        state.loginError = null;
      })
      .addCase(fetchLoginRequest.fulfilled, (state, action) => {
        state.loginError = null;
        state.loginLoading = false;
        state.loginSuccess = true;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.type = action.payload.type;
      })
      .addCase(fetchLoginRequest.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = false;
        state.loginError = action.payload as string;
        state.token = null;
        state.email = null;
        state.uid = null;
      })
      .addCase(fetchLoginWithSocial.pending, (state, action) => {
        state.loginLoading = true;
        state.loginSuccess = false;
        state.loginError = null;
      })
      .addCase(fetchLoginWithSocial.fulfilled, (state, action) => {
        state.loginError = null;
        state.loginLoading = false;
        state.loginSuccess = true;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.type = action.payload.type;
      })
      .addCase(fetchLoginWithSocial.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = false;
        state.loginError = action.payload as string;
        state.token = null;
        state.email = null;
        state.uid = null;
      })
  ),
});

export default authSlice;

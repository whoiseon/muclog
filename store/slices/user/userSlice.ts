import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {db, auth, storage} from "lib/firebase";

import {
  LoginRequestParams, ProfileColorUpdateParams, ProfileImageUpdateParams,
  SignUpRequestParams,
  SocialLoginRequestParams, UserNameUpdateParams,
  UserRequestParams,
  userState
} from "store/slices/user/type";
import {doc, getDoc, setDoc, updateDoc} from "@firebase/firestore";
import {
  createUserWithEmailAndPassword, GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword, signInWithPopup, signOut,
  updateProfile, User
} from "@firebase/auth";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";

import {v4 as randomFileNameUuid} from "uuid";
import {$COLOR_MAIN} from "styles/variables";

const initialState: userState = {
  uid: null,
  email: null,
  displayName: null,
  profileColor: null,
  photoURL: null,
  type: null,
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
  signUpLoading: false,
  signUpSuccess: false,
  signUpError: null,
  logOutLoading: false,
  logOutSuccess: false,
  logOutError: null,
  fetchUserInfoLoading: false,
  fetchUserInfoSuccess: false,
  fetchUserInfoError: null,
  updateProfileColorLoading: false,
  updateProfileColorSuccess: false,
  updateProfileColorError: null,
  updateProfileImageLoading: false,
  updateProfileImageSuccess: false,
  updateProfileImageError: null,
  updateUserNameLoading: false,
  updateUserNameSuccess: false,
  updateUserNameError: null
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
        profileColor: $COLOR_MAIN,
        photoURL: credential.user.photoURL,
      });

      dispatch(fetchUserInfoRequest(<UserRequestParams>{
        uid: credential.user.uid,
        email: credential.user.email
      }))

      return {
        uid: credential.user.uid,
        email,
        displayName: name,
        photoURL: credential.user.photoURL,
        profileColor: $COLOR_MAIN,
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
        displayName: credential.user.displayName,
        email: credential.user.email,
        uid: credential.user.uid,
        photoURL: credential.user.photoURL,
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

      const userCollection = await doc(db, 'Users', credential.user.uid);
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
          profileColor: $COLOR_MAIN,
          photoURL: credential.user.photoURL,
        });
      }

      dispatch(fetchUserInfoRequest(<UserRequestParams>{
        uid: credential.user.uid,
        email: credential.user.email
      }))

      return {
        email: credential.user.email,
        displayName: credential.user.displayName,
        uid: credential.user.uid,
        photoURL: credential.user.photoURL,
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

export const fetchUserInfoRequest = createAsyncThunk(
  "user/FETCH_USERINFO_REQUEST",
  async (userRequest: UserRequestParams, { rejectWithValue }) => {
    try {
      const { uid, email } = userRequest;
      const userCollection = doc(db, "Users", uid);
      const userSnap = await getDoc(userCollection);

      if (userSnap.exists()) {
        const data = userSnap.data();

        return {
          uid,
          email,
          displayName: data.displayName,
          photoURL: data.photoURL,
          profileColor: data.profileColor,
          type: data.type
        }
      } else {
        return {
          uid: null,
          email: null,
          displayName: null,
          photoURL: null,
          profileColor: null,
          type: null
        }
      }
    } catch (error) {
      throw rejectWithValue("유저 정보 요청 실패");
    }
  }
);

export const fetchUserLogout = createAsyncThunk(
  "user/FETCH_USER_LOGOUT",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      throw rejectWithValue("유저 정보 요청 실패");
    }
  }
);

export const updateProfileColor = createAsyncThunk(
  "user/UPDATE_PROFILE_COLOR",
  async ({ uid, color }: ProfileColorUpdateParams, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'Users', uid);

      await updateDoc(userRef, {
        profileColor: color,
      });

      return color
    } catch (error) {
      throw rejectWithValue("유저 정보 요청 실패");
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "user/UPDATE_PROFILE_IMAGE",
  async ({ uid, email, image }: ProfileImageUpdateParams, { rejectWithValue }) => {
    try {
      let attachmentUrl = "";

      const attachmentRef = ref(storage, `${email}/profile/${randomFileNameUuid()}`);
      const response = await uploadString(attachmentRef, image, "data_url");

      attachmentUrl = await getDownloadURL(response.ref);

      const userRef = doc(db, 'Users', uid);

      await updateDoc(userRef, {
        photoURL: attachmentUrl,
      });

      return attachmentUrl
    } catch (error) {
      throw rejectWithValue("유저 정보 요청 실패");
    }
  }
);

export const updateUserName = createAsyncThunk(
  "user/UPDATE_USER_NAME",
  async ({ uid, displayName }: UserNameUpdateParams, { rejectWithValue }) => {
    try {
      await updateProfile(<User>auth.currentUser, {
        displayName,
      });

      const userCollection = doc(db, "Users", uid);

      await updateDoc(userCollection, {
        displayName,
      });

      return displayName
    } catch (error) {
      throw rejectWithValue("유저 정보 요청 실패");
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
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
        state.displayName = action.payload.displayName;
        state.profileColor = action.payload.profileColor;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.type = action.payload.type;
        state.photoURL = action.payload.photoURL;
      })
      .addCase(fetchSignUpRequest.rejected, (state, action) => {
        state.signUpLoading = false;
        state.signUpSuccess = false;
        state.signUpError = action.payload as string;
        state.displayName = null;
        state.profileColor = null;
        state.email = null;
        state.uid = null;
        state.type = null;
        state.photoURL = null;
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
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.type = action.payload.type;
        state.photoURL = action.payload.photoURL;
      })
      .addCase(fetchLoginRequest.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = false;
        state.loginError = action.payload as string;
        state.displayName = null;
        state.email = null;
        state.uid = null;
        state.type = null;
        state.photoURL = null;
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
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.type = action.payload.type;
        state.photoURL = action.payload.photoURL;
      })
      .addCase(fetchLoginWithSocial.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = false;
        state.loginError = action.payload as string;
        state.displayName = null;
        state.email = null;
        state.uid = null;
        state.type = null;
        state.photoURL = null;
      })
      .addCase(fetchUserInfoRequest.pending, (state) => {
        state.fetchUserInfoSuccess = false;
        state.fetchUserInfoLoading = true;
        state.fetchUserInfoError = null;
      })
      .addCase(fetchUserInfoRequest.fulfilled, (state, action) => {
        state.fetchUserInfoLoading = false;
        state.fetchUserInfoSuccess = true;
        state.fetchUserInfoError = null;
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.profileColor = action.payload.profileColor;
        state.photoURL = action.payload.photoURL;
        state.type = action.payload.type;
      })
      .addCase(fetchUserInfoRequest.rejected, (state, action) => {
        state.fetchUserInfoLoading = false;
        state.fetchUserInfoSuccess = false;
        state.fetchUserInfoError = action.payload as string;
        state.uid = null;
        state.email = null;
        state.photoURL = null;
        state.displayName = null;
        state.profileColor = null;
        state.type = null;
      })
      .addCase(fetchUserLogout.pending, (state) => {
        state.logOutSuccess = false;
        state.logOutLoading = true;
        state.logOutError = null;
      })
      .addCase(fetchUserLogout.fulfilled, (state, action) => {
        state.logOutLoading = false;
        state.logOutSuccess = true;
        state.logOutError = null;
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.profileColor = null;
        state.photoURL = null;
        state.type = null;
      })
      .addCase(fetchUserLogout.rejected, (state, action) => {
        state.logOutLoading = false;
        state.logOutSuccess = false;
        state.logOutError = action.payload as string;
      })
      .addCase(updateProfileColor.pending, (state) => {
        state.updateProfileColorSuccess = false;
        state.updateProfileColorLoading = true;
        state.updateProfileColorError = null;
      })
      .addCase(updateProfileColor.fulfilled, (state, action) => {
        state.updateProfileColorLoading = false;
        state.updateProfileColorSuccess = true;
        state.updateProfileColorError = null;
        state.profileColor = action.payload;
      })
      .addCase(updateProfileColor.rejected, (state, action) => {
        state.updateProfileColorLoading = false;
        state.updateProfileColorSuccess = false;
        state.updateProfileColorError = action.payload as string;
      })
      .addCase(updateProfileImage.pending, (state) => {
        state.updateProfileImageSuccess = false;
        state.updateProfileImageLoading = true;
        state.updateProfileImageError = null;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.updateProfileImageLoading = false;
        state.updateProfileImageSuccess = true;
        state.updateProfileImageError = null;
        state.photoURL = action.payload;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.updateProfileImageLoading = false;
        state.updateProfileImageSuccess = false;
        state.updateProfileImageError = action.payload as string;
      })
      .addCase(updateUserName.pending, (state) => {
        state.updateUserNameSuccess = false;
        state.updateUserNameLoading = true;
        state.updateUserNameError = null;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.updateUserNameLoading = false;
        state.updateUserNameSuccess = true;
        state.updateUserNameError = null;
        state.displayName = action.payload;
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.updateUserNameLoading = false;
        state.updateUserNameSuccess = false;
        state.updateUserNameError = action.payload as string;
      })
  )
});

export default userSlice;

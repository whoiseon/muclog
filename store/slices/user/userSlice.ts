import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {auth} from "lib/firebase";
import {db} from "lib/firebase";

import {UserRequestParams, userState} from "store/slices/user/type";
import {doc, getDoc, setDoc, updateDoc} from "@firebase/firestore";

const initialState: userState = {
  email: null,
  displayName: null,
  photoURL: null,
  fetchLoading: false,
  fetchSuccess: false,
  fetchError: null,
}

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
          email,
          displayName: data.displayName,
          photoURL: data.photoURL
        }
      } else {
        return {
          email: null,
          displayName: null,
          photoURL: null
        }
      }
    } catch (error) {
      throw rejectWithValue("유저 정보 요청 실패");
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => (
    builder
      .addCase(fetchUserInfoRequest.pending, (state) => {
        state.fetchSuccess = false;
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchUserInfoRequest.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.fetchSuccess = true;
        state.fetchError = null;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.photoURL = action.payload.photoURL;
      })
      .addCase(fetchUserInfoRequest.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchSuccess = false;
        state.fetchError = action.payload as string;
        state.email = null;
        state.photoURL = null;
        state.displayName = null;
      })
  )
});

export default userSlice;

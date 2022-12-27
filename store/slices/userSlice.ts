import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {userState} from "store/types/state";

const initialState: userState = {
  userInfo: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice
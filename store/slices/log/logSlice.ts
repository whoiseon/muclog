import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {LogState} from "store/slices/log/type";

const initialState: LogState = {
  logs: null,
  fetchLogsLoading: false,
  fetchLogsSuccess: false,
  fetchLogsError: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => (
    builder
  )
});

export default userSlice;

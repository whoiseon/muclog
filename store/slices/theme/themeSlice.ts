import {createSlice} from '@reduxjs/toolkit';

import {ThemeState} from "store/slices/theme/type";

const initialState: ThemeState = {
  darkMode: true
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    }
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice;

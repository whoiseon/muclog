import { configureStore } from "@reduxjs/toolkit";
import userSlice from "store/slices/user/userSlice";
import logger from "redux-logger";
import themeSlice from "store/slices/theme/themeSlice";

const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      theme: themeSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
    devTools: false,
  });
}

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch'];

export default store;


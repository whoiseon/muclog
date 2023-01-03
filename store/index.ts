import { configureStore } from "@reduxjs/toolkit";
import userSlice from "store/slices/user/userSlice";
import logger from "redux-logger";
import authSlice from "store/slices/auth/authSlice";

const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
    devTools: true,
  });
}

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch'];

export default store;


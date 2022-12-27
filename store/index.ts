import { configureStore } from "@reduxjs/toolkit";
import userSlice from "store/slices/userSlice";
import logger from "redux-logger";

const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
    devTools: true,
  });
}

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch'];

export default store;


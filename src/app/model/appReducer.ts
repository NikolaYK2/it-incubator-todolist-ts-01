import {
  AnyAction,
  createAction,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import { authActions } from "features/auth/model/authReducer";
import { authApi } from "features/auth/api/authApi";
import { BaseResponsTodolistsType, ResultCode } from "common/api/todolistsApi";
import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";

//SAGAS WATCHER ------------------------------
export function* appSagas() {
  yield takeEvery(INITIALIZED_APP, initAppSaga);
}

export const INITIALIZED_APP = "app/init";
const initAppAction = createAction(INITIALIZED_APP);

export function* initAppSaga() {
  const res: AxiosResponse<BaseResponsTodolistsType> = yield call(authApi.me);
  //   .finally(() => {
  //   put(appAction.initializedApp({ initialized: true }));
  // });
  if (res.data.resultCode === ResultCode.Ok) {
    yield put(authActions.setIsLoggedIn({ isLoggedIn: true }));
    yield put(appAction.setStatus({ status: "succeeded" }));
  } else {
    // error
    //   yield put(res.data);
  }
  yield put(appAction.initializedApp({ initialized: true }));
}

// reducer -----------------------------------------------------
export type StatusType = "idle" | "loading" | "succeeded" | "failed";

export interface AppStateType {
  status: StatusType;
  error: string | null;
  initialized: boolean;
}

const initialState: AppStateType = {
  status: "idle",
  error: null,
  initialized: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<{ status: StatusType }>) => {
      state.status = action.payload.status;
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    initializedApp: (state, action: PayloadAction<{ initialized: boolean }>) => {
      state.initialized = action.payload.initialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred";
        }
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      });
  },
});

export const appReducer = slice.reducer;
export const appAction = { ...slice.actions, initAppAction };

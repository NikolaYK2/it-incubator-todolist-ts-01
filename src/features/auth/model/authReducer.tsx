import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, AuthLoginType, CaptchaUrl } from "features/auth/api/authApi";
import { BaseResponsTodolistsType, ResultCode } from "common/api/todolistsApi";
import { todoActions } from "features/todolistsList/model/todos/todoListsReducer";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

export function* authSagas() {
  yield takeEvery(AUTH_LOGIN, authLoginSaga);
  yield takeEvery(AUTH_LOGOUT, authLogoutSaga);
}

const AUTH_LOGIN = "auth/login";
const AUTH_LOGIN_SUCCESS = "auth/loginSuccess";
const authLoginAction = createAction<AuthLoginType>(AUTH_LOGIN);
const authLoginSuccessAction = createAction<unknown>(AUTH_LOGIN_SUCCESS);

function* authLoginSaga(action: ReturnType<typeof authLoginAction>) {
  const res: AxiosResponse<BaseResponsTodolistsType> = yield call(authApi.authLogin, action.payload);
  if (res.data.resultCode === ResultCode.Ok) {
    yield put(authLoginSuccessAction(true));
  } else if (res.data.resultCode === 10) {
    const res: AxiosResponse<CaptchaUrl> = yield call(authApi.captcha);
    yield put(authActions.captchaImgUrl({ captcha: res.data.url }));
  }
  // return rejectWithValue(res.data);
}

// --------------------------------------
const AUTH_LOGOUT = "auth/logout";
const authLogoutAction = createAction<undefined>(AUTH_LOGOUT);

function* authLogoutSaga() {
  const res: AxiosResponse<BaseResponsTodolistsType> = yield call(authApi.logout);
  if (res.data.resultCode === ResultCode.Ok) {
    yield put(todoActions.clearData());
    // yield put(authLogoutAction());
  } else {
    // handleServerAppError(res.data, dispatch);
  }
}

// slice - редьюсеры создаем с помощью функции createSlice
export type AuthInitType = {
  isLoggedIn: boolean;
  captcha: string;
};
const initialState: AuthInitType = {
  isLoggedIn: false,
  captcha: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    captchaImgUrl: (state, action: PayloadAction<{ captcha: string }>) => {
      state.captcha = action.payload.captcha;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLoginSuccessAction, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(authLogoutAction, (state) => {
        state.isLoggedIn = false;
      });
    // .addCase(initializedApp.fulfilled, (state)=>{
    //   state.isLoggedIn = true
    // })
  },
});

export const authReducer = slice.reducer;
export const authActions = { ...slice.actions, authLoginAction, authLogoutAction };

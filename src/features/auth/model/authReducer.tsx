import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, AuthLoginType, AuthMeType, CaptchaUrl } from "features/auth/api/authApi";
import { BaseResponsTodolistsType, ResultCode } from "common/api/todolistsApi";
import { todoActions } from "features/todolistsList/model/todos/todoListsReducer";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { handleServerAppErrorSaga } from "common/utils";
import sagaTryCatch from "common/utils/thunkTryCatch";

export function* authSagas() {
  yield takeEvery(AUTH_LOGIN, authLoginSaga);
  yield takeEvery(AUTH_LOGOUT, authLogoutSaga);
}

export const AUTH_LOGIN = "auth/login";
const AUTH_LOGIN_SUCCESS = "auth/loginSuccess";
const authLoginAction = createAction<AuthLoginType>(AUTH_LOGIN);
const authLoginSuccessAction = createAction<unknown>(AUTH_LOGIN_SUCCESS);

export function* authLoginSaga(action: ReturnType<typeof authLoginAction>) {
  yield* sagaTryCatch(function* () {
    const res: AxiosResponse<BaseResponsTodolistsType<AuthMeType>> = yield call(authApi.authLogin, action.payload);
    if (res.data.resultCode === ResultCode.Ok) {
      localStorage.setItem("sn-token", res.data.data.token);
      yield put(authLoginSuccessAction(true));
    } else if (res.data.resultCode === 10) {
      const res: AxiosResponse<CaptchaUrl> = yield call(authApi.captcha);
      yield put(authActions.captchaImgUrl({ captcha: res.data.url }));
    } else {
      yield* handleServerAppErrorSaga(res.data);
    }
  });
}

// --------------------------------------
const AUTH_LOGOUT = "auth/logout";
const authLogoutAction = createAction<undefined>(AUTH_LOGOUT);

export function* authLogoutSaga() {
  yield* sagaTryCatch(function* () {
    const res: AxiosResponse<BaseResponsTodolistsType> = yield call(authApi.logout);
    if (res.data.resultCode === ResultCode.Ok) {
      localStorage.clear();
      yield put(todoActions.clearData());
    } else {
      yield* handleServerAppErrorSaga(res.data);
    }
  });
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
  },
});

export const authReducer = slice.reducer;
export const authActions = { ...slice.actions, authLoginAction, authLogoutAction, authLoginSuccessAction };

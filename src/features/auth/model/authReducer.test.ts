import { AUTH_LOGIN, authActions, authLoginSaga, authLogoutSaga } from "features/auth/model/authReducer";
import { call, put } from "redux-saga/effects";
import { appAction } from "app/model/appReducer";
import { authApi, AuthLoginType, AuthMeType, CaptchaUrl } from "features/auth/api/authApi";
import { BaseResponsTodolistsType } from "common/api/todolistsApi";
import { AxiosResponse } from "axios";
import { todoActions } from "features/todolistsList/model/todos/todoListsReducer";

let meResponse: AxiosResponse<BaseResponsTodolistsType<AuthMeType>>;
let authLogin: AuthLoginType;
beforeEach(() => {
  authLogin = {
    email: "saga@gmail.com",
    password: "123",
    rememberMe: false,
    captcha: false,
  };
  meResponse = {
    data: {
      resultCode: 0,
      messages: ["Some error occurred"],
    },
  } as AxiosResponse<BaseResponsTodolistsType<AuthMeType>>;
});

test("auth login saga", () => {
  const action = authLogin;
  const generator = authLoginSaga({ type: AUTH_LOGIN, payload: action });

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(generator.next().value).toEqual(call(authApi.authLogin, action));

  expect(generator.next(meResponse).value).toEqual(put(authActions.authLoginSuccessAction(true)));

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "idle" })));
});

test("auth login saga error server", () => {
  const action = authLogin;
  const generator = authLoginSaga({ type: AUTH_LOGIN, payload: action });

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(generator.next().value).toEqual(call(authApi.authLogin, action));

  meResponse.data.resultCode = 1;
  expect(generator.next(meResponse).value).toEqual(put(appAction.setError({ error: meResponse.data.messages[0] })));

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));
});

test("auth login saga error network", () => {
  const action = authLogin;
  const generator = authLoginSaga({ type: AUTH_LOGIN, payload: action });

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(generator.next().value).toEqual(call(authApi.authLogin, action));

  expect(generator.throw("error").value).toEqual(put(appAction.setError({ error: '"error"' })));

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));
});

test("auth login saga captcha", () => {
  const action = authLogin;
  const generator = authLoginSaga({ type: AUTH_LOGIN, payload: action });

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(generator.next().value).toEqual(call(authApi.authLogin, action));

  meResponse.data.resultCode = 10;
  expect(generator.next(meResponse).value).toEqual(call(authApi.captcha));

  const urlCaptcha: AxiosResponse<CaptchaUrl> = { data: { url: "captcha" } } as AxiosResponse<CaptchaUrl>;
  expect(generator.next(urlCaptcha).value).toEqual(put(authActions.captchaImgUrl({ captcha: urlCaptcha.data.url })));
});

test("logout", () => {
  const generator = authLogoutSaga();

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(generator.next().value).toEqual(call(authApi.logout));

  expect(generator.next(meResponse).value).toEqual(put(todoActions.clearData()));

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "idle" })));
});

test("logout error server", () => {
  const generator = authLogoutSaga();

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(generator.next().value).toEqual(call(authApi.logout));

  expect(generator.throw("error").value).toEqual(put(appAction.setError({ error:  "\"error\"" })));

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "idle" })));
});

test("logout error network", () => {
  const generator = authLogoutSaga();

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(generator.next().value).toEqual(call(authApi.logout));
  meResponse.data.resultCode = 1;
  expect(generator.next(meResponse).value).toEqual(put(appAction.setError({ error: meResponse.data.messages[0] })));

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));

  expect(generator.next().value).toEqual(put(appAction.setStatus({ status: "idle" })));
});

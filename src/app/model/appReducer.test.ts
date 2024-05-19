import { appAction, appReducer, AppStateType, initAppSaga } from "app/model/appReducer";
import { call, put } from "redux-saga/effects";
import { authApi } from "features/auth/api/authApi";
import { BaseResponsTodolistsType } from "common/api/todolistsApi";
import { AxiosResponse } from "axios";
import { authActions } from "features/auth/model/authReducer";

let app: AppStateType;
let meResponse: AxiosResponse<BaseResponsTodolistsType>;
beforeEach(() => {
  app = {
    status: "idle",
    error: null,
    initialized: false,
  };
  meResponse = { data: { resultCode: 0 } } as AxiosResponse<BaseResponsTodolistsType>;
});

test("status", () => {
  const newApp = appReducer(app, appAction.setStatus({ status: "succeeded" }));

  expect(newApp.status).toBe("succeeded");
  expect(app.status).toBe("idle");
});

test("status error", () => {
  const newApp = appReducer(app, appAction.setError({ error: "hera se!" }));

  expect(newApp.error).toBe("hera se!");
  expect(app.error).toBe(null);
});

test("initializedAppSaga login success", () => {
  const gen = initAppSaga();
  let result = gen.next();
  expect(result.value).toEqual(call(authApi.me));

  result = gen.next(meResponse);
  expect(result.value).toEqual(put(authActions.setIsLoggedIn({ isLoggedIn: true })));
  result = gen.next();
  expect(result.value).toEqual(put(appAction.setStatus({ status: "succeeded" })));
  result = gen.next();
  expect(result.value).toEqual(put(appAction.initializedApp({ initialized: true })));
});

test("initializedAppSaga login unsuccessful", () => {
  const gen = initAppSaga();
  let result = gen.next();
  expect(result.value).toEqual(call(authApi.me));

  meResponse.data.resultCode = 1
  result = gen.next(meResponse);
  expect(result.value).toEqual(put(appAction.initializedApp({ initialized: true })));
});


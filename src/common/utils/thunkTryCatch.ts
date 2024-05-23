import { handleServerNetworkErrorSaga } from "common/utils/errorUtils";
import { put } from "redux-saga/effects";
import { appAction } from "app/model/appReducer";

function* sagaTryCatch<T>(logic: () => Generator<any, T, any>): Generator {
  yield put(appAction.setStatus({ status: "loading" }));
  try {
    yield* logic();
  } catch (e) {
    yield* handleServerNetworkErrorSaga(e);
  } finally {
    yield put(appAction.setStatus({ status: "idle" }));
  }
}

export default sagaTryCatch;
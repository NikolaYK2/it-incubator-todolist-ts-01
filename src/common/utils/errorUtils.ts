import { appAction } from "app/model/appReducer";
import axios from "axios";
import { BaseResponsTodolistsType } from "common/api/todolistsApi";
import { put } from "redux-saga/effects";

/**
 * handleServerAppError - global обработка errors Обрабатывает ошибки сервера приложения
 * @template D - Тип данных, возвращаемых сервером.
 * @param data - принимаемые значения res
 * @param showError - change global errors off/on
 */
export function* handleServerAppErrorSaga<D>(
  data: BaseResponsTodolistsType<D>,
  showError: boolean = true //Делаем по умолчанию true
){
  if (showError) {
    if (data.messages.length) {
      yield put(appAction.setError({ error: data.messages[0] }));
    } else {
      yield put(appAction.setError({ error: "Some error occurred" }));
    }
  }
  yield put(appAction.setStatus({ status: "failed" }));
}

// ---------------------------------------------------------------------------------------------
export function* handleServerNetworkErrorSaga(error: unknown) {
  let errorMessage = "Some error occurred";

  // ❗Проверка на наличие axios ошибки
  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error?.message || errorMessage;
    // ❗ Проверка на наличие нативной ошибки
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`;
    // ❗Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(error);
  }

  yield put(appAction.setError({ error: errorMessage }));
  yield put(appAction.setStatus({ status: "failed" }));
}

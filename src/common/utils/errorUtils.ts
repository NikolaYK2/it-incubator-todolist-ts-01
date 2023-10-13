import { appAction } from "app/appReducer";
import { AppDispatch } from "app/store";
import axios from "axios";
import { BaseResponsTodolistsType } from "common/api/todolistsApi";

/**
 * handleServerAppError - global обработка errors Обрабатывает ошибки сервера приложения
 * @template D - Тип данных, возвращаемых сервером.
 * @param data - принимаемые значения res
 * @param dispatch - statuses, loading, в случаи если нет ошибки на BC пишем свою
 * @param showError - change global errors off/on
 */
export const handleServerAppError = <D>(
  data: BaseResponsTodolistsType<D>,
  dispatch: AppDispatch,
  showError: boolean = true //Делаем по умолчанию true
) => {
  // export const handleServerAppError = <D>(data: ResponsTodolistsType<D>, dispatch: Dispatch<SetAppErrorACType | SetAppStatusACType>) => {
  if  (showError){
    if (data.messages.length) {
      dispatch(appAction.setError({ error: data.messages[0] }));
      // dispatch(setAppErrorAC(data.messages[0]));
    } else {
      dispatch(appAction.setError({ error: "Some error occurred" }));
      // dispatch(setAppErrorAC('Some error occurred'))
    }
    // dispatch(setAppStatusAC('failed'));
  }
  dispatch(appAction.setStatus({ status: "failed" }));
};


export const handleServerNetworkError = (error: unknown, dispatch: AppDispatch): void => {
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

  dispatch(appAction.setError({ error: errorMessage }));
  dispatch(appAction.setStatus({ status: "failed" }));
};

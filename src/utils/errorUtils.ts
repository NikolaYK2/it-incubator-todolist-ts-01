import { ResponsTodolistsType } from "api/todolistsApi";
import { appAction } from "app/appReducer";
import { AppDispatch } from "app/store";
import axios, { AxiosError } from "axios";

export const handleServerAppError = <D>(data: ResponsTodolistsType<D>, dispatch: AppDispatch) => {
  // export const handleServerAppError = <D>(data: ResponsTodolistsType<D>, dispatch: Dispatch<SetAppErrorACType | SetAppStatusACType>) => {
  if (data.messages.length) {
    dispatch(appAction.setError({ error: data.messages[0] }));
    // dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(appAction.setError({ error: "Some error occurred" }));
    // dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(appAction.setStatus({ status: "failed" }));
  // dispatch(setAppStatusAC('failed'));
};

// export const _handleServerNetworkError = <D>(
//   error: { message: string },
//   dispatch: ThunkDispatch<unknown, unknown, AnyAction>
// ) => {
//   dispatch(appAction.setError({ error: error.message ? error.message : "Network error!" }));
//   dispatch(appAction.setStatus({ status: "failed" }));
// };
//навароченная версия
export const handleServerNetworkError = (error: unknown, dispatch: AppDispatch) => {
  const err = error as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Network error!";
    dispatch(appAction.setError({ error }));
  }else {
    dispatch(appAction.setError({ error: `Native error ${err.message}` }));
  }
  dispatch(appAction.setStatus({ status: "failed" }));
};

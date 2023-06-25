import { ResponsTodolistsType } from "api/todolistsApi";
import { AnyAction } from "redux";
import { appAction } from "app/appReducer";
import { ThunkDispatch } from "redux-thunk";

export const handleServerAppError = <D>(
  data: ResponsTodolistsType<D>,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
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

export const handleServerNetworkError = <D>(
  error: {
    message: string;
  },
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
  dispatch(
    appAction.setError({
      error: error.message ? error.message : "Network error!",
    })
  );
  dispatch(appAction.setStatus({ status: "failed" }));
};

import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, AppRootStateType } from "app/model/store";
import { BaseResponsTodolistsType } from "common/api/todolistsApi";
import { handleServerNetworkErrorSaga } from "common/utils/errorUtils";

export const thunkTryCatch = async <T>( //функция принимает два параметра
  //первым параметром принимает thunkAPI
  //BaseThunkAPI<S-state app, E-extra arg, D- dispatch, rejectValue>
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponsTodolistsType>,
  //logic - наша логика с которой мы работаем, которая будет выполняться и она будет возвращать промис,
  // по этому fn должна быть async
  logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const {rejectWithValue } = thunkAPI;
  // dispatch(appAction.setStatus({ status: "loading" }));//теперь это отрабатывает в экстраредьюсерах
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkErrorSaga(e);
    return rejectWithValue(null);
  }
  // finally {
  //   dispatch(appAction.setStatus({ status: "idle" }));
  // }
};
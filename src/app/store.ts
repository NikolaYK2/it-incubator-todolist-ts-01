import { Action, configureStore, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { todoListsReducer } from "features/todolistsList/todoListsReducer";
import { tasksReducer } from "features/todolistsList/tasksReducer";
import { appReducer } from "app/appReducer";
import { authReducer } from "features/auth/authReducer";
import thunkMiddleware from "redux-thunk";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: unknown;
}>();

import {Action, configureStore, createAsyncThunk, ThunkAction} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {todoListsReducer} from "features/todolistsList/todoListsReducer";
import {tasksReducer} from "features/todolistsList/tasksReducer";
import {appReducer} from "app/appReducer";
import {authReducer} from "features/login/authReducer";

export const store = configureStore({
    reducer: {
        todoLists: todoListsReducer,
        tasks: tasksReducer,
        app: appReducer,
        auth: authReducer,
    }
})

export type AppDispatch = typeof store.dispatch
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    Action<string>
>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType,
    dispatch: AppDispatch,
    rejectValue: unknown
}>()


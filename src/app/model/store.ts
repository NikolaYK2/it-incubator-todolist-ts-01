import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { todoListsReducer, todoListsSagas } from "features/todolistsList/model/todos/todoListsReducer";
import { tasksSagas, tasksReducer } from "features/todolistsList/model/tasks/tasksReducer";
import { appReducer, appSagas } from "app/model/appReducer";
import { authReducer } from "features/auth/model/authReducer";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    appSagas(),
    tasksSagas(),
    todoListsSagas()
  ]);
}

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todoLists: todoListsReducer,
  tasks: tasksReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

export type AppRootStateType = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

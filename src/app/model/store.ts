import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { todoListsReducer } from "features/todolistsList/model/todos/todoListsReducer";
import { tasksReducer } from "features/todolistsList/model/tasks/tasksReducer";
import { appReducer, initAppSaga, INITIALIZED_APP } from "app/model/appReducer";
import { authReducer } from "features/auth/model/authReducer";
import createSagaMiddleware from "redux-saga";
import { takeEvery } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield takeEvery(INITIALIZED_APP, initAppSaga);
}

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todoLists: todoListsReducer,
  tasks: tasksReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  // middleware: [sagaMiddleware],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga); //подключаем и даем рутовый вотчер

// function* rootWatcher() {
//   yield takeLatest(INITIALIZED_APP, initAppSaga); //принимает два параметра, экшн активатор и
// }


  export type AppDispatch = typeof store.dispatch;

export type AppRootStateType = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

import React from "react";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { v1 } from "uuid";
import { tasksReducer } from "features/todolistsList/tasksReducer";
import { todoListsReducer } from "features/todolistsList/todoListsReducer";
import { TaskStatuses, TodoTaskPriorities } from "api/todolistsApi";
import { appReducer } from "app/appReducer";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "features/auth/authReducer";
import { AppRootStateType } from "app/store";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

//StoryBook =========================================
const initialState = {
  todoLists: [
    {
      id: "todolistID_1",
      title: "What to learn",
      filter: "All",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: "todolistID_2",
      title: "What to buy",
      filter: "All",
      addedDate: "",
      order: 0,
      entityStatus: "loading",
    },
  ],
  tasks: {
    todolistID_1: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_1",
        description: "",
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_1",
        description: "",
      },
      {
        id: v1(),
        title: "ReactJS",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_1",
        description: "",
      },
      {
        id: v1(),
        title: "Next",
        status: TaskStatuses.New,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_1",
        description: "",
      },
    ],
    todolistID_2: [
      {
        id: v1(),
        title: "Beer",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_2",
        description: "",
      },
      {
        id: v1(),
        title: "Meat",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_2",
        description: "",
      },
      {
        id: v1(),
        title: "Fish",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_2",
        description: "",
      },
      {
        id: v1(),
        title: "Drink",
        status: TaskStatuses.New,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_2",
        description: "",
      },
    ],
  },
  app: {
    status: "idle",
    error: null,
    initialized: false,
  },
  auth: {
    isLoggedIn: false,
    // email: '',
    // password: '',
    // rememberMe:false
  },
};
export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialState as AppRootStateType,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});
// export const storyBookStore = createStore(
//   rootReducer,
//   initialState as AppRootStateType,
//   applyMiddleware(thunkMiddleware)
// );

export const decorators = [
  (Story: any) => (
    <div style={{ margin: "3em" }}>
      <Provider store={storyBookStore}>{Story()}</Provider>
    </div>
  ),
];
//========================================================

// export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {//Функция которая возвращает react компоненту
//     return <Provider store={store}>{storyFn()}</Provider>
// }

import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appAction, StatusType } from "app/model/appReducer";
import { todoActions, todoThunk } from "features/todolistsList/model/todos/todoListsReducer";
import { BaseResponsTodolistsType, ResultCode } from "common/api/todolistsApi";
import {
  ArgUpdateTaskType,
  CreateTaskType,
  GetTaskType,
  tasksApi,
  TaskType,
  UpdTaskType,
} from "features/todolistsList/api/tasksApi";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";

//SAGAS WATCHER -------------------------------
export function* tasksSagas() {
  yield takeEvery(SET_TASKS_ID, getTasksSaga);
  yield takeEvery(ADD_TASKS, addTasksSaga);
  yield takeEvery(REMOVE_TASKS, deleteTasksSaga);
  yield takeEvery(UPD_TASK, updateTaskSaga);
}

//ACTIONS ------------------------------
export const SET_TASKS = "tasks/setTask";
export const SET_TASKS_ID = "tasks/setTaskId";
//saga ---------------
const requestTasksAction = createAction<{ todoId: string }>(SET_TASKS_ID);
const setTasksAction = createAction<{ tasks: TaskType[]; todoId: string }>(SET_TASKS);

export function* getTasksSaga(action: ReturnType<typeof setTasksAction>) {
  const res: AxiosResponse<GetTaskType> = yield call(tasksApi.getTasks, action.payload.todoId);
  yield put(setTasksAction({ tasks: res.data.items, todoId: action.payload.todoId }));
}

// --------------------
export const ADD_TASKS = "tasks/addTasks";
export const CREATE_TASKS = "tasks/createTasks";
const createTasksAction = createAction<CreateTaskType>(ADD_TASKS);
const addTasksAction = createAction<{ task: TaskType }>(CREATE_TASKS);

export function* addTasksSaga(action: ReturnType<typeof createTasksAction>) {
  yield put(appAction.setStatus({ status: "loading" }));

  const res: AxiosResponse<
    BaseResponsTodolistsType<{
      item: TaskType;
    }>
  > = yield call(tasksApi.createTask, action.payload);

  if (res.data.resultCode === ResultCode.Ok) {
    yield put(addTasksAction({ task: res.data.data.item }));
    yield put(appAction.setStatus({ status: "succeeded" }));
  } else {
    // return rejectWithValue(res.data);
  }
}
//extra -----------------------------
// const addTasksTC = createAppAsyncThunk<{ task: TaskType }, CreateTaskType>("tasks/addTasks", async (arg, thunkAPI) => {
//   const { rejectWithValue } = thunkAPI;
//   const res = await tasksApi.createTask(arg);
//   if (res.data.resultCode === ResultCode.Ok) {
//     return { task: res.data.data.item };
//   } else {
//     return rejectWithValue(res.data);
//   }
// });

export const REMOVE_TASKS = "tasks/deleteTask";
export const REMOVE_TASKS_SUCCESS = "tasks/deleteTaskSuccess";

const deleteTasksAction = createAction<{ todoId: string; taskId: string }>(REMOVE_TASKS);
const deleteTasksSuccess = createAction<{ todoId: string; taskId: string }>(REMOVE_TASKS_SUCCESS);

export function* deleteTasksSaga(action: ReturnType<typeof deleteTasksAction>) {
  yield put(
    taskActions.changeEntStatusTask({
      taskId: action.payload.taskId,
      todoId: action.payload.todoId,
      status: "loading",
    })
  );
  const res: AxiosResponse<BaseResponsTodolistsType> = yield call(
    tasksApi.deleteTask,
    action.payload.todoId,
    action.payload.taskId
  );

  if (res.data.resultCode === ResultCode.Ok) {
    yield put(
      taskActions.changeEntStatusTask({
        taskId: action.payload.taskId,
        todoId: action.payload.todoId,
        status: "idle",
      })
    );

    yield put(deleteTasksSuccess({ todoId: action.payload.todoId, taskId: action.payload.taskId }));
  }
}
//extra --------
// export const deleteTasksTC = createAppAsyncThunk(
//   "tasks/deleteTask",
//   async (arg: { todoId: string; taskId: string }, thunkAPI) => {
//     const { dispatch } = thunkAPI;
//     dispatch(taskActions.changeEntStatusTask({ taskId: arg.taskId, todoId: arg.todoId, status: "loading" }));
//     const res = await tasksApi.deleteTask(arg.todoId, arg.taskId);
//     if (res.data.resultCode === ResultCode.Ok) {
//       dispatch(taskActions.changeEntStatusTask({ taskId: arg.taskId, todoId: arg.todoId, status: "idle" }));
//       return { todoId: arg.todoId, taskId: arg.taskId };
//     }
//   }
// );

//UPD task ----------------------------------------------------------------
export type UpdTaskTCType = Partial<UpdTaskType>;

const UPD_TASK = "tasks/updateTasks";
const UPD_TASK_SUCCESS = "tasks/updateTaskSuccess";
const updateTaskAction = createAction<ArgUpdateTaskType>(UPD_TASK);
const updateTaskSuccessAction = createAction<ArgUpdateTaskType>(UPD_TASK_SUCCESS);

function* updateTaskSaga(action: ReturnType<typeof updateTaskAction>) {
  const task: TaskType = yield select((state) =>
    state.tasks[action.payload.todoId].find((t: TaskType) => t.id === action.payload.taskId)
  );

  yield put(
    taskActions.changeEntStatusTask({
      todoId: action.payload.todoId,
      taskId: action.payload.taskId,
      status: "loading",
    })
  );

  const apiModel: UpdTaskType = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    // ...task - нельзя, отправим много чего лишнего
    ...action.payload.model,
  };

  try {
    const res: AxiosResponse<
      BaseResponsTodolistsType<{
        item: TaskType;
      }>
    > = yield call(tasksApi.updateTask, action.payload, apiModel);
    if (res.data.resultCode === ResultCode.Ok) {
      yield put(
        taskActions.changeEntStatusTask({
          todoId: action.payload.todoId,
          taskId: action.payload.taskId,
          status: "succeeded",
        })
      );
      yield put(
        updateTaskSuccessAction({
          todoId: action.payload.todoId,
          taskId: action.payload.taskId,
          model: apiModel,
        })
      );
    } else {
      // return rejectWithValue(res.data);
    }
  } catch (e: any) {}
}
// export type UpdTaskTCType = Partial<UpdTaskType>;
// const updateTaskTC = createAppAsyncThunk<ArgUpdateTaskType, ArgUpdateTaskType>(
//   "tasks/updateTas",
//   async (arg, thunkAPI) => {
//     const { getState, dispatch, rejectWithValue } = thunkAPI;
//
//     const task = getState().tasks[arg.todoId].find((t) => t.id === arg.taskId); //Будет бежать по массиву только до первого совпадения
//     dispatch(taskActions.changeEntStatusTask({ todoId: arg.todoId, taskId: arg.taskId, status: "loading" }));
//
//     if (!task) {
//       console.warn("task not found");
//       return rejectWithValue(null);
//     }
//
//     const apiModel: UpdTaskType = {
//       title: task.title,
//       description: task.description,
//       status: task.status,
//       priority: task.priority,
//       startDate: task.startDate,
//       deadline: task.deadline,
//       // ...task - нельзя, отправим много чего лишнего
//       ...arg.model
//     };
//     // return thunkTryCatch(thunkAPI, async () => {
//     const res = await tasksApi.updateTask(arg, apiModel);
//     if (res.data.resultCode === ResultCode.Ok) {
//       dispatch(taskActions.changeEntStatusTask({ todoId: arg.todoId, taskId: arg.taskId, status: "succeeded" }));
//       // return { todoId: arg.todoId, taskId: arg.taskId, model: apiModel };
//       return arg;
//     } else {
//       return rejectWithValue(res.data);
//     }
//     // }).finally(() => {
//     //   dispatch(taskActions.changeEntStatusTask({ todoId: arg.todoId, taskId: arg.taskId, status: "idle" }));
//     // });
//   }
// );

//reducer --------------------------------------------------------
export type EntStatusType = {
  entityStatus?: StatusType;
};
export type TaskStateType = Record<string, TaskType[]>;
//   [todolistID: string]: TaskType[];
// };

export const initialState: TaskStateType = {
  // [todolistID_1]: [
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: true},
  //     {id: v1(), title: "Next", isDone: false},
  // ],
  // [todolistID_2]: [
  //     {id: v1(), title: "Beer", isDone: true},
  //     {id: v1(), title: "Meat", isDone: true},
  //     {id: v1(), title: "Fish", isDone: true},
  //     {id: v1(), title: "Drink", isDone: false},
  // ],
};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    changeTaskTitle: (state, action: PayloadAction<{ taskId: string; newValue: string; todoId: string }>) => {
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].map((task) =>
          task.id === action.payload.taskId ? { ...task, title: action.payload.newValue } : task
        ),
      };
    },

    changeEntStatusTask: (state, action: PayloadAction<{ todoId: string; taskId: string; status: StatusType }>) => {
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].map((t) =>
          t.id === action.payload.taskId ? { ...t, entityStatus: action.payload.status } : t
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTasksAction, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks;
      })
      .addCase(addTasksAction, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      })
      .addCase(deleteTasksSuccess, (state, action) => {
        if (action?.payload) {
          const tasks = state[action.payload.todoId];
          const index = tasks.findIndex((t) => t.id === action.payload?.taskId);
          if (index !== -1) tasks.splice(index, 1);
        }
      })
      .addCase(updateTaskSuccessAction, (state, action) => {
        const tasks = state[action.payload.todoId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.model };
      })
      .addCase(todoThunk.createTodoAction, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todoThunk.deleteTodo.fulfilled, (state, action) => {
        delete state[action.payload.todolistID];
      })
      .addCase(todoThunk.setTodolistAction, (state, action) => {
        action.payload.todolist.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(todoActions.clearData, () => {
        return {};
      });
  },
});
// Создаем reducer с помощью slice
export const tasksReducer = slice.reducer;
export const taskActions = {
  ...slice.actions,
  requestTasksAction,
  deleteTasksAction,
  createTasksAction,
  updateTaskAction,
};

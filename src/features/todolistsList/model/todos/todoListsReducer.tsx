import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusType } from "app/model/appReducer";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { todolistsApi, TodolistType } from "features/todolistsList/api/todolistsApi";
import { BaseResponsTodolistsType, ResultCode } from "common/api/todolistsApi";
import { CreateTaskType } from "features/todolistsList/api/tasksApi";
import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";

export function* todoListsSagas() {
  yield takeEvery(GET_TODO, setTodolistSaga);
  yield takeEvery(CREATE_TODO, addTodoSaga);
}

const SET_TODO_lIST = "todoLists/setTodo";
const GET_TODO = "todoLists/getTodo";
const setTodolistAction = createAction<{ todolist: TodolistType[] }>(SET_TODO_lIST);
const getTodolistAction = createAction(GET_TODO);

function* setTodolistSaga() {
  const res: AxiosResponse<TodolistType[]> = yield call(todolistsApi.getTodolists);
  yield put(setTodolistAction({ todolist: res.data }));
}

// -------------------------
const ADD_TODO = "todoLists/addTodo";
const CREATE_TODO = "todoLists/createTodo";
const createTodoAction = createAction<{ todolist: TodolistType }>(ADD_TODO);
const addTodoTitleAction = createAction<string>(CREATE_TODO);

function* addTodoSaga(action: ReturnType<typeof addTodoTitleAction>) {
  const res: AxiosResponse<
    BaseResponsTodolistsType<{
      item: TodolistType;
    }>
  > = yield call(todolistsApi.createTodolists, action.payload);
  if (res.data.resultCode === ResultCode.Ok) {
    yield put(createTodoAction({ todolist: res.data.data.item }));
  } else {
    // return rejectWithValue(res.data);
  }
}

// const addTodo = createAppAsyncThunk<
//   {
//     todolist: TodolistType;
//   },
//   string
// >("todoLists/addTodo", async (title, thunkAPI) => {
//   const { rejectWithValue } = thunkAPI;
//   const res = await todolistsApi.createTodolists(title);
//   if (res.data.resultCode === ResultCode.Ok) {
//     return { todolist: res.data.data.item };
//   } else {
//     return rejectWithValue(res.data);
//   }
// });

export const deleteTodo = createAppAsyncThunk<{ todolistID: string }, string>(
  "todoLists/deletTodo",
  async (todoId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(todoActions.changeEntStatusTodo({ todoId: todoId, status: "loading" }));
    const res = await todolistsApi.deleteTodolists(todoId);
    if (res.data.resultCode === ResultCode.Ok) {
      dispatch(todoActions.changeEntStatusTodo({ todoId: todoId, status: "idle" }));
      return { todolistID: todoId };
    } else {
      return rejectWithValue(res.data);
    }
  }
);
// export const deleteTodo = createAppAsyncThunk<{ todolistID: string }, string>(
//   "todoLists/deletTodo",
//   async (todoId, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     return thunkTryCatch(thunkAPI, async () => {
//       const res = await todolistsApi.deleteTodolists(todoId);
//       if (res.data.resultCode === ResultCode.Ok) {
//         dispatch(appAction.setStatus({ status: "succeeded" }));
//         return { todolistID: todoId };
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//       dispatch(appAction.setStatus({ status: "failed" }));
//       dispatch(todoActions.changeEntStatusTodo({ todoId: todoId, status: "idle" }));
//       return rejectWithValue(null);
//     });
//   }
// );

export const changeTitleTodo = createAppAsyncThunk<CreateTaskType, CreateTaskType>(
  "todoLists/changeTitleTodo",
  async (arg, { rejectWithValue }) => {
    const res = await todolistsApi.updateTodolists(arg.todoId, arg.title);
    if (res.data.resultCode === ResultCode.Ok) {
      return { todoId: arg.todoId, title: arg.title };
    } else {
      return rejectWithValue(res.data);
    }
  }
);

//REDUCER ----------------------------------------------------------
export type FilterValueType = "All" | "Active" | "Completed";
export type TodoAppType = TodolistType & {
  filter: FilterValueType;
  entityStatus: StatusType;
};
const initialState: TodoAppType[] = [
  //первым параметром принимаем редьюсер
  // {id: todolistID_1, title: 'What to learn', filter: 'All'},
  // {id: todolistID_2, title: 'What to buy', filter: 'All'},
];

const slice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    changeEntStatusTodo: (state, action: PayloadAction<{ todoId: string; status: StatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.todoId);
      if (todo) todo.entityStatus = action.payload.status;
    },
    taskFilterTodo: (state, action: PayloadAction<{ todoListsID: string; filter: FilterValueType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.todoListsID);
      if (todo) todo.filter = action.payload.filter;
    },
    clearData: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTodolistAction, (_, action) => {
        return action.payload.todolist.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }));
      })
      .addCase(createTodoAction, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" });
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
        if (index !== -1) {
          state.splice(index, 1);
        }
        // return state.filter(todos => todos.id !== action.payload.todolistID)
      })
      .addCase(changeTitleTodo.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.todoId);
        if (todo) todo.title = action.payload.title;
      });

    // .addCase(clearTodoTask, ()=>{
    //   return []
    // })
    // .addMatcher(isAnyOf(todoThunk.deleteTodo.rejected),
    // (state, action)=> {
    //   debugger
    // }
    // )
  },
});

export const todoListsReducer = slice.reducer;
export const todoActions = slice.actions;
export const todoThunk = {
  setTodolistAction,
  getTodolistAction,
  addTodoTitleAction,
  createTodoAction,
  deleteTodo,
  changeTitleTodo,
};

//REDUCER --------------------------------------------------------------------------
// import {todolistsApi, TodolistType} from "api/todolistsApi";
// import {Dispatch} from "redux";
// import {setAppStatusAC, SetAppStatusACType, StatusType} from "app/appReducer";
// import {handleServerAppError, handleServerNetworkError} from "utils/errorUtils";
// import {ResCode, setTasksTC} from "./tasksReducer";
// import {AppThunk} from "app/store";
//
// export type filterValueType = "All" | 'Active' | 'Completed';
//
// // export type TodolistType = {
// //     id: string,
// //     title: string,
// //     filter: filterValueType, //Список отсортированный для всех тудулистов
// // }
//
// // export let todolistID_1 = v1();
// // export let todolistID_2 = v1();
// export type TodoAppType = TodolistType & {
//     filter: filterValueType,
//     entityStatus: StatusType,
// }
// const initialState: TodoAppType[] = [//первым параметром принимаем редьюсер
//     // {id: todolistID_1, title: 'What to learn', filter: 'All'},
//     // {id: todolistID_2, title: 'What to buy', filter: 'All'},
// ];
//
// export const todoListsReducer = (state = initialState, action: complexTypeActions): TodoAppType[] => {
//     if (action.type === 'ADD-TODO') {
//         // let todolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'All'};
//         // setTodoLists([todolist, ...todoLists])
//         // setTasks({...tasks, [todolist.id]: []})
//         return [{...action.payload.todolist, filter: 'All', entityStatus: 'idle'}, ...state];
//
//     } else if (action.type === 'DELETE-TODO') {
//         // setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
//         // delete tasks[todolistID];// И нужно еще удалить объект с тасками, что бы мусора не было
//         return state.filter(todos => todos.id !== action.payload.todolistID)
//
//     } else if (action.type === 'CHANGE-TITLE-TODO') {
//         // setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title: newValue} : tl));
//
//     } else if (action.type === 'CHANGE-ENT-STATUS-TODO') {
//         // setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title: newValue} : tl));
//         return state.map(todos => todos.id === action.payload.todoId ? {
//             ...todos,
//             entityStatus: action.payload.status
//         } : todos);
//
//     } else if (action.type === 'TASK-FILTER-TODO') {
//         //     setFilterValue(filterValue);
//         // setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, filter} : tl))
//         //map создает новый массив так что копию(...todolist) делать не надо
//         return state.map(todoFil => todoFil.id === action.payload.todoListsID ? {
//             ...todoFil,
//             filter: action.payload.filter
//         } : todoFil);
//
//     } else if (action.type === "SET-TODOLISTS") {
//         return action.payload.todoLists.map(tl => ({...tl, filter: 'All', entityStatus: 'idle'}));
//
//     } else if (action.type === "CLEAR-DATA") {//зачищаем наши данные когда выходим с приложухи
//         return []
//     }
//     return state;
// };
//
// //AC ==============================================================================================
//
// export type complexTypeActions =
//     | AddTodoACType
//     | DeleteTodoACType
//     | SetTodoACType
//     | SetAppStatusACType
//     | ChangeTodoEntStatusACType
//     | ClearTodosDataACType
//     | ReturnType<typeof onChangeTitleTodolistAC>
//     | ReturnType<typeof changeTasksFilterAC>;
//
// export type AddTodoACType = ReturnType<typeof addTodolistAC>;
// export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODO', payload: {todolist}} as const)
//
// export type DeleteTodoACType = ReturnType<typeof deleteTodolistAC>;
// export const deleteTodolistAC = (todolistID: string) => ({type: 'DELETE-TODO', payload: {todolistID,}} as const)
//
// export const onChangeTitleTodolistAC = (todoId: string, newValue: string,) => {
//     return {
//         type: 'CHANGE-TITLE-TODO',
//         payload: {
//             todoId,
//             newValue,
//         }
//     } as const;
// }
//
// export const changeTasksFilterAC = (todoListsID: string, filter: filterValueType,) => {
//     return {
//         type: 'TASK-FILTER-TODO',
//         payload: {
//             todoListsID,
//             filter,
//         }
//     } as const;
// }
//
// export type SetTodoACType = ReturnType<typeof setTodolistsAC>;
// export const setTodolistsAC = (todoLists: TodolistType[]) => ({type: 'SET-TODOLISTS', payload: {todoLists,}} as const)
//
// export type ChangeTodoEntStatusACType = ReturnType<typeof changeTodoEntStatusAC>;
// export const changeTodoEntStatusAC = (todoId: string, status: StatusType,) => {
//     return {
//         type: 'CHANGE-ENT-STATUS-TODO',
//         payload: {
//             todoId,
//             status,
//         }
//     } as const;
// }
// //ЗАЧИСТКА ДАННЫХ ----------------------------
// export type ClearTodosDataACType = ReturnType<typeof clearTodosDataAC>;
// export const clearTodosDataAC = () => ({type: 'CLEAR-DATA'} as const);
//
// //THUNK ===========================================================================
// // export const setTodolistsThunk =/*()=>{
// //     return */(dispatch: Dispatch<complexTypeActions>) => {
// //     todolistsApi.getTodolists()
// //         .then(res => {
// //             dispatch(setTodolistsAC(res.data))
// //         })
// // }
//
// export const setTodolistsThunkCreator = (): AppThunk => /*{*//*return */(dispatch) => {
//     dispatch(setAppStatusAC('loading'));
//     todolistsApi.getTodolists()
//         .then(res => {
//             dispatch(setTodolistsAC(res.data));
//             dispatch(setAppStatusAC('succeeded'));
//             return res.data//Делаем для того, что б сетать таски только после того, как загрузятся тудулисты
//         })
//         .then((todos) => {//а вот только теперь достаем наши таски
//             todos.forEach((todos) => {
//                 dispatch(setTasksTC(todos.id))
//             })
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
// // }
//
// export const addTodoThunkCreator = (title: string) => (dispatch: Dispatch<complexTypeActions>) => {
//     dispatch(setAppStatusAC('loading'));
//
//     todolistsApi.createTodolists(title)
//         .then(res => {
//             dispatch(addTodolistAC(res.data.data.item));
//             dispatch(setAppStatusAC('succeeded'));
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
//
// export const deleteTodoThunkCreator = (todoId: string) => (dispatch: Dispatch<complexTypeActions>) => {
//     dispatch(setAppStatusAC('loading'));
//     dispatch(changeTodoEntStatusAC(todoId, 'loading'))
//     todolistsApi.deleteTodolists(todoId)
//         .then(res => {
//             if (res.data.resultCode === ResCode.ok) {
//                 dispatch(deleteTodolistAC(todoId));
//                 dispatch(setAppStatusAC('succeeded'));
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//             dispatch(setAppStatusAC('failed'));
//             dispatch(changeTodoEntStatusAC(todoId, 'idle'))
//         })
//         .catch(error => {
//             handleServerNetworkError(error.message, dispatch);
//             dispatch(setAppStatusAC('failed'));
//             dispatch(changeTodoEntStatusAC(todoId, 'idle'))
//         })
// }
//
//
// export const changeTitleTodoThunkCreator = (todoId: string, title: string) => (dispatch: Dispatch<complexTypeActions>) => {
//     dispatch(setAppStatusAC('loading'));
//     todolistsApi.updateTodolists(todoId, title)
//         .then(res => {
//             if (res.data.resultCode === ResCode.ok) {
//                 dispatch(onChangeTitleTodolistAC(todoId, title));
//                 dispatch(setAppStatusAC('succeeded'));
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

//RTK ====================================================
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusType } from "app/appReducer";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { todolistsApi, TodolistType } from "features/todolistsList/api/todolistsApi";
import { ResultCode } from "common/api/todolistsApi";
import { CreateTaskType } from "features/todolistsList/api/tasksApi";

//extra --------
const setTodolists = createAppAsyncThunk<{ todolist: TodolistType[] },void>("todoLists/setTodo", async () => {
    const res = await todolistsApi.getTodolists();
    return { todolist: res.data };
});

const addTodo = createAppAsyncThunk<{ todolist: TodolistType }, string>("todoLists/addTodo", async (title, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
    const res = await todolistsApi.createTodolists(title);
    if (res.data.resultCode === ResultCode.Ok) {
      return { todolist: res.data.data.item };
    } else {
      return rejectWithValue(res.data);
    }
});


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
  async (arg, {rejectWithValue}) => {
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
      .addCase(setTodolists.fulfilled, (_, action) => {
        return action.payload.todolist.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }));
      })
      .addCase(addTodo.fulfilled, (state, action) => {
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
      })
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
export const todoThunk = { setTodolists, addTodo, deleteTodo, changeTitleTodo };

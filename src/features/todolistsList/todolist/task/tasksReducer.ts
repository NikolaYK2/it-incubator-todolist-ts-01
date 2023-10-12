//REDUX ===========================================================================
// import {TaskStatuses, TaskType, todolistsApi, TodolistType, TodoTaskPriorities, UpdTaskType} from "api/todolistsApi";
// import {Dispatch} from "redux";
// import {AppRootState, AppThunk} from "app/store";
// import {
//     AddTodoACType,
//     changeTodoEntStatusAC,
//     ChangeTodoEntStatusACType, ClearTodosDataACType,
//     DeleteTodoACType,
//     SetTodoACType
// } from "./todoListsReducer";
// import {SetAppErrorACType, setAppStatusAC, SetAppStatusACType, StatusType} from "app/appReducer";
// import {handleServerAppError, handleServerNetworkError} from "utils/errorUtils";
// import {AxiosError} from "axios";
//
// // export type TasksPropsType = {
// //     id: string,
// //     title: string,
// //     isDone: boolean,
// // }
// export type EntStatusType = {
//     entityStatus?: StatusType,
// }
// export type taskStateType = {
//     [todolistID: string]: TaskType[];
// }
//
//
// export const initialState: taskStateType = {
//     // [todolistID_1]: [
//     //     {id: v1(), title: "HTML&CSS", isDone: true},
//     //     {id: v1(), title: "JS", isDone: true},
//     //     {id: v1(), title: "ReactJS", isDone: true},
//     //     {id: v1(), title: "Next", isDone: false},
//     // ],
//     // [todolistID_2]: [
//     //     {id: v1(), title: "Beer", isDone: true},
//     //     {id: v1(), title: "Meat", isDone: true},
//     //     {id: v1(), title: "Fish", isDone: true},
//     //     {id: v1(), title: "Drink", isDone: false},
//     // ],
// }
//
// export const tasksReducer = (state = initialState, action: complexACType): taskStateType => {
//     switch (action.type) {
//         case 'ADD-TASK': {
//             //Сокращенный вариант=================================================================
//             // setTasks({...tasks, [todolistID]: [{id: v1(), title: addTitle, isDone: false}, ...tasks[todolistID]]})
//             //...tasks- раскрываем все такси и делаем копию,
//             // В объекте есть св-в[todolistID] в которое вносим изм.
//             // [todolistID]: [кладем сюда новый массив и все старые таски]Закидываем старые 4 таксик ...tasks[todolistID + одну новую {id: v1(), title: addTitle, isDone: false}
//             const taskNew = action.payload.tasks
//             return {...state, [taskNew.todoListId]: [taskNew, ...state[taskNew.todoListId]]};
//         }
//         case 'ADD-TODO': {
//             //Сокращенный вариант ================================================
//             // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
//             //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
//             // return {...state, [action.payload.todolistID]: []}
//             return {...state, [action.payload.todolist.id]: []};
//         }
//         case 'DELL-TASK': {
//             //Сокращенный вариант ================================================
//             // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
//             //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
//             return {
//                 ...state,
//                 [action.payload.todolistID]: state[action.payload.todolistID].filter(task => task.id !== action.payload.tId)
//             }
//         }
//         case 'DELETE-TODO':
//             // const {[action.payload.todolistID]:[], ...rest} = {...state}
//             // return rest;
//             let copyState = {...state}
//             delete copyState[action.payload.todolistID];
//             return copyState;
//
//         // case 'CHANGE-TASK-TITLE': {
//         //     // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
//         //     return {
//         //         ...state,
//         //         [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskId ?
//         //             {...task, title: action.payload.newValue} : task)
//         //     }
//         // }
//         case 'UPDATE-TASK': {
//             // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
//             return {
//                 ...state,
//                 [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskId ?
//                     {...task, ...action.payload.model} : task)
//             }
//         }
//         case 'CHANGE-ENT-STATUS-TASK': {
//             return {
//                 ...state, [action.payload.todolistID]:
//                     state[action.payload.todolistID].map(t => t.id === action.payload.taskId
//                         ? {...t, entityStatus: action.payload.status} : t)
//             }
//         }
//
//         case 'SET-TODOLISTS': {
//             // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
//             // const copy = {...state};
//             // return action.payload.todoLists.reduce((acc, tl)=>{
//             //     copy[tl.id] = [];
//             //     return copy;
//             // },{...state});//{...state} - То с чего нужно начать методу reduce
//             const copy = {...state};
//             action.payload.todoLists.forEach(tl => {//прост опробежим по всем еуду и присвоим пустой массив, map не нужен
//                 copy[tl.id] = [];
//             });
//             return copy;
//             // const copy = state;
//             //   action.payload.todoLists.map(e=>({...copy[e.id] = []}))
//             // return copy
//         }
//         case 'SET-TASKS': {
//             // const copy = {...state};
//             // copy[action.payload.todolistID] = action.payload.tasks;
//             // return copy;
//             return {...state, [action.payload.todolistID]: action.payload.tasks}//[action.payload.tasks]- он и так массив, так что ...spred не нужно
//         }
//         case 'CLEAR-DATA': {
//             return {}
//         }
//
//         default:
//             return state
//
//     }
// };
//
// //AC ===============================================================================
// export enum ResCode {
//     ok = 0,
//     error = 1,
// }
//
// export type complexACType =
//     | DeleteTodoACType
//     | SetTodoACType
//     | AddTodoACType
//     | SetAppErrorACType
//     | SetAppStatusACType
//     | ChangeTodoEntStatusACType
//     | ClearTodosDataACType
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof deleteTaskAC>
//     | ReturnType<typeof updateTaskAC>
//     | ReturnType<typeof setTasksAC>
//     | ReturnType<typeof changeTaskStatusAC>;
//
// /*| AddTaskTodoACType*/
// // | ChangeTaskTitleACType
// /*| DeleteTaskTodoACType*/
// //Используем action todolista
//
// export const addTaskAC = (tasks: TaskType) => ({type: 'ADD-TASK', payload: {tasks,}} as const)
//
// // type AddTaskTodoACType = ReturnType<typeof addTaskTodoAC>
// // export const addTaskTodoAC = (todolistID: string) => {
// //     return {
// //         type: 'ADD-TASK-TODO',
// //         payload: {
// //             todolistID,
// //         }
// //     } as const;
// // }
//
// export const deleteTaskAC = (todolistID: string, tId: string,) => ({
//     type: 'DELL-TASK',
//     payload: {todolistID, tId,}
// } as const)
//
// // type DeleteTaskTodoACType = ReturnType<typeof deleteTaskTodoAC>
// // export const deleteTaskTodoAC = (todolistID: string) => {
// //     return {
// //         type: 'DELL-TASK-TODO',
// //         payload: {
// //             todolistID,
// //         }
// //     } as const;
// // }
//
// // type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
// // export const changeTaskTitleAC = (taskId: string, newValue: string, todolistID: string) => {
// //     return {
// //         type: 'CHANGE-TASK-TITLE',
// //         payload: {
// //             taskId,
// //             newValue,
// //             todolistID,
// //         }
// //     } as const;
// // }
//
// export const updateTaskAC = (todolistID: string, taskId: string, model: UpdTaskTCType) => {
//     return {
//         type: 'UPDATE-TASK',
//         payload: {
//             todolistID,
//             taskId,
//             model,
//         }
//     } as const;
// }
// export const changeTaskStatusAC = (todolistID: string, taskId: string, status: StatusType) => {
//     return {
//         type: 'CHANGE-ENT-STATUS-TASK',
//         payload: {
//             todolistID,
//             taskId,
//             status,
//         }
//     } as const;
// }
//
// export const setTasksAC = (todolistID: string, tasks: TaskType[]) => ({
//     type: 'SET-TASKS',
//     payload: {todolistID, tasks,}
// } as const)
//
//
// // THUNK =========================================================================================================
// export const setTasksTC = (todolistID: string) => (dispatch: Dispatch<complexACType>) => {
//     dispatch(setAppStatusAC('loading'));
//     todolistsApi.getTasks(todolistID)
//         .then(res => {
//             dispatch(setTasksAC(todolistID, res.data.items));
//             dispatch(setAppStatusAC('succeeded'))
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
//
// export const deleteTasksTC = (todoId: string, taskId: string): AppThunk =>
//     (dispatch) => {
//         dispatch(setAppStatusAC('loading'));
//         dispatch(changeTaskStatusAC(todoId, taskId, 'loading'));
//         // dispatch(changeTaskStatusAC(todoId, taskId, 2))
//         todolistsApi.deleteTask(todoId, taskId)
//             .then(res => {
//                 if (res.data.resultCode === ResCode.ok) {
//
//                     dispatch(deleteTaskAC(todoId, taskId));
//                     dispatch(setAppStatusAC('succeeded'));
//                 } else {
//                     handleServerAppError(res.data, dispatch);
//                 }
//                 // dispatch(changeTaskStatusAC(todoId, taskId, 0))
//             })
//             .catch(error => {
//                 handleServerNetworkError(error, dispatch)
//             })
//     }
//
//
// export const addTasksTC = (todoId: string, title: string) => (dispatch: Dispatch<complexACType>) => {
//     dispatch(setAppStatusAC('loading'));
//     dispatch(changeTodoEntStatusAC(todoId, 'loading'))
//     todolistsApi.createTask(todoId, title)
//         .then(res => {
//             if (res.data.resultCode === ResCode.ok) {
//                 dispatch(addTaskAC(res.data.data.item));
//                 dispatch(setAppStatusAC('succeeded'));
//             } else {
//                 // if  (res.data.messages.length){
//                 //     dispatch(setAppErrorAC(res.data.messages[0]));
//                 // } else {
//                 //     dispatch(setAppErrorAC('Some error'));
//                 // }
//                 // dispatch(setAppStatusAC('failed'));
//                 handleServerAppError(res.data, dispatch);//Отдельная fn ошибок
//             }
//             dispatch(changeTodoEntStatusAC(todoId, 'idle'))
//         })
//         .catch((error: AxiosError<{ messages: string[] }>) => {
//             handleServerNetworkError(error, dispatch);
//             dispatch(changeTodoEntStatusAC(todoId, 'idle'))
//         })
// }
//
// export type UpdTaskTCType = {
//     title?: string,
//     description?: string,
//     status?: TaskStatuses,
//     priority?: TodoTaskPriorities,
//     startDate?: string,
//     deadline?: string,
// }
// export const updateTaskTC = (todoId: string, taskId: string, model: UpdTaskTCType) => (
//     async (dispatch: Dispatch<complexACType>, getState: () => AppRootState) => {
//         // const state = getState();
//         // const task = state.tasks[todoId].find(t => t.id === taskId);
//
//         const task = getState().tasks[todoId].find(t => t.id === taskId);//Будет бежать по массиву только до первого совпадения
//         dispatch(setAppStatusAC('loading'));
//         dispatch(changeTaskStatusAC(todoId, taskId, 'loading'));
//
//         if (!task) {
//             // throw new Error('task not found')
//             console.warn('task not found');
//             return;
//         }
//
//         // if (task) {
//         const apiModel: UpdTaskType = {
//             title: task.title,
//             description: task.description,
//             status: task.status,
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.deadline,
//             // ...task - нельзя, отправим много чего лишнего
//             ...model
//         }
//
//         try {
//             const res = await todolistsApi.updateTask(todoId, taskId, apiModel)
//
//             if (res.data.resultCode === ResCode.ok) {
//                 dispatch(updateTaskAC(todoId, taskId, apiModel));
//                 dispatch(setAppStatusAC('succeeded'));
//             } else {
//                 handleServerAppError(res.data, dispatch);
//             }
//         } catch (error: any) {
//             // if (axios.isAxiosError<{ messages: string[] }>(error)) {
//             //     return error;
//             // }
//             handleServerNetworkError(error.message, dispatch);
//         } finally {
//             dispatch(changeTaskStatusAC(todoId, taskId, 'idle'));
//         }
//         // }
//     })
// // -----------------------------
// // export const updateTaskTC = (todoId: string, taskId: string, model: UpdTaskTCType) => {
// //     return (dispatch: Dispatch<complexACType>, getState: () => AppRootState) => {
// //         // const state = getState();
// //         // const task = state.tasks[todoId].find(t => t.id === taskId);
// //
// //         // if (!task) {
// //         //     // throw new Error('task not found')
// //         //     console.warn('task not found');
// //         //     return;
// //         // }
// //         const task = getState().tasks[todoId].find(t => t.id === taskId);//Будет бежать по массиву только до первого совпадения
// //         dispatch(setAppStatusAC('loading'));
// //
// //         if (task) {
// //             const apiModel: UpdTaskType = {
// //                 title: task.title,
// //                 description: task.description,
// //                 status: task.status,
// //                 priority: task.priority,
// //                 startDate: task.startDate,
// //                 deadline: task.deadline,
// //                 // ...task - нельзя, отправим много чего лишнего
// //                 ...model
// //             }
// //
// //             todolistsApi.updateTask(todoId, taskId, apiModel)
// //                 .then(res => {
// //                     if (res.data.resultCode === ResCode.ok) {
// //                         dispatch(updateTaskAC(todoId, taskId, apiModel));
// //                         dispatch(setAppStatusAC('succeeded'));
// //                     } else {
// //                         handleServerAppError(res.data, dispatch);
// //                         // if (res.data.messages.length) {
// //                         //     dispatch(setAppErrorAC(res.data.messages[0]));
// //                         // }
// //                         // dispatch(setAppStatusAC('failed'));
// //                     }
// //                 })
// //                 .catch((error) => {
// //                     handleServerNetworkError(error.message, dispatch);
// //                     // dispatch(setAppErrorAC(error));
// //                     // dispatch(setAppStatusAC('failed'));
// //                 })
// //         }
// //     }
// // }

//RTK ====================================================================================
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appAction, StatusType } from "app/appReducer";
import { todoActions, todoThunk } from "features/todolistsList/todolist/todoListsReducer";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
import { ResultCode, TaskStatuses, TodoTaskPriorities } from "common/api/todolistsApi";
import {
  ArgUpdateTaskType,
  CreateTaskType,
  tasksApi,
  TaskType,
  UpdTaskType
} from "features/todolistsList/todolist/task/tasksApi";
import { thunkTryCatch } from "common/utils/thunkTryCatch";
// import { handleServerAppError, handleServerNetworkError } from "utils/errorUtils";
// import { createAppAsyncThunk } from "utils/createAppAsyncThunk";

//extra --------------
const setTasksTC = createAppAsyncThunk<{ todoId: string; tasks: TaskType[] }, string>(
  "task/setTask",
  async (todoId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.getTasks(todoId);
      dispatch(appAction.setStatus({ status: "succeeded" }));
      return { todoId, tasks: res.data.items };
    });
  }
);
// const setTasksTC = createAppAsyncThunk<{ todoId: string; tasks: TaskType[] }, string>(
//   "task/setTask",
//   async (todoId, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     dispatch(appAction.setStatus({ status: "loading" }));
//     try {
//       const res = await tasksApi.getTasks(todoId);
//       dispatch(appAction.setStatus({ status: "succeeded" }));
//       return { todoId, tasks: res.data.items };
//     } catch (error) {
//       handleServerNetworkError(error, dispatch);
//       return rejectWithValue(null); //просто заглушка, раз мы сюда ничего не передаем
//     }
//   }
// );

//extra -----------------------------
const addTasksTC = createAppAsyncThunk<{ task: TaskType }, CreateTaskType>("task/addTasks", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await tasksApi.createTask(arg);
    if (res.data.resultCode === ResultCode.Ok) {
      return { task: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch); //Отдельная fn ошибок
      return rejectWithValue(null);
    }
  });
});
// const addTasksTC = createAppAsyncThunk<{ task: TaskType }, CreateTaskType>("task/addTasks", async (arg, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//
//   dispatch(appAction.setStatus({ status: "loading" }));
//   dispatch(todoActions.changeEntStatusTodo({ todoId: arg.todoId, status: "loading" }));
//   try {
//     // const res = await todolistsApi.createTask(arg.todoId, arg.title);
//     const res = await tasksApi.createTask(arg);
//     if (res.data.resultCode === ResultCode.Ok) {
//       dispatch(appAction.setStatus({ status: "succeeded" }));
//       return { task: res.data.data.item };
//     } else {
//       handleServerAppError(res.data, dispatch); //Отдельная fn ошибок
//     }
//     dispatch(todoActions.changeEntStatusTodo({ todoId: arg.todoId, status: "idle" }));
//     return rejectWithValue(null);
//   } catch (error: any) {
//     handleServerNetworkError(error, dispatch);
//     dispatch(todoActions.changeEntStatusTodo({ todoId: arg.todoId, status: "idle" }));
//     return rejectWithValue(null);
//   }
// });

//extra --------
export const deleteTasksTC = createAppAsyncThunk(
  "task/deleteTask",
  async (arg: { todoId: string; taskId: string }, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.deleteTask(arg.todoId, arg.taskId);
      if (res.data.resultCode === ResultCode.Ok) {
        dispatch(appAction.setStatus({ status: "succeeded" }));
        return { todoId: arg.todoId, taskId: arg.taskId };
      }
    });
  }
);
// export const deleteTasksTC = createAppAsyncThunk(
//   "task/deleteTask",
//   async (
//     arg: {
//       todoId: string;
//       taskId: string;
//     },
//     thunkAPI
//   ) => {
//     const { dispatch } = thunkAPI;
//     dispatch(appAction.setStatus({ status: "loading" }));
//     dispatch(taskActions.changeEntStatusTask({ todoId: arg.todoId, taskId: arg.taskId, status: "loading" }));
//     try {
//       const res = await tasksApi.deleteTask(arg.todoId, arg.taskId);
//       if (res.data.resultCode === ResultCode.Ok) {
//         dispatch(appAction.setStatus({ status: "succeeded" }));
//         return { todoId: arg.todoId, taskId: arg.taskId };
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     } catch (error: any) {
//       handleServerNetworkError(error, dispatch);
//     }
//   }
// );

//UPD task ----------------------------------------------------------------
export type UpdTaskTCType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TodoTaskPriorities;
  startDate?: string;
  deadline?: string;
};
const updateTaskTC = createAppAsyncThunk<ArgUpdateTaskType, ArgUpdateTaskType>(
  "task/updateTas",
  async (arg, thunkAPI) => {
    const { getState, dispatch, rejectWithValue } = thunkAPI;

    const task = getState().tasks[arg.todoId].find((t) => t.id === arg.taskId); //Будет бежать по массиву только до первого совпадения
    dispatch(taskActions.changeEntStatusTask({ todoId: arg.todoId, taskId: arg.taskId, status: "loading" }));

    if (!task) {
      console.warn("task not found");
      return rejectWithValue(null);
    }

    const apiModel: UpdTaskType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      // ...task - нельзя, отправим много чего лишнего
      ...arg.model,
    };
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.updateTask(arg, apiModel);
      if (res.data.resultCode === ResultCode.Ok) {
        dispatch(appAction.setStatus({ status: "succeeded" }));
        // return { todoId: arg.todoId, taskId: arg.taskId, model: apiModel };
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    }).finally(() => {
      dispatch(taskActions.changeEntStatusTask({ todoId: arg.todoId, taskId: arg.taskId, status: "idle" }));
    });
  }
);
// const updateTaskTC = createAppAsyncThunk<ArgUpdateTaskType, ArgUpdateTaskType>(
//   "task/updateTas",
//   async (arg, { getState, dispatch, rejectWithValue }) => {
//     const task = getState().tasks[arg.todoId].find((t) => t.id === arg.taskId); //Будет бежать по массиву только до первого совпадения
//     dispatch(appAction.setStatus({ status: "loading" }));
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
//       ...arg.model,
//     };
//
//     const res = await tasksApi.updateTask(arg, apiModel);
//     try {
//       if (res.data.resultCode === ResultCode.Ok) {
//         dispatch(appAction.setStatus({ status: "succeeded" }));
//         // return { todoId: arg.todoId, taskId: arg.taskId, model: apiModel };
//         return arg;
//       } else {
//         handleServerAppError(res.data, dispatch);
//         return rejectWithValue(null);
//       }
//     } catch (error) {
//       // handleServerNetworkError(error.message, dispatch);
//       handleServerNetworkError(error, dispatch);
//       return rejectWithValue(null);
//     } finally {
//       dispatch(
//         taskActions.changeEntStatusTask({
//           todoId: arg.todoId,
//           taskId: arg.taskId,
//           status: "idle",
//         })
//       );
//     }
//     // }
//   }
// );

//reducer --------------------------------------------------------
export type EntStatusType = {
  entityStatus?: StatusType;
};
export type TaskStateType = Record<string, TaskType[]>
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
      .addCase(setTasksTC.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks;
      })
      .addCase(addTasksTC.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      })
      .addCase(deleteTasksTC.fulfilled, (state, action) => {
        if (action?.payload) {
          const tasks = state[action.payload.todoId];
          const index = tasks.findIndex((t) => t.id === action.payload?.taskId);
          if (index !== -1) tasks.splice(index, 1);
        }
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.meta.arg.todoId];
        const index = tasks.findIndex((t) => t.id === action.meta.arg.taskId);
        if (index !== -1) tasks[index] = { ...tasks[index], ...action.meta.arg.model };
      })
      .addCase(todoThunk.addTodo.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todoThunk.deleteTodo.fulfilled, (state, action) => {
        delete state[action.payload.todolistID];
      })
      .addCase(todoThunk.setTodolists.fulfilled, (state, action) => {
        action.payload.todolist.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(todoActions.clearData, () => {
        return {};
      });
    //Или используем commonAction --------
    //   .addCase(clearTodoTask, (state, action)=>{
    //     return action.payload.tasks
    //   })

    // [todoActions.addTodo.type]: (state, action: PayloadAction<{}>) => {},
    // [todoActions.deleteTodo.type]: (state, action: PayloadAction<{}>) => {},
    // [todoActions.setTodo.type]: (state, action: PayloadAction<{}>) => {},
    // [todoActions.clearData.type]: (state, action: PayloadAction<{}>) => {},
  },
});
// Создаем reducer с помощью slice
export const tasksReducer = slice.reducer;
export const taskActions = slice.actions;
export const tasksThunk = { setTasksTC, deleteTasksTC, addTasksTC, updateTaskTC };

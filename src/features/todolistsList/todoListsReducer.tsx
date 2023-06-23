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
//         return state.filter(todo => todo.id !== action.payload.todolistID)
//
//     } else if (action.type === 'CHANGE-TITLE-TODO') {
//         // setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title: newValue} : tl));
//         return state.map(todo => todo.id === action.payload.todoId ? {...todo, title: action.payload.newValue} : todo);
//
//     } else if (action.type === 'CHANGE-ENT-STATUS-TODO') {
//         // setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title: newValue} : tl));
//         return state.map(todo => todo.id === action.payload.todoId ? {
//             ...todo,
//             entityStatus: action.payload.status
//         } : todo);
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
//             todos.forEach((todo) => {
//                 dispatch(setTasksTC(todo.id))
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
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appAction, StatusType} from "app/appReducer";
import {ResultCode, todolistsApi, TodolistType} from "api/todolistsApi";
import {tasksThunk} from "features/todolistsList/tasksReducer";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtils";
import {Simulate} from "react-dom/test-utils";

export type filterValueType = "All" | 'Active' | 'Completed';
export type TodoAppType = TodolistType & {
    filter: filterValueType,
    entityStatus: StatusType,
}
const initialState: TodoAppType[] = [//первым параметром принимаем редьюсер
    // {id: todolistID_1, title: 'What to learn', filter: 'All'},
    // {id: todolistID_2, title: 'What to buy', filter: 'All'},
];

export const setTodolistsThunkCreator = createAsyncThunk(
    'todo/setTodo',

    async (arg, thunkAPI) => {
        const {dispatch} = thunkAPI
        dispatch(appAction.setStatus({status: 'loading'}));
        try {
            const res = await todolistsApi.getTodolists()
            dispatch(todoActions.setTodo(res.data));
            dispatch(appAction.setStatus({status: 'succeeded'}));
            const todos = await res.data
            todos.forEach((todo) => {
                dispatch(tasksThunk.setTasksTC(todo.id))
            })
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
    })

export const addTodoThunkCreator = createAsyncThunk(
    'todo/addTodo',
    async (title: string, {dispatch}) => {

        dispatch(appAction.setStatus({status: 'loading'}));
        try {
            const res = await todolistsApi.createTodolists(title)
            dispatch(todoActions.addTodo(res.data.data.item));
            dispatch(appAction.setStatus({status: 'succeeded'}));

        } catch (error: any) {
            handleServerNetworkError(error, dispatch)

        }
    })

export const deleteTodoThunkCreator = createAsyncThunk(
    'todo/deletTodo',

    async (todoId: string, {dispatch}) => {
        dispatch(appAction.setStatus({status: 'loading'}));
        dispatch(todoActions.changeEntStatusTodo({todoId: todoId, status: 'loading'}))
        try {
            const res = await todolistsApi.deleteTodolists(todoId)
            if (res.data.resultCode === ResultCode.Ok) {
                dispatch(todoActions.deleteTodo({todolistID: todoId}));
                dispatch(appAction.setStatus({status: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(appAction.setStatus({status: 'failed'}));
            dispatch(todoActions.changeEntStatusTodo({todoId: todoId, status: 'idle'}))

        } catch (error: any) {
            handleServerNetworkError(error.message, dispatch);
            dispatch(appAction.setStatus({status: 'failed'}));
            dispatch(todoActions.changeEntStatusTodo({todoId: todoId, status: 'idle'}))

        }
    })


export const changeTitleTodoThunkCreator = createAsyncThunk(
    'todo/changeTitleTodo',

    async (arg: { todoId: string, title: string }, {dispatch}) => {
        dispatch(appAction.setStatus({status: 'loading'}));
        try {
            const res = await todolistsApi.updateTodolists(arg.todoId, arg.title)
            if (res.data.resultCode === ResultCode.Ok) {
                dispatch(todoActions.changeTitleTodo({todoId: arg.todoId, newValue: arg.title}));
                dispatch(appAction.setStatus({status: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch)
            }

        } catch (error: any) {
            handleServerNetworkError(error, dispatch)

        }
    })


const slice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TodolistType>) => {
            state.push({...action.payload, filter: 'All', entityStatus: 'idle'})
        },
        deleteTodo: (state, action: PayloadAction<{ todolistID: string }>) => {
            state.filter(todo => todo.id !== action.payload.todolistID)
        },
        changeTitleTodo: (state, action: PayloadAction<{ todoId: string, newValue: string, }>) => {
            state.map(todo => todo.id === action.payload.todoId ? todo.title = action.payload.newValue : todo)
        },
        changeEntStatusTodo: (state, action: PayloadAction<{ todoId: string, status: StatusType, }>) => {
            state.map(todo => todo.id === action.payload.todoId ? todo.entityStatus = action.payload.status : todo)
        },
        taskFilterTodo: (state, action: PayloadAction<{ todoListsID: string, filter: filterValueType, }>) => {
            state.map(todo => todo.id === action.payload.todoListsID ? todo.filter = action.payload.filter : todo)
        },
        setTodo: (state, action: PayloadAction<TodolistType[]>) => {
            action.payload.map(todo => ({...todo, filter: 'All', entityStatus: 'idle'}))
        },
        clearData: (state) => {
            state = []
        }
    }
})

export const todoListsReducer = slice.reducer;
export const todoActions = slice.actions
export const authActions = slice.actions




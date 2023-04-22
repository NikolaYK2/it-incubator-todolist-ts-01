import {todolistsApi, TodolistType} from "../../api/todolistsApi";
import {Dispatch} from "redux";
import {setAppStatusAC, SetAppStatusACType, StatusType} from "../../app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {ResCode} from "./tasksReducer";

export type filterValueType = "All" | 'Active' | 'Completed';

// export type TodolistType = {
//     id: string,
//     title: string,
//     filter: filterValueType, //Список отсортированный для всех тудулистов
// }

// export let todolistID_1 = v1();
// export let todolistID_2 = v1();
export type TodoAppType = TodolistType & {
    filter: filterValueType,
    entityStatus: StatusType,

}
const initialState: TodoAppType[] = [//первым параметром принимаем редьюсер
    // {id: todolistID_1, title: 'What to learn', filter: 'All'},
    // {id: todolistID_2, title: 'What to buy', filter: 'All'},
];

export const todoListsReducer = (state = initialState, action: complexTypeActions): TodoAppType[] => {
    if (action.type === 'ADD-TODO') {
        // let todolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'All'};
        // setTodoLists([todolist, ...todoLists])
        // setTasks({...tasks, [todolist.id]: []})
        return [{...action.payload.todolist, filter: 'All', entityStatus: 'idle'}, ...state];

    } else if (action.type === 'DELETE-TODO') {
        // setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        // delete tasks[todolistID];// И нужно еще удалить объект с тасками, что бы мусора не было
        return state.filter(todo => todo.id !== action.payload.todolistID)

    } else if (action.type === 'CHANGE-TITLE-TODO') {
        // setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title: newValue} : tl));
        return state.map(todo => todo.id === action.payload.todoId ? {...todo, title: action.payload.newValue} : todo);

    } else if (action.type === 'CHANGE-ENT-STATUS-TODO') {
        // setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title: newValue} : tl));
        return state.map(todo => todo.id === action.payload.todoId ? {
            ...todo,
            entityStatus: action.payload.status
        } : todo);

    } else if (action.type === 'TASK-FILTER-TODO') {
        //     setFilterValue(filterValue);
        // setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, filter} : tl))
        //map создает новый массив так что копию(...todolist) делать не надо
        return state.map(todoFil => todoFil.id === action.payload.todoListsID ? {
            ...todoFil,
            filter: action.payload.filter
        } : todoFil);

    } else if (action.type === "SET-TODOLISTS") {
        return action.payload.todoLists.map(tl => ({...tl, filter: 'All', entityStatus: 'idle'}));
    }
    return state;
};

//AC ==============================================================================================

export type complexTypeActions =
    | AddTodoACType
    | DeleteTodoACType
    | SetTodoACType
    | SetAppStatusACType
    | ChangeTodoEntStatusACType
    | ReturnType<typeof onChangeTitleTodolistAC>
    | ReturnType<typeof changeTasksFilterAC>;

export type AddTodoACType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODO', payload: {todolist}} as const)

export type DeleteTodoACType = ReturnType<typeof deleteTodolistAC>;
export const deleteTodolistAC = (todolistID: string) => ({type: 'DELETE-TODO', payload: {todolistID,}} as const)

export const onChangeTitleTodolistAC = (todoId: string, newValue: string,) => {
    return {
        type: 'CHANGE-TITLE-TODO',
        payload: {
            todoId,
            newValue,
        }
    } as const;
}

export const changeTasksFilterAC = (todoListsID: string, filter: filterValueType,) => {
    return {
        type: 'TASK-FILTER-TODO',
        payload: {
            todoListsID,
            filter,
        }
    } as const;
}

export type SetTodoACType = ReturnType<typeof setTodolistsAC>;
export const setTodolistsAC = (todoLists: TodolistType[]) => ({type: 'SET-TODOLISTS', payload: {todoLists,}} as const)

export type ChangeTodoEntStatusACType = ReturnType<typeof changeTodoEntStatusAC>;
export const changeTodoEntStatusAC = (todoId: string, status: StatusType,) => {
    return {
        type: 'CHANGE-ENT-STATUS-TODO',
        payload: {
            todoId,
            status,
        }
    } as const;
}

//THUNK ===========================================================================
// export const setTodolistsThunk =/*()=>{
//     return */(dispatch: Dispatch<complexTypeActions>) => {
//     todolistsApi.getTodolists()
//         .then(res => {
//             dispatch(setTodolistsAC(res.data))
//         })
// }

export const setTodolistsThunkCreator = () => /*{*//*return */(dispatch: Dispatch<complexTypeActions>) => {
    dispatch(setAppStatusAC('loading'));
    todolistsApi.getTodolists()
        .then(data => {
            dispatch(setTodolistsAC(data))
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
// }

export const addTodoThunkCreator = (title: string) => (dispatch: Dispatch<complexTypeActions>) => {
    dispatch(setAppStatusAC('loading'));

    todolistsApi.createTodolists(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const deleteTodoThunkCreator = (todoId: string) => (dispatch: Dispatch<complexTypeActions>) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodoEntStatusAC(todoId, 'loading'))
    todolistsApi.deleteTodolists(todoId)
        .then(res => {
            if (res.data.resultCode === ResCode.ok){
                dispatch(deleteTodolistAC(todoId));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppStatusAC('failed'));
            dispatch(changeTodoEntStatusAC(todoId, 'idle'))
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch);
            dispatch(setAppStatusAC('failed'));
            dispatch(changeTodoEntStatusAC(todoId, 'idle'))
        })
}


export const changeTitleTodoThunkCreator = (todoId: string, title: string) => (dispatch: Dispatch<complexTypeActions>) => {
    dispatch(setAppStatusAC('loading'));
    todolistsApi.updateTodolists(todoId, title)
        .then(res => {
            dispatch(onChangeTitleTodolistAC(todoId, title));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


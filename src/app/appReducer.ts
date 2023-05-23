import {authApi, ResultCode} from "../api/todolistsApi";
import {Dispatch} from "redux";
import {ActionsType} from "./store";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils";
import {setInLoginAC} from "../features/login/authReducer";
import {clearTodosDataAC} from "../features/todolistsList/todoListsReducer";

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateAppType = {
    //Происходит ли взаимодействие с сервером
    status: StatusType,
    //Если ошибка глобальная - запишем текст ошибки сюда.
    error: string | null,
    //инициализация приложения -true
    initialized: boolean,
}

const initialState: InitialStateAppType = {
    status: 'idle',
    error: null,
    initialized: false,//Делаем для того что бы небыло маргания на логин
}


export const appReducer = (state: InitialStateAppType = initialState, action: ActionsAppType): InitialStateAppType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'app/INITIALIZED':
            return {...state, initialized: action.value}//Делаем для того что бы небыло маргания на логин
        default:
            return state;
    }
}

//AC ================================================================
export type ActionsAppType =
    | SetAppStatusACType
    | SetAppErrorACType
    | ReturnType<typeof initializedAppAC>;

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>;
export const setAppStatusAC = (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const);

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>;
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);

export const initializedAppAC = (value: boolean) => ({type: 'app/INITIALIZED', value,} as const);

//THUNK ======================================
export const initializedAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setInLoginAC(true));//Говорим что мы залогинены
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(initializedAppAC(true));
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
//LOGOUT THEN .CATCH --------------------------------
// export const logoutAppTC = () => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'));
//     authApi.logout()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setInLoginAC(false));//Говорим что мы залогинены
//                 dispatch(setAppStatusAC('succeeded'));
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//             dispatch(initializedAppAC(true));
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
//LOGOUT ASYNC AWAIT ------
export const logoutAppTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await authApi.logout()
        if (res.data.resultCode === ResultCode.Ok) {
            dispatch(setInLoginAC(false));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(clearTodosDataAC());
        } else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(initializedAppAC(true));
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}

import {setAppStatusAC} from "app/appReducer";
import {authApi, AuthLoginType, ResultCode} from "api/todolistsApi";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtils";
import {AppThunk} from "app/store";

type initialStateType = {
    isLoggedIn: boolean,
}
export const initialState: initialStateType = {
    isLoggedIn: false,
}

export const authReducer = (state = initialState, action: ComplexLoginACType): initialStateType => {
    switch (action.type) {
        case 'login/LOGIN-IN': {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state

    }
};

//AC ===============================================================================

export type ComplexLoginACType =
    | ReturnType<typeof setInLoginAC>


export const setInLoginAC = (value: boolean) => {
    return {
        type: 'login/LOGIN-IN',
        value,
    } as const
}


//THUNK =====================================

//THEN.CATCH -----------
// export const authLoginTC = (data: AuthLoginType) => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'));
//     authApi.auth(data)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 // dispatch(authLoginAC(data));
//                 dispatch(setInLoginAC(true))
//                 dispatch(setAppStatusAC('succeeded'))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
//ASYNC ------------
export const authLoginTC = (data: AuthLoginType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await authApi.authLogin(data);
        if (res.data.resultCode === ResultCode.Ok) {
            // dispatch(authLoginAC(data));
            dispatch(setInLoginAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error:any) {
        // if (typeof error === "string") {
        //     error.toUpperCase() // works, `e` narrowed to string
        // } else if (error instanceof Error) {
        //     handleServerNetworkError(error, dispatch)
        // }
        handleServerNetworkError(error, dispatch)
    }
}
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/appReducer";
import {authApi, AuthLoginType} from "../../api/todolistsApi";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {ActionsType} from "../../app/store";

type initialStateType = {
    isLoggedIn: boolean,
}
export const initialState: initialStateType = {
    isLoggedIn: false,
}

export const authReducer = (state = initialState, action: ComplexLoginACType): initialStateType => {
    switch (action.type) {
        case 'login/LOGIN-IN': {
            return {...state, isLoggedIn:action.value}
        }
        default:
            return state

    }
};

//AC ===============================================================================

export type ComplexLoginACType =
    | ReturnType<typeof setInLoginAC>


export const setInLoginAC = (value:boolean) => {
    return {
        type: 'login/LOGIN-IN',
        value,
    } as const
}


//THUNK =====================================
export const authLoginTC = (data: AuthLoginType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    authApi.auth(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                // dispatch(authLoginAC(data));
                dispatch(setInLoginAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
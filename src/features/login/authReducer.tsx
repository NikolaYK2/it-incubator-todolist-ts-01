//REDUX ---------------------------------------------------------------
// type initialStateType = {
//     isLoggedIn: boolean,
// }
// export const initialState: initialStateType = {
//     isLoggedIn: false,
// }
//
// export const authReducer = (state = initialState, action: ComplexLoginACType): initialStateType => {
//     switch (action.type) {
//         case 'login/LOGIN-IN': {
//             return {...state, isLoggedIn: action.value}
//         }
//         default:
//             return state
//
//     }
// };
//
// //AC ===============================================================================
//
// export type ComplexLoginACType =
//     | ReturnType<typeof setInLoginAC>
//
//
// export const setInLoginAC = (value: boolean) => {
//     return {
//         type: 'login/LOGIN-IN',
//         value,
//     } as const
// }
//
//
// //THUNK =====================================
//
// //THEN.CATCH -----------
// // export const authLoginTC = (data: AuthLoginType) => (dispatch: Dispatch<ActionsType>) => {
// //     dispatch(setAppStatusAC('loading'));
// //     authApi.auth(data)
// //         .then(res => {
// //             if (res.data.resultCode === 0) {
// //                 // dispatch(authLoginAC(data));
// //                 dispatch(setInLoginAC(true))
// //                 dispatch(setAppStatusAC('succeeded'))
// //             } else {
// //                 handleServerAppError(res.data, dispatch)
// //             }
// //         })
// //         .catch(error => {
// //             handleServerNetworkError(error, dispatch)
// //         })
// // }
// //ASYNC ------------
// export const authLoginTC = (data: AuthLoginType): AppThunk => async (dispatch) => {
//     dispatch(setAppStatusAC('loading'));
//     try {
//         const res = await authApi.authLogin(data);
//         if (res.data.resultCode === ResultCode.Ok) {
//             // dispatch(authLoginAC(data));
//             dispatch(setInLoginAC(true))
//             dispatch(setAppStatusAC('succeeded'))
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (error: any) {
//         // if (typeof error === "string") {
//         //     error.toUpperCase() // works, `e` narrowed to string
//         // } else if (error instanceof Error) {
//         //     handleServerNetworkError(error, dispatch)
//         // }
//         handleServerNetworkError(error, dispatch)
//     }
// }

//RTK --------------------------------------------------
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authApi, AuthLoginType} from "api/todolistsApi";
import {appAction} from "app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtils";

const authLogin = createAsyncThunk(
    'auth/login',
    async (data: AuthLoginType, thunkAPI) => {
        const {dispatch} = thunkAPI;
        dispatch(appAction.setStatus({status: 'loading'}));
        try {
            const res = await authApi.authLogin(data)
            if (res.data.resultCode === 0) {
                // dispatch(authLoginAC(data));
                dispatch(setIsLoggedIn({isLoggedIn: true}))
                dispatch(appAction.setStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        } catch (error: any) {
            handleServerNetworkError(error, dispatch)

        }
    }
)
// slice - редьюсеры создаем с помощью функции createSlice
const slice = createSlice({
    // важно чтобы не дублировалось, будет в качетве приставки согласно соглашению redux ducks
    name: 'auth',
    //❗Если будут писаться тесты на slice или где понадобится типизация,
    // тогда выносим initialState наверх
    initialState: {
        isLoggedIn: false
    },
    // состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
    reducers: {
        //❗в жизни setIsLoggedInAC c AC писать не надо.
        // оставим только для того чтобы делать плавный рефакторинг
        // Объект payload. Типизация через PayloadAction
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            // логику в подредьюсерах пишем мутабельным образом,
            // т.к. иммутабельность достигается благодаря immer.js
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

// Создаем reducer с помощью slice
export const authReducer = slice.reducer;
// Action creator также достаем с помощью slice
export const {setIsLoggedIn} = slice.actions
// либо вот так. ❗Делаем так, в дальнейшем пригодиться
export const authActions = slice.actions

export const authThunk = {authLogin}
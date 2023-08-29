import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleServerAppError, handleServerNetworkError } from "common/utils/errorUtils";
import { authActions } from "features/auth/authReducer";
import { todoActions } from "features/todolistsList/todolist/todoListsReducer";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { authApi } from "features/auth/authApi";
import { ResultCode } from "common/api/todolistsApi";

//REDUX --------------------------------------------------------------------
// export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
//
// export type InitialStateAppType = {
//     //Происходит ли взаимодействие с сервером
//     status: StatusType,
//     //Если ошибка глобальная - запишем текст ошибки сюда.
//     error: string | null,
//     //инициализация приложения -true
//     initialized: boolean,
// }
//
// const initialState: InitialStateAppType = {
//     status: 'idle',
//     error: null,
//     initialized: false,//Делаем для того что бы небыло маргания на логин
// }
//
//
// export const appReducer = (state: InitialStateAppType = initialState, action: ActionsAppType): InitialStateAppType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case 'app/INITIALIZED':
//             return {...state, initialized: action.value}//Делаем для того что бы небыло маргания на логин
//         default:
//             return state;
//     }
// }
//
// //AC ================================================================
// export type ActionsAppType =
//     | SetAppStatusACType
//     | SetAppErrorACType
//     | ReturnType<typeof initializedAppAC>;
//
// export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>;
// export const setAppStatusAC = (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const);
//
// export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>;
// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
//
// export const initializedAppAC = (value: boolean) => ({type: 'app/INITIALIZED', value,} as const);
//
// //THUNK ======================================
// export const initializedAppTC = () => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'));
//     authApi.me()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setInLoginAC(true));//Говорим что мы залогинены
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//             dispatch(initializedAppAC(true));
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
// //LOGOUT THEN .CATCH --------------------------------
// // export const logoutAppTC = () => (dispatch: Dispatch<ActionsType>) => {
// //     dispatch(setAppStatusAC('loading'));
// //     authApi.logout()
// //         .then(res => {
// //             if (res.data.resultCode === 0) {
// //                 dispatch(setInLoginAC(false));//Говорим что мы залогинены
// //                 dispatch(setAppStatusAC('succeeded'));
// //             } else {
// //                 handleServerAppError(res.data, dispatch)
// //             }
// //             dispatch(initializedAppAC(true));
// //         })
// //         .catch(error => {
// //             handleServerNetworkError(error, dispatch)
// //         })
// // }
// //LOGOUT ASYNC AWAIT ------
// export const logoutAppTC = () => async (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'));
//     try {
//         const res = await authApi.logout()
//         if (res.data.resultCode === ResultCode.Ok) {
//             dispatch(setInLoginAC(false));
//             dispatch(setAppStatusAC('succeeded'));
//             dispatch(clearTodosDataAC());
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//         dispatch(initializedAppAC(true));
//     } catch (error: any) {
//         handleServerNetworkError(error, dispatch)
//     }
// }

//RTK ==================================================================
export type StatusType = "idle" | "loading" | "succeeded" | "failed";

export interface AppStateType {
  status: StatusType;
  error: string | null;
  initialized: boolean;
}

const initialState: AppStateType = {
  status: "idle",
  error: null,
  initialized: false, //Делаем для того что бы небыло маргания на логин
};

//thunk -------------------------------------------------------------
export const initializedAppTC = createAppAsyncThunk(
  "app/init",

  async (_, { dispatch }) => {
    dispatch(appAction.setStatus({ status: "loading" }));
    try {
      const res = await authApi.me();
      if (res.data.resultCode === ResultCode.Ok) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true })); //Говорим что мы залогинены
      } else {
        handleServerAppError(res.data, dispatch);
      }
      dispatch(appAction.initializedApp({ initialized: true }));
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  }
);

const logoutApp = createAppAsyncThunk("app/logout", async (_, thunkAPI) => {
  const { dispatch } = thunkAPI;
  dispatch(appAction.setStatus({ status: "loading" }));
  try {
    const res = await authApi.logout();
    if (res.data.resultCode === ResultCode.Ok) {
      // dispatch(authThunk.authLogin({ isLoggedIn: false }));
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
      dispatch(appAction.setStatus({ status: "succeeded" }));
      dispatch(todoActions.clearData());
      // dispatch(clearTodoTask({tasks:{}, todoLists:[]}));
      // dispatch(clearTodoTask({}, []));
    } else {
      handleServerAppError(res.data, dispatch);
    }
    dispatch(appAction.initializedApp({ initialized: true }));
  } catch (error: any) {
    handleServerNetworkError(error, dispatch);
  }
});

// reducer -----------------------------------------------------
const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<{ status: StatusType }>) => {
      state.status = action.payload.status;
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    initializedApp: (state, action: PayloadAction<{ initialized: boolean }>) => {
      state.initialized = action.payload.initialized;
    },
  },
});

export const appReducer = slice.reducer;
// export const {setStatus, setError, initializedApp,} = slice.actions;
export const appAction = slice.actions;
export const appThunk = { logoutApp };

import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "features/auth/model/authReducer";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { authApi } from "features/auth/api/authApi";
import { ResultCode } from "common/api/todolistsApi";
import { thunkTryCatch } from "common/utils/thunkTryCatch";

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

//thunk -------------------------------------------------------------
export const initializedApp = createAppAsyncThunk</*{isLoggedIn: boolean}*/ undefined, undefined>(
  "app/init",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.me();
      if (res.data.resultCode === ResultCode.Ok) {
        // return { isLoggedIn: true }
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        return;
      } else {
        // handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    }).finally(() => {
      dispatch(appAction.initializedApp({ initialized: true }));
    });
  }
);
// export const initializedApp = createAppAsyncThunk<undefined, undefined>(
//   "app/init",
//   async (_, { dispatch, rejectWithValue }) => {
//     dispatch(appAction.setStatus({ status: "loading" }));
//     try {
//       const res = await authApi.me();
//       if (res.data.resultCode === ResultCode.Ok) {
//         dispatch(authActions.setIsLoggedIn({ isLoggedIn: true })); //Говорим что мы залогинены
//         return;
//       } else {
//         handleServerAppError(res.data, dispatch);
//         return rejectWithValue(null);
//       }
//       // return { initialized: true }
//       // return;
//     } catch (error) {
//       handleServerNetworkError(error, dispatch);
//       return rejectWithValue(null);
//     } finally {
//       dispatch(appAction.initializedApp({ initialized: true }));
//     }
//   }
// );

// reducer -----------------------------------------------------
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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith("/pending");
        },
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith("/rejected");
        },
        (state) => {
          state.status = "failed";
        }
      )
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith("/fulfilled");
        },
        (state) => {
          state.status = "succeeded";
        }
      );
  },
});

export const appReducer = slice.reducer;
// export const {setStatus, setError, initializedApp,} = slice.actions;
export const appAction = slice.actions;
export const appThunk = { initializedApp };

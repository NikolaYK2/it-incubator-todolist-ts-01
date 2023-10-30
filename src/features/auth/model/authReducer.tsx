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
//         case 'auth/LOGIN-IN': {
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
//         type: 'auth/LOGIN-IN',
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
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appThunk } from "app/model/appReducer";
import { handleServerAppError } from "common/utils/errorUtils";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { authApi, AuthLoginType } from "features/auth/api/authApi";
import { BaseResponsTodolistsType, ResultCode } from "common/api/todolistsApi";
import { todoActions } from "features/todolistsList/model/todos/todoListsReducer";
import { thunkTryCatch } from "common/utils/thunkTryCatch";

//extra ------------------------------
const authLogin = createAppAsyncThunk<unknown, AuthLoginType, { rejectValue: BaseResponsTodolistsType | null }>(
  "auth/login",
  async (data, { rejectWithValue, dispatch }) => {
    const res = await authApi.authLogin(data);
    if (res.data.resultCode === ResultCode.Ok) {
      return;
    } else if (res.data.resultCode === 10) {
      const res = await authApi.captcha();
      dispatch(authActions.captchaImgUrl({ captcha: res.data.url }));
    }
    return rejectWithValue(res.data);
  }
);

const authLogout = createAppAsyncThunk<undefined, undefined>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.logout();
    if (res.data.resultCode === ResultCode.Ok) {
      dispatch(todoActions.clearData());
      // dispatch(clearTodoTask());
      return;
    } else {
      handleServerAppError(res.data, dispatch);
    }
    dispatch(appThunk.initializedApp());
    return rejectWithValue(null);
  });
});

// slice - редьюсеры создаем с помощью функции createSlice
export type AuthInitType = {
  isLoggedIn: boolean;
  captcha: string;
};
const initialState: AuthInitType = {
  isLoggedIn: false,
  captcha: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    captchaImgUrl: (state, action: PayloadAction<{ captcha: string }>) => {
      state.captcha = action.payload.captcha;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.isLoggedIn = false;
      });
    // .addCase(initializedApp.fulfilled, (state)=>{
    //   state.isLoggedIn = true
    // })
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunk = { authLogin, authLogout };

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
import { appAction, appThunk } from "app/appReducer";
import { handleServerAppError, handleServerNetworkError } from "common/utils/errorUtils";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { authApi, AuthLoginType } from "features/auth/authApi";
import { ResultCode } from "common/api/todolistsApi";
import { todoActions } from "features/todolistsList/todolist/todoListsReducer";

//extra ------------------------------
const authLogin = createAppAsyncThunk<unknown, AuthLoginType>(
  "auth/login",
  async (data, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appAction.setStatus({ status: "loading" }));
    try {
      const res = await authApi.authLogin(data);
      if (res.data.resultCode === ResultCode.Ok) {
        dispatch(appAction.setStatus({ status: "succeeded" }));

        return;
        // return { isLoggedIn: true };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return { isLoggedIn: false };
    }
  }
);

const authLogout = createAppAsyncThunk(
  "auth/logout", async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appAction.setStatus({ status: "loading" }));
    try {
      const res = await authApi.logout();
      if (res.data.resultCode === ResultCode.Ok) {
        // dispatch(authThunk.authLogin({ isLoggedIn: false }));
        dispatch(appAction.setStatus({ status: "succeeded" }));
        dispatch(todoActions.clearData());

        return;
        // dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));

        // dispatch(clearTodoTask({tasks:{}, todoLists:[]}));
        // dispatch(clearTodoTask({}, []));
      } else {
        handleServerAppError(res.data, dispatch);
      }
      dispatch(appThunk.initializedApp());
      return rejectWithValue(null)

    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null)
    }
  });


// slice - редьюсеры создаем с помощью функции createSlice
export type AuthInitType = {
  isLoggedIn: boolean;
};
const initialState: AuthInitType = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.fulfilled, (state) => {
      state.isLoggedIn = true;
    })
      .addCase(authLogout.fulfilled, (state) => {
      state.isLoggedIn = false;
    })
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunk = { authLogin, authLogout };

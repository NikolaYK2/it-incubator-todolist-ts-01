import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "features/auth/model/authReducer";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { authApi } from "features/auth/api/authApi";
import { ResultCode } from "common/api/todolistsApi";

export const initializedApp = createAppAsyncThunk</*{isLoggedIn: boolean}*/ undefined, undefined>(
  "app/init",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const res = await authApi.me().finally(() => {
      dispatch(appAction.initializedApp({ initialized: true }));
    });
    if (res.data.resultCode === ResultCode.Ok) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      return;
    } else {
      return rejectWithValue(res.data);
    }
  }
);
// export const initializedApp = createAppAsyncThunk</*{isLoggedIn: boolean}*/ undefined, undefined>(
//   "app/init",
//   async (_, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     return thunkTryCatch(thunkAPI, async () => {
//       const res = await authApi.me();
//       if (res.data.resultCode === ResultCode.Ok) {
//         // return { isLoggedIn: true }
//         dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//         return;
//       } else {
//         // handleServerAppError(res.data, dispatch);
//         return rejectWithValue(null);
//       }
//     }).finally(() => {
//       dispatch(appAction.initializedApp({ initialized: true }));
//     });
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
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = "failed";
        if (action.payload) {
          // if(action.type.includes('addTodo')) return
          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred";
        }
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      })
      // .addMatcher(isAnyOf(appThunk.initializedApp.fulfilled), (state) => {
      //   state.initialized = true
      // });
  },
});

export const appReducer = slice.reducer;
// export const {setStatus, setError, initializedApp,} = slice.actions;
export const appAction = slice.actions;
export const appThunk = { initializedApp };

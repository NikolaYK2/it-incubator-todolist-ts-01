import { AppRootStateType } from "app/store";

export const authSelect = (state: AppRootStateType) => state.auth.isLoggedIn;
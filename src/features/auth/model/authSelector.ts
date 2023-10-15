import { AppRootStateType } from "app/model/store";

export const authSelect = (state: AppRootStateType) => state.auth.isLoggedIn;
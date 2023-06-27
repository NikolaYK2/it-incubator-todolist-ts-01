import { AppRootStateType } from "app/store";

export const appSelector = (state: AppRootStateType) => state.app.initialized;
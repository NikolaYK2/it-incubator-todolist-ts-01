import { AppRootStateType } from "app/model/store";

export const appSelector = (state: AppRootStateType) => state.app.initialized;
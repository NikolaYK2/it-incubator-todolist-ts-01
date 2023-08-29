import { AppRootStateType } from "app/store";

export const todolistSelector = (state: AppRootStateType) => state.todoLists;
export const statusSelector = (state: AppRootStateType) => state.app.status;

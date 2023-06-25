import { AppRootStateType } from "app/store";

export const todolistSelector = (state: AppRootStateType) => state.todoLists;

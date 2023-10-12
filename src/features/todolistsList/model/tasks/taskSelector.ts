import { AppRootStateType } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

const taskSelect = (state: AppRootStateType, todoId: string) => state.tasks[todoId];
export const optimizedTaskSelect = createSelector([taskSelect], (task) => {
  return task;
});

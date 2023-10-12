import { AppRootStateType } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

// const tasksSelect = (state: AppRootStateType) => state.tasks;
// export const optimizeTasksSelect = createSelector([tasksSelect], (task) => {
//   return task;
// });

const taskSelect = (state: AppRootStateType, todoId: string) => state.tasks[todoId];
export const optimizedTaskSelect = createSelector([taskSelect], (task) => {
  return task;
});

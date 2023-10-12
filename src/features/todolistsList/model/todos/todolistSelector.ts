import { AppRootStateType } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

const todolistSelector = (state: AppRootStateType) => state.todoLists;
export const optimizedTodolistSelector = createSelector([todolistSelector], (todo)=>{
  return todo
})
export const statusSelector = (state: AppRootStateType) => state.app.status;

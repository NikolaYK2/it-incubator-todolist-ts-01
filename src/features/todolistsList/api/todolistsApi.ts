//TODOL typeee =================================
import { instance, BaseResponsTodolistsType } from "common/api/todolistsApi";

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export const todolistsApi = {
  //TODolis =====================================================================
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists/`);
  },
  createTodolists(title: string) {
    return instance.post<BaseResponsTodolistsType<{ item: TodolistType }>>("todo-lists/", { title: title });
  },
  deleteTodolists(todoId: string) {
    return instance.delete<BaseResponsTodolistsType<{}>>(`todo-lists/${todoId}`);
  },
  updateTodolists(todoId: string, title: string) {
    return instance.put<BaseResponsTodolistsType>(`todo-lists/${todoId}`, { title, });
  },
};
//TODOL typeee =================================
import { instance, ResponsTodolistsType } from "common/api/todolistsApi";

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export const todolistsApi = {
  //TODolis =====================================================================
  getTodolists() {
    return instance.get<Array<TodolistType>>(`todo-lists/`);
  },
  createTodolists(title: string) {
    return instance.post<ResponsTodolistsType<{ item: TodolistType }>>("todo-lists/", { title: title });
  },
  deleteTodolists(todoId: string) {
    return instance.delete<ResponsTodolistsType<{}>>(`todo-lists/${todoId}`);
  },
  updateTodolists(todoId: string, title: string) {
    return instance.put<ResponsTodolistsType>(`todo-lists/${todoId}`, { title, });
  },
};
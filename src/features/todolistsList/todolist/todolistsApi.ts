//TODOL typeee =================================
import { EntStatusType, UpdTaskTCType } from "features/todolistsList/todolist/task/tasksReducer";
import { instance, ResponsTodolistsType, TaskStatuses, TodoTaskPriorities } from "common/api/todolistsApi";

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};



export type UpdTaskType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TodoTaskPriorities;
  startDate: string;
  deadline: string;
};
export type TaskType = EntStatusType & {
  id: string;
  title: string;
  description: string;
  // completed: boolean,
  status: TaskStatuses;
  // entityStatus?: StatusType,
  priority: TodoTaskPriorities;
  startDate: string;
  deadline: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type GetTaskType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

//arg thunk ----------------
export type CreateTaskType = {
  todoId: string;
  title: string;
};
export type ArgUpdateTaskType = {
  todoId: string;
  taskId: string;
  model: UpdTaskTCType;
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
    return instance.put<ResponsTodolistsType>(`todo-lists/${todoId}`, {
      title,
    });
  },

  //TASK================================================
  getTasks(todoId: string) {
    return instance.get<GetTaskType>(`todo-lists/${todoId}/tasks`);
  },
  createTask(arg: CreateTaskType) {
    return instance.post<ResponsTodolistsType<{ item: TaskType }>>(`todo-lists/${arg.todoId}/tasks`, {
      title: arg.title,
    });
  },
  deleteTask(todoId: string, taskId: string) {
    return instance.delete<ResponsTodolistsType>(`todo-lists/${todoId}/tasks/${taskId}`);
  },
  updateTask(arg: ArgUpdateTaskType, model: UpdTaskType) {
    return instance.put<ResponsTodolistsType<{ item: TaskType }>>(
      `todo-lists/${arg.todoId}/tasks/${arg.taskId}`,
      model
    );
  },
};
import { instance, BaseResponsTodolistsType, TaskStatuses, TodoTaskPriorities } from "common/api/todolistsApi";
import { EntStatusType, UpdTaskTCType } from "features/todolistsList/model/tasks/tasksReducer";

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
//arg thunk tasks ----------------
export type CreateTaskType = {
  todoId: string;
  title: string;
};
export type ArgUpdateTaskType = {
  todoId: string;
  taskId: string;
  model: UpdTaskTCType;
};

export const tasksApi={
  getTasks(todoId: string) {
    return instance.get<GetTaskType>(`todo-lists/${todoId}/tasks`);
  },
  createTask(arg: CreateTaskType) {
    return instance.post<BaseResponsTodolistsType<{ item: TaskType }>>(`todo-lists/${arg.todoId}/tasks`, {
      title: arg.title,
    });
  },
  deleteTask(todoId: string, taskId: string) {
    return instance.delete<BaseResponsTodolistsType>(`todo-lists/${todoId}/tasks/${taskId}`);
  },
  updateTask(arg: ArgUpdateTaskType, model: UpdTaskType) {
    return instance.put<BaseResponsTodolistsType<{ item: TaskType }>>(
      `todo-lists/${arg.todoId}/tasks/${arg.taskId}`,
      model
    );
  },
}
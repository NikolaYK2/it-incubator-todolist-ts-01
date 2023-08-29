import { createAction, nanoid } from "@reduxjs/toolkit";
import { TaskStateType } from "features/todolistsList/todolist/task/tasksReducer";
import { TodoAppType } from "features/todolistsList/todolist/todoListsReducer";

// export type ClearTodoTaskType = {
//   tasks: TaskStateType;
//   todoLists: TodoAppType[];
// };

export const clearTodoTask = createAction("common/clearTodoTask", (tasks: TaskStateType, todoLists: TodoAppType[]) => {
  let random = 100;//Тут можно писать нужную нам логику и покачать ее в payload, тем самым не загрязняя наши санки
  return {
    payload: {
      tasks,
      todoLists,
      id: random > 90 ? nanoid() : Math.random()
    },
  };
});

import React from "react";
import { useAppSelector } from "app/model/store";
import { optimizedTaskSelect } from "features/todolistsList/model/tasks/taskSelector";
import { TaskStatuses } from "common/api/todolistsApi";
import { Task } from "features/todolistsList/ui/todolist/tasks/task/Task";
import { TodoAppType } from "features/todolistsList/model/todos/todoListsReducer";
import s from "./Tasks.module.css";

type Props={
  todolist:TodoAppType;
}
export const Tasks = React.memo((props:Props) => {
  const { id, filter } = props.todolist;

  // const tasks = useAppSelector((state) => state.tasks[id]);
  const tasks = useAppSelector((state) => optimizedTaskSelect(state, id));

  let filterTasks = tasks;
  if (filter === "Active") {
    filterTasks = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "Completed") {
    filterTasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <>
      {tasks.length ? (
        filterTasks.map((task) => {
          return (
            <li key={task.id} className={task.status ? s.activeTask : ""}>
              <Task task={task} idTodolist={props.todolist.id} />
            </li>
          );
        })
      ) : (
        <div className={s.tasksNull}>Task list is empty</div>
      )}
    </>
  );
});

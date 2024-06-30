import React from "react";
import { useAppSelector } from "app/model/store";
import { optimizedTaskSelect } from "features/todolistsList/model/tasks/taskSelector";
import { TaskStatuses } from "common/api/todolistsApi";
import { Task } from "features/todolistsList/ui/todolist/tasks/task/Task";
import { TodoAppType } from "features/todolistsList/model/todos/todoListsReducer";
import s from "./Tasks.module.css";
import { IconSvg } from "common/components/iconSvg/IconSvg";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

type Props = {
  todolist: TodoAppType;
};
export const Tasks = React.memo((props: Props) => {
  const { id, filter } = props.todolist;

  const tasks = useAppSelector((state) => optimizedTaskSelect(state, id));

  let filterTasks = tasks;
  if (filter === "Active") {
    filterTasks = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "Completed") {
    filterTasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  const taskAnimate = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: { x: 30, opacity: 0 },
  };
  return (
    <LazyMotion features={domAnimation}>
      <m.ul initial="hidden" animate="visible">
        <AnimatePresence>
          {tasks && tasks.length ? (
            filterTasks.map((task) => (
              <m.li
                key={task.id}
                className={task.status ? s.activeTask : ""}
                variants={taskAnimate}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Task task={task} idTodolist={props.todolist.id} />
              </m.li>
            ))
          ) : (
            <div className={s.tasksEmpty}>
              <IconSvg iconName={"empty"} />
            </div>
          )}
        </AnimatePresence>
      </m.ul>
    </LazyMotion>
  );
});

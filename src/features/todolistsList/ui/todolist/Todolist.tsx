import React, { useCallback } from "react";
import s from "features/todolistsList/ui/todolist/Todolist.module.css";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { todoActions, TodoAppType, todoThunk } from "features/todolistsList/model/todos/todoListsReducer";
import { Task } from "features/todolistsList/ui/task/Task";
import { useAppSelector } from "app/store";
import { tasksThunk } from "features/todolistsList/model/tasks/tasksReducer";
import { TaskStatuses } from "common/api/todolistsApi";
import { statusSelector } from "features/todolistsList/model/todos/todolistSelector";
import { useActions } from "common/hooks/useActions";
import { optimizedTaskSelect } from "features/todolistsList/model/tasks/taskSelector";
import { FilterTasksBut } from "features/todolistsList/ui/todolist/filterTasksBut/FilterTasksBut";

type TodolistProps = {
  todolist: TodoAppType;
  demo?: boolean;
};

export const Todolist = React.memo(({ demo = false, ...props }: TodolistProps) => {
  console.log("Todolist");

  const { id, title, filter } = props.todolist;

  // const tasks = useAppSelector((state) => state.tasks[id]);
  const tasks = useAppSelector((state) => optimizedTaskSelect(state, props.todolist.id));
  const status = useAppSelector(statusSelector);

  const { addTasksTC, deleteTodo, changeTitleTodo } = useActions({
    ...tasksThunk,
    ...todoThunk,
    ...todoActions,
  });

  const addTask = useCallback(
    (title: string) => {
      addTasksTC({ todoId: id, title: title });
      // dispatch(tasksThunk.addTasksTC({ todoId: id, title: title }));
    },
    [addTasksTC, id]
  );

  const onClickHandlerDeleteTodolist = useCallback(
    () => {
      deleteTodo(props.todolist.id);
    },
    [deleteTodo, props.todolist.id]
  );
  //===============================================================
  let filterTasks = tasks;
  if (filter === "Active") {
    filterTasks = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "Completed") {
    filterTasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  // =====================================================================
  //Если лист тасок остался пустой
  const taskListItems = tasks.length ? (
    filterTasks.map((task) => {
      return (
        <li key={task.id} className={task.status ? s.activeTask : ""}>
          <Task task={task} idTodolist={id} />
        </li>
      );
    })
  ) : (
    <div className={s.tasksNull}>Task list is empty</div>
  );

  const onChangeHandlerTitleTodolist = useCallback(
    (newValue: string) => {
      changeTitleTodo({ todoId: id, title: newValue });
    },
    [changeTitleTodo, id]
  );
  // ========================================================================================================

  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={onChangeHandlerTitleTodolist} />
      </h3>
      <IconButton onClick={onClickHandlerDeleteTodolist} color={"error"} disabled={status === "loading"}>
        <Delete />
      </IconButton>
      <div className={s.block}>
        <FullInput addItem={addTask} disabled={status === "loading"} />
      </div>
      <ul>{taskListItems}</ul>
      <FilterTasksBut todo={props.todolist}/>
    </div>
  );
});

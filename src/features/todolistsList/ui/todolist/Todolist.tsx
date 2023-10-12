import React, { useCallback } from "react";
import s from "features/todolistsList/ui/todolist/Todolist.module.css";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { todoActions, TodoAppType, todoThunk } from "features/todolistsList/model/todos/todoListsReducer";
import { useAppSelector } from "app/store";
import { tasksThunk } from "features/todolistsList/model/tasks/tasksReducer";
import { statusSelector } from "features/todolistsList/model/todos/todolistSelector";
import { useActions } from "common/hooks/useActions";
import { FilterTasksBut } from "features/todolistsList/ui/todolist/filterTasksBut/FilterTasksBut";
import { Tasks } from "features/todolistsList/ui/todolist/tasks/Tasks";

type TodolistProps = {
  todolist: TodoAppType;
  demo?: boolean;
};

export const Todolist = React.memo(({ demo = false, ...props }: TodolistProps) => {
  console.log("Todolist");

  const { id, title } = props.todolist;

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

  const onClickHandlerDeleteTodolist = useCallback(() => {
    deleteTodo(props.todolist.id);
  }, [deleteTodo, props.todolist.id]);

  const onChangeHandlerTitleTodolist = useCallback(
    (newValue: string) => {
      changeTitleTodo({ todoId: id, title: newValue });
    },
    [changeTitleTodo, id]
  );

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
      <ul>
        <Tasks todolist={props.todolist}/>
      </ul>
      <FilterTasksBut todo={props.todolist} />
    </div>
  );
});

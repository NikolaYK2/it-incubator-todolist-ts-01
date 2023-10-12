import React, { memo, useCallback } from "react";
import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useActions } from "common/hooks/useActions";
import { todoThunk } from "features/todolistsList/model/todos/todoListsReducer";
import { TodolistType } from "features/todolistsList/api/todolistsApi";
import { useAppSelector } from "app/store";
import { statusSelector } from "features/todolistsList/model/todos/todolistSelector";

type Props = {
  todolist: TodolistType;
};
export const TodoTitle = memo((props:Props) => {
  const {id, title} = props.todolist;

  const status = useAppSelector(statusSelector);

  const { deleteTodo, changeTitleTodo } = useActions(todoThunk);

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
    <>
      <h3>
        <EditableSpan title={title} onChange={onChangeHandlerTitleTodolist} />
      </h3>
      <IconButton onClick={onClickHandlerDeleteTodolist} color={"error"} disabled={status === "loading"}>
        <Delete />
      </IconButton>
    </>
  );
});

import React, { memo, useCallback } from "react";
import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useActions } from "common/hooks/useActions";
import { TodoAppType, todoActions } from "features/todolistsList/model/todos/todoListsReducer";
import s from "./TodoTitle.module.css";

type Props = {
  todolist: TodoAppType;
};
export const TodoTitle = memo(({ todolist }: Props) => {
  const { id, title } = todolist;
  const { deleteTodoIdAction, createTitleTodoAction } = useActions(todoActions);

  const onClickHandlerDeleteTodolist = useCallback(() => {
    deleteTodoIdAction(todolist.id);
  }, [deleteTodoIdAction, todolist.id]);

  const onChangeHandlerTitleTodolist = useCallback(
    (newValue: string) => {
      createTitleTodoAction({ todoId: id, title: newValue });
    },
    [createTitleTodoAction, id]
  );

  return (
    <div className={s.containerTodoTitle}>
      <EditableSpan className={s.title} valueTitle={title} onChange={onChangeHandlerTitleTodolist} />
      <IconButton onClick={onClickHandlerDeleteTodolist} color={"error"} disabled={todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </div>
  );
});

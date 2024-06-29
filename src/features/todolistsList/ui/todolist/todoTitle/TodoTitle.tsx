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
export const TodoTitle = memo((props: Props) => {
  const { id, title } = props.todolist;

  const { deleteTodoIdAction, createTitleTodoAction } = useActions(todoActions);

  const onClickHandlerDeleteTodolist = useCallback(() => {
    deleteTodoIdAction(props.todolist.id);
  }, [deleteTodoIdAction, props.todolist.id]);

  const onChangeHandlerTitleTodolist = useCallback(
    (newValue: string) => {
      createTitleTodoAction({ todoId: id, title: newValue });
    },
    [createTitleTodoAction, id]
  );

  return (
    <div className={s.containerTodoTitle}>
      <EditableSpan className={s.title} valueTitle={title} onChange={onChangeHandlerTitleTodolist} />
      <IconButton
        onClick={onClickHandlerDeleteTodolist}
        color={"error"}
        disabled={props.todolist.entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </div>
  );
});

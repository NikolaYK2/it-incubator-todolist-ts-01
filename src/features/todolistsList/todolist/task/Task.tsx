import React, { useCallback } from "react";
import { Checkbox } from "@mui/material";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { deleteTasksTC, tasksThunk } from "features/todolistsList/todolist/task/tasksReducer";
import s from "../Todolist.module.css";
import { Button } from "common/components/button/Button";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import { useAppDispatch } from "app/store";
import { TaskStatuses } from "common/api/todolistsApi";
import { TaskType } from "features/todolistsList/todolist/task/tasksApi";

export type TaskTypeP = {
  task: TaskType;
  idTodolist: string;
  disabled?: boolean;
};
export const Task = React.memo((props: TaskTypeP) => {
  const { id, status, title } = props.task;
  const dispatch = useAppDispatch();

  //============CHecked===============================
  const changeTaskStatusHandler = useCallback(
    (taskId: string, status: TaskStatuses) => {

      dispatch(
        tasksThunk.updateTaskTC({
          todoId: props.idTodolist,
          taskId: taskId,
          model: {
            status: status ? TaskStatuses.New : TaskStatuses.Completed,
          },
        })
      );
    },
    [dispatch, props.idTodolist]
  );

  // //Удаление таски==============================================================
  const onClickHandlerDeleteTask = useCallback(
    (todoId: string, taskId: string) => {
      dispatch(deleteTasksTC({ todoId: todoId, taskId: taskId }));
    },
    [dispatch]
  );

  //====Редактирование в task title===============================================
  const onChangeHandlerTitle = useCallback(
    (taskId: string, newValue: string) => {
      dispatch(tasksThunk.updateTaskTC({ todoId: props.idTodolist, taskId: taskId, model: { title: newValue } }));
    },
    [dispatch, props.idTodolist]
  );

  return (
    <>
      <Button
        callBack={() => onClickHandlerDeleteTask(props.idTodolist, id)}
        style={s.dellTask}
        disabled={props.task.entityStatus === "loading"}
      />
      <Checkbox
        checked={status === TaskStatuses.Completed}
        onChange={() => changeTaskStatusHandler(id, status)}
        icon={<BookmarkBorder />}
        checkedIcon={<Bookmark />}
        style={{ color: "darkred" }}
        disabled={props.task.entityStatus === "loading"}
      />
      <EditableSpan title={title} onChange={(newValue) => onChangeHandlerTitle(id, newValue)} />
    </>
  );
});

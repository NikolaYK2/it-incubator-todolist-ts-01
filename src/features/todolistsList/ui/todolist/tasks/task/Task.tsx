import React, { memo, useCallback } from "react";
import { Checkbox } from "@mui/material";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { tasksThunk } from "features/todolistsList/model/tasks/tasksReducer";
import s from "features/todolistsList/ui/todolist/Todolist.module.css";
import { Button } from "common/components/button/Button";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import { TaskStatuses } from "common/api/todolistsApi";
import { TaskType } from "features/todolistsList/api/tasksApi";
import { useActions } from "common/hooks/useActions";

type Props = {
  task: TaskType;
  idTodolist: string;
  disabled?: boolean;
};
export const Task = memo((props: Props) => {
  const { deleteTasksTC, updateTaskTC } = useActions(tasksThunk);

  const changeTaskStatusHandler = useCallback(() => {
    updateTaskTC({
      todoId: props.idTodolist,
      taskId: props.task.id,
      model: {
        status: props.task.status ? TaskStatuses.New : TaskStatuses.Completed,
      },
    });
  }, [updateTaskTC, props.idTodolist, props.task.id, props.task.status]);

  const deleteTaskHandler = useCallback(() => {
    deleteTasksTC({ todoId: props.idTodolist, taskId: props.task.id });
  }, [deleteTasksTC, props.idTodolist, props.task.id]);

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      updateTaskTC({ todoId: props.idTodolist, taskId: props.task.id, model: { title: newValue } });
    },
    [updateTaskTC, props.idTodolist, props.task.id]
  );

  return (
    <>
      <Button callBack={deleteTaskHandler} style={s.dellTask} disabled={props.task.entityStatus === "loading"} />
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        onChange={changeTaskStatusHandler}
        icon={<BookmarkBorder />}
        checkedIcon={<Bookmark />}
        style={{ color: "darkred" }}
        disabled={props.task.entityStatus === "loading"}
      />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
    </>
  );
});

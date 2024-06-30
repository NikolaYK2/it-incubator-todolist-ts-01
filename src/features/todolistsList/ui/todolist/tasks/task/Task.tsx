import React, { memo, useCallback } from "react";
import { Checkbox } from "@mui/material";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { Button } from "common/components/button/Button";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import { TaskStatuses } from "common/api/todolistsApi";
import { TaskType } from "features/todolistsList/api/tasksApi";
import { useActions } from "common/hooks/useActions";
import { taskActions } from "features/todolistsList/model/tasks/tasksReducer";
import s from "./Task.module.css";

type Props = {
  task: TaskType;
  idTodolist: string;
  disabled?: boolean;
};
export const Task = memo(({ task, idTodolist }: Props) => {
  const { deleteTasksAction, updateTaskAction } = useActions(taskActions);

  const changeTaskStatusHandler = useCallback(() => {
    updateTaskAction({
      todoId: idTodolist,
      taskId: task.id,
      model: {
        status: task.status ? TaskStatuses.New : TaskStatuses.Completed,
      },
    });
  }, [updateTaskAction, idTodolist, task.id, task.status]);

  const deleteTaskHandler = useCallback(() => {
    deleteTasksAction({ todoId: idTodolist, taskId: task.id });
  }, [deleteTasksAction, idTodolist, task.id]);

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      updateTaskAction({ todoId: idTodolist, taskId: task.id, model: { title: newValue } });
    },
    [updateTaskAction, idTodolist, task.id]
  );

  return (
    <div className={s.containerTask}>
      <Button
        iconBtn={{ iconName: "delete" }}
        callBack={deleteTaskHandler}
        className={s.dellTaskIcon}
        disabled={task.entityStatus === "loading"}
      />
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        onChange={changeTaskStatusHandler}
        icon={<BookmarkBorder />}
        checkedIcon={<Bookmark />}
        style={{ color: "darkred" }}
        disabled={task.entityStatus === "loading"}
      />
      <EditableSpan valueTitle={task.title} status={task.status} onChange={onChangeTitleHandler} />
    </div>
  );
});

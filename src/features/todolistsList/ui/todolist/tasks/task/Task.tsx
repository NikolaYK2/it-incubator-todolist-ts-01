import React, { memo, useCallback } from "react";
import { Checkbox } from "@mui/material";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import s from "features/todolistsList/ui/todolist/Todolist.module.css";
import { Button } from "common/components/button/Button";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import { TaskStatuses } from "common/api/todolistsApi";
import { TaskType } from "features/todolistsList/api/tasksApi";
import { useActions } from "common/hooks/useActions";
import { taskActions } from "features/todolistsList/model/tasks/tasksReducer";

type Props = {
  task: TaskType;
  idTodolist: string;
  disabled?: boolean;
};
export const Task = memo((props: Props) => {
  const { deleteTasksAction, updateTaskAction } = useActions(taskActions);

  const changeTaskStatusHandler = useCallback(() => {
    updateTaskAction({
      todoId: props.idTodolist,
      taskId: props.task.id,
      model: {
        status: props.task.status ? TaskStatuses.New : TaskStatuses.Completed,
      },
    });
  }, [updateTaskAction, props.idTodolist, props.task.id, props.task.status]);

  const deleteTaskHandler = useCallback(() => {
    deleteTasksAction({ todoId: props.idTodolist, taskId: props.task.id });
  }, [deleteTasksAction, props.idTodolist, props.task.id]);

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      updateTaskAction({ todoId: props.idTodolist, taskId: props.task.id, model: { title: newValue } });
    },
    [updateTaskAction, props.idTodolist, props.task.id]
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
      <EditableSpan valueTitle={props.task.title} onChange={onChangeTitleHandler} />
    </>
  );
});

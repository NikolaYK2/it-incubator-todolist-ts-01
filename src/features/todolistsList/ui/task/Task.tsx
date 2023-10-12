import React, { useCallback } from "react";
import { Checkbox } from "@mui/material";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { tasksThunk } from "features/todolistsList/model/tasks/tasksReducer";
import s from "features/todolistsList/ui/todolist/Todolist.module.css";
import { Button } from "common/components/button/Button";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import { TaskStatuses } from "common/api/todolistsApi";
import { TaskType } from "features/todolistsList/api/tasksApi";
import { useActions } from "common/hooks/useActions";

export type TaskTypeP = {
  task: TaskType;
  idTodolist: string;
  disabled?: boolean;
};
export const Task = React.memo((props: TaskTypeP) => {
  const { id, status, title } = props.task;
  const { deleteTasksTC, updateTaskTC } = useActions(tasksThunk);

  //============CHecked===============================
  const changeTaskStatusHandler = useCallback((taskId: string, status: TaskStatuses) => {
      updateTaskTC({
        todoId: props.idTodolist,
        taskId: taskId,
        model: {
          status: status ? TaskStatuses.New : TaskStatuses.Completed,
        },
      });
    },
    [updateTaskTC, props.idTodolist]
  );

  const deleteTaskHandler = useCallback((todoId: string, taskId: string) => {
      deleteTasksTC({ todoId: todoId, taskId: taskId });
    },
    [deleteTasksTC]
  );

  //====Редактирование в task title===============================================
  const onChangeTitleHandler = useCallback((taskId: string, newValue: string) => {
      updateTaskTC({ todoId: props.idTodolist, taskId: taskId, model: { title: newValue } });
    },
    [updateTaskTC, props.idTodolist]
  );

  return (
    <>
      <Button
        callBack={() => deleteTaskHandler(props.idTodolist, id)}
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
      <EditableSpan title={title} onChange={(newValue) => onChangeTitleHandler(id, newValue)} />
    </>
  );
});

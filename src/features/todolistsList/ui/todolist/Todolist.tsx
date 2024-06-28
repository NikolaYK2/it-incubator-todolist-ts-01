import React, { useCallback, useEffect } from "react";
import s from "features/todolistsList/ui/todolist/Todolist.module.css";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { TodoAppType } from "features/todolistsList/model/todos/todoListsReducer";
import { useAppSelector } from "app/model/store";
import { statusSelector } from "features/todolistsList/model/todos/todolistSelector";
import { useActions } from "common/hooks/useActions";
import { FilterTasksBut } from "features/todolistsList/ui/todolist/filterTasksBut/FilterTasksBut";
import { Tasks } from "features/todolistsList/ui/todolist/tasks/Tasks";
import { TodoTitle } from "features/todolistsList/ui/todolist/todoTitle/TodoTitle";
import { taskActions } from "features/todolistsList/model/tasks/tasksReducer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

type TodolistProps = {
  todolist: TodoAppType;
  demo?: boolean;
};

export const Todolist = React.memo(({ demo = false, ...props }: TodolistProps) => {
  const { id } = props.todolist;

  const status = useAppSelector(statusSelector);

  const { createTasksAction, requestTasksAction } = useActions(taskActions);

  useEffect(() => {
    requestTasksAction({ todoId: id });
  }, []);

  const addTask = useCallback(
    (title: string) => {
      return createTasksAction({ todoId: id, title: title });
    },
    [createTasksAction, id]
  );

  return (
    <Grid item key={id}>
      <Paper
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          boxShadow: "1px 1px 10px grey",
          padding: "10px",
        }}
      >
        <TodoTitle todolist={props.todolist} />
        <div className={s.block}>
          <FullInput addItem={addTask} disabled={status === "loading"} />
        </div>
        <ul>
          <Tasks todolist={props.todolist} />
        </ul>
        <FilterTasksBut todo={props.todolist} />
      </Paper>
    </Grid>
  );
});

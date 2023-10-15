import React, { useCallback, useEffect } from "react";
import s from "features/todolistsList/ui/todolist/Todolist.module.css";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { TodoAppType } from "features/todolistsList/model/todos/todoListsReducer";
import { useAppSelector } from "app/model/store";
import { tasksThunk } from "features/todolistsList/model/tasks/tasksReducer";
import { statusSelector } from "features/todolistsList/model/todos/todolistSelector";
import { useActions } from "common/hooks/useActions";
import { FilterTasksBut } from "features/todolistsList/ui/todolist/filterTasksBut/FilterTasksBut";
import { Tasks } from "features/todolistsList/ui/todolist/tasks/Tasks";
import { TodoTitle } from "features/todolistsList/ui/todolist/todoTitle/TodoTitle";

type TodolistProps = {
  todolist: TodoAppType;
  demo?: boolean;
};

export const Todolist = React.memo(({ demo = false, ...props }: TodolistProps) => {
  console.log("Todolist");

  const {id} = props.todolist;

  const status = useAppSelector(statusSelector);

  const { addTasksTC, setTasksTC } = useActions(tasksThunk);

  useEffect(() => {
    setTasksTC(id)
  }, []);

  const addTask = useCallback(
    (title: string) => {
      return addTasksTC({ todoId: id, title: title });
    },
    [addTasksTC, id]
  );


  return (
    <div>
      <TodoTitle todolist={props.todolist}/>
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

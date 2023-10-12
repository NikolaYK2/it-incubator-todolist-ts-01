import React, { useCallback } from "react";
import { Button } from "common/components/button/Button";
import s from "features/todolistsList/ui/todolist/Todolist.module.css";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { filterValueType, todoActions, TodoAppType, todoThunk } from "features/todolistsList/model/todos/todoListsReducer";
import { Task } from "features/todolistsList/ui/task/Task";
import { useAppSelector } from "app/store";
import { tasksThunk } from "features/todolistsList/model/tasks/tasksReducer";
import { TaskStatuses } from "common/api/todolistsApi";
import { statusSelector } from "features/todolistsList/model/todos/todolistSelector";
import { useActions } from "common/hooks/useActions";

export type TodolistPropsType = {
  todolist: TodoAppType;
  demo?: boolean;
};

export const Todolist = React.memo(({ demo = false, ...props }: TodolistPropsType) => {
  //demo если не передали по умолчанию будет false
  console.log("Todolist");


  const { id, title, filter } = props.todolist;

  const tasks = useAppSelector((state) => state.tasks[id]);

  const status = useAppSelector(statusSelector);

  const { addTasksTC, deleteTodo, taskFilterTodo, changeTitleTodo } = useActions({
    ...tasksThunk,
    ...todoThunk,
    ...todoActions,
  });

  //================addTask===================================================
  const addTask = useCallback(
    (title: string) => {
      addTasksTC({ todoId: id, title: title });
      // dispatch(tasksThunk.addTasksTC({ todoId: id, title: title }));
    },
    [addTasksTC, id]
  );

  // delete todolist=======================================
  const onClickHandlerDeleteTodolist = useCallback(
    (todolistID: string) => {
      deleteTodo(todolistID);
      // dispatch(todoThunk.deleteTodo(todolistID));
    },
    [deleteTodo]
  );
  //===============================================================
  //=========================ФиЛЬТРАЦИЯ==============================
  let filterTasks = tasks; //Создаем переменную тасок,и если фильтровать не нужно,
  if (filter === "Active") {
    filterTasks = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "Completed") {
    filterTasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  // =====================================================================
  //Если лист тасок остался пустой
  const taskListItems = tasks.length ? (
    filterTasks.map((task) => {
      return (
        <li key={task.id} className={task.status ? s.activeTask : ""}>
          <Task task={task} idTodolist={id} />
        </li>
      );
    })
  ) : (
    <div className={s.tasksNull}>Task list is empty</div>
  );

  //===============================================================================
  //Фильтр ==================================================
  const changeTasksFilterHandler = useCallback(
    (filter: filterValueType) => {
      taskFilterTodo({ todoListsID: id, filter });
      // dispatch(todoActions.taskFilterTodo({ todoListsID: id, filter }));
      // props.changeTasksFilter(props.todoListID, filter,);
    },
    [taskFilterTodo, id]
  );

  //=================Focus button filter===================================
  //filterValue - добавили фильтр из локального стейка
  const buttonAll = filter === "All" ? s.active : s.default;
  const buttonActive = filter === "Active" ? s.active : s.default;
  const buttonCompleted = filter === "Completed" ? s.active : s.default;
  // =============================================================================
  //Изм. todolist======================================================================================
  const onChangeHandlerTitleTodolist = useCallback(
    (newValue: string) => {
      changeTitleTodo({ todoId: id, title: newValue });
      // dispatch(todoThunk.changeTitleTodo({ todoId: id, title: newValue }));
    },
    [changeTitleTodo, id]
  );
  // ========================================================================================================

  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={onChangeHandlerTitleTodolist} />
      </h3>
      <IconButton onClick={() => onClickHandlerDeleteTodolist(id)} color={"error"} disabled={status === "loading"}>
        <Delete />
      </IconButton>
      <div className={s.block}>
        <FullInput addItem={addTask} disabled={status === "loading"} />
      </div>
      <ul>{taskListItems}</ul>
      <div>
        <Button
          name="All"
          callBack={useCallback(() => changeTasksFilterHandler("All"), [changeTasksFilterHandler])}
          style={buttonAll}
        />
        <Button
          name="Active"
          callBack={useCallback(() => changeTasksFilterHandler("Active"), [changeTasksFilterHandler])}
          style={buttonActive}
        />
        <Button
          name="Completed"
          callBack={useCallback(() => changeTasksFilterHandler("Completed"), [changeTasksFilterHandler])}
          style={buttonCompleted}
        />
      </div>
    </div>
  );
});

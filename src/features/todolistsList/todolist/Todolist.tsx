import React, { useCallback } from "react";
import { Button } from "common/components/button/Button";
import s from "./Todolist.module.css";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { filterValueType, todoActions, TodoAppType, todoThunk } from "features/todolistsList/todolist/todoListsReducer";
import { Task } from "./task/Task";
import { useAppDispatch, useAppSelector } from "app/store";
import { tasksThunk } from "features/todolistsList/todolist/task/tasksReducer";
import { TaskStatuses } from "common/api/todolistsApi";
import { statusSelector } from "features/todolistsList/todolist/todolistSelector";

export type TodolistPropsType = {
  todolist: TodoAppType;
  demo?: boolean;
};

export const Todolist = React.memo(({ demo = false, ...props }: TodolistPropsType) => {
  //demo если не передали по умолчанию будет false
  console.log("Todolist");

  // if (typeof props.demo === 'undefined') props.demo = false;//что бы не делать тут проверки,  делаем ее в пропсах

  const { id, title, filter } = props.todolist;

  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks[id]);
  const status = useAppSelector(statusSelector)



  //================addTask===================================================
  const addTask = useCallback((title: string) => {
      dispatch(tasksThunk.addTasksTC({ todoId: id, title: title }));
    }, [dispatch, id]);

  // delete todolist=======================================
  const onClickHandlerDeleteTodolist = useCallback(
    (todolistID: string) => {
      // dispatch(deleteTodolistAC(todolistID));
      dispatch(todoThunk.deleteTodo(todolistID));
    },
    [dispatch]
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
      dispatch(todoActions.taskFilterTodo({ todoListsID: id, filter }));
      // props.changeTasksFilter(props.todoListID, filter,);
    },
    [dispatch, id]
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

      dispatch(todoThunk.changeTitleTodo({ todoId: id, title: newValue }));
    },
    [dispatch, id]
  );
  // ========================================================================================================

  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={onChangeHandlerTitleTodolist} />
      </h3>
      <IconButton
        onClick={() => onClickHandlerDeleteTodolist(id)}
        color={"error"}
        disabled={status === "loading"}
      >
        <Delete />
      </IconButton>
      <div className={s.block}>
        <FullInput addItem={addTask} disabled={status === "loading"} />
      </div>
      <ul>
        {taskListItems}
      </ul>
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

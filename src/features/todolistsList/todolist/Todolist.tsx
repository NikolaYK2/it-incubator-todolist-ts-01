import React, { useCallback } from "react";
import { Button } from "common/components/button/Button";
import s from "./Todolist.module.css";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  changeTitleTodoThunkCreator,
  deleteTodoThunkCreator,
  filterValueType,
  todoActions,
  TodoAppType,
} from "features/todolistsList/todolist/todoListsReducer";
import { Task } from "./task/Task";
import { useAppDispatch, useAppSelector } from "app/store";
import { tasksThunk } from "features/todolistsList/todolist/task/tasksReducer";
import { TaskStatuses } from "common/api/todolistsApi";

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

  // useEffect(() => {//Эту функцию теперь выполняется последовательнов then
  //     if (demo) {
  //         return;
  //     }
  //     dispatch(setTasksTC(id));
  // }, [])
  //=======Добавление таски=====================================================================================================
  //     const addTask = (addTitle: string, todolistID: string) => {
  // //         setTasks([{id: v1(), title: addTitle, isDone: false}, ...tasks,])
  // // Acc. масс. =====================================================================
  // // const todoListsTasks = tasks[todolistID];
  // //         const updatedTasks = [{id: v1(), title: addTitle, isDone: false}, ...todoListsTasks];
  // //         const copyTasks = {...tasks};
  // //         copyTasks[todolistID] = updatedTasks;
  // //         setTasks(copyTasks);
  // //         Сокращенный вариант=================================================================
  // //         setTasks({...tasks, [todolistID]: [{id: v1(), title: addTitle, isDone: false}, ...tasks[todolistID]]})
  // //         ...tasks- раскрываем все такси и делаем копию,
  // //         В объекте есть св-в[todolistID] в которое вносим изм.
  // //         [todolistID]: [кладем сюда новый массив и все старые таски]Закидываем старые 4 таксик ...tasks[todolistID + одну новую {id: v1(), title: addTitle, isDone: false}
  //         dispatch(addTaskAC(addTitle, todolistID))
  //     }
  //Удаление таски ===============================================================================================================
  //     const deleteTask = (todolistID: string, tId: string,) => {
  //         // tasks = tasks.filter((el) => el.id !== elId)
  //         // setTasks(tasks.filter((el) => el.id !== elId));//для обычного массива методы
  //         //Ассоциативный массив =======================================
  //         // const todoListsTasks = tasks[todolistID];
  //         // const updatedTasks = todoListsTasks.filter(el=>el.id !== elId)
  //         // const copyTasks = {...tasks}
  //         // copyTasks[todolistID] = updatedTasks
  //         // setTasks(copyTasks);
  //         //Сокращенный вариант ================================================
  //         // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
  //         //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
  //         dispatch(deleteTaskAC(todolistID, tId))
  //     }
  // Передача наверх изм. title tasks=============================================================================
  //     const changeTaskTitle = (taskId: string, newValue: string, todolistID: string) => {
  //         // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
  //         dispatch(changeTaskTitleAC(taskId, newValue, todolistID))
  //     }

  //================addTask===================================================
  const addTask = useCallback(
    (title: string) => {
      // dispatch(addTaskAC(addTitle, id));
      dispatch(tasksThunk.addTasksTC({ todoId: id, title: title }));

      // props.addItem(title, props.todoListID);
    },
    [dispatch, id]
  );

  // delete todolist=======================================
  const onClickHandlerDeleteTodolist = useCallback(
    (todolistID: string) => {
      // dispatch(deleteTodolistAC(todolistID));
      dispatch(deleteTodoThunkCreator(todolistID));
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

      dispatch(changeTitleTodoThunkCreator({ todoId: id, title: newValue }));
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
        disabled={props.todolist.entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
      <div className={s.block}>
        <FullInput addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />

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

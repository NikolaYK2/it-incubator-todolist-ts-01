import React, { useCallback, useEffect } from "react";
import { addTodoThunkCreator, todoThunk } from "features/todolistsList/todolist/todoListsReducer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Todolist } from "./todolist/Todolist";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/store";
import { todolistSelector } from "features/todolistsList/todolist/todolistSelector";
import { authSelect } from "features/auth/authSelector";

type TodolistsListType = {
  demo?: boolean;
};
export const TodolistsList: React.FC<TodolistsListType> = ({ demo = false }) => {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector(todolistSelector);
  const isLoggedIn = useAppSelector(authSelect);

  //Достаем тудулисты ========================================
  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(todoThunk.setTodolistsThunkCreator()); //С функцией TC

  }, [dispatch, demo, isLoggedIn]);



  // ========Добавление Todolist=============================================================
  const addTodolist = useCallback(
    (title: string) => {
      // let todolist: TodolistType = {id: v1(), title, filter: 'All',}
      // setTodoLists([todolist, ...todoLists])
      // setTasks({...tasks, [todolist.id]: []})
      // dispatch(addTodolistAC(title, todolistID));
      // const todolistID = v1();
      // dispatch(addTodolistAC(title, todolistID));
      dispatch(addTodoThunkCreator(title));
    },
    [dispatch]
  );

  const todoListsComponents = todoLists.map((tl) => {
    // //=========================ФиЛЬТРАЦИЯ==============================
    // let filterTasks = tasks[tl.id];//[tl.id] - обращение к конкретному тудулисту, то есть его id
    // if (tl.filter === "Active") {
    //     // filterTasks = tasks.filter((el) => el.isDone);
    //     //Ассоциативный ===================================================
    //     filterTasks = tasks[tl.id].filter(t => t.isDone);
    // }
    // if (tl.filter === "Completed") {
    //     // filterTasks = tasks.filter(el => !el.isDone);
    //     //Ассоциативный ===================================================
    //     filterTasks = tasks[tl.id].filter(t => !t.isDone);
    // }
    // //==================================================================

    return (
      <Grid item key={tl.id}>
        <Paper
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            boxShadow: "1px 1px 10px grey",
            padding: "10px",
          }}
        >
          <Todolist
            todolist={tl}
            demo={demo}
            // todoListID={tl.id}
            // title={tl.title}//Название проекта
            // filter={tl.filter}
            // tasks={filterTasks}
            //
            // deleteTodolist={deleteTodolist}
            // changeTasksFilter={changeTasksFilter}
            // changeStatus={changeStatus}
            // deleteTask={deleteTask}
            // addItem={addTask}
            // changeTaskTitle={changeTaskTitle}//редактирование таски title
            // onChangeTitleTodolist={onChangeHandlerTitleTodolist}
          />
        </Paper>
      </Grid>
    );
  });

  //============================================================================================
  if (!isLoggedIn) {
    return <Navigate to={"/auth"} />;
  }
  return (
    <Container fixed>
      <Grid container style={{ padding: "10px", height: "70px" }}>
        <FullInput addItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        {todoListsComponents}
      </Grid>

    </Container>
  );
};

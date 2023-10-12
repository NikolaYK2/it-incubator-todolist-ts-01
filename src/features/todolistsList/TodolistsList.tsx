import React, { useCallback, useEffect } from "react";
import { todoThunk } from "features/todolistsList/todolist/todoListsReducer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Todolist } from "./todolist/Todolist";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "app/store";
import { todolistSelector } from "features/todolistsList/todolist/todolistSelector";
import { authSelect } from "features/auth/model/authSelector";
import { useActions } from "common/hooks/useActions";

type TodolistsListType = {
  demo?: boolean;
};
export const TodolistsList: React.FC<TodolistsListType> = ({ demo = false }) => {
  // const dispatch = useAppDispatch();
  const todoLists = useAppSelector(todolistSelector);
  const isLoggedIn = useAppSelector(authSelect);

  const {setTodolists, addTodo}= useActions(todoThunk)

  //Достаем тудулисты ========================================
  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
   setTodolists(); //С функцией TC
    // dispatch(todoThunk.setTodolists()); //С функцией TC

  }, [setTodolists, demo, isLoggedIn]);



  // ========Добавление Todolist=============================================================
  const addTodolist = useCallback((title: string) => {
      addTodo(title);
      // dispatch(todoThunk.addTodo(title));
    }, [addTodo]);

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

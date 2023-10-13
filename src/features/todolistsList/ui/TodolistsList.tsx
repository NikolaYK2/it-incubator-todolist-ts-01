import React, { useCallback, useEffect } from "react";
import { todoThunk } from "features/todolistsList/model/todos/todoListsReducer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Todolist } from "features/todolistsList/ui/todolist/Todolist";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "app/store";
import { optimizedTodolistSelector } from "features/todolistsList/model/todos/todolistSelector";
import { authSelect } from "features/auth/model/authSelector";
import { useActions } from "common/hooks/useActions";

type TodolistsListType = {
  demo?: boolean;
};
export const TodolistsList: React.FC<TodolistsListType> = ({ demo = false }) => {
  const todoLists = useAppSelector(optimizedTodolistSelector);
  const isLoggedIn = useAppSelector(authSelect);

  const {setTodolists, addTodo}= useActions(todoThunk)

  //Достаем тудулисты ========================================
  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
   setTodolists();
  }, [setTodolists, demo, isLoggedIn]);

  const addTodolist = useCallback((title: string) => {
      return addTodo(title).unwrap();
    }, [addTodo]);

  const todoListsComponents = todoLists.map((tl) => {
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

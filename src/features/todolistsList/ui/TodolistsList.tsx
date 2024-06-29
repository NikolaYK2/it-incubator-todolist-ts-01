import React, { useEffect } from "react";
import { todoActions } from "features/todolistsList/model/todos/todoListsReducer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Todolist } from "features/todolistsList/ui/todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "app/model/store";
import { optimizedTodolistSelector } from "features/todolistsList/model/todos/todolistSelector";
import { authSelect } from "features/auth/model/authSelector";
import { useActions } from "common/hooks/useActions";

type TodolistsListType = {
  demo?: boolean;
};
export const TodolistsList: React.FC<TodolistsListType> = ({ demo = false }) => {
  const todoLists = useAppSelector(optimizedTodolistSelector);
  const isLoggedIn = useAppSelector(authSelect);

  const { getTodolistAction } = useActions(todoActions);

  //Достаем тудулисты ========================================
  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    getTodolistAction();
  }, [getTodolistAction, demo, isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <Container fixed sx={{ marginTop: "150px" }}>
      <Grid container spacing={3} justifyContent={"center"} width={"100%"}>
        {todoLists.map((tl) => (
          <Todolist key={tl.id} todolist={tl} demo={demo} />
        ))}
      </Grid>
    </Container>
  );
};

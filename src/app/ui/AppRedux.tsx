import React, { useEffect } from "react";
import { TodolistsList } from "features/todolistsList/ui/TodolistsList";
import { Login } from "features/auth/ui/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "app/model/store";
import CircularProgress from "@mui/material/CircularProgress";
import { appSelector } from "app/model/appSelector";
import { ButtonAppBar } from "common/components";
import { useActions } from "common/hooks/useActions";
import { appAction } from "app/model/appReducer";
import Container from "@mui/material/Container";

export const BASE_ROUT = "/it-incubator-todolist-ts-01";

type AppReduxType = {
  demo?: boolean;
};

function AppRedux({ demo = false }: AppReduxType) {
  const initialized = useAppSelector(appSelector);

  const { initAppAction } = useActions(appAction);

  useEffect(() => {
    if (!initialized) {
      initAppAction();
    }
  }, []);

  if (!initialized) {
    return (
      <CircularProgress
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          color: "brown",
        }}
      />
    );
  }

  return (
    <>
      <ButtonAppBar />
      <Container fixed sx={{ marginTop: "150px" }}>
        <Routes>
          <Route path="/" element={<Navigate to={BASE_ROUT} replace />} />
          <Route path={BASE_ROUT} element={<TodolistsList demo={demo} />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/404" element={<h1 style={{ color: "brown", textAlign: "center" }}>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </>
  );
}

export default AppRedux;

import React, { useEffect } from "react";
import "./App.css";
// import { ButtonAppBar } from "components/buttonAppBar/ButtonAppBar";
import { TodolistsList } from "features/todolistsList/TodolistsList";
import { Login } from "features/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store";
import CircularProgress from "@mui/material/CircularProgress";
import { appSelector } from "app/appSelector";
import { ButtonAppBar } from "common/components";
import { appThunk } from "app/appReducer";

type AppReduxType = {
  demo?: boolean;
};

function AppRedux({ demo = false }: AppReduxType) {
  console.log("App");
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(appSelector);

  useEffect(() => {
    dispatch(appThunk.initializedApp());
  }, [dispatch]);

  if (!initialized) {
    //Убираем моргания перехода на логин при обновлении
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
  } //Такая загрузка отдельной компоненте хорошо только при инициализщации, один раз получается
  // но плохо делать например при каждом запросе, лучше сделать это как в компоненте ButtonAppBar
  // {status === 'loading' && <LinearProgress/>}

  return (
    <div>
      <ButtonAppBar />
      <Routes>
        <Route path="/it-incubator-todolist-ts-01" element={<Navigate to={"/"} />} />
        <Route path="/" element={<TodolistsList demo={demo} />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/404" element={<h1 style={{ color: "brown", textAlign: "center" }}>404: PAGE NOT FOUND</h1>} />
        <Route path="*" element={<Navigate to={"/404"} />} />
      </Routes>
    </div>
  );
}

export default AppRedux;

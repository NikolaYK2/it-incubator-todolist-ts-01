import React, { useEffect } from "react";
import "app/ui/App.css";
import { TodolistsList } from "features/todolistsList/ui/TodolistsList";
import { Login } from "features/auth/ui/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "app/model/store";
import CircularProgress from "@mui/material/CircularProgress";
import { appSelector } from "app/model/appSelector";
import { ButtonAppBar } from "common/components";
import { appThunk } from "app/model/appReducer";
import { useActions } from "common/hooks/useActions";

type AppReduxType = {
  demo?: boolean;
};

function AppRedux({ demo = false }: AppReduxType) {
  console.log("App");
  // const dispatch = useAppDispatch();
  const initialized = useAppSelector(appSelector);

  const {initializedApp}=useActions(appThunk)

  useEffect(() => {
    // dispatch(appThunk.initializedApp());
    initializedApp()
    // dispatch(appThunk.initializedApp({ initialized: true }));
  }, [initializedApp]);

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
  }

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

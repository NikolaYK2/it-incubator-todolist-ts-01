import * as React from "react";
import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LinearProgress from "@mui/material/LinearProgress";
import { ErrorSnackbar } from "common/components/errorSnackbar/ErrorSnackbar";
import { authActions } from "features/auth/model/authReducer";
import { useAppDispatch, useAppSelector } from "app/model/store";
import { Typography } from "common/components/typographi/Typography";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import Grid from "@mui/material/Grid";
import { FullInput } from "../fullInputButton/FullInput";
import { statusSelector } from "../../../features/todolistsList/model/todos/todolistSelector";
import { useActions } from "../../hooks/useActions";
import { todoActions } from "../../../features/todolistsList/model/todos/todoListsReducer";
import Container from "@mui/material/Container";
import s from "./ButtonAppBar.module.css";

export function ButtonAppBar() {
  const status = useAppSelector(statusSelector);
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);

  const { addTodoTitleAction } = useActions(todoActions);

  const dispatch = useAppDispatch();

  const logoutHandle = useCallback(() => {
    dispatch(authActions.authLogoutAction());
  }, [dispatch]);

  const addTodolist = useCallback(
    (title: string) => {
      return addTodoTitleAction(title);
    },
    [addTodoTitleAction]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ErrorSnackbar />
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          boxShadow: "0 0 12px rgb(0 0 0 / 10%)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Container>
            <Grid container display="flex" alignItems="center" justifyContent="space-between" padding={"10px"}>
              <Typography variant={"p"} style={{ textTransform: "uppercase", fontWeight: "900" }}>
                Task Flow
              </Typography>

              {isLoggedIn ? (
                <>
                  <div className={s.input}>
                    <FullInput addItem={addTodolist} disabled={status === "loading"} />
                  </div>

                  <Button color="inherit" onClick={logoutHandle}>
                    <MeetingRoomIcon />
                    <Typography variant={"p"}>Log out</Typography>
                  </Button>
                </>
              ) : (
                <Button color="inherit">
                  <AppRegistrationIcon />
                  <Typography variant={"a"} href={"https://social-network.samuraijs.com/"}>
                    register
                  </Typography>
                </Button>
              )}
            </Grid>
          </Container>
        </Toolbar>
        {status === "loading" && (
          <LinearProgress style={{ position: "absolute", left: "0", bottom: "-3px", height: "3px", width: "100%" }} />
        )}
      </AppBar>
    </Box>
  );
}

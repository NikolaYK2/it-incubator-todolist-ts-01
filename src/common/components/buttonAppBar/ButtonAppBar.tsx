import * as React from "react";
import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LinearProgress from "@mui/material/LinearProgress";
import { ErrorSnackbar } from "common/components/errorSnackbar/ErrorSnackbar";
import { StatusType } from "app/model/appReducer";
import { authActions } from "features/auth/model/authReducer";
import { useAppDispatch, useAppSelector } from "app/model/store";
import { Typography } from "common/components/typographi/Typography";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

export function ButtonAppBar() {
  const status = useAppSelector<StatusType>((state) => state.app.status);
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  const logoutHandle = useCallback(() => {
    dispatch(authActions.authLogoutAction());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ErrorSnackbar />
      <AppBar position="sticky" color="inherit">
        <Toolbar style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant={"p"} style={{ textTransform: "uppercase", fontWeight: "900" }}>
            Task Flow
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit" onClick={logoutHandle}>
              <MeetingRoomIcon />
              <Typography variant={"p"}>Log out</Typography>
            </Button>
          ) : (
            <Button color="inherit">
              <AppRegistrationIcon />
              <Typography variant={"a"} href={"https://social-network.samuraijs.com/"}>
                register
              </Typography>
            </Button>
          )}
        </Toolbar>
        {status === "loading" && (
          <LinearProgress style={{ position: "absolute", left: "0", bottom: "-3px", height: "3px", width: "100%" }} />
        )}
      </AppBar>
    </Box>
  );
}

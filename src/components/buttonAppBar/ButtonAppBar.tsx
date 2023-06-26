import * as React from "react";
import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LinearProgress from "@mui/material/LinearProgress";
import { ErrorSnackbar } from "components/errorSnackbar/ErrorSnackbar";
import { useAppDispatch, useAppSelector } from "app/store";
import { appThunk, StatusType } from "app/appReducer";

export default function ButtonAppBar() {
  const status = useAppSelector<StatusType>((state) => state.app.status);
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  const logoutHandle = useCallback(() => {
    dispatch(appThunk.logoutApp());
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ErrorSnackbar />
      <AppBar position="static" style={{ backgroundColor: "brown", position: 'relative'}}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandle}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === "loading" && (
          <LinearProgress style={{ position: "absolute", left: "0", bottom: "-3px", height:'3px', width: '100%' }} />
        )}
      </AppBar>
    </Box>
  );
}

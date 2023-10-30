import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material";
import { useLogin } from "features/auth/lib/useLogin";
import s from "./Login.module.css";

export const Login = () => {
  const { formik, isLoggedIn, captchaSelect } = useLogin();

  //MUI CHANGE STYLE===============================================
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            label: {
              color: "grey",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover": {
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976D2",
                borderWidth: "2px",
              },
            },
            ".MuiFormLabel-notchedOutline": {
              color: "red",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "grey",
              borderWidth: "1px",
            },
          },
          input: {
            color: "#1976D2",
          },
        },
      },
    },
  });
  //==========================================================
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <Grid item>
          <Paper
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              boxShadow: "1px 1px 10px grey",
              padding: "10px",
              margin: "50% 0 0",
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel sx={{ color: "#1976D2" }}>
                  <p>
                    To log in get registered
                    <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                      {" "}
                      here
                    </a>
                  </p>
                  <p>or use common test account credentials:</p>
                  <p>Email: free@samuraijs.com</p>
                  <p>Password: free</p>
                </FormLabel>
                <FormGroup style={{ color: "brown" }}>
                  <ThemeProvider theme={theme}>
                    <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
                    {/*<div style={{ height: "30px" }}>{formik.errors.email ? formik.errors.email : null}</div>*/}
                    <div style={{ height: "30px" }}>
                      {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                    </div>

                    <TextField
                      type="password"
                      label="Password"
                      autoComplete="off"
                      margin="normal"
                      {...formik.getFieldProps("password")}
                    />
                    {/*<div style={{ height: "30px" }}>{formik.errors.password ? formik.errors.password : null}</div>*/}
                    <div style={{ height: "30px" }}>
                      {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                    </div>

                    <FormControlLabel
                      sx={{ svg: { color: "#1976D2" } }}
                      label={"Remember me"}
                      control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
                    />
                    {captchaSelect && (
                      <>
                        <div className={s.captchaImg}>
                          <img src={`${captchaSelect}`} alt="" />
                        </div>
                        <TextField
                          type="text"
                          label="Captcha"
                          style={{ margin: "0 0 10px" }}
                          {...formik.getFieldProps("captcha")}
                        />
                      </>
                    )}
                  </ThemeProvider>

                  <Button type={"submit"} variant={"contained"} color={"primary"}>
                    Login
                  </Button>
                </FormGroup>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

import React, { useState } from "react";
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
import { FilledInput, InputAdornment, InputLabel } from "@mui/material";
import { useLogin } from "features/auth/lib/useLogin";
import s from "./Login.module.css";
import { Typography } from "common/components/typographi/Typography";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type LabelType = "email" | "password";
type TextFieldType = {
  type: string;
  label: LabelType;
};
const textField: TextFieldType[] = [
  { type: "text", label: "email" },
  { type: "password", label: "password" },
];
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const { formik, isLoggedIn, captchaSelect } = useLogin();

  //==========================================================
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"space-around"}
      alignItems={"center"}
      height={"100vh"}
      width={"100%"}
    >
      <Grid item>
        <Paper
          style={{
            maxWidth: "500px",
            padding: "8%",
            boxShadow: "0 0 12px rgb(0 0 0 / 10%)",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel>
                <Typography variant={"p"}>
                  Register by clicking on the register box or use the general trial account credentials::
                </Typography>
              </FormLabel>
              <FormLabel sx={{ margin: "1% 0 0", color: "var(--color-medium-900)" }}>
                <Typography variant={"small"}>
                  Email: free@samuraijs.com
                  <br />
                  Password: free
                </Typography>
              </FormLabel>
              <FormGroup style={{ color: "brown" }}>
                {textField.map((input) => (
                  <div key={input.label}>
                    <FormControl variant="filled" fullWidth={true} sx={{ margin: "5% 0 1%" }}>
                      <InputLabel htmlFor="filled-adornment-password">{input.label}</InputLabel>
                      <FilledInput
                        autoComplete={"on"}
                        type={input.type === "password" ? (showPassword ? "text" : "password") : input.type}
                        {...formik.getFieldProps(input.label)}
                        endAdornment={
                          input.type === "password" && (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                      />
                    </FormControl>
                    <div style={{ height: "30px" }}>
                      {formik.touched[input.label] && formik.errors[input.label] ? formik.errors[input.label] : null}
                    </div>
                  </div>
                ))}

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

                <Button
                  type={"submit"}
                  size={'large'}
                  sx={{ background: "var(--color-medium-900)" }}
                  color={'success'}
                  variant={"contained"}
                  style={{ maxWidth: "30%" }}
                >
                  Login
                </Button>
              </FormGroup>
              <FormLabel sx={{ margin: "5% 0 0" }}>
                <Typography variant={"h2"} style={{ margin: "0 0 10px", color: "brown" }}>
                  ATTENTION!
                </Typography>
                <Typography variant={"p"}>
                  If you currently can not sign in to Google Chrome, use a different browser. Third-party browser
                  cookies do not work for everyone. Google is gradually disabling them.
                </Typography>
              </FormLabel>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

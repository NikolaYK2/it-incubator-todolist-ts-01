import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {authLoginTC} from "./authReducer";
import {Navigate} from 'react-router-dom';
import Paper from "@mui/material/Paper";
import {createTheme, ThemeProvider} from "@mui/material";

export const Login = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'bad email'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is require'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            dispatch(authLoginTC(values));
        },
    });

    if (isLoggedIn) {
        return <Navigate to='/'/>
    }

    //MUI CHANGE STYLE===============================================
    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        label: {
                            color: 'grey'
                        },
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1976D2',
                                borderWidth: '2px',
                            }
                        },
                        '.MuiFormLabel-notchedOutline': {
                            color: 'red'
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'grey',
                            borderWidth: '1px',
                        },
                    },
                    input: {
                        color: '#1976D2',

                    },
                },
            },
        },
    });
//==========================================================

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <Grid item>
                <Paper style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    boxShadow: "1px 1px 10px grey",
                    padding: '10px',
                    margin: '50% 0 0'
                }}>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel sx={{color: 'grey'}}>
                                <p>To log in get registered
                                    <a href={'https://social-network.samuraijs.com/'} target={'_blank'}> here</a>
                                </p>
                                <p>or use common test account credentials:</p>
                                <p>Email: free@samuraijs.com</p>
                                <p>Password: free</p>
                            </FormLabel>
                            <FormGroup style={{color: 'brown'}}>
                                <ThemeProvider theme={theme}>
                                    <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                                    <TextField type="password" label="Password"
                                               margin="normal" {...formik.getFieldProps('password')}/>
                                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}

                                    <FormControlLabel sx={{'svg': {color: '#1976D2'}}} label={'Remember me'}
                                                      control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                                                         checked={formik.values.rememberMe}/>}/>
                                </ThemeProvider>

                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Login
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    </Grid>
}
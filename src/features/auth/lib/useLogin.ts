import { useAppDispatch, useAppSelector } from "app/model/store";
import { FormikHelpers, useFormik } from "formik";
import { AuthLoginType } from "features/auth/api/authApi";
import { authThunk } from "features/auth/model/authReducer";
import { BaseResponsTodolistsType } from "common/api/todolistsApi";
import { captchaImgSelect } from "features/auth/model/authSelector";

type FormikErrorType = Partial<AuthLoginType>

export const useLogin = () => {
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
  const captchaSelect = useAppSelector(captchaImgSelect);

  const dispatch = useAppDispatch();

  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 4) {
        errors.password = "Should be more three symbols";
      }
      return errors;
    },

    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha:false,
    },
    onSubmit: (values, formikHelpers: FormikHelpers<AuthLoginType>) => {
      dispatch(authThunk.authLogin(values))
        .unwrap()
        .then(() => {})
        .catch((e: BaseResponsTodolistsType) => {

          e.fieldsErrors?.forEach((el) => formikHelpers.setFieldError(el.field, el.error));
        });
    },
  });

  return { formik, isLoggedIn,captchaSelect };
};

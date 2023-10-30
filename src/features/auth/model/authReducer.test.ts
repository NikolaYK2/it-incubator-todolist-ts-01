import { AuthInitType, authReducer, authThunk } from "features/auth/model/authReducer";

let auth: AuthInitType;
beforeEach(() => {
  auth = {
    isLoggedIn: false,
    captcha:'',
  };
});

test("is logged", () => {
  // const newAuth = authReducer(auth, authActions.setIsLoggedIn({ isLoggedIn: true }));
  const newAuth = authReducer(
    auth,
    authThunk.authLogin.fulfilled({ isLoggedIn: true }, "", {
      email: "",
      password: "",
      rememberMe: true,
      captcha: false,
    })
  );

  expect(newAuth.isLoggedIn).toBe(true);
  expect(auth.isLoggedIn).toBe(false);
});

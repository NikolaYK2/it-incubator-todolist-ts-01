import { AuthInitType, authReducer, authThunk } from "features/auth/authReducer";

let auth: AuthInitType;
beforeEach(() => {
  auth = {
    isLoggedIn: false,
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
      captcha: "",
    })
  );

  expect(newAuth.isLoggedIn).toBe(true);
  expect(auth.isLoggedIn).toBe(false);
});

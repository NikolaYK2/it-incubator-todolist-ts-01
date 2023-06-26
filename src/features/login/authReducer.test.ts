import { authActions, AuthInitType, authReducer } from "features/login/authReducer";

let auth: AuthInitType;
beforeEach(() => {
  auth = {
    isLoggedIn: false,
  };
});

test("is logged", () => {
  const newAuth = authReducer(auth, authActions.setIsLoggedIn({ isLoggedIn: true }));

  expect(newAuth.isLoggedIn).toBe(true);
  expect(auth.isLoggedIn).toBe(false );
});

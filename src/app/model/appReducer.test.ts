import { appAction, appReducer, AppStateType } from "app/model/appReducer";

let app: AppStateType;
beforeEach(() => {
  app = {
    status: "idle",
    error: null,
    initialized: false,
  };
});

test("status", () => {
  const newApp = appReducer(app, appAction.setStatus({ status: "succeeded" }));

  expect(newApp.status).toBe("succeeded");
  expect(app.status).toBe("idle");
});

test("status error", () => {
  const newApp = appReducer(app, appAction.setError({ error: "hera se!" }));

  expect(newApp.error).toBe("hera se!");
  expect(app.error).toBe(null);
});

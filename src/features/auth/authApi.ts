//AUTH =======================================================================
import { instance, ResponsTodolistsType } from "common/api/todolistsApi";

export type AuthLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
type AuthMeType = {
  id: number;
  email: string;
  login: string;
};
export const authApi = {
  authLogin(/*email: string, password: string, rememberMe: boolean*/ data: AuthLoginType) {
    return instance.post<ResponsTodolistsType<{ userId?: number }>>("auth/login", data);
  },
  me() {
    return instance.get<ResponsTodolistsType<AuthMeType>>("auth/me");
  },
  logout() {
    return instance.delete<ResponsTodolistsType>("auth/login");
  },
};
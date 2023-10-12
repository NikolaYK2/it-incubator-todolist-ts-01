//AUTH =======================================================================
import { instance, BaseResponsTodolistsType } from "common/api/todolistsApi";

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
    return instance.post<BaseResponsTodolistsType<{ userId?: number }>>("auth/login", data);
  },
  me() {
    return instance.get<BaseResponsTodolistsType<AuthMeType>>("auth/me");
  },
  logout() {
    return instance.delete<BaseResponsTodolistsType>("auth/login");
  },
};
//AUTH =======================================================================
import { instance, BaseResponsTodolistsType } from "common/api/todolistsApi";

export type AuthLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: boolean;
};

type AuthMeType = {
  id: number;
  email: string;
  login: string;
};

type captchaUrl={
  url:string
}
export const authApi = {
  authLogin(data: AuthLoginType) {
    return instance.post<BaseResponsTodolistsType<{ userId?: number }>>("auth/login", data);
  },
  me() {
    return instance.get<BaseResponsTodolistsType<AuthMeType>>("auth/me");
  },
  logout() {
    return instance.delete<BaseResponsTodolistsType>("auth/login");
  },
  captcha() {
    return instance.get<captchaUrl>("security/get-captcha-url");
  }
};
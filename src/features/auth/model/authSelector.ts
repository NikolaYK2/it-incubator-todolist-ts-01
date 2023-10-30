import { AppRootStateType } from "app/model/store";

export const authSelect = (state: AppRootStateType) => state.auth.isLoggedIn;
export const captchaImgSelect = (state: AppRootStateType) => state.auth.captcha;
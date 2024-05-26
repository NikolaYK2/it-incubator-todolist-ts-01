import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.1/`,
  headers: {
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
});

instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = "Bearer" + localStorage.getItem("sn-token");
  return config;
});

export type FieldsErrorsType = {
  error: string;
  field: string;
};
export type BaseResponsTodolistsType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors: FieldsErrorsType[];
};

//RESULT CODE ===================================
export const ResultCode = {
  Ok: 0,
  Error: 1,
  Captcha: 10,
} as const;

type ResCodeType = keyof typeof ResultCode;

//TASK status type==============================================
export enum TaskStatuses { //Тип данных. Перечисление всех возможных вариантов
  New = 0, //Где isDOne false = New
  InProgress = 1,
  Completed = 2, //выполнено,типо isDone ture
  Draft = 3,
}

export enum TodoTaskPriorities { //Тип данных. Перечисление всех возможных вариантов
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

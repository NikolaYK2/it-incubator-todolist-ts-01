import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.1/`,
  headers: {
    "API-KEY": "f6bda301-132d-49df-8c79-f6fa4c3fd15d",
  },
});
//ERRORS ==============================================
// export type ResponsTodolistsType<D = {}> = {
//   //D - уточняем наш дженерик D-типо data/ D = {} - если дженерик не передовать, он по умолчанию может являться пустым обьектом
//   resultCode: number;
//   // fieldErrors?: Array<{field:string,error:string}>
//   messages: string[];
//   data: D;
// };

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
// export enum ResultCode {
//   Ok = 0,
//   Error = 1,
//   Captcha = 10,
// }

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


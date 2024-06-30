import React, { ChangeEvent, KeyboardEvent, useCallback } from "react";
import s from "common/components/input/UniversalInput.module.css";
import { TextField } from "@mui/material";

type UniversalInputType = {
  setAddTitle: (addTitle: string) => void;
  addTitle: string;
  callback: () => void;
  setError: (value: null) => void;
  style: string;
  error?: string | null;
  disabled?: boolean;
};

export const UniversalInput = React.memo((props: UniversalInputType) => {
  //добавления значений в инпут============================
  const onChangeHandlerAddTask = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (props.error !== null) {
        props.setError(null); //Когда начинаем писать, ошибка пропадает / можно это прописать и в onKey
      }
      props.setAddTitle(event.currentTarget.value);
    },
    [props]
  );

  //Кнопка ввода ENter==================================================
  const onKeyDownHandler = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        props.callback(); // функция добавления таски
      }
    },
    [props]
  );

  return (
    <div className={s.universalInput}>
      <TextField
        disabled={props.disabled}
        size="small"
        variant="filled"
        color="success"
        label={props.error ? "Delete or fill" : "add title"}
        error={!!props.error}
        value={props.addTitle}
        onChange={onChangeHandlerAddTask}
        onKeyDown={onKeyDownHandler}
        style={{ maxWidth: "180px" }}
        className={`${props.style} ${s.modified}`}
      />
    </div>
  );
});

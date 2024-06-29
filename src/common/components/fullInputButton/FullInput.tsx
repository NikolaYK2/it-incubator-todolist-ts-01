import React, { useCallback, useState } from "react";
import { UniversalInput } from "common/components/input/UniversalInput";
import { Button } from "common/components/button/Button";
import s from "./FullInput.module.css";

type FullInputType = {
  addItem: (addTitle: string) => any;
  disabled?: boolean;
};

export const FullInput = React.memo(({ disabled = false, ...props }: FullInputType) => {
  //=======State Добавление таски======================================================
  const [addTitle, setAddTitle] = useState<string>("");
  //=====State Ошибка в случаи попытка отправки пустого поля========================
  let [error, setError] = useState<string | null>(null);
  const errorStop = error ? s.error : "";

  const handlerAddTask = useCallback(async () => {
    if (addTitle.trim() !== "") {
      props.addItem(addTitle.trim());
      setAddTitle("");
    } else {
      setError("Заполни полe Чувак!");
    }
  }, [addTitle, props]);
  //=====================================================================================

  return (
    <>
      <div className={s.containerFullInput}>
        <UniversalInput
          setAddTitle={setAddTitle}
          addTitle={addTitle}
          callback={handlerAddTask}
          setError={setError}
          style={errorStop}
          error={error}
          disabled={disabled}
        />
        <Button iconBtn={{ iconName: "add" }} callBack={handlerAddTask} className={s.addTask} disabled={disabled} />
      </div>
    </>
  );
});

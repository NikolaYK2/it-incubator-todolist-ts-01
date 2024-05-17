import React, { useCallback, useState } from "react";
import { UniversalInput } from "common/components/input/UniversalInput";
import s from "features/todolistsList/ui/todolist/Todolist.module.css";
import { Button } from "common/components/button/Button";

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

      // .then(() => {
      //   setAddTitle("");
      // })
      // .catch((e: BaseResponsTodolistsType) => {
      //   if (e?.resultCode) {
      //     setError(e.messages[0]);
      //   }
      // });
    } else {
      setError("Заполни полe Чувак!");
    }
  }, [addTitle, props]);
  //=====================================================================================

  return (
    <>
      <div className={s.input__block}>
        <UniversalInput
          setAddTitle={setAddTitle}
          addTitle={addTitle}
          callback={handlerAddTask}
          setError={setError}
          style={errorStop}
          error={error}
          disabled={disabled}
        />
        <Button callBack={handlerAddTask} style={s.addTask} disabled={disabled} />
      </div>
    </>
  );
});

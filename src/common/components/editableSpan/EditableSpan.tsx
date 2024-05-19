import s from "common/components/editableSpan/EditableSpan.module.css";
import React, { ChangeEvent, KeyboardEvent, memo, useCallback, useState } from "react";
import { TextField } from "@mui/material";

type EditableSpanType = {
  title: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
};
//Делаем спан инпутом когданужно=========================================================
export const EditableSpan = /*React.*/ memo((props: EditableSpanType) => {
  //==Делаем управление не из вне, а state управление самой компонентой
  //=====CONTROL EDITSPAN TASK=====================================================================
  let [editMode, setEditMode] = useState(false);
  //=====CONTROL VALUE=====================================================================
  let [title, setTitle] = useState(props.title); //props.title cо старта будет то значение котрое приходит в пропсах

  const switching = useCallback(() => {
    if (title !== "") {
      setEditMode(!editMode);
    }
    props.onChange(title);
  }, [props, title, editMode]);

  const onChangeHandlerValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }, []);
  const onKeyDownHandlerValue = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        switching();
      }
    },
    [switching]
  );

  // ============================================================================
  return editMode ? (
    <TextField
      label={title === "" ? "add & dell" : ""}
      error={!title}
      value={title}
      size="small"
      variant="filled"
      disabled={props.disabled}
      onChange={onChangeHandlerValue}
      onBlur={switching}
      onKeyDown={onKeyDownHandlerValue}
      autoFocus
      sx={{
        input: { color: "#f5f5f5", maxWidth: "150px", padding: "10px 0 0 0" },
      }}
    />
  ) : (
    <span className={s.text} onDoubleClick={switching}>
      {title}
    </span>
  );
});

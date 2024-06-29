import s from "common/components/editableSpan/EditableSpan.module.css";
import React, { ChangeEvent, KeyboardEvent, memo, useCallback, useState } from "react";
import { TextField } from "@mui/material";

type EditableSpanType = {
  valueTitle: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
  className?: string;
};
//Делаем спан инпутом когданужно=========================================================
export const EditableSpan = /*React.*/ memo(({ valueTitle, className, disabled, onChange }: EditableSpanType) => {
  //==Делаем управление не из вне, а state управление самой компонентой
  //=====CONTROL EDITSPAN TASK=====================================================================
  let [editMode, setEditMode] = useState(false);
  //=====CONTROL VALUE=====================================================================
  let [title, setTitle] = useState(valueTitle); //props.title cо старта будет то значение котрое приходит в пропсах

  const switching = useCallback(() => {
    if (title !== "") {
      setEditMode(!editMode);
    }
    onChange(title);
  }, [onChange, title, editMode]);

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
      color="primary"
      size="small"
      variant="filled"
      disabled={disabled}
      onChange={onChangeHandlerValue}
      onBlur={switching}
      onKeyDown={onKeyDownHandlerValue}
      autoFocus
      sx={{
        input: { maxWidth: "500px", padding: "10px 0 0 0" },
      }}
    />
  ) : (
    <span className={`${s.text} ${className}`} onDoubleClick={switching}>
      {title}
    </span>
  );
});

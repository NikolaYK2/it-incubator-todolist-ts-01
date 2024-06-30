import s from "common/components/editableSpan/EditableSpan.module.css";
import React, { ChangeEvent, KeyboardEvent, memo, useCallback, useState } from "react";
import { TextField } from "@mui/material";
import { IconSvg } from "../iconSvg/IconSvg";
import { TaskStatuses } from "../../api/todolistsApi";

type EditableSpanType = {
  valueTitle: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
  className?: string;
  status?: number;
};
//Делаем спан инпутом когданужно=========================================================
export const EditableSpan = /*React.*/ memo(
  ({ valueTitle, className, disabled, onChange, status }: EditableSpanType) => {
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
          input: { maxWidth: "500px", padding: "10px 0" },
        }}
      />
    ) : (
      <span
        className={`${s.text} ${className} ${status === TaskStatuses.Completed ? s.isActiveText : ""}`}
        onDoubleClick={switching}
      >
        {title}
        <div className={s.icon}>
          <IconSvg iconName={"editable"} />
        </div>
      </span>
    );
  }
);

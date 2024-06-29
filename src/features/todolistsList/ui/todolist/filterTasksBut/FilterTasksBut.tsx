import React, { useCallback } from "react";
import { Button } from "common/components";
import { FilterValueType, todoActions, TodoAppType } from "features/todolistsList/model/todos/todoListsReducer";
import { useActions } from "common/hooks/useActions";
import s from "./FilterTasksBut.module.css";
import { IconSvgType } from "../../../../../common/components/iconSvg/IconSvg";

type BtnType = IconSvgType & {
  buttonName: FilterValueType;
  className: string;
};
const buttons: BtnType[] = [
  { buttonName: "All", iconName: "btnAll", className: s.iconAll },
  { buttonName: "Active", iconName: "btnActive", className: s.iconActive },
  { buttonName: "Completed", iconName: "btnCompleted", className: s.iconCompleted },
];

type Props = {
  todo: TodoAppType;
};
export const FilterTasksBut = ({ todo }: Props) => {
  const { taskFilterTodo } = useActions(todoActions);
  const changeTasksFilterHandler = useCallback(
    (filter: FilterValueType) => {
      taskFilterTodo({ todoListsID: todo.id, filter });
    },
    [taskFilterTodo, todo.id]
  );

  //=================Focus button filter===================================
  const buttonStyle = (stateName: FilterValueType, className: string) => {
    return todo.filter === stateName ? className : s.default;
  };

  return (
    <div className={s.container}>
      {buttons.map((btn) => (
        <Button
          name={btn.buttonName}
          callBack={() => changeTasksFilterHandler(btn.buttonName)}
          style={buttonStyle(btn.buttonName, btn.className)}
          iconBtn={{ iconName: btn.iconName }}
        />
      ))}
    </div>
  );
};

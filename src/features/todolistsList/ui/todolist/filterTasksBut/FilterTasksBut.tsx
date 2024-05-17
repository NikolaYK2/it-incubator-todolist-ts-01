import React, { useCallback } from "react";
import { Button } from "common/components";
import { FilterValueType, todoActions, TodoAppType } from "features/todolistsList/model/todos/todoListsReducer";
import { useActions } from "common/hooks/useActions";
import s from './FilterTasksBut.module.css'

type Props = {
  todo: TodoAppType;
};
export const FilterTasksBut = (props: Props) => {

  const { taskFilterTodo } = useActions(todoActions);

  const changeTasksFilterHandler = useCallback(
    (filter: FilterValueType) => {
      taskFilterTodo({ todoListsID: props.todo.id, filter });
    },
    [taskFilterTodo, props.todo.id]
  );

  //=================Focus button filter===================================
  const buttonStyle = (stateName: FilterValueType) => {
    return props.todo.filter === stateName ? s.active : s.default;
  };

  return (
    <div className={s.container}>
      <Button
        name="All"
        callBack={useCallback(() => changeTasksFilterHandler("All"), [changeTasksFilterHandler])}
        style={buttonStyle("All")}
      />
      <Button
        name="Active"
        callBack={useCallback(() => changeTasksFilterHandler("Active"), [changeTasksFilterHandler])}
        style={buttonStyle("Active")}
      />
      <Button
        name="Completed"
        callBack={useCallback(() => changeTasksFilterHandler("Completed"), [changeTasksFilterHandler])}
        style={buttonStyle("Completed")}
      />
    </div>
  );
};

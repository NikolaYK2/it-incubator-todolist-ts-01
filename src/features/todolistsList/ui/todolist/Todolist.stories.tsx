import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Grid from "@mui/material/Grid";
import { Todolist } from "./Todolist";
import { TodoAppType } from "../../model/todos/todoListsReducer";

const meta: Meta = {
  title: "Component/Todolist",
  component: Todolist,
};

export default meta;

type Story = StoryObj;

const todolist: TodoAppType[] = [
  {
    title: "story-book",
    id: "1",
    addedDate: "1",
    entityStatus: "idle",
    filter: "All",
    order: 1,
  },
];

export const TodolistAll: Story = {
  render: () => {
    return (
      <Grid container spacing={4}>
        <Todolist todolist={todolist[0]} />
      </Grid>
    );
  },
};

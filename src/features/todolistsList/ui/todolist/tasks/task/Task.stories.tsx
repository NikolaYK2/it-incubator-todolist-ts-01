import type { Meta, StoryObj } from "@storybook/react";
import { Task } from "./Task";
import { TaskStatuses } from "../../../../../../common/api/todolistsApi";

const meta: Meta = {
  title: "Component/TaskFull",
  component: Task,
};

export default meta;

type Story = StoryObj;

const taskActive = {
  title: "Storybook Active",
  status: TaskStatuses.New,
};

export const TaskActive: Story = {
  args: {
    task: taskActive,
  },
};

const taskComplete = {
  title: "Storybook Complete",
  status: TaskStatuses.Completed,
};
export const TaskComplete: Story = {
  args: {
    task: taskComplete,
  },
};

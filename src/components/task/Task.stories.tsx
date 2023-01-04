import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {decorators} from "../../stories/decorator";

export default {
    title: 'Components/Task',
    component: Task,
    decorators: decorators,
} as ComponentMeta<typeof Task>;

const changeStatusHandler = action('change status')
const onClickHandlerDeleteTask = action('delete task')
const onChangeHandlerTitle = action('change title')

const Template: ComponentStory<typeof Task> = (args) => {

    return (
            <Task  {...args}/>
    );
}

export const TaskExamplete1 = Template.bind({});

TaskExamplete1.args = {
    task: {id: '2', isDone: true, title: 'JS'},
    idTodolist: '1',
};

export const TaskExamplete2 = Template.bind({});
TaskExamplete2.args = {
    task: {id: '2', isDone: false, title: 'JS'},
    idTodolist: '2',
};



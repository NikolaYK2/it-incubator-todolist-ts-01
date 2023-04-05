import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import AppRedux from "./AppRedux";
import {decorators} from "../stories/decorators/decorator";

export default {
    title: 'Components/AppRedux',
    component: AppRedux,
    decorators: decorators,
} as ComponentMeta<typeof AppRedux>;

// const onChangeValue = action('change value')

const Template: ComponentStory<typeof AppRedux> = () => {
    return (
        <AppRedux/>
    )
}

export const AppReduxExample = Template.bind({});
AppReduxExample.args = {};




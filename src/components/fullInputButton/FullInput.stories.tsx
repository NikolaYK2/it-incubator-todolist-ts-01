import {ComponentMeta, ComponentStory} from "@storybook/react";
import {FullInput} from "./FullInput";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Components/FullInput',
    component: FullInput,
} as ComponentMeta<typeof FullInput>;

const callback = action('Button add');

const Template: ComponentStory<typeof FullInput> = (args) => <FullInput {...args} />;
export const FullInputExample = Template.bind({});
FullInputExample.args = {
    addItem:callback,
};

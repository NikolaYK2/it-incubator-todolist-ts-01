import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";

export default {
  title: "Components/EditableSpan",
  component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const onChangeValue = action("change value");

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  title: "Text",
  onChange: onChangeValue,
};
EditableSpanExample.parameters = {
  backgrounds: {
    values: [{ title: "red", value: "#5e2020" }],
  },
};

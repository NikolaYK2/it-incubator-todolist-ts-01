import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import AppRedux from "./AppRedux";
import { decorators } from "stories/decorators/decorator";
import { HashRouter } from "react-router-dom";

export default {
  title: "Components/AppRedux",
  component: AppRedux,
  decorators: decorators,
} as ComponentMeta<typeof AppRedux>;

// const onChangeValue = action('change value')

const Template: ComponentStory<typeof AppRedux> = () => {
  return (
    <HashRouter>
      <AppRedux demo={true} />
    </HashRouter>
  );
};

export const AppReduxExample = Template.bind({});
AppReduxExample.args = {};

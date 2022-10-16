import { ComponentStory, ComponentMeta } from "@storybook/react";

import Topbar from "./Topbar";

export default {
  title: "Components/Topbar",
  component: Topbar,
} as ComponentMeta<typeof Topbar>;

const Template: ComponentStory<typeof Topbar> = (args) => {
  return <Topbar {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};

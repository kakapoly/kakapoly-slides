import { ComponentStory, ComponentMeta } from "@storybook/react";

import Sidebar from "./Sidebar";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => {
  return <Sidebar {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};

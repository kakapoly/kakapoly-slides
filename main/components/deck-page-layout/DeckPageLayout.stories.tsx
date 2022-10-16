import { ComponentStory, ComponentMeta } from "@storybook/react";

import DeckPageLayout from "./DeckPageLayout";

export default {
  title: "Components/DeckPageLayout",
  component: DeckPageLayout,
} as ComponentMeta<typeof DeckPageLayout>;

const Template: ComponentStory<typeof DeckPageLayout> = (args) => {
  return <DeckPageLayout {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

import DeckPageTitlePopover from "./DeckPageTitlePopover";

export default {
  title: "Components/DeckPageTitlePopover",
  component: DeckPageTitlePopover,
} as ComponentMeta<typeof DeckPageTitlePopover>;

const Template: ComponentStory<typeof DeckPageTitlePopover> = (args) => {
  const [title, setTitle] = useState("Untitled");
  return (
    <DeckPageTitlePopover
      {...args}
      title={title}
      onChange={(value) => {
        setTitle(value);
      }}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {};

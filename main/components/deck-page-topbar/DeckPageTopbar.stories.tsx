import { ComponentStory, ComponentMeta } from "@storybook/react";
import { noop } from "lodash-es";
import DeckPageTitlePopover from "../deck-page-title-popover/DeckPageTitlePopover";

import DeckPageTopbar from "./DeckPageTopbar";

export default {
  title: "Components/DeckPageTopbar",
  component: DeckPageTopbar,
} as ComponentMeta<typeof DeckPageTopbar>;

const Template: ComponentStory<typeof DeckPageTopbar> = (args) => {
  return <DeckPageTopbar {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  title: <DeckPageTitlePopover title={"Untitled"} onChange={noop} />,
};

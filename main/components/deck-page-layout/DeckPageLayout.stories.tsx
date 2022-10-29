import { ComponentStory, ComponentMeta } from "@storybook/react";
import { noop } from "lodash-es";
import DeckPageTitlePopover from "../deck-page-title-popover/DeckPageTitlePopover";
import Topbar from "../deck-page-topbar/DeckPageTopbar";

import DeckPageLayout from "./DeckPageLayout";

export default {
  title: "Components/DeckPageLayout",
  component: DeckPageLayout,
} as ComponentMeta<typeof DeckPageLayout>;

const Template: ComponentStory<typeof DeckPageLayout> = (args) => {
  return <DeckPageLayout {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  topbar: (
    <Topbar
      sidebarOpened={false}
      title={<DeckPageTitlePopover title={"Untitled"} onChange={noop} />}
    />
  ),
};

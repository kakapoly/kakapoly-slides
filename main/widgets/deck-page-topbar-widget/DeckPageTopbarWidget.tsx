import DeckPageTopbar from "@/components/deck-page-topbar/DeckPageTopbar";
import { useGeneralStore } from "@/stores/general";
import DeckPageTitlePopoverWidget from "../deck-page-title-popover-widget/DeckPageTitlePopoverWidget";

interface DeckPageTopbarWidgetProps {}

const DeckPageTopbarWidget: React.FC<DeckPageTopbarWidgetProps> = () => {
  const sidebarOpened = useGeneralStore((state) => state.sidebarOpened);

  const toggleSidebarOpened = useGeneralStore(
    (state) => state.toggleSidebarOpened
  );

  const handleSidebarOpenerButtonClick = () => {
    toggleSidebarOpened();
  };

  return (
    <DeckPageTopbar
      sidebarOpened={sidebarOpened}
      onSidebarOpenerButtonClick={handleSidebarOpenerButtonClick}
      title={<DeckPageTitlePopoverWidget />}
    />
  );
};

export default DeckPageTopbarWidget;

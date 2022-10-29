import DeckPageLayout from "../../components/deck-page-layout/DeckPageLayout";
import { useGeneralStore } from "../../stores/general";
import DeckPageTopbarWidget from "../deck-page-topbar-widget/DeckPageTopbarWidget";

interface DeckPageLayoutWidgetProps {}

const DeckPageLayoutWidget: React.FC<DeckPageLayoutWidgetProps> = () => {
  const sidebarOpened = useGeneralStore((state) => state.sidebarOpened);

  return (
    <DeckPageLayout
      sidebarOpened={sidebarOpened}
      topbar={<DeckPageTopbarWidget />}
    />
  );
};

export default DeckPageLayoutWidget;

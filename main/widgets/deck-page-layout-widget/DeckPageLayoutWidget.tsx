import DeckPageLayout from "../../components/deck-page-layout/DeckPageLayout";
import { useGeneralStore } from "../../stores/general";

interface DeckPageLayoutWidgetProps {}

const DeckPageLayoutWidget: React.FC<DeckPageLayoutWidgetProps> = () => {
  const sidebarOpened = useGeneralStore((state) => state.sidebarOpened);

  return <DeckPageLayout sidebarOpened={sidebarOpened} />;
};

export default DeckPageLayoutWidget;

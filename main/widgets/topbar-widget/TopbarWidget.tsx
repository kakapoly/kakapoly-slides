import Topbar from "../../components/topbar/Topbar";
import { useGeneralStore } from "../../stores/general";

interface TopbarWidgetProps {}

const TopbarWidget: React.FC<TopbarWidgetProps> = () => {
  const sidebarOpened = useGeneralStore((state) => state.sidebarOpened);

  const toggleSidebarOpened = useGeneralStore(
    (state) => state.toggleSidebarOpened
  );

  const handleSidebarOpenerButtonClick = () => {
    toggleSidebarOpened();
  };

  return (
    <Topbar
      sidebarOpened={sidebarOpened}
      onSidebarOpenerButtonClick={handleSidebarOpenerButtonClick}
    />
  );
};

export default TopbarWidget;

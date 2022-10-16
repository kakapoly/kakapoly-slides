import {
  Box,
  Button,
  Flex,
  IconButton,
  Spacer,
  Text,
  theme,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { SIDEBAR_WIDTH } from "../../constants";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <Box
      borderRight={"1px solid"}
      borderColor={"gray.200"}
      backgroundColor={"white"}
      width={`${SIDEBAR_WIDTH}px`}
      height={"100vh"}
      padding={"8px 4px"}
    >
      <Link href="/decks">
        <Button variant={"ghost"} width={"100%"} justifyContent={"flex-start"}>
          <FontAwesomeIcon
            icon={faTableCellsLarge}
            color={theme.colors.gray[600]}
          />
          <Text
            size={"sm"}
            fontWeight="medium"
            color={"gray.600"}
            marginLeft={"12px"}
          >
            Back to decks
          </Text>
        </Button>
      </Link>
    </Box>
  );
};

export default Sidebar;

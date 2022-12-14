import {
  Box,
  Grid,
  GridItem,
  Button,
  Stack,
  IconButton,
  theme,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEllipsis,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface DeckPageTopbarProps {
  sidebarOpened: boolean;
  onSidebarOpenerButtonClick?: () => void;
  title: ReactNode;
}

const DeckPageTopbar: React.FC<DeckPageTopbarProps> = ({
  sidebarOpened = true,
  onSidebarOpenerButtonClick,
  title,
}) => {
  return (
    <Box bg="gray.50" w={"100%"} padding={"8px 0"}>
      <Grid templateColumns={"repeat(3, 1fr)"} margin={"0px 8px"}>
        <GridItem justifySelf={"start"}>
          <IconButton
            variant={"ghost"}
            aria-label={""}
            icon={
              <FontAwesomeIcon
                icon={sidebarOpened ? faAnglesLeft : faBars}
                color={theme.colors.gray[600]}
              />
            }
            size="sm"
            onClick={onSidebarOpenerButtonClick}
          />
        </GridItem>
        <GridItem justifySelf={"center"}>{title}</GridItem>
        <GridItem justifySelf={"end"}>
          <Stack spacing={"4px"} direction="row">
            <Button variant={"ghost"} size={"sm"} color={"gray.600"}>
              Present
            </Button>
            <IconButton
              variant={"ghost"}
              aria-label={""}
              icon={
                <FontAwesomeIcon
                  icon={faEllipsis}
                  color={theme.colors.gray[600]}
                />
              }
              size="sm"
            />
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DeckPageTopbar;

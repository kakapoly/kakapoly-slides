import {
  Button,
  Flex,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { noop } from "lodash-es";
import { useEffect, useRef, useState } from "react";
import { KEYS, UNTITLED_TEXT } from "../../constants";
import * as styles from "./DeckPageTitlePopover.styles";

interface DeckPageTitlePopoverProps {
  title: string;
  disabled?: boolean;
  onChange: (title: string) => void;
}

const DeckPageTitlePopover: React.FC<DeckPageTitlePopoverProps> = ({
  title,
  disabled,
  onChange,
}) => {
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();

  const [value, setValue] = useState(title);

  const initialFocusRef = useRef(null);

  useEffect(() => {
    setValue(title);
  }, [isOpen, title]);

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onOpen={disabled ? noop : onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button
          variant={"ghost"}
          size={"sm"}
          color={"gray.600"}
          isActive={isOpen}
          css={disabled && styles.buttonWhenDisabled}
        >
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent width={"100%"}>
        <Flex padding={"8px"} columnGap={"4px"}>
          <Input
            ref={initialFocusRef}
            width={"160"}
            size={"sm"}
            borderRadius={"md"}
            value={value}
            placeholder={UNTITLED_TEXT}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === KEYS.ENTER) {
                onChange(value);
                onClose();
                return;
              }
            }}
          />
          <Button
            variant={"ghost"}
            size="sm"
            onClick={() => {
              onChange(value);
              onClose();
              return;
            }}
          >
            Save
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default DeckPageTitlePopover;

import DeckPageTitlePopover from "@/components/deck-page-title-popover/DeckPageTitlePopover";
import useGetDeckQuery from "@/queries/useGetDeckQuery";
import useUpdateDeckMutation from "@/queries/useUpdateDeckMutation";
import { UNTITLED_TEXT } from "@/constants";
import { first } from "lodash-es";
import { useRouter } from "next/router";

interface DeckPageTitlePopoverWidgetProps {}

const DeckPageTitlePopoverWidget: React.FC<DeckPageTitlePopoverWidgetProps> =
  () => {
    const { query } = useRouter();

    const deckId = query.id as string;

    const {
      data: deck,
      isLoading: isDeckLoading,
      isError: isDeckError,
    } = useGetDeckQuery(deckId);
    const { mutate: updateDeck } = useUpdateDeckMutation(deckId);

    const role = first(deck?.roles);

    const editable =
      isDeckLoading || isDeckError
        ? false
        : role?.type === "owner" || role?.type === "editor";

    const title =
      isDeckLoading || isDeckError ? "" : deck?.title ?? UNTITLED_TEXT;

    const handleTitleChange = (title: string) => {
      updateDeck({
        title,
      });
    };

    return (
      <DeckPageTitlePopover
        title={title}
        disabled={!editable}
        onChange={handleTitleChange}
      />
    );
  };

export default DeckPageTitlePopoverWidget;

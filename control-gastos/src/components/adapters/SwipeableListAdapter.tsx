import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

type SwipeableListAdapterProps = {
  children: React.ReactNode;
  optionsLeading: { label: string; onClick: () => void }[];
  optionsTrailing: {
    label: string;
    onClick: () => void;
    destructive?: boolean;
  }[];
};

export const SwipeableListAdapter = ({
  children,
  optionsLeading,
  optionsTrailing,
}: SwipeableListAdapterProps) => {
  const leadingActions = () => (
    <LeadingActions>
      {optionsLeading.map((option) => (
        <SwipeAction onClick={() => option.onClick()}>
          {option.label}
        </SwipeAction>
      ))}
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      {optionsTrailing.map((option) => (
        <SwipeAction onClick={() => option.onClick()}>
          {option.label}
        </SwipeAction>
      ))}
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        {children}
      </SwipeableListItem>
    </SwipeableList>
  );
};

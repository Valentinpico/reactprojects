import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { CircularProgressbarStyles } from "react-circular-progressbar/dist/types";
import "react-circular-progressbar/dist/styles.css";

type CircularProgressBarAdapterProps = {
  value: number;
  styles: CircularProgressbarStyles;
  text?: string;
};

export const CircularProgressBarAdapter = ({
  value,
  styles,
  text,
}: CircularProgressBarAdapterProps) => {
  return (
    <>
      <CircularProgressbar value={value} styles={styles} text={text} />
    </>
  );
};

import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/src/shared/types.js";

type DateInputAdapterProps = {
  value: Date;
  onChange?: (date: Value) => void;
  className?: string;
  name: string;
};

export const DateInputAdapter = ({
  value,
  onChange,
  name,
  className = "bg-slate-100 p-2 border-0 w-full",
}: DateInputAdapterProps) => {
  return (
    <>
      <DatePicker
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      />
    </>
  );
};

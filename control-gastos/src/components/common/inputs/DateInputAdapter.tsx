import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Value } from "../../../types/types";

type DateInputAdapterProps = {
  value: Value;
  onChange?: (date: Value) => void;
  className?: string;
  label?: string;
  name: string;
};

export const DateInputAdapter = ({
  value,
  onChange,
  name,
  label = "Fecha",
  className = "bg-slate-100 border-0 rounded-md w-full",
}: DateInputAdapterProps) => {
  return (
    <>
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <DatePicker
          name={name}
          value={value}
          onChange={onChange}
          className={className}
        />
      </div>
    </>
  );
};

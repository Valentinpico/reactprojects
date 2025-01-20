import { MouseEventHandler, ReactNode } from "react";

type ButtonFormProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
};

export const ButtonForm = ({
  onClick,
  children,
  className,
}: ButtonFormProps) => {
  return (
    <button
      className={`py-2 px-4 rounded-md ${
        className || " font-bold bg-blue-500 text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

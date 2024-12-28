import { MouseEventHandler, ReactNode } from "react";

export const ButtonForm = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={`py-2 px-4 rounded-md ${
        className || " font-bold bg-blue-500 text-white"
      }`}
      value="Guardar Paciente"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

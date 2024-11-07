"use client";

import React, { ChangeEvent, MouseEvent } from "react";

type InputProps = {
  id: string;
  placeholder?: string;
  type?: string;
  label?: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  validate?: boolean;
};

export const Input = ({
  id,
  placeholder = "",
  type,
  label,
  className,
  onClick,
  onChange,
  value,
  validate,
}: InputProps) => {
  const style = className
    ? className
    : "border rounded-md border-slate-300 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400 w-full ";

  if (label === undefined) {
    return (
      <input
        className={style}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        disabled={validate}
        onClick={(e) => onClick && onClick(e)}
        onChange={(e) => onChange && onChange(e)}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      <label htmlFor={id}>{label}:</label>
      <input
        className={style}
        type={type ? type : "text"}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e)}
      />
    </div>
  );
};

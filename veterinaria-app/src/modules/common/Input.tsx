"use client"; // next.js

import { ChangeEvent, useEffect, useState } from "react";

interface InputProps {
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChangeAction: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void; // Action si es en next.js
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  validateAction?: (value: string) => boolean; // Action si es en next.js
  errorMessage?: string;
  showError?: boolean;
}

export const InputForm = ({
  label,
  type = "text",
  name,
  value,
  onChangeAction,
  placeholder = "",
  required = false,
  pattern,
  minLength,
  maxLength,
  validateAction = () => true,
  errorMessage = "El valor ingresado no es válido.",
  showError = false,
}: InputProps) => {
  const [error, setError] = useState("");

  const validateInput = (value: string): boolean => {
    let validationError = "";

    if (required && !value) {
      validationError = "Este campo es obligatorio.";
    }
    if (pattern && !new RegExp(pattern).test(value)) {
      validationError = "El formato no es válido.";
    }
    if (minLength && value.length < minLength) {
      validationError = `Debe tener al menos ${minLength} caracteres.`;
    }
    if (maxLength && value.length > maxLength) {
      validationError = `Debe tener menos de ${maxLength} caracteres.`;
    }
    if (!validateAction(value)) {
      validationError = errorMessage;
    }

    setError(validationError);
    return validationError === "";
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    onChangeAction(e);
    validateInput(value);
  };

  useEffect(() => {
    if (showError) validateInput(value);
  }, [showError]);
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          //onBlur={handleBlur}
          placeholder={placeholder}
          className={`mt-1 block w-full px-3 py-2 border ${
            error
              ? "border-red-500  focus:border-red-600 focus:ring-1 focus:ring-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none  focus:border-sky-500`}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          //onBlur={handleBlur}
          placeholder={placeholder}
          className={`mt-1 block w-full px-3 py-2 border ${
            error
              ? "border-red-500  focus:border-red-600 focus:ring-1 focus:ring-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none  focus:border-sky-500`}
          required={required}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

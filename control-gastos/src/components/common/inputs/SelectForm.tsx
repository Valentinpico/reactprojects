import React, { useState, useEffect, ChangeEvent } from "react";
import { SelectOptionType } from "../../../types/types";

interface SelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOptionType[];
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  showError?: boolean;
}

export const SelectForm = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Seleccione una opción",
  required = false,
  errorMessage = "Por favor, selecciona una opción válida.",
  showError = false,
}: SelectProps) => {
  const [error, setError] = useState("");

  // Validar cuando el formulario se envía o el valor cambia
  useEffect(() => {
    if (showError) validateInput(value);
  }, [showError, value]);

  const validateInput = (value: string): boolean => {
    let validationError = "";

    if (required && !value) {
      validationError = errorMessage;
    }

    setError(validationError);
    return validationError === "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    onChange(e);
    validateInput(value); // Validar mientras se selecciona
  };

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
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className={`mt-1 block w-full px-3 py-2 border ${
          error
            ? "border-red-500  focus:border-red-600 focus:ring-1 focus:ring-red-500"
            : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none  focus:border-sky-500`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

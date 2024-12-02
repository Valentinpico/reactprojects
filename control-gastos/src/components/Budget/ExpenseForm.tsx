import { ChangeEvent, useState } from "react";
import { categories } from "../../data/categories";
import { DraftExpenseType, ToastType } from "../../types/types";
import { InputForm } from "../common/inputs/InputForm";
import { useBudget } from "../../hooks/useBudget";
import { SelectForm } from "../common/inputs/SelectForm";
import { Toast } from "../common/toasts/Toast";
import { DateInputAdapter } from "../common/inputs/DateInputAdapter";

export const ExpenseForm = () => {
  const [showError, setShowError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<ToastType>("info");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [expense, setExpense] = useState<DraftExpenseType>({
    name: "",
    amount: 0,
    category: "",
    date: new Date(),
  });

  const { dispatch } = useBudget();

  const allInputsValids = () => {
    const { name, amount, category } = expense;

    return !(name.length === 0 || Number(amount) <= 0 || category.length === 0);
  };
  const handleSubmit = () => {
    const validInputs = allInputsValids();
    if (!validInputs) {
      setShowError(true);
      setToastType("error");
      setToastMessage("Por favor, llena todos los campos.");
      setShowToast(true);
      return;
    }
    setToastMessage("Gasto agregado correctamente");
    setToastType("success");
    setShowToast(true);

    dispatch({ type: "show-modal", payload: { show: false } });
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    
    const { value, name } = e.target;

    if (name === "amount" && Number(value) < 0) return;

    setShowToast(false);
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleDateChange = (date: DraftExpenseType["date"]) => {
    setExpense({
      ...expense,
      date,
    });
  };

  return (
    <>
      <h1 className="uppercase font-black text-2xl text-center border-b-2 border-blue-500">
        Nuevo gasto
      </h1>

      <div className="mt-5 space-y-5">
        <InputForm
          required
          label="Nombre del gasto"
          type="text"
          name="name"
          placeholder="Ej. Comida"
          value={expense.name}
          onChange={handleChange}
          validate={(value) => value.length > 0}
          errorMessage="El nombre del gasto debe llenarse"
          showError={showError}
        />
        <InputForm
          required
          label="Monto"
          name="amount"
          type="number"
          errorMessage="El monto debe ser mayor a 0"
          placeholder="Ej. 100"
          value={expense.amount.toString()}
          onChange={handleChange}
          validate={(value) => Number(value) > 0}
          showError={showError}
        />
        <SelectForm
          label="Categoría"
          options={categories.map((category) => ({
            value: category.id.toString(),
            label: category.name,
          }))}
          value={expense.category}
          name="category"
          onChange={handleChange}
          showError={showError}
          required
          errorMessage="Por favor, selecciona una categoría"
        />

        <DateInputAdapter
          name="date"
          label="Fecha"
          value={expense.date}
          onChange={handleDateChange}
        />

        {showToast && (
          <Toast
            message={toastMessage}
            onClose={() => setShowToast(false)}
            type={toastType}
          ></Toast>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleSubmit}
        >
          Agregar gasto
        </button>
      </div>
    </>
  );
};
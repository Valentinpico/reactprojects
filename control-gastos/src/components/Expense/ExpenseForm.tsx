import { ChangeEvent, useEffect, useState } from "react";
import { categories } from "../../data/categories";
import { DraftExpenseType, ToastType } from "../../types/types";
import { InputForm } from "../common/inputs/InputForm";
import { useBudget } from "../../hooks/useBudget";
import { SelectForm } from "../common/inputs/SelectForm";
import { Toast } from "../common/toasts/Toast";
import { DateInputAdapter } from "../adapters/DateInputAdapter";

export const ExpenseForm = () => {
  const [showError, setShowError] = useState(false);
  const [toast, setToast] = useState<ToastType>({
    isVisible: false,
    message: "",
    type: "info",
    onClose: () => {},
  });

  const [expense, setExpense] = useState<DraftExpenseType>({
    name: "",
    amount: 0,
    category: "",
    date: new Date(),
  });

  const [expeseAmountCopy, setExpenseAmountCopy] = useState(0);

  const { dispatch, state, previusAmount } = useBudget();

  const allInputsValids = () => {
    const { name, amount, category } = expense;

    return !(name.length === 0 || Number(amount) <= 0 || category.length === 0);
  };

  const handleSubmit = () => {
    if (!allInputsValids()) {
      setShowError(true);

      setToast({
        isVisible: true,
        message: "Por favor, llena todos los campos",
        type: "error",
        onClose: () => {},
      });

      return;
    }

    if (previusAmount + expeseAmountCopy < expense.amount) {
      setToast({
        isVisible: true,
        message: "No puedes exceder el presupuesto",
        type: "error",
        onClose: () => {},
      });

      return;
    }

    if (state.idExpenseUpdate) {
      dispatch({
        type: "update-expense",
        payload: {
          expense: {
            ...expense,
            id: state.idExpenseUpdate,
          },
        },
      });

      return;
    }
    dispatch({ type: "add-expense", payload: { expense } });

    setExpense({
      name: "",
      amount: 0,
      category: "",
      date: new Date(),
    });
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;

    const isAmount = name === "amount";

    if (isAmount && Number(value) < 0) return;

    setExpense({
      ...expense,
      [name]: isAmount ? +value : value,
    });
  };

  const handleDateChange = (date: DraftExpenseType["date"]) => {
    setExpense({
      ...expense,
      date,
    });
  };

  const getExpenseToUpdate = () => {
    if (!state.idExpenseUpdate) return;
    const expenseToUpdate = state.expenses.find(
      (expense) => expense.id === state.idExpenseUpdate
    );
    if (!expenseToUpdate) return;
    setExpense(expenseToUpdate);
    setExpenseAmountCopy(expenseToUpdate.amount);
  };

  useEffect(() => {
    getExpenseToUpdate();
  }, [state.idExpenseUpdate]);

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

        <Toast
          isVisible={toast.isVisible}
          message={toast.message}
          onClose={() =>
            setToast({
              ...toast,
              isVisible: false,
            })
          }
          type={toast.type}
        ></Toast>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleSubmit}
        >
          {!state.idExpenseUpdate ? "Agregar gasto" : "Actualizar gasto"}
        </button>
      </div>
    </>
  );
};

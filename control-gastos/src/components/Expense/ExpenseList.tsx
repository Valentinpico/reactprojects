import { useState } from "react";
import { categories } from "../../data/categories";
import { useBudget } from "../../hooks/useBudget";
import { SelectOptionType } from "../../types/types";
import { SelectForm } from "../common/inputs/SelectForm";
import { ExpenseCard } from "./ExpenseCard";

export const ExpenseList = () => {
  const [filter, setFilter] = useState("");

  const { state } = useBudget();

  const expenses = filter
    ? state.expenses.filter((expense) => expense.category === filter)
    : state.expenses;

  const getOptions = () => {
    const options: SelectOptionType[] = categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
    return options;
  };

  return (
    <>
      <SelectForm
        name="filter"
        placeholder="Seleccione una categoría"
        label="Filtrar por:"
        options={getOptions()}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {expenses.length > 0 ? (
        <>
          <h2 className="text-xl font-bold text-slate-500 text-left uppercase">
            Lista de gastos
          </h2>

          <ul className="mt-5">
            {expenses.map((expense) => (
              <div className="grid gap-1" key={expense.id}>
                <ExpenseCard expense={expense} />
              </div>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center mt-5">No hay gastos registrados</p>
      )}
    </>
  );
};

import { useState, ChangeEvent, MouseEvent } from "react";

import { useBudget } from "../../hooks/useBudget";
import { InputForm } from "../common/inputs/InputForm";

export const BudgetForm = () => {
  const [budget, setBudget] = useState<number>(0);
  const [budgetValid, setBudgetValid] = useState<boolean>(true);

  const { dispatch, state } = useBudget();

  const handleChangueBudget = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value < 0) return;

    setBudget(value);
    setBudgetValid(value > 0 && !isNaN(value));
  };

  const hanndleSubmitBudget = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setBudgetValid(budget > 0 && !isNaN(budget));
    if (budget < 0) return;
    dispatch({ type: "add-budget", payload: { budget } });
  };

  return (
    <>
      <form className="space-y-5 text-center">
        <div className="flex flex-col space-y-5">
          <label htmlFor="budget" className="text-4xl font-bold text-blue-600 ">
            Definir presupuesto
          </label>

          <div className="text-left">
            <InputForm
              name="budget"
              type="number"
              label="Presupuesto"
              placeholder="Ejemplo: 300"
              required
              errorMessage="El presupuesto debe ser mayor a 0"
              showError={!budgetValid}
              validate={(value) => Number(value) > 0}
              value={budget.toString()}
              onChange={handleChangueBudget}
            />
          </div>
        </div>

        <button
          type="submit"
          onClick={hanndleSubmitBudget}
          disabled={!budgetValid}
          className="w-full text-white uppercase font-black p-2 bg-blue-600 hover:bg-blue-700 transition rounded-sm disabled:opacity-50"
        >
          Definir presupuesto
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-bold text-blue-600 mt-10">
          Presupuesto actual: ${state.budget}
        </h2>

        <button
          onClick={() => dispatch({ type: "reset-budget" })}
          className="text-white uppercase font-black p-2 bg-red-600 hover:bg-red-700 transition rounded-sm mt-5"
        >
          Resetear presupuesto
        </button>
      </div>
    </>
  );
};

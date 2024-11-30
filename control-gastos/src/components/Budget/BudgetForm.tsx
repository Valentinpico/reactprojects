import { useState, ChangeEvent, MouseEvent } from "react";

import { useBudget } from "../../hooks/useBudget";

export const BudgetForm = () => {
  const [budget, setBudget] = useState<number>(0);
  const [budgetValid, setBudgetValid] = useState<boolean>(true);

  const { dispatch, state } = useBudget();

  const handleChangueBudget = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setBudgetValid(value > 0 && !isNaN(value));
    setBudget(value);
  };

  const hanndleSubmitBudget = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBudgetValid(budget > 0 && !isNaN(budget));
    if (budget <= 0 || isNaN(budget)) return;
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
            <input
              type="number"
              id="budget"
              name="budget"
              placeholder="Ejemplo: 300"
              value={budget}
              onChange={handleChangueBudget}
              className={`w-full border bg-white border-gray-200 rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 transition ${
                !budgetValid
                  ? "focus:ring-1 focus:ring-red-600 border-red-400"
                  : ""
              } `}
            />
            {!budgetValid && (
              <span className=" text-red-600">
                Presupuesto debe ser mayor a 0!
              </span>
            )}
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

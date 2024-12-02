import { useMemo } from "react";
import { useBudget } from "../../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";

export const BudgetTracker = () => {
  const { state } = useBudget();

  const budget = useMemo(() => state.budget, [state.budget]);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((acc, expense) => acc + expense.amount, 0),
    [state.expenses]
  );

  const total = useMemo(() => {
    return budget - totalExpenses;
  }, [state.expenses]);

  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        <section className="flex justify-center">
          <img src="/image.png" alt="Grafico de gastos" />
        </section>

        <section className="flex flex-col justify-center items-center gap-8">
          <button className=" bg-pink-600 text-white rounded-md w-full  p-2 font-bold uppercase ">
            Resetear
          </button>

          <AmountDisplay label={"Presupuesto"} amount={budget} />
          <AmountDisplay label={"Gastos"} amount={totalExpenses} />
          <AmountDisplay label={"Total"} amount={total} />
        </section>
      </div>
    </>
  );
};

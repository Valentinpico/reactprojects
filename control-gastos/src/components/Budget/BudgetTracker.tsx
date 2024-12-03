import { useBudget } from "../../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";

export const BudgetTracker = () => {
  const { state, totalExpenses, previusAmount, dispatch } = useBudget();

  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        <section className="flex justify-center">
          <img src="/image.png" alt="Grafico de gastos" />
        </section>

        <section className="flex flex-col justify-center items-center gap-8">
          <button
            className=" bg-pink-600 text-white rounded-md w-full  p-2 font-bold uppercase 
          "
            onClick={() => {
              dispatch({ type: "reset-app" });
            }}
          >
            Resetear
          </button>

          <AmountDisplay label={"Presupuesto"} amount={state.budget} />
          <AmountDisplay label={"Gastos"} amount={totalExpenses} />
          <AmountDisplay label={"Total"} amount={previusAmount} />
        </section>
      </div>
    </>
  );
};

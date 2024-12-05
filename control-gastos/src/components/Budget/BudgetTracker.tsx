import { buildStyles } from "react-circular-progressbar";
import { useBudget } from "../../hooks/useBudget";
import { CircularProgressBarAdapter } from "../adapters/CircularProgressBarAdapter";
import { AmountDisplay } from "./AmountDisplay";

export const BudgetTracker = () => {
  const { state, totalExpenses, previusAmount, dispatch } = useBudget();

  const gastado = +((totalExpenses / state.budget) * 100).toFixed(2);

  //rojo si se ha gastado mas del 90% del presupuesto y azul si no
  const colorStateBudget = gastado > 90 ? "#ff0000" : "#0077cc";

  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        <section className="flex justify-center">
          <CircularProgressBarAdapter
            value={gastado}
            text={gastado + "% gastado"}
            styles={buildStyles({
              textColor: colorStateBudget,
              pathColor: colorStateBudget,
              trailColor: "#d6d6d6",
              textSize: "10px",
            })}
          />
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

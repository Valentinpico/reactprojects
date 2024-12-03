import { useBudget } from "../../hooks/useBudget";
import { ExpenseCard } from "./ExpenseCard";

export const ExpenseList = () => {
  const { state } = useBudget();
  return (
    <>
      {state.expenses.length > 0 ? (
        <>
          <h2 className="text-xl font-bold text-slate-500 text-left uppercase">
            Lista de gastos
          </h2>
          <ul className="mt-5">
            {state.expenses.map((expense) => (
              <div className="grid gap-1 ">
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

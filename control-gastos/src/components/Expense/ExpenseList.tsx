import { useBudget } from "../../hooks/useBudget";

export const ExpenseList = () => {
  const { state } = useBudget();
  return (
    <>
      {state.expenses.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center">Lista de gastos</h2>
          <ul className="mt-5">
            {state.expenses.map((expense) => (
              <li
                key={expense.id}
                className="flex justify-between items-center bg-white shadow-lg rounded-lg p-5 mt-2"
              >
                <div>
                  <h3 className="font-bold">{expense.name}</h3>
                  <p className="text-gray-500">${expense.amount}</p>
                </div>
                <div>
                  <p>{expense.category}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center mt-5">No hay gastos registrados</p>
      )}
    </>
  );
};

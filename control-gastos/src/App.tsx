import { ModalDefault } from "./components/common/Modal/ModalDefault";
import { BudgetForm } from "./components/Budget/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import { useEffect, useMemo } from "react";
import { BudgetTracker } from "./components/Budget/BudgetTracker";
import { ExpenseForm } from "./components/Expense/ExpenseForm";
import { ExpenseList } from "./components/Expense/ExpenseList";
import { Toast } from "./components/common/toasts/Toast";

function App() {
  const { state, dispatch } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
    localStorage.setItem("budget", JSON.stringify(state.budget));
  }, [state.expenses, state.budget]);

  return (
    <>
      <header className=" bg-blue-700 uppercase text-white text-4xl text-center font-bold py-5">
        planificador de gastos
      </header>

      <div className="max-w-3xl m-auto shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {isValidBudget && (
        <div className="py-6 space-y-5 mx-auto max-w-3xl">
          <Toast
            isVisible={state.toast.isVisible}
            type={state.toast.type}
            message={state.toast.message}
            onClose={() =>
              dispatch({
                type: "toast-config",
                payload: { toast: { ...state.toast, isVisible: false } },
              })
            }
            duration={3000}
          />

          <ExpenseList />

          <ModalDefault>
            <ExpenseForm />
          </ModalDefault>
        </div>
      )}

      <footer className="text-center text-gray-500 text-sm mt-5">
        &copy; 2021 Planificador de gastos
      </footer>
    </>
  );
}

export default App;

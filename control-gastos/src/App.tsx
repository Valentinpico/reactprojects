import { ModalDefault } from "./components/common/Modal/ModalDefault";
import { BudgetForm } from "./components/Budget/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import { useMemo } from "react";
import { BudgetTracker } from "./components/Budget/BudgetTracker";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  return (
    <>
      <header className=" bg-blue-700 uppercase text-white text-4xl text-center font-bold py-5">
        planificador de gastos
      </header>

      <div className="max-w-3xl m-auto shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      <ModalDefault />

      <footer className="text-center text-gray-500 text-sm mt-5">
        &copy; 2021 Planificador de gastos
      </footer>
    </>
  );
}

export default App;

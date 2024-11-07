import { useState } from "react";
import { BudgetForm } from "./components/BudgetForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header className=" bg-blue-700 uppercase text-white text-4xl text-center font-bold py-5">
        planificador de gastos
      </header>

      <div className="max-w-3xl m-auto shadow-lg rounded-lg mt-10 p-10">
        <BudgetForm />
      </div>
    </>
  );
}

export default App;

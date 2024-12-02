export const ExpenseCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      <div className="bg-white shadow-md rounded-md p-5">
        <h2 className="text-center uppercase font-bold text-xl">
          Gastos de la semana
        </h2>
        <ul className="mt-5 space-y-3">
          <li className="flex justify-between">
            <span>Comida</span>
            <span>$100</span>
          </li>
          <li className="flex justify-between">
            <span>Transporte</span>
            <span>$100</span>
          </li>
          <li className="flex justify-between">
            <span>Comida</span>
            <span>$100</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

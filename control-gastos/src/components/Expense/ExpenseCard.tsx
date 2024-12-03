import { categories } from "../../data/categories";
import { useBudget } from "../../hooks/useBudget";
import { ExpenseType } from "../../types/types";
import { formatDate } from "../../utils/formatCurrency";
import { SwipeableListAdapter } from "../adapters/SwipeableListAdapter";
import { AmountDisplay } from "../Budget/AmountDisplay";

interface ExpenseCardProps {
  expense: ExpenseType;
}

export const ExpenseCard = ({ expense }: ExpenseCardProps) => {
  const categoryInfo = categories.find(
    (category) => category.id === expense.category
  );

  const { dispatch } = useBudget();

  const optionsLeading = [
    {
      label: "Editar",
      onClick: () => {
        dispatch({ type: "put-id-expense", payload: { id: expense.id } });
      },
    },
  ];

  const optionsTrailing = [
    {
      label: "Eliminar",
      onClick: () =>
        dispatch({ type: "delete-expense", payload: { id: expense.id } }),
      destructive: true,
    },
  ];

  return (
    <>
      <SwipeableListAdapter
        optionsLeading={optionsLeading}
        optionsTrailing={optionsTrailing}
      >
        <div className="bg-white rounded-md p-10 flex w-full items-center justify-between gap-5">
          <div className="">
            <img
              src={"/icons/" + categoryInfo?.uri}
              alt={categoryInfo?.name}
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-slate-500 uppercase font-bold">
              {categoryInfo?.name}
            </p>
            <p className="text-lg font-bold">{expense.name}</p>
            <p className="text-gray-500 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>

          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListAdapter>
    </>
  );
};

import { createContext, Dispatch, useMemo, useReducer } from "react";

import {
  initialState,
  BudgetReducer,
  BudgetActions,
  BudgetState,
} from "../reducers/budget.reducer";

interface BudgetContextProps {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  previusAmount: number;
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

interface BudgetProviderProps {
  children: React.ReactNode;
}
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [stateBudget, dispatchBudget] = useReducer(BudgetReducer, initialState);

  const totalExpenses = useMemo(
    () =>
      stateBudget.expenses.reduce((acc, expense) => acc + expense.amount, 0),
    [stateBudget.expenses]
  );
  const previusAmount = stateBudget.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        dispatch: dispatchBudget,
        state: stateBudget,
        totalExpenses,
        previusAmount,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

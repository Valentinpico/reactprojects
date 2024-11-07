import { createContext, Dispatch, useReducer } from "react";

import {
  initialState,
  BudgetReducer,
  BudgetActions,
  BudgetState,
} from "../reducers/budget.reducer";

interface BudgetContextProps {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

interface BudgetProviderProps {
  children: React.ReactNode;
}
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [stateBudget, dispatchBudget] = useReducer(BudgetReducer, initialState);

  return (
    <BudgetContext.Provider
      value={{
        dispatch: dispatchBudget,
        state: stateBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

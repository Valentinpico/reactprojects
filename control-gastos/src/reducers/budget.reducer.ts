import { DraftExpenseType, ExpenseType } from "../types/types";
import { v4 as uuid } from "uuid";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal"; payload: { show: boolean } }
  | { type: "reset-budget" }
  | { type: "add-expense"; payload: { expense: DraftExpenseType } };

export interface BudgetState {
  budget: number;
  showModal: boolean;
  expenses: ExpenseType[];
}

export const initialState: BudgetState = {
  budget: 0,
  showModal: false,
  expenses: [],
};
const createExpense = (expense: DraftExpenseType): ExpenseType => ({
  id: uuid(),
  ...expense,
});

export const BudgetReducer = (
  state = initialState,
  action: BudgetActions
): BudgetState => {
  if (action.type === "add-budget") {
    return { ...state, budget: action.payload.budget };
  }

  if (action.type === "reset-budget") {
    return { ...state, budget: 0 };
  }

  if (action.type === "show-modal") {
    return { ...state, showModal: action.payload.show };
  }

  if (action.type === "add-expense") {
    const expense: ExpenseType = createExpense(action.payload.expense);
    return { ...state, expenses: [...state.expenses, expense] };
  }

  return state;
};

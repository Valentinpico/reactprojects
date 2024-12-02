import { DraftExpenseType, ExpenseType } from "../types/types";
import { v4 as uuid } from "uuid";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal"; payload: { show: boolean } }
  | { type: "reset-budget" }
  | { type: "add-expense"; payload: { expense: DraftExpenseType } }
  | { type: "delete-expense"; payload: { id: ExpenseType["id"] } }
  | { type: "put-id-expense"; payload: { id: ExpenseType["id"] } }
  | {
      type: "update-expense";
      payload: { expense: ExpenseType };
    };

export interface BudgetState {
  budget: number;
  showModal: boolean;
  idExpenseUpdate: ExpenseType["id"];
  expenses: ExpenseType[];
}

export const initialState: BudgetState = {
  budget: 12,
  showModal: false,
  idExpenseUpdate: "",
  expenses: [
    {
      id: uuid(),
      name: "Gasto 1",
      amount: 100,
      category: "1",
      date: new Date(),
    },
  ],
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
    return { ...state, showModal: action.payload.show, idExpenseUpdate: "" };
  }

  if (action.type === "add-expense") {
    const expense: ExpenseType = createExpense(action.payload.expense);
    return { ...state, expenses: [...state.expenses, expense] };
  }
  if (action.type === "delete-expense") {
    const newExpenses = state.expenses.filter(
      (expense) => expense.id !== action.payload.id
    );
    return { ...state, expenses: newExpenses };
  }
  if (action.type === "update-expense") {
    const newExpenses = state.expenses.map((expense) =>
      expense.id === action.payload.expense.id
        ? action.payload.expense
        : expense
    );

    return { ...state, expenses: newExpenses, idExpenseUpdate: "" };
  }

  if (action.type === "put-id-expense") {
    return { ...state, idExpenseUpdate: action.payload.id, showModal: true };
  }

  return state;
};

import { DraftExpenseType, ExpenseType, ToastType } from "../types/types";
import { v4 as uuid } from "uuid";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "reset-app" }
  | { type: "add-expense"; payload: { expense: DraftExpenseType } }
  | { type: "delete-expense"; payload: { id: ExpenseType["id"] } }
  | { type: "put-id-expense"; payload: { id: ExpenseType["id"] } }
  | {
      type: "update-expense";
      payload: { expense: ExpenseType };
    }
  | { type: "show-modal"; payload: { show: boolean } }
  | { type: "toast-config"; payload: { toast: ToastType } };

export interface BudgetState {
  budget: number;
  showModal: boolean;
  idExpenseUpdate: ExpenseType["id"];
  expenses: ExpenseType[];
  toast: ToastType;
}

const getExpenses = (): ExpenseType[] => {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
};

const getBudget = (): number => {
  const budget = localStorage.getItem("budget");
  return budget ? JSON.parse(budget) : 0;
};

export const initialState: BudgetState = {
  budget: getBudget(),
  showModal: false,
  idExpenseUpdate: "",
  toast: {
    isVisible: false,
    message: "",
    type: "success",
    duration: 0,
    onClose: () => {},
  },
  expenses: getExpenses(),
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

  if (action.type === "reset-app") {
    return { ...state, budget: 0, expenses: [] };
  }

  if (action.type === "show-modal") {
    return { ...state, showModal: action.payload.show, idExpenseUpdate: "" };
  }

  if (action.type === "add-expense") {
    const expense: ExpenseType = createExpense(action.payload.expense);

    const toast: ToastType = {
      isVisible: true,
      message: "Gasto Actualizado",
      type: "success",
    };

    return {
      ...state,
      toast,
      expenses: [...state.expenses, expense],
      showModal: false,
    };
  }
  if (action.type === "delete-expense") {
    const newExpenses = state.expenses.filter(
      (expense) => expense.id !== action.payload.id
    );

    const toast: ToastType = {
      isVisible: true,
      message: "Gasto eliminado",
      type: "success",
    };
    return { ...state, expenses: newExpenses, toast };
  }
  if (action.type === "update-expense") {
    const newExpenses = state.expenses.map((expense) =>
      expense.id === action.payload.expense.id
        ? action.payload.expense
        : expense
    );
    const toast: ToastType = {
      isVisible: true,
      message: "Gasto Actualizado",
      type: "info",
    };

    return {
      ...state,
      toast,
      expenses: newExpenses,
      idExpenseUpdate: "",
      showModal: false,
    };
  }

  if (action.type === "put-id-expense") {
    return { ...state, idExpenseUpdate: action.payload.id, showModal: true };
  }

  if (action.type === "toast-config") {
    return { ...state, toast: action.payload.toast };
  }

  return state;
};

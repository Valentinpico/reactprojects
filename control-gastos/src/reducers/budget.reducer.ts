export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "reset-budget" };

export interface BudgetState {
  budget: number;
}

export const initialState: BudgetState = {
  budget: 0,
};

export const BudgetReducer = (state = initialState, action: BudgetActions) => {
  if (action.type === "add-budget") {
    return { ...state, budget: action.payload.budget };
  }

  if (action.type === "reset-budget") {
    return { ...state, budget: 0 };
  }
  return state;
};

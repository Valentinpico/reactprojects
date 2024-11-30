export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal"; payload: { show: boolean } }
  | { type: "reset-budget" };

export interface BudgetState {
  budget: number;
  showModal: boolean;
}

export const initialState: BudgetState = {
  budget: 0,
  showModal: false,
};

export const BudgetReducer = (state = initialState, action: BudgetActions) => {
  if (action.type === "add-budget") {
    return { ...state, budget: action.payload.budget };
  }

  if (action.type === "reset-budget") {
    return { ...state, budget: 0 };
  }

  if (action.type === "show-modal") {
    return { ...state, showModal: action.payload.show };
  }
  return state;
};

export type CategoryType = {
  id: string;
  name: string;
  icon: string;
  uri: string;
};

export type ExpenseType = {
  id: string;
  name: string;
  amount: number;
  category: CategoryType["id"];
  date: Value;
};

export type DraftExpenseType = Omit<ExpenseType, "id">;

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type TypeToastType = "success" | "error" | "warning" | "info";

export type ToastType = {
  isVisible: boolean;
  message: string;
  type: TypeToastType;
  duration?: number;
  onClose?: () => void;
};

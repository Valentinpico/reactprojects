import { formatCurrency } from "../../utils/formatCurrency";

type AmountDisplayProps = {
  label: string;
  amount: number;
};

export const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
  const amountFormatted = formatCurrency(amount);
  
  return (
    <div className="text-2xl  text-blue-600 font-bold">
      <span>{label}: </span>
      <span className="font-black text-black">{amountFormatted}</span>
    </div>
  );
};

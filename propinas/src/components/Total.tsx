import { useMemo, useState } from "react";
import { Order } from "../types";
import { tipOptions } from "../data/data";
type TotalProps = {
  order: Order[];
};

export const Total = ({ order }: TotalProps) => {
  const [tip, setTip] = useState(0);
  const subtotal = useMemo(
    () => order.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [order]
  );

  const propina = useMemo(() => subtotal * tip, [subtotal, tip]);

  if (order.length === 0) {
    return (
      <div className="grid gap-2">
        <h1> Agrega un producto</h1>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <h1 className=" text-slate-600 text-xl font-bold">Totales y propinas</h1>
      <p className="text-sm text-slate-900 truncate flex justify-between">
        Subtotal a pagar: <p className=" font-bold">${subtotal}</p>
      </p>

      <p className="text-sm text-slate-900 truncate flex justify-between">
        Propina:
        {tipOptions.map((item) => (
          <label key={item.id} className="flex items-center space-x-2">
            <input
              type="radio"
              name="tip"
              value={item.valor}
              onChange={(e) => setTip(Number(e.target.value))}
            />
            <span>{item.etiqueta}</span>
          </label>
        ))}
        <p className=" font-bold">${propina}</p>
      </p>
      <p className="text-sm text-slate-900 truncate flex justify-between">
        Total:<p className=" font-bold">${subtotal + propina}</p>
      </p>
      <button
        className=" bg-slate-800 rounded text-white py-2 hover:bg-slate-900"
        onClick={() => alert(propina)}
      >
        afsdfasa
      </button>
    </div>
  );
};

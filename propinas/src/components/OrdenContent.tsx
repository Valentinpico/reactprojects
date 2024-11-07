import { MenuItem, Order } from "../types";
import { MAX_QUANTITY } from "../utils/constants";

type OrdenContentProps = {
  order: Order[];
  deleteItem: (id: MenuItem["id"]) => void;
  decrementItem: (id: MenuItem["id"]) => void;
};

export const OrdenContent = ({
  order,
  deleteItem,
  decrementItem,
}: OrdenContentProps) => {
  return (
    <>
      <h1 className=" text-lime-600 text-4xl">Product</h1>
      <div className="">
        {order.map((item) => (
          <div
            key={item.id}
            className="p-4  hover:bg-slate-200 duration-100  flex justify-between w-full border-t last-of-type:border-b"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">
                {item.name} - ${item.price}
              </p>
              <p className="text-sm text-teal-900 truncate font-bold">
                cantidad: {item.quantity}
                {item.quantity == MAX_QUANTITY && <> Max.</>} - $
                {item.price * item.quantity}
              </p>
            </div>
            <div className="grid grid-cols-2 items- gap-1 item ">
              {item.quantity > 1 && (
                <button
                  onClick={() => decrementItem(item.id)}
                  className=" bg-blue-500 text-white h-10 w-10 rounded-full font-bold cursor-pointe hover:bg-blue-700 tramstion duration-100"
                >
                  -
                </button>
              )}
              <button
                onClick={() => deleteItem(item.id)}
                className=" bg-red-500 text-white h-10 w-10 rounded-full font-bold cursor-pointe hover:bg-red-700 tramstion duration-100 col-start-2"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

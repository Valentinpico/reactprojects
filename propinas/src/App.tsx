import { useState } from "react";
import { MenuItem } from "./types";
import { MenuItems } from "./components/MenuItems";
import { menuItems } from "./data/data";
import { useOrder } from "./hooks/useOrder";
import { OrdenContent } from "./components/OrdenContent";
import { Total } from "./components/Total";

function App() {
  const [items] = useState<MenuItem[]>(menuItems);

  const { order, addItem, deleteItem, decrementItem } = useOrder();

  return (
    <>
      <main className="bg-slate-100 max-w-7xl mx-auto grid md:grid-cols-2 mt-10 ">
        <div role="list" className="p-6 ">
          <h1 className=" text-lime-600 text-4xl">Counter</h1>
          <div className="divide-y divide-slate-200">
            {items.map((item) => (
              <MenuItems key={item.id} item={item} addItem={addItem} />
            ))}
          </div>
        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          <OrdenContent
            order={order}
            deleteItem={deleteItem}
            decrementItem={decrementItem}
          />
          <Total order={order} />
        </div>
      </main>
      1
    </>
  );
}

export default App;

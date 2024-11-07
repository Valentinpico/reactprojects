import { useState } from "react";
import type { MenuItem, Order } from "../types";
import { MAX_QUANTITY, MIN_QUANTITY } from "../utils/constants";
export const useOrder = () => {
  const [order, setOrder] = useState<Order[]>([]);

  const addItem = (item: MenuItem) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex === -1) {
      setOrder([...order, { ...item, quantity: 1 }]);
      return;
    }

    if (order[itemIndex].quantity === MAX_QUANTITY) return;
    const newOrder = [...order];

    newOrder[itemIndex].quantity += 1;
    setOrder(newOrder);
  };

  const deleteItem = (id: MenuItem["id"]) => {
    const newOrder = order.filter((item) => item.id !== id);
    setOrder(newOrder);
  };

  const decrementItem = (id: MenuItem["id"]) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === id);

    if (order[itemIndex].quantity === MIN_QUANTITY) return;

    const newOrder = [...order];
    newOrder[itemIndex].quantity -= 1;
    setOrder(newOrder);
  };

  return { order, addItem, deleteItem, decrementItem };
};

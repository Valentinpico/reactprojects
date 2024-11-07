import { MenuItem } from "../types";

type MenuItemProps = {
  item: MenuItem;
  addItem: (item: MenuItem) => void;
};

export const MenuItems = ({ item, addItem }: MenuItemProps) => {
  return (
    <button
      className="p-4  hover:bg-amber-400 duration-100 cursor-pointer rounded-md  flex justify-between w-full "
      onClick={() => addItem(item)}
    >
      <p className="text-sm font-medium text-slate-900">{item.name}</p>
      <p className="text-sm text-teal-900 truncate font-bold">${item.price}</p>
    </button>
  );
};

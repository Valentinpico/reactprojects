export type MenuItem = {
  id: number;
  name: string;
  price: number;
};

export type Order = MenuItem & {
  quantity: number;
};
export type Tip = {
  id: string;
  valor: number;
  etiqueta: string;
};

import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: true,
})
export class Product extends Model<Product> {
  @Column({ type: DataType.STRING(100) })
  declare name: string;

  @Column({ type: DataType.STRING(100) })
  declare description: string;

  @Column({ type: DataType.FLOAT })
  declare price: number;

  @Default(true)
  @Column({ type: DataType.BOOLEAN })
  declare availity: boolean;
}

export default Product;

import {Sales} from "./sales.model";
import {Product} from "../../../product/model/product.model";

export class SalesDetails{

  id!: number;
  sales!: Sales;
  product!: Product;
  quantity!: number;
  unitPrice!: number;
  totalPrice!: number;
  discount!: number;

}

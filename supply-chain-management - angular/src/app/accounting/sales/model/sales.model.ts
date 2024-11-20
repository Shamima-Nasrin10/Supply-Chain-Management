import {Retailer} from "../../../product/retailer/model/retailer.model";
import {Product} from "../../../product/model/product.model";

export class Sales{
  id!: number;
  retailer!: Retailer[];
  salesdate!: Date;
  totalprice!: number;
  quantity!: number;
  discount!: number;
  product!: Product[];
}

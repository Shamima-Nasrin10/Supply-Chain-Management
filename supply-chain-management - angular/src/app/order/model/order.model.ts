
import { UserModel } from "../../access/userModel/user.model";
import {Product} from "../../product/model/product.model";
import { ManufacturingStage, OrderStage } from "./enum/enums";

export class OrderModel {
  id!: string;
  userId!: number;
  userName!: string;
  phoneNumber!: string;
  address!: string;
  product!: Product;
  quantity!: number;
  unitPrice!: number;
  stock!: number;
  totalPrice!: number;
  orderDate!: Date;
  requiredDeliveryDate?: Date;
  status!: OrderStage;
  manufacturingStage?: ManufacturingStage;
}

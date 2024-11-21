import {ProdProduct} from "../../../production/prod-product/prodproduct.model";
import {Retailer} from "../../../product/retailer/model/retailer.model";

export class SalesModel{
  id!: number;
  productionProduct!: ProdProduct;
  productRetailer!: Retailer;
  salesDate!: Date;
  unitPrice!: number;
  quantity!: number;
  totalPrice!: number;
  status!: SalesStatus;


}
export enum SalesStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}


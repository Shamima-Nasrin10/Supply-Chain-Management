import {Product} from "../../product/model/product.model";
import {WareHouse} from "../../warehouse/warehouse/warehouse.model";
import {RawMatUsage} from "../RawMatUsage/rawmatusage.model";

export class ProdProduct{
  id!: number; // Optional for new entries before saved in the backend
  product!: Product;
  completionDate!: Date;
  movedToWarehouseDate!: Date;
  batchNumber!: number;
  quantity!: number;
  warehouse!: WareHouse;
  qrCodePath?: string;
  rawMatUsages!: RawMatUsage[];
  status!: 'IN_PROGRESS' | 'COMPLETED' | 'MOVED_TO_WAREHOUSE';
}


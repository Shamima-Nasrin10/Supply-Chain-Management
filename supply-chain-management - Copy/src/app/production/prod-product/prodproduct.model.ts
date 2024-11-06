import {Product} from "../../product/model/product.model";
import {WareHouse} from "../../warehouse/warehouse/warehouse.model";
import {RawMatUsage} from "../RawMatUsage/rawmatusage.model";

export class ProdProduct {
  id!: number; // Optional for new entries before saved in the backend
  product: Product= new Product();
  completionDate: Date | null = null;
  movedToWarehouseDate: Date | null = null;
  batchNumber!: number;
  quantity!: number;
  warehouse!: WareHouse;
  qrCodePath?: string;
  rawMatUsages!: RawMatUsage[];
  status: ProductionStatus = ProductionStatus.IN_PROGRESS;
}

export enum ProductionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  MOVED_TO_WAREHOUSE = 'MOVED_TO_WAREHOUSE'
}


import { ProductionProduct } from "./production-product.model";

export class ProductionRecords {
  productionId?: number;
  product?:ProductionProduct
  productionQuantity?: number;
  productionDate?: string;
  qualityControlInfo?: string;
  batchNumber?: string;
}

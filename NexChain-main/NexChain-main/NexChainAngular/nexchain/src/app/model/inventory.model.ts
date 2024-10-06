import { Procurement } from "./procurement.model";
import { RawMaterial } from "./rawmaterial.model";

export class Inventory {
    inventoryID?: number;
    rawMaterial?: RawMaterial;
    quantityInStock?: number;
    unitPrice?: number;
    lastStockUpdateDate?: Date;
    procurement!: Procurement;
  }

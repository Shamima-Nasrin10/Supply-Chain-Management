import { RawMaterial } from "./rawmaterial.model";

export class Stock {
    stockId?: number;
    rawMaterial?: RawMaterial;
    previousPrice?: number;
    unitPrice?: number;
    quantity?: number;
    lastStockUpdateDate?: Date;
    increase?: number;
    decrease?: number;
  }
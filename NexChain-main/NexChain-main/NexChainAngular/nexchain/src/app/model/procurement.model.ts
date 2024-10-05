import { RawMaterial } from "./rawmaterial.model";
import { Supplier } from "./supplier.model";

export class Procurement {
    id?: number;
    supplier?: Supplier; // Assuming Supplier model is already created
    rawMaterial?: RawMaterial; // Assuming RawMaterial model is already created
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
    procurementDate?: Date;
  }
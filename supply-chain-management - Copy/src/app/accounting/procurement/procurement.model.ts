import {RawMaterial} from "../../inventory/raw-materials/model/raw-material.model";
import {SupplierModel} from "../../inventory/suppliers/model/supplier.model";

export class ProcurementModel{
  id!: number;
  rawMaterial!: RawMaterial;
  rawMaterialSupplier!: SupplierModel;
  procurementDate!: Date;
  unitPrice!: number;
  quantity!: number;
  totalPrice!: number;
  status!: ProcurementStatus;


}
export enum ProcurementStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

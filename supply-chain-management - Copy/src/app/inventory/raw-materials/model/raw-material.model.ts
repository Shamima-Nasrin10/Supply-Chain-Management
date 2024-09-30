import { RawMaterialCategory } from "../../raw-material-category/model/raw-material-category.model";
import { SupplierModel } from "../../suppliers/model/supplier.model"

export class RawMaterial {

  id!: number;
  name!: string;
  price!: number;
  quantity!: number;
  unit!: Unit;
  image!: string;
  category: RawMaterialCategory = new RawMaterialCategory();
  supplier: SupplierModel = new SupplierModel();
}

export enum Unit {
  METER = 'METER',
  PIECE = 'PIECE',
  FEET = 'FEET',
  INCH = 'INCH',
  KG = 'KG',
  GRAM = 'GRAM'
}
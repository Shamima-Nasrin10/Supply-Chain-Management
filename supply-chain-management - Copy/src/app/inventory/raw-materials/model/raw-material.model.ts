import { RawMaterialCategory } from "../../raw-material-category/model/raw-material-category.model";
import { SupplierModel } from "../../suppliers/model/supplier.model"
import {Inventory} from "../../inventory/model/inventory.model";

export class RawMaterial {

  id!: number;
  name!: string;
  price!: number;
  quantity!: number;
  stock!: number;  // Added to match the Spring entity
  unit!: Unit;
  image!: string;
  category: RawMaterialCategory = new RawMaterialCategory();
  supplier: SupplierModel = new SupplierModel();
  inventory: Inventory = new Inventory(); // Added to match the Spring entity
}

export enum Unit {
  LETTER = 'LETTER',
  PIECE = 'PIECE',
  KG = 'KG',
  GRAM = 'GRAM'
}

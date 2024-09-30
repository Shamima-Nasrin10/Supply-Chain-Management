import {Inventory} from "../../inventory/inventory/model/inventory.model";

export class Product {
  id!: number;
  name!: string;
  unitPrice!: number;
  stock!: number;
  batch!: string;
  inventory: Inventory = new Inventory();
  unit!: Unit;

}

export enum Unit {
  METER = 'METER',
  PIECE = 'PIECE',
  FEET = 'FEET',
  INCH = 'INCH',
  KG = 'KG',
  GRAM = 'GRAM'
}

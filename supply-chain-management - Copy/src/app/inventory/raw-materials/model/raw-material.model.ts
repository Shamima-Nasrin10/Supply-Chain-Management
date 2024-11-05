import { RawMaterialCategory } from "../../raw-material-category/model/raw-material-category.model";

export class RawMaterial {

  id!: number;
  name!: string;
  unit!: Unit;
  image!: string;
  category: RawMaterialCategory = new RawMaterialCategory();

}

export enum Unit {
  LITRE = 'LITRE',
  PIECE = 'PIECE',
  KG = 'KG',
  GRAM = 'GRAM'
}

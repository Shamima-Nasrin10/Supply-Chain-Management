import {RawMaterial} from "../../inventory/raw-materials/model/raw-material.model";
import {ProdProduct} from "../prod-product/prodproduct.model";

export class RawMatUsage {
  id!: number;
  rawMaterial!: RawMaterial;
  quantity!: number;
  prodProduct!: ProdProduct;
}

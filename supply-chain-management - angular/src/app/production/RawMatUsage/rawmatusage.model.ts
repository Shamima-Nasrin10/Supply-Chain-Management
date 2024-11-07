import {RawMaterial} from "../../inventory/raw-materials/model/raw-material.model";

export class RawMatUsage {
  id!: number;
  rawMaterial: RawMaterial = new RawMaterial();
  quantity!: number;
}

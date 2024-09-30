import {WareHouse} from "../../../warehouse/warehouse/warehouse.model";
import {Product} from "../../../product/model/product.model";


export class Inventory {
  id!: number;
  name!: string;
  capacity!: number;
  warehouse: WareHouse = new WareHouse();
  createdDate!: Date;
  lastUpdatedDate!: Date;
  category!: InventoryCategory;
}

export enum InventoryCategory {
  PRODUCT = 'PRODUCT',
  RAW_MATERIAL = 'RAW_MATERIAL'
}




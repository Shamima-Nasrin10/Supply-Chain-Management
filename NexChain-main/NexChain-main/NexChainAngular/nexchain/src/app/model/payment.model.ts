import { Procurement } from "./procurement.model";

export class Payment {
    paymentID?: number;
    procurement?: Procurement;
    paymentAccount?: string;
    paymentAmount?: number;
    paymentDate?: Date;
  }
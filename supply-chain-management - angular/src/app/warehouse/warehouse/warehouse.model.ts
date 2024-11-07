
export class WareHouse{
  id!: number;
  name!: string;
  location!: string;
  status !: ApprovalStatus;
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

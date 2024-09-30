export class UserModel {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    cell!: string;
    active!: boolean;
    isLock!: boolean;
    role!: Role;
  }
  
  export enum Role {
    ADMIN,
    USER
  }
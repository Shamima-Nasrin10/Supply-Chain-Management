import { UserModel } from "../access/userModel/user.model";

export interface AuthResponse {

    token:string;
    user:UserModel;
}

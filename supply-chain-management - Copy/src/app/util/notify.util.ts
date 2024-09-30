import { ApiResponse } from "./api.response";

export class NotifyUtil {

    static success(response: ApiResponse): void {
      alert(response?.message || 'Successful');
    }
  
    static error(error: any): void {
      console.log(error);
      if (error.message) {
        alert(error.message);
      } else {
        alert(error.error?.message || `An error occurred`);
      }
    }
  
  }
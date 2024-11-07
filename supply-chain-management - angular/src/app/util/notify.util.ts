import { ApiResponse } from "./api.response";

export class NotifyUtil {

    static success(response: ApiResponse): void {
      alert(response?.message || 'Successful');
    }

    static error(error: any): void {
      console.log(error);
      if (error) {
        alert(error);
      } else {
        alert(error.error?.message || `An error occurred`);
      }
    }

  }

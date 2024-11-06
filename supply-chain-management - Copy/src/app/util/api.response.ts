export class ApiResponse {
    message?: string;
    data!: { [key: string]: any };
    success!: boolean;
}

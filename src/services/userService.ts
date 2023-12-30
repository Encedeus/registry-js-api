import {AxiosInstance} from "axios";

export class UserService {
    private api: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.api = axiosInstance;
    }
}
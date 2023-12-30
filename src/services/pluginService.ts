import {AxiosInstance} from "axios";

export class PluginService {
    private api: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.api = axiosInstance;
    }
}
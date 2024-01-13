import {AxiosInstance} from "axios";
import {EncedeusRegistryApi} from "../api";

export class PluginService {
    private api: AxiosInstance;
    private apiInstance: EncedeusRegistryApi;

    constructor(axiosInstance: AxiosInstance, apiInstance: EncedeusRegistryApi) {
        this.api = axiosInstance;
        this.apiInstance = apiInstance;
    }
}
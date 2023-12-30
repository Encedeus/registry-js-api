import axios, {AxiosInstance} from "axios";
import {UserService} from "./services/userService";
import {AuthService} from "./services/authService";
import {PluginService} from "./services/pluginService";

export class EncedeusRegistryApi {
    private static instance: EncedeusRegistryApi;

    private readonly axiosInstance: AxiosInstance;

    private readonly _usersService: UserService;
    private readonly _authService: AuthService;
    private readonly _pluginService: PluginService;

    private constructor(apiBaseURL: string, axiosConfig: object) {
        this.axiosInstance = axios.create({
            baseURL: apiBaseURL,
            headers: {
                "Content-Type": "application/json",
            },
            ...axiosConfig,
        });
        this._usersService = new UserService(this.axiosInstance);
        this._authService = new AuthService(this.axiosInstance);
        this._pluginService = new PluginService(this.axiosInstance);
    }

    static Initialise(apiBaseURL: string, axiosConfig: object = {}) {
        if (!this.instance) {
            this.instance = new EncedeusRegistryApi(apiBaseURL, axiosConfig);
        }

        throw Error("api already initialised");
    }

    static get Instance() {
        if (!this.instance) {
            throw Error("api not initialised");
        }

        return this.instance;
    }

    get UsersService(): UserService {
        return this._usersService;
    }

    get AuthService(): AuthService {
        return this._authService;
    }

    get PluginService(): PluginService {
        return this._pluginService;
    }

    set AccessToken(accessToken: string) {
        this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
}
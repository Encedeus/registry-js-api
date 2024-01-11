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

    public constructor(apiBaseURL: string, accessToken: string, axiosConfig: object) {
        this.axiosInstance = axios.create({
            baseURL: apiBaseURL,
            headers: {
                "Content-Type": "application/json",
            },
            ...axiosConfig,
        });

        this.AccessToken = accessToken

        this._usersService = new UserService(this.axiosInstance);
        this._authService = new AuthService(this.axiosInstance);
        this._pluginService = new PluginService(this.axiosInstance);
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
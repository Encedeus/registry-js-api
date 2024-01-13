import axios, {AxiosInstance} from "axios";
import {UserService} from "./services/userService";
import {AuthService} from "./services/authService";
import {PluginService} from "./services/pluginService";
import {User} from "./proto/user_api";
export type Callbacks = {
    onAuth: (accessToken: string) => void
    onUser: (user: User) => void
}

export type Config = {
    axiosConfig: object
    callbacks: Callbacks
}
export class EncedeusRegistryApi {

    private readonly axiosInstance: AxiosInstance;

    private readonly _usersService: UserService;
    private readonly _authService: AuthService;
    private readonly _pluginService: PluginService;

    private _accessToken: string

    public constructor(apiBaseURL: string, accessToken: string, config: Config) {
        this.axiosInstance = axios.create({
            baseURL: apiBaseURL,
            headers: {
                "Content-Type": "application/json",
            },
            ...config.axiosConfig,
        });

        this._accessToken = accessToken

        this._usersService = new UserService(this.axiosInstance, this, config.callbacks);
        this._authService = new AuthService(this.axiosInstance, this, config.callbacks);
        this._pluginService = new PluginService(this.axiosInstance, this, config.callbacks);
    }

    private

    get UsersService(): UserService {
        return this._usersService;
    }

    get AuthService(): AuthService {
        return this._authService;
    }

    get PluginService(): PluginService {
        return this._pluginService;
    }

    set accessToken(accessToken: string) {
        this._accessToken = accessToken
        this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }

    get accessToken(): string {
        return this._accessToken
    }
}
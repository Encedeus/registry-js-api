import {AxiosInstance} from "axios";
import {Callbacks, EncedeusRegistryApi} from "../api";
import * as process from "process";
import {getErrorFromResponse, HttpError, isUnauthorized} from "./errors";
import {User, UserUpdateRequest} from "../proto/user_api";
import {ErrorResponse} from "../proto/common";

export type GetUserResponse = {
    error?: HttpError;
    response?: User
}
export type UpdateUserResponse = {
    error?: HttpError;
    response?: User
}

export type DeleteSelfResponse ={
    error?: HttpError;
}

export class UserService {
    private api: AxiosInstance;
    private apiInstance: EncedeusRegistryApi;
    private readonly callbacks: Callbacks

    constructor(axiosInstance: AxiosInstance, apiInstance: EncedeusRegistryApi, callbacks: Callbacks) {
        this.api = axiosInstance;
        this.apiInstance = apiInstance;
        this.callbacks = callbacks
    }

    GetUserPfpURL(user: User) {
        const baseUrl = this.api.defaults.baseURL

        return `${baseUrl}/user/pfp/${user.id}`
    }

    async GetUser(userId: string): Promise<GetUserResponse> {
        const resp = await this.api.get(`/user/${userId}`).catch(err => err.response);

        if (resp.status == 200) {
            const response = resp.data as User;

            return {response};
        }

        return {error: getErrorFromResponse(resp)}
    }

    private onAuthorisation(accessToken: string) {
        this.callbacks.onAuth(accessToken);

        this.apiInstance.accessToken = accessToken;
    }
    private onUserUpdate(user: User) {
        this.callbacks.onUser(user);
    }

    async GetSelf(): Promise<GetUserResponse> {

        const authErr = isUnauthorized(this.apiInstance);
        if (authErr) {
            return {error: authErr};
        }

        const resp = await this.api.get(`/user`).catch(err => err.response);

        if (resp.status == 200) {
            const response = resp.data as User;
            this.onUserUpdate(response)
            return {response};
        }

        return {error: getErrorFromResponse(resp)}
    }

    async UpdateUser(req: UserUpdateRequest): Promise<UpdateUserResponse> {
        const authErr = isUnauthorized(this.apiInstance);
        if (authErr) {
            return {error: authErr};
        }

        const resp = await this.api.patch("/user", req).catch(err => err.response);

        if (resp.status == 200) {
            const response = resp.data as User;
            this.onUserUpdate(response)
            return {response};
        }

        return {error: getErrorFromResponse(resp)}
    }

    async DeleteSelf(): Promise<DeleteSelfResponse> {
        const authErr = isUnauthorized(this.apiInstance);
        if (authErr) {
            return {error: authErr};
        }

        const resp = await this.api.delete("/user").catch(err => err.message);

        if (resp.status == 200) {
            this.onUserUpdate(undefined)
            this.onAuthorisation("")
            return {}
        }

        return {error: getErrorFromResponse(resp)}
    }
}
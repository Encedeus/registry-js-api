import {AxiosInstance} from "axios";
import {Callbacks, EncedeusRegistryApi} from "../api";
import * as process from "process";
import {HttpError} from "./errors";
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

    isAuthError(): HttpError {
        if (this.apiInstance.accessToken.length == 0) {
            return new HttpError(401, "unauthorized", "unauthorized");
        }
    }

    async GetUser(userId: string): Promise<GetUserResponse> {
        const resp = await this.api.get(`/user/${userId}`).catch(err => err.response);

        if (resp.status == 200) {
            const response = resp.data as User;

            return {response};
        }

        let error: HttpError | undefined;
        const errorMessage = (resp.data as ErrorResponse).message;

        switch (resp.status) {
            case 404:
                error = new HttpError(404, "not found", errorMessage);
                break;
            case 500:
                error = new HttpError(500, "internal server error", errorMessage);
        }

        return {
            error
        };
    }

    private onAuthorisation(accessToken: string) {
        this.callbacks.onAuth(accessToken);

        this.apiInstance.accessToken = accessToken;
    }
    private onUserUpdate(user: User) {
        this.callbacks.onUser(user);
    }

    async GetSelf(): Promise<GetUserResponse> {

        const authErr = this.isAuthError();
        if (authErr) {
            return {error: authErr};
        }

        const resp = await this.api.get(`/user`).catch(err => err.response);

        if (resp.status == 200) {
            const response = resp.data as User;
            this.onUserUpdate(response)
            return {response};
        }

        let error: HttpError | undefined;
        const errorMessage = (resp.data as ErrorResponse).message;

        switch (resp.status) {
            case 401:
                error = new HttpError(401, "unauthorized", errorMessage);
                break;
            case 500:
                error = new HttpError(500, "internal server error", errorMessage);
        }

        return {
            error
        };
    }

    async UpdateUser(req: UserUpdateRequest): Promise<UpdateUserResponse> {
        const authErr = this.isAuthError();
        if (authErr) {
            return {error: authErr};
        }

        const resp = await this.api.patch("/user", req).catch(err => err.message);

        if (resp.status == 200) {
            const response = resp.data as User;
            this.onUserUpdate(response)
            return {response};
        }

        let error: HttpError | undefined;
        const errorMessage = (resp.data as ErrorResponse).message;

        switch (resp.status) {
            case 401:
                error = new HttpError(resp.status, "unauthorized", errorMessage);
                break;
            case 410:
                error = new HttpError(resp.status, "user deleted", errorMessage);
                break;
            case 409:
                error = new HttpError(resp.status, "new field equals old", errorMessage);
                break;
            case 400:
                error = new HttpError(resp.status, "bad request", errorMessage);
                break;
            case 500:
                error = new HttpError(resp.status, "internal server error", errorMessage);
        }

        return {
            error
        };
    }

    async DeleteSelf(): Promise<DeleteSelfResponse> {
        const authErr = this.isAuthError();
        if (authErr) {
            return {error: authErr};
        }

        const resp = await this.api.delete("/user").catch(err => err.message);

        if (resp.status == 200) {
            this.onUserUpdate(undefined)
            this.onAuthorisation("")
            return
        }

        let error: HttpError | undefined;
        const errorMessage = (resp.data as ErrorResponse).message;

        switch (resp.status) {
            case 401:
                error = new HttpError(resp.status, "unauthorized", errorMessage);
                break;
            case 400:
                error = new HttpError(resp.status, "bad request", errorMessage);
                break;
            case 500:
                error = new HttpError(resp.status, "internal server error", errorMessage);
        }

        return {
            error
        };
    }
}
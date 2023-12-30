import {AxiosInstance} from "axios";
import {HttpError} from "./errors";
import {EncedeusRegistryApi} from "../api";
import {UserAuthorizeResponse, UserRegisterRequest, UserSignInRequest} from "../proto/auth_api";
import {ErrorResponse} from "../proto/common";

export type SignInResponse = {
    error?: HttpError;
    response?: UserAuthorizeResponse
}
export type SignUpResponse = {
    error?: HttpError;
    response?: UserAuthorizeResponse
}
export type RefreshAccessTokenResponse = {
    error?: HttpError;
    response?: UserAuthorizeResponse
}
export type SignOutResponse = {
    error?: HttpError;
}

export class AuthService {
    private api: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.api = axiosInstance;
    }

    async SignUp(req: UserRegisterRequest, setToken: boolean = true): Promise<SignInResponse> {

        const resp = await this.api.post("auth/register", req).catch(err => err.response);

        if (resp.status === 201) {

            let response = resp.data as UserAuthorizeResponse;
            EncedeusRegistryApi.Instance.AccessToken = response.accessToken;

            return {
                response: resp.data as UserAuthorizeResponse
            };
        }

        let error: HttpError | undefined;
        const errorMessage = (resp.data as ErrorResponse).message;

        switch (resp.status) {
            case 400:
                error = new HttpError(400, "bad request", errorMessage);
                break;
            case 500:
                error = new HttpError(500, "internal server error", errorMessage);
        }

        return {
            error
        };
    }

    async SignIn(req: UserSignInRequest, setToken: boolean = true): Promise<SignInResponse> {
        const resp = await this.api.post("auth/signin", req).catch(err => err.response);

        if (resp.status === 200) {

            let response = resp.data as UserAuthorizeResponse;
            EncedeusRegistryApi.Instance.AccessToken = response.accessToken;

            return {
                response
            };
        }

        let error: HttpError | undefined;
        const errorMessage = (resp.data as ErrorResponse).message;

        switch (resp.status) {
            case 400:
                error = new HttpError(400, "bad request", errorMessage);
                break;
            case 410:
                error = new HttpError(410, "user deleted", errorMessage);
                break;
            case 404:
                error = new HttpError(404, "user not found", errorMessage);
                break;
            case 401:
                error = new HttpError(401, "incorrect password", errorMessage);
                break;
            case 500:
                error = new HttpError(500, "internal server error", errorMessage);
                break;
        }

        return {
            error
        };

    }

    async RefreshAccessToken(setToken: boolean = true): Promise<RefreshAccessTokenResponse> {
        const resp = await this.api.get("auth/refresh").catch(err => err.response);

        if (resp.status === 200) {
            let response = resp.data as UserAuthorizeResponse;
            EncedeusRegistryApi.Instance.AccessToken = response.accessToken;

            return {
                response
            };
        }

        let error: HttpError | undefined;
        const errorMessage = (resp.data as ErrorResponse).message;

        switch (resp.status) {
            case 401:
                error = new HttpError(401, "unauthorised", errorMessage);
                break;
            case 500:
                error = new HttpError(500, "internal server error", errorMessage);
                break;
        }

        return {
            error
        };
    }

    async SignOut(): Promise<SignOutResponse> {
        const resp = await this.api.delete("/auth/signout").catch(err => err.response)

        if (resp.status === 200) {
            return
        }

        let error: HttpError | undefined;
        const errorMessage = (resp.data as ErrorResponse).message;

        switch (resp.status) {
            case 500:
                error = new HttpError(500, "internal server error", errorMessage);
                break;
        }

        return {
            error
        };

    }
}
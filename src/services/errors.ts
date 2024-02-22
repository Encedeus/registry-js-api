import {ErrorResponse} from "../proto/common";

export class HttpError extends Error {
    private readonly _statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message)
        this._statusCode = statusCode;
    }

    get statusCode(): number {
        return this._statusCode;
    }
}

export type ErrorCheck = HttpError | number;

export type ErrorCheckResponse = {
    ok: boolean;
    error?: HttpError;
}

export function getErrorFromResponse(axiosResponse: any): HttpError {

    console.log(axiosResponse);

    const errorMessage = (axiosResponse.data as ErrorResponse).message;
    const statusCode = axiosResponse.statusCode

    return new HttpError(statusCode, errorMessage)
}

export function isUnauthorized(apiInstance): HttpError {
    if (apiInstance.accessToken.length == 0) {
        return new HttpError(401, "unauthorized");
    }
}
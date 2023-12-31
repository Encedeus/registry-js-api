export class HttpError extends Error {
    private readonly _statusCode: number;

    constructor(statusCode: number, name: string, message: string) {
        super(message)
        this._statusCode = statusCode;
        this.name = name;
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

export const InternalServerError = new HttpError(500, "InternalServerError", "Internal server error");
export const BadRequestError = new HttpError(400, "BadRequestError", "Invalid request data");
export const UnauthorisedError = new HttpError(403, "UnauthorisedError", "Invalid access token");

//generate code to check if an HttpError is one of the above by status code
export function isInternalServerError(err: HttpError): boolean {
    return err.statusCode === InternalServerError.statusCode;
}

export function isBadRequestError(err: HttpError): boolean {
    return err.statusCode === BadRequestError.statusCode;
}

export function isUnauthorisedError(err: HttpError): boolean {
    return err.statusCode === UnauthorisedError.statusCode;
}

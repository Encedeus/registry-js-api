/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface GithubRepo {
  username: string;
  repoName: string;
}

export interface ErrorResponse {
  message: string;
}

function createBaseGithubRepo(): GithubRepo {
  return { username: "", repoName: "" };
}

export const GithubRepo = {
  encode(message: GithubRepo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.repoName !== "") {
      writer.uint32(18).string(message.repoName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GithubRepo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGithubRepo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.repoName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GithubRepo {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      repoName: isSet(object.repoName) ? globalThis.String(object.repoName) : "",
    };
  },

  toJSON(message: GithubRepo): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.repoName !== "") {
      obj.repoName = message.repoName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GithubRepo>, I>>(base?: I): GithubRepo {
    return GithubRepo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GithubRepo>, I>>(object: I): GithubRepo {
    const message = createBaseGithubRepo();
    message.username = object.username ?? "";
    message.repoName = object.repoName ?? "";
    return message;
  },
};

function createBaseErrorResponse(): ErrorResponse {
  return { message: "" };
}

export const ErrorResponse = {
  encode(message: ErrorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ErrorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseErrorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ErrorResponse {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: ErrorResponse): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ErrorResponse>, I>>(base?: I): ErrorResponse {
    return ErrorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ErrorResponse>, I>>(object: I): ErrorResponse {
    const message = createBaseErrorResponse();
    message.message = object.message ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

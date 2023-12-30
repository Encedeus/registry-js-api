/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "";

export interface Source {
  repoUri: string;
}

export interface Release {
  name: string;
  publishedAt: Date | undefined;
  isDeprecated: boolean;
  DownloadURI: string;
}

export interface PluginCreateRequest {
  name: string;
  repoUri: string;
}

export interface Plugin {
  id: string;
  name: string;
  ownerName: string;
  source: Source | undefined;
  releases: Release[];
}

export interface PluginPublishReleaseRequest {
  pluginId: string;
  githubReleaseTag: string;
  name: string;
}

export interface PluginDeprecateReleaseRequest {
  pluginId: string;
  releaseName: string;
}

function createBaseSource(): Source {
  return { repoUri: "" };
}

export const Source = {
  encode(message: Source, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.repoUri !== "") {
      writer.uint32(10).string(message.repoUri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Source {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.repoUri = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Source {
    return { repoUri: isSet(object.repoUri) ? globalThis.String(object.repoUri) : "" };
  },

  toJSON(message: Source): unknown {
    const obj: any = {};
    if (message.repoUri !== "") {
      obj.repoUri = message.repoUri;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Source>, I>>(base?: I): Source {
    return Source.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Source>, I>>(object: I): Source {
    const message = createBaseSource();
    message.repoUri = object.repoUri ?? "";
    return message;
  },
};

function createBaseRelease(): Release {
  return { name: "", publishedAt: undefined, isDeprecated: false, DownloadURI: "" };
}

export const Release = {
  encode(message: Release, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.publishedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.publishedAt), writer.uint32(18).fork()).ldelim();
    }
    if (message.isDeprecated === true) {
      writer.uint32(24).bool(message.isDeprecated);
    }
    if (message.DownloadURI !== "") {
      writer.uint32(34).string(message.DownloadURI);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Release {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRelease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.publishedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.isDeprecated = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.DownloadURI = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Release {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      publishedAt: isSet(object.publishedAt) ? fromJsonTimestamp(object.publishedAt) : undefined,
      isDeprecated: isSet(object.isDeprecated) ? globalThis.Boolean(object.isDeprecated) : false,
      DownloadURI: isSet(object.DownloadURI) ? globalThis.String(object.DownloadURI) : "",
    };
  },

  toJSON(message: Release): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.publishedAt !== undefined) {
      obj.publishedAt = message.publishedAt.toISOString();
    }
    if (message.isDeprecated === true) {
      obj.isDeprecated = message.isDeprecated;
    }
    if (message.DownloadURI !== "") {
      obj.DownloadURI = message.DownloadURI;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Release>, I>>(base?: I): Release {
    return Release.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Release>, I>>(object: I): Release {
    const message = createBaseRelease();
    message.name = object.name ?? "";
    message.publishedAt = object.publishedAt ?? undefined;
    message.isDeprecated = object.isDeprecated ?? false;
    message.DownloadURI = object.DownloadURI ?? "";
    return message;
  },
};

function createBasePluginCreateRequest(): PluginCreateRequest {
  return { name: "", repoUri: "" };
}

export const PluginCreateRequest = {
  encode(message: PluginCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.repoUri !== "") {
      writer.uint32(18).string(message.repoUri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PluginCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePluginCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.repoUri = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PluginCreateRequest {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      repoUri: isSet(object.repoUri) ? globalThis.String(object.repoUri) : "",
    };
  },

  toJSON(message: PluginCreateRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.repoUri !== "") {
      obj.repoUri = message.repoUri;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PluginCreateRequest>, I>>(base?: I): PluginCreateRequest {
    return PluginCreateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PluginCreateRequest>, I>>(object: I): PluginCreateRequest {
    const message = createBasePluginCreateRequest();
    message.name = object.name ?? "";
    message.repoUri = object.repoUri ?? "";
    return message;
  },
};

function createBasePlugin(): Plugin {
  return { id: "", name: "", ownerName: "", source: undefined, releases: [] };
}

export const Plugin = {
  encode(message: Plugin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.ownerName !== "") {
      writer.uint32(26).string(message.ownerName);
    }
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.releases) {
      Release.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Plugin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlugin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.ownerName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.releases.push(Release.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Plugin {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      ownerName: isSet(object.ownerName) ? globalThis.String(object.ownerName) : "",
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      releases: globalThis.Array.isArray(object?.releases) ? object.releases.map((e: any) => Release.fromJSON(e)) : [],
    };
  },

  toJSON(message: Plugin): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.ownerName !== "") {
      obj.ownerName = message.ownerName;
    }
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.releases?.length) {
      obj.releases = message.releases.map((e) => Release.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Plugin>, I>>(base?: I): Plugin {
    return Plugin.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Plugin>, I>>(object: I): Plugin {
    const message = createBasePlugin();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.ownerName = object.ownerName ?? "";
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.releases = object.releases?.map((e) => Release.fromPartial(e)) || [];
    return message;
  },
};

function createBasePluginPublishReleaseRequest(): PluginPublishReleaseRequest {
  return { pluginId: "", githubReleaseTag: "", name: "" };
}

export const PluginPublishReleaseRequest = {
  encode(message: PluginPublishReleaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pluginId !== "") {
      writer.uint32(10).string(message.pluginId);
    }
    if (message.githubReleaseTag !== "") {
      writer.uint32(18).string(message.githubReleaseTag);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PluginPublishReleaseRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePluginPublishReleaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pluginId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.githubReleaseTag = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PluginPublishReleaseRequest {
    return {
      pluginId: isSet(object.pluginId) ? globalThis.String(object.pluginId) : "",
      githubReleaseTag: isSet(object.githubReleaseTag) ? globalThis.String(object.githubReleaseTag) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: PluginPublishReleaseRequest): unknown {
    const obj: any = {};
    if (message.pluginId !== "") {
      obj.pluginId = message.pluginId;
    }
    if (message.githubReleaseTag !== "") {
      obj.githubReleaseTag = message.githubReleaseTag;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PluginPublishReleaseRequest>, I>>(base?: I): PluginPublishReleaseRequest {
    return PluginPublishReleaseRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PluginPublishReleaseRequest>, I>>(object: I): PluginPublishReleaseRequest {
    const message = createBasePluginPublishReleaseRequest();
    message.pluginId = object.pluginId ?? "";
    message.githubReleaseTag = object.githubReleaseTag ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBasePluginDeprecateReleaseRequest(): PluginDeprecateReleaseRequest {
  return { pluginId: "", releaseName: "" };
}

export const PluginDeprecateReleaseRequest = {
  encode(message: PluginDeprecateReleaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pluginId !== "") {
      writer.uint32(10).string(message.pluginId);
    }
    if (message.releaseName !== "") {
      writer.uint32(18).string(message.releaseName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PluginDeprecateReleaseRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePluginDeprecateReleaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pluginId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.releaseName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PluginDeprecateReleaseRequest {
    return {
      pluginId: isSet(object.pluginId) ? globalThis.String(object.pluginId) : "",
      releaseName: isSet(object.releaseName) ? globalThis.String(object.releaseName) : "",
    };
  },

  toJSON(message: PluginDeprecateReleaseRequest): unknown {
    const obj: any = {};
    if (message.pluginId !== "") {
      obj.pluginId = message.pluginId;
    }
    if (message.releaseName !== "") {
      obj.releaseName = message.releaseName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PluginDeprecateReleaseRequest>, I>>(base?: I): PluginDeprecateReleaseRequest {
    return PluginDeprecateReleaseRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PluginDeprecateReleaseRequest>, I>>(
    object: I,
  ): PluginDeprecateReleaseRequest {
    const message = createBasePluginDeprecateReleaseRequest();
    message.pluginId = object.pluginId ?? "";
    message.releaseName = object.releaseName ?? "";
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

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

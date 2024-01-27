import {AxiosInstance} from "axios";
import {Callbacks, EncedeusRegistryApi} from "../api";
import {getErrorFromResponse, HttpError, isUnauthorized} from "./errors";
import {
    Plugin,
    PluginCreateRequest,
    PluginDeprecateReleaseRequest,
    PluginGetReadmeRequest,
    PluginGetReadmeResponse, PluginPublishReleaseRequest, PluginSearchByNameRequest, PluginSearchByNameResponse
} from "../proto/plugin_api";
import {ErrorResponse} from "../proto/common";

export type GetPluginResponse = {
    error?: HttpError;
    response?: Plugin
}

export type CreatePluginResponse = {
    error?: HttpError
}

export type CreatePluginReleaseResponse = {
    error?: HttpError
}

export type DeprecatePluginReleaseResponse = {
    error?: HttpError
}

export type GetPluginReadmeResponse = {
    error?: HttpError
    response?: PluginGetReadmeResponse
}

export type SearchPluginsByNameResponse = {
    error?: HttpError
    response?: PluginSearchByNameResponse
}

export class PluginService {
    private api: AxiosInstance;
    private apiInstance: EncedeusRegistryApi;
    private readonly callbacks: Callbacks;

    constructor(axiosInstance: AxiosInstance, apiInstance: EncedeusRegistryApi, callbacks: Callbacks) {
        this.api = axiosInstance;
        this.apiInstance = apiInstance;
        this.callbacks = callbacks;
    }

    async GetPlugin(name: string): Promise<GetPluginResponse> {
        const resp = await this.api.get(`/plugin/${name}`).catch(err => err.response);

        if (resp.status == 200) {
            const response = resp.data as Plugin;

            return {response};
        }

        return {error: getErrorFromResponse(resp)}
    }

    async CreatePlugin(req: PluginCreateRequest): Promise<CreatePluginResponse> {
        const authErr = isUnauthorized(this.apiInstance);
        if (authErr) {
            return {error: authErr};
        }

        const resp = await this.api.post("/plugin", req).catch(err => err.response);

        if (resp.status == 200) {
            return {};
        }

        return {error: getErrorFromResponse(resp)}
    }

    async CreatePluginRelease(req: PluginPublishReleaseRequest): Promise<CreatePluginReleaseResponse> {
        const authErr = isUnauthorized(this.apiInstance);
        if (authErr) {
            return {error: authErr};
        }

        const resp = await this.api.post("/plugin/release", req).catch(err => err.response);

        if (resp.status == 200) {
            return {};
        }

        return {error: getErrorFromResponse(resp)}
    }

    async DeprecateRelease(req: PluginDeprecateReleaseRequest): Promise<DeprecatePluginReleaseResponse> {
        const authErr = isUnauthorized(this.apiInstance);
        if (authErr) {
            return {error: authErr};
        }

        const resp = await this.api.put("/plugin/release", req).catch(err => err.response);

        if (resp.status == 200) {
            return {};
        }

        return {error: getErrorFromResponse(resp)}
    }

    async GetReadme(req: PluginGetReadmeRequest): Promise<GetPluginReadmeResponse> {
        const resp = await this.api.get(`/plugin/readme/${req.pluginId}`).catch(err => err.response);

        if (resp.status == 200) {
            const response = resp.data as PluginGetReadmeResponse;

            return {response};
        }

        return {error: getErrorFromResponse(resp)}
    }

    async SearchPlugins(req: PluginSearchByNameRequest): Promise<SearchPluginsByNameResponse> {
        const request = {
            params: {
                page: req.page,
                perpage: req.pluginsPerPage,
                limit: req.limit,
                q: req.name
            }
        };

        const resp = await this.api.get(`/plugin/search/`, request).catch(err => err.response);

        if (resp.status == 200) {
            const response = resp.data as PluginSearchByNameResponse;

            return {response};
        }

        return {error: getErrorFromResponse(resp)}
    }
}
/* tslint:disable */
/* eslint-disable */
/**
 * 通用接口
 * 通用接口，针对权限、通用缓存、调度中心
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { RESTfulResultInt32 } from '../models';
import { RESTfulResultListSysUserConfigEntry } from '../models';
import { SysUserConfigEntry } from '../models';
/**
 * ConfigcenterApi - axios parameter creator
 * @export
 */
export const ConfigcenterApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 查找配置
         * @param {string} [userId] 
         * @param {string} [configType] 
         * @param {string} [configField] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConfigcenterConfigGet: async (userId?: string, configType?: string, configField?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/configcenter/config`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            if (userId !== undefined) {
                localVarQueryParameter['UserId'] = userId;
            }

            if (configType !== undefined) {
                localVarQueryParameter['ConfigType'] = configType;
            }

            if (configField !== undefined) {
                localVarQueryParameter['ConfigField'] = configField;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 删除配置项
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConfigcenterConfigIdDelete: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiConfigcenterConfigIdDelete.');
            }
            const localVarPath = `/api/configcenter/config/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 插入配置项
         * @param {SysUserConfigEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConfigcenterConfigPost: async (body?: SysUserConfigEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/configcenter/config`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 更新配置项
         * @param {SysUserConfigEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConfigcenterConfigPut: async (body?: SysUserConfigEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/configcenter/config`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ConfigcenterApi - functional programming interface
 * @export
 */
export const ConfigcenterApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 查找配置
         * @param {string} [userId] 
         * @param {string} [configType] 
         * @param {string} [configField] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConfigcenterConfigGet(userId?: string, configType?: string, configField?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultListSysUserConfigEntry>>> {
            const localVarAxiosArgs = await ConfigcenterApiAxiosParamCreator(configuration).apiConfigcenterConfigGet(userId, configType, configField, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除配置项
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConfigcenterConfigIdDelete(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await ConfigcenterApiAxiosParamCreator(configuration).apiConfigcenterConfigIdDelete(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 插入配置项
         * @param {SysUserConfigEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConfigcenterConfigPost(body?: SysUserConfigEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await ConfigcenterApiAxiosParamCreator(configuration).apiConfigcenterConfigPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 更新配置项
         * @param {SysUserConfigEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConfigcenterConfigPut(body?: SysUserConfigEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await ConfigcenterApiAxiosParamCreator(configuration).apiConfigcenterConfigPut(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ConfigcenterApi - factory interface
 * @export
 */
export const ConfigcenterApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 查找配置
         * @param {string} [userId] 
         * @param {string} [configType] 
         * @param {string} [configField] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConfigcenterConfigGet(userId?: string, configType?: string, configField?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultListSysUserConfigEntry>> {
            return ConfigcenterApiFp(configuration).apiConfigcenterConfigGet(userId, configType, configField, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除配置项
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConfigcenterConfigIdDelete(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return ConfigcenterApiFp(configuration).apiConfigcenterConfigIdDelete(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 插入配置项
         * @param {SysUserConfigEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConfigcenterConfigPost(body?: SysUserConfigEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return ConfigcenterApiFp(configuration).apiConfigcenterConfigPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 更新配置项
         * @param {SysUserConfigEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConfigcenterConfigPut(body?: SysUserConfigEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return ConfigcenterApiFp(configuration).apiConfigcenterConfigPut(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ConfigcenterApi - object-oriented interface
 * @export
 * @class ConfigcenterApi
 * @extends {BaseAPI}
 */
export class ConfigcenterApi extends BaseAPI {
    /**
     * 
     * @summary 查找配置
     * @param {string} [userId] 
     * @param {string} [configType] 
     * @param {string} [configField] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConfigcenterApi
     */
    public async apiConfigcenterConfigGet(userId?: string, configType?: string, configField?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultListSysUserConfigEntry>> {
        return ConfigcenterApiFp(this.configuration).apiConfigcenterConfigGet(userId, configType, configField, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除配置项
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConfigcenterApi
     */
    public async apiConfigcenterConfigIdDelete(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return ConfigcenterApiFp(this.configuration).apiConfigcenterConfigIdDelete(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 插入配置项
     * @param {SysUserConfigEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConfigcenterApi
     */
    public async apiConfigcenterConfigPost(body?: SysUserConfigEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return ConfigcenterApiFp(this.configuration).apiConfigcenterConfigPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 更新配置项
     * @param {SysUserConfigEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConfigcenterApi
     */
    public async apiConfigcenterConfigPut(body?: SysUserConfigEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return ConfigcenterApiFp(this.configuration).apiConfigcenterConfigPut(body, options).then((request) => request(this.axios, this.basePath));
    }
}

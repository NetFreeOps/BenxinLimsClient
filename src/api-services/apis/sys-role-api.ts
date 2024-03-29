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
import { RESTfulResultListSyRoleButtonEntry } from '../models';
import { RESTfulResultListSysRoleDataEntry } from '../models';
import { RESTfulResultListSysRoleMenuEntry } from '../models';
import { RESTfulResultListSysRolesEntry } from '../models';
import { RESTfulResultListSysUserRoleEntry } from '../models';
import { SysRoleMenuEntry } from '../models';
import { SysRolesEntry } from '../models';
/**
 * SysRoleApi - axios parameter creator
 * @export
 */
export const SysRoleApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysRoleRoleButtonRoleidGet: async (roleid: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'roleid' is not null or undefined
            if (roleid === null || roleid === undefined) {
                throw new RequiredError('roleid','Required parameter roleid was null or undefined when calling apiSysRoleRoleButtonRoleidGet.');
            }
            const localVarPath = `/api/sys-role/role-button/{roleid}`
                .replace(`{${"roleid"}}`, encodeURIComponent(String(roleid)));
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
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysRoleRoleDataRoleidGet: async (roleid: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'roleid' is not null or undefined
            if (roleid === null || roleid === undefined) {
                throw new RequiredError('roleid','Required parameter roleid was null or undefined when calling apiSysRoleRoleDataRoleidGet.');
            }
            const localVarPath = `/api/sys-role/role-data/{roleid}`
                .replace(`{${"roleid"}}`, encodeURIComponent(String(roleid)));
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
         * @summary 获取所有角色
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysRoleRoleListGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sys-role/role-list`;
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
         * @param {SysRoleMenuEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysRoleRoleMenuPost: async (body?: SysRoleMenuEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sys-role/role-menu`;
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
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysRoleRoleMenuRoleidGet: async (roleid: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'roleid' is not null or undefined
            if (roleid === null || roleid === undefined) {
                throw new RequiredError('roleid','Required parameter roleid was null or undefined when calling apiSysRoleRoleMenuRoleidGet.');
            }
            const localVarPath = `/api/sys-role/role-menu/{roleid}`
                .replace(`{${"roleid"}}`, encodeURIComponent(String(roleid)));
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
         * @param {SysRolesEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysRoleRolePost: async (body?: SysRolesEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sys-role/role`;
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
         * @param {SysRolesEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysRoleRolePut: async (body?: SysRolesEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sys-role/role`;
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
        /**
         * 
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysRoleRoleRoleidDelete: async (roleid: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'roleid' is not null or undefined
            if (roleid === null || roleid === undefined) {
                throw new RequiredError('roleid','Required parameter roleid was null or undefined when calling apiSysRoleRoleRoleidDelete.');
            }
            const localVarPath = `/api/sys-role/role/{roleid}`
                .replace(`{${"roleid"}}`, encodeURIComponent(String(roleid)));
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
         * @param {number} userid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysRoleUserRoleUseridGet: async (userid: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userid' is not null or undefined
            if (userid === null || userid === undefined) {
                throw new RequiredError('userid','Required parameter userid was null or undefined when calling apiSysRoleUserRoleUseridGet.');
            }
            const localVarPath = `/api/sys-role/user-role/{userid}`
                .replace(`{${"userid"}}`, encodeURIComponent(String(userid)));
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
    }
};

/**
 * SysRoleApi - functional programming interface
 * @export
 */
export const SysRoleApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleButtonRoleidGet(roleid: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultListSyRoleButtonEntry>>> {
            const localVarAxiosArgs = await SysRoleApiAxiosParamCreator(configuration).apiSysRoleRoleButtonRoleidGet(roleid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleDataRoleidGet(roleid: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultListSysRoleDataEntry>>> {
            const localVarAxiosArgs = await SysRoleApiAxiosParamCreator(configuration).apiSysRoleRoleDataRoleidGet(roleid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取所有角色
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleListGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultListSysRolesEntry>>> {
            const localVarAxiosArgs = await SysRoleApiAxiosParamCreator(configuration).apiSysRoleRoleListGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {SysRoleMenuEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleMenuPost(body?: SysRoleMenuEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await SysRoleApiAxiosParamCreator(configuration).apiSysRoleRoleMenuPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleMenuRoleidGet(roleid: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultListSysRoleMenuEntry>>> {
            const localVarAxiosArgs = await SysRoleApiAxiosParamCreator(configuration).apiSysRoleRoleMenuRoleidGet(roleid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {SysRolesEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRolePost(body?: SysRolesEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await SysRoleApiAxiosParamCreator(configuration).apiSysRoleRolePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {SysRolesEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRolePut(body?: SysRolesEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await SysRoleApiAxiosParamCreator(configuration).apiSysRoleRolePut(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleRoleidDelete(roleid: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await SysRoleApiAxiosParamCreator(configuration).apiSysRoleRoleRoleidDelete(roleid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} userid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleUserRoleUseridGet(userid: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultListSysUserRoleEntry>>> {
            const localVarAxiosArgs = await SysRoleApiAxiosParamCreator(configuration).apiSysRoleUserRoleUseridGet(userid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SysRoleApi - factory interface
 * @export
 */
export const SysRoleApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleButtonRoleidGet(roleid: number, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultListSyRoleButtonEntry>> {
            return SysRoleApiFp(configuration).apiSysRoleRoleButtonRoleidGet(roleid, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleDataRoleidGet(roleid: number, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultListSysRoleDataEntry>> {
            return SysRoleApiFp(configuration).apiSysRoleRoleDataRoleidGet(roleid, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取所有角色
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleListGet(options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultListSysRolesEntry>> {
            return SysRoleApiFp(configuration).apiSysRoleRoleListGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {SysRoleMenuEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleMenuPost(body?: SysRoleMenuEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return SysRoleApiFp(configuration).apiSysRoleRoleMenuPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleMenuRoleidGet(roleid: number, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultListSysRoleMenuEntry>> {
            return SysRoleApiFp(configuration).apiSysRoleRoleMenuRoleidGet(roleid, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {SysRolesEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRolePost(body?: SysRolesEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return SysRoleApiFp(configuration).apiSysRoleRolePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {SysRolesEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRolePut(body?: SysRolesEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return SysRoleApiFp(configuration).apiSysRoleRolePut(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} roleid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleRoleRoleidDelete(roleid: number, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return SysRoleApiFp(configuration).apiSysRoleRoleRoleidDelete(roleid, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} userid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysRoleUserRoleUseridGet(userid: number, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultListSysUserRoleEntry>> {
            return SysRoleApiFp(configuration).apiSysRoleUserRoleUseridGet(userid, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SysRoleApi - object-oriented interface
 * @export
 * @class SysRoleApi
 * @extends {BaseAPI}
 */
export class SysRoleApi extends BaseAPI {
    /**
     * 
     * @param {number} roleid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysRoleApi
     */
    public async apiSysRoleRoleButtonRoleidGet(roleid: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultListSyRoleButtonEntry>> {
        return SysRoleApiFp(this.configuration).apiSysRoleRoleButtonRoleidGet(roleid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} roleid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysRoleApi
     */
    public async apiSysRoleRoleDataRoleidGet(roleid: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultListSysRoleDataEntry>> {
        return SysRoleApiFp(this.configuration).apiSysRoleRoleDataRoleidGet(roleid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取所有角色
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysRoleApi
     */
    public async apiSysRoleRoleListGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultListSysRolesEntry>> {
        return SysRoleApiFp(this.configuration).apiSysRoleRoleListGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {SysRoleMenuEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysRoleApi
     */
    public async apiSysRoleRoleMenuPost(body?: SysRoleMenuEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return SysRoleApiFp(this.configuration).apiSysRoleRoleMenuPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} roleid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysRoleApi
     */
    public async apiSysRoleRoleMenuRoleidGet(roleid: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultListSysRoleMenuEntry>> {
        return SysRoleApiFp(this.configuration).apiSysRoleRoleMenuRoleidGet(roleid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {SysRolesEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysRoleApi
     */
    public async apiSysRoleRolePost(body?: SysRolesEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return SysRoleApiFp(this.configuration).apiSysRoleRolePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {SysRolesEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysRoleApi
     */
    public async apiSysRoleRolePut(body?: SysRolesEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return SysRoleApiFp(this.configuration).apiSysRoleRolePut(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} roleid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysRoleApi
     */
    public async apiSysRoleRoleRoleidDelete(roleid: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return SysRoleApiFp(this.configuration).apiSysRoleRoleRoleidDelete(roleid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} userid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysRoleApi
     */
    public async apiSysRoleUserRoleUseridGet(userid: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultListSysUserRoleEntry>> {
        return SysRoleApiFp(this.configuration).apiSysRoleUserRoleUseridGet(userid, options).then((request) => request(this.axios, this.basePath));
    }
}

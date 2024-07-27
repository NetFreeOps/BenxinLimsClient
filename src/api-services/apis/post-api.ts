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
import { PostEntry } from '../models';
import { RESTfulResultInt32 } from '../models';
import { RESTfulResultListUserPostEntry } from '../models';
import { RESTfulResultObject } from '../models';
import { UserPostEntry } from '../models';
/**
 * PostApi - axios parameter creator
 * @export
 */
export const PostApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 删除一条岗位-人员分配，postid取postcode，userid取userid
         * @param {UserPostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPostDelete: async (body?: UserPostEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/post`;
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
         * @summary 删除岗位
         * @param {PostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPostPostDelete: async (body?: PostEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/post/post`;
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
         * @summary 添加岗位
         * @param {PostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPostPostPost: async (body?: PostEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/post/post`;
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
         * @summary 更新岗位信息
         * @param {PostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPostPostPut: async (body?: PostEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/post/post`;
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
         * @summary 根据用户查询用户岗位
         * @param {string} [userId] 
         * @param {string} [userName] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPostPostbyuserGet: async (userId?: string, userName?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/post/postbyuser`;
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
                localVarQueryParameter['user_id'] = userId;
            }

            if (userName !== undefined) {
                localVarQueryParameter['user_name'] = userName;
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
         * @summary 获取所有岗位
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPostPostslistGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/post/postslist`;
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
         * @summary 根据岗位查询岗位用户
         * @param {string} [postId] 
         * @param {string} [postName] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPostUserbypostGet: async (postId?: string, postName?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/post/userbypost`;
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

            if (postId !== undefined) {
                localVarQueryParameter['post_id'] = postId;
            }

            if (postName !== undefined) {
                localVarQueryParameter['post_name'] = postName;
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
         * @summary 添加一条岗位-人员分配，postid取postcode，userid取userid
         * @param {UserPostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPostUserpostPost: async (body?: UserPostEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/post/userpost`;
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
    }
};

/**
 * PostApi - functional programming interface
 * @export
 */
export const PostApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 删除一条岗位-人员分配，postid取postcode，userid取userid
         * @param {UserPostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostDelete(body?: UserPostEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await PostApiAxiosParamCreator(configuration).apiPostDelete(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除岗位
         * @param {PostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostPostDelete(body?: PostEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await PostApiAxiosParamCreator(configuration).apiPostPostDelete(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 添加岗位
         * @param {PostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostPostPost(body?: PostEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await PostApiAxiosParamCreator(configuration).apiPostPostPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 更新岗位信息
         * @param {PostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostPostPut(body?: PostEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await PostApiAxiosParamCreator(configuration).apiPostPostPut(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 根据用户查询用户岗位
         * @param {string} [userId] 
         * @param {string} [userName] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostPostbyuserGet(userId?: string, userName?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultListUserPostEntry>>> {
            const localVarAxiosArgs = await PostApiAxiosParamCreator(configuration).apiPostPostbyuserGet(userId, userName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取所有岗位
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostPostslistGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultObject>>> {
            const localVarAxiosArgs = await PostApiAxiosParamCreator(configuration).apiPostPostslistGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 根据岗位查询岗位用户
         * @param {string} [postId] 
         * @param {string} [postName] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostUserbypostGet(postId?: string, postName?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultListUserPostEntry>>> {
            const localVarAxiosArgs = await PostApiAxiosParamCreator(configuration).apiPostUserbypostGet(postId, postName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 添加一条岗位-人员分配，postid取postcode，userid取userid
         * @param {UserPostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostUserpostPost(body?: UserPostEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await PostApiAxiosParamCreator(configuration).apiPostUserpostPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PostApi - factory interface
 * @export
 */
export const PostApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 删除一条岗位-人员分配，postid取postcode，userid取userid
         * @param {UserPostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostDelete(body?: UserPostEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return PostApiFp(configuration).apiPostDelete(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除岗位
         * @param {PostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostPostDelete(body?: PostEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return PostApiFp(configuration).apiPostPostDelete(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 添加岗位
         * @param {PostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostPostPost(body?: PostEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return PostApiFp(configuration).apiPostPostPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 更新岗位信息
         * @param {PostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostPostPut(body?: PostEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return PostApiFp(configuration).apiPostPostPut(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 根据用户查询用户岗位
         * @param {string} [userId] 
         * @param {string} [userName] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostPostbyuserGet(userId?: string, userName?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultListUserPostEntry>> {
            return PostApiFp(configuration).apiPostPostbyuserGet(userId, userName, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取所有岗位
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostPostslistGet(options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultObject>> {
            return PostApiFp(configuration).apiPostPostslistGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 根据岗位查询岗位用户
         * @param {string} [postId] 
         * @param {string} [postName] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostUserbypostGet(postId?: string, postName?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultListUserPostEntry>> {
            return PostApiFp(configuration).apiPostUserbypostGet(postId, postName, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 添加一条岗位-人员分配，postid取postcode，userid取userid
         * @param {UserPostEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPostUserpostPost(body?: UserPostEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return PostApiFp(configuration).apiPostUserpostPost(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PostApi - object-oriented interface
 * @export
 * @class PostApi
 * @extends {BaseAPI}
 */
export class PostApi extends BaseAPI {
    /**
     * 
     * @summary 删除一条岗位-人员分配，postid取postcode，userid取userid
     * @param {UserPostEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostApi
     */
    public async apiPostDelete(body?: UserPostEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return PostApiFp(this.configuration).apiPostDelete(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除岗位
     * @param {PostEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostApi
     */
    public async apiPostPostDelete(body?: PostEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return PostApiFp(this.configuration).apiPostPostDelete(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 添加岗位
     * @param {PostEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostApi
     */
    public async apiPostPostPost(body?: PostEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return PostApiFp(this.configuration).apiPostPostPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 更新岗位信息
     * @param {PostEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostApi
     */
    public async apiPostPostPut(body?: PostEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return PostApiFp(this.configuration).apiPostPostPut(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 根据用户查询用户岗位
     * @param {string} [userId] 
     * @param {string} [userName] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostApi
     */
    public async apiPostPostbyuserGet(userId?: string, userName?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultListUserPostEntry>> {
        return PostApiFp(this.configuration).apiPostPostbyuserGet(userId, userName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取所有岗位
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostApi
     */
    public async apiPostPostslistGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultObject>> {
        return PostApiFp(this.configuration).apiPostPostslistGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 根据岗位查询岗位用户
     * @param {string} [postId] 
     * @param {string} [postName] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostApi
     */
    public async apiPostUserbypostGet(postId?: string, postName?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultListUserPostEntry>> {
        return PostApiFp(this.configuration).apiPostUserbypostGet(postId, postName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 添加一条岗位-人员分配，postid取postcode，userid取userid
     * @param {UserPostEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostApi
     */
    public async apiPostUserpostPost(body?: UserPostEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return PostApiFp(this.configuration).apiPostUserpostPost(body, options).then((request) => request(this.axios, this.basePath));
    }
}

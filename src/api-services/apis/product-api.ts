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
import { ProductEntry } from '../models';
import { RESTfulResultInt32 } from '../models';
import { RESTfulResultListProductEntry } from '../models';
/**
 * ProductApi - axios parameter creator
 * @export
 */
export const ProductApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 获取所有产品列表
         * @param {number} [id] 自增主键
         * @param {string} [name] 产品名称
         * @param {string} [aliasName] 别名
         * @param {string} [code] 产品代码
         * @param {string} [testListName] 检测单名称
         * @param {number} [active] 是否激活
         * @param {number} [version] 版本
         * @param {string} [description] 描述信息
         * @param {string} [fileLink] 文件链接
         * @param {string} [grade] 等级模板
         * @param {string} [createUser] 
         * @param {Date} [createTime] 
         * @param {string} [changeUser] 
         * @param {Date} [changeTime] 
         * @param {string} [deleted] 0为未删除，1为已删除
         * @param {string} [dataId] 数据权限
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductAllproductGet: async (id?: number, name?: string, aliasName?: string, code?: string, testListName?: string, active?: number, version?: number, description?: string, fileLink?: string, grade?: string, createUser?: string, createTime?: Date, changeUser?: string, changeTime?: Date, deleted?: string, dataId?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/product/allproduct`;
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

            if (id !== undefined) {
                localVarQueryParameter['Id'] = id;
            }

            if (name !== undefined) {
                localVarQueryParameter['Name'] = name;
            }

            if (aliasName !== undefined) {
                localVarQueryParameter['AliasName'] = aliasName;
            }

            if (code !== undefined) {
                localVarQueryParameter['Code'] = code;
            }

            if (testListName !== undefined) {
                localVarQueryParameter['TestListName'] = testListName;
            }

            if (active !== undefined) {
                localVarQueryParameter['Active'] = active;
            }

            if (version !== undefined) {
                localVarQueryParameter['Version'] = version;
            }

            if (description !== undefined) {
                localVarQueryParameter['Description'] = description;
            }

            if (fileLink !== undefined) {
                localVarQueryParameter['FileLink'] = fileLink;
            }

            if (grade !== undefined) {
                localVarQueryParameter['Grade'] = grade;
            }

            if (createUser !== undefined) {
                localVarQueryParameter['CreateUser'] = createUser;
            }

            if (createTime !== undefined) {
                localVarQueryParameter['CreateTime'] = (createTime as any instanceof Date) ?
                    (createTime as any).toISOString() :
                    createTime;
            }

            if (changeUser !== undefined) {
                localVarQueryParameter['ChangeUser'] = changeUser;
            }

            if (changeTime !== undefined) {
                localVarQueryParameter['ChangeTime'] = (changeTime as any instanceof Date) ?
                    (changeTime as any).toISOString() :
                    changeTime;
            }

            if (deleted !== undefined) {
                localVarQueryParameter['Deleted'] = deleted;
            }

            if (dataId !== undefined) {
                localVarQueryParameter['DataId'] = dataId;
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
         * @summary 逻辑删除产品
         * @param {ProductEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductProductDelete: async (body?: ProductEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/product/product`;
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
         * @summary 添加产品
         * @param {ProductEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductProductPost: async (body?: ProductEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/product/product`;
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
         * @summary 更新产品
         * @param {ProductEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductProductPut: async (body?: ProductEntry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/product/product`;
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
 * ProductApi - functional programming interface
 * @export
 */
export const ProductApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 获取所有产品列表
         * @param {number} [id] 自增主键
         * @param {string} [name] 产品名称
         * @param {string} [aliasName] 别名
         * @param {string} [code] 产品代码
         * @param {string} [testListName] 检测单名称
         * @param {number} [active] 是否激活
         * @param {number} [version] 版本
         * @param {string} [description] 描述信息
         * @param {string} [fileLink] 文件链接
         * @param {string} [grade] 等级模板
         * @param {string} [createUser] 
         * @param {Date} [createTime] 
         * @param {string} [changeUser] 
         * @param {Date} [changeTime] 
         * @param {string} [deleted] 0为未删除，1为已删除
         * @param {string} [dataId] 数据权限
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductAllproductGet(id?: number, name?: string, aliasName?: string, code?: string, testListName?: string, active?: number, version?: number, description?: string, fileLink?: string, grade?: string, createUser?: string, createTime?: Date, changeUser?: string, changeTime?: Date, deleted?: string, dataId?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultListProductEntry>>> {
            const localVarAxiosArgs = await ProductApiAxiosParamCreator(configuration).apiProductAllproductGet(id, name, aliasName, code, testListName, active, version, description, fileLink, grade, createUser, createTime, changeUser, changeTime, deleted, dataId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 逻辑删除产品
         * @param {ProductEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductProductDelete(body?: ProductEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await ProductApiAxiosParamCreator(configuration).apiProductProductDelete(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 添加产品
         * @param {ProductEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductProductPost(body?: ProductEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await ProductApiAxiosParamCreator(configuration).apiProductProductPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 更新产品
         * @param {ProductEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductProductPut(body?: ProductEntry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultInt32>>> {
            const localVarAxiosArgs = await ProductApiAxiosParamCreator(configuration).apiProductProductPut(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ProductApi - factory interface
 * @export
 */
export const ProductApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 获取所有产品列表
         * @param {number} [id] 自增主键
         * @param {string} [name] 产品名称
         * @param {string} [aliasName] 别名
         * @param {string} [code] 产品代码
         * @param {string} [testListName] 检测单名称
         * @param {number} [active] 是否激活
         * @param {number} [version] 版本
         * @param {string} [description] 描述信息
         * @param {string} [fileLink] 文件链接
         * @param {string} [grade] 等级模板
         * @param {string} [createUser] 
         * @param {Date} [createTime] 
         * @param {string} [changeUser] 
         * @param {Date} [changeTime] 
         * @param {string} [deleted] 0为未删除，1为已删除
         * @param {string} [dataId] 数据权限
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductAllproductGet(id?: number, name?: string, aliasName?: string, code?: string, testListName?: string, active?: number, version?: number, description?: string, fileLink?: string, grade?: string, createUser?: string, createTime?: Date, changeUser?: string, changeTime?: Date, deleted?: string, dataId?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultListProductEntry>> {
            return ProductApiFp(configuration).apiProductAllproductGet(id, name, aliasName, code, testListName, active, version, description, fileLink, grade, createUser, createTime, changeUser, changeTime, deleted, dataId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 逻辑删除产品
         * @param {ProductEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductProductDelete(body?: ProductEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return ProductApiFp(configuration).apiProductProductDelete(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 添加产品
         * @param {ProductEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductProductPost(body?: ProductEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return ProductApiFp(configuration).apiProductProductPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 更新产品
         * @param {ProductEntry} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductProductPut(body?: ProductEntry, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultInt32>> {
            return ProductApiFp(configuration).apiProductProductPut(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ProductApi - object-oriented interface
 * @export
 * @class ProductApi
 * @extends {BaseAPI}
 */
export class ProductApi extends BaseAPI {
    /**
     * 
     * @summary 获取所有产品列表
     * @param {number} [id] 自增主键
     * @param {string} [name] 产品名称
     * @param {string} [aliasName] 别名
     * @param {string} [code] 产品代码
     * @param {string} [testListName] 检测单名称
     * @param {number} [active] 是否激活
     * @param {number} [version] 版本
     * @param {string} [description] 描述信息
     * @param {string} [fileLink] 文件链接
     * @param {string} [grade] 等级模板
     * @param {string} [createUser] 
     * @param {Date} [createTime] 
     * @param {string} [changeUser] 
     * @param {Date} [changeTime] 
     * @param {string} [deleted] 0为未删除，1为已删除
     * @param {string} [dataId] 数据权限
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductApi
     */
    public async apiProductAllproductGet(id?: number, name?: string, aliasName?: string, code?: string, testListName?: string, active?: number, version?: number, description?: string, fileLink?: string, grade?: string, createUser?: string, createTime?: Date, changeUser?: string, changeTime?: Date, deleted?: string, dataId?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultListProductEntry>> {
        return ProductApiFp(this.configuration).apiProductAllproductGet(id, name, aliasName, code, testListName, active, version, description, fileLink, grade, createUser, createTime, changeUser, changeTime, deleted, dataId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 逻辑删除产品
     * @param {ProductEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductApi
     */
    public async apiProductProductDelete(body?: ProductEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return ProductApiFp(this.configuration).apiProductProductDelete(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 添加产品
     * @param {ProductEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductApi
     */
    public async apiProductProductPost(body?: ProductEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return ProductApiFp(this.configuration).apiProductProductPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 更新产品
     * @param {ProductEntry} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductApi
     */
    public async apiProductProductPut(body?: ProductEntry, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultInt32>> {
        return ProductApiFp(this.configuration).apiProductProductPut(body, options).then((request) => request(this.axios, this.basePath));
    }
}

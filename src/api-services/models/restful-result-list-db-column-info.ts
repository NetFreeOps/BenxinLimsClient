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

import { DbColumnInfo } from './db-column-info';
 /**
 * 
 *
 * @export
 * @interface RESTfulResultListDbColumnInfo
 */
export interface RESTfulResultListDbColumnInfo {

    /**
     * @type {number}
     * @memberof RESTfulResultListDbColumnInfo
     */
    statusCode?: number | null;

    /**
     * @type {Array<DbColumnInfo>}
     * @memberof RESTfulResultListDbColumnInfo
     */
    data?: Array<DbColumnInfo> | null;

    /**
     * @type {boolean}
     * @memberof RESTfulResultListDbColumnInfo
     */
    succeeded?: boolean;

    /**
     * @type {any}
     * @memberof RESTfulResultListDbColumnInfo
     */
    errors?: any | null;

    /**
     * @type {any}
     * @memberof RESTfulResultListDbColumnInfo
     */
    extras?: any | null;

    /**
     * @type {number}
     * @memberof RESTfulResultListDbColumnInfo
     */
    timestamp?: number;
}

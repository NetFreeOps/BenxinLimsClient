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

import { ProductEntry } from './product-entry';
 /**
 * 
 *
 * @export
 * @interface RESTfulResultListProductEntry
 */
export interface RESTfulResultListProductEntry {

    /**
     * @type {number}
     * @memberof RESTfulResultListProductEntry
     */
    statusCode?: number | null;

    /**
     * @type {Array<ProductEntry>}
     * @memberof RESTfulResultListProductEntry
     */
    data?: Array<ProductEntry> | null;

    /**
     * @type {boolean}
     * @memberof RESTfulResultListProductEntry
     */
    succeeded?: boolean;

    /**
     * @type {any}
     * @memberof RESTfulResultListProductEntry
     */
    errors?: any | null;

    /**
     * @type {any}
     * @memberof RESTfulResultListProductEntry
     */
    extras?: any | null;

    /**
     * @type {number}
     * @memberof RESTfulResultListProductEntry
     */
    timestamp?: number;
}

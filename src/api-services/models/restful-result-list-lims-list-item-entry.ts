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

import { LimsListItemEntry } from './lims-list-item-entry';
 /**
 * 
 *
 * @export
 * @interface RESTfulResultListLimsListItemEntry
 */
export interface RESTfulResultListLimsListItemEntry {

    /**
     * @type {number}
     * @memberof RESTfulResultListLimsListItemEntry
     */
    statusCode?: number | null;

    /**
     * @type {Array<LimsListItemEntry>}
     * @memberof RESTfulResultListLimsListItemEntry
     */
    data?: Array<LimsListItemEntry> | null;

    /**
     * @type {boolean}
     * @memberof RESTfulResultListLimsListItemEntry
     */
    succeeded?: boolean;

    /**
     * @type {any}
     * @memberof RESTfulResultListLimsListItemEntry
     */
    errors?: any | null;

    /**
     * @type {any}
     * @memberof RESTfulResultListLimsListItemEntry
     */
    extras?: any | null;

    /**
     * @type {number}
     * @memberof RESTfulResultListLimsListItemEntry
     */
    timestamp?: number;
}
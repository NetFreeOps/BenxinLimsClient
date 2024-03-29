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

import { SysRolesEntry } from './sys-roles-entry';
 /**
 * 
 *
 * @export
 * @interface RESTfulResultListSysRolesEntry
 */
export interface RESTfulResultListSysRolesEntry {

    /**
     * @type {number}
     * @memberof RESTfulResultListSysRolesEntry
     */
    statusCode?: number | null;

    /**
     * @type {Array<SysRolesEntry>}
     * @memberof RESTfulResultListSysRolesEntry
     */
    data?: Array<SysRolesEntry> | null;

    /**
     * @type {boolean}
     * @memberof RESTfulResultListSysRolesEntry
     */
    succeeded?: boolean;

    /**
     * @type {any}
     * @memberof RESTfulResultListSysRolesEntry
     */
    errors?: any | null;

    /**
     * @type {any}
     * @memberof RESTfulResultListSysRolesEntry
     */
    extras?: any | null;

    /**
     * @type {number}
     * @memberof RESTfulResultListSysRolesEntry
     */
    timestamp?: number;
}

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

 /**
 * 
 *
 * @export
 * @interface RESTfulResultListObject
 */
export interface RESTfulResultListObject {

    /**
     * @type {number}
     * @memberof RESTfulResultListObject
     */
    statusCode?: number | null;

    /**
     * @type {Array<any>}
     * @memberof RESTfulResultListObject
     */
    data?: Array<any> | null;

    /**
     * @type {boolean}
     * @memberof RESTfulResultListObject
     */
    succeeded?: boolean;

    /**
     * @type {any}
     * @memberof RESTfulResultListObject
     */
    errors?: any | null;

    /**
     * @type {any}
     * @memberof RESTfulResultListObject
     */
    extras?: any | null;

    /**
     * @type {number}
     * @memberof RESTfulResultListObject
     */
    timestamp?: number;
}

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
 * @interface RESTfulResultInt32
 */
export interface RESTfulResultInt32 {

    /**
     * @type {number}
     * @memberof RESTfulResultInt32
     */
    statusCode?: number | null;

    /**
     * @type {number}
     * @memberof RESTfulResultInt32
     */
    data?: number;

    /**
     * @type {boolean}
     * @memberof RESTfulResultInt32
     */
    succeeded?: boolean;

    /**
     * @type {any}
     * @memberof RESTfulResultInt32
     */
    errors?: any | null;

    /**
     * @type {any}
     * @memberof RESTfulResultInt32
     */
    extras?: any | null;

    /**
     * @type {number}
     * @memberof RESTfulResultInt32
     */
    timestamp?: number;
}

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

import { CustomAttributeData } from './custom-attribute-data';
import { MemberTypes } from './member-types';
import { MethodInfo } from './method-info';
import { Module } from './module';
import { PropertyAttributes } from './property-attributes';
import { Type } from './type';
 /**
 * 
 *
 * @export
 * @interface PropertyInfo
 */
export interface PropertyInfo {

    /**
     * @type {string}
     * @memberof PropertyInfo
     */
    name?: string | null;

    /**
     * @type {Type}
     * @memberof PropertyInfo
     */
    declaringType?: Type;

    /**
     * @type {Type}
     * @memberof PropertyInfo
     */
    reflectedType?: Type;

    /**
     * @type {Module}
     * @memberof PropertyInfo
     */
    module?: Module;

    /**
     * @type {Array<CustomAttributeData>}
     * @memberof PropertyInfo
     */
    customAttributes?: Array<CustomAttributeData> | null;

    /**
     * @type {boolean}
     * @memberof PropertyInfo
     */
    isCollectible?: boolean;

    /**
     * @type {number}
     * @memberof PropertyInfo
     */
    metadataToken?: number;

    /**
     * @type {MemberTypes}
     * @memberof PropertyInfo
     */
    memberType?: MemberTypes;

    /**
     * @type {Type}
     * @memberof PropertyInfo
     */
    propertyType?: Type;

    /**
     * @type {PropertyAttributes}
     * @memberof PropertyInfo
     */
    attributes?: PropertyAttributes;

    /**
     * @type {boolean}
     * @memberof PropertyInfo
     */
    isSpecialName?: boolean;

    /**
     * @type {boolean}
     * @memberof PropertyInfo
     */
    canRead?: boolean;

    /**
     * @type {boolean}
     * @memberof PropertyInfo
     */
    canWrite?: boolean;

    /**
     * @type {MethodInfo}
     * @memberof PropertyInfo
     */
    getMethod?: MethodInfo;

    /**
     * @type {MethodInfo}
     * @memberof PropertyInfo
     */
    setMethod?: MethodInfo;
}
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

import { ConstructorInfo } from './constructor-info';
import { CustomAttributeNamedArgument } from './custom-attribute-named-argument';
import { CustomAttributeTypedArgument } from './custom-attribute-typed-argument';
import { Type } from './type';
 /**
 * 
 *
 * @export
 * @interface CustomAttributeData
 */
export interface CustomAttributeData {

    /**
     * @type {Type}
     * @memberof CustomAttributeData
     */
    attributeType?: Type;

    /**
     * @type {ConstructorInfo}
     * @memberof CustomAttributeData
     */
    constructor?: ConstructorInfo;

    /**
     * @type {Array<CustomAttributeTypedArgument>}
     * @memberof CustomAttributeData
     */
    constructorArguments?: Array<CustomAttributeTypedArgument> | null;

    /**
     * @type {Array<CustomAttributeNamedArgument>}
     * @memberof CustomAttributeData
     */
    namedArguments?: Array<CustomAttributeNamedArgument> | null;
}

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

import { CallingConventions } from './calling-conventions';
import { CustomAttributeData } from './custom-attribute-data';
import { ICustomAttributeProvider } from './icustom-attribute-provider';
import { MemberTypes } from './member-types';
import { MethodAttributes } from './method-attributes';
import { MethodImplAttributes } from './method-impl-attributes';
import { Module } from './module';
import { ParameterInfo } from './parameter-info';
import { RuntimeMethodHandle } from './runtime-method-handle';
import { Type } from './type';
 /**
 * 
 *
 * @export
 * @interface MethodInfo
 */
export interface MethodInfo {

    /**
     * @type {string}
     * @memberof MethodInfo
     */
    name?: string | null;

    /**
     * @type {Type}
     * @memberof MethodInfo
     */
    declaringType?: Type;

    /**
     * @type {Type}
     * @memberof MethodInfo
     */
    reflectedType?: Type;

    /**
     * @type {Module}
     * @memberof MethodInfo
     */
    module?: Module;

    /**
     * @type {Array<CustomAttributeData>}
     * @memberof MethodInfo
     */
    customAttributes?: Array<CustomAttributeData> | null;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isCollectible?: boolean;

    /**
     * @type {number}
     * @memberof MethodInfo
     */
    metadataToken?: number;

    /**
     * @type {MethodAttributes}
     * @memberof MethodInfo
     */
    attributes?: MethodAttributes;

    /**
     * @type {MethodImplAttributes}
     * @memberof MethodInfo
     */
    methodImplementationFlags?: MethodImplAttributes;

    /**
     * @type {CallingConventions}
     * @memberof MethodInfo
     */
    callingConvention?: CallingConventions;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isAbstract?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isConstructor?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isFinal?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isHideBySig?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isSpecialName?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isStatic?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isVirtual?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isAssembly?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isFamily?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isFamilyAndAssembly?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isFamilyOrAssembly?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isPrivate?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isPublic?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isConstructedGenericMethod?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isGenericMethod?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isGenericMethodDefinition?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    containsGenericParameters?: boolean;

    /**
     * @type {RuntimeMethodHandle}
     * @memberof MethodInfo
     */
    methodHandle?: RuntimeMethodHandle;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isSecurityCritical?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isSecuritySafeCritical?: boolean;

    /**
     * @type {boolean}
     * @memberof MethodInfo
     */
    isSecurityTransparent?: boolean;

    /**
     * @type {MemberTypes}
     * @memberof MethodInfo
     */
    memberType?: MemberTypes;

    /**
     * @type {ParameterInfo}
     * @memberof MethodInfo
     */
    returnParameter?: ParameterInfo;

    /**
     * @type {Type}
     * @memberof MethodInfo
     */
    returnType?: Type;

    /**
     * @type {ICustomAttributeProvider}
     * @memberof MethodInfo
     */
    returnTypeCustomAttributes?: ICustomAttributeProvider;
}

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
 * @interface SyRoleButtonEntry
 */
export interface SyRoleButtonEntry {

    /**
     * @type {number}
     * @memberof SyRoleButtonEntry
     */
    id?: number;

    /**
     * 岗位ID
     *
     * @type {number}
     * @memberof SyRoleButtonEntry
     */
    roleId?: number | null;

    /**
     * @type {number}
     * @memberof SyRoleButtonEntry
     */
    buttonId?: number | null;
}
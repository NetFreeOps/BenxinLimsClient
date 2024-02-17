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
 * @interface SysRolesEntry
 */
export interface SysRolesEntry {

    /**
     * @type {string}
     * @memberof SysRolesEntry
     */
    createUser?: string | null;

    /**
     * @type {Date}
     * @memberof SysRolesEntry
     */
    createTime?: Date | null;

    /**
     * @type {string}
     * @memberof SysRolesEntry
     */
    changeUser?: string | null;

    /**
     * @type {Date}
     * @memberof SysRolesEntry
     */
    changeTime?: Date | null;

    /**
     * 0为未删除，1为已删除
     *
     * @type {string}
     * @memberof SysRolesEntry
     */
    deleted?: string | null;

    /**
     * 数据权限
     *
     * @type {string}
     * @memberof SysRolesEntry
     */
    dataId?: string | null;

    /**
     * @type {number}
     * @memberof SysRolesEntry
     */
    id?: number;

    /**
     * @type {string}
     * @memberof SysRolesEntry
     */
    roleCode?: string | null;

    /**
     * @type {string}
     * @memberof SysRolesEntry
     */
    roleName?: string | null;
}

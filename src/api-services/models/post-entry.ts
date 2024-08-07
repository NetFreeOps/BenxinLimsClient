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
 * 岗位表
 *
 * @export
 * @interface PostEntry
 */
export interface PostEntry {

    /**
     * @type {string}
     * @memberof PostEntry
     */
    createUser?: string | null;

    /**
     * @type {Date}
     * @memberof PostEntry
     */
    createTime?: Date | null;

    /**
     * @type {string}
     * @memberof PostEntry
     */
    changeUser?: string | null;

    /**
     * @type {Date}
     * @memberof PostEntry
     */
    changeTime?: Date | null;

    /**
     * 0为未删除，1为已删除
     *
     * @type {string}
     * @memberof PostEntry
     */
    deleted?: string | null;

    /**
     * 数据权限
     *
     * @type {string}
     * @memberof PostEntry
     */
    dataId?: string | null;

    /**
     * @type {number}
     * @memberof PostEntry
     */
    id?: number;

    /**
     * @type {string}
     * @memberof PostEntry
     */
    postName?: string | null;

    /**
     * @type {string}
     * @memberof PostEntry
     */
    postCode?: string | null;

    /**
     * @type {string}
     * @memberof PostEntry
     */
    description?: string | null;

    /**
     * @type {number}
     * @memberof PostEntry
     */
    active?: number;
}

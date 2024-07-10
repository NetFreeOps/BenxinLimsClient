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
 * 检测单数据表
 *
 * @export
 * @interface TestListEntry
 */
export interface TestListEntry {

    /**
     * @type {string}
     * @memberof TestListEntry
     */
    createUser?: string | null;

    /**
     * @type {Date}
     * @memberof TestListEntry
     */
    createTime?: Date | null;

    /**
     * @type {string}
     * @memberof TestListEntry
     */
    changeUser?: string | null;

    /**
     * @type {Date}
     * @memberof TestListEntry
     */
    changeTime?: Date | null;

    /**
     * 0为未删除，1为已删除
     *
     * @type {string}
     * @memberof TestListEntry
     */
    deleted?: string | null;

    /**
     * 数据权限
     *
     * @type {string}
     * @memberof TestListEntry
     */
    dataId?: string | null;

    /**
     * 自增主键
     *
     * @type {number}
     * @memberof TestListEntry
     */
    id?: number;

    /**
     * 不可重复名称
     *
     * @type {string}
     * @memberof TestListEntry
     */
    name?: string | null;

    /**
     * 是否激活   默认值: 1
     *
     * @type {number}
     * @memberof TestListEntry
     */
    active?: number | null;

    /**
     * 检测单类型，对应样品类型（产品类型）
     *
     * @type {string}
     * @memberof TestListEntry
     */
    type?: string | null;

    /**
     * 描述信息
     *
     * @type {string}
     * @memberof TestListEntry
     */
    description?: string | null;

    /**
     * 产品名称
     *
     * @type {string}
     * @memberof TestListEntry
     */
    productName?: string | null;
}
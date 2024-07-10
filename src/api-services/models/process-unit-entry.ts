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
 * 装置实体类
 *
 * @export
 * @interface ProcessUnitEntry
 */
export interface ProcessUnitEntry {

    /**
     * @type {string}
     * @memberof ProcessUnitEntry
     */
    createUser?: string | null;

    /**
     * @type {Date}
     * @memberof ProcessUnitEntry
     */
    createTime?: Date | null;

    /**
     * @type {string}
     * @memberof ProcessUnitEntry
     */
    changeUser?: string | null;

    /**
     * @type {Date}
     * @memberof ProcessUnitEntry
     */
    changeTime?: Date | null;

    /**
     * 0为未删除，1为已删除
     *
     * @type {string}
     * @memberof ProcessUnitEntry
     */
    deleted?: string | null;

    /**
     * 数据权限
     *
     * @type {string}
     * @memberof ProcessUnitEntry
     */
    dataId?: string | null;

    /**
     * 自增主键
     *
     * @type {number}
     * @memberof ProcessUnitEntry
     */
    id?: number;

    /**
     * 父装置ID，没有为0
     *
     * @type {number}
     * @memberof ProcessUnitEntry
     */
    parentId?: number | null;

    /**
     * 装置名
     *
     * @type {string}
     * @memberof ProcessUnitEntry
     */
    name?: string | null;

    /**
     * 装置代码
     *
     * @type {string}
     * @memberof ProcessUnitEntry
     */
    code?: string | null;

    /**
     * 是否激活
     *
     * @type {number}
     * @memberof ProcessUnitEntry
     */
    active?: number | null;

    /**
     * 装置模板
     *
     * @type {string}
     * @memberof ProcessUnitEntry
     */
    template?: string | null;

    /**
     * 别名
     *
     * @type {string}
     * @memberof ProcessUnitEntry
     */
    aliasName?: string | null;

    /**
     * 所属公司
     *
     * @type {string}
     * @memberof ProcessUnitEntry
     */
    workShop?: string | null;

    /**
     * 是否是末端装置
     *
     * @type {number}
     * @memberof ProcessUnitEntry
     */
    isEnd?: number | null;
}
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
* 列表项实体类
*
* @export
* @interface LimsListItemEntry
*/
export interface LimsListItemEntry {

    /**
     * @type {number}
     * @memberof LimsListItemEntry
     */
    id?: number;

    /**
     * lims_list表的主键
     *
     * @type {number}
     * @memberof LimsListItemEntry
     */
    listId?: number;

    /**
     * 显示值
     *
     * @type {string}
     * @memberof LimsListItemEntry
     */
    name?: string | null;

    /**
     * 储存值
     *
     * @type {string}
     * @memberof LimsListItemEntry
     */
    value?: string | null;

    /**
     * 排序
     *
     * @type {number}
     * @memberof LimsListItemEntry
     */
    order?: number | null;
}
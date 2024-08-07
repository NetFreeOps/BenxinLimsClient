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
 * 分析分项实体类
 *
 * @export
 * @interface AnalysisItemEntry
 */
export interface AnalysisItemEntry {

    /**
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    createUser?: string | null;

    /**
     * @type {Date}
     * @memberof AnalysisItemEntry
     */
    createTime?: Date | null;

    /**
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    changeUser?: string | null;

    /**
     * @type {Date}
     * @memberof AnalysisItemEntry
     */
    changeTime?: Date | null;

    /**
     * 0为未删除，1为已删除
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    deleted?: string | null;

    /**
     * 数据权限
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    dataId?: string | null;

    /**
     * 主键
     *
     * @type {number}
     * @memberof AnalysisItemEntry
     */
    id?: number;

    /**
     * 分析表主键
     *
     * @type {number}
     * @memberof AnalysisItemEntry
     */
    analysisId?: number | null;

    /**
     * 分析表分析名
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    analysisName?: string | null;

    /**
     * 名称
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    name?: string | null;

    /**
     * 版本   默认值: 1
     *
     * @type {number}
     * @memberof AnalysisItemEntry
     */
    version?: number | null;

    /**
     * 排序
     *
     * @type {number}
     * @memberof AnalysisItemEntry
     */
    orderNumber?: number | null;

    /**
     * 结果类型
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    resultType?: string | null;

    /**
     * 单位
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    units?: string | null;

    /**
     * 最小值，默认空
     *
     * @type {number}
     * @memberof AnalysisItemEntry
     */
    minValue?: number | null;

    /**
     * 最大值，默认空
     *
     * @type {number}
     * @memberof AnalysisItemEntry
     */
    maxValue?: number | null;

    /**
     * 重复数
     *
     * @type {number}
     * @memberof AnalysisItemEntry
     */
    places?: number | null;

    /**
     * 自动计算
     *
     * @type {number}
     * @memberof AnalysisItemEntry
     */
    autoCalc?: number | null;

    /**
     * 通用名
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    commonName?: string | null;

    /**
     * 可为空
     *
     * @type {number}
     * @memberof AnalysisItemEntry
     */
    nullable?: number | null;

    /**
     * 可报告
     *
     * @type {number}
     * @memberof AnalysisItemEntry
     */
    reportable?: number | null;

    /**
     * 列表型结果列表键
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    listKey?: string | null;

    /**
     * 计算规则，公式
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    calcRule?: string | null;

    /**
     * 通用计算规则，最后生效
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    commonCalcRule?: string | null;

    /**
     * 修约规则
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    roundRule?: string | null;

    /**
     * 组名
     *
     * @type {string}
     * @memberof AnalysisItemEntry
     */
    groupName?: string | null;
}

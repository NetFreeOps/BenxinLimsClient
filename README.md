## 选择器模板

### 描述
通过执行参数，从指定表中选择数据并返回。

### 入参

| 参数名称 | 参数类型 | 参数描述 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- | ---|
| tablename | string | 表名 | 是 | null | |
| select | array | 查询字段 | 是 | id | |
| where | array | 查询条件 | 否 | and | and或or |
| limit | int | 查询数量 | 否 | 10 | 最大值100 |
| order | string | 排序 | 否 | id | |
| sort | string | 排序方式 | 否 | desc | asc或desc |

``
select  查询字段 from 表名 where 查询条件 orrder by 排序字段 排序方式 limit 查询数量
``

### 出参
| 参数名称 | 参数类型 | 参数描述 | 是否必须 | 备注 |
| --- | --- | --- | --- | --- |
| output | array | 返回字段 | 否 | [] | 默认返回全部查询字段，组合成数组，如：['id','name'] |

### 动态表单
Vform，这个地方有点比较难搞，要给用户足够的自由度，但是又不能影响系统，只能做一些限制
1 提供的SQL不能是删除、更新、插入语句
2 提供的SQL不能是select * from 表名
3 提供的SQL不能是select * from 表名 where 1=1




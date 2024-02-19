/* *
* 将平级数据转换为层级数据
* @param {Array} data 平级数据
* @param {String} id 主键
* @param {String} pid 父级主键
* @param {String} children 子级字段
* @param {String} parentKey 根节点主键
* @return {Array} 层级数据

*/
export function toTreeData(data: any[], key: string, parentKey: string, childrenKey: string) {

    const result: any[] = [];
    const map: any = {};
    data.forEach((item) => {
        map[item[key]] = item;
    });
    data.forEach((item) => {
        const parent = map[item[parentKey]];
        if (parent) {
            (parent[childrenKey] || (parent[childrenKey] = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}

// 下载文件
export function handleDownload(res) {
    var blob = new Blob([res.data], { type: 'application/octet-stream;charset=UTF-8' })
    //var blob = res.data
    var contentDisposition = res.headers['content-disposition']
    var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
    var result = patt.exec(contentDisposition)
    var filename = result[1]
    var downloadElement = document.createElement('a')
    var href = window.URL.createObjectURL(blob) // 创建下载的链接
    var reg = /^["](.*)["]$/g
    downloadElement.style.display = 'none'
    downloadElement.href = href
    downloadElement.download = decodeURI(filename.replace(reg, '$1')) // 下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href)
}

/**
 * FormatFileSize to KB、MB、GB
 * @param text is Number
 */

export function FormatFileSize(text) {
    var size = Number(text)
    if (size < 1024) {
        return size + 'KB'

    }
    if (size >= 1024 && size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + 'MB'

    }
    if (size >= 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + 'GB'

    }
}

/** 
 * ScreenFileType
 * @param types is String
 */

export function ScreenFileType(types) {
    var lower = types.toLowerCase()

    //图片类型
    let image = ['jpg', 'jpeg', 'png', 'bmp']
    //音频视频类型
    let video = ['avi', 'mp4', 'rmvb', 'wmv', 'kmv']
    //office类型
    let office = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
    //pdf类型
    let pdf = ['pdf']

    if (image.includes(lower)) {
        return 'image'
    }
    if (video.includes(lower)) {
        return 'video'
    }
    if (office.includes(lower)) {
        return 'office'
    }
    if (lower == 'pdf') {
        return 'pdf'
    }
    return 'other'
}
/** 
 * ScreenFileType
 * @param types is String
 */

export function getBirthDateFromIdCard(idCard) {
    // 获取前14位数字
    const birthday = idCard.substring(6, 14);
    // 将前8位数字按照年月日的格式进行拆分
    const year = birthday.substring(0, 4);
    const month = birthday.substring(4, 6);
    const day = birthday.substring(6, 8);
    // 将拆分后的年月日字符串转换为日期对象
    const date = new Date(year, parseInt(month, 10) - 1, day);
    // 将日期对象转换为指定格式的字符串
    const formattedDate = date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    return formattedDate;
}

export function getNowTime() {
    let now = new Date();

    let year: number = now.getFullYear();
    let month: number = now.getMonth() + 1;
    let day: number = now.getDate();

    let hour: number = now.getHours();
    let minute: number = now.getMinutes();
    let second: number = now.getSeconds();

    const m = month < 10 ? '0' + month : month;
    const d = day < 10 ? '0' + day : day;
    const h = hour < 10 ? '0' + hour : hour;
    const min = minute < 10 ? '0' + minute : minute;
    const s = second < 10 ? '0' + second : second;

    let formatted: string = `${year}-${m}-${d} ${h}:${min}:${s}`;
    return formatted
}


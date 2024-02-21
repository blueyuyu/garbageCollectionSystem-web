/**
 * 
 * @param {object} obj 目标对象
 * @param {object} valueObj 有值的对象
 */
export function setValue(obj, valueObj){
    for (const key in obj) {
        if (valueObj[key] != undefined && valueObj.hasOwnProperty(key)) {
            obj[key] = valueObj[key];
        }
    }
}

/**
 * 置空对象
 * @param {obj} obj 
 */
export function clearObj(obj){
    Object.keys(obj).forEach(item => {
        obj[item] = ''
    })
}

/**
 * 
 * @param {} res 从接口返回出来的字符流
 * @param {*} title 下载出来的标题名字
 */
export function exportExcel(res,title){
    const blob = new Blob([res], { type: "application/vnd.ms-excel" });
    // console.log(res, "who are you");
    // 创建 href 超链接，点击进行下载
    window.URL = window.URL || window.webkitURL;
    const href = URL.createObjectURL(blob);
    const downA = document.createElement("a");
    downA.href = href;
    downA.download = title;
    downA.click();
    // 销毁超连接
    window.URL.revokeObjectURL(href);
}
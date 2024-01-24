/**
 * 
 * @param {object} obj 目标对象
 * @param {object} valueObj 有值的对象
 */
export function setValue(obj, valueObj){
    for (const key in obj) {
        if (valueObj.hasOwnProperty(key)) {
            obj[key] = valueObj[key];
        }
    }
}
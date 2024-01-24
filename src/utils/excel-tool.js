 
/**
 * excel 工具类
 *
 * 基于 js-xlsx 模块对 excel 进行读写
 * 官方文档可参照： https://www.npmjs.com/package/xlsx#acquiring-and-extracting-data
 */
import { utils, read, writeFile } from 'xlsx'
 
/**
 * sheet 表头解析
 * @param sheet{WorkSheet} sheet 对象
 * @returns {String[]} 表头列表
 */
function readHeaders(sheet) {
    const headerNames = []
    // cell address format: { c: 0, r: 2 }  c: column   r: row
    // range format: { s: { c: 0, r: 2 }, e: { c: 1, r: 6 } }  s: start  e: end
    const range = utils.decode_range(sheet['!ref'])
    const firstRowNum = range.s.r
 
    for (let columnNum = range.s.c; columnNum <= range.e.c; columnNum++) {
        const cellAddress = { c: columnNum, r: firstRowNum }
        const cell = sheet[utils.encode_cell(cellAddress)]
        const name = cell && cell.t ? cell.w : `UNKNOWN-${columnNum}`
        headerNames.push(name)
    }
    return headerNames
}
 
/**
 * 读 excel
 * @param file file 对象
 * @returns {Promise<{}>} 返回的对象 { sheetName: {headerNames, dataList}}
 */
export const readFile = async(file) => {
    const ret = {}
    const bufferData = await file.arrayBuffer()
    const workBook = read(bufferData)
    for (const sheetName in workBook.Sheets) {
        const sheet = workBook.Sheets[sheetName]
        const headerNames = readHeaders(sheet)
        const dataList = utils.sheet_to_json(sheet)
        ret[sheetName] = { headerNames, dataList }
    }
    return ret
}
 
/**
 * 输出数据到 excel
 * @param dataList {Object[]} 数据列表
 * @param dataKey {String[]} 需要导出的数据对象 key
 * @param firstRowNames {String[]} 表头
 * @param filename {String} 文件名
 */
export const write2File = (dataList, dataKey, firstRowNames, filename) => {
    const workBook = utils.book_new()
    const handledDataList = dataList.map(data => dataKey.map(key => data[key]))
    handledDataList.unshift(firstRowNames)
    const sheet = utils.aoa_to_sheet(handledDataList)
    utils.book_append_sheet(workBook, sheet, filename)
    writeFile(workBook, `${filename}.xlsx`)
}
 
export default {
    readFile,
    write2File
}
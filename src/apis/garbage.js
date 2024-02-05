import { post, get, del } from '@/utils/requestFn'

/**
 * 更新垃圾信息,或者新增
 * @param {string} name
 * @param {string} category
 * @returns 
 */
export const updateGarbageInfo = (garbage) => {
    return post('/garbage', garbage)
}

/**
 * 获取垃圾信息
 * @param {Number} pageNum
 * @param {Number} pageSize
 * @param {string} name
 * @param {string} category
 * @returns 
 */
export const getGarbageList = (pageNum, pageSize = 10, name = '', category = '') => {
    return get('/garbage/page', { pageNum, pageSize, name, category })
}

/**
 * 删除
 * @param {number} id  
 * @returns 
 */
export const deleteGarbageById = (id) => {
    return del(`/garbage/${id}`)
}

/**
 * 导出excel
 * @returns 
 */
export const exportGarbageExcel = () => {
    return get('/garbage/export', '', 'blob')
}

/**
 * 导出excel模板
 * @returns 
 */
export const exportGarbageExcelTemplate = () => {
    return get('/garbage/exportTemplate', '', 'blob')
}


/**
 * 批量删除用户
 */
export const delGarbagesByIds = (ids) => {
    return post('/garbage/del/batch', ids)
}
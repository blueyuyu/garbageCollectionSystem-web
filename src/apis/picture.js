import { post, get, del } from '@/utils/requestFn'

/**
 * 新增图片或者修改
 * @param {string} name
 * @param {string} category
 * @returns 
 */
export const updateFileInfo = (file) => {
    return post('/file', file)
}

/**
 * 获取图片
 * @param {Number} pageNum
 * @param {Number} pageSize
 * @returns 
 */
export const getFileList = (pageNum, pageSize = 10, type) => {
    return get('/file/page/page', { pageNum, pageSize, type})
}

/**
 * 删除
 * @param {number} id  
 * @returns 
 */
export const deleteFileById = (id) => {
    return del(`/file/${id}`)
}

/**
 * 导出excel
 * @returns 
 */
export const exportFileExcel = () => {
    return get('/file/export', '', 'blob')
}

/**
 * 导出excel模板
 * @returns 
 */
export const exportFileExcelTemplate = () => {
    return get('/file/exportTemplate', '', 'blob')
}


/**
 * 批量删除图片
 */
export const delFilesByIds = (ids) => {
    return post('/file/del/batch', ids)
}
import { post, get, del } from '@/utils/requestFn'

/**
 * 新增或者修改文章表
 * @param data{
 * id,
 * name,
 * description
 * }
 */
export const updateArticleInfo = (Article) => {
    return post('/article', Article)
}

/**
 * 获取全部文章
 */
export const getAllArticleList = () => {
    return get('/article')
}

/**
 * 分页获取文章
 */
export const getArticleList = (pageNum, pageSize, title, type, status) => {
    return get('/article/page', {
        pageNum,
        pageSize,
        title,
        type,
        status
    })
}

/**
* 删除文章
*/
export const deleteArticleById = (id) => {
    return del(`/article/${id}`)
}

/**
* 批量删除文章
*/
export const deleteArticleByIds = (ids) => {
    return post(`/article/del/batch`, ids)
}

/**
 * 通过id获取文章
 */
export const getArticleById = (id) => {
    return get(`/article/${id}`)
}

/**
 * 上传文件
 */
export const uploadFile = (formdate) => {
    return post(`/file/upload`, formdate)
}
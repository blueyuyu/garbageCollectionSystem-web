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
export const getArticleList = () => {
    return get('/article')
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
 * 上传文件
 */
export const uploadFile = (formdate) => {
    return post(`/file/upload`,formdate)
}
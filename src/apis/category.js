import { post, get, del } from '@/utils/requestFn'

/**
 * 更新分类信息,或者新增
 * @param {*} category
 * @param {*} name
 * @param {*} description
 * @param {*} method
 * @returns 
 */
export const updateCategoryInfo = (category) => {
    return post('/category', category)
}

/**
 * 获取分类信息
 * @param {Number} pageNum
 * @param {Number} pageSize
 * @returns 
 */
export const getCategoryList = (pageNum, pageSize = 10) => {
    return get('/category/page', { pageNum, pageSize})
}

/**
 * 
 * @param {number} id  
 * @returns 
 */
export const deleteCategoryById = (id) => {
    return del(`/category/${id}`)
}

/**
 * 导出excel
 * @returns 
 */
export const exportCategoryExcel = () => {
    return get('/category/export', '', 'blob')
}

/**
 * 批量删除分类
 */
export const delCategorysByIds = (ids) => {
    return post('/category/del/batch', ids)
}

/**
 * 角色权限表
 */
export const getRoleList = () => {
    return get('/role')
}

/**
 * 新增或者修改角色表
 * @param data{
 * id,
 * name,
 * description
 * }
 */
export const updateRoleInfo = (role) => {
    return post('/role', role)
}

/**
 * 获取全部菜单
 */
export const getMenu = ()=>{
    return get('/menu')
}

/**
 * 角色权限分配
 * @param {Int} id 角色id
 * @param {Arraylist[number]} menulist 
 * @returns 
 */
export const setRoleMenu = (id, menulist) => {
    return post(`/role/roleMenu/${id}`, menulist)
}

/**
 * 获取角色分配权限
 * @param {int} id 角色id 
 * @returns 
 */
export const getRoleMenu = (id) => {
    return get(`/role/roleMenu/${id}`)
}

/**
* 删除角色
*/
export const deleteRoleById = (id) => {
    return del(`/role/${id}`)
}

/**
* 批量删除角色
*/
export const deleteRoleByIds = (ids) => {
    return post(`/role/del/batch`,ids)
}

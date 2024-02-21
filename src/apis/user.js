import { post, get, del } from '@/utils/requestFn'

/**
 * 更新用户信息,或者新增
 * @param {*} username 
 * @param {*} nickname
 * @param {*} email
 * @param {*} phone
 * @param {*} address
 * * @param {*} role
 * @returns 
 */
export const updateUserInfo = (user) => {
    return post('/user', user)
}

/**
 * 获取用户信息
 * @param {Number} pageNum
 * @param {Number} pageSize
 * @param {string} username
 * @param {string} address
 * @param {string} email
 * @returns 
 */
export const getUserList = (pageNum, pageSize = 10, username = '', address = '', email = '') => {
    return get('/user/page', { pageNum, pageSize, username, address, email })
}

/**
 * 
 * @param {number} id  
 * @returns 
 */
export const deleteUserById = (id) => {
    return del(`/user/${id}`)
}

/**
 * 导出excel
 * @returns 
 */
export const exportUserExcel = () => {
    return get('/user/export', '', 'blob')
}

/**
 * 批量删除用户
 */
export const delUsersByIds = (ids) => {
    return post('/user/del/batch', ids)
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

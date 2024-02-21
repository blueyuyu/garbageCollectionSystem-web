import { post, get, del } from '@/utils/requestFn'

/**
 * 新增或者修改菜单表
 * @param data{
 * id,
 * name,
 * description
 * }
 */
export const updateMenuInfo = (Menu) => {
    return post('/menu', Menu)
}

/**
 * 获取全部菜单
 */
export const getMenuList = ()=>{
    return get('/menu')
}


/**
* 删除菜单
*/
export const deleteMenuById = (id) => {
    return del(`/Menu/${id}`)
}

/**
* 批量删除菜单
*/
export const deleteMenuByIds = (ids) => {
    return post(`/Menu/del/batch`,ids)
}
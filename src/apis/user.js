import { post, get, del } from '@/utils/requestFn'

/**
 * 更新用户信息,或者新增
 * @param {*} username 
 * @param {*} nickname
 * @param {*} email
 * @param {*} phone
 * @param {*} address
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
    return get('/user/export','' ,'blob')
}


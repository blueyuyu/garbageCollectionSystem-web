import { post, get, del } from '@/utils/requestFn'


export const userlogin = (username, password) => {
    return post('/businessuser/login', { username, password })
}

/**
 * 用户注册
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
export const userRegister = (username, password) => {
    return post('/businessuser/register', { username, password }, true)
}

/**
 * 更新用户信息,或者新增
 * @param {*} username 
 * @param {*} nickname
 * @param {*} introduction
 * @param {*} password
 * @param {*} gender
 * * @param {*} avartarUrl
 * @returns 
 */
export const updateUserInfo = (user) => {
    return post('/businessuser', user)
}

/**
 * 
 * @param {*} id 
 * @param {*} oldPassword 旧密码 新密码
 * @param {*} newPassword 
 * @returns 
 */
export const changePwd = (data) => {
    return post('/businessuser/changePassword', data)
}


export const GetUserInfoByid = (id) => {
    return get(`/businessuser/${id}`)
}
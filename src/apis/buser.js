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
    return post('/businessuser/register', { username, password },true)
}
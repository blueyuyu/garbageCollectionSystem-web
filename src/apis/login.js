import { post } from '@/utils/requestFn'

export const loginAdmin = (username, password) => {
    return post('/user/login', { username, password })
}
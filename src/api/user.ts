import request from '~/service/http'
import type { DefineUser, Login, QueryUserList } from './types'

//登陆
export const login = (data: Login) => request('get', '/adminLogin', data)
//查看用户列表
export const queryUserList = (data: QueryUserList) => request('get', '/admin/user/queryUser', data)
//封禁用户
export const defineUser = (data: DefineUser) => request('get', '/admin/user/defineUser', data)
//解封用户
export const nDefineUser = (userId: number) => request('get', `/admin/user/unDefineUser?userId=${userId}`)

/**   
 * api接口统一管理
 */
import { get, post } from '@/request/http.js'

export const login = p => get('/backend/sys/login', p);//登陆
export const logout = p => get('/backend/sys/out', p);//登出

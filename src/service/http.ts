import type { Method, AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { baseUrl } from '~/config/baseUrl'
import router from '~/router'

const service = axios.create({
  baseURL: baseUrl,
  timeout: 60000, // 请求超时时间1分钟
  responseType: 'json',
  validateStatus: (status) => status === 200 || status === 401 || status === 403,
})

//请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers.token = useStore.token.value //添加token
      config.timeout = 6000
    }
    return config
  },

  (error) => {
    Message.error('请求失败')
    return Promise.reject(error)
  },
)

//响应拦截器配置
service.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      Message.info('身份已过期请重新登陆')
      useStore.token.value = ''
      router.push('/login')
    }
    return Promise.resolve(res.data)
  },

  (error: AxiosError) => {
    if (error.response) {
      Message.error(`请求错误: 状态码${error.response.status}`)
    } else if (error.request) {
      Message.error(`请求未响应:${error.request}`)
    } else {
      Message.error(`请求错误：${error.message}`)
    }
    return Promise.resolve({ code: 500, message: '服务器发生错误' })
  },
)

interface ResData<T> {
  code: number
  data: T
  message: string
}
const request = <T = any>(method: Method, url: string, data?: object, config?: AxiosRequestConfig) => {
  return service.request<T, ResData<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data,
    ...config,
  })
}

export default request

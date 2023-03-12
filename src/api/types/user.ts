export interface Login {
  /** 用户id */
  userid: string
  /** openid */
  openid: string
}

export interface QueryUserList {
  /** 第几页,示例值 */
  current?: number
  /** 每页几条,示例值(5) */
  size?: number
  /** 每页几条,示例值(5) */
  status?: boolean
  /** 注册开始区间 */
  startTime?: number
  /** 注册结束区间 */
  endTime?: number
}

export interface DefineUser {
  /** 用户id */
  userId: number | string
  /** 拉黑原因 */
  reason: string
}

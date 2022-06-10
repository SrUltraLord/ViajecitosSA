export interface BaseResponse<T> {
  ok: boolean
  message?: string
  statusCode?: string
  status: number
  data?: T
}

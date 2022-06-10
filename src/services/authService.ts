import { User } from './../model/User'
import { BaseResponse } from './../model/BaseResponse'
import { authApi } from '../api/authApi'

export type UserResponse = BaseResponse<User>

export async function loginWithNui(nui: string): Promise<User | undefined> {
  const response = await authApi.put<UserResponse>('', { nui })
  return response.data.data
}

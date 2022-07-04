import { MessageResponse } from './../model/MessageResponse'
import { RegisterUser } from './../model/RegisterUser'
import { User } from './../model/User'
import { BaseResponse } from './../model/BaseResponse'
import { userApi } from '../api/userApi'

export type UserResponse = BaseResponse<User>

export async function loginWithEmailAndPassword(
  email: string,
  password: string,
): Promise<UserResponse> {
  const response = await userApi.put<UserResponse>('/login', {
    email,
    password,
  })

  return response.data
}

export async function registerUser(
  newUser: RegisterUser,
): Promise<MessageResponse> {
  const response = await userApi.post<MessageResponse>('/register', newUser)
  return response.data
}

export default {
  loginWithEmailAndPassword,
  registerUser,
}

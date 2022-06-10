import { BaseResponse } from './../model/BaseResponse'
import { ticketApi } from '../api/ticketApi'
import { Ticket } from '../model/Ticket'

export type UserTicketsResponse = BaseResponse<Ticket[]>
export type NewTicketResponse = BaseResponse<null>

export async function getTicketsByUserNui(nui: string) {
  const response = await ticketApi.get<UserTicketsResponse>(`/user/${nui}`)

  return response.data.data
}

export async function buyTicket(userId: number, flightId: number) {
  const response = await ticketApi.post<NewTicketResponse>('/buy', {
    userId,
    flightId,
  })

  return response.data
}

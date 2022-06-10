import { flightApi } from '../api/flightApi'
import { BaseResponse } from './../model/BaseResponse'
import { Flight } from './../model/Flight'

export type FlightSearchResponse = BaseResponse<Flight>

export async function searchFlight(
  cityOrigin: string,
  cityDestination: string,
  dateFrom: string,
  dateTo: string,
): Promise<Flight | undefined> {
  console.log({ cityOrigin, cityDestination, dateFrom, dateTo })
  const response = await flightApi.get<FlightSearchResponse>('/search', {
    params: {
      cityOrigin,
      cityDestination,
      dateFrom,
      dateTo,
    },
  })

  return response.data.data
}

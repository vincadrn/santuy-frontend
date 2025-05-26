import { AxiosResponse } from 'axios';
import { api } from '../services/api';

export type Itinerary = {
  itinerary_id: number,
  date: string,
}

export type ItineraryDetail = {
  detail_id: number,
  start_time: string,
  end_time: string,
  activity: string,
}

export const listItineraries = async () => api.get<Itinerary[]>('/v1/itineraries');
export const listItineraryDetails = async (itineraryId: number) => api.get<ItineraryDetail[]>(`/v1/itineraries/${itineraryId}/details`);

import axios, { AxiosResponse } from 'axios';
import { api } from './api';

export type PictureResponse = {
  picture_uri: string,
};

export type AllPicturesResponse = {
  itinerary_id: string,
  pictures: PictureResponse[],
}

export type PictureRequest = {
  format: string,
}

export const listAllPictures = async () => api.get<AllPicturesResponse>('/v1/pictures');
export const listPictures = async (itineraryId: number) => api.get<PictureResponse[]>(`/v1/itineraries/${itineraryId}/pictures`)
export const uploadPicture = async (itineraryId: number, format: string) => api.post<PictureResponse, AxiosResponse<PictureResponse>, PictureRequest>(`/v1/itineraries/${itineraryId}/picture`, { format: format })

export const doUpload = async (uri: string, file: File) => axios.put(uri, file, {
  headers: {
    'Content-Type': file.type || 'text/html',
  }
})

import { DefaultError, UseMutateAsyncFunction, useMutation, useQuery } from "@tanstack/react-query";
import { AllPicturesResponse, doUpload, listAllPictures, listPictures, PictureRequest, PictureResponse, uploadPicture } from "../../services/mediaService";
import { AxiosResponse } from "axios";

type Pictures = {
  data: AxiosResponse<PictureResponse[], any> | undefined,
  status: 'error' | 'success' | 'pending',
  isFetching: boolean,
}

type AllPictures = {
  data: AxiosResponse<AllPicturesResponse, any> | undefined,
  status: 'error' | 'success' | 'pending',
  isFetching: boolean,
}

type PostPicture = {
  mutateAsync: UseMutateAsyncFunction<AxiosResponse<any, any>, Error, File, unknown>,
  status: 'error' | 'success' | 'pending' | 'idle',
}

type TypeName = 'all' | 'itinerary' | 'upload';

type ReturnType<T> = 
  T extends 'all' ? AllPictures :
  T extends 'itinerary' ? Pictures :
  T extends 'upload' ? PostPicture :
  never;

const fetchAllPictures: () => AllPictures = () => {
  const { data: data, status: status, isFetching: isFetching } = useQuery({
    queryKey: ['pictures'],
    queryFn: listAllPictures,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  return { data, status, isFetching };
}

const fetchPictures: (id: number) => Pictures = (id: number) => {
  const { data: data, status: status, isFetching: isFetching } = useQuery({
    queryKey: ['pictures'],
    queryFn: () => listPictures(id),
    retry: 2,
    staleTime: 0,
    enabled: !!id,
  });

  return { data, status, isFetching };
}

const postPicture = (id: number) => {
  const { mutateAsync: mutateAsync, status: status } = useMutation({
    mutationFn: async (file: File) => {
      const extension = file.name.split('.').pop()?.toLowerCase();

      if (!extension) throw new Error('No file extension');

      const uri = await uploadPicture(id, extension)
        .then(response => response.data.picture_uri);

      return doUpload(uri, file);
    },
  });

  return { mutateAsync, status };
}

export default function usePicture<T extends TypeName>(type: T, id: number): ReturnType<T> {
  switch (type) {
    case 'all':
      return fetchAllPictures() as ReturnType<T>;

    case 'itinerary':
      return fetchPictures(id) as ReturnType<T>;

    case 'upload':
      if (id) return postPicture(id) as ReturnType<T>;

    default:
      throw new Error("Type unknown for usePicture or ID left unspecified");
  }
}

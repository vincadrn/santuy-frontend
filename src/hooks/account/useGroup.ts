import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { GroupRequest, listGroupRoles, setCurrentUserToGroup } from '../../services/accountService';
import { AxiosResponse } from 'axios';

export default function useGroup() {
  const { mutateAsync: mutateAsync, status: status } = useMutation<AxiosResponse, DefaultError, GroupRequest>({
    mutationFn: setCurrentUserToGroup,
  });

  return { mutateAsync, status };
}

export function useGroupRole() {
  const { data: data, status: status, isFetching: isFetching } = useQuery({
    queryKey: ['groupRole'],
    queryFn: listGroupRoles,
    retry: 2,
    retryDelay: attempt => attempt * 500,
    staleTime: 1 * 60 * 1000,
  });

  return { data, status, isFetching };
}

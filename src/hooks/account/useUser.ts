import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/accountService';

export default function useUser() {
  const { data: data, status: status, isFetching: isFetching } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: 2,
    retryDelay: attempt => attempt * 500,
    staleTime: 1 * 60 * 1000,
  });

  return { data, status, isFetching };
}

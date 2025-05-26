import { useQuery } from "@tanstack/react-query";
import { requestSession } from "../../services/authService";

export function useSession(redirectUri: string) {
  const { data: data, status: status } = useQuery({
    queryKey: ['session'],
    queryFn: () => requestSession(redirectUri),
    enabled: !!redirectUri,
  });

  return { data, status };
}

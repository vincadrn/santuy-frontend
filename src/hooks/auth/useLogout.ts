import { useQuery } from "@tanstack/react-query";
import { clearSession } from "../../services/authService";

export default function useLogout() {
  const { data: data, status: status } = useQuery({
    queryKey: ['userLogout'],
    queryFn: clearSession,
  });

  return { data, status };
}

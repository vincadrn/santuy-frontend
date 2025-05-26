import { useMutation } from '@tanstack/react-query';
import { requestLogin } from '../../services/authService';
import { AxiosResponse, HttpStatusCode } from 'axios';

type LoginResponse = {
  status: number;
  oauth_url: string;
}

export function useLogin() {
  const defaultOnSuccess = (response: AxiosResponse<LoginResponse>) => {
    if (response.status !== HttpStatusCode.Ok) {
      console.error("Error logging in.");
      return;
    }

    window.location.href = response.data.oauth_url;
  };

  const { mutateAsync: executeLogin, status: status } = useMutation({
    mutationFn: requestLogin,
    onSuccess: defaultOnSuccess,
    onError: () => alert("Login failed."),
  });

  return { executeLogin, status }
}

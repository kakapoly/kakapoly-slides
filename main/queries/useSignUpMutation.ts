import { signUp } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useLogInMutation from "./useLogInMutation";

export default function useSignUpMutation() {
  const { mutate: logIn } = useLogInMutation();

  return useMutation(signUp, {
    onSuccess: async (data, credentials) => {
      await logIn(credentials);
    },
    onError: (error: AxiosError<{ message: string; statusCode: number }>) => {
      window.alert(error?.response?.data.message);
    },
  });
}

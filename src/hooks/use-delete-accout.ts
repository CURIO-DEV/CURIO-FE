import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "@/apis/delete-account";

export const useDeleteAccount = () =>
  useMutation({
    mutationFn: deleteAccount,
  });

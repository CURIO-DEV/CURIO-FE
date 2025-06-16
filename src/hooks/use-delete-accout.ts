"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteAccount } from "@/apis/delete-account";
import { useLoginStore } from "@/stores/use-login";
import { useUserStore } from "@/stores/use-user-store";

export const useDeleteAccount = () => {
  const router = useRouter();
  const qc = useQueryClient();
  const setIsLogin = useLoginStore((s) => s.setIsLogin);
  const clearProfile = useUserStore((s) => s.clearProfile);

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: (res) => {
      setIsLogin(false);
      clearProfile();
      qc.clear();

      toast.success(res.message);
      router.replace("/");
    },
    onError: () => toast.error("탈퇴 요청에 실패했습니다. 다시 시도해 주세요."),
  });
};

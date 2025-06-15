import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserSettings,
  patchUserSettings,
  UserCustomSettings,
} from "@/apis/setting";

export const useUserSettings = () =>
  useQuery<UserCustomSettings>({
    queryKey: ["userSettings"],
    queryFn: getUserSettings,
    staleTime: 1000 * 60 * 5,
  });

export const useUpdateUserSettings = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: patchUserSettings,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userSettings"] }),
  });
};

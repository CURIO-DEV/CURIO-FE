import { CURIO_GO_OPTION } from "@/apis/curio-go/curio-go-queries";
import { useQuery } from "@tanstack/react-query";

export const useGetCurioGo = () => {
  return useQuery(CURIO_GO_OPTION.CURIO_GO());
};

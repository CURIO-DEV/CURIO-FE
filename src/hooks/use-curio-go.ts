import { CURIO_GO_OPTION } from "@/apis/curio-go/curio-go-queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetCurioGo = () => {
  return useSuspenseQuery(CURIO_GO_OPTION.CURIO_GO());
};

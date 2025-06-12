import { queryOptions } from "@tanstack/react-query";
import { GetCurioGo } from "./curio-go";

export const CURIO_GO_KEY = {
  CUIRO_GO: () => ["curio-go"],
} as const;

export const CURIO_GO_OPTION = {
  CURIO_GO: () =>
    queryOptions({
      queryKey: CURIO_GO_KEY.CUIRO_GO(),
      queryFn: () => GetCurioGo(),
    }),
};

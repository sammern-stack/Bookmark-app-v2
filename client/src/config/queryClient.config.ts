import type { QueryClientConfig } from "@tanstack/react-query";

const STALE_TIME_MINS = 5;
const STALE_TIME_MILLISECONDS = STALE_TIME_MINS * 60 * 1000;

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME_MILLISECONDS,
    },
  },
};

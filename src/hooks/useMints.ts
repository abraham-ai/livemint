import useSWR from "swr";
import { fetcher } from "util/fetcher";

const useMints = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/mints",
    fetcher
  );

  return {
    mints: data?.livemints,
    isLoading,
    error: data?.error,
    mutate,
  };
};

export default useMints;
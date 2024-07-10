import useSWR from "swr";

type SWRRequest = {
  key: string
  dataName: string
  fetcher: (...args: any) => any
  fallbackData?: any
}

const useMultipleSWR = <T>(requests: SWRRequest[]) => {
  const results = requests.map(({key, dataName, fetcher, fallbackData}) => ({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ...useSWR(key, fetcher, {fallbackData}),
    dataName,
  }));

  const isLoading = results.some(result => result.isLoading);
  const error = results.find(result => result.error)?.error;
  const data = Object.fromEntries(results.map(({dataName, data}) => ([dataName, data]))) as T
  const mutate = Object.fromEntries(results.map(({dataName, mutate}) => ([dataName, mutate])))
  const isValidating = results.some(result => result.isValidating);

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};

export default useMultipleSWR
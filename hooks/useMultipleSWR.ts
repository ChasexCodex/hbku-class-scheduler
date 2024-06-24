import useSWR from "swr";

type SWRRequest = {
  key: string
  dataName: string
  fetcher: (...args: any) => any
}

const useMultipleSWR = (requests: SWRRequest[]) => {
  const results = requests.map(({key, dataName, fetcher}) => ({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ...useSWR(key, fetcher),
    dataName,
  }));

  const isLoading = results.some(result => result.isLoading);
  const error = results.find(result => result.error)?.error;
  const data = Object.fromEntries(results.map(({dataName, data}) => ([dataName, data])))


  return {
    data,
    error,
    isLoading,
  };
};

export default useMultipleSWR
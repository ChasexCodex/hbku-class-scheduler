import useSWR from 'swr'

type SWRRequest = {
  key: string
  dataName: string
  fetcher: (...args: any) => any
}

const useMultipleSWR = <T>(requests: SWRRequest[]) => {
  const results = requests.map(({key, dataName, fetcher}) => ({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ...useSWR(key, fetcher),
    dataName,
  }))

  const data = Object.fromEntries(results.map(({dataName, data}) => ([dataName, data]))) as T
  const mutate = Object.fromEntries(results.map(({dataName, mutate}) => ([dataName, mutate])))

  return {
    data,
    mutate,
  }
}

export default useMultipleSWR
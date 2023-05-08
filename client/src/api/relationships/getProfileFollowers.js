import axios from '../axios'
import { useQuery } from '@tanstack/react-query'

const getFollowers = async (profileId) => {
  const res = await axios.get(`/api/relationships?profileId=${profileId}`)
  return res.data
}

const useGetFollowers = (profileId) => {
  return useQuery({
    queryKey: ['follows', profileId],
    queryFn: () => getFollowers(profileId),
  })
}

export default useGetFollowers

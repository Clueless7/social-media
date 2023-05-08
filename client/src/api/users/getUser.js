import { useQuery } from '@tanstack/react-query'
import axios from '../axios'

const getUser = async (profileId) => {
  const res = await axios.get(`/api/users?profileId=${profileId}`)
  return res.data
}

const useGetUser = (profileId) => {
  return useQuery({
    queryKey: ['users', profileId],
    queryFn: () => getUser(profileId),
  })
}

export default useGetUser

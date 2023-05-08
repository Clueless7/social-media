import axios from '../axios'
import { useQuery } from '@tanstack/react-query'

const getLikes = async (postId) => {
  const res = await axios.get(`/api/likes?postId=${postId}`)
  return res.data
}

const useGetLikes = (postId) => {
  return useQuery({
    queryKey: ['likes', postId],
    queryFn: () => getLikes(postId),
  })
}

export default useGetLikes

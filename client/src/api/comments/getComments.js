import axios from '../axios'
import { useQuery } from '@tanstack/react-query'

const getComments = async (postId) => {
  const res = await axios.get(`/api/comments?postId=${postId}`)
  return res.data
}

const useGetComments = (postId) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
  })
}

export default useGetComments

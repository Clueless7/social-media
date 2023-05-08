import axios from '../axios'
import { useQuery } from '@tanstack/react-query'

const getPosts = async () => {
  const res = await axios.get('/api/posts')
  return res.data
}

const useGetPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })
}

export default useGetPosts

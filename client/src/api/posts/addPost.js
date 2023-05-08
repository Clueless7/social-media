import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'

const addPost = async (inputs) => {
  const res = await axios.post('/api/posts', inputs)
  return res.data
}

const useAddPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['posts'],
    mutationFn: (inputs) => addPost(inputs),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })
}

export default useAddPost

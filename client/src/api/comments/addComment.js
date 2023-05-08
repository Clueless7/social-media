import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'

const addComment = async (postId, inputs) => {
  const res = await axios.post(`/api/comments?postId=${postId}`, inputs)
  return res.data
}

const useAddComment = (postId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['comments', postId],
    mutationFn: ({ postId, inputs }) => addComment(postId, inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['comments', postId] }),
  })
}

export default useAddComment

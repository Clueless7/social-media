import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'

const addLike = async (postId) => {
  const res = await axios.post(`/api/likes?postId=${postId}`)
  return res.data
}

const deleteLike = async (postId) => {
  const res = await axios.delete(`/api/likes?postId=${postId}`)
  return res.data
}

const useHandleLike = (postId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['likes', postId],
    mutationFn: (liked) => {
      if (liked) return deleteLike(postId)
      return addLike(postId)
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['likes', postId] }),
  })
}

export default useHandleLike

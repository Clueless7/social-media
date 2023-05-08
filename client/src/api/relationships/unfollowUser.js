import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'

const unfollowUser = async (profileId, inputs) => {
  const res = await axios.delete(
    `/api/relationships?profileId=${profileId}`,
    inputs
  )
  return res.data
}

const useUnfollowUser = (profileId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['follows', profileId],
    mutationFn: ({ profileId }) => unfollowUser(profileId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['follows', profileId] }),
  })
}

export default useUnfollowUser

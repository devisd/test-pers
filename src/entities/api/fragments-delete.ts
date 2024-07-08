import request from '@/shared/lib/request'

interface ResponseProps {
  status: string
  msg: string
  data: [
    {
      id: number
    },
  ]
}

export const deleteFragments = (id: number[]) => {
  return request<ResponseProps>({
    path: '/fragment/delete_fragments',
    method: 'DELETE',
    body: JSON.stringify(id),
  })
}

import request from '@/shared/lib/request'
import { IFragment } from '../model'

interface RequestProps {
  status: string
  msg: string
  data: IFragment
}

export const updateFragment = ({ name, time, video_id }: IFragment) => {
  const body = { name, time, video_id }

  return request<RequestProps>({
    path: '/fragment/update_fragment',
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

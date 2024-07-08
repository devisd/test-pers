import request from '@/shared/lib/request'
import { IFragment } from '../model'

export const addFragment = ({ name, time, video_id }: IFragment) => {
  const body = { name, time, video_id }

  return request({
    path: '/fragment/add_fragment',
    method: 'POST',
    body: JSON.stringify(body),
  })
}

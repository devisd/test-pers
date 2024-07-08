import request from '@/shared/lib/request'
import type { IFragment } from '../model'

interface FragmentProp {
  status: string
  msg: string
  data: {
    video_id: number
    fragments: IFragment[]
  }
}

export const getFragmentById = (video_id: number) => {
  return request<FragmentProp>({
    path: `/fragment/get_fragments${video_id}`,
  })
}

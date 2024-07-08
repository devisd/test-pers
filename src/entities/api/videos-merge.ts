import request from '@/shared/lib/request'

interface FragmentAddProps {
  data: {
    additionalProp1: string[]
    additionalProp2: string[]
    additionalProp3: string[]
  }
}

interface ResponseProps {
  status: string
  msg: string
  data: string
}

export const mergeVideos = ({ data }: FragmentAddProps) => {
  return request<ResponseProps>({
    path: '/fragment/add_fragment',
    method: 'POST',
    body: JSON.stringify(data),
  })
}

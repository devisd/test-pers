'use server'

import { headers as ServerHeaders } from 'next/headers'
import { API_BASE_URL } from '@/shared/config'
// import { getSession } from '@/shared/lib/auth'
// import { getLocale } from '@/shared/lib/i18n'
import { json, file } from './response'

interface Request extends RequestInit {
  path: string
  auth?: boolean
  type?: 'json' | 'file'
}

interface Response<T> {
  status: number
  error: boolean
  data: T | null
}

const revalidate = Number(process.env.REVALIDATE_TIME ?? '0')

export default async function <T>({
  path,
  cache,
  headers,
  auth = true,
  type = 'json',
  ...props
}: Request): Promise<Response<T>> {
  // const locale = await getLocale()

  const fetchOptions = {
    headers: {
      // 'Accept-Language': locale !== 'ua' ? locale : 'uk',
      'Content-Type': 'application/json',
      'X-Forwarded-For': ServerHeaders().get('X-Forwarded-For'),
      ...headers,
    },
    ...props,
  }

  // setup authorization for fetch
  // if (auth) {
  //   const session = await getSession()
  //   if (session?.token) {
  //     fetchOptions.headers['Authorization'] = `Token ${session.token}`
  //   }
  // }

  // setup cache for response
  if (cache) {
    fetchOptions['cache'] = cache
  } else if (revalidate) {
    fetchOptions['next'] = {
      revalidate,
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, fetchOptions)

  // set response function by type
  const getDataByType = {
    json: json,
    file: file,
  }

  return {
    status: response.status,
    error: !response.ok,
    data: (await getDataByType[type](response)) as T,
  }
}

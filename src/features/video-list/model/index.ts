export type Video = {
  id: number
  img: string
  title: string
  description: string
}

export type VideoListProps = {
  videosData: Video[]
  title: string
  isReady: boolean
}

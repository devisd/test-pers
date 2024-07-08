import { ChangeEvent } from 'react'

interface VideoUploaderProps {
  onUpload: (file: File) => void
  isMultiple?: boolean
  className?: string
}

export const VideoUploader = ({ onUpload, isMultiple = false, className }: VideoUploaderProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <input
      type="file"
      accept="video/*"
      onChange={handleFileChange}
      multiple={isMultiple}
      className={className ? className : 'hidden'}
    />
  )
}

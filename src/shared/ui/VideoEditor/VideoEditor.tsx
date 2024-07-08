// components/VideoEditor.tsx
import React, { useState, useEffect } from 'react'
import { createFFmpeg, FFmpeg } from '@ffmpeg/ffmpeg'
import Button from '../Button'

const ffmpeg: FFmpeg = createFFmpeg({ log: true })

interface VideoSegment {
  url: string
  start: string
  end: string
}

interface VideoEditorProps {
  videoFile: File
}

export const VideoEditor: React.FC<VideoEditorProps> = ({ videoFile }) => {
  const [isReady, setIsReady] = useState(false)
  const [segments, setSegments] = useState<VideoSegment[]>([])
  const [output, setOutput] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      await ffmpeg.load()
      setIsReady(true)
    }
    load()
  }, [])

  const handleCut = async (start: string, end: string) => {
    if (!isReady) return
    const inputName = 'input.mp4'
    const outputName = `output${segments.length}.mp4`

    ffmpeg.FS('writeFile', inputName, await fetchFile(videoFile))

    await ffmpeg.run('-i', inputName, '-ss', start, '-to', end, '-c', 'copy', outputName)
    const data = ffmpeg.FS('readFile', outputName)

    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
    setSegments([...segments, { url, start, end }])
  }

  const handleMerge = async () => {
    if (segments.length === 0) return

    const inputList = segments.map((_, index) => `file 'output${index}.mp4'`).join('\n')
    ffmpeg.FS('writeFile', 'inputs.txt', new Uint8Array(Buffer.from(inputList)))

    await ffmpeg.run('-f', 'concat', '-safe', '0', '-i', 'inputs.txt', '-c', 'copy', 'finalOutput.mp4')
    const data = ffmpeg.FS('readFile', 'finalOutput.mp4')

    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
    setOutput(url)
  }

  return (
    <div className="mt-10">
      {videoFile && <video src={URL.createObjectURL(videoFile)} controls width={800} height={450} />}
      <Button className="mt-5" variant="white" onClick={() => handleCut('00:01:00', '00:02:00')}>
        Cut 1
      </Button>
      <Button className="ml-5" variant="white" onClick={() => handleCut('00:05:00', '00:07:00')}>
        Cut 2
      </Button>
      <Button className="ml-10" variant="white" onClick={handleMerge}>
        Merge
      </Button>
      {segments.map((seg, index) => (
        <div key={index}>
          <video src={seg.url} controls />
        </div>
      ))}
      {output && <video src={output} controls width={800} height={450} />}
    </div>
  )
}

const fetchFile = async (file: File): Promise<Uint8Array> => {
  const reader = new FileReader()
  return new Promise<Uint8Array>((resolve, reject) => {
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(new Uint8Array(reader.result))
      } else {
        reject(new Error('Failed to convert file'))
      }
    }
    reader.readAsArrayBuffer(file)
  })
}

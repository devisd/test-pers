import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Button from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { IconDelete, IconRoundPlus } from '@/shared/ui/Icons'
import styles from './FragmentsChoice.module.scss'

interface FragmentChoiceProps {
  setFragments: (value) => void
}

export const FragmentsChoice = ({ setFragments }: FragmentChoiceProps) => {
  const searchParams = useSearchParams()

  const [fragment, setFragment] = useState([])
  const [markers, setMarkers] = useState([])
  const [tempMarker, setTempMarker] = useState(null)
  const [selectedFragments, setSelectedFragments] = useState([])
  const [nextFragmentIndex, setNextFragmentIndex] = useState(1)

  const handleFragmentUpload = () => {
    if (tempMarker !== null) {
      const newFragment = {
        video_id: nextFragmentIndex,
        name: `fragment-${nextFragmentIndex}`,
        time: tempMarker.time,
        values: null,
      }
      const updatedFragments = [...fragment, newFragment]
      setFragment(updatedFragments)
      setMarkers([...markers, tempMarker])
      setTempMarker(null)
      setFragments(updatedFragments)
      setNextFragmentIndex(nextFragmentIndex + 1)

      localStorage.setItem('fragments', JSON.stringify(updatedFragments))
    }
  }

  useEffect(() => {
    const videoParam = searchParams.get('video') || ''
    const fragmentParam = searchParams.get('fragments') || ''
    const fragmentCount = parseInt(fragmentParam, 10) || 0
    const local = localStorage.getItem('fragments')
    const localFragments = JSON.parse(local)

    if (fragmentCount > 0) {
      const fragments = Array.from({ length: fragmentCount }, (_, index) => ({
        video_id: index + 1,
        name: `fragment-${index + 1}`,
        time: '00:00',
        values: null,
      }))
      setFragment(fragments)
      setMarkers(fragments.map((f) => ({ time: '00:00' })))
      setFragments(fragments)
      setNextFragmentIndex(fragmentCount + 1)
    }

    if (localFragments) {
      const uniqueFragments = localFragments.filter(
        (localFragment) =>
          !fragment.some(
            (frag) => frag.video_id === localFragment.video_id || frag.name === localFragment.name
          )
      )
      setFragment([...fragment, ...uniqueFragments])
      setMarkers([...markers, ...uniqueFragments.map((f) => ({ time: f.time }))])
      setFragments([...fragment, ...uniqueFragments])
      setNextFragmentIndex(fragment.length + uniqueFragments.length + 1)
    }
  }, [searchParams])

  const handleTimeBarClick = (event) => {
    const time = calculateClickPosition(event)
    setTempMarker({ time })
  }

  const calculateClickPosition = (event) => {
    const timeBar = event.target
    const rect = timeBar.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const percentage = offsetX / rect.width
    const timeInMinutes = 10 * percentage
    const minutes = Math.floor(timeInMinutes)
    const seconds = Math.floor((timeInMinutes - minutes) * 60)
    const formattedMinutes = minutes.toString().padStart(2, '0')
    return `${formattedMinutes}:${seconds.toString().padStart(2, '0')}`
  }

  const calculatePercentageFromTime = (time) => {
    const [minutes, seconds] = time.split(':').map(Number)
    const totalSeconds = minutes * 60 + seconds
    return (totalSeconds / (10 * 60)) * 100
  }

  const handleFragmentNameChange = (index, newName) => {
    const updatedFragments = fragment.map((frag, i) => (i === index ? { ...frag, name: newName } : frag))
    setFragment(updatedFragments)
    localStorage.setItem('fragments', JSON.stringify(updatedFragments))
  }

  const handleFragmentTimeChange = (index, newTime) => {
    const updatedFragments = fragment.map((frag, i) => (i === index ? { ...frag, time: newTime } : frag))
    setFragment(updatedFragments)
    const updatedMarkers = markers.map((marker, i) => (i === index ? { ...marker, time: newTime } : marker))
    setMarkers(updatedMarkers)
    localStorage.setItem('fragments', JSON.stringify(updatedFragments))
  }

  const handleCheckboxChange = (video_id) => {
    if (selectedFragments.includes(video_id)) {
      setSelectedFragments(selectedFragments.filter((fragmentId) => fragmentId !== video_id))
    } else {
      setSelectedFragments([...selectedFragments, video_id])
    }
  }

  const handleDeleteSelected = () => {
    const updatedFragments = fragment.filter((frag) => !selectedFragments.includes(frag.video_id))
    const updatedMarkers = markers.filter((_, index) => !selectedFragments.includes(fragment[index].video_id))
    setFragment(updatedFragments)
    setMarkers(updatedMarkers)
    setFragments(updatedFragments)
    localStorage.setItem('fragments', JSON.stringify(updatedFragments))
    setSelectedFragments([])
  }

  return (
    <>
      <div className={styles.head}>
        <h2>Фрагменты</h2>
        <Button onClick={handleFragmentUpload}>
          Добавить <IconRoundPlus />
        </Button>
        <Button onClick={handleDeleteSelected}>
          Удалить выбранное <IconDelete />
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.fragments}>
          <ul className={styles.fragmentsList}>
            {fragment &&
              fragment.map(({ video_id, name, time }, index) => (
                <li key={video_id}>
                  <label>
                    <Checkbox id={video_id} onChange={() => handleCheckboxChange(video_id)} />{' '}
                    <span className={styles.fragmentsListNumber}>№ {index + 1}</span>
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => handleFragmentTimeChange(index, e.target.value)}
                    className="w-[50px] border-none bg-transparent outline-none"
                  />
                  <label htmlFor={`fragmentUpload-${index}`}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => handleFragmentNameChange(index, e.target.value)}
                      className="border-none bg-transparent outline-none"
                    />
                    <input type="file" id={`fragmentUpload-${index}`} name="fragment" className="hidden" />
                  </label>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex w-full flex-col">
          <iframe className="flex h-[450px] w-full max-w-[800px] rounded-xl bg-dark-04" />

          <div className={styles.timeBar} onClick={handleTimeBarClick}>
            <div
              className={styles.timeBarMarker}
              style={{ width: '100%', height: '7px', background: '#6C6C6C', position: 'relative' }}
            >
              <div style={{ position: 'absolute', left: '0%', top: '60%' }}>00:00</div>
              <div style={{ position: 'absolute', right: '0%', top: '60%' }}>10:00</div>
              {markers.map((marker, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${calculatePercentageFromTime(marker.time)}%`,
                    top: '-90%',
                    width: '4px',
                    height: '20px',
                    background: '#9451E9',
                  }}
                />
              ))}
              {tempMarker && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${calculatePercentageFromTime(tempMarker.time)}%`,
                    top: '-90%',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'white',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

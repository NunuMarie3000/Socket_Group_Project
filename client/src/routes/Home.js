import React from 'react'
import VideoContainer from '../components/VideoContainer'
import { useLocation } from 'react-router-dom'
import Choices from '../Choices'
import Notifies from '../Notifies'

export default function Home() {
  const location = useLocation()
  const userEmail =location.state
  return (
    <>
      <VideoContainer userEmail={userEmail} />
      <Choices>
        <Notifies/>
      </Choices>
    </>
  )
}

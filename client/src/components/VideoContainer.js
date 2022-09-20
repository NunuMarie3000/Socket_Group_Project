import React, { useContext } from 'react'
import Video from './Video'

import { SocketContext } from '../SocketContext'

export default function VideoContainer() {
  const { name, callAccepted, callerVideo, otherCallerVideo, callEnded, stream, call } = useContext(SocketContext)
  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 300px)',
        gridTemplateRows: '300px',
        justifyContent: 'center',
        columnGap: '2rem'
      }}>
        {stream && <Video name={name || 'Name'} isMuted={true} theRef={callerVideo} />}

        {callAccepted && !callEnded && <Video name={call.name || 'Name'} isMuted={false} theRef={otherCallerVideo} />}

      </div>
    </>
  )
}

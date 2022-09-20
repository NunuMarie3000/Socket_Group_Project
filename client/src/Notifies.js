import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { SocketContext } from './SocketContext'

export default function Notifies() {
  const { answerVideoChat, call, callAccepted} = useContext(SocketContext)
  return (
    <>
      {call.isCallRecieved && !callAccepted && (
        <div style={{display:'flex', justifyContent:'center'}}>

          <h1>{call.name} is calling</h1>

          <Button variant='primary' onClick={()=>{
            answerVideoChat()
          }} >
            Answer
          </Button>
        </div>
      )}
    </>
  )
}

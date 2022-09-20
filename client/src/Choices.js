import React, { useContext, useState } from 'react'
import { SocketContext } from './SocketContext'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, Form } from 'react-bootstrap'

export default function Choices({ children }) {
  const { caller, callAccepted, name, setName, callEnded, answerVideoChat,
    hangUpVideoChat, videoChatUser } = useContext(SocketContext)

  const [idToCall, setIdToCall] = useState('')

  return (
    <>
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Form style={{ width: '300px', display:'flex', gap:'2rem' }}>
        
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Account Info</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <CopyToClipboard text={caller} >
              <Button>Copy Your Id</Button>
            </CopyToClipboard>
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Make a Call</Form.Label>
            <Form.Control type="text" placeholder="Id to Call" onChange={(e) => setIdToCall(e.target.value)} />

            {callAccepted && !callEnded ?
              (
                <Button variant='danger' onClick={hangUpVideoChat} >Hang Up</Button>
              ) :
              (
                <Button variant='primary' onClick={() => {
                  videoChatUser(idToCall)
                }}>Call</Button>
              )
            }
          </Form.Group>
        </Form>
        {children}
      </div>
    </>
  )
}

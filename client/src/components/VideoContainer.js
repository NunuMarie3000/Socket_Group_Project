import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import io from "socket.io-client"
import openSocket from "socket.io-client" 
const socket = openSocket('http://localhost:8080')

export default function VideoContainer() {
  // const [roomId, setRoomId] = useState('')
  // const socket = io('/videochat')

  // const sendSocketIO = () =>{
  //   socket.emit('example', 'hello from client')
  // }

  // to get userId for what room to be in,
  // email.split('@')[0], it'll return the first part

  const getRoomId = async () => {
    const url = 'http://localhost:8000/videochat'
    try {
      const response = await axios.get(url)
      // setRoomId(response.data)
      socket.emit('join-room', response.data, 10)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      getRoomId()
      //eslint-disable-next-line
    }, [])

  return (
    <>
      <div style={{
        display:'grid',
        gridTemplateColumns: 'auto-fill, 300px',
        gridTemplateRows: '300px',
      }}>
      
      </div>
    </>
  )
}

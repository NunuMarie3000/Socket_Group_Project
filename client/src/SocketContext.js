import React, { useEffect, createContext, useState, useRef } from 'react'
import Peer from 'simple-peer'
import openSocket from "socket.io-client" 
const SocketContext = createContext()

// const socket = openSocket(process.env.REACT_APP_SERVER_SOCKET)
// const socket = openSocket('ws://localhost:8080')
const socket = openSocket(process.env.REACT_APP_SERVER)

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null)
  const [caller, setCaller] = useState("")
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('')

  const callerVideo = useRef()
  const otherCallerVideo = useRef()
  const connectionRef = useRef()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true}).then(currentStream => {
      setStream(currentStream)
      callerVideo.current.srcObject = currentStream
    })

    socket.on("join", (id)=>{
      setCaller(id)
    })

    socket.on("callUser", ({ from, name:callerName, signal}) => {
      setCall({ isCallRecieved: true, from, name: callerName, signal})
    })

  }, [])
  
  const answerVideoChat = () => {
    setCallAccepted(true)

    const peer = new Peer({ initiator: false, trickle: false, stream })

    peer.on('signal', (data) => {
      socket.emit("answerCall", { signal: data, to: call.from })
    })

    peer.on('stream', (currentStream) => {
      otherCallerVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal)

    connectionRef.current = peer
  }

  const videoChatUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream })

    peer.on('signal', (data) => {
      socket.emit("callUser", { userToCall: id, signalData: data, from: caller, name })
    })

    peer.on('stream', (currentStream) => {
      otherCallerVideo.current.srcObject = currentStream
    })

    socket.on("callAccepted", (signal)=> {
      setCallAccepted(true)
      
      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const hangUpVideoChat = () => {
    setCallEnded(true)

    connectionRef.current.destroy()

    window.location.reload()
  }

  return (
    <SocketContext.Provider value={{
      stream,
      caller,
      call,
      callAccepted,
      callEnded,
      name,
      callerVideo,
      otherCallerVideo,
      videoChatUser,
      answerVideoChat,
      hangUpVideoChat,
      setName
    }} >
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider , SocketContext}



  // const [roomId, setRoomId] = useState('')
  // const socket = io('/videochat')

  // const sendSocketIO = () =>{
  //   socket.emit('example', 'hello from client')
  // }

  // to get userId for what room to be in,
  // email.split('@')[0], it'll return the first part

  
  // const getRoomId = async () => {
  //   const url = 'http://localhost:8000/videochat'
  //   try {
  //     const response = await axios.get(url)
  //     // setRoomId(response.data)
  //     socket.emit('join-room', response.data, 10)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
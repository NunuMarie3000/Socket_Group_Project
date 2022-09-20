import React from 'react'

export default function Video({ isMuted, theRef, name }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      objectFit:'cover',
      justifyContent:'center',
      border:'2px solid black'
    }}>
      <h3>{name}</h3>
      {theRef && <video style={{width:'100%'}} playsInline muted={isMuted} ref={theRef} autoPlay />}
    </div>
  )
}

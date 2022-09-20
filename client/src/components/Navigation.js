import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Navigation({ userEmail }) {
  return (
    <>
      <nav>
        <Link state={userEmail} to='/home'>Home</Link> | {' '}
        <Link to='/about' >About</Link>
      </nav>
      <Outlet />
    </>
  )
}

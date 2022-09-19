import React, { useEffect } from 'react'
import Navigation from './components/Navigation'

export default function App() {
  // we need to get user info here,
  // users will create private chat rooms based on the user's email address
  // this can be replaced later with auth0, we'll be able to get email from the auth0 user object, so user.email
  // for the time being, i'll pretend that i've gotten it from auth0
  const userEmail = 'tommy@email.com'

  return (
    <>
      <Navigation userEmail={userEmail} />
    </>
  )
}


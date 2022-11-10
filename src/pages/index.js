import React from 'react'
import LoginPage from './pages/login'
import Router from "next/router"

export default function login() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    Router.push("/pages/login");
  });

  return (
    <></>
  )
}

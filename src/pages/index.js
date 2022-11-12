/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import LoginPage from './pages/login'
import Router from "next/router"

export default function login() {
  
  // React.useEffect(() => {
  //   Router.push("/pages/login");
  // });

  return (
    <div 
      style={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop : 50
      }}
    >
      <LoginPage/>
    </div>
  )
}

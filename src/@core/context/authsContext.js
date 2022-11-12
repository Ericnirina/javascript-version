// ** React Imports
import { createContext, useState } from 'react'

// ** ThemeConfig Import

const initialAuth = {
  token: '',
  user: '',
}

// ** Create Context
export const tokenContext = createContext()

export const userContext = createContext()

// export const AuthProvider = ({ children }) => {
//   // ** State
//   const [auth, setAuth] = useState({ ...initialSettings })

//   const saveAuth = updatedAuth => {
//     setAuth(updatedAuth)
//   }

//   return <AuthContext.Provider value={{ auth, saveAuth }}>{children}</AuthContext.Provider>
// }

// export const AuthConsumer = AuthContext.Consumer

import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client' 
import { SERVER_URL } from '../config/config'

export const SocketContainerContext= createContext()
const SocketContainer = ({children}) => {
  const [socketState, setSocketState]= useState()
  useEffect(()=> {
    const socket= io(`${SERVER_URL}`, [{transports: ["websocket"]}])
    setSocketState(socket)
    return ()=> socket.disconnect()
  }, [])
  return (
    <SocketContainerContext.Provider value={{socketState}}>
        {children}
    </SocketContainerContext.Provider>
  )
}

export default SocketContainer
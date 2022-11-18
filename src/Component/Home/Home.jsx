import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { SocketContainerContext } from '../../SocketContainer/SocketContainer'
import MainScreen from './MainScreen'
import Profile from './Profile'

const Home = (props) => {
  const {socketState}= useContext(SocketContainerContext)
  const {data }= useContext(AppContext)
  useEffect(()=> {
    if(data?._id) {
      socketState?.emit("joinUser", {user: data})
    }
  }, [socketState, data])
  return (
    <div className={"ajdkasjkdjfaesas"} style={{width: '100%', }}>
      <div className={"djasjkfjkejamwlawas"} style={{width: "100%", display: "flex", alignItems: 'center'}}>
        <Profile />
        <MainScreen />
      </div>
    </div>
  )
}

export default Home
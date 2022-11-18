import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'
import Avatar from './Avatar'
import DetailProfile from './DetailProfile'
import {AiFillMessage } from "react-icons/ai"
import {FaUserFriends } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

const Profile = (props) => {  
  const [open, setOpen]= useState(()=> false)
  const {data}= useContext(AppContext)
  return (
    <div className={"dkdjakdjskdasadsd"} style={{height: "100vh", width: 80}}>
        <div className={"dsjkdjaksljkfada"} style={{width: "100%", height: '100%', background: "#2e89ff", padding: "10px 0"}}>
            <Avatar setOpen={setOpen} avatar={data?.profilePicture} />
            {
              open=== true &&
              <DetailProfile open={open} setOpen={setOpen} />
            }
            <ToChatPage />
            
            <ToFriendPage />
        </div>
    </div>
  )
}

const ToChatPage= (props)=> {
  const navigate= useNavigate()

  return (
    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', width: "100%", padding: "20px"}}>
      <div onClick={()=> navigate("/chat/93ud-d-sdi3w-dsdjskdjs")} title={"Chat"} style={{display: "flex", justifyContent :"center", alignItems: 'center'}}>
        <AiFillMessage color={'#fff'} style={{width: 32, height: 32, color: "#fff", cursor: "pointer"}} />
      </div>
    </div>
  )
}

const ToFriendPage= (props)=> {
  const navigate= useNavigate()
  
  return (
    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', width: "100%", padding: "20px"}}>
      <div onClick={()=> navigate("/friends")} title={"Friends"} style={{display: "flex", justifyContent :"center", alignItems: 'center'}}>
        <FaUserFriends color={'#fff'} style={{width: 32, height: 32, color: "#fff", cursor: "pointer"}} />
      </div>
    </div>
  )
}


export default Profile  
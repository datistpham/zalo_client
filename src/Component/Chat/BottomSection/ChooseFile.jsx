import React, { useContext } from 'react'
import { memo } from 'react'
import {AiFillFileAdd } from "react-icons/ai"
import {BsCardImage } from "react-icons/bs"
import { useParams } from 'react-router-dom'
import { v4 } from 'uuid'
import { AppContext } from '../../../App'
import { SocketContainerContext } from '../../../SocketContainer/SocketContainer'
import {uploadImageClient} from "../../../firebase/config"
import post_message from '../../../api/message/post_message'
import Cookies from 'js-cookie'
import update_last_conversation_id from '../../../api/coversation/update_last_conversation_id'

const ChooseFile = (props) => {
  const {socketState}= useContext(SocketContainerContext)
  const {data }= useContext(AppContext)
  const {idConversation }= useParams()
  const sendImage= async (e)=> {
    const messageImg= await uploadImageClient(e.target.files[0])
    socketState.emit("message_from_client", {message: messageImg, roomId: idConversation, sender: data, type_message: "image", key: v4(), createdAt: new Date()})
    post_message(Cookies.get("uid"), idConversation, v4(), messageImg, idConversation, "image")
    update_last_conversation_id(idConversation)
  }
  return (
    <div className={"jfdskajdfkdfjkdasa"} style={{display: "flex", justifyContent: "center", alignItems: 'center', gap: 10, paddingRight: 16}}>
        <div title={"Chọn ảnh"} style={{width: 36, height: 36, borderRadius: "50%", border: "1px solid #d7d7d7", display: "flex", justifyContent: "center", alignItems: "center", position: "relative"}}>
          <BsCardImage color={"#555"} />
          <input onChange={sendImage} type="file" className={"dfjfjskfdjdkadfdsd"} style={{width: "100%", height: "100%", opacity: 0, position: "absolute", top: 0, left: 0, cursor: "pointer"}} />
        </div>
        <div title={"Chọn file"} style={{width: 36, height: 36, borderRadius: "50%", border: "1px solid #d7d7d7", display: "flex", justifyContent: "center", alignItems: "center", position: "relative"}}>
          <AiFillFileAdd color={"#555"} />
          <input onChange={sendImage} type="file" className={"dfjfjskfdjdkadfdsd"} style={{width: "100%", height: "100%", opacity: 0, position: "absolute", top: 0, left: 0, cursor: "pointer"}} />
        </div>
    </div>
  )
}

export default memo(ChooseFile)

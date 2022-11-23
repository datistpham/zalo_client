import Cookies from 'js-cookie'
import React from 'react'
import { useContext } from 'react'
import { memo } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { v4 } from 'uuid'
import update_last_conversation_id from '../../../api/coversation/update_last_conversation_id'
import post_message from '../../../api/message/post_message'
import { AppContext } from '../../../App'
import { SocketContainerContext } from '../../../SocketContainer/SocketContainer'

const SendButton = (props) => {
  const {socketState}= useContext(SocketContainerContext)
  const {data }= useContext(AppContext)
  const {idConversation }= useParams()
  const sendMessage= ()=> {
    socketState.emit("message_from_client", {message: props.contentText, roomId: idConversation, sender: data, type_message: "text", key: v4(), createdAt: new Date()})
    socketState.emit("typing_from_client_off", {roomId: idConversation, data, typing: false})
    post_message(Cookies.get("uid"), idConversation, v4(), props.contentText, idConversation, "text")
    update_last_conversation_id(idConversation)
    props.setContentText(()=> "")
  }
  return (
    <div className={"dfjdkdjskjkdjkgfljdadsas"}  style={{display: "flex", justifyContent: "center", alignItems: 'center', gap: 10, paddingLeft: 16}}>
      <Button onClick={sendMessage} disabled={props?.contentText?.length > 0 ? false : true } variant={"primary"}>Gửi</Button>
    </div>
  )
}

export default memo(SendButton)
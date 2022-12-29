import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import get_info_detail_conversation from "../../api/coversation/get_info_detail_conversation";
import MainChat from "../Chat/MainChat";
import SearchAndList from "../SearchAndList/SearchAndList";
// import VideoCallComponent from "../VideoCall/VideoCall";

const ChatPage = (props) => {
  const {idConversation}= useParams()
  const [conversation, setConversation]= useState()
  const [change, setChange]= useState(false)
  const [extend, setExtend]= useState(false)
  useEffect(()=> {
    get_info_detail_conversation(idConversation, setConversation)
  }, [idConversation, change])
  return (
    <div className={"fkdjkfjkdlsasa"} style={{ display: "flex" }}>
      <SearchAndList is_chat_page={true} />
      <MainChat setExtend={setExtend} setChange={setChange} conversation={conversation} />
      {
        extend=== true && <StorageFile />
      }
    </div>
  );
};

const StorageFile= ()=> {
  
  return (
    <div className={"dskjdskdjskdsasa"} style={{width: 300, height: "100vh", borderLeft: "1px solid #e7e7e7"}}>
      <div className={"ssjdkjdskjsakssd"} style={{width: "100%", height: 60, borderBottom: "1px solid #e7e7e7", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 20}}>
        Kho lưu trữ
      </div>
      <div>
    </div>
    
    </div>
  )
}

export default ChatPage;

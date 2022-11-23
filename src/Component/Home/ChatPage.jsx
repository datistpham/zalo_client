import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import get_info_detail_conversation from "../../api/coversation/get_info_detail_conversation";
import MainChat from "../Chat/MainChat";
import SearchAndList from "../SearchAndList/SearchAndList";

const ChatPage = (props) => {
  const {idConversation}= useParams()
  const [conversation, setConversation]= useState()
  const [change, setChange]= useState(false)
  useEffect(()=> {
    get_info_detail_conversation(idConversation, setConversation)
  }, [idConversation, change])
  return (
    <div className={"fkdjkfjkdlsasa"} style={{ display: "flex" }}>
      <SearchAndList is_chat_page={true} />
      <MainChat setChange={setChange} conversation={conversation} />
    </div>
  );
};

export default ChatPage;

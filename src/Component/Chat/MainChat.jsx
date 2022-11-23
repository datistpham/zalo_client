import Cookies from "js-cookie";
import React, { useContext } from "react";
import { memo } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import OutsideClickHandler from "react-outside-click-handler";
import { useParams } from "react-router-dom";
import get_conversation_friends from "../../api/coversation/get_conversation_friends";
import out_group from "../../api/coversation/out_group";
import send_request_make_friend_by_me from "../../api/friend/send_request_make_friend_by_me";
import get_message_conversationid from "../../api/message/get_message_conversationid";
import { AppContext } from "../../App";
import { SocketContainerContext } from "../../SocketContainer/SocketContainer";
import Avatar from "../Home/Avatar";
import CoverPhoto from "../Home/CoverPhoto";
import { NameProfile } from "../Home/DetailProfile";
import { ListFriendComponent } from "../SearchAndList/ListFriend";
import TypingEffect from "../TypingEffect/TypingEffect";
import ChooseFile from "./BottomSection/ChooseFile";
import SendButton from "./BottomSection/SendButton";
import TypingText from "./BottomSection/TypingText";
import ContentConversation from "./CenterSection/CenterSection";

const MainChat = (props) => {
  const query= useMemo(()=> ({
    page: 1,
    limit: 9
  }), [])
  const {socketState}= useContext(SocketContainerContext)
  const {idConversation }= useParams()
  useEffect(()=> {
    socketState.emit("join_room_conversation", ({roomId: idConversation}))
  }, [socketState, idConversation])
  useEffect(()=> {
    socketState.on("broadcast_to_all_user_in_room", (data)=> {
      setListMessage(prev=> ([...prev, data]))
    })
  }, [socketState])
  const [contentText, setContentText]=useState(()=> "")
  const [listMessage, setListMessage]= useState(()=> [])
  useEffect(()=> {
    get_message_conversationid(idConversation, setListMessage, query)
  }, [idConversation, query])
  return (
    <div className={"jdahdjksdhjashasjfda"} style={{ flex: "1 1 0" }}>
      <div
        className={"fjskdjkfjdkjadkjsas"}
        style={{ width: "100%", height: "100%", maxHeight: "100vh" }}
      >
        <TitleMainChat
          setChange={props?.setChange}
          {...props?.conversation}
          avtChat={
            props?.conversation?.imageGroup
          }
          name={props?.conversation?.label}
        />
        <ContentConversation listMessage={listMessage} />
        <TypeMainChat contentText={contentText} setContentText={setContentText} />
      </div>
    </div>
  );
};

const TitleMainChat = memo((props) => {
  const [open, setOpen]= useState(false)
  return (
    <div
      className={"fdjdhsdjkvhsjkhaassa"}
      style={{
        width: "100%",
        height: 60,
        borderBottom: "1px solid #e7e7e7",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className={"fkjdjkdjdkjdkssa"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          cursor: "pointer"
        }}
        onClick={()=> setOpen(prev=> !prev)}
      >
        <img
          src={props.imageGroup ? props.imageGroup : props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?.profilePicture}
          alt="Can't open"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid #d7d7d7",
          }}
        />
        <div
          className={"fjsdhjgjkdksdas"}
          style={{ fontWeight: 600, fontSize: 18 }}
        >
          {props.label ? props.label : props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?.username}
        </div>
       { open=== true &&<PopupAddFriends is_show_info_group={true} open={open} setOpen={setOpen} {...props} />}
      </div>
      <div></div>
    </div>
  );
});


const TypeMainChat = memo((props) => {
  const [typing, setTyping]= useState(false)
  const [userTyping, setUserTyping]= useState()
  const {socketState}= useContext(SocketContainerContext)
  useEffect(()=> {
    socketState.on("broadcast_to_all_user_in_room_typing", data=> {
      setTyping(data.data.typing)
      setUserTyping(data.data.data.username)
    })
  }, [socketState])

  return (
    <div
      className={"fjdkjgjdksdjdksa"}
      style={{
        width: "100%",
        height: 68,
        padding: 16,
        borderTop: "1px solid #d7d7d7",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative"
      }}
    >
      <ChooseFile {...props} />
      <TypingText {...props} />
      <SendButton {...props} />
      {
        typing=== true && <TypingEffect userTyping={userTyping} />
      }
    </div>
  );
});

export default MainChat;


export const PopupAddFriends= (props)=> {
  const [isHostGroup, setIsHostGroup]= useState()
  // eslint-disable-next-line
  const [data, setData]= useState()
  const {setChange}= useContext(AppContext)
  useEffect(()=> {
    if(props.createdBy) {
      if(Cookies.get("uid") === props?.createdBy) {
        setIsHostGroup(true)
      }
      else {
        setIsHostGroup(false)
      }
    }
  }, [props?.createdBy])
  useEffect(()=> {
    if(props._id) {
      get_conversation_friends(props._id, setData)
    }
  }, [props._id])
  
  return (
      <div className={"fkjldsklkdsslaskdsaa"} style={{width: "100%", height: "100%", position: "fixed", top: 0, left: 0, background: "rgba(0 ,0 ,0,0.3)", zIndex: 12, display: "flex", justifyContent: "center", alignItems: "center"}}>
          <OutsideClickHandler onOutsideClick={()=> props.setOpen((()=> false))}>
              <div className={"fjlkdsjdkljsdklaskd"} style={{padding: 16, background: "#fff", borderRadius: 5, width: "100vw", maxWidth: 450}}>
                  <div style={{width: "100%", height: "100%"}}>   
                      <div className={"jdjadkjgkddssa"} style={{width: '100%', height: 68, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div className={"dkldjskldjkasdasa"} style={{fontWeight: 600, fontSize: 18}}>
                          {props.label ? props.label : props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?.username}
                        </div>
                        <div onClick={()=> props?.setOpen(()=> false)} style={{display: "flex", justifyContent: 'center', alignItems: "center", cursor: "pointer", padding: 10}}>
                          <GrClose />
                        </div>
                      </div>
                      <CoverPhoto coverPhoto={props?.coverPhoto} />
                      <Avatar avatar={props.imageGroup ? props.imageGroup : props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?.profilePicture} />
                      <NameProfile username={props.label ? props.label : props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?.username} />
                      <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 16}}>
                        {
                          !props?.label && <Button onClick={()=> send_request_make_friend_by_me(props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?._id, setData)} variant="primary">Kết bạn</Button>
                        }
                      </div>
                      {/* host class */}
                      { props?.label && 
                        <div style={{width: "100%"}}>
                          <div style={{fontWeight :600, marginBottom: 8, width: "100%"}}>Trưởng nhóm</div>
                          <div style={{width: "100%", maxHeight: 200, overflow: "auto"}}>
                            {
                              props?.member?.filter(item=> item?._id === props?.createdBy)?.map((item, key)=> <ListMember setResult={props?.setChange} id_conversation={props?.id_conversation} my_id={Cookies.get("uid")} createdBy={props?.createdBy} is_group={true} isHostGroup={isHostGroup} key={item?._id || key} {...item} ></ListMember>)
                            }
                          </div>
                        </div>
                      }
                      {/* member in class include me */}
                      { props?.label && 
                        <div style={{width: "100%"}}>
                          <div style={{fontWeight :600, marginBottom: 8, width: "100%"}}>Thành viên nhóm</div>
                          <div style={{width: "100%", maxHeight: 200, overflow: "auto"}}>
                            {
                              props?.member?.filter(item=> item?._id !== props?.createdBy)?.map((item, key)=> <ListMember setResult={props?.setChange} id_conversation={props?.id_conversation} my_id={Cookies.get("uid")} is_group={true} isHostGroup={isHostGroup} key={item?._id || key} {...item} ></ListMember>)
                            }
                          </div>
                        </div>
                      }
                      {isHostGroup=== false &&
                        <>
                        
                          <br />
                          <div className={"fjkladjkljdkldas"} style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Button onClick={()=> out_group(props?.id_conversation, setChange)} color={"primary"}>Rời nhóm</Button>
                          </div>
                        </>
                      }
                  </div>
              </div>
          </OutsideClickHandler>
      </div>
  )
}

const ListMember= (props)=> {
  return (
      <ListFriendComponent {...props} />
  )
}
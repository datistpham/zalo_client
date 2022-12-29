import { memo, useState } from "react";
import "./style.sass"
import Cookies from "js-cookie";
import _ from "lodash"
import moment from "moment";
import {MdDelete} from "react-icons/md"
import {IoIosRemoveCircle} from "react-icons/io"
import { useContext } from "react";
import { SocketContainerContext } from "../../../SocketContainer/SocketContainer";
import recall_message from "../../../api/message/recall_message";
import remove_message from "../../../api/message/remove_message";
import { useEffect } from "react";

const ContentConversation = (props) => {
    const {socketState}= useContext(SocketContainerContext)

    return (
      <div
        className={"fjkdjskjfksjdaswawsa"}
        style={{ width: "100%", height: "calc(100% - 60px - 68px" }}
      >
        <div
          className={"fjkdjsijaskldjakjdsk"}
          style={{ width: "100%", height: "100%", overflow: "auto", padding: 5}}
        >
            {
                _.orderBy(props?.listMessage, o=> moment(o.createdAt).valueOf(), 'asc')?.map((item)=> <ComponentMessage socketState={socketState} key={item?.key} {...item} keyId={item?.key} />)
            }
        </div>
      </div>
    );
  };

  export default memo(ContentConversation)

const ComponentMessage= (props)=> {
    const [open, setOpen]= useState(false)
    const [reValue, setReValue]= useState(undefined)
    useEffect(()=> {
        props?.socketState?.on("recall_message_server", (data)=> {
            setReValue(data)
            recall_message(props?.keyId, data?.message)
        })
        props?.socketState?.on("remove_message_server", (data)=> {
            setReValue(data)
            remove_message(props?.keyId, data?.message)
        })
    }, [props?.socketState, props?.keyId])
    
    const recallMessage= ()=> {
        props?.socketState?.emit("recall_message", {idConversation: props?.conversation?._id, kindof: "recall", idMessage: props?._id, keyId: props?.keyId})
        
    }

    const removeMessage= ()=> {
        props?.socketState?.emit("remove_message", {idConversation: props?.conversation?._id, kindof: "remove", idMessage: props?._id, keyId: props?.keyId})
        props?.socketState?.on("remove_message_server", (data)=> {
            setReValue(data)
            remove_message(props?.keyId, data?.message)
        })
    }

    return (
        <div onMouseEnter={()=> setOpen(true)} onMouseLeave={()=> setOpen(false)} className={`fjdhsjkfhjdkahsjassa ${props?.sender?._id === Cookies.get("uid") ? "fjkdjjkdhjfdasdjkhsa" : "djskdhjfhsjdahsja"}`}>
            <div className={"dfkdsdhsjkfhjkhdadss"} style={{position: "relative"}}>
                <Avatar {...props} />
                <Text {...props} setOpen={setOpen} reValue={reValue} />
                <div style={{position: "relative"}}>
                    {open=== true && <OptionComponentMessage recallMessage={recallMessage} removeMessage={removeMessage} sender={props?.sender?._id} me={Cookies.get("uid")} />}
                </div>
            </div>
        </div>
    )
   
}

const OptionComponentMessage= (props)=> {
    if(props?.sender === props?.me) {
        return (
            <div className={"fdkdjskjfkgsdA"} style={{alignSelf: "center", background: "#f2f0f5", borderRadius: 5, padding: 10,gap: 10, display: "flex", justifyContent:" center", alignItems: "center", position: "absolute",right: "100%", top: "50%", transform: "translate(-50%, 0)"}}>
                <div onClick={props?.recallMessage} title={"Thu hồi"} style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}>
                    <IoIosRemoveCircle style={{width: 18, height: 18}} />
                </div>
                <div onClick={props?.removeMessage} title={"Gỡ bỏ"} style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}} >
                    <MdDelete style={{width: 18, height: 18}} />
                </div>
            </div>
        )

    }
    else {
        return (
            <div className={"fdkdjskjfkgsdA"} style={{alignSelf: "center", background: "#f2f0f5", borderRadius: 5, padding: 10,gap: 10, display: "flex", justifyContent:" center", alignItems: "center", position: "absolute",left: "100%", top: "50%", transform: "translate(50%, 0)"}}>
                <div onClick={props?.recallMessage} title={"Thu hồi"} style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}>
                    <IoIosRemoveCircle style={{width: 18, height: 18}} />
                </div>
                <div onClick={props?.removeMessage} title={"Gỡ bỏ"} style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}} >
                    <MdDelete style={{width: 18, height: 18}} />
                </div>
            </div>
        )
    }
}

const Avatar= (props)=> {
    return (
        <div className={"fdjfskjfdkjdkasjkssa"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src={props?.sender?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" style={{width: 48, height: 48, borderRadius: '50%', objectFit: "cover"}} />
        </div>
    )
}

const Text= (props)=> {
    return (
        <div className={`fjkdjskfhjkdsajkaas ${props?.sender?._id === Cookies.get("uid") ? "sjfshjkaljsaasasarseas" : "ayuehajkshakjfhdasas"}`} style={{}}>
            {
                props?.reValue && props?.keyId === props?.reValue?.keyId ? <>
                {
                    <div className={"fjdkdjskjaskjasasas"} style={{maxWidth: "100%", wordBreak: "break-word"}}>{props?.reValue?.message}</div>
                }
                </> 
                :
                <>
                {
                    props?.type_message=== "text" && <div className={"fjdkdjskjaskjasasas"} style={{maxWidth: "100%", wordBreak: "break-word"}}>{props?.message}</div>
                }
                {
                    props?.type_message=== "image" && <img alt={""} src={props?.message} className={"fjdkdjskjaskjasasas"} style={{maxWidth: "100%", height: "auto", aspectRatio: 16 / 9, borderRadius: 5}} />
                }
                {
                    props?.type_message=== "file" && <a style={{textDecoration: "none"}} rel="noreferrer"  target={"_blank"} href={props?.message}>
                        <div style={{wordBreak: "break-all", color: "#fff", textAlign: "left", textDecoration: "underline"}}>{props?.name_file}</div>
                    </a>
                }
                {
                    props?.type_message=== "audio" && <audio src={props?.message} controls={true}></audio>
                }
            </>
            }
        </div>
    )
}
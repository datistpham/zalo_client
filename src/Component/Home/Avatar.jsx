import React from 'react'
import { useState } from 'react'
import {AiFillCamera } from "react-icons/ai"

const Avatar = (props) => {
  const [imgPreview, setImagePreview]= useState()
  const check= imgPreview ?true :  false
  const imgPreviewFunction= (e)=> {
    setImagePreview({img: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]), key: e.target.files[0].lastModified})
    props.setNewProfilePicture(e.target.files[0])
  }
  return (
    <div className={"sjdkajdkjfadas"} style={{width: '100%', display: "flex", justifyContent: 'center', alignItems: "center"}}>
        <div onClick={()=> props.setOpen(prev=> !prev)} className={'sdsjfkjdkaldjas'} style={{width: 60, height: 60, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", background: "#fff", position: "relative", cursor: "pointer"}}>
          {
            check=== true ? <img src={imgPreview.preview || "https://s120-ava-talk.zadn.vn/6/6/0/b/1/120/696c7fe20c77ecc03d2ea8c82ffa18c3.jpg"} alt="Open" className={"dsjkhjfsjkfjkdlas"} style={{display: "flex", justifyContent: "center", alignItems: "center", objectFit: "cover", width: "100%", height: "100%",position: "relative", zIndex: 12, borderRadius: "50%"}} />: 
            
            <img src={props.avatar || "https://s120-ava-talk.zadn.vn/6/6/0/b/1/120/696c7fe20c77ecc03d2ea8c82ffa18c3.jpg"} alt="Open" className={"dsjkhjfsjkfjkdlas"} style={{display: "flex", justifyContent: "center", alignItems: "center", objectFit: "cover", width: "100%", height: "100%",position: "relative", zIndex: 12, borderRadius: "50%"}} />
          }
          {
            props?.is_edit=== true &&
            <div className={"fkdlksdklsdcvx"} style={{display: "flex", justifyContent: "center", alignItems: 'center', position: "absolute", right: 0, bottom: 0, zIndex: 13, cursor: "pointer",}}>
              <AiFillCamera />
              <input onChange={imgPreviewFunction} type={"file"} title={"Chọn ảnh đại diện của bạn"} style={{width: "100%", height: "100%", position: "absolute", opacity: 0, zIndex: 14, cursor: "pointer"}} />
            </div>
          }
        </div>  
    </div>
  )
}

export default Avatar

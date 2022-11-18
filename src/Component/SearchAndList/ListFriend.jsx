import React, { useState } from 'react'

const ListFriend = (props) => {
  return (
    <div className={"skdjkfjdkdjsdas"}style={{width:" 100%", height: "calc(100% - 60px)", overflow: "auto"}}>
      <RequestByMe />
      <RequestByUserToMe />
      <ListFriendItem />
    </div>
  )
}

const RequestByMe= (props)=> {
  const [open, setOpen]= useState(()=> true)

  return (
    <div className={"fvjkldjaklsdjklasjassa fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
      <img src={"https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png"} alt="" style={{width: 48, height: 48, objectFit: "cover", borderRadius: "50%"}} />
      <div style={{fontSize: 18}}>Danh sách kết bạn</div>
    </div>
  )
}

const RequestByUserToMe= (props)=> {
  const [open, setOpen]= useState(()=> false)

  return (
    <div className={"fvjkldjaklsdjklasjassa fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
      <img src={"https://chat.zalo.me/assets/group@2x.2d184edd797db8782baa0d5c7a786ba0.png"} alt="" style={{width: 48, height: 48, objectFit: "cover", borderRadius: "50%"}} />
      <div style={{fontSize: 18}}>Danh sách nhóm</div>
    </div>
  )
}

const ListFriendItem= (props)=> {
  const [open, setOpen]= useState(()=> false)
  return (
    <div className={"fvjkldjaklsdjklasjassa fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
      <div style={{fontSize: 18}}>Danh sách bạn bè</div>
    </div>
  )
}



export default ListFriend
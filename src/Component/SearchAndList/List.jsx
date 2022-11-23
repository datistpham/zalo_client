import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import get_list_conversation from '../../api/coversation/get_list_conversation'

const List = (props) => {
    const [data, setData]= useState([])
    useEffect(()=> {
        get_list_conversation(setData)
    }, [props?.change, props.is_friend_page])
  return (
    <div className={"skdjkfjdkdjsdas"}style={{width:" 100%", height: "calc(100% - 60px)", overflow: "auto"}}>
       {
        <div style={{textAlign: "center"}}>
            {props?.isSearching=== true && props?.data?.length <=0 && "Không tìm thấy kết quả phù hợp"}
        </div>
       }
       {
        <div style={{textAlign: "center"}}>
           { props?.isSearching=== false && data?.length<= 0 && "Bạn không có cuộc hội thoại nào."}
        </div>
       }
       {
            props?.isSearching=== false && data?.length> 0 && data?.map((item, key)=> <ItemList key={key} {...item} />)
       }
    </div>
  )
}

const ItemList= (props)=> {
    return (
        <NavLink style={{textDecoration: "none", color: "#000"}} className={({isActive})=> isActive ? "fdsgfsdgfdsdas fhjsdjsfkdjdfklsjdsa" : "fdsgfsdgfdsdas dajksdjskldjaksljaklasa"} to={"/chat/"+ props?._id}>
            <div className={"fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
                {/* s1 */}
                <div className={"jskdjksjkgfddas"} style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10}}>
                    <ImageItemList {...props } />
                    <Name {...props} />
                </div>
                {/* s2 */}
                <div className={"fjklsjklfjsksajas"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                </div>
            </div>
        </NavLink>
    )
}


export const ImageItemList= (props)=> {
    return (
        <div className={"djklsjkdjvsdddasa"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src={props?.imageGroup ? props?.imageGroup : props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?.profilePicture} alt="" style={{width: 56, height: 56, objectFit: "cover", borderRadius: "50%"}} />
        </div>
    )
}

export const Name= (props)=> {
    return (
        <div className={"fjklsajkjfksaasafsd"} style={{display: "flex", alignItems: "center"}}>
            <div className={"fldsajkjdfkldjasa"} style={{fontSize: 18}}>
                {props?.label ? props?.label : props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?.username}
            </div>
        </div>
    )
}

export default List

import axios from "axios"
import { SERVER_URL } from "../config/config"
import { uploadImageClient } from "../firebase/config"
import Cookies from "js-cookie"

const update_info_user= async(id, newUsername, newProfilePicture, newGender, setMessage, setData, changeAvatar)=> {
        const urlAvatar=  await uploadImageClient(newProfilePicture)
        const res= await axios({
            url: `${SERVER_URL}/api/users/edit-infor/${id}`,
            method: "post",
            headers: {
                'authorization': `Bearer ${Cookies.get("accessToken")}`
            },
            data: {
                newUsername: newUsername, newProfilePicture: urlAvatar, newGender
            }
        })
        const result= await res.data
        setData(result?.user)
        return setMessage(result)
    }

export default update_info_user
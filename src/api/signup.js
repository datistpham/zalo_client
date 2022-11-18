import axios from "axios"
import {SERVER_URL } from "../config/config"

const signup= async (username, phoneNumber, password, setData)=> {
    const res= await axios({
        url: `${SERVER_URL}/user/register`,
        method: "post",
        data: {
            username, phoneNumber, password
        }

    })
    const result= await res.data
    return setData(result)
}

export default signup
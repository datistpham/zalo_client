import axios from "axios"
import { SERVER_URL } from "../config/config"

const forgot_password= async (email, setData)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/auth/send-sms",
        method: "post",
        data: {
            email
        },

    })
    const result= await res.data
    return setData(result)
}

export default forgot_password
import axios from "axios"
import { SERVER_URL } from "../../config/config"

const get_list_friends= async (props)=> {
    const res= await axios({
        url: `${SERVER_URL}`
    })
}

export default get_list_friends
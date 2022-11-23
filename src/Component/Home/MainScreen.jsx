import { useContext } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AppContext } from "../../App"
import ChatPage from "./ChatPage"
// import DefaultPage from "./DefaultPage"
import FriendPage from "./FriendPage"

const MainScreen = (props) => {
  const {auth, data }= useContext(AppContext)

  return (
    <div className={"fdjkdaklsklasasas"} style={{flex: "1 1 0", height: "100vh", maxHeight: "100vh"}}>
      <Routes>
        <Route path={"/*"} element={<Navigate to={"/"} replace={true} />} />
        { 
          auth=== true && <Route path={"/"} element={<Navigate to={"/chat/"+data?.lastConversationId || ""} replace={true} />} />
        }
        <Route path={"/chat/:idConversation"} element={<ChatPage />} />
        <Route path={"/friends/*"} element={<FriendPage />} />
      </Routes>
    </div>
  )
}

export default MainScreen

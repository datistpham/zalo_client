import { Route, Routes } from "react-router-dom"
import ChatPage from "./ChatPage"
import DefaultPage from "./DefaultPage"
import FriendPage from "./FriendPage"

const MainScreen = (props) => {
  return (
    <div className={"fdjkdaklsklasasas"} style={{flex: "1 1 0", height: "100vh", maxHeight: "100vh"}}>
        <Routes>
            <Route path={"/"} element={<DefaultPage/>} />
            <Route path={"/chat/:idCoversation"} element={<ChatPage />} />
            <Route path={"/friends"} element={<FriendPage />} />
        </Routes>
    </div>
  )
}

export default MainScreen

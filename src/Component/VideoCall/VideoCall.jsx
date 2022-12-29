import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import Cookies from "js-cookie";
import "./style.sass"
import axios from "axios";
import { SERVER_URL } from "../../config/config";
const VideoCallComponent = () => {
    const appId = "019c2968a3da4efab5e709e7886b86c8"; //ENTER APP ID HERE
    const appCertificate = "cfc8747ffd6040ad89bf114dcded44b5"
    const [token, setToken]= useState("007eJxTYJhWsK7vbu5XVlVdScXZGtPf6iUKKd/weeHUPL3a4nDcI1sFBgNDy2QjSzOLROOURJPUtMQk01RzA8tUcwsLsyQLs2SLvSvnJjcEMjJs0S5nZWSAQBCfhyE5IzEvLzXH0MjYxJSBAQAAkiDe")
    const [inCall, setInCall] = useState(false);
    const [channelName, setChannelName] = useState("channel12345");
    useEffect(()=> {
        (async()=> {
            try {
                const res= await axios({
                    url: SERVER_URL+ "/api/live/get_token",
                    method: "get",
                    headers: {
                        "authorization": "Bearer "+ Cookies.get("accessToken")
                    },
                    params: {
                        appId, channelName, appCertificate, userId: Cookies.get("uid")
                    }
                })
                const result= await res.data
                return setToken(result)
            } catch (error) {
                return console.log(error.message)
            }
            
        })()
    }, [channelName])
    return (
      <div className="video-call-component">
        {inCall ? (
          <VideoCall setInCall={setInCall} channelName={channelName} appId={appId} token={token} />
        ) : (
          <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
        )}
      </div>
    );
}
const config = {
    mode: "rtc",
    codec: "vp8"
  };

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = (props) => {
  const { setInCall, channelName, appId, token } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  // using the hook to get access to the client object
  const client = useClient();
  // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  
  
    useEffect(() => {
    // function to initialise the SDK
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        // console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        // console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, 2131);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
    //   console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks, appId, token]);

  return (
    <div className="App">
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};

const Videos = (props) => {
  const { users, tracks } = props;

  return (
    <div>
      <div id="videos">
        {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}

        <AgoraVideoPlayer
          style={{ height: "95%", width: "95%" }}
          className="vid"
          videoTrack={tracks[1]}
        />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  style={{ height: "95%", width: "95%" }}
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

export const Controls = (props) => {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="controls">
      <p className={trackState.audio ? "on" : ""} onClick={() => mute("audio")}>
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p>
      <p className={trackState.video ? "on" : ""} onClick={() => mute("video")}>
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  );
};

const ChannelForm = (props) => {
  const { setInCall, setChannelName } = props;

  return (
    <form className="join">
      
      <input
        type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}
      >
        Join
      </button>
    </form>
  );
};

export default VideoCallComponent
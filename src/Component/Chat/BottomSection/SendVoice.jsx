import React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { uploadVoiceClient } from "../../../firebase/config";
import "./SendVoice.sass"

const SendVoice = (props) => {
  const addAudioElement = async (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    const messageAudio= await uploadVoiceClient(url)
    console.log(messageAudio)
    props?.sendVoiceMessage(url)
  }
  return (
    <div style={{position: "relative"}}>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={props?.recorderControls}
        classes={"audio-record"}
      />
    </div>
  );
};

export default SendVoice;

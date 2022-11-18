import React from 'react'

const CoverPhoto = (props) => {
  return (
    <div className={"fjlkdajsklfjdskass"} style={{width :'100%', position: "relative",height: 120}}>
        <div className={'jfdjfkdjdsklfdjdaklsa'}style={{width: "100%", height: 150, backgroundImage: `url(${props.image || "https://cover-talk.zadn.vn/default"})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", position: "absolute", top: 0, left: 0}}>
            
        </div>
    </div>
  )
}

export default CoverPhoto
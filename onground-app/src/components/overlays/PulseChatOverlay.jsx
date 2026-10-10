import { on } from '../../utils/on';

/**
 * PulseChatOverlay
 *
 * Static markup converted 1:1 from the original HTML (id: pulseChatOverlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PulseChatOverlay() {
  return (
    <div id="pulseChatOverlay" style={{position:"absolute",inset:"0",background:"#fff",zIndex:"300",display:"none",flexDirection:"column"}}>
      <div style={{background:"#3b1a5a",padding:"12px 14px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0"}}>
        <button onClick={on(function(event){closePulseChat()
})} title="Back" style={{background:"rgba(255,255,255,.18)",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
          ←
        </button>
        <div id="pchatTitle" style={{fontSize:"15px",fontWeight:"700",color:"#fff",flex:"1"}}>
          #callcentre-team
        </div>
        <button onClick={on(function(event){avaniOpenSearchStaff()
})} title="Ask AvaniBot about this channel" style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:"50%",width:"28px",height:"28px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:"0"}}>
          <i className="ti ti-sparkles" style={{fontSize:"14.5px",color:"#fff"}} />
        </button>
      </div>
      {/* Chat messages */}
      <div style={{flex:"1",overflowY:"auto",padding:"12px 14px",background:"#f9f9f9"}} id="pchatBody" />
      {/* Message compose bar with emojis */}
      <div style={{background:"#fff",borderTop:"0.5px solid #e5e5ea",padding:"8px 10px",flexShrink:"0"}}>
        <div style={{display:"flex",gap:"8px",alignItems:"flex-end"}}>
          <div style={{flex:"1",background:"#f2f2f7",borderRadius:"20px",padding:"8px 12px",minHeight:"36px",display:"flex",alignItems:"center"}}>
            <span style={{fontSize:"13.5px",color:"#8e8e93"}} id="pchatInput" suppressContentEditableWarning contentEditable="true">
              Message #callcentre-team…
            </span>
          </div>
          <button onClick={on(function(event){togglePulseEmoji()
})} style={{width:"32px",height:"32px",borderRadius:"50%",background:"#f2f2f7",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:"0",fontSize:"17px"}}>
            😊
          </button>
          {" "}
          <button onClick={on(function(event){sendPulseMsg()
})} style={{width:"32px",height:"32px",borderRadius:"50%",background:"#1d9e75",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:"0"}}>
            <i className="ti ti-send" style={{fontSize:"15px",color:"#fff"}} />
          </button>
        </div>
        {/* Emoji picker */}
        <div id="pulseEmojiPicker" style={{display:"none",padding:"8px 0 0",flexWrap:"wrap",gap:"4px"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:"6px",padding:"4px 2px"}}>
            <span onClick={on(function(event){insertEmoji('👍')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              👍
            </span>
            {" "}
            <span onClick={on(function(event){insertEmoji('🙌')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              🙌
            </span>
            {" "}
            <span onClick={on(function(event){insertEmoji('🔥')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              🔥
            </span>
            {" "}
            <span onClick={on(function(event){insertEmoji('💪')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              💪
            </span>
            {" "}
            <span onClick={on(function(event){insertEmoji('🏆')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              🏆
            </span>
            {" "}
            <span onClick={on(function(event){insertEmoji('😊')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              😊
            </span>
            {" "}
            <span onClick={on(function(event){insertEmoji('✅')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              ✅
            </span>
            {" "}
            <span onClick={on(function(event){insertEmoji('❤️')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              ❤️
            </span>
            {" "}
            <span onClick={on(function(event){insertEmoji('🎉')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              🎉
            </span>
            {" "}
            <span onClick={on(function(event){insertEmoji('📢')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              📢
            </span>
            {" "}
            <span onClick={on(function(event){insertEmoji('💡')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              💡
            </span>
            {" "}
            <span onClick={on(function(event){insertEmoji('🛏️')
})} style={{fontSize:"20px",cursor:"pointer"}}>
              🛏️
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

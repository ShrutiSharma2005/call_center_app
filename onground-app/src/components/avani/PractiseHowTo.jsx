import { on } from '../../utils/on';

/**
 * PractiseHowTo
 * STATE 2: How-to (tip + example + watch video placeholder)
 *
 * Static markup converted 1:1 from the original HTML (id: practise-howto).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PractiseHowTo() {
  return (
    <div id="practise-howto" style={{display:"none",padding:"0 14px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"6px",padding:"14px 0 8px",cursor:"pointer",color:"#1d9e75",fontSize:"13.5px",fontWeight:"600"}} onClick={on(function(event){practiseBackToPicker()
})}>
        <i className="ti ti-chevron-left" />
        {" "}All steps
      </div>
      <div style={{background:"#fff",borderRadius:"14px",padding:"16px",boxShadow:"0 1px 3px rgba(0,0,0,.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
          <div id="practise-howto-icon" style={{fontSize:"28px"}} />
          <div id="practise-howto-title" style={{fontSize:"16px",fontWeight:"700",color:"#1a1a1a"}} />
        </div>
        <div style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"4px"}}>
          How to do this well
        </div>
        <div id="practise-howto-tip" style={{fontSize:"14px",color:"#333",lineHeight:"1.6",marginBottom:"14px"}} />
        {/* Watch example video placeholder */}
        <div style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"6px"}}>
          Watch a model example
        </div>
        <div style={{background:"#0a1a14",borderRadius:"10px",aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"12px",position:"relative",cursor:"pointer"}}>
          <div style={{width:"46px",height:"46px",borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <i className="ti ti-player-play" style={{fontSize:"20px",color:"#fff"}} />
          </div>
          <span style={{position:"absolute",bottom:"8px",right:"10px",fontSize:"12.5px",color:"#9fe1cb",background:"rgba(0,0,0,.4)",padding:"2px 6px",borderRadius:"5px"}}>
            0:42
          </span>
        </div>
        <div style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"6px"}}>
          Example script
        </div>
        <div id="practise-howto-example" style={{fontSize:"13.5px",color:"#1a1a1a",lineHeight:"1.6",background:"#f7f7f5",borderRadius:"10px",padding:"10px 12px",fontStyle:"italic",marginBottom:"16px"}} />
        <button onClick={on(function(event){practiseStartRecording()
})} style={{width:"100%",padding:"12px",background:"#1d9e75",border:"none",borderRadius:"12px",color:"#fff",fontSize:"14.5px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
          <i className="ti ti-microphone" />
          {" "}Record your rendition
        </button>
      </div>
    </div>
  );
}

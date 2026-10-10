import { on } from '../../utils/on';

/**
 * AvaniSearchOverlayStaff
 * AvaniBot in-channel search overlay
 *
 * Static markup converted 1:1 from the original HTML (id: avaniSearchOverlayStaff).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AvaniSearchOverlayStaff() {
  return (
    <div id="avaniSearchOverlayStaff" style={{position:"absolute",inset:"0",background:"#fff",zIndex:"305",display:"none",flexDirection:"column"}}>
      <div style={{background:"#3b1a5a",padding:"12px 14px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0"}}>
        <button onClick={on(function(event){closeAvaniSearchStaff()
})} title="Back" style={{background:"rgba(255,255,255,.18)",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
          ←
        </button>
        <div style={{flex:"1"}}>
          <div style={{fontSize:"15px",fontWeight:"700",color:"#fff",display:"flex",alignItems:"center",gap:"6px"}}>
            ✨ AvaniBot
          </div>
          <div style={{fontSize:"13px",color:"#c9b6ea"}} id="avaniSearchSubStaff">
            Searching in #callcentre-team
          </div>
        </div>
      </div>
      <div style={{padding:"10px 14px",borderBottom:"1px solid #e5e5ea",flexShrink:"0",background:"#fafafc"}}>
        <div style={{display:"flex",gap:"8px",alignItems:"center",background:"#fff",border:"1.5px solid #e5e5ea",borderRadius:"20px",padding:"7px 12px"}}>
          <i className="ti ti-search" style={{fontSize:"15px",color:"#8e8e93"}} />
          {" "}
          <input id="avaniSearchInputStaff" placeholder="Ask a question about this channel…" style={{flex:"1",border:"none",background:"none",outline:"none",fontSize:"14px"}} onKeyDown={on(function(event){if(event.key==='Enter')avaniRunSearchStaff()
})} />
        </div>
        <button onClick={on(function(event){avaniRunSearchStaff()
})} style={{marginTop:"8px",width:"100%",padding:"9px",border:"none",borderRadius:"9px",background:"#7c3aed",color:"#fff",fontSize:"14px",fontWeight:"700",cursor:"pointer"}}>
          Ask AvaniBot
        </button>
      </div>
      <div id="avaniSearchResultsStaff" style={{flex:"1",overflowY:"auto",padding:"14px",background:"#fafafc"}} />
    </div>
  );
}

import { on } from '../../utils/on';

/**
 * AssessHistoryDrawer
 * HISTORY DRAWER (slides in from left)
 *
 * Static markup converted 1:1 from the original HTML (id: assess-history-drawer).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AssessHistoryDrawer() {
  return (
    <div id="assess-history-drawer" style={{position:"absolute",top:"0",left:"0",bottom:"0",width:"230px",background:"#fff",zIndex:"60",transform:"translateX(-100%)",transition:"transform .28s cubic-bezier(.4,0,.2,1)",display:"flex",flexDirection:"column",boxShadow:"4px 0 20px rgba(0,0,0,.18)",pointerEvents:"none"}}>
      <div style={{background:"#0a1a14",padding:"12px 12px 10px",display:"flex",alignItems:"center",gap:"8px",flexShrink:"0"}}>
        <i className="ti ti-messages" style={{fontSize:"16px",color:"#5dcaa5"}} />
        {" "}
        <span style={{fontSize:"14.5px",fontWeight:"700",color:"#fff",flex:"1"}}>
          Chat history
        </span>
        {" "}
        <button onClick={on(function(event){closeAssessHistory()
})} title="Close" style={{background:"rgba(255,255,255,.14)",border:"none",borderRadius:"50%",width:"26px",height:"26px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"14.5px",cursor:"pointer",flexShrink:"0"}}>
          ✕
        </button>
      </div>
      <div style={{padding:"8px 10px 6px",flexShrink:"0"}}>
        <div style={{background:"#f2f2f7",borderRadius:"8px",padding:"5px 10px",display:"flex",alignItems:"center",gap:"6px"}}>
          <i className="ti ti-search" style={{fontSize:"13.5px",color:"#8e8e93",flexShrink:"0"}} />
          {" "}
          <input id="history-search" type="text" placeholder="Search chats…" onInput={on(function(event){filterHistoryList(this.value)
})} style={{border:"none",outline:"none",background:"transparent",fontSize:"12.5px",color:"#1a1a1a",width:"100%",fontFamily:"inherit"}} />
        </div>
      </div>
      <div id="history-list" style={{flex:"1",overflowY:"auto",padding:"2px 0 8px"}} />
      <div id="history-empty" style={{display:"none",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 12px",textAlign:"center"}}>
        <i className="ti ti-messages" style={{fontSize:"24px",color:"#c5c5c5",marginBottom:"8px"}} />
        <div style={{fontSize:"12.5px",color:"#8e8e93",lineHeight:"1.5"}}>
          No chats yet.
          <br />
          Start a conversation!
        </div>
      </div>
      <div style={{padding:"8px 10px 12px",flexShrink:"0",borderTop:"0.5px solid #e5e5ea"}}>
        <button onClick={on(function(event){startNewAssessChat()
})} style={{width:"100%",padding:"9px",background:"#1d9e75",border:"none",borderRadius:"10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"}}>
          <i className="ti ti-edit" style={{fontSize:"14.5px",color:"#fff"}} />
          {" "}
          <span style={{fontSize:"13.5px",color:"#fff",fontWeight:"600"}}>
            New chat
          </span>
        </button>
      </div>
    </div>
  );
}

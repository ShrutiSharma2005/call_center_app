import { on } from '../../utils/on';

/**
 * CameBackOverlay
 *
 * Static markup converted 1:1 from the original HTML (id: cameBackOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function CameBackOverlay() {
  return (
    <div className="ios-overlay" id="cameBackOverlay" style={{alignItems:"flex-end"}}>
      <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",overflow:"hidden"}}>
        <div style={{background:"linear-gradient(135deg,#0a1a14,#1d9e75)",padding:"14px 16px",display:"flex",alignItems:"center",gap:"10px"}}>
          <i className="ti ti-calendar-check" style={{fontSize:"19px",color:"#fff"}} />
          <div style={{flex:"1"}}>
            <div style={{fontSize:"16.5px",fontWeight:"700",color:"#fff"}}>
              Came Back ✓
            </div>
            <div id="cbLeadName" style={{fontSize:"13.5px",color:"rgba(255,255,255,.75)"}}>
              Lead
            </div>
          </div>
          <button onClick={on(function(event){closeCameBackSheet()
})} style={{background:"none",border:"none",color:"#fff",fontSize:"21px",cursor:"pointer"}}>
            ✕
          </button>
        </div>
        <div style={{padding:"14px 16px 24px"}}>
          <div style={{fontSize:"15px",fontWeight:"600",color:"#555",marginBottom:"8px"}} id="cameBackQ">
            When did/will the customer come back?
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"12px"}}>
            <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
              <input type="radio" name="cbWhen" defaultValue="today" style={{accentColor:"#1d9e75"}} />
              <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                Today (already in store)
              </span>
            </label>
            {" "}
            <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
              <input type="radio" name="cbWhen" defaultValue="this_week" style={{accentColor:"#1d9e75"}} />
              <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                This week
              </span>
            </label>
            {" "}
            <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
              <input type="radio" name="cbWhen" defaultValue="specific" style={{accentColor:"#1d9e75"}} />
              <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                Specific date
              </span>
            </label>
          </div>
          <input type="date" id="cbDatePicker" style={{width:"100%",padding:"10px 12px",border:"0.5px solid #e5e5ea",borderRadius:"12px",fontSize:"15px",color:"#333",background:"#f9f9f9",marginBottom:"12px"}} />
          {" "}
          <textarea id="cbNotes" style={{width:"100%",padding:"10px 12px",border:"0.5px solid #e5e5ea",borderRadius:"12px",fontSize:"15px",color:"#333",background:"#f9f9f9",height:"56px",resize:"none",marginBottom:"12px"}} placeholder="Any notes about the return visit…" />
          <div style={{display:"flex",gap:"10px"}}>
            <button onClick={on(function(event){closeCameBackSheet()
})} style={{flex:"1",padding:"12px",border:"1.5px solid #e5e5ea",borderRadius:"100px",fontSize:"15.5px",color:"#555",background:"#fff",cursor:"pointer"}}>
              Cancel
            </button>
            {" "}
            <button onClick={on(function(event){submitCameBack()
})} style={{flex:"1",padding:"12px",border:"none",borderRadius:"100px",fontSize:"15.5px",color:"#fff",background:"#1d9e75",cursor:"pointer",fontWeight:"600"}}>
              Confirm Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

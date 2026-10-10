import { on } from '../../utils/on';

/**
 * NoInterestOverlay
 *
 * Static markup converted 1:1 from the original HTML (id: noInterestOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function NoInterestOverlay() {
  return (
    <div className="ios-overlay" id="noInterestOverlay" style={{alignItems:"flex-end"}}>
      <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",overflow:"hidden"}}>
        <div style={{background:"linear-gradient(135deg,#e24b4a,#a32d2d)",padding:"14px 16px",display:"flex",alignItems:"center",gap:"10px"}}>
          <i className="ti ti-thumb-down" style={{fontSize:"19px",color:"#fff"}} />
          <div style={{flex:"1"}}>
            <div style={{fontSize:"16.5px",fontWeight:"700",color:"#fff"}}>
              No Interest
            </div>
            <div id="niLeadName" style={{fontSize:"13.5px",color:"rgba(255,255,255,.75)"}}>
              Lead
            </div>
          </div>
          <button onClick={on(function(event){closeNoInterestSheet()
})} style={{background:"none",border:"none",color:"#fff",fontSize:"21px",cursor:"pointer"}}>
            ✕
          </button>
        </div>
        <div style={{padding:"14px 16px 24px"}}>
          <div style={{fontSize:"15px",fontWeight:"600",color:"#555",marginBottom:"8px"}} id="noInterestQ">
            Why did the customer lose interest?
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"12px"}} id="niReasonList">
            <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
              <input type="radio" name="niReason" defaultValue="price" style={{accentColor:"#e24b4a"}} />
              <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                Price too high
              </span>
            </label>
            {" "}
            <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
              <input type="radio" name="niReason" defaultValue="competitor" style={{accentColor:"#e24b4a"}} />
              <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                Went to competitor
              </span>
            </label>
            {" "}
            <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
              <input type="radio" name="niReason" defaultValue="not_ready" style={{accentColor:"#e24b4a"}} />
              <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                Not ready to buy
              </span>
            </label>
            {" "}
            <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
              <input type="radio" name="niReason" defaultValue="other" style={{accentColor:"#e24b4a"}} />
              <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                Other
              </span>
            </label>
          </div>
          <textarea id="niOtherText" style={{width:"100%",padding:"10px 12px",border:"0.5px solid #e5e5ea",borderRadius:"12px",fontSize:"15px",color:"#333",background:"#f9f9f9",height:"56px",resize:"none",marginBottom:"12px"}} placeholder="Add more detail (optional)…" />
          <div style={{display:"flex",gap:"10px"}}>
            <button onClick={on(function(event){closeNoInterestSheet()
})} style={{flex:"1",padding:"12px",border:"1.5px solid #e5e5ea",borderRadius:"100px",fontSize:"15.5px",color:"#555",background:"#fff",cursor:"pointer"}}>
              Cancel
            </button>
            {" "}
            <button onClick={on(function(event){submitNoInterest()
})} style={{flex:"1",padding:"12px",border:"none",borderRadius:"100px",fontSize:"15.5px",color:"#fff",background:"#e24b4a",cursor:"pointer",fontWeight:"600"}}>
              Confirm No Interest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

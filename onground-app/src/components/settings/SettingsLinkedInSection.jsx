import { on } from '../../utils/on';

/**
 * SettingsLinkedInSection
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function SettingsLinkedInSection() {
  return (
    <div style={{margin:"6px 12px 10px",background:"#fff",borderRadius:"12px",padding:"12px 14px"}}>
      <div style={{fontSize:"13px",color:"#666",lineHeight:"1.5",marginBottom:"10px"}}>
        Link once — whenever you're ready to announce a milestone, push a ready-made OG Score™ story to LinkedIn in one tap.
      </div>
      <label style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px"}}>
        LinkedIn Profile URL
      </label>
      {" "}
      <input type="text" id="linkedinUrlInput" placeholder="linkedin.com/in/your-name" style={{width:"100%",border:"1px solid #e0e0e0",borderRadius:"9px",padding:"9px 11px",fontSize:"13.5px",marginTop:"5px",fontFamily:"inherit",boxSizing:"border-box"}} />
      {" "}
      <button onClick={on(function(event){saveLinkedInUrl()
})} id="linkedinSaveBtn" style={{width:"100%",marginTop:"9px",padding:"11px",border:"none",borderRadius:"10px",fontSize:"14px",fontWeight:"700",color:"#fff",background:"#0a66c2",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px"}}>
        <i className="ti ti-brand-linkedin" />
        Save &amp; Connect LinkedIn
      </button>
      <div id="linkedinConnectedState" style={{display:"none",marginTop:"10px",background:"#e8f0fe",borderRadius:"10px",padding:"10px 11px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"13px",color:"#0a66c2",fontWeight:"700"}}>
          <i className="ti ti-circle-check" />
          <span>
            Connected ·{" "}
            <span id="linkedinUrlDisplay" />
          </span>
        </div>
        <button onClick={on(function(event){openLinkedInPush()
})} style={{width:"100%",marginTop:"9px",padding:"10px",border:"none",borderRadius:"9px",fontSize:"13.5px",fontWeight:"700",color:"#fff",background:"#0a66c2",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"}}>
          <i className="ti ti-share" />
          Push my OG Score™ to LinkedIn
        </button>
      </div>
    </div>
  );
}

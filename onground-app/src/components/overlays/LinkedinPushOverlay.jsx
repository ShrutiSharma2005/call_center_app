import { on } from '../../utils/on';

/**
 * LinkedinPushOverlay
 *
 * Static markup converted 1:1 from the original HTML (id: linkedinPushOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function LinkedinPushOverlay() {
  return (
    <div className="ios-overlay" id="linkedinPushOverlay">
      <div className="ios-sheet" style={{position:"relative"}}>
        <div className="ios-sheet-handle" />
        <button className="sheet-close-btn" onClick={on(function(event){closeLinkedInPush()
})}>
          ✕
        </button>
        <div className="ios-sheet-inner" style={{padding:"18px 20px 24px"}} id="linkedinPushBody">
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"13px"}}>
            <i className="ti ti-brand-linkedin" style={{fontSize:"23px",color:"#0a66c2"}} />
            <div style={{fontSize:"16.5px",fontWeight:"700",color:"#1a1a1a"}}>
              Share your OG Score™ milestone
            </div>
          </div>
          <div style={{background:"#f7f7f9",borderRadius:"12px",padding:"14px",fontSize:"15px",color:"#333",lineHeight:"1.65"}}>
            Hit a new OG Score™ milestone this month —{" "}
            <b>
              76 and climbing
            </b>
            {" "}🚀 Proud of the growth, especially in closing and handling objections with more confidence. Onward and upward! #Sales #GrowthMindset #OnGroundAI
          </div>
          <div style={{fontSize:"13px",color:"#6b6b74",marginTop:"8px"}}>
            Posts to{" "}
            <span id="linkedinPushUrl">
              your LinkedIn profile
            </span>
          </div>
          <button onClick={on(function(event){confirmLinkedInPush()
})} style={{width:"100%",marginTop:"14px",padding:"12px",border:"none",borderRadius:"12px",fontSize:"15.5px",fontWeight:"700",color:"#fff",background:"#0a66c2",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px"}}>
            <i className="ti ti-brand-linkedin" />
            Post to LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}

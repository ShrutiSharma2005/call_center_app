import { on } from '../../utils/on';

/**
 * StaffAgentConfigOverlay
 * Staff Custom Agents — activate screen
 *
 * Static markup converted 1:1 from the original HTML (id: staffAgentConfigOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function StaffAgentConfigOverlay() {
  return (
    <div className="ios-overlay" id="staffAgentConfigOverlay">
      <div className="ios-sheet" style={{position:"relative",maxHeight:"88%"}}>
        <button className="sheet-close-btn" onClick={on(function(event){closeStaffAgentConfig()
})} style={{zIndex:"2"}}>
          ✕
        </button>
        <div id="staffAgentConfigHead" style={{padding:"20px 20px 16px",borderRadius:"20px 20px 0 0"}}>
          <div style={{width:"38px",height:"38px",borderRadius:"11px",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"19px",marginBottom:"9px"}} id="staffAgentConfigIcon">
            🎯
          </div>
          <div style={{fontSize:"16px",fontWeight:"800",color:"#fff"}} id="staffAgentConfigTitle">
            Agent
          </div>
          <div style={{fontSize:"13px",color:"rgba(255,255,255,.75)"}} id="staffAgentConfigSub">
            Sub
          </div>
        </div>
        <div className="ios-sheet-inner" style={{padding:"16px 20px 22px"}} id="staffAgentConfigBody" />
      </div>
    </div>
  );
}

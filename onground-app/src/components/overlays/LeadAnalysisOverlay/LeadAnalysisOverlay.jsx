import { on } from '../../../utils/on';
import LeadRateBars from './LeadRateBars';
import LeadStatGrid from './LeadStatGrid';

/**
 * LeadAnalysisOverlay
 *
 * Static markup converted 1:1 from the original HTML (id: leadAnalysisOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function LeadAnalysisOverlay() {
  return (
    <div className="ios-overlay" id="leadAnalysisOverlay" style={{alignItems:"flex-end"}}>
      <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",overflow:"hidden",maxHeight:"92vh",overflowY:"auto"}}>
        {/* Drag handle */}
        <div style={{width:"36px",height:"4px",background:"#e0e0e0",borderRadius:"2px",margin:"10px auto 0",flexShrink:"0"}} />
        {/* Header */}
        <div style={{padding:"12px 16px 10px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:"0"}}>
          <div>
            <div style={{fontSize:"17px",fontWeight:"800",color:"#1a1a1a"}}>
              Lead Analysis
            </div>
            <div style={{fontSize:"14.5px",color:"#6b6b74",marginTop:"1px"}}>
              This Week
            </div>
          </div>
          <button onClick={on(function(event){closeLeadAnalysisModal()
})} style={{width:"30px",height:"30px",borderRadius:"50%",background:"#f2f2f7",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16.5px",color:"#555",flexShrink:"0"}}>
            ✕
          </button>
        </div>
        {/* 2×2 stat grid — spacious, readable */}
        <LeadStatGrid />
        {/* Rate bars — fatter, labelled inline */}
        <LeadRateBars />
        {/* Pipeline value banner — richer */}
        <div style={{margin:"0 14px 24px",borderRadius:"14px",overflow:"hidden"}}>
          <div style={{background:"linear-gradient(135deg,#0a1a14 0%,#0f6e56 100%)",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"700",textTransform:"uppercase",letterSpacing:".6px",marginBottom:"4px"}}>
                Pipeline Value
              </div>
              <div style={{fontSize:"25px",fontWeight:"800",color:"#fff",lineHeight:"1"}}>
                ₹1.5L
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:"15px",fontWeight:"700",color:"#fff"}}>
                3 OF 18 CLOSED
              </div>
              <div style={{fontSize:"13.5px",color:"#5dcaa5",marginTop:"3px"}}>
                avg ₹50K / deal
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

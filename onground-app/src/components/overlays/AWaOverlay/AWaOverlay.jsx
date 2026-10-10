import { on } from '../../../utils/on';
import AWaActions from './AWaActions';
import AWaCustomerNumber from './AWaCustomerNumber';
import AWaHeader from './AWaHeader';

/**
 * AWaOverlay
 * WhatsApp send sheet — FIX 1: also closeable
 *
 * Static markup converted 1:1 from the original HTML (id: aWaOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AWaOverlay() {
  return (
    <div className="ios-overlay" id="aWaOverlay">
      <div className="ios-sheet" style={{position:"relative"}}>
        <div className="ios-sheet-handle" />
        <button className="sheet-close-btn" onClick={on(function(event){closeWaSheet()
})}>
          ✕
        </button>
        <div className="ios-sheet-inner">
          <AWaHeader />
          <div style={{fontSize:"14.5px",fontWeight:"600",color:"#555",marginBottom:"6px"}}>
            What to send
          </div>
          <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"14px"}}>
            <div style={{padding:"6px 12px",background:"#e1f5ee",border:"1px solid #1d9e75",borderRadius:"20px",fontSize:"14.5px",color:"#0f6e56",fontWeight:"500",cursor:"pointer"}}>
              📄 Product Quote
            </div>
            <div style={{padding:"6px 12px",background:"#f2f2f7",border:"1px solid #e5e5ea",borderRadius:"20px",fontSize:"14.5px",color:"#555",cursor:"pointer"}}>
              📋 Brochure PDF
            </div>
            <div style={{padding:"6px 12px",background:"#f2f2f7",border:"1px solid #e5e5ea",borderRadius:"20px",fontSize:"14.5px",color:"#555",cursor:"pointer"}}>
              💳 EMI Options
            </div>
            <div style={{padding:"6px 12px",background:"#f2f2f7",border:"1px solid #e5e5ea",borderRadius:"20px",fontSize:"14.5px",color:"#555",cursor:"pointer"}}>
              🛡️ Warranty Info
            </div>
          </div>
          <div style={{fontSize:"14.5px",fontWeight:"600",color:"#555",marginBottom:"8px"}}>
            Send to
          </div>
          <AWaCustomerNumber />
          <div style={{marginBottom:"12px"}}>
            <input className="ios-input" placeholder="+91 98765 43210 (Customer)" style={{width:"100%",fontSize:"15px"}} />
          </div>
          <AWaActions />
        </div>
      </div>
    </div>
  );
}

import { on } from '../../utils/on';

/**
 * RankDetailOverlay
 * Rank explanation — weighted scoring behind "Your Rank within [Store]"
 *
 * Static markup converted 1:1 from the original HTML (id: rankDetailOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function RankDetailOverlay() {
  return (
    <div className="ios-overlay" id="rankDetailOverlay">
      <div className="ios-sheet" style={{position:"relative"}}>
        <div className="ios-sheet-handle" />
        <button className="sheet-close-btn" onClick={on(function(event){closeRankDetail()
})}>
          ✕
        </button>
        <div className="ios-sheet-inner" style={{padding:"20px 20px 24px"}}>
          <div style={{textAlign:"center",marginBottom:"16px"}}>
            <div style={{fontSize:"12.5px",fontWeight:"800",color:"#5dcaa5",textTransform:"uppercase",letterSpacing:".6px",marginBottom:"6px"}}>
              Your Rank
            </div>
            <div style={{fontSize:"40px",fontWeight:"800",color:"#1a1a1a",lineHeight:"1"}}>
              #
              <span id="rankDetailNum">
                3
              </span>
            </div>
            <div style={{fontSize:"13.5px",color:"#8e8e93",marginTop:"2px"}}>
              within{" "}
              <span id="rankDetailStore">
                RT Nagar
              </span>
              {" "}· 6 staff ranked
            </div>
          </div>
          <div style={{background:"#f7f7f5",borderRadius:"12px",padding:"12px 14px",marginBottom:"14px"}}>
            <div style={{fontSize:"12.5px",color:"#4b4b52",lineHeight:"1.5"}}>
              Your rank is a weighted blend of the same numbers in{" "}
              <b>
                My Progress
              </b>
              {" "}above — not just one metric. Here's exactly how it adds up this period.
            </div>
          </div>
          <div id="rankWeightBreakdown" />
          <div style={{background:"linear-gradient(135deg,#0a1a14,#1d3a2e)",borderRadius:"12px",padding:"12px 14px",marginTop:"6px",color:"#fff"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <i className="ti ti-bulb" style={{fontSize:"16px",color:"#FFD700",flexShrink:"0"}} />
              {" "}
              <span style={{fontSize:"13px",lineHeight:"1.5"}}>
                Closing 1 more lead this week would add ~4 points — enough to pass #2.{" "}
                <b>
                  Leads Called
                </b>
                {" "}is your fastest lever right now.
              </span>
            </div>
          </div>
          <div style={{fontSize:"12.5px",color:"#b5b5bb",textAlign:"center",marginTop:"12px"}}>
            Weights are store defaults, set by your manager under Settings → Customer Interaction preferences.
          </div>
        </div>
      </div>
    </div>
  );
}

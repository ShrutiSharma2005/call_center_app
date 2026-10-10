/**
 * PlanPanels
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PlanPanels() {
  return (
    <div style={{display:"flex",alignItems:"flex-start"}}>
      <div id="planPanelsWrap" style={{flex:"1",minWidth:"0",paddingBottom:"90px"}}>
        {/* INCOMING — missed calls ranked by expected value */}
        <div id="planPanel-incoming" style={{display:"none"}}>
          <div style={{padding:"14px 14px 4px"}}>
            <div style={{fontSize:"14.5px",fontWeight:"800",color:"#1a1a1a"}}>
              Missed calls
            </div>
            <div style={{fontSize:"12.5px",color:"#8e8e93",marginTop:"1px"}}>
              Ranked by expected value — call the highest-value leads back first
            </div>
          </div>
          <div id="planIncomingSummary" style={{display:"flex",alignItems:"center",gap:"16px",margin:"8px 14px 4px",background:"#faf9f6",borderRadius:"12px",padding:"11px 14px"}} />
          <div id="planIncomingList" style={{padding:"6px 12px"}} />
        </div>
        {/* OUTGOING ("Calls to make") — planned calls ranked by lead attractiveness, paginated — now the default tab since it's the main outgoing-calling worklist. */}
        <div id="planPanel-outgoing">
          <div style={{padding:"14px 14px 4px"}}>
            <div style={{fontSize:"14.5px",fontWeight:"800",color:"#1a1a1a"}}>
              Planned outgoing calls
            </div>
            <div style={{fontSize:"12.5px",color:"#8e8e93",marginTop:"1px"}}>
              Ranked by lead attractiveness score — tap a lead for the full picture
            </div>
          </div>
          <div id="planOutgoingList" style={{padding:"6px 12px"}} />
          <div id="planOutgoingPager" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",padding:"10px 12px 4px"}} />
        </div>
        {/* RECENT — call history, tap to review vs SOP */}
        <div id="planPanel-recent" style={{display:"none"}}>
          <div style={{padding:"14px 14px 4px"}}>
            <div style={{fontSize:"14.5px",fontWeight:"800",color:"#1a1a1a"}}>
              Recent calls
            </div>
            <div style={{fontSize:"12.5px",color:"#8e8e93",marginTop:"1px"}}>
              Tap a call to review it against SOP
            </div>
          </div>
          <div id="planRecentList" style={{padding:"6px 12px"}} />
        </div>
      </div>
    </div>
  );
}

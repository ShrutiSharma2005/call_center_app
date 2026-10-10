/**
 * LearnPanel
 * LEARN PANEL: shown when Learn mode is active, outside split
 *
 * Static markup converted 1:1 from the original HTML (id: a-panel-learn).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function LearnPanel() {
  return (
    <div id="a-panel-learn" style={{overflowY:"auto",paddingBottom:"80px"}}>
      <div style={{margin:"12px 14px",background:"linear-gradient(135deg,#0a2a1e,#0f6e56)",borderRadius:"12px",padding:"12px 14px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-8px",top:"-8px",fontSize:"52px",opacity:".12"}}>
          🎓
        </div>
        <div style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"600",textTransform:"uppercase",letterSpacing:".6px",marginBottom:"4px"}}>
          ✦ Avani — Your Learning Path
        </div>
        <div style={{fontSize:"14.5px",fontWeight:"600",color:"#fff",marginBottom:"3px"}}>
          4 modules assigned this week
        </div>
        <div style={{fontSize:"12.5px",color:"#9fe1cb",lineHeight:"1.5"}}>
          2 core + 2 personalised from your store conversations.
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"}}>
          <div style={{flex:"1",background:"rgba(255,255,255,.15)",borderRadius:"4px",height:"5px",overflow:"hidden"}}>
            <div style={{width:"25%",background:"linear-gradient(90deg,#5dcaa5,#FFD700)",height:"100%",borderRadius:"4px"}} />
          </div>
          <span style={{fontSize:"12.5px",color:"#FFD700",fontWeight:"600"}}>
            1/4 done
          </span>
        </div>
      </div>
      <div style={{margin:"0 12px 8px",background:"#fff",borderRadius:"12px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.1)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px"}}>
          <div style={{width:"40px",height:"40px",borderRadius:"10px",background:"#e1f5ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:"0"}}>
            🛏️
          </div>
          <div style={{flex:"1"}}>
            <div style={{fontSize:"13.5px",fontWeight:"500",color:"#1a1a1a",marginBottom:"2px"}}>
              Product Foundations
            </div>
            <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
              GRID vs Luxe · Foam types · SKU specs
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"5px"}}>
              <div style={{flex:"1",background:"#e5e5ea",borderRadius:"3px",height:"4px",overflow:"hidden"}}>
                <div style={{width:"100%",background:"#1d9e75",height:"100%",borderRadius:"3px"}} />
              </div>
              <span style={{fontSize:"12.5px",color:"#1d9e75",fontWeight:"600"}}>
                Done ✓
              </span>
            </div>
          </div>
          <div style={{width:"26px",height:"26px",borderRadius:"50%",background:"#1d9e75",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
            <i className="ti ti-check" style={{fontSize:"14.5px",color:"#fff"}} />
          </div>
        </div>
      </div>
      <div style={{margin:"0 12px 14px",background:"#fff",borderRadius:"12px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.1)",border:"1.5px solid #1d9e7530"}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px"}}>
          <div style={{width:"40px",height:"40px",borderRadius:"10px",background:"#fff3e0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:"0"}}>
            🛡️
          </div>
          <div style={{flex:"1"}}>
            <div style={{fontSize:"13.5px",fontWeight:"500",color:"#1a1a1a",marginBottom:"2px"}}>
              Warranty &amp; Trial Policy
            </div>
            <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
              100-night trial · Return process · Key scripts
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"5px"}}>
              <div style={{flex:"1",background:"#e5e5ea",borderRadius:"3px",height:"4px",overflow:"hidden"}}>
                <div style={{width:"40%",background:"#ef9f27",height:"100%",borderRadius:"3px"}} />
              </div>
              <span style={{fontSize:"12.5px",color:"#ef9f27",fontWeight:"600"}}>
                40%
              </span>
            </div>
          </div>
          <i className="ti ti-player-play" style={{fontSize:"18px",color:"#1d9e75",flexShrink:"0"}} />
        </div>
      </div>
    </div>
  );
}

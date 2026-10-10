import { on } from '../../utils/on';

/**
 * DashboardProgress
 * Row 2: left = My Progress + who's waiting; right = earnings above My Tasks
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function DashboardProgress() {
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",margin:"10px 12px 0",alignItems:"start"}}>
      <div style={{display:"flex",flexDirection:"column",gap:"10px",minWidth:"0"}}>
        <div className="prog-banner" style={{margin:"0"}}>
          <div className="prog-eyebrow">
            <span className="dot" />
            My Progress · today
          </div>
          <div className="prog-grid" id="progGrid" style={{gridTemplateColumns:"repeat(2,1fr)"}}>
            <div className="prog-metric" style={{cursor:"default"}}>
              <div className="prog-val">
                3
              </div>
              <div className="prog-delta warn">
                ▲ +1
              </div>
              <div className="prog-lbl">
                Leads Created
              </div>
            </div>
            <div className="prog-metric" style={{cursor:"default"}}>
              <div className="prog-val">
                2
              </div>
              <div className="prog-delta good">
                ▲ +2
              </div>
              <div className="prog-lbl">
                Leads Called
              </div>
            </div>
          </div>
        </div>
        <div style={{margin:"4px 2px 0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}}>
            Who's waiting
          </span>
          {" "}
          <span onClick={on(function(event){aSwitch('calls')
})} style={{fontSize:"12.5px",fontWeight:"700",color:"#0f6e56",cursor:"pointer"}}>
            Open planner →
          </span>
        </div>
        <div id="dashQueueDetail" style={{margin:"0"}} />
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"10px",minWidth:"0"}}>
        <div id="hcEarn" style={{margin:"0",background:"#fff",border:"1px solid #ececef",borderRadius:"16px",padding:"12px 14px",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:"8px"}}>
            <div style={{fontSize:"13.5px",fontWeight:"800",color:"#1a1a1a"}}>
              💰 My earnings this month
            </div>
            <div style={{fontSize:"12.5px",color:"#6b7280"}}>
              ₹800 to ₹6,000 slab
            </div>
          </div>
          <div style={{display:"flex",alignItems:"baseline",gap:"8px",marginTop:"4px"}}>
            <div style={{fontSize:"26px",fontWeight:"800",color:"#0f6e56",lineHeight:"1.1"}}>
              ₹5,200
            </div>
            <div style={{fontSize:"13px",color:"#6b7280"}}>
              ₹1,700 from coached moves
            </div>
          </div>
          <div style={{height:"7px",background:"#eef0f2",borderRadius:"4px",overflow:"hidden",marginTop:"8px"}}>
            <div style={{width:"87%",height:"100%",background:"linear-gradient(90deg,#1d9e75,#5dcaa5)"}} />
          </div>
        </div>
        <div id="hcMyTasks" style={{background:"linear-gradient(135deg,#3b2304,#92400e)",borderRadius:"16px",padding:"11px 12px",boxShadow:"0 4px 14px rgba(146,64,14,.25)"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
            <i className="ti ti-checklist" style={{fontSize:"17px",color:"#fcd34d"}} />
            <div style={{fontSize:"15px",fontWeight:"800",color:"#fff"}}>
              My Tasks
            </div>
            <span id="taskCountBadge" style={{background:"#ef4444",color:"#fff",fontSize:"12.5px",fontWeight:"800",padding:"1px 8px",borderRadius:"10px"}}>
              3
            </span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            <div data-tid="w1" onClick={on(function(event){hcStaffTask('Call Centre Team','Confirm the 4:30pm callback')
})} style={{background:"#fff",borderRadius:"11px",padding:"8px 10px",display:"flex",alignItems:"center",gap:"9px",cursor:"pointer"}}>
              <div style={{width:"26px",height:"26px",borderRadius:"8px",background:"#e0f2fe",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                <i className="ti ti-phone-call" style={{fontSize:"15px",color:"#0369a1"}} />
              </div>
              <div style={{flex:"1",minWidth:"0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                <span style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                  2 callbacks
                </span>
                {" "}
                <span style={{fontSize:"12.5px",color:"#8e8e93"}}>
                  next 4:30pm
                </span>
              </div>
              <i className="ti ti-chevron-right" style={{fontSize:"15px",color:"#c0c0c0"}} />
            </div>
            <div data-tid="w2" onClick={on(function(event){hcStaffTask('AvaniBot','Call now or reassign the 2 leads')
})} style={{background:"#fff",borderRadius:"11px",padding:"8px 10px",display:"flex",alignItems:"center",gap:"9px",cursor:"pointer"}}>
              <div style={{width:"26px",height:"26px",borderRadius:"8px",background:"#f1ecff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                <i className="ti ti-users" style={{fontSize:"15px",color:"#7c3aed"}} />
              </div>
              <div style={{flex:"1",minWidth:"0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                <span style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                  2 hot leads
                </span>
                {" "}
                <span style={{fontSize:"12.5px",color:"#8e8e93"}}>
                  untouched 24h
                </span>
              </div>
              <i className="ti ti-chevron-right" style={{fontSize:"15px",color:"#c0c0c0"}} />
            </div>
            <div data-tid="w3" onClick={on(function(event){hcStaffTask('AvaniBot','Log the outcome of this morning\'s call')
})} style={{background:"#fff",borderRadius:"11px",padding:"8px 10px",display:"flex",alignItems:"center",gap:"9px",cursor:"pointer"}}>
              <div style={{width:"26px",height:"26px",borderRadius:"8px",background:"#fef3c7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                <i className="ti ti-notes" style={{fontSize:"15px",color:"#b45309"}} />
              </div>
              <div style={{flex:"1",minWidth:"0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                <span style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                  1 outcome
                </span>
                {" "}
                <span style={{fontSize:"12.5px",color:"#8e8e93"}}>
                  to log
                </span>
              </div>
              <i className="ti ti-chevron-right" style={{fontSize:"15px",color:"#c0c0c0"}} />
            </div>
          </div>
          <span id="taskLeadsSLA" style={{display:"none"}} />
        </div>
      </div>
    </div>
  );
}

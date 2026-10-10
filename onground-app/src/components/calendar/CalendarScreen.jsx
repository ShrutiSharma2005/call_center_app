import { on } from '../../utils/on';

/**
 * CalendarScreen
 *
 * Static markup converted 1:1 from the original HTML (id: asc-calendar, class: sc).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function CalendarScreen() {
  return (
    <div className="sc" id="asc-calendar">
      <div style={{padding:"12px 12px 0"}}>
        <div style={{fontSize:"16px",fontWeight:"700",color:"#1a1a1a",display:"flex",alignItems:"center"}}>
          <i className="ti ti-calendar" style={{marginRight:"7px",color:"#185fa5"}} />
          Calendar
        </div>
        <div style={{fontSize:"12.5px",color:"#8e8e93",marginTop:"1px"}}>
          Mirrored from your mailbox — invites created here land there too
        </div>
      </div>
      <div style={{background:"linear-gradient(135deg,#e8f0fe,#eef3fd)",borderRadius:"14px",padding:"11px 13px",margin:"10px 12px 4px",display:"flex",alignItems:"center",gap:"9px",border:"1px solid #dbe7fb"}}>
        <div style={{width:"30px",height:"30px",borderRadius:"9px",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0",boxShadow:"0 1px 3px rgba(24,95,165,.15)"}}>
          <i className="ti ti-mail" style={{color:"#185fa5",fontSize:"16px"}} />
        </div>
        <div style={{fontSize:"12.5px",color:"#0c2b52",lineHeight:"1.4"}}>
          Store visits, coaching sessions, and meeting invites all show up here — and in your mailbox.
        </div>
      </div>
      <div className="cal-card">
        <div style={{margin:"14px 14px 0",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"8px"}}>
          <button onClick={on(function(event){calMonthNav(-1)
})} style={{background:"#f2f2f7",border:"none",borderRadius:"10px",width:"32px",height:"32px",cursor:"pointer",flexShrink:"0"}}>
            <i className="ti ti-chevron-left" style={{fontSize:"16px",color:"#555"}} />
          </button>
          <div id="calMonthLabel" style={{fontSize:"16px",fontWeight:"800",color:"#1a1a1a",letterSpacing:"-.2px",flex:"1",textAlign:"center"}} />
          <button onClick={on(function(event){calJumpToday()
})} title="Jump to today" style={{background:"#e8f0fe",border:"1px solid #d3e3fc",borderRadius:"10px",padding:"0 11px",height:"28px",cursor:"pointer",fontSize:"13px",fontWeight:"700",color:"#185fa5",flexShrink:"0",whiteSpace:"nowrap"}}>
            Today
          </button>
          {" "}
          <button onClick={on(function(event){calMonthNav(1)
})} style={{background:"#f2f2f7",border:"none",borderRadius:"10px",width:"32px",height:"32px",cursor:"pointer",flexShrink:"0"}}>
            <i className="ti ti-chevron-right" style={{fontSize:"16px",color:"#555"}} />
          </button>
        </div>
        <div className="cal-month-weekdays" id="calMonthWeekdays" />
        <div className="cal-month-grid" id="calMonthGrid" />
      </div>
      <div style={{padding:"16px 12px 6px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}}>
        Upcoming
      </div>
      <div id="calInvitesListBody" style={{paddingBottom:"24px"}} />
    </div>
  );
}

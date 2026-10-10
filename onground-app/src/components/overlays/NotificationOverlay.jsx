import { on } from '../../utils/on';

/**
 * NotificationOverlay
 * Chat overlay for Pulse channels/DMs
 *
 * Static markup converted 1:1 from the original HTML (id: notificationOverlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function NotificationOverlay() {
  return (
    <div id="notificationOverlay" style={{position:"absolute",inset:"0",background:"#f7f7f9",zIndex:"320",display:"none",flexDirection:"column"}}>
      <div style={{background:"#fff",borderBottom:"1px solid #e5e5ea",padding:"14px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0",boxShadow:"0 1px 3px rgba(0,0,0,.04)"}}>
        <button onClick={on(function(event){closeNotificationOverlay()
})} title="Back" style={{background:"#f0f0f3",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#45454d",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
          ←
        </button>
        <div style={{flex:"1"}}>
          <div style={{fontSize:"16px",fontWeight:"800",color:"#1a1a1a"}}>
            Notifications
          </div>
          <div style={{fontSize:"12px",color:"#8e8e93"}} id="notifHeaderSub">
            —{" "}
          </div>
        </div>
      </div>
      <div style={{display:"flex",background:"#f2f2f7",margin:"10px 12px 0",borderRadius:"9px",padding:"2px"}} id="notifFilterRow">
        <button onClick={on(function(event){notifSetFilter('all',this)
})} className="notif-filter-btn active" style={{flex:"1",padding:"6px 11px",borderRadius:"7px",fontSize:"12.5px",fontWeight:"700",border:"none",cursor:"pointer",background:"#fff",color:"#1a1a1a"}}>
          All
        </button>
        {" "}
        <button onClick={on(function(event){notifSetFilter('action',this)
})} className="notif-filter-btn" style={{flex:"1",padding:"6px 11px",borderRadius:"7px",fontSize:"12.5px",fontWeight:"700",border:"none",cursor:"pointer",background:"none",color:"#8e8e93"}}>
          Needs action
        </button>
        {" "}
        <button onClick={on(function(event){notifSetFilter('alert',this)
})} className="notif-filter-btn" style={{flex:"1",padding:"6px 11px",borderRadius:"7px",fontSize:"12.5px",fontWeight:"700",border:"none",cursor:"pointer",background:"none",color:"#8e8e93"}}>
          Alerts
        </button>
      </div>
      <div style={{flex:"1",overflowY:"auto",padding:"12px"}} id="notifListBody" />
    </div>
  );
}

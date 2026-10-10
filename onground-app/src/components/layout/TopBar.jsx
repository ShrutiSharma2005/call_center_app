import { on } from '../../utils/on';

/**
 * TopBar
 *
 * Static markup converted 1:1 from the original HTML (id: -, class: topbar).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function TopBar() {
  return (
    <div className="topbar">
      <div style={{display:"flex",alignItems:"center"}}>
        <div className="brand-logo">
          OG
        </div>
        <span className="brand-name">
          On-Ground.ai
        </span>
      </div>
      <div className="topbar-right">
        <div className="notif-bell" onClick={on(function(event){openNotificationOverlay()
})} title="Notifications">
          <i className="ti ti-bell" />
          {" "}
          <span id="notifBellDot" style={{position:"absolute",top:"-2px",right:"-2px",width:"11px",height:"11px",borderRadius:"50%",background:"#ffd400",border:"2px solid #fff",boxShadow:"0 0 0 2px rgba(226,35,61,.35)",animation:"notifDotBlink 1.1s ease-in-out infinite"}} />
        </div>
        <div className="global-ranks">
          <div className="grank-pill gold" style={{padding:"2px 9px 2px 2px",gap:"5px"}}>
            <span onClick={on(function(event){openOgScoreDetail()
})} title="OG Score™ — your overall selling performance score" style={{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"4px"}}>
              <span className="og-ring sm" style={{"--pct":"76","--ring-color":"#1d9e75"}}>
                <span className="og-ring-val" style={{fontSize:"11px"}}>
                  76
                </span>
              </span>
            </span>
            {" "}
            <span onClick={on(function(event){openRankDetail()
})} title="Your Rank within RT Nagar: #3" className="gr-num" style={{fontSize:"12px",letterSpacing:".2px",cursor:"pointer"}}>
              ⭐#3
            </span>
          </div>
        </div>
        <div className="ar-badge" id="arBadge" onClick={on(function(event){toggleDropdown()
})}>
          <div className="ar-badge-ring" id="arBadgeRing" />
          <div className="ar-badge-inner" id="arBadgeInner">
            <span className="ar-badge-emoji" id="arBadgeEmoji">
              🦸‍♂️
            </span>
            {" "}
            <span className="ar-badge-initials" id="arBadgeInitials">
              AR
            </span>
          </div>
        </div>
        <div className="hamburger" onClick={on(function(event){toggleDropdown()
})}>
          <span />
          <span />
          <span />
        </div>
        <div className="user-dropdown" id="userDropdown">
          <div className="dd-header">
            <div className="dd-av" id="ddAvatar" style={{fontSize:"18px"}}>
              🦸‍♂️
            </div>
            <div>
              <div className="dd-name">
                Arvind Rajan
              </div>
              <div className="dd-store">
                Koramangala · The Sleep Company
              </div>
            </div>
          </div>
          <div className="dd-item" onClick={on(function(event){openAvatarPanel()
})}>
            <i className="ti ti-user-circle" />
            Avatar
          </div>
          <div className="dd-item" onClick={on(function(event){openSettings()
})}>
            <i className="ti ti-settings" />
            Settings
          </div>
          <div className="dd-item danger" onClick={on(function(event){toggleDropdown()
})}>
            <i className="ti ti-logout" />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

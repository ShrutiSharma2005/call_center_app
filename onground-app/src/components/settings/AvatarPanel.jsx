import { on } from '../../utils/on';

/**
 * AvatarPanel
 * Avatar panel
 *
 * Static markup converted 1:1 from the original HTML (id: avatarPanel, class: settings-panel).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AvatarPanel() {
  return (
    <div className="settings-panel" id="avatarPanel">
      <div className="settings-header">
        <i className="ti ti-arrow-left" onClick={on(function(event){closeAvatarPanel()
})} />
        <span>
          Avatar
        </span>
      </div>
      <div className="settings-section">
        Your Selling Persona
      </div>
      <div style={{margin:"4px 12px 0",background:"#fff",borderRadius:"12px 12px 0 0",padding:"12px 14px 6px",display:"flex",alignItems:"center",gap:"12px"}}>
        <div id="avatarPreviewBadge" style={{width:"48px",height:"48px",borderRadius:"50%",background:"#5dcaa5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",border:"2px solid #1d9e75",flexShrink:"0"}}>
          🦸‍♂️
        </div>
        <div>
          <div style={{fontSize:"14.5px",fontWeight:"600",color:"#1a1a1a"}} id="avatarPreviewName">
            Captain
          </div>
          <div style={{fontSize:"12.5px",color:"#8e8e93",marginTop:"2px"}}>
            Pick the persona shown on your profile badge
          </div>
        </div>
      </div>
      <div className="sav-grid">
        <div className="sav-opt selected" onClick={on(function(event){selectSellingAvatar(this,'🦸‍♂️','Captain')
})}>
          <div className="sav-opt-img" style={{background:"#e6f1fb"}}>
            🦸‍♂️
          </div>
          <div className="sav-opt-label">
            Captain
          </div>
        </div>
        <div className="sav-opt" onClick={on(function(event){selectSellingAvatar(this,'🦸‍♀️','Valkyrie')
})}>
          <div className="sav-opt-img" style={{background:"#fcebeb"}}>
            🦸‍♀️
          </div>
          <div className="sav-opt-label">
            Valkyrie
          </div>
        </div>
        <div className="sav-opt" onClick={on(function(event){selectSellingAvatar(this,'🦹‍♀️','Vortex')
})}>
          <div className="sav-opt-img" style={{background:"#f3e8ff"}}>
            🦹‍♀️
          </div>
          <div className="sav-opt-label">
            Vortex
          </div>
        </div>
        <div className="sav-opt" onClick={on(function(event){selectSellingAvatar(this,'🦹‍♂️','Blaze')
})}>
          <div className="sav-opt-img" style={{background:"#fff3e0"}}>
            🦹‍♂️
          </div>
          <div className="sav-opt-label">
            Blaze
          </div>
        </div>
        <div className="sav-opt" onClick={on(function(event){selectSellingAvatar(this,'🥷','Shadow')
})}>
          <div className="sav-opt-img" style={{background:"#e1f5ee"}}>
            🥷
          </div>
          <div className="sav-opt-label">
            Shadow
          </div>
        </div>
      </div>
      <div style={{margin:"16px 12px 0"}}>
        <button onClick={on(function(event){saveAvatarAndClose()
})} style={{width:"100%",padding:"13px",border:"none",borderRadius:"100px",fontSize:"15px",color:"#fff",background:"#1d9e75",cursor:"pointer",fontWeight:"600",boxShadow:"0 2px 8px rgba(29,158,117,.4)"}}>
          Save Avatar
        </button>
      </div>
    </div>
  );
}

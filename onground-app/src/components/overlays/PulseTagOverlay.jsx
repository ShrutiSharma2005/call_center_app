import { on } from '../../utils/on';

/**
 * PulseTagOverlay
 * Tag / forward staff sheet
 *
 * Static markup converted 1:1 from the original HTML (id: pulseTagOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PulseTagOverlay() {
  return (
    <div className="ios-overlay" id="pulseTagOverlay">
      <div className="ios-sheet" style={{position:"relative"}}>
        <div className="ios-sheet-handle" />
        <button className="sheet-close-btn" onClick={on(function(event){closePulseTagSheet()
})}>
          ✕
        </button>
        <div className="ios-sheet-inner">
          <div className="ios-sheet-title">
            Tag or forward
          </div>
          <div className="ios-sheet-sub" style={{marginBottom:"12px"}}>
            Loop in a teammate or your manager on this chat
          </div>
          <div id="pulseTagList">
            <div className="pulse-tag-opt" data-name="Sunita Rao" onClick={on(function(event){togglePulseTagPerson(this)
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 10px",border:"1.5px solid #e5e5ea",borderRadius:"11px",marginBottom:"7px",cursor:"pointer"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"#faeeda",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12.5px",fontWeight:"700",color:"#854f0b",flexShrink:"0"}}>
                SR
              </div>
              <div style={{flex:"1"}}>
                <div style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                  Sunita Rao
                </div>
                <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                  Store Manager
                </div>
              </div>
              <i className="ti ti-circle-check" style={{fontSize:"16px",color:"#c0c0c0"}} />
            </div>
            <div className="pulse-tag-opt" data-name="Priya Krishnan" onClick={on(function(event){togglePulseTagPerson(this)
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 10px",border:"1.5px solid #e5e5ea",borderRadius:"11px",marginBottom:"7px",cursor:"pointer"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"#e1f5ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12.5px",fontWeight:"700",color:"#0f6e56",flexShrink:"0"}}>
                PK
              </div>
              <div style={{flex:"1"}}>
                <div style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                  Priya Krishnan
                </div>
                <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                  Sales Associate
                </div>
              </div>
              <i className="ti ti-circle-check" style={{fontSize:"16px",color:"#c0c0c0"}} />
            </div>
            <div className="pulse-tag-opt" data-name="Raju Kumar" onClick={on(function(event){togglePulseTagPerson(this)
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 10px",border:"1.5px solid #e5e5ea",borderRadius:"11px",marginBottom:"2px",cursor:"pointer"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"#e5f1fb",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12.5px",fontWeight:"700",color:"#1a56a0",flexShrink:"0"}}>
                RK
              </div>
              <div style={{flex:"1"}}>
                <div style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                  Raju Kumar
                </div>
                <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                  Sales Associate
                </div>
              </div>
              <i className="ti ti-circle-check" style={{fontSize:"16px",color:"#c0c0c0"}} />
            </div>
          </div>
          <div className="ios-btn-row" style={{marginTop:"12px"}}>
            <button className="ios-btn-secondary" onClick={on(function(event){pulseTagAction('tag')
})}>
              Tag in Chat
            </button>
            {" "}
            <button onClick={on(function(event){pulseTagAction('forward')
})} style={{flex:"1",padding:"13px",border:"none",borderRadius:"100px",fontSize:"14.5px",color:"#fff",background:"#1d9e75",cursor:"pointer",fontWeight:"600"}}>
              Forward Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

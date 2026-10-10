import { on } from '../../utils/on';

/**
 * SettingsProfileFields
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function SettingsProfileFields() {
  return (
    <div style={{margin:"6px 12px 10px",background:"#fff",borderRadius:"12px",padding:"12px 14px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 10px"}}>
        <div>
          <div style={{fontSize:"11.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"3px"}}>
            Full Name
          </div>
          <input defaultValue="Aditi Sharma" onInput={on(function(event){markSettingsDirty()
})} style={{width:"100%",fontSize:"13.5px",fontWeight:"600",color:"#1a1a1a",background:"#f7f7f9",border:"1px solid #e5e5ea",borderRadius:"9px",padding:"8px 10px",boxSizing:"border-box"}} />
        </div>
        <div>
          <div style={{fontSize:"11.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"3px"}}>
            Employee ID
          </div>
          <input defaultValue="OG-EMP-07734" disabled style={{width:"100%",fontSize:"13.5px",fontWeight:"700",color:"#8e8e93",background:"#eeeef1",border:"1px solid #e0e0e5",borderRadius:"9px",padding:"8px 10px",boxSizing:"border-box",cursor:"not-allowed"}} />
        </div>
        <div>
          <div style={{fontSize:"11.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"3px"}}>
            Email
          </div>
          <input defaultValue="aditi.s@ogretail.in" onInput={on(function(event){markSettingsDirty()
})} style={{width:"100%",fontSize:"13.5px",fontWeight:"600",color:"#1a1a1a",background:"#f7f7f9",border:"1px solid #e5e5ea",borderRadius:"9px",padding:"8px 10px",boxSizing:"border-box"}} />
        </div>
        <div>
          <div style={{fontSize:"11.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"3px"}}>
            Phone Number
          </div>
          <input defaultValue="+91 98450 11223" onInput={on(function(event){markSettingsDirty()
})} style={{width:"100%",fontSize:"13.5px",fontWeight:"600",color:"#1a1a1a",background:"#f7f7f9",border:"1px solid #e5e5ea",borderRadius:"9px",padding:"8px 10px",boxSizing:"border-box"}} />
        </div>
      </div>
    </div>
  );
}

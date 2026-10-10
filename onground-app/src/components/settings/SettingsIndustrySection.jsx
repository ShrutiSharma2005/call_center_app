import { on } from '../../utils/on';

/**
 * SettingsIndustrySection
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function SettingsIndustrySection() {
  return (
    <div style={{margin:"6px 12px 10px",background:"#fff",borderRadius:"12px",padding:"12px 14px"}}>
      <div id="industryLockNote" style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"10px"}}>
        <i className="ti ti-lock" style={{fontSize:"13.5px",color:"#8e8e93"}} />
        <div style={{fontSize:"12.5px",color:"#666",lineHeight:"1.5"}}>
          Set by your brand's M3 Super Admin in the Manager web app (Settings → General → Brand Vertical). Contact your admin to change this.
        </div>
      </div>
      <div id="verticalOptRetail" className="vertical-opt selected" onClick={on(function(event){devModeOn && setVertical('retail')
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 12px",border:"1.5px solid #1d9e75",background:"#f0fff6",borderRadius:"12px",cursor:"default",marginBottom:"8px"}}>
        <div style={{width:"34px",height:"34px",borderRadius:"9px",background:"#e7f9ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:"0"}}>
          🛏️
        </div>
        <div style={{flex:"1"}}>
          <div style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
            Retail — Premium Brands
          </div>
          <div style={{fontSize:"12px",color:"#8e8e93",marginTop:"1px"}}>
            Mattress / furniture retail — Call Centre Staff
          </div>
        </div>
        <i className="ti ti-circle-check" style={{fontSize:"16px",color:"#1d9e75",flexShrink:"0"}} id="verticalCheckRetail" />
      </div>
      <div id="verticalOptHealth" className="vertical-opt" onClick={on(function(event){devModeOn && setVertical('healthcare')
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 12px",border:"1.5px solid #e5e5ea",background:"#fff",borderRadius:"12px",cursor:"default",opacity:".5"}}>
        <div style={{width:"34px",height:"34px",borderRadius:"9px",background:"#fdecec",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:"0"}}>
          🏥
        </div>
        <div style={{flex:"1"}}>
          <div style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
            Healthcare — Hospital
          </div>
          <div style={{fontSize:"12px",color:"#8e8e93",marginTop:"1px"}}>
            Patient helpline — Helpline Staff
          </div>
        </div>
        <i className="ti ti-circle-check" style={{fontSize:"16px",color:"#c0c0c0",flexShrink:"0"}} id="verticalCheckHealth" />
      </div>
    </div>
  );
}

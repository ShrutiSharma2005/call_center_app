/**
 * PractisePicker
 * STATE 1: Picker grid
 *
 * Static markup converted 1:1 from the original HTML (id: practise-picker).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PractisePicker() {
  return (
    <div id="practise-picker">
      <div style={{margin:"12px 14px",background:"linear-gradient(135deg,#0a2a1e,#0f6e56)",borderRadius:"12px",padding:"12px 14px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-8px",top:"-8px",fontSize:"52px",opacity:".12"}}>
          🎙️
        </div>
        <div style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"600",textTransform:"uppercase",letterSpacing:".6px",marginBottom:"4px"}}>
          ✦ Your Net Practise
        </div>
        <div style={{fontSize:"14.5px",fontWeight:"600",color:"#fff",marginBottom:"3px"}}>
          Pick a step to rehearse
        </div>
        <div style={{fontSize:"12.5px",color:"#9fe1cb",lineHeight:"1.5"}}>
          See how it's done, record your own take, get instant feedback — just like net practise before the real match.
        </div>
      </div>
      <div id="avaniFocusBanner" style={{display:"none",margin:"0 14px 10px",background:"#fef6ec",border:"1px solid #f5cf94",borderRadius:"11px",padding:"9px 11px",alignItems:"center",gap:"7px"}}>
        <i className="ti ti-target" style={{color:"#c8860a",fontSize:"16px",flexShrink:"0"}} />
        {" "}
        <span style={{fontSize:"13px",color:"#7c4a00",fontWeight:"600",lineHeight:"1.4"}} />
      </div>
      <div id="practise-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",padding:"0 14px"}} />
    </div>
  );
}

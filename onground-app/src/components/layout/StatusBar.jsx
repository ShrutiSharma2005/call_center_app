/**
 * StatusBar
 *
 * Static markup converted 1:1 from the original HTML (id: -, class: ios-status).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function StatusBar() {
  return (
    <div className="ios-status">
      <span style={{marginLeft:"14px"}}>
        9:41
      </span>
      <div style={{width:"10px",height:"10px",borderRadius:"50%",background:"#1d9e75",border:"2px solid #333"}} />
      <span style={{marginRight:"6px",display:"flex",gap:"3px",alignItems:"center"}}>
        <i className="ti ti-wifi" style={{fontSize:"13.5px"}} />
        <i className="ti ti-battery-2" style={{fontSize:"13.5px"}} />
      </span>
    </div>
  );
}

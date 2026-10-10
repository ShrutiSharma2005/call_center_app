import { on } from '../../../utils/on';

/**
 * CustomerTypePicker
 * Customer type toggle — feeds the Repeat Customer window logic set by the manager (First Time / Repeat Customer segmentation used across Dashboard & Moments)
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function CustomerTypePicker() {
  return (
    <div style={{margin:"0 0 10px"}}>
      <div style={{fontSize:"13.5px",fontWeight:"700",color:"#6b6b74",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"6px"}}>
        Customer Type
      </div>
      <div style={{display:"flex",gap:"8px"}}>
        <label style={{flex:"1",display:"flex",alignItems:"center",gap:"7px",background:"#f9f9f9",border:"1.5px solid #e5e5ea",borderRadius:"10px",padding:"8px 10px",cursor:"pointer",transition:"border-color .2s"}} id="custFirstLbl">
          <input type="radio" name="custType" defaultValue="first" style={{accentColor:"#1d9e75",width:"14px",height:"14px"}} onChange={on(function(event){this.closest('label').style.borderColor='#1d9e75';this.closest('label').style.background='#f0faf5';document.getElementById('custRepeatLbl').style.borderColor='#e5e5ea';document.getElementById('custRepeatLbl').style.background='#f9f9f9'
})} />
          {" "}
          <span style={{fontSize:"14.5px",color:"#1a1a1a",flex:"1"}}>
            🆕 First Time
          </span>
        </label>
        {" "}
        <label style={{flex:"1",display:"flex",alignItems:"center",gap:"7px",background:"#f9f9f9",border:"1.5px solid #e5e5ea",borderRadius:"10px",padding:"8px 10px",cursor:"pointer",transition:"border-color .2s"}} id="custRepeatLbl">
          <input type="radio" name="custType" defaultValue="repeat" style={{accentColor:"#1d9e75",width:"14px",height:"14px"}} onChange={on(function(event){this.closest('label').style.borderColor='#1d9e75';this.closest('label').style.background='#f0faf5';document.getElementById('custFirstLbl').style.borderColor='#e5e5ea';document.getElementById('custFirstLbl').style.background='#f9f9f9'
})} />
          {" "}
          <span style={{fontSize:"14.5px",color:"#1a1a1a",flex:"1"}}>
            🔁 Repeat Customer
          </span>
        </label>
      </div>
      <div style={{fontSize:"12.5px",color:"#6b6b74",marginTop:"5px"}}>
        Not sure? Leave blank — Avani falls back to your manager's repeat-visit window &amp; phone match.
      </div>
    </div>
  );
}

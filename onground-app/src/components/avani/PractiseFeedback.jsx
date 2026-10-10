import { on } from '../../utils/on';

/**
 * PractiseFeedback
 * STATE 4: Feedback
 *
 * Static markup converted 1:1 from the original HTML (id: practise-feedback).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PractiseFeedback() {
  return (
    <div id="practise-feedback" style={{display:"none",padding:"0 14px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"6px",padding:"14px 0 8px",cursor:"pointer",color:"#1d9e75",fontSize:"13.5px",fontWeight:"600"}} onClick={on(function(event){practiseBackToPicker()
})}>
        <i className="ti ti-chevron-left" />
        {" "}All steps
      </div>
      <div style={{background:"#fff",borderRadius:"14px",padding:"16px",boxShadow:"0 1px 3px rgba(0,0,0,.08)",marginBottom:"14px"}}>
        <div id="practise-fb-title" style={{fontSize:"16px",fontWeight:"800",marginBottom:"3px"}} />
        <div id="practise-fb-duration" style={{fontSize:"13px",color:"#8e8e93",marginBottom:"14px"}} />
        <div style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"4px"}}>
          What we checked for
        </div>
        <div id="practise-fb-checklist" />
        <div style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px",margin:"14px 0 4px"}}>
          Coach's note
        </div>
        <div id="practise-fb-tip" style={{fontSize:"13.5px",color:"#1a1a1a",lineHeight:"1.6",background:"#f4fef8",borderRadius:"10px",padding:"10px 12px"}} />
      </div>
      <div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>
        <button onClick={on(function(event){practiseSelect(practiseCurrent.id)
})} style={{flex:"1",padding:"11px",background:"#fff",border:"1.5px solid #1d9e75",borderRadius:"12px",color:"#1d9e75",fontSize:"13.5px",fontWeight:"700",cursor:"pointer"}}>
          Practise Again
        </button>
        {" "}
        <button onClick={on(function(event){practiseBackToPicker()
})} style={{flex:"1",padding:"11px",background:"#1d9e75",border:"none",borderRadius:"12px",color:"#fff",fontSize:"13.5px",fontWeight:"700",cursor:"pointer"}}>
          Choose Another Step
        </button>
      </div>
    </div>
  );
}

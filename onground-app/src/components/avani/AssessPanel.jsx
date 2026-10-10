import { on } from '../../utils/on';
import AssessChatScroll from './AssessChatScroll';
import AssessInputBar from './AssessInputBar';

/**
 * AssessPanel
 * FULL-WIDTH: Assess chat panel
 *
 * Static markup converted 1:1 from the original HTML (id: a-panel-assess).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AssessPanel() {
  return (
    <div id="a-panel-assess" style={{display:"flex",flexDirection:"column",flex:"1",minWidth:"0",background:"#f7f7f5",position:"relative",height:"100%"}}>
      {/* Top bar inside assess with history toggle */}
      <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"7px 12px 6px",background:"#f7f7f5",borderBottom:"0.5px solid #ebebeb",flexShrink:"0"}}>
        <button onClick={on(function(event){openAssessHistory()
})} style={{display:"flex",alignItems:"center",gap:"5px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"20px",padding:"5px 11px",cursor:"pointer",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
          <i className="ti ti-layout-sidebar" style={{fontSize:"14.5px",color:"#1d9e75"}} />
          {" "}
          <span style={{fontSize:"12.5px",color:"#333",fontWeight:"500"}}>
            Chats
          </span>
        </button>
        {" "}
        <span style={{fontSize:"12.5px",color:"#8e8e93",flex:"1",textAlign:"center"}} id="assess-session-title">
          New session
        </span>
        {" "}
        <button onClick={on(function(event){startNewAssessChat()
})} style={{width:"28px",height:"28px",borderRadius:"50%",background:"#1d9e75",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} title="New chat">
          <i className="ti ti-edit" style={{fontSize:"14.5px",color:"#fff"}} />
        </button>
      </div>
      {/* Chat messages scroll area */}
      <AssessChatScroll />
      {/* Claude-style input bar — fixed at bottom of panel */}
      <AssessInputBar />
    </div>
  );
}

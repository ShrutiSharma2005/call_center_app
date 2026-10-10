import { on } from '../../utils/on';
import PractiseFeedback from './PractiseFeedback';
import PractiseHowTo from './PractiseHowTo';
import PractisePicker from './PractisePicker';

/**
 * PractisePanel
 * PRACTISE PANEL: net-practise ground — pick a step, learn it, record it, get feedback
 *
 * Static markup converted 1:1 from the original HTML (id: a-panel-practise).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PractisePanel() {
  return (
    <div id="a-panel-practise" style={{display:"none",overflowY:"auto",paddingBottom:"80px",height:"calc(100% - 118px)"}}>
      {/* STATE 1: Picker grid */}
      <PractisePicker />
      {/* STATE 2: How-to (tip + example + watch video placeholder) */}
      <PractiseHowTo />
      {/* STATE 3: Recording */}
      <div id="practise-recording" style={{display:"none",padding:"40px 14px",textAlign:"center"}}>
        <div id="practise-rec-title" style={{fontSize:"14.5px",fontWeight:"600",color:"#1a1a1a",marginBottom:"24px"}} />
        <div style={{width:"110px",height:"110px",borderRadius:"50%",background:"#e1f5ee",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",position:"relative"}}>
          <div id="practise-rec-dot" className="practise-pulse" />
          <i className="ti ti-microphone" style={{fontSize:"38px",color:"#1d9e75",position:"relative",zIndex:"1"}} />
        </div>
        <div id="practise-rec-timer" style={{fontSize:"22px",fontWeight:"800",color:"#1a1a1a",marginBottom:"4px"}}>
          0:00
        </div>
        <div style={{fontSize:"12.5px",color:"#8e8e93",marginBottom:"28px"}}>
          Recording — say it like you would on the floor
        </div>
        <button onClick={on(function(event){practiseStopRecording()
})} style={{padding:"12px 32px",background:"#e24b4a",border:"none",borderRadius:"24px",color:"#fff",fontSize:"14.5px",fontWeight:"700",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px"}}>
          <i className="ti ti-player-stop" />
          {" "}Stop &amp; Get Feedback
        </button>
      </div>
      {/* STATE 4: Feedback */}
      <PractiseFeedback />
    </div>
  );
}

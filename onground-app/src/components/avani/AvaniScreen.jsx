import { on } from '../../utils/on';
import AvaniSplitArea from './AvaniSplitArea';
import AvatarPicker from './AvatarPicker';
import LearnPanel from './LearnPanel';
import PractisePanel from './PractisePanel';

/**
 * AvaniScreen
 * AVANI AI
 *
 * Static markup converted 1:1 from the original HTML (id: asc-avani, class: sc).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AvaniScreen() {
  return (
    <div className="sc" id="asc-avani" style={{position:"relative",overflow:"hidden"}}>
      {/* FIX 3: Avani always a lady — refined female SVG avatars */}
      <AvatarPicker />
      <div style={{background:"#0f6e56",padding:"8px 16px 0",position:"relative"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
          <span style={{fontSize:"15px",fontWeight:"600",color:"#fff"}}>
            Avani AI
          </span>
          {" "}
          <span style={{fontSize:"12.5px",color:"#9fe1cb"}}>
            Your personal sales coach ✨
          </span>
        </div>
        <div className="seg-control" style={{margin:"0 0 0"}}>
          <button className="seg-btn active" id="avaniDefaultBtn" onClick={on(function(event){aSetMode(this,'assess')
})}>
            Assess
          </button>
          {" "}
          <button className="seg-btn" onClick={on(function(event){aSetMode(this,'learn')
})}>
            Learn
          </button>
          {" "}
          <button className="seg-btn" onClick={on(function(event){aSetMode(this,'practise')
})}>
            Practise
          </button>
        </div>
        <div style={{height:"10px"}} />
      </div>
      {/* ── Assess layout: full-width chat + collapsible history drawer ─── */}
      <AvaniSplitArea />
      {/* LEARN PANEL: shown when Learn mode is active, outside split */}
      <LearnPanel />
      {/* PRACTISE PANEL: net-practise ground — pick a step, learn it, record it, get feedback */}
      <PractisePanel />
    </div>
  );
}

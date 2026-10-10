import { on } from '../../utils/on';

/**
 * AssessChatScroll
 * Chat messages scroll area
 *
 * Static markup converted 1:1 from the original HTML (id: assess-chat-scroll).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AssessChatScroll() {
  return (
    <div id="assess-chat-scroll" style={{flex:"1",overflowY:"auto",padding:"16px 14px 8px",scrollBehavior:"smooth"}}>
      {/* Initial Avani message */}
      <div className="avani-msg-row" style={{display:"flex",gap:"8px",marginBottom:"16px",alignItems:"flex-start"}}>
        <div style={{width:"26px",height:"26px",borderRadius:"50%",background:"linear-gradient(135deg,#0f6e56,#1d9e75)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0",marginTop:"2px"}}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <circle cx="7" cy="7" r="7" fill="none" />
            <path d="M3 4.5h8M3 7h6M3 9.5h7" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{flex:"1"}}>
          <div style={{fontSize:"12.5px",fontWeight:"600",color:"#1d9e75",marginBottom:"4px",letterSpacing:".2px"}}>
            Avani AI
          </div>
          <div className="avani-bubble" style={{fontSize:"14.5px",color:"#1a1a1a",lineHeight:"1.6"}}>
            {" "}Ready to assess! Ask me anything about products, sales techniques, or objection handling — I'll give you feedback and coaching. 🎯{" "}
          </div>
          {/* Suggestion chips */}
          <div id="assess-chips" style={{display:"flex",flexWrap:"wrap",gap:"6px",marginTop:"10px"}}>
            <div onClick={on(function(event){assessChip('How do I explain the 100-night trial?')
})} style={{padding:"6px 11px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"20px",fontSize:"12.5px",color:"#333",cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",boxShadow:"0 1px 3px rgba(0,0,0,.05)",whiteSpace:"nowrap"}}>
              <i className="ti ti-moon" style={{fontSize:"13.5px",color:"#1d9e75"}} />
              100-night trial
            </div>
            <div onClick={on(function(event){assessChip('How do I handle price objections?')
})} style={{padding:"6px 11px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"20px",fontSize:"12.5px",color:"#333",cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",boxShadow:"0 1px 3px rgba(0,0,0,.05)",whiteSpace:"nowrap"}}>
              <i className="ti ti-currency-rupee" style={{fontSize:"13.5px",color:"#1d9e75"}} />
              Price objection
            </div>
            <div onClick={on(function(event){assessChip('What are my weak areas this week?')
})} style={{padding:"6px 11px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"20px",fontSize:"12.5px",color:"#333",cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",boxShadow:"0 1px 3px rgba(0,0,0,.05)",whiteSpace:"nowrap"}}>
              <i className="ti ti-chart-bar" style={{fontSize:"13.5px",color:"#1d9e75"}} />
              My weak areas
            </div>
            <div onClick={on(function(event){assessChip('Quiz me on the warranty policy')
})} style={{padding:"6px 11px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"20px",fontSize:"12.5px",color:"#333",cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",boxShadow:"0 1px 3px rgba(0,0,0,.05)",whiteSpace:"nowrap"}}>
              <i className="ti ti-shield" style={{fontSize:"13.5px",color:"#1d9e75"}} />
              Warranty quiz
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

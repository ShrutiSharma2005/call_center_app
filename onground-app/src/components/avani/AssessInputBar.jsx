import { on } from '../../utils/on';

/**
 * AssessInputBar
 * Claude-style input bar — fixed at bottom of panel
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AssessInputBar() {
  return (
    <div style={{padding:"8px 12px 12px",background:"#f7f7f5",flexShrink:"0",borderTop:"1px solid #ebebeb"}}>
      {/* Attachment preview */}
      <div id="assess-attachment-preview" style={{display:"none",marginBottom:"6px"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:"6px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"10px",padding:"5px 10px",fontSize:"12.5px",color:"#1a1a1a",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
          <i className="ti ti-file-text" style={{fontSize:"14.5px",color:"#1d9e75"}} />
          {" "}
          <span id="assess-attachment-name">
            file.pdf
          </span>
          {" "}
          <button onClick={on(function(event){removeAttachment()
})} style={{background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:"14.5px",padding:"0",marginLeft:"2px",lineHeight:"1",display:"flex",alignItems:"center"}}>
            ✕
          </button>
        </div>
      </div>
      {/* Input box */}
      <div style={{background:"#fff",border:"1.5px solid #e0e0e0",borderRadius:"20px",boxShadow:"0 2px 10px rgba(0,0,0,.06)",transition:"border-color .2s"}} id="assess-input-box">
        <div style={{display:"flex",alignItems:"flex-end",gap:"6px",padding:"8px 10px 8px 14px"}}>
          {/* Attach */}
          <label htmlFor="assess-file-input" style={{cursor:"pointer",flexShrink:"0",width:"28px",height:"28px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:"#f2f2f7"}} title="Attach file">
            <i className="ti ti-paperclip" style={{fontSize:"15px",color:"#888"}} />
          </label>
          {" "}
          <input type="file" id="assess-file-input" style={{display:"none"}} accept=".pdf,.doc,.docx,.txt,.jpg,.png" onChange={on(function(event){handleAssessAttachment(this)
})} />
          {" "}
          {/* Textarea */}
          <textarea id="assess-input" placeholder="Ask Avani anything…" rows="1" style={{flex:"1",border:"none",outline:"none",resize:"none",fontSize:"14.5px",color:"#1a1a1a",background:"transparent",fontFamily:"inherit",lineHeight:"1.5",maxHeight:"88px",overflowY:"auto",padding:"4px 0",minHeight:"24px"}} onInput={on(function(event){assessInputChange(this)
})} onKeyDown={on(function(event){if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendAssessMessage()}
})} onFocus={on(function(event){document.getElementById('assess-input-box').style.borderColor='#1d9e75'
})} onBlur={on(function(event){document.getElementById('assess-input-box').style.borderColor='#e0e0e0'
})} />
          {" "}
          {/* Mic / Send */}
          <button id="assess-mic-btn" onClick={on(function(event){toggleAssessMic()
})} style={{width:"32px",height:"32px",borderRadius:"50%",border:"none",display:"flex",alignItems:"center",justifyContent:"center",background:"#f2f2f7",cursor:"pointer",flexShrink:"0",transition:"background .2s"}}>
            <i className="ti ti-microphone" style={{fontSize:"16px",color:"#666"}} />
          </button>
          {" "}
          <button id="assess-send-btn" onClick={on(function(event){sendAssessMessage()
})} style={{width:"32px",height:"32px",borderRadius:"50%",border:"none",display:"flex",alignItems:"center",justifyContent:"center",background:"#1d9e75",cursor:"pointer",flexShrink:"0",opacity:".4",transition:"opacity .2s",pointerEvents:"none"}}>
            <i className="ti ti-arrow-up" style={{fontSize:"16px",color:"#fff"}} />
          </button>
        </div>
      </div>
      <div style={{textAlign:"center",fontSize:"12.5px",color:"#bbb",marginTop:"5px"}}>
        Avani may make mistakes. Verify with your manager.
      </div>
    </div>
  );
}

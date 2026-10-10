import { on } from '../../../utils/on';

/**
 * QuoteAndIcpSection
 * Quote asked radio
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function QuoteAndIcpSection() {
  return (
    <div style={{margin:"4px 0 10px"}}>
      <div style={{fontSize:"13.5px",fontWeight:"700",color:"#6b6b74",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"6px"}}>
        Quote &amp; ICP
      </div>
      <div style={{display:"flex",gap:"8px",marginBottom:"10px"}}>
        <label style={{flex:"1",display:"flex",alignItems:"center",gap:"7px",background:"#f9f9f9",border:"1.5px solid #e5e5ea",borderRadius:"10px",padding:"8px 10px",cursor:"pointer",transition:"border-color .2s"}} id="quoteYesLbl">
          <input type="radio" name="quoteReq" defaultValue="yes" style={{accentColor:"#1d9e75",width:"14px",height:"14px"}} onChange={on(function(event){this.closest('label').style.borderColor='#1d9e75';document.getElementById('quoteNoLbl').style.borderColor='#e5e5ea'
})} />
          {" "}
          <span style={{fontSize:"14.5px",color:"#1a1a1a",flex:"1"}}>
            Wants a quote
          </span>
          {" "}
          <i className="ti ti-receipt" style={{fontSize:"15.5px",color:"#1d9e75"}} />
        </label>
        {" "}
        <label style={{flex:"1",display:"flex",alignItems:"center",gap:"7px",background:"#f9f9f9",border:"1.5px solid #e5e5ea",borderRadius:"10px",padding:"8px 10px",cursor:"pointer"}} id="quoteNoLbl">
          <input type="radio" name="quoteReq" defaultValue="no" defaultChecked style={{accentColor:"#6b6b74",width:"14px",height:"14px"}} />
          {" "}
          <span style={{fontSize:"14.5px",color:"#1a1a1a",flex:"1"}}>
            No quote
          </span>
        </label>
      </div>
      {/* ICP breakdown */}
      <div style={{background:"#f9f9f9",borderRadius:"12px",border:"0.5px solid #e5e5ea",padding:"10px 12px"}}>
        <div className="icp-fold-head" onClick={on(function(event){this.querySelector('.icp-fold-chev').classList.toggle('open');this.nextElementSibling.classList.toggle('open')
})}>
          <div style={{fontSize:"12.5px",fontWeight:"700",color:"#555",textTransform:"uppercase",letterSpacing:".5px"}}>
            🎯 ICP Fit — This Lead
          </div>
          <i className="ti ti-chevron-right icp-fold-chev" />
        </div>
        <div className="icp-fold-body">
          <div style={{marginBottom:"7px",paddingTop:"8px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"3px"}}>
              <span style={{fontSize:"13.5px",color:"#1a1a1a",fontWeight:"500"}}>
                Budget Fit
              </span>
              <span style={{fontSize:"14.5px",fontWeight:"700",color:"#1d9e75"}}>
                80%
              </span>
            </div>
            <div style={{height:"5px",background:"#e5e5ea",borderRadius:"3px",overflow:"hidden"}}>
              <div style={{width:"80%",height:"100%",background:"#1d9e75",borderRadius:"3px"}} />
            </div>
            <div style={{fontSize:"12.5px",color:"#6b6b74",marginTop:"2px"}}>
              Matches pricing tier
            </div>
          </div>
          <div style={{marginBottom:"7px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"3px"}}>
              <span style={{fontSize:"13.5px",color:"#1a1a1a",fontWeight:"500"}}>
                Need Match
              </span>
              <span style={{fontSize:"14.5px",fontWeight:"700",color:"#c8860a"}}>
                65%
              </span>
            </div>
            <div style={{height:"5px",background:"#e5e5ea",borderRadius:"3px",overflow:"hidden"}}>
              <div style={{width:"65%",height:"100%",background:"#c8860a",borderRadius:"3px"}} />
            </div>
            <div style={{fontSize:"12.5px",color:"#6b6b74",marginTop:"2px"}}>
              Pain point partially addressed
            </div>
          </div>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"3px"}}>
              <span style={{fontSize:"13.5px",color:"#1a1a1a",fontWeight:"500"}}>
                Decision Stage
              </span>
              <span style={{fontSize:"14.5px",fontWeight:"700",color:"#7c3aed"}}>
                55%
              </span>
            </div>
            <div style={{height:"5px",background:"#e5e5ea",borderRadius:"3px",overflow:"hidden"}}>
              <div style={{width:"55%",height:"100%",background:"#7c3aed",borderRadius:"3px"}} />
            </div>
            <div style={{fontSize:"12.5px",color:"#6b6b74",marginTop:"2px"}}>
              Exploring, not ready to buy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

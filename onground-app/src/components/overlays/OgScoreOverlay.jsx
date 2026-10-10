import { on } from '../../utils/on';

/**
 * OgScoreOverlay
 * OG Score™ detail — capability breakdown, improvement areas, link to training modules
 *
 * Static markup converted 1:1 from the original HTML (id: ogScoreOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function OgScoreOverlay() {
  return (
    <div className="ios-overlay" id="ogScoreOverlay">
      <div className="ios-sheet og-score-sheet" style={{position:"relative"}}>
        <div className="ios-sheet-handle" />
        <button className="sheet-close-btn" onClick={on(function(event){closeOgScoreDetail()
})}>
          ✕
        </button>
        <div className="ios-sheet-inner" style={{padding:"20px 20px 24px"}}>
          <div className="og-hero">
            <div className="og-hero-tag">
              OG Score™
            </div>
            <div className="og-ring lg" style={{"--pct":"76","--ring-color":"#1d9e75"}}>
              <span className="og-ring-val">
                76
                <span className="og-ring-sub">
                  / 100
                </span>
              </span>
            </div>
            <div className="og-hero-delta">
              ▲ +13 since period start
            </div>
            <div className="og-hero-percentile">
              72nd percentile across all staff
            </div>
          </div>
          <div className="og-radar-wrap">
            <canvas id="ogCapabilityRadar" />
          </div>
          <div className="og-critical-box">
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <i className="ti ti-flame" style={{fontSize:"17px",color:"#c8860a",flexShrink:"0"}} />
              {" "}
              <span style={{fontSize:"14px",color:"#7c4a00",lineHeight:"1.4"}}>
                <b style={{color:"#5c3a00"}}>
                  Top 28%
                </b>
                {" "}on OG Score™ · +5pts unlocks{" "}
                <b style={{color:"#5c3a00"}}>
                  +4% earning potential
                </b>
              </span>
            </div>
            <div className="og-percentile-track">
              <div className="og-percentile-marker" style={{left:"72%"}} />
            </div>
            <div style={{fontSize:"12.5px",color:"#8a6d3d",marginTop:"5px"}}>
              This is why OG Score™ matters — it's the single number most closely tied to your earning potential. Keep an eye on it every week.
            </div>
          </div>
          <div className="og-improve-box">
            <div className="og-improve-title">
              <i className="ti ti-bulb" />
              Your biggest lever right now
            </div>
            <div className="og-improve-item">
              🔴{" "}
              <b>
                Closing (58)
              </b>
              {" "}— great rapport, but the ask for the sale often doesn't happen.
            </div>
            <div className="og-improve-item">
              🟠{" "}
              <b>
                Objections (65)
              </b>
              {" "}— EMI/price pushback stalls more than it resolves.
            </div>
          </div>
          <button className="og-training-btn" onClick={on(function(event){closeOgScoreDetail();aSwitch('pulse');setTimeout(function(){openPulseChat('Avani AI Coaching','AI','#avani-coaching','ai')},50)
})}>
            <i className="ti ti-school" />
            Practise these 2 skills →
          </button>
          {" "}
          <button className="og-training-btn" onClick={on(function(event){openLinkedInPush()
})} style={{background:"#0a66c2",marginTop:"9px"}}>
            <i className="ti ti-brand-linkedin" />
            Announce this on LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}

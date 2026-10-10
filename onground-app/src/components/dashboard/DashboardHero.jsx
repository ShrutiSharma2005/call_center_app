import { on } from '../../utils/on';

/**
 * DashboardHero
 *
 * Static markup converted 1:1 from the original HTML (id: -, class: cc-hero).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function DashboardHero() {
  return (
    <div className="cc-hero">
      <div className="cc-hero-top">
        <div>
          <div className="cc-greeting">
            Good afternoon 👋
          </div>
          <div className="cc-name">
            Arvind Rajan
          </div>
          <div className="cc-sub" id="ccBrandLine">
            The Sleep Company · Call Centre
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"6px"}}>
          <div className="cc-status-pill">
            <span className="cc-live-dot" />
            On Queue
          </div>
          <button className="date-filter" onClick={on(function(event){openDateRange()
})} style={{marginTop:"0"}}>
            <i className="ti ti-calendar" />
            <span id="dateFilterLabel">
              This Week
            </span>
            <i className="ti ti-chevron-down" />
          </button>
        </div>
      </div>
      {/* Row 1 — today's live performance, no overlays: values shown plainly, "In Queue" is a tab jump not a popup */}
      <div className="cc-kpi-row">
        <div className="cc-kpi" style={{cursor:"default"}}>
          <div className="cc-kpi-val">
            76
          </div>
          <div className="cc-kpi-lbl">
            OG Score™
          </div>
          <div className="cc-kpi-trend up">
            ▲13
          </div>
        </div>
        <div className="cc-kpi" style={{cursor:"default"}}>
          <div className="cc-kpi-val">
            4m 12s
          </div>
          <div className="cc-kpi-lbl">
            Avg Handle Time
          </div>
          <div className="cc-kpi-trend up">
            ▼8%
          </div>
        </div>
        <div className="cc-kpi" style={{cursor:"default"}}>
          <div className="cc-kpi-val">
            94%
          </div>
          <div className="cc-kpi-lbl">
            CSAT Today
          </div>
          <div className="cc-kpi-trend up">
            ▲2pt
          </div>
        </div>
        <div className="cc-kpi" onClick={on(function(event){aSwitch('calls')
})}>
          <div className="cc-kpi-val">
            2
          </div>
          <div className="cc-kpi-lbl">
            In Queue
          </div>
          <div className="cc-kpi-trend live">
            ● live
          </div>
        </div>
      </div>
    </div>
  );
}

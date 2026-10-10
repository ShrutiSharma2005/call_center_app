import { on } from '../../utils/on';

/**
 * DateRangeOverlay
 * Date Range Picker Overlay
 *
 * Static markup converted 1:1 from the original HTML (id: dateRangeOverlay, class: date-range-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function DateRangeOverlay() {
  return (
    <div className="date-range-overlay" id="dateRangeOverlay">
      <div className="date-range-sheet">
        <div className="date-range-title">
          Select Date Range{" "}
          <span onClick={on(function(event){closeDateRange()
})} title="Close" style={{background:"#f0f0f3",borderRadius:"50%",width:"26px",height:"26px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14.5px",color:"#45454d",cursor:"pointer",flexShrink:"0"}}>
            ✕
          </span>
        </div>
        <div className="date-range-presets">
          <div className="dr-preset active" onClick={on(function(event){drPreset(this,'Today')
})}>
            Today
          </div>
          <div className="dr-preset" onClick={on(function(event){drPreset(this,'This Week')
})}>
            This Week
          </div>
          <div className="dr-preset" onClick={on(function(event){drPreset(this,'This Month')
})}>
            This Month
          </div>
          <div className="dr-preset" onClick={on(function(event){drPreset(this,'Last 30 Days')
})}>
            Last 30 Days
          </div>
          <div className="dr-preset" onClick={on(function(event){drPreset(this,'Custom')
})}>
            Custom
          </div>
        </div>
        <div className="date-range-row">
          <div className="date-range-field">
            <div className="date-range-lbl">
              From
            </div>
            <input type="date" className="date-range-input" id="drFrom" defaultValue="2026-06-01" />
          </div>
          <div className="date-range-field">
            <div className="date-range-lbl">
              To
            </div>
            <input type="date" className="date-range-input" id="drTo" defaultValue="2026-06-12" />
          </div>
        </div>
        <button className="date-range-apply" onClick={on(function(event){applyDateRange()
})}>
          Apply Range
        </button>
      </div>
    </div>
  );
}

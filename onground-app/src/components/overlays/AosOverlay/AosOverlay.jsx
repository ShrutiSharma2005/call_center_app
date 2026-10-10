import { on } from '../../../utils/on';
import CustomerTypePicker from './CustomerTypePicker';
import QuoteAndIcpSection from './QuoteAndIcpSection';

/**
 * AosOverlay
 * Conversation saved sheet — FIX 1: close button always visible
 *
 * Static markup converted 1:1 from the original HTML (id: aosOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AosOverlay() {
  return (
    <div className="ios-overlay" id="aosOverlay">
      <div className="ios-sheet" style={{position:"relative"}}>
        <div className="ios-sheet-handle" />
        <button className="sheet-close-btn" onClick={on(function(event){closeSheet()
})}>
          ✕
        </button>
        <div className="ios-sheet-inner">
          <div className="ios-check-row">
            <div className="ios-check-circle">
              <i className="ti ti-check" />
            </div>
            <div>
              <div className="ios-sheet-title">
                Conversation saved ✓
              </div>
              <div className="ios-sheet-sub">
                4m 32s · 1 Jun 2026
              </div>
            </div>
          </div>
          <div style={{fontSize:"15px",color:"#555",marginBottom:"10px"}}>
            Optional: capture customer details
          </div>
          <div className="ios-input-row">
            <input className="ios-input" placeholder="Customer name" />
            <input className="ios-input" placeholder="Phone number" />
          </div>
          {/* Customer type toggle — feeds the Repeat Customer window logic set by the manager (First Time / Repeat Customer segmentation used across Dashboard & Moments) */}
          <CustomerTypePicker />
          <textarea className="ios-textarea" placeholder="Manager notes — e.g. customer was exploring for 3 months, returning next week" />
          {/* Quote asked radio */}
          <QuoteAndIcpSection />
          <div className="ios-btn-row">
            <button className="ios-btn-secondary" onClick={on(function(event){showMotivToast()
})}>
              Skip
            </button>
            {" "}
            <button className="ios-btn-primary" onClick={on(function(event){showMotivToast()
})}>
              Save &amp; close
            </button>
          </div>
          <div className="motiv-toast" id="motivToast" style={{display:"none"}}>
            <div className="motiv-toast-top">
              <div className="motiv-icon">
                🏆
              </div>
              <div>
                <div className="motiv-main">
                  5 convos today!
                </div>
                <div className="motiv-sub">
                  You're leading the store. Keep going! 🔥
                </div>
              </div>
            </div>
            <button className="motiv-goto" onClick={on(function(event){closeAndGoToDash()
})}>
              <span>
                See your last conversation in Dashboard
              </span>
              <i className="ti ti-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

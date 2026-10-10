import { on } from '../../utils/on';

/**
 * BottomNav
 * Bottom nav
 *
 * Static markup converted 1:1 from the original HTML (id: -, class: ios-nav).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function BottomNav() {
  return (
    <div className="ios-nav">
      <button className="ios-nav-item active" onClick={on(function(event){aSwitch('dash',this)
})}>
        <i className="ti ti-layout-dashboard in-icon" />
        <span className="in-label" id="navLabelDash">
          Dashboard
        </span>
      </button>
      {" "}
      <button className="ios-nav-item" onClick={on(function(event){aSwitch('calls',this)
})}>
        <i className="ti ti-phone in-icon" />
        <span className="in-label">
          Plan
        </span>
      </button>
      <div className="ios-nav-sub" id="planNavSub">
        <button className="ios-nav-sub-item active" id="plannav-outgoing" onClick={on(function(event){aSwitch('calls');planSubTab('outgoing')
})}>
          <i className="ti ti-phone-outgoing" />
          <span>
            Calls to make
          </span>
        </button>
        {" "}
        <button className="ios-nav-sub-item" id="plannav-incoming" onClick={on(function(event){aSwitch('calls');planSubTab('incoming')
})}>
          <i className="ti ti-phone-incoming" />
          <span>
            Incoming
          </span>
        </button>
        {" "}
        <button className="ios-nav-sub-item" id="plannav-recent" onClick={on(function(event){aSwitch('calls');planSubTab('recent')
})}>
          <i className="ti ti-history" />
          <span>
            Recent
          </span>
        </button>
        {" "}
        <button className="ios-nav-sub-item" id="plannav-practise" onClick={on(function(event){aSwitch('calls');dialerSimulateIncoming()
})}>
          <i className="ti ti-phone-ringing" />
          <span>
            Practise a call
          </span>
        </button>
      </div>
      <button className="ios-nav-item" onClick={on(function(event){aSwitch('calendar',this)
})}>
        <i className="ti ti-calendar in-icon" />
        <span className="in-label" id="navLabelCalendar">
          Calendar
        </span>
      </button>
      {" "}
      <button className="ios-nav-item" onClick={on(function(event){aSwitch('pulse',this)
})}>
        <i className="ti ti-messages in-icon" />
        <span className="in-label">
          Pulse
        </span>
      </button>
    </div>
  );
}

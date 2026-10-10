import DashboardHero from './DashboardHero';
import DashboardProgress from './DashboardProgress';

/**
 * DashboardScreen
 * DASHBOARD
 *
 * Static markup converted 1:1 from the original HTML (id: asc-dash, class: sc).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function DashboardScreen() {
  return (
    <div className="sc active" id="asc-dash">
      <DashboardHero />
      {/* Row 2: left = My Progress + who's waiting; right = earnings above My Tasks */}
      <DashboardProgress />
      {/* GRAPHS — fills the rest of the dashboard with a quick visual read on the week, no taps needed */}
      <div style={{margin:"14px 12px 4px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}}>
        Calls handled · last 7 days
      </div>
      <div className="dash-chart-card">
        <div className="dash-bar-row">
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              18
            </span>
            <div className="dash-bar" style={{height:"58%"}} />
            <span className="dash-bar-day">
              Mon
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              22
            </span>
            <div className="dash-bar" style={{height:"70%"}} />
            <span className="dash-bar-day">
              Tue
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              15
            </span>
            <div className="dash-bar" style={{height:"48%"}} />
            <span className="dash-bar-day">
              Wed
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              26
            </span>
            <div className="dash-bar" style={{height:"82%"}} />
            <span className="dash-bar-day">
              Thu
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              20
            </span>
            <div className="dash-bar" style={{height:"64%"}} />
            <span className="dash-bar-day">
              Fri
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              12
            </span>
            <div className="dash-bar" style={{height:"38%"}} />
            <span className="dash-bar-day">
              Sat
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              14
            </span>
            <div className="dash-bar dash-bar-today" style={{height:"45%"}} />
            <span className="dash-bar-day">
              Today
            </span>
          </div>
        </div>
      </div>
      <div style={{margin:"16px 12px 4px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}}>
        CSAT trend · last 7 days
      </div>
      <div className="dash-chart-card">
        <div className="dash-bar-row">
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              88%
            </span>
            <div className="dash-bar dash-bar-blue" style={{height:"70%"}} />
            <span className="dash-bar-day">
              Mon
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              90%
            </span>
            <div className="dash-bar dash-bar-blue" style={{height:"74%"}} />
            <span className="dash-bar-day">
              Tue
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              85%
            </span>
            <div className="dash-bar dash-bar-blue" style={{height:"64%"}} />
            <span className="dash-bar-day">
              Wed
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              92%
            </span>
            <div className="dash-bar dash-bar-blue" style={{height:"78%"}} />
            <span className="dash-bar-day">
              Thu
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              89%
            </span>
            <div className="dash-bar dash-bar-blue" style={{height:"72%"}} />
            <span className="dash-bar-day">
              Fri
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              91%
            </span>
            <div className="dash-bar dash-bar-blue" style={{height:"76%"}} />
            <span className="dash-bar-day">
              Sat
            </span>
          </div>
          <div className="dash-bar-col">
            <span className="dash-bar-val">
              94%
            </span>
            <div className="dash-bar dash-bar-blue dash-bar-today" style={{height:"84%"}} />
            <span className="dash-bar-day">
              Today
            </span>
          </div>
        </div>
      </div>
      <div style={{height:"24px"}} />
    </div>
  );
}

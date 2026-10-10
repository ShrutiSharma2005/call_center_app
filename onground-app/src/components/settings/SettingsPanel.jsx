import { on } from '../../utils/on';
import SettingsIndustrySection from './SettingsIndustrySection';
import SettingsLinkedInSection from './SettingsLinkedInSection';
import SettingsProfileFields from './SettingsProfileFields';

/**
 * SettingsPanel
 * Settings panel
 *
 * Static markup converted 1:1 from the original HTML (id: settingsPanel, class: settings-panel).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function SettingsPanel() {
  return (
    <div className="settings-panel" id="settingsPanel">
      <div className="settings-header">
        <i className="ti ti-arrow-left" onClick={on(function(event){closeSettings()
})} />
        <span>
          Settings
        </span>
      </div>
      {/* Employee Profile — matches the pattern in staff_mobile.html / manager apps. Editing any field here enables the Save bar pinned to the bottom of this panel. */}
      <div className="settings-section">
        Employee Profile
      </div>
      <SettingsProfileFields />
      <div className="settings-section">
        Security
      </div>
      <div className="settings-row">
        <i className="ti ti-lock" />
        <div className="settings-row-text">
          <div className="settings-row-title">
            Change App Password
          </div>
          <div className="settings-row-sub">
            Update your 4-digit login PIN
          </div>
        </div>
        <i className="ti ti-chevron-right" style={{fontSize:"15px",color:"#8e8e93"}} />
      </div>
      <div className="settings-section" id="storeSectionTitle">
        Store
      </div>
      <div className="settings-row">
        <i className="ti ti-building-store" />
        <div className="settings-row-text">
          <div className="settings-row-title" id="baseStoreLabel">
            Base Store
          </div>
          <div className="settings-row-sub" id="baseStoreSub">
            Koramangala — The Sleep Company
          </div>
        </div>
        <i className="ti ti-chevron-right" style={{fontSize:"15px",color:"#8e8e93"}} />
      </div>
      <div style={{margin:"6px 12px",padding:"8px 12px",background:"#e1f5ee",borderRadius:"10px",fontSize:"12.5px",color:"#0f6e56"}}>
        Allocated: Koramangala · HSR Layout · Indiranagar
      </div>
      <div className="settings-section">
        Role &amp; Designation
      </div>
      <div style={{margin:"6px 12px 10px",background:"#fff",borderRadius:"12px",padding:"12px 14px",display:"flex",alignItems:"center",gap:"12px"}}>
        <div style={{width:"44px",height:"44px",borderRadius:"11px",background:"#eef2ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:"800",color:"#3730a3",flexShrink:"0"}}>
          M0
        </div>
        <div style={{flex:"1",minWidth:"0"}}>
          <div style={{fontSize:"14.5px",fontWeight:"700",color:"#1a1a1a"}}>
            M0 ·{" "}
            <span id="roleDesigLabel">
              Call Centre Staff
            </span>
          </div>
          <div style={{fontSize:"13px",color:"#8e8e93",marginTop:"2px",lineHeight:"1.4"}} id="roleDesigDesc">
            Staff tier — sits below Manager designations (M1 Store Manager, M2 Ops Manager) shown in Settings on the Manager app. Your exact sub-role is set below.
          </div>
        </div>
      </div>
      <div className="settings-section" id="channelSectionTitle">
        Your Customer Channel
      </div>
      <div style={{margin:"6px 12px 10px",background:"#fff",borderRadius:"12px",padding:"12px 14px"}}>
        <div style={{fontSize:"13px",color:"#666",lineHeight:"1.5",marginBottom:"10px"}} id="channelSectionDesc">
          This app is for Call Centre staff — your customer channel is fixed accordingly. Store and Field Staff sub-roles are available in the Staff mobile app instead.
        </div>
        <div id="channelOptCallCentre" className="channel-opt selected" onClick={on(function(event){selectStaffChannel('callcentre', this)
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 12px",border:"1.5px solid #1d9e75",background:"#f0fff6",borderRadius:"12px",cursor:"pointer"}}>
          <div style={{width:"34px",height:"34px",borderRadius:"9px",background:"#e8f0fe",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:"0"}} id="channelIconCallCentre">
            ☎️
          </div>
          <div style={{flex:"1"}}>
            <div style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}} id="channelTitleCallCentre">
              Call Centre Staff
            </div>
            <div style={{fontSize:"12.5px",color:"#8e8e93",marginTop:"1px"}} id="channelSubCallCentre">
              I mostly handle customers over the phone
            </div>
          </div>
          <i className="ti ti-circle-check" style={{fontSize:"16px",color:"#1d9e75",flexShrink:"0"}} id="channelCheckCallCentre" />
        </div>
      </div>
      {/* Language — India's top 8 languages by native speakers, plus English. Same mechanism as staff_mobile.html: translates a small set of tagged UI labels as a working proof, not a full app-wide i18n pass. */}
      <div className="settings-section">
        Language
      </div>
      <div style={{margin:"6px 12px 10px",background:"#fff",borderRadius:"12px",padding:"12px 14px"}}>
        <div style={{fontSize:"12.5px",color:"#666",lineHeight:"1.5",marginBottom:"10px"}}>
          Choose the language for labels across the app.
        </div>
        <div id="languagePickerList" />
      </div>
      <div className="settings-section">
        Dev Mode
      </div>
      <div style={{margin:"6px 12px 10px",background:"#fffbea",border:"1px solid #f5e6a8",borderRadius:"12px",padding:"12px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{width:"34px",height:"34px",borderRadius:"9px",background:"#fff3d6",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:"0"}}>
            🛠️
          </div>
          <div style={{flex:"1"}}>
            <div style={{fontSize:"14px",fontWeight:"700",color:"#7a5a00"}}>
              Override inherited industry
            </div>
            <div style={{fontSize:"12px",color:"#8a6d00",marginTop:"1px"}}>
              For building/demoing — unlocks manual vertical switching below. Real staff never see this.
            </div>
          </div>
          <div className="toggle-sw" id="devModeToggle" onClick={on(function(event){toggleDevMode()
})}>
            <div className="knob" />
          </div>
        </div>
      </div>
      {/* Industry — INHERITED from Manager Web's Settings → General → Brand Vertical, same logic as staff_mobile.html. Drives the role label/description, the SOP call route, the Leads/Patients data, and the brand-name strings around the app. */}
      <div className="settings-section">
        Industry
      </div>
      <SettingsIndustrySection />
      <div className="settings-section">
        OG Score™ on LinkedIn
      </div>
      <SettingsLinkedInSection />
      {/* Save bar — was missing entirely. Hidden until a field above is actually edited (markSettingsDirty), then pins to the bottom of the panel so it's always reachable regardless of scroll position. */}
      <div id="settingsSaveBar" style={{display:"none",position:"sticky",bottom:"0",left:"0",right:"0",background:"#fff",borderTop:"1px solid #eee",padding:"10px 14px",marginTop:"14px",boxShadow:"0 -4px 12px rgba(0,0,0,.06)"}}>
        <button onClick={on(function(event){saveSettingsChanges()
})} style={{width:"100%",padding:"12px",border:"none",borderRadius:"10px",fontSize:"14.5px",fontWeight:"700",color:"#fff",background:"#1d9e75",cursor:"pointer"}}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

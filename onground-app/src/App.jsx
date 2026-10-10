import './tabler-icons.css'; // Tabler Icons 3.46.0 (self-hosted font, unchanged)
import './App.css'; // all original CSS, unchanged
import useLegacyScripts from './hooks/useLegacyScripts';
import AosOverlay from './components/overlays/AosOverlay/AosOverlay';
import AvaniScreen from './components/avani/AvaniScreen';
import AvaniSearchOverlayStaff from './components/overlays/AvaniSearchOverlayStaff';
import AvatarPanel from './components/settings/AvatarPanel';
import AWaOverlay from './components/overlays/AWaOverlay/AWaOverlay';
import BottomNav from './components/layout/BottomNav';
import CalendarScreen from './components/calendar/CalendarScreen';
import CalShareOverlay from './components/overlays/CalShareOverlay';
import CameBackOverlay from './components/overlays/CameBackOverlay';
import DashboardScreen from './components/dashboard/DashboardScreen';
import DateRangeOverlay from './components/overlays/DateRangeOverlay';
import LeadAnalysisOverlay from './components/overlays/LeadAnalysisOverlay/LeadAnalysisOverlay';
import LeadsOverlay from './components/overlays/LeadsOverlay';
import LinkedinPushOverlay from './components/overlays/LinkedinPushOverlay';
import NoInterestOverlay from './components/overlays/NoInterestOverlay';
import NotificationOverlay from './components/overlays/NotificationOverlay';
import OgScoreOverlay from './components/overlays/OgScoreOverlay';
import OnGroundSopOverlay from './components/overlays/OnGroundSopOverlay';
import PlannerScreen from './components/planner/PlannerScreen';
import PulseChatOverlay from './components/overlays/PulseChatOverlay';
import PulseCustomerChatOverlay from './components/overlays/PulseCustomerChatOverlay';
import PulseScreen from './components/pulse/PulseScreen';
import PulseTagOverlay from './components/overlays/PulseTagOverlay';
import RankDetailOverlay from './components/overlays/RankDetailOverlay';
import SettingsPanel from './components/settings/SettingsPanel';
import StaffAgentConfigOverlay from './components/overlays/StaffAgentConfigOverlay';
import StatDetailOverlay from './components/overlays/StatDetailOverlay';
import StatusBar from './components/layout/StatusBar';
import TopBar from './components/layout/TopBar';

/**
 * On-Ground.ai — Call Centre App (Retail · Web · Advisor App v9)
 *
 * This file is only the page skeleton: phone frame > screen > content.
 * Every block is its own component under src/components/:
 *   layout/     StatusBar, TopBar, BottomNav
 *   planner/    Planner (calls) screen      avani/     Avani AI screen
 *   calendar/   Calendar screen             pulse/     Pulse (chat) screen
 *   dashboard/  Dashboard screen            settings/  Settings + Avatar panels
 *   overlays/   sheets, pop-ups and full-screen overlays
 *
 * NOTE: components are intentionally static (no props / state). The legacy
 * scripts update the DOM directly by element id, so React must never re-render
 * and overwrite those edits.
 */
export default function App() {
  useLegacyScripts();

  return (
    <>
      <div style={{padding:"0",display:"flex",flexDirection:"column",alignItems:"stretch",background:"#f5f5f5",minHeight:"100vh"}}>
        <div className="iphone">
          <StatusBar />
          <div className="screen">
            <TopBar />
            <div className="content">
              {/* PLANNER — Incoming / Outgoing / Recent calling plan (was: Call Queue / Live Dialer) */}
              <PlannerScreen />
              {/* AVANI AI */}
              <AvaniScreen />
              <CalendarScreen />
              {/* Calendar invite share picker — share with Manager / Team / a specific Pulse member */}
              <CalShareOverlay />
              {/* Staff Custom Agents — activate screen */}
              <StaffAgentConfigOverlay />
              <PulseScreen />
              {/* Chat overlay for Pulse channels/DMs */}
              <NotificationOverlay />
              <PulseChatOverlay />
              {/* AvaniBot in-channel search overlay */}
              <AvaniSearchOverlayStaff />
              {/* Customer-facing chat overlay (WhatsApp + Voice Call channel selector) */}
              <PulseCustomerChatOverlay />
              {/* Tag / forward staff sheet */}
              <PulseTagOverlay />
              {/* DASHBOARD */}
              <DashboardScreen />
            </div>
            {/* Bottom nav */}
            <BottomNav />
            {/* Date Range Picker Overlay */}
            <DateRangeOverlay />
            {/* Leads Overlay */}
            <LeadsOverlay />
            {/* On-ground Call — Lead SOP checklist, shown before the call connects */}
            <OnGroundSopOverlay />
            {/* Stat detail sheet — replaces the 4 KPI cards that used to sit below the banner; now reached by tapping a banner metric */}
            <StatDetailOverlay />
            {/* OG Score™ detail — capability breakdown, improvement areas, link to training modules */}
            <OgScoreOverlay />
            {/* Rank explanation — weighted scoring behind "Your Rank within [Store]" */}
            <RankDetailOverlay />
            <LinkedinPushOverlay />
            {/* Conversation saved sheet — FIX 1: close button always visible */}
            <AosOverlay />
            {/* WhatsApp send sheet — FIX 1: also closeable */}
            <AWaOverlay />
            {/* Settings panel */}
            <SettingsPanel />
            {/* Avatar panel */}
            <AvatarPanel />
          </div>
          <NoInterestOverlay />
          <CameBackOverlay />
          <LeadAnalysisOverlay />
        </div>
      </div>
      <p style={{textAlign:"center",fontSize:"12.5px",color:"var(--color-text-secondary,#888)",marginTop:"8px"}}>
        Web — On-Ground.ai Advisor App v9 · Retail
      </p>
    </>
  );
}

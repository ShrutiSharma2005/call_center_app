import ChannelsPanel from './ChannelsPanel';
import PulseCustomerListOverlay from './PulseCustomerListOverlay';
import PulseHeader from './PulseHeader';
import PulseKudosListOverlay from './PulseKudosListOverlay';

/**
 * PulseScreen
 *
 * Static markup converted 1:1 from the original HTML (id: asc-pulse, class: sc).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PulseScreen() {
  return (
    <div className="sc" id="asc-pulse">
      {/* Header */}
      <PulseHeader />
      {/* CHANNELS + DIRECT MESSAGES — unified Slack-style sidebar (no more Customer Discussions/Internal/Channels/DMs/Kudos tab structure) */}
      <ChannelsPanel />
      {/* CUSTOMER DISCUSSIONS OVERLAY — opened from the "#customer-discussions" channel row */}
      <PulseCustomerListOverlay />
      {/* KUDOS OVERLAY — opened from the "#kudos" channel row (GET only, not GIVE) */}
      <PulseKudosListOverlay />
    </div>
  );
}

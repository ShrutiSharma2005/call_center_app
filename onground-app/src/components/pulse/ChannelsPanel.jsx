import { on } from '../../utils/on';

/**
 * ChannelsPanel
 * CHANNELS + DIRECT MESSAGES — unified Slack-style sidebar (no more Customer Discussions/Internal/Channels/DMs/Kudos tab structure)
 *
 * Static markup converted 1:1 from the original HTML (id: ppanel-channels).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function ChannelsPanel() {
  return (
    <div id="ppanel-channels" style={{display:"block",paddingBottom:"80px"}}>
      <div onClick={on(function(event){openPulseChat('AvaniBot','✨','AvaniBot','avanibot')
})} style={{margin:"10px 12px 4px",display:"flex",alignItems:"center",gap:"8px",background:"#fff",border:"1.5px solid #e5e5ea",borderRadius:"12px",padding:"10px 12px",cursor:"pointer",boxShadow:"0 1px 3px rgba(16,24,40,.05)"}}>
        <div style={{width:"26px",height:"26px",borderRadius:"8px",background:"#7c3aed",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0",fontSize:"14.5px"}}>
          ✨
        </div>
        <span style={{fontSize:"13.5px",color:"#8e8e93",flex:"1"}}>
          Ask AvaniBot or search Pulse…
        </span>
        {" "}
        <i className="ti ti-search" style={{fontSize:"14.5px",color:"#c5c5c5"}} />
      </div>
      {/* AvaniBot — promoted out of the flat Direct Messages list into a featured pinned card, matching the Kudos hero-card treatment, since it's the primary way staff should be reaching for a daily brief or asking a question, not just another DM in a list. */}
      <div className="avani-hero-card" onClick={on(function(event){openPulseChat('AvaniBot','✨','AvaniBot','avanibot')
})}>
        <div className="avani-hero-shine" />
        <div style={{display:"flex",alignItems:"center",gap:"10px",position:"relative",zIndex:"1",marginBottom:"10px"}}>
          <div style={{width:"38px",height:"38px",borderRadius:"50%",background:"rgba(255,255,255,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:"0",boxShadow:"inset 0 1px 2px rgba(255,255,255,.25)"}}>
            ✨
          </div>
          <div style={{flex:"1",minWidth:"0"}}>
            <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <span style={{fontSize:"15px",fontWeight:"800",color:"#fff"}}>
                AvaniBot
              </span>
              <span style={{fontSize:"12.5px",fontWeight:"800",color:"#fff",background:"rgba(255,255,255,.2)",padding:"2px 7px",borderRadius:"8px",letterSpacing:".3px"}}>
                ALWAYS ON
              </span>
            </div>
            <div style={{fontSize:"12.5px",color:"#e4d9fc",marginTop:"1px"}}>
              Ask me about anything happening in Pulse — daily briefs, action items, quick answers
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:"7px",position:"relative",zIndex:"1"}}>
          <button onClick={on(function(event){event.stopPropagation();avaniQuickDailyBriefStaff()
})} style={{flex:"1",padding:"8px",border:"none",borderRadius:"9px",background:"rgba(255,255,255,.16)",color:"#fff",fontSize:"13px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"5px"}}>
            <i className="ti ti-sparkles" style={{fontSize:"14.5px"}} />
            Daily Brief
          </button>
          {" "}
          <button onClick={on(function(event){event.stopPropagation();avaniQuickAskQuestionStaff()
})} style={{flex:"1",padding:"8px",border:"none",borderRadius:"9px",background:"rgba(255,255,255,.16)",color:"#fff",fontSize:"13px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"5px"}}>
            <i className="ti ti-message-circle-2" style={{fontSize:"14.5px"}} />
            Ask a question
          </button>
        </div>
      </div>
      {/* Custom Agents — staff-facing agent catalog, mirrors the manager Pulse pattern */}
      <div style={{margin:"10px 12px 4px",background:"#fff",border:"1.5px solid #ece2fb",borderRadius:"14px",overflow:"hidden"}}>
        <div onClick={on(function(event){staffAgentFoldToggle(this)
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 12px",cursor:"pointer"}}>
          <span style={{width:"30px",height:"30px",borderRadius:"9px",background:"#f1ecff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0",fontSize:"16px"}}>
            ✨
          </span>
          <div style={{flex:"1",minWidth:"0"}}>
            <div style={{fontSize:"14.5px",fontWeight:"800",color:"#1a1a1a"}}>
              Custom Agents
            </div>
            <div style={{fontSize:"13px",color:"#8e8e93"}}>
              Set up by your manager — already live, tap to open
            </div>
          </div>
          <i className="ti ti-chevron-down" id="staffAgentFoldChevron" style={{fontSize:"16px",color:"#8e8e93",transition:"transform .18s"}} />
        </div>
        <div id="staffAgentFoldBody" style={{display:"none",padding:"2px 10px 10px"}} />
      </div>
      <div style={{padding:"10px 12px 2px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}}>
        General
      </div>
      <div className="slack-ch-row" id="pulseCustDiscRow" onClick={on(function(event){openPulseCustomerList()
})}>
        <span className="slack-ch-hash">
          <i className="ti ti-brand-whatsapp" style={{fontSize:"15px",color:"#25D366"}} />
        </span>
        <div className="slack-ch-body">
          <span className="slack-ch-name">
            customer-discussions
          </span>
          <span className="slack-ch-meta">
            Relayed via WhatsApp Business
          </span>
        </div>
        <span className="slack-ch-badge">
          2
        </span>
      </div>
      {/* KUDOS — pulled out of the flat channel-row list into its own hero card. This is a genuinely big deal for staff (public recognition from leaders), so it should not look identical to a routine channel notification — gold gradient, trophy, live count, latest kudos snippet, subtle shine animation. */}
      <div onClick={on(function(event){openPulseKudosList()
})} className="kudos-hero-card">
        <div className="kudos-hero-shine" />
        <div style={{display:"flex",alignItems:"center",gap:"10px",position:"relative",zIndex:"1"}}>
          <div style={{width:"40px",height:"40px",borderRadius:"50%",background:"rgba(255,255,255,.22)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",flexShrink:"0",boxShadow:"inset 0 1px 2px rgba(255,255,255,.3)"}}>
            🏆
          </div>
          <div style={{flex:"1",minWidth:"0"}}>
            <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <span style={{fontSize:"14.5px",fontWeight:"800",color:"#fff"}}>
                Kudos
              </span>
              <span style={{fontSize:"12.5px",fontWeight:"800",color:"#7c4a00",background:"#fff",padding:"2px 7px",borderRadius:"8px"}}>
                3 NEW
              </span>
            </div>
            <div style={{fontSize:"12.5px",color:"#fff3d6",marginTop:"2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
              "Great work with Mukunda — closed that objection beautifully!" — Sunita Rao
            </div>
          </div>
          <div style={{textAlign:"center",flexShrink:"0"}}>
            <div style={{fontSize:"17px",fontWeight:"800",color:"#fff"}}>
              12
            </div>
            <div style={{fontSize:"12px",color:"#fff3d6",fontWeight:"700",textTransform:"uppercase"}}>
              All-time
            </div>
          </div>
        </div>
      </div>
      <div style={{padding:"8px 12px 4px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}}>
        Channels
      </div>
      {/* Vertical Custom Agent channels — mirrors the manager web app: any agent M2 activates in Settings → Custom Agents with "Call Centre Staff (M0)" checked as a destination stakeholder shows up here as a real channel, not just inside the Practice/Coaching fold above. Rendered by renderStaffVerticalAgentChannels(). */}
      <div id="staffVerticalAgentChannels" />
      <div className="slack-ch-row" onClick={on(function(event){openPulseChat('Call Centre Team','Team','#callcentre-team','team')
})}>
        <span className="slack-ch-hash">
          #
        </span>
        <div className="slack-ch-body">
          <span className="slack-ch-name">
            callcentre-team
          </span>
          <span className="slack-ch-meta">
            Manager: Review call QA scores this week!
          </span>
        </div>
      </div>
      <div className="slack-ch-row" onClick={on(function(event){openPulseChat('All Stores','All','#all-stores','store')
})}>
        <span className="slack-ch-hash">
          #
        </span>
        <div className="slack-ch-body">
          <span className="slack-ch-name">
            all-stores
          </span>
          <span className="slack-ch-meta">
            New Ortho Grid campaign from 1 June!
          </span>
        </div>
        <span className="slack-ch-time">
          10:22am
        </span>
        <span className="slack-ch-badge">
          4
        </span>
      </div>
      <div className="slack-ch-row" onClick={on(function(event){openPulseChat('Avani AI Coaching','AI','#avani-coaching','ai')
})}>
        <span className="slack-ch-hash">
          <i className="ti ti-sparkles" style={{fontSize:"15px",color:"#7c3aed"}} />
        </span>
        <div className="slack-ch-body">
          <span className="slack-ch-name">
            avani-coaching
          </span>
          <span className="slack-ch-meta">
            Your warranty score dropped 12% this week
          </span>
        </div>
        <span className="slack-ch-time">
          9:01am
        </span>
        <span className="slack-ch-badge">
          1
        </span>
      </div>
      <div className="slack-ch-row" onClick={on(function(event){openPulseChat('Manage Shipment','Shipping Agent','#manage-shipment','shipment')
})}>
        <span className="slack-ch-hash">
          #
        </span>
        <div className="slack-ch-body">
          <span className="slack-ch-name">
            manage-shipment
          </span>
          <span className="slack-ch-meta">
            📦 Ortho Grid Pro — ready for delivery ✓
          </span>
        </div>
        <span className="slack-ch-time">
          10:05am
        </span>
        <span className="slack-ch-badge">
          1
        </span>
      </div>
      <div className="slack-ch-row" onClick={on(function(event){openPulseChat('Quotation Tickets','Ticket Desk Agent','#quotation-tickets','tickets')
})}>
        <span className="slack-ch-hash">
          #
        </span>
        <div className="slack-ch-body">
          <span className="slack-ch-name">
            quotation-tickets
          </span>
          <span className="slack-ch-meta">
            🎫 Quotation approval — awaiting approval
          </span>
        </div>
        <span className="slack-ch-time">
          9:12am
        </span>
        <span className="slack-ch-badge">
          1
        </span>
      </div>
      <div className="slack-ch-row" onClick={on(function(event){openPulseChat('New Hire Onboarding','Onboarding Agent','#new-hire-onboarding','onboarding')
})}>
        <span className="slack-ch-hash">
          #
        </span>
        <div className="slack-ch-body">
          <span className="slack-ch-name">
            new-hire-onboarding
          </span>
          <span className="slack-ch-meta">
            🎉 Welcome to the team!
          </span>
        </div>
        <span className="slack-ch-time">
          8:30am
        </span>
      </div>
      <div style={{padding:"14px 12px 4px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}}>
        Direct Messages
      </div>
      <div className="ios-chat-row" onClick={on(function(event){openPulseChat('Sunita Rao','SR','DM','manager')
})}>
        <div className="ios-av ios-av-amber" style={{fontSize:"16px"}}>
          SR
        </div>
        <div className="ios-cm">
          <div className="ios-cn" style={{display:"flex",alignItems:"center",gap:"5px"}}>
            Sunita Rao{" "}
            <span style={{fontSize:"12.5px",background:"#FFD700",color:"#3a2a00",padding:"1px 5px",borderRadius:"5px",fontWeight:"700"}}>
              MGR
            </span>
          </div>
          <div className="ios-cp">
            🌟 Great work with Mukunda — keep it up
          </div>
        </div>
        <div className="ios-cr">
          <span className="ios-ct">
            12:40pm
          </span>
        </div>
      </div>
      <div className="ios-chat-row" onClick={on(function(event){openPulseChat('Priya Krishnan','PK','DM','peer')
})}>
        <div className="ios-av ios-av-red" style={{fontSize:"16px"}}>
          PK
        </div>
        <div className="ios-cm">
          <div className="ios-cn">
            Priya Krishnan
          </div>
          <div className="ios-cp">
            Can you cover my 3pm slot today?
          </div>
        </div>
        <div className="ios-cr">
          <span className="ios-ct">
            9:55am
          </span>
        </div>
      </div>
      <div className="ios-chat-row" onClick={on(function(event){openPulseChat('Raju Kumar','RK','DM','peer')
})}>
        <div className="ios-av ios-av-teal" style={{fontSize:"16px"}}>
          RK
        </div>
        <div className="ios-cm">
          <div className="ios-cn">
            Raju Kumar
          </div>
          <div className="ios-cp">
            Nice cross-sell on the Tranquo chair! 🔥
          </div>
        </div>
        <div className="ios-cr">
          <span className="ios-ct">
            Yesterday
          </span>
        </div>
      </div>
    </div>
  );
}

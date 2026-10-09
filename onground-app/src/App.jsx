import { useEffect } from 'react';
import './tabler-icons.css'; // Tabler Icons 3.46.0 (self-hosted font, unchanged)
import './App.css';          // all original CSS, unchanged

/* The original page uses inline handlers such as onclick="openX(this)".
   `on()` keeps them 1:1: the handler body runs with `this` = the element
   and a global-function lookup, exactly like the HTML attribute did. */
const on = (fn) => (e) => fn.call(e.currentTarget, e);

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Failed to load ' + src));
    document.body.appendChild(s);
  });

let booted = false; // guards React StrictMode's double effect run

function App() {
  useEffect(() => {
    // original <body class="desktop" style="margin:0;background:#f5f5f5">
    document.body.classList.add("desktop");
    document.body.style.margin = '0';
    document.body.style.background = '#f5f5f5';

    if (booted) return;
    booted = true;

    (async () => {
      // 1) Chart.js (was a <script src> in <head>)
      if (!window.Chart) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js');
      }
      // 2) the app's original logic, in the same order as the HTML
      await loadScript('/legacy/onground-main.js');
      await loadScript('/legacy/onground-staff.js');
      // 3) the scripts register DOMContentLoaded handlers; the document is already
      //    loaded under React, so fire it once now that the markup is mounted
      document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
    })().catch(console.error);
  }, []);

  return (
    <>
      <div style={{padding:"0",display:"flex",flexDirection:"column",alignItems:"stretch",background:"#f5f5f5",minHeight:"100vh"}}>
        <div className="iphone">
          <div className="ios-status">
            <span style={{marginLeft:"14px"}}>
              9:41
            </span>
            <div style={{width:"10px",height:"10px",borderRadius:"50%",background:"#1d9e75",border:"2px solid #333"}} />
            <span style={{marginRight:"6px",display:"flex",gap:"3px",alignItems:"center"}}>
              <i className="ti ti-wifi" style={{fontSize:"13.5px"}} />
              <i className="ti ti-battery-2" style={{fontSize:"13.5px"}} />
            </span>
          </div>
          <div className="screen">
            <div className="topbar">
              <div style={{display:"flex",alignItems:"center"}}>
                <div className="brand-logo">
                  OG
                </div>
                <span className="brand-name">
                  On-Ground.ai
                </span>
              </div>
              <div className="topbar-right">
                <div className="notif-bell" onClick={on(function(event){openNotificationOverlay()
})} title="Notifications">
                  <i className="ti ti-bell" />
                  {" "}
                  <span id="notifBellDot" style={{position:"absolute",top:"-2px",right:"-2px",width:"11px",height:"11px",borderRadius:"50%",background:"#ffd400",border:"2px solid #fff",boxShadow:"0 0 0 2px rgba(226,35,61,.35)",animation:"notifDotBlink 1.1s ease-in-out infinite"}} />
                </div>
                <div className="global-ranks">
                  <div className="grank-pill gold" style={{padding:"2px 9px 2px 2px",gap:"5px"}}>
                    <span onClick={on(function(event){openOgScoreDetail()
})} title="OG Score™ — your overall selling performance score" style={{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"4px"}}>
                      <span className="og-ring sm" style={{"--pct":"76","--ring-color":"#1d9e75"}}>
                        <span className="og-ring-val" style={{fontSize:"11px"}}>
                          76
                        </span>
                      </span>
                    </span>
                    {" "}
                    <span onClick={on(function(event){openRankDetail()
})} title="Your Rank within RT Nagar: #3" className="gr-num" style={{fontSize:"12px",letterSpacing:".2px",cursor:"pointer"}}>
                      ⭐#3
                    </span>
                  </div>
                </div>
                <div className="ar-badge" id="arBadge" onClick={on(function(event){toggleDropdown()
})}>
                  <div className="ar-badge-ring" id="arBadgeRing" />
                  <div className="ar-badge-inner" id="arBadgeInner">
                    <span className="ar-badge-emoji" id="arBadgeEmoji">
                      🦸‍♂️
                    </span>
                    {" "}
                    <span className="ar-badge-initials" id="arBadgeInitials">
                      AR
                    </span>
                  </div>
                </div>
                <div className="hamburger" onClick={on(function(event){toggleDropdown()
})}>
                  <span />
                  <span />
                  <span />
                </div>
                <div className="user-dropdown" id="userDropdown">
                  <div className="dd-header">
                    <div className="dd-av" id="ddAvatar" style={{fontSize:"18px"}}>
                      🦸‍♂️
                    </div>
                    <div>
                      <div className="dd-name">
                        Arvind Rajan
                      </div>
                      <div className="dd-store">
                        Koramangala · The Sleep Company
                      </div>
                    </div>
                  </div>
                  <div className="dd-item" onClick={on(function(event){openAvatarPanel()
})}>
                    <i className="ti ti-user-circle" />
                    Avatar
                  </div>
                  <div className="dd-item" onClick={on(function(event){openSettings()
})}>
                    <i className="ti ti-settings" />
                    Settings
                  </div>
                  <div className="dd-item danger" onClick={on(function(event){toggleDropdown()
})}>
                    <i className="ti ti-logout" />
                    Logout
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="sc" id="asc-calls">
                <div style={{padding:"14px 16px 12px",background:"linear-gradient(135deg,#1a1a2e,#2d2d5f)",borderRadius:"0 0 18px 18px"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div>
                      <div className="cc-greeting">
                        Today's calling plan
                      </div>
                      <div className="cc-name" style={{fontSize:"17px"}}>
                        Planner
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div id="planDateLabel" style={{fontSize:"13.5px",fontWeight:"800",color:"#fff",background:"rgba(255,255,255,.12)",padding:"5px 10px",borderRadius:"9px"}} />
                    </div>
                  </div>
                </div>
                <div id="dialerIncomingCall" style={{display:"none",background:"linear-gradient(135deg,#7c2d12,#c2410c)",margin:"12px",borderRadius:"16px",padding:"16px",color:"#fff",textAlign:"center",animation:"incomingPulse 1.4s ease-in-out infinite"}}>
                  <div style={{fontSize:"12.5px",color:"#fed7aa",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"4px"}}>
                    Incoming call
                  </div>
                  <div style={{fontSize:"17px",fontWeight:"800",marginBottom:"2px"}} id="dialerIncomingName">
                    Ritu S.
                  </div>
                  <div style={{fontSize:"12.5px",color:"#fed7aa",marginBottom:"14px"}} id="dialerIncomingSub">
                    🎯 Intent 96 · calling from +91 98450 xxxxx
                  </div>
                  <div style={{display:"flex",justifyContent:"center",gap:"22px"}}>
                    <button onClick={on(function(event){dialerDeclineIncoming()
})} style={{width:"52px",height:"52px",borderRadius:"50%",background:"#e24b4a",border:"none",color:"#fff",cursor:"pointer"}}>
                      <i className="ti ti-phone-x" style={{fontSize:"20px"}} />
                    </button>
                    {" "}
                    <button onClick={on(function(event){dialerAcceptIncoming()
})} style={{width:"52px",height:"52px",borderRadius:"50%",background:"#1d9e75",border:"none",color:"#fff",cursor:"pointer",animation:"acceptPulse 1s ease-in-out infinite"}}>
                      <i className="ti ti-phone" style={{fontSize:"20px"}} />
                    </button>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"flex-start",gap:"0"}}>
                  <div style={{flex:"1",minWidth:"0"}}>
                    <div id="dialerActiveCall" style={{display:"none",background:"linear-gradient(135deg,#0a2e1a,#0f6e56)",margin:"12px",borderRadius:"16px",padding:"16px",color:"#fff",textAlign:"center"}}>
                      <div style={{fontSize:"12.5px",color:"#a8dcc4",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"4px"}}>
                        Call in progress
                      </div>
                      <div style={{fontSize:"17px",fontWeight:"800",marginBottom:"2px"}} id="dialerActiveName">
                        Mukunda R.
                      </div>
                      <div style={{fontSize:"22px",fontWeight:"800",fontVariantNumeric:"tabular-nums",marginBottom:"10px"}} id="dialerActiveTimer">
                        00:00
                      </div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"14px"}}>
                        <span style={{fontSize:"12.5px",color:"#c9ede0"}}>
                          Sentiment
                        </span>
                        <div style={{width:"70px",height:"5px",borderRadius:"3px",background:"rgba(255,255,255,.18)",overflow:"hidden"}}>
                          <div id="sentimentFill" style={{width:"65%",height:"100%",background:"#5dcaa5",borderRadius:"3px",transition:"width .6s ease,background .6s ease"}} />
                        </div>
                        <span id="sentimentLabel" style={{fontSize:"12.5px",fontWeight:"700",color:"#5dcaa5"}}>
                          Positive
                        </span>
                      </div>
                      <div style={{display:"flex",justifyContent:"center",gap:"14px"}}>
                        <button onClick={on(function(event){dialerToggleMute(this)
})} style={{width:"46px",height:"46px",borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"none",color:"#fff",cursor:"pointer"}}>
                          <i className="ti ti-microphone-off" style={{fontSize:"18px"}} />
                        </button>
                        {" "}
                        <button onClick={on(function(event){dialerToggleHold(this)
})} style={{width:"46px",height:"46px",borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"none",color:"#fff",cursor:"pointer"}}>
                          <i className="ti ti-player-pause" style={{fontSize:"18px"}} />
                        </button>
                        {" "}
                        <button onClick={on(function(event){dialerEndCall()
})} style={{width:"46px",height:"46px",borderRadius:"50%",background:"#e24b4a",border:"none",color:"#fff",cursor:"pointer"}}>
                          <i className="ti ti-phone-x" style={{fontSize:"18px"}} />
                        </button>
                      </div>
                    </div>
                    <div id="dialerLiveTranscript" style={{display:"none",margin:"0 12px 12px",background:"#12151c",borderRadius:"16px",border:"1px solid #262b38",overflow:"hidden"}}>
                      <div style={{padding:"10px 14px",display:"flex",alignItems:"center",gap:"7px",borderBottom:"1px solid #262b38"}}>
                        <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#5dcaa5",animation:"blink 1.2s ease-in-out infinite"}} />
                        {" "}
                        <span style={{fontSize:"12.5px",fontWeight:"800",color:"#e5e5ea",textTransform:"uppercase",letterSpacing:".4px"}}>
                          Live transcript
                        </span>
                      </div>
                      <div id="transcriptLines" style={{padding:"12px 14px",maxHeight:"480px",minHeight:"220px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"9px"}} />
                    </div>
                  </div>
                  <div id="dialerAiAssistCol" style={{display:"none",width:"380px",flexShrink:"0",maxHeight:"640px",overflowY:"auto",margin:"12px 12px 12px 0"}}>
                    <div id="dialerAiAssist" style={{display:"none",background:"#fff",borderRadius:"18px",border:"1px solid #e5e5ea",boxShadow:"0 4px 20px rgba(76,29,149,.1)",overflow:"hidden"}}>
                      <div style={{background:"linear-gradient(120deg,#4c1d95,#6d28d9 60%,#8b5cf6)",padding:"12px 16px",display:"flex",alignItems:"center",gap:"9px",position:"relative",overflow:"hidden"}}>
                        <div style={{position:"absolute",top:"-30%",right:"-5%",width:"140px",height:"140px",background:"radial-gradient(circle,rgba(255,255,255,.16),transparent 70%)",pointerEvents:"none"}} />
                        <div style={{width:"28px",height:"28px",borderRadius:"9px",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                          <i className="ti ti-sparkles" style={{color:"#fff",fontSize:"16px"}} />
                        </div>
                        <span style={{fontSize:"15px",fontWeight:"800",color:"#fff",position:"relative",zIndex:"1"}}>
                          AI Assist
                        </span>
                        {" "}
                        <span style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:"4px",fontSize:"12.5px",color:"#fff",fontWeight:"800",textTransform:"uppercase",letterSpacing:".4px",background:"rgba(255,255,255,.16)",padding:"4px 9px",borderRadius:"20px",position:"relative",zIndex:"1"}}>
                          <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#5dcaa5",animation:"blink 1.2s ease-in-out infinite"}} />
                          Live
                        </span>
                      </div>
                      <div id="aiAssistGamifyStrip" style={{display:"none",alignItems:"center",gap:"14px",padding:"9px 16px",background:"linear-gradient(120deg,#0a1a14,#0f3d2f 55%,#0f6e56)",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
                        <i className="ti ti-trophy" style={{fontSize:"16px",color:"#FFD700",flexShrink:"0"}} />
                        <div style={{display:"flex",gap:"18px",flex:"1"}}>
                          <div>
                            <span id="aiGamifyValue" style={{fontSize:"15px",fontWeight:"800",color:"#fff"}}>
                              ₹—
                            </span>
                            <span style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"600",marginLeft:"4px"}}>
                              unlock
                            </span>
                          </div>
                          <div>
                            <span id="aiGamifyPts" style={{fontSize:"15px",fontWeight:"800",color:"#FFD700"}}>
                              +—
                            </span>
                            <span style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"600",marginLeft:"4px"}}>
                              OG Score™
                            </span>
                          </div>
                          <div>
                            <span id="aiGamifyRank" style={{fontSize:"15px",fontWeight:"800",color:"#fff"}}>
                              #—
                            </span>
                            <span style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"600",marginLeft:"4px"}}>
                              rank if closed
                            </span>
                          </div>
                        </div>
                      </div>
                      <div style={{padding:"13px 16px 4px"}}>
                        <div style={{fontSize:"12.5px",fontWeight:"800",color:"#a3660a",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"8px",display:"flex",alignItems:"center",gap:"5px"}}>
                          <i className="ti ti-target-arrow" style={{fontSize:"14.5px"}} />
                          Main objective — what to offer
                        </div>
                        <div id="aiAssistPreCall" />
                      </div>
                      <div style={{padding:"9px 16px 4px"}}>
                        <div style={{fontSize:"12.5px",fontWeight:"800",color:"#3a3a42",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"8px",display:"flex",alignItems:"center",gap:"5px"}}>
                          <i className="ti ti-checklist" style={{fontSize:"14.5px",color:"#7c3aed"}} />
                          SOP checklist — this call
                        </div>
                        <div id="liveSopChecklist" style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"4px"}} />
                        <div id="sopNudgeBox" style={{display:"none",marginTop:"9px",background:"linear-gradient(120deg,#fff8e1,#fffbf0)",border:"1px solid #f5cf94",borderRadius:"11px",padding:"10px 12px"}} />
                      </div>
                      <div style={{padding:"10px 16px 14px"}}>
                        <div style={{fontSize:"12.5px",fontWeight:"700",color:"#6d28d9",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"6px",display:"flex",alignItems:"center",gap:"5px"}}>
                          <i className="ti ti-message-chatbot" style={{fontSize:"14.5px"}} />
                          Ask AI about this call
                        </div>
                        <div style={{display:"flex",gap:"6px",marginBottom:"9px"}}>
                          <input id="aiAssistAskInput" type="text" placeholder="e.g. what's our return policy? has he mentioned budget?" style={{flex:"1",fontSize:"13.5px",color:"#1a1a1a",background:"#faf9f6",border:"1px solid #e4d9fc",borderRadius:"10px",padding:"9px 12px",fontFamily:"inherit"}} onKeyDown={on(function(event){if(event.key==='Enter'){event.preventDefault();aiAssistAsk();}
})} />
                          {" "}
                          <button onClick={on(function(event){aiAssistAsk()
})} style={{background:"#6d28d9",color:"#fff",border:"none",borderRadius:"10px",padding:"0 14px",cursor:"pointer",display:"flex",alignItems:"center"}}>
                            <i className="ti ti-send" style={{fontSize:"16px"}} />
                          </button>
                        </div>
                        <div id="aiAssistSuggested" style={{fontSize:"15px",color:"#1a1a1a",lineHeight:"1.55",background:"linear-gradient(120deg,#f7f4ff,#f1ecff)",border:"1px solid #e4d9fc",borderRadius:"12px",padding:"11px 13px",marginBottom:"12px",fontWeight:"500"}} />
                        <div id="aiAssistQuickReplies" style={{display:"flex",gap:"7px",flexWrap:"wrap",marginBottom:"16px"}} />
                        <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"8px"}}>
                          <div style={{fontSize:"12.5px",fontWeight:"800",color:"#3a3a42",textTransform:"uppercase",letterSpacing:".4px"}}>
                            <i className="ti ti-notes" style={{fontSize:"13.5px",color:"#7c3aed",verticalAlign:"-1px",marginRight:"3px"}} />
                            Summary, drafting as you talk
                          </div>
                        </div>
                        <div id="liveSummaryBox" style={{fontSize:"14px",color:"#4b4b52",lineHeight:"1.55",background:"#faf9f6",border:"1px dashed #ddd6ea",borderRadius:"11px",padding:"10px 12px",marginBottom:"16px",minHeight:"20px"}} />
                        <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"10px"}}>
                          <div style={{fontSize:"12.5px",fontWeight:"800",color:"#3a3a42",textTransform:"uppercase",letterSpacing:".4px"}}>
                            📋 Case History
                          </div>
                        </div>
                        <div id="aiAssistCaseHistory" />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"flex-start"}}>
                  <div id="planPanelsWrap" style={{flex:"1",minWidth:"0",paddingBottom:"90px"}}>
                    <div id="planPanel-incoming" style={{display:"none"}}>
                      <div style={{padding:"14px 14px 4px"}}>
                        <div style={{fontSize:"14.5px",fontWeight:"800",color:"#1a1a1a"}}>
                          Missed calls
                        </div>
                        <div style={{fontSize:"12.5px",color:"#8e8e93",marginTop:"1px"}}>
                          Ranked by expected value — call the highest-value leads back first
                        </div>
                      </div>
                      <div id="planIncomingSummary" style={{display:"flex",alignItems:"center",gap:"16px",margin:"8px 14px 4px",background:"#faf9f6",borderRadius:"12px",padding:"11px 14px"}} />
                      <div id="planIncomingList" style={{padding:"6px 12px"}} />
                    </div>
                    <div id="planPanel-outgoing">
                      <div style={{padding:"14px 14px 4px"}}>
                        <div style={{fontSize:"14.5px",fontWeight:"800",color:"#1a1a1a"}}>
                          Planned outgoing calls
                        </div>
                        <div style={{fontSize:"12.5px",color:"#8e8e93",marginTop:"1px"}}>
                          Ranked by lead attractiveness score — tap a lead for the full picture
                        </div>
                      </div>
                      <div id="planOutgoingList" style={{padding:"6px 12px"}} />
                      <div id="planOutgoingPager" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",padding:"10px 12px 4px"}} />
                    </div>
                    <div id="planPanel-recent" style={{display:"none"}}>
                      <div style={{padding:"14px 14px 4px"}}>
                        <div style={{fontSize:"14.5px",fontWeight:"800",color:"#1a1a1a"}}>
                          Recent calls
                        </div>
                        <div style={{fontSize:"12.5px",color:"#8e8e93",marginTop:"1px"}}>
                          Tap a call to review it against SOP
                        </div>
                      </div>
                      <div id="planRecentList" style={{padding:"6px 12px"}} />
                    </div>
                  </div>
                </div>
                <div onClick={on(function(event){dialerToggleKeypad()
})} style={{position:"fixed",bottom:"24px",right:"24px",width:"54px",height:"54px",borderRadius:"50%",background:"linear-gradient(135deg,#4338ca,#6d28d9)",boxShadow:"0 6px 20px rgba(67,56,202,.45)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:"50"}}>
                  <i className="ti ti-dialpad" style={{fontSize:"22px",color:"#fff"}} />
                </div>
                <div id="dialerKeypadSheet" style={{display:"none",position:"fixed",inset:"0",background:"rgba(0,0,0,.4)",zIndex:"400",alignItems:"flex-end",justifyContent:"center"}} onClick={on(function(event){if(event.target===this)dialerToggleKeypad()
})}>
                  <div style={{background:"#fff",borderRadius:"20px 20px 0 0",padding:"16px",width:"100%",maxWidth:"360px"}}>
                    <div style={{width:"36px",height:"4px",background:"#e5e5ea",borderRadius:"2px",margin:"0 auto 14px"}} />
                    <input id="dialerNumberDisplay" readOnly style={{width:"100%",textAlign:"center",fontSize:"24px",fontWeight:"700",color:"#1a1a1a",border:"none",outline:"none",marginBottom:"14px"}} />
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px"}} id="dialerKeypadGrid" />
                    <button onClick={on(function(event){dialerStartCall()
})} style={{width:"56px",height:"56px",borderRadius:"50%",background:"#0f6e56",border:"none",color:"#fff",margin:"16px auto 0",display:"block",cursor:"pointer"}}>
                      <i className="ti ti-phone" style={{fontSize:"20px"}} />
                    </button>
                  </div>
                </div>
                <div className="ios-overlay" id="callWrapupOverlay" style={{zIndex:"410"}}>
                  <div className="ios-sheet" style={{position:"relative"}}>
                    <div className="ios-sheet-handle" />
                    <button className="sheet-close-btn" onClick={on(function(event){skipCallWrapup()
})}>
                      ✕
                    </button>
                    <div className="ios-sheet-inner">
                      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"4px"}}>
                        <div style={{width:"36px",height:"36px",borderRadius:"50%",background:"#e1f5ee",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                          <i className="ti ti-phone-check" style={{fontSize:"17px",color:"#0f6e56"}} />
                        </div>
                        <div>
                          <div className="ios-sheet-title" style={{margin:"0"}} id="wrapupName">
                            Call wrapped up
                          </div>
                          <div className="ios-sheet-sub" id="wrapupMeta">
                            —
                          </div>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"6px",margin:"14px 0 6px"}}>
                        <i className="ti ti-sparkles" style={{fontSize:"14.5px",color:"#7c3aed"}} />
                        {" "}
                        <span style={{fontSize:"13px",fontWeight:"700",color:"#7c3aed",textTransform:"uppercase",letterSpacing:".4px"}}>
                          AI-drafted summary — edit if needed
                        </span>
                      </div>
                      <textarea id="wrapupSummary" style={{width:"100%",minHeight:"64px",border:"1.5px solid #e5e5ea",borderRadius:"12px",padding:"10px 11px",fontSize:"14px",fontFamily:"inherit",color:"#1a1a1a",lineHeight:"1.5",resize:"vertical",boxSizing:"border-box"}} />
                      <div style={{fontSize:"13px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px",margin:"12px 0 6px"}}>
                        Outcome
                      </div>
                      <div id="wrapupOutcomeRow" style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"6px"}} />
                      <div className="ios-btn-row" style={{marginTop:"14px"}}>
                        <button className="ios-btn-secondary" onClick={on(function(event){skipCallWrapup()
})}>
                          Skip
                        </button>
                        {" "}
                        <button onClick={on(function(event){saveCallWrapup()
})} style={{flex:"1",padding:"13px",border:"none",borderRadius:"100px",fontSize:"14.5px",color:"#fff",background:"#0f6e56",cursor:"pointer",fontWeight:"600"}}>
                          <i className="ti ti-database-export" style={{fontSize:"15px",verticalAlign:"-2px",marginRight:"5px"}} />
                          Save to CRM
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ios-overlay" id="callSopOverlay" style={{zIndex:"415"}}>
                  <div className="ios-sheet" style={{position:"relative",maxHeight:"84vh"}}>
                    <div className="ios-sheet-handle" />
                    <button className="sheet-close-btn" onClick={on(function(event){closeCallSopReview()
})}>
                      ✕
                    </button>
                    <div className="ios-sheet-inner">
                      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
                        <div style={{width:"36px",height:"36px",borderRadius:"50%",background:"#f1ecff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                          <i className="ti ti-checklist" style={{fontSize:"17px",color:"#7c3aed"}} />
                        </div>
                        <div>
                          <div className="ios-sheet-title" style={{margin:"0"}} id="sopReviewName">
                            Call SOP review
                          </div>
                          <div className="ios-sheet-sub" id="sopReviewMeta">
                            —
                          </div>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"8px",background:"#faf9f6",borderRadius:"12px",padding:"11px 13px",margin:"12px 0"}} id="sopReviewScoreBar" />
                      <div id="sopReviewList" />
                    </div>
                  </div>
                </div>
              </div>
              {" "}
              {" "}
              <div className="sc" id="asc-avani" style={{position:"relative",overflow:"hidden"}}>
                <div className="avatar-picker">
                  <div className="av-picker-title">
                    Choose your Avani
                  </div>
                  <div className="av-options">
                    <div className="av-opt selected" onClick={on(function(event){selectAvatar(this)
})}>
                      <div className="av-opt-img">
                        <svg width="48" height="48" viewBox="0 0 48 48">
                          <circle cx="24" cy="24" r="24" fill="#0f6e56" />
                          <ellipse cx="24" cy="13" rx="8" ry="5.5" fill="#1a0a00" />
                          <ellipse cx="31" cy="17" rx="2" ry="5" fill="#1a0a00" />
                          <circle cx="24" cy="17.5" r="8.5" fill="#c8835a" />
                          <ellipse cx="21" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
                          <ellipse cx="27" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
                          <path d="M21.5 21 Q24 23 26.5 21" stroke="#a0522d" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <ellipse cx="17" cy="20" rx="2.5" ry="1.2" fill="#c8835a" />
                          <ellipse cx="31" cy="20" rx="2.5" ry="1.2" fill="#c8835a" />
                          <circle cx="24" cy="14.5" r=".9" fill="#e24b4a" />
                          <path d="M13 30 Q24 26 35 30 L37 48 H11 Z" fill="#1d9e75" />
                          <path d="M13 30 Q24 26 35 30 L35 33 Q24 29 13 33 Z" fill="#FFD700" />
                          <rect x="20" y="26" width="8" height="5" fill="#c8835a" />
                        </svg>
                      </div>
                      <div className="av-opt-label">
                        Traditional
                      </div>
                    </div>
                    <div className="av-opt" onClick={on(function(event){selectAvatar(this)
})}>
                      <div className="av-opt-img">
                        <svg width="48" height="48" viewBox="0 0 48 48">
                          <circle cx="24" cy="24" r="24" fill="#185fa5" />
                          <ellipse cx="24" cy="11" rx="9" ry="4" fill="#1a0a00" />
                          <ellipse cx="15.5" cy="18" rx="2" ry="7" fill="#1a0a00" />
                          <ellipse cx="32.5" cy="18" rx="2" ry="7" fill="#1a0a00" />
                          <circle cx="24" cy="18" r="8.5" fill="#d4956b" />
                          <ellipse cx="21" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
                          <ellipse cx="27" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
                          <path d="M21.5 21 Q24 23 26.5 21" stroke="#a0522d" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <ellipse cx="17" cy="19" rx="2" ry="1" fill="#d4956b" />
                          <ellipse cx="31" cy="19" rx="2" ry="1" fill="#d4956b" />
                          <rect x="19" y="26" width="10" height="4" fill="#d4956b" />
                          <path d="M11 31 Q24 27 37 31 L38 48 H10 Z" fill="#4a90d9" />
                          <path d="M11 31 Q24 27 37 31 L37 34 Q24 30 11 34 Z" fill="#fff" />
                        </svg>
                      </div>
                      <div className="av-opt-label">
                        Contemporary
                      </div>
                    </div>
                    <div className="av-opt" onClick={on(function(event){selectAvatar(this)
})}>
                      <div className="av-opt-img">
                        <svg width="48" height="48" viewBox="0 0 48 48">
                          <circle cx="24" cy="24" r="24" fill="#2d2d2d" />
                          <ellipse cx="24" cy="10" rx="8" ry="4.5" fill="#1a0a00" />
                          <circle cx="24" cy="10" r="4" fill="#1a0a00" />
                          <ellipse cx="15.5" cy="17" rx="1.5" ry="6" fill="#1a0a00" />
                          <ellipse cx="32.5" cy="17" rx="1.5" ry="6" fill="#1a0a00" />
                          <circle cx="24" cy="18" r="8.5" fill="#c8835a" />
                          <ellipse cx="21" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
                          <ellipse cx="27" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
                          <path d="M21.5 21 Q24 23 26.5 21" stroke="#a0522d" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <ellipse cx="17" cy="19" rx="2" ry="1" fill="#c8835a" />
                          <ellipse cx="31" cy="19" rx="2" ry="1" fill="#c8835a" />
                          <rect x="19" y="26" width="10" height="4" fill="#c8835a" />
                          <path d="M10 31 Q24 27 38 31 L39 48 H9 Z" fill="#1a1a2e" />
                          <path d="M20 31 L24 36 L28 31" fill="#fff" />
                        </svg>
                      </div>
                      <div className="av-opt-label">
                        Professional
                      </div>
                    </div>
                    <div className="av-opt" onClick={on(function(event){selectAvatar(this)
})}>
                      <div className="av-opt-img">
                        <svg width="48" height="48" viewBox="0 0 48 48">
                          <circle cx="24" cy="24" r="24" fill="#7c3aed" />
                          <ellipse cx="24" cy="11" rx="9" ry="5" fill="#1a0a00" />
                          <rect x="22" y="10" width="4" height="12" rx="2" fill="#1a0a00" />
                          <ellipse cx="15.5" cy="18" rx="2" ry="7" fill="#1a0a00" />
                          <ellipse cx="32.5" cy="18" rx="2" ry="7" fill="#1a0a00" />
                          <circle cx="24" cy="18" r="8.5" fill="#d4956b" />
                          <ellipse cx="21" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
                          <ellipse cx="27" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
                          <path d="M21.5 21 Q24 23 26.5 21" stroke="#a0522d" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <ellipse cx="17" cy="19" rx="2" ry="1" fill="#d4956b" />
                          <ellipse cx="31" cy="19" rx="2" ry="1" fill="#d4956b" />
                          <rect x="19" y="26" width="10" height="4" fill="#d4956b" />
                          <path d="M11 31 Q24 27 37 31 L38 48 H10 Z" fill="#f97316" />
                        </svg>
                      </div>
                      <div className="av-opt-label">
                        Smart Casual
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{background:"#0f6e56",padding:"8px 16px 0",position:"relative"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
                    <span style={{fontSize:"15px",fontWeight:"600",color:"#fff"}}>
                      Avani AI
                    </span>
                    {" "}
                    <span style={{fontSize:"12.5px",color:"#9fe1cb"}}>
                      Your personal sales coach ✨
                    </span>
                  </div>
                  <div className="seg-control" style={{margin:"0 0 0"}}>
                    <button className="seg-btn active" id="avaniDefaultBtn" onClick={on(function(event){aSetMode(this,'assess')
})}>
                      Assess
                    </button>
                    {" "}
                    <button className="seg-btn" onClick={on(function(event){aSetMode(this,'learn')
})}>
                      Learn
                    </button>
                    {" "}
                    <button className="seg-btn" onClick={on(function(event){aSetMode(this,'practise')
})}>
                      Practise
                    </button>
                  </div>
                  <div style={{height:"10px"}} />
                </div>
                {" "}
                <div id="avani-split-area" style={{display:"none",flexDirection:"column",height:"calc(100% - 118px)",background:"#f7f7f5",position:"relative"}}>
                  <div id="assess-history-backdrop" style={{display:"none",position:"absolute",inset:"0",background:"rgba(0,0,0,.35)",zIndex:"50",opacity:"0",transition:"opacity .25s"}} onClick={on(function(event){closeAssessHistory()
})} />
                  <div id="assess-history-drawer" style={{position:"absolute",top:"0",left:"0",bottom:"0",width:"230px",background:"#fff",zIndex:"60",transform:"translateX(-100%)",transition:"transform .28s cubic-bezier(.4,0,.2,1)",display:"flex",flexDirection:"column",boxShadow:"4px 0 20px rgba(0,0,0,.18)",pointerEvents:"none"}}>
                    <div style={{background:"#0a1a14",padding:"12px 12px 10px",display:"flex",alignItems:"center",gap:"8px",flexShrink:"0"}}>
                      <i className="ti ti-messages" style={{fontSize:"16px",color:"#5dcaa5"}} />
                      {" "}
                      <span style={{fontSize:"14.5px",fontWeight:"700",color:"#fff",flex:"1"}}>
                        Chat history
                      </span>
                      {" "}
                      <button onClick={on(function(event){closeAssessHistory()
})} title="Close" style={{background:"rgba(255,255,255,.14)",border:"none",borderRadius:"50%",width:"26px",height:"26px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"14.5px",cursor:"pointer",flexShrink:"0"}}>
                        ✕
                      </button>
                    </div>
                    <div style={{padding:"8px 10px 6px",flexShrink:"0"}}>
                      <div style={{background:"#f2f2f7",borderRadius:"8px",padding:"5px 10px",display:"flex",alignItems:"center",gap:"6px"}}>
                        <i className="ti ti-search" style={{fontSize:"13.5px",color:"#8e8e93",flexShrink:"0"}} />
                        {" "}
                        <input id="history-search" type="text" placeholder="Search chats…" onInput={on(function(event){filterHistoryList(this.value)
})} style={{border:"none",outline:"none",background:"transparent",fontSize:"12.5px",color:"#1a1a1a",width:"100%",fontFamily:"inherit"}} />
                      </div>
                    </div>
                    <div id="history-list" style={{flex:"1",overflowY:"auto",padding:"2px 0 8px"}} />
                    <div id="history-empty" style={{display:"none",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 12px",textAlign:"center"}}>
                      <i className="ti ti-messages" style={{fontSize:"24px",color:"#c5c5c5",marginBottom:"8px"}} />
                      <div style={{fontSize:"12.5px",color:"#8e8e93",lineHeight:"1.5"}}>
                        No chats yet.
                        <br />
                        Start a conversation!
                      </div>
                    </div>
                    <div style={{padding:"8px 10px 12px",flexShrink:"0",borderTop:"0.5px solid #e5e5ea"}}>
                      <button onClick={on(function(event){startNewAssessChat()
})} style={{width:"100%",padding:"9px",background:"#1d9e75",border:"none",borderRadius:"10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"}}>
                        <i className="ti ti-edit" style={{fontSize:"14.5px",color:"#fff"}} />
                        {" "}
                        <span style={{fontSize:"13.5px",color:"#fff",fontWeight:"600"}}>
                          New chat
                        </span>
                      </button>
                    </div>
                  </div>
                  <div id="a-panel-assess" style={{display:"flex",flexDirection:"column",flex:"1",minWidth:"0",background:"#f7f7f5",position:"relative",height:"100%"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"7px 12px 6px",background:"#f7f7f5",borderBottom:"0.5px solid #ebebeb",flexShrink:"0"}}>
                      <button onClick={on(function(event){openAssessHistory()
})} style={{display:"flex",alignItems:"center",gap:"5px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"20px",padding:"5px 11px",cursor:"pointer",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
                        <i className="ti ti-layout-sidebar" style={{fontSize:"14.5px",color:"#1d9e75"}} />
                        {" "}
                        <span style={{fontSize:"12.5px",color:"#333",fontWeight:"500"}}>
                          Chats
                        </span>
                      </button>
                      {" "}
                      <span style={{fontSize:"12.5px",color:"#8e8e93",flex:"1",textAlign:"center"}} id="assess-session-title">
                        New session
                      </span>
                      {" "}
                      <button onClick={on(function(event){startNewAssessChat()
})} style={{width:"28px",height:"28px",borderRadius:"50%",background:"#1d9e75",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} title="New chat">
                        <i className="ti ti-edit" style={{fontSize:"14.5px",color:"#fff"}} />
                      </button>
                    </div>
                    <div id="assess-chat-scroll" style={{flex:"1",overflowY:"auto",padding:"16px 14px 8px",scrollBehavior:"smooth"}}>
                      <div className="avani-msg-row" style={{display:"flex",gap:"8px",marginBottom:"16px",alignItems:"flex-start"}}>
                        <div style={{width:"26px",height:"26px",borderRadius:"50%",background:"linear-gradient(135deg,#0f6e56,#1d9e75)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0",marginTop:"2px"}}>
                          <svg width="14" height="14" viewBox="0 0 14 14">
                            <circle cx="7" cy="7" r="7" fill="none" />
                            <path d="M3 4.5h8M3 7h6M3 9.5h7" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div style={{flex:"1"}}>
                          <div style={{fontSize:"12.5px",fontWeight:"600",color:"#1d9e75",marginBottom:"4px",letterSpacing:".2px"}}>
                            Avani AI
                          </div>
                          <div className="avani-bubble" style={{fontSize:"14.5px",color:"#1a1a1a",lineHeight:"1.6"}}>
                            {" "}Ready to assess! Ask me anything about products, sales techniques, or objection handling — I'll give you feedback and coaching. 🎯{" "}
                          </div>
                          <div id="assess-chips" style={{display:"flex",flexWrap:"wrap",gap:"6px",marginTop:"10px"}}>
                            <div onClick={on(function(event){assessChip('How do I explain the 100-night trial?')
})} style={{padding:"6px 11px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"20px",fontSize:"12.5px",color:"#333",cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",boxShadow:"0 1px 3px rgba(0,0,0,.05)",whiteSpace:"nowrap"}}>
                              <i className="ti ti-moon" style={{fontSize:"13.5px",color:"#1d9e75"}} />
                              100-night trial
                            </div>
                            <div onClick={on(function(event){assessChip('How do I handle price objections?')
})} style={{padding:"6px 11px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"20px",fontSize:"12.5px",color:"#333",cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",boxShadow:"0 1px 3px rgba(0,0,0,.05)",whiteSpace:"nowrap"}}>
                              <i className="ti ti-currency-rupee" style={{fontSize:"13.5px",color:"#1d9e75"}} />
                              Price objection
                            </div>
                            <div onClick={on(function(event){assessChip('What are my weak areas this week?')
})} style={{padding:"6px 11px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"20px",fontSize:"12.5px",color:"#333",cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",boxShadow:"0 1px 3px rgba(0,0,0,.05)",whiteSpace:"nowrap"}}>
                              <i className="ti ti-chart-bar" style={{fontSize:"13.5px",color:"#1d9e75"}} />
                              My weak areas
                            </div>
                            <div onClick={on(function(event){assessChip('Quiz me on the warranty policy')
})} style={{padding:"6px 11px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"20px",fontSize:"12.5px",color:"#333",cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",boxShadow:"0 1px 3px rgba(0,0,0,.05)",whiteSpace:"nowrap"}}>
                              <i className="ti ti-shield" style={{fontSize:"13.5px",color:"#1d9e75"}} />
                              Warranty quiz
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{padding:"8px 12px 12px",background:"#f7f7f5",flexShrink:"0",borderTop:"1px solid #ebebeb"}}>
                      <div id="assess-attachment-preview" style={{display:"none",marginBottom:"6px"}}>
                        <div style={{display:"inline-flex",alignItems:"center",gap:"6px",background:"#fff",border:"1px solid #e0e0e0",borderRadius:"10px",padding:"5px 10px",fontSize:"12.5px",color:"#1a1a1a",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
                          <i className="ti ti-file-text" style={{fontSize:"14.5px",color:"#1d9e75"}} />
                          {" "}
                          <span id="assess-attachment-name">
                            file.pdf
                          </span>
                          {" "}
                          <button onClick={on(function(event){removeAttachment()
})} style={{background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:"14.5px",padding:"0",marginLeft:"2px",lineHeight:"1",display:"flex",alignItems:"center"}}>
                            ✕
                          </button>
                        </div>
                      </div>
                      <div style={{background:"#fff",border:"1.5px solid #e0e0e0",borderRadius:"20px",boxShadow:"0 2px 10px rgba(0,0,0,.06)",transition:"border-color .2s"}} id="assess-input-box">
                        <div style={{display:"flex",alignItems:"flex-end",gap:"6px",padding:"8px 10px 8px 14px"}}>
                          {" "}
                          <label htmlFor="assess-file-input" style={{cursor:"pointer",flexShrink:"0",width:"28px",height:"28px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:"#f2f2f7"}} title="Attach file">
                            <i className="ti ti-paperclip" style={{fontSize:"15px",color:"#888"}} />
                          </label>
                          {" "}
                          <input type="file" id="assess-file-input" style={{display:"none"}} accept=".pdf,.doc,.docx,.txt,.jpg,.png" onChange={on(function(event){handleAssessAttachment(this)
})} />
                          {" "}
                          {" "}
                          <textarea id="assess-input" placeholder="Ask Avani anything…" rows="1" style={{flex:"1",border:"none",outline:"none",resize:"none",fontSize:"14.5px",color:"#1a1a1a",background:"transparent",fontFamily:"inherit",lineHeight:"1.5",maxHeight:"88px",overflowY:"auto",padding:"4px 0",minHeight:"24px"}} onInput={on(function(event){assessInputChange(this)
})} onKeyDown={on(function(event){if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendAssessMessage()}
})} onFocus={on(function(event){document.getElementById('assess-input-box').style.borderColor='#1d9e75'
})} onBlur={on(function(event){document.getElementById('assess-input-box').style.borderColor='#e0e0e0'
})} />
                          {" "}
                          {" "}
                          <button id="assess-mic-btn" onClick={on(function(event){toggleAssessMic()
})} style={{width:"32px",height:"32px",borderRadius:"50%",border:"none",display:"flex",alignItems:"center",justifyContent:"center",background:"#f2f2f7",cursor:"pointer",flexShrink:"0",transition:"background .2s"}}>
                            <i className="ti ti-microphone" style={{fontSize:"16px",color:"#666"}} />
                          </button>
                          {" "}
                          <button id="assess-send-btn" onClick={on(function(event){sendAssessMessage()
})} style={{width:"32px",height:"32px",borderRadius:"50%",border:"none",display:"flex",alignItems:"center",justifyContent:"center",background:"#1d9e75",cursor:"pointer",flexShrink:"0",opacity:".4",transition:"opacity .2s",pointerEvents:"none"}}>
                            <i className="ti ti-arrow-up" style={{fontSize:"16px",color:"#fff"}} />
                          </button>
                        </div>
                      </div>
                      <div style={{textAlign:"center",fontSize:"12.5px",color:"#bbb",marginTop:"5px"}}>
                        Avani may make mistakes. Verify with your manager.
                      </div>
                    </div>
                  </div>
                </div>
                <div id="a-panel-learn" style={{overflowY:"auto",paddingBottom:"80px"}}>
                  <div style={{margin:"12px 14px",background:"linear-gradient(135deg,#0a2a1e,#0f6e56)",borderRadius:"12px",padding:"12px 14px",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",right:"-8px",top:"-8px",fontSize:"52px",opacity:".12"}}>
                      🎓
                    </div>
                    <div style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"600",textTransform:"uppercase",letterSpacing:".6px",marginBottom:"4px"}}>
                      ✦ Avani — Your Learning Path
                    </div>
                    <div style={{fontSize:"14.5px",fontWeight:"600",color:"#fff",marginBottom:"3px"}}>
                      4 modules assigned this week
                    </div>
                    <div style={{fontSize:"12.5px",color:"#9fe1cb",lineHeight:"1.5"}}>
                      2 core + 2 personalised from your store conversations.
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"}}>
                      <div style={{flex:"1",background:"rgba(255,255,255,.15)",borderRadius:"4px",height:"5px",overflow:"hidden"}}>
                        <div style={{width:"25%",background:"linear-gradient(90deg,#5dcaa5,#FFD700)",height:"100%",borderRadius:"4px"}} />
                      </div>
                      <span style={{fontSize:"12.5px",color:"#FFD700",fontWeight:"600"}}>
                        1/4 done
                      </span>
                    </div>
                  </div>
                  <div style={{margin:"0 12px 8px",background:"#fff",borderRadius:"12px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.1)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px"}}>
                      <div style={{width:"40px",height:"40px",borderRadius:"10px",background:"#e1f5ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:"0"}}>
                        🛏️
                      </div>
                      <div style={{flex:"1"}}>
                        <div style={{fontSize:"13.5px",fontWeight:"500",color:"#1a1a1a",marginBottom:"2px"}}>
                          Product Foundations
                        </div>
                        <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                          GRID vs Luxe · Foam types · SKU specs
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"5px"}}>
                          <div style={{flex:"1",background:"#e5e5ea",borderRadius:"3px",height:"4px",overflow:"hidden"}}>
                            <div style={{width:"100%",background:"#1d9e75",height:"100%",borderRadius:"3px"}} />
                          </div>
                          <span style={{fontSize:"12.5px",color:"#1d9e75",fontWeight:"600"}}>
                            Done ✓
                          </span>
                        </div>
                      </div>
                      <div style={{width:"26px",height:"26px",borderRadius:"50%",background:"#1d9e75",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                        <i className="ti ti-check" style={{fontSize:"14.5px",color:"#fff"}} />
                      </div>
                    </div>
                  </div>
                  <div style={{margin:"0 12px 14px",background:"#fff",borderRadius:"12px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.1)",border:"1.5px solid #1d9e7530"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px"}}>
                      <div style={{width:"40px",height:"40px",borderRadius:"10px",background:"#fff3e0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:"0"}}>
                        🛡️
                      </div>
                      <div style={{flex:"1"}}>
                        <div style={{fontSize:"13.5px",fontWeight:"500",color:"#1a1a1a",marginBottom:"2px"}}>
                          Warranty &amp; Trial Policy
                        </div>
                        <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                          100-night trial · Return process · Key scripts
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"5px"}}>
                          <div style={{flex:"1",background:"#e5e5ea",borderRadius:"3px",height:"4px",overflow:"hidden"}}>
                            <div style={{width:"40%",background:"#ef9f27",height:"100%",borderRadius:"3px"}} />
                          </div>
                          <span style={{fontSize:"12.5px",color:"#ef9f27",fontWeight:"600"}}>
                            40%
                          </span>
                        </div>
                      </div>
                      <i className="ti ti-player-play" style={{fontSize:"18px",color:"#1d9e75",flexShrink:"0"}} />
                    </div>
                  </div>
                </div>
                <div id="a-panel-practise" style={{display:"none",overflowY:"auto",paddingBottom:"80px",height:"calc(100% - 118px)"}}>
                  <div id="practise-picker">
                    <div style={{margin:"12px 14px",background:"linear-gradient(135deg,#0a2a1e,#0f6e56)",borderRadius:"12px",padding:"12px 14px",position:"relative",overflow:"hidden"}}>
                      <div style={{position:"absolute",right:"-8px",top:"-8px",fontSize:"52px",opacity:".12"}}>
                        🎙️
                      </div>
                      <div style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"600",textTransform:"uppercase",letterSpacing:".6px",marginBottom:"4px"}}>
                        ✦ Your Net Practise
                      </div>
                      <div style={{fontSize:"14.5px",fontWeight:"600",color:"#fff",marginBottom:"3px"}}>
                        Pick a step to rehearse
                      </div>
                      <div style={{fontSize:"12.5px",color:"#9fe1cb",lineHeight:"1.5"}}>
                        See how it's done, record your own take, get instant feedback — just like net practise before the real match.
                      </div>
                    </div>
                    <div id="avaniFocusBanner" style={{display:"none",margin:"0 14px 10px",background:"#fef6ec",border:"1px solid #f5cf94",borderRadius:"11px",padding:"9px 11px",alignItems:"center",gap:"7px"}}>
                      <i className="ti ti-target" style={{color:"#c8860a",fontSize:"16px",flexShrink:"0"}} />
                      {" "}
                      <span style={{fontSize:"13px",color:"#7c4a00",fontWeight:"600",lineHeight:"1.4"}} />
                    </div>
                    <div id="practise-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",padding:"0 14px"}} />
                  </div>
                  <div id="practise-howto" style={{display:"none",padding:"0 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"6px",padding:"14px 0 8px",cursor:"pointer",color:"#1d9e75",fontSize:"13.5px",fontWeight:"600"}} onClick={on(function(event){practiseBackToPicker()
})}>
                      <i className="ti ti-chevron-left" />
                      {" "}All steps
                    </div>
                    <div style={{background:"#fff",borderRadius:"14px",padding:"16px",boxShadow:"0 1px 3px rgba(0,0,0,.08)"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
                        <div id="practise-howto-icon" style={{fontSize:"28px"}} />
                        <div id="practise-howto-title" style={{fontSize:"16px",fontWeight:"700",color:"#1a1a1a"}} />
                      </div>
                      <div style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"4px"}}>
                        How to do this well
                      </div>
                      <div id="practise-howto-tip" style={{fontSize:"14px",color:"#333",lineHeight:"1.6",marginBottom:"14px"}} />
                      <div style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"6px"}}>
                        Watch a model example
                      </div>
                      <div style={{background:"#0a1a14",borderRadius:"10px",aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"12px",position:"relative",cursor:"pointer"}}>
                        <div style={{width:"46px",height:"46px",borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <i className="ti ti-player-play" style={{fontSize:"20px",color:"#fff"}} />
                        </div>
                        <span style={{position:"absolute",bottom:"8px",right:"10px",fontSize:"12.5px",color:"#9fe1cb",background:"rgba(0,0,0,.4)",padding:"2px 6px",borderRadius:"5px"}}>
                          0:42
                        </span>
                      </div>
                      <div style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"6px"}}>
                        Example script
                      </div>
                      <div id="practise-howto-example" style={{fontSize:"13.5px",color:"#1a1a1a",lineHeight:"1.6",background:"#f7f7f5",borderRadius:"10px",padding:"10px 12px",fontStyle:"italic",marginBottom:"16px"}} />
                      <button onClick={on(function(event){practiseStartRecording()
})} style={{width:"100%",padding:"12px",background:"#1d9e75",border:"none",borderRadius:"12px",color:"#fff",fontSize:"14.5px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
                        <i className="ti ti-microphone" />
                        {" "}Record your rendition
                      </button>
                    </div>
                  </div>
                  <div id="practise-recording" style={{display:"none",padding:"40px 14px",textAlign:"center"}}>
                    <div id="practise-rec-title" style={{fontSize:"14.5px",fontWeight:"600",color:"#1a1a1a",marginBottom:"24px"}} />
                    <div style={{width:"110px",height:"110px",borderRadius:"50%",background:"#e1f5ee",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",position:"relative"}}>
                      <div id="practise-rec-dot" className="practise-pulse" />
                      <i className="ti ti-microphone" style={{fontSize:"38px",color:"#1d9e75",position:"relative",zIndex:"1"}} />
                    </div>
                    <div id="practise-rec-timer" style={{fontSize:"22px",fontWeight:"800",color:"#1a1a1a",marginBottom:"4px"}}>
                      0:00
                    </div>
                    <div style={{fontSize:"12.5px",color:"#8e8e93",marginBottom:"28px"}}>
                      Recording — say it like you would on the floor
                    </div>
                    <button onClick={on(function(event){practiseStopRecording()
})} style={{padding:"12px 32px",background:"#e24b4a",border:"none",borderRadius:"24px",color:"#fff",fontSize:"14.5px",fontWeight:"700",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px"}}>
                      <i className="ti ti-player-stop" />
                      {" "}Stop &amp; Get Feedback
                    </button>
                  </div>
                  <div id="practise-feedback" style={{display:"none",padding:"0 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"6px",padding:"14px 0 8px",cursor:"pointer",color:"#1d9e75",fontSize:"13.5px",fontWeight:"600"}} onClick={on(function(event){practiseBackToPicker()
})}>
                      <i className="ti ti-chevron-left" />
                      {" "}All steps
                    </div>
                    <div style={{background:"#fff",borderRadius:"14px",padding:"16px",boxShadow:"0 1px 3px rgba(0,0,0,.08)",marginBottom:"14px"}}>
                      <div id="practise-fb-title" style={{fontSize:"16px",fontWeight:"800",marginBottom:"3px"}} />
                      <div id="practise-fb-duration" style={{fontSize:"13px",color:"#8e8e93",marginBottom:"14px"}} />
                      <div style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"4px"}}>
                        What we checked for
                      </div>
                      <div id="practise-fb-checklist" />
                      <div style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px",margin:"14px 0 4px"}}>
                        Coach's note
                      </div>
                      <div id="practise-fb-tip" style={{fontSize:"13.5px",color:"#1a1a1a",lineHeight:"1.6",background:"#f4fef8",borderRadius:"10px",padding:"10px 12px"}} />
                    </div>
                    <div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>
                      <button onClick={on(function(event){practiseSelect(practiseCurrent.id)
})} style={{flex:"1",padding:"11px",background:"#fff",border:"1.5px solid #1d9e75",borderRadius:"12px",color:"#1d9e75",fontSize:"13.5px",fontWeight:"700",cursor:"pointer"}}>
                        Practise Again
                      </button>
                      {" "}
                      <button onClick={on(function(event){practiseBackToPicker()
})} style={{flex:"1",padding:"11px",background:"#1d9e75",border:"none",borderRadius:"12px",color:"#fff",fontSize:"13.5px",fontWeight:"700",cursor:"pointer"}}>
                        Choose Another Step
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sc" id="asc-calendar">
                <div style={{padding:"12px 12px 0"}}>
                  <div style={{fontSize:"16px",fontWeight:"700",color:"#1a1a1a",display:"flex",alignItems:"center"}}>
                    <i className="ti ti-calendar" style={{marginRight:"7px",color:"#185fa5"}} />
                    Calendar
                  </div>
                  <div style={{fontSize:"12.5px",color:"#8e8e93",marginTop:"1px"}}>
                    Mirrored from your mailbox — invites created here land there too
                  </div>
                </div>
                <div style={{background:"linear-gradient(135deg,#e8f0fe,#eef3fd)",borderRadius:"14px",padding:"11px 13px",margin:"10px 12px 4px",display:"flex",alignItems:"center",gap:"9px",border:"1px solid #dbe7fb"}}>
                  <div style={{width:"30px",height:"30px",borderRadius:"9px",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0",boxShadow:"0 1px 3px rgba(24,95,165,.15)"}}>
                    <i className="ti ti-mail" style={{color:"#185fa5",fontSize:"16px"}} />
                  </div>
                  <div style={{fontSize:"12.5px",color:"#0c2b52",lineHeight:"1.4"}}>
                    Store visits, coaching sessions, and meeting invites all show up here — and in your mailbox.
                  </div>
                </div>
                <div className="cal-card">
                  <div style={{margin:"14px 14px 0",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"8px"}}>
                    <button onClick={on(function(event){calMonthNav(-1)
})} style={{background:"#f2f2f7",border:"none",borderRadius:"10px",width:"32px",height:"32px",cursor:"pointer",flexShrink:"0"}}>
                      <i className="ti ti-chevron-left" style={{fontSize:"16px",color:"#555"}} />
                    </button>
                    <div id="calMonthLabel" style={{fontSize:"16px",fontWeight:"800",color:"#1a1a1a",letterSpacing:"-.2px",flex:"1",textAlign:"center"}} />
                    <button onClick={on(function(event){calJumpToday()
})} title="Jump to today" style={{background:"#e8f0fe",border:"1px solid #d3e3fc",borderRadius:"10px",padding:"0 11px",height:"28px",cursor:"pointer",fontSize:"13px",fontWeight:"700",color:"#185fa5",flexShrink:"0",whiteSpace:"nowrap"}}>
                      Today
                    </button>
                    {" "}
                    <button onClick={on(function(event){calMonthNav(1)
})} style={{background:"#f2f2f7",border:"none",borderRadius:"10px",width:"32px",height:"32px",cursor:"pointer",flexShrink:"0"}}>
                      <i className="ti ti-chevron-right" style={{fontSize:"16px",color:"#555"}} />
                    </button>
                  </div>
                  <div className="cal-month-weekdays" id="calMonthWeekdays" />
                  <div className="cal-month-grid" id="calMonthGrid" />
                </div>
                <div style={{padding:"16px 12px 6px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}}>
                  Upcoming
                </div>
                <div id="calInvitesListBody" style={{paddingBottom:"24px"}} />
              </div>
              <div className="ios-overlay" id="calShareOverlay">
                <div className="ios-sheet" style={{position:"relative"}}>
                  <div className="ios-sheet-handle" />
                  <button className="sheet-close-btn" onClick={on(function(event){closeCalShareInvite()
})}>
                    ✕
                  </button>
                  <div className="ios-sheet-inner" style={{padding:"18px 20px 24px"}}>
                    <div className="ios-sheet-title">
                      Share invite
                    </div>
                    <div className="ios-sheet-sub" id="calShareTitle" style={{marginBottom:"14px"}}>
                      —
                    </div>
                    <div id="calShareOptionsList" />
                    <button onClick={on(function(event){calConfirmShare()
})} style={{width:"100%",marginTop:"8px",padding:"11px",border:"none",borderRadius:"10px",fontSize:"14.5px",fontWeight:"700",color:"#fff",background:"linear-gradient(135deg,#4c1d95,#6d28d9)",cursor:"pointer"}}>
                      Done
                    </button>
                  </div>
                </div>
              </div>
              <div className="ios-overlay" id="staffAgentConfigOverlay">
                <div className="ios-sheet" style={{position:"relative",maxHeight:"88%"}}>
                  <button className="sheet-close-btn" onClick={on(function(event){closeStaffAgentConfig()
})} style={{zIndex:"2"}}>
                    ✕
                  </button>
                  <div id="staffAgentConfigHead" style={{padding:"20px 20px 16px",borderRadius:"20px 20px 0 0"}}>
                    <div style={{width:"38px",height:"38px",borderRadius:"11px",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"19px",marginBottom:"9px"}} id="staffAgentConfigIcon">
                      🎯
                    </div>
                    <div style={{fontSize:"16px",fontWeight:"800",color:"#fff"}} id="staffAgentConfigTitle">
                      Agent
                    </div>
                    <div style={{fontSize:"13px",color:"rgba(255,255,255,.75)"}} id="staffAgentConfigSub">
                      Sub
                    </div>
                  </div>
                  <div className="ios-sheet-inner" style={{padding:"16px 20px 22px"}} id="staffAgentConfigBody" />
                </div>
              </div>
              <div className="sc" id="asc-pulse">
                <div style={{background:"linear-gradient(135deg,#3b1a5a,#6b2fa0)",padding:"10px 14px 0",flexShrink:"0",position:"relative"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
                    <div style={{width:"26px",height:"26px",borderRadius:"8px",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="1" width="5" height="5" rx="1.5" fill="#E01E5A" />
                        <rect x="10" y="1" width="5" height="5" rx="1.5" fill="#36C5F0" />
                        <rect x="1" y="10" width="5" height="5" rx="1.5" fill="#2EB67D" />
                        <rect x="10" y="10" width="5" height="5" rx="1.5" fill="#ECB22E" />
                      </svg>
                    </div>
                    <div style={{flex:"1",minWidth:"0",display:"flex",alignItems:"baseline",gap:"6px"}}>
                      <span style={{fontSize:"16px",fontWeight:"700",color:"#fff"}}>
                        Pulse
                      </span>
                      {" "}
                      <span style={{fontSize:"12.5px",color:"rgba(255,255,255,.6)"}} id="pulseBrandLine">
                        The Sleep Company · Koramangala
                      </span>
                    </div>
                    <button onClick={on(function(event){togglePulseNewMsgMenu(event)
})} id="pulseCreateBtn" title="New message" style={{width:"30px",height:"30px",borderRadius:"50%",background:"#fff",border:"none",boxShadow:"0 2px 8px rgba(0,0,0,.28)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                      <i className="ti ti-plus" style={{fontSize:"16px",color:"#3b1a5a",fontWeight:"700"}} />
                    </button>
                    <div id="pulseNewMsgMenu" style={{display:"none",position:"absolute",top:"44px",right:"14px",background:"#fff",borderRadius:"12px",boxShadow:"0 10px 28px rgba(0,0,0,.22)",minWidth:"190px",overflow:"hidden",zIndex:"400"}}>
                      <div style={{padding:"9px 14px 5px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px"}}>
                        New message
                      </div>
                      <div onClick={on(function(event){closePulseNewMsgMenu();openPulseChat('Sunita Rao','SR','DM','manager')
})} style={{padding:"10px 14px",fontSize:"14px",fontWeight:"600",color:"#1a1a1a",cursor:"pointer",display:"flex",alignItems:"center",gap:"9px"}}>
                        <span style={{width:"22px",height:"22px",borderRadius:"50%",background:"#FFD700",color:"#3a2a00",fontSize:"12.5px",fontWeight:"800",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          SR
                        </span>
                        Sunita Rao
                      </div>
                      <div onClick={on(function(event){closePulseNewMsgMenu();openPulseChat('Priya Krishnan','PK','DM','peer')
})} style={{padding:"10px 14px",fontSize:"14px",fontWeight:"600",color:"#1a1a1a",cursor:"pointer",display:"flex",alignItems:"center",gap:"9px"}}>
                        <span style={{width:"22px",height:"22px",borderRadius:"50%",background:"#fdecec",color:"#c23331",fontSize:"12.5px",fontWeight:"800",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          PK
                        </span>
                        Priya Krishnan
                      </div>
                      <div onClick={on(function(event){closePulseNewMsgMenu();openPulseChat('Raju Kumar','RK','DM','peer')
})} style={{padding:"10px 14px",fontSize:"14px",fontWeight:"600",color:"#1a1a1a",cursor:"pointer",display:"flex",alignItems:"center",gap:"9px"}}>
                        <span style={{width:"22px",height:"22px",borderRadius:"50%",background:"#e1f5ee",color:"#0f6e56",fontSize:"12.5px",fontWeight:"800",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          RK
                        </span>
                        Raju Kumar
                      </div>
                    </div>
                  </div>
                </div>
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
                <div id="pulseCustomerListOverlay" style={{position:"absolute",inset:"0",background:"#eceef4",zIndex:"325",display:"none",flexDirection:"column"}}>
                  <div style={{background:"linear-gradient(135deg,#0f6e56,#128C7E)",padding:"12px 14px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0"}}>
                    <button onClick={on(function(event){closePulseCustomerList()
})} title="Back" style={{background:"rgba(255,255,255,.18)",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
                      ←
                    </button>
                    <div style={{flex:"1"}}>
                      <div style={{fontSize:"15px",fontWeight:"700",color:"#fff",display:"flex",alignItems:"center",gap:"6px"}}>
                        💬 customer-discussions
                      </div>
                      <div style={{fontSize:"12.5px",color:"#c9f7d8"}}>
                        Relayed via WhatsApp Business · 2 open
                      </div>
                    </div>
                  </div>
                  <div id="ppanel-external" style={{paddingBottom:"80px",flex:"1",overflowY:"auto"}}>
                    <div id="pulseUnansweredBanner" style={{margin:"8px 12px 2px",background:"#fff3cd",border:"1px solid #f3dfa8",borderRadius:"10px",padding:"8px 10px",display:"flex",alignItems:"center",gap:"7px",cursor:"pointer"}} onClick={on(function(event){openPulseCustomerChat('Ali','AL','+91 90000 11122','missedcall')
})}>
                      <i className="ti ti-phone-x" style={{fontSize:"16px",color:"#c8860a"}} />
                      <div style={{flex:"1",fontSize:"12.5px",color:"#7c4a00",fontWeight:"600"}}>
                        1 unanswered call &amp; 1 unreplied chat need attention
                      </div>
                      <i className="ti ti-chevron-right" style={{fontSize:"14.5px",color:"#c8860a"}} />
                    </div>
                    <div style={{padding:"10px 12px 4px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}} id="custConvHeader">
                      Customer Conversations
                    </div>
                    <div className="ios-chat-row" onClick={on(function(event){openPulseCustomerChat('Mukunda','MK','+91 98765 43210','customer')
})}>
                      <div className="ios-av ios-av-teal" style={{fontSize:"16px"}}>
                        MK
                      </div>
                      <div className="ios-cm">
                        <div className="ios-cn" style={{display:"flex",alignItems:"center",gap:"5px"}}>
                          Mukunda{" "}
                          <span style={{fontSize:"12.5px",background:"#dcf8c6",color:"#075e54",padding:"1px 5px",borderRadius:"5px",fontWeight:"700"}}>
                            WA
                          </span>
                        </div>
                        <div className="ios-cp">
                          Quote for Ortho GRID sent · awaiting reply
                        </div>
                      </div>
                      <div className="ios-cr">
                        <span className="ios-ct">
                          2:40pm
                        </span>
                        <span className="ios-cb" style={{background:"#25D366"}}>
                          1
                        </span>
                      </div>
                    </div>
                    <div className="ios-chat-row" onClick={on(function(event){openPulseCustomerChat('Kavitha R.','KR','+91 97654 32109','customer')
})}>
                      <div className="ios-av ios-av-amber" style={{fontSize:"16px"}}>
                        KR
                      </div>
                      <div className="ios-cm">
                        <div className="ios-cn" style={{display:"flex",alignItems:"center",gap:"5px"}}>
                          Kavitha R.{" "}
                          <span style={{fontSize:"12.5px",background:"#dcf8c6",color:"#075e54",padding:"1px 5px",borderRadius:"5px",fontWeight:"700"}}>
                            WA
                          </span>
                        </div>
                        <div className="ios-cp">
                          When can I come see the hybrid mattress?
                        </div>
                      </div>
                      <div className="ios-cr">
                        <span className="ios-ct">
                          11:15am
                        </span>
                        <span className="ios-cb" style={{background:"#25D366"}}>
                          2
                        </span>
                      </div>
                    </div>
                    <div className="ios-chat-row" onClick={on(function(event){openPulseCustomerChat('Ali','AL','+91 90000 11122','missedcall')
})}>
                      <div className="ios-av" style={{background:"#fdeaea",color:"#c0392b",fontSize:"16px"}}>
                        AL
                      </div>
                      <div className="ios-cm">
                        <div className="ios-cn" style={{display:"flex",alignItems:"center",gap:"5px"}}>
                          Ali{" "}
                          <span style={{fontSize:"12.5px",background:"#fdeaea",color:"#c0392b",padding:"1px 5px",borderRadius:"5px",fontWeight:"700"}}>
                            <i className="ti ti-phone-x" style={{fontSize:"12.5px",verticalAlign:"-1px"}} />
                            {" "}Missed
                          </span>
                        </div>
                        <div className="ios-cp" style={{color:"#c0392b"}}>
                          Called 9:40am · not returned yet
                        </div>
                      </div>
                      <button onClick={on(function(event){event.stopPropagation();aSwitch('calls');setTimeout(function(){dialerStartCall('Ali')},80)
})} style={{display:"flex",alignItems:"center",gap:"4px",background:"#0f6e56",color:"#fff",border:"none",borderRadius:"8px",padding:"6px 9px",fontSize:"12.5px",fontWeight:"700",cursor:"pointer",flexShrink:"0"}}>
                        <i className="ti ti-phone" style={{fontSize:"12.5px"}} />
                        Call back
                      </button>
                    </div>
                    <div style={{padding:"10px 14px",fontSize:"12.5px",color:"#8e8e93",textAlign:"center"}} id="custConvFooter">
                      Customer threads managed via WhatsApp Business + On-ground Calling
                    </div>
                  </div>
                </div>
                <div id="pulseKudosListOverlay" style={{position:"absolute",inset:"0",background:"#eceef4",zIndex:"326",display:"none",flexDirection:"column"}}>
                  <div style={{background:"linear-gradient(135deg,#c8860a,#e0a52f)",padding:"12px 14px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0"}}>
                    <button onClick={on(function(event){closePulseKudosList()
})} title="Back" style={{background:"rgba(255,255,255,.18)",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
                      ←
                    </button>
                    <div style={{flex:"1"}}>
                      <div style={{fontSize:"15px",fontWeight:"700",color:"#fff",display:"flex",alignItems:"center",gap:"6px"}}>
                        🏆 kudos
                      </div>
                      <div style={{fontSize:"12.5px",color:"#fdf0d5"}}>
                        Team recognition, sent by your leaders
                      </div>
                    </div>
                  </div>
                  <div id="ppanel-kudos" style={{paddingBottom:"80px",flex:"1",overflowY:"auto"}}>
                    <div style={{margin:"8px 12px 4px",padding:"7px 10px",background:"#fff3e0",borderRadius:"8px",display:"flex",alignItems:"center",gap:"7px"}}>
                      <i className="ti ti-info-circle" style={{fontSize:"14.5px",color:"#c8860a"}} />
                      {" "}
                      <span style={{fontSize:"12.5px",color:"#854d0e",fontWeight:"500"}}>
                        You receive kudos — leaders send them to celebrate your wins 🎉
                      </span>
                    </div>
                    <div style={{padding:"8px 12px 4px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}}>
                      📥 Incoming Kudos
                    </div>
                    <div style={{margin:"0 12px 8px",background:"linear-gradient(135deg,#fff8e1,#fff)",borderRadius:"14px",padding:"12px 14px",border:"1.5px solid #FFD700",boxShadow:"0 3px 10px rgba(255,215,0,.2)"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
                        <div style={{width:"38px",height:"38px",borderRadius:"50%",background:"#faeeda",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14.5px",fontWeight:"700",color:"#854f0b",flexShrink:"0"}}>
                          SR
                        </div>
                        <div style={{flex:"1"}}>
                          <div style={{fontSize:"13.5px",fontWeight:"700",color:"#1a1a1a"}}>
                            Sunita Rao (Manager)
                          </div>
                          <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                            12:40pm · Today
                          </div>
                        </div>
                        <div style={{fontSize:"22px"}}>
                          🏆
                        </div>
                      </div>
                      <div style={{fontSize:"13.5px",color:"#1a1a1a",lineHeight:"1.5",background:"#fffbf0",borderRadius:"8px",padding:"8px 10px"}}>
                        "Great work with Mukunda — closed that warranty objection beautifully. Keep it up!"
                      </div>
                    </div>
                    <div style={{margin:"0 12px 8px",background:"linear-gradient(135deg,#fef3f2,#fff)",borderRadius:"14px",padding:"12px 14px",border:"1.5px solid #fca5a5",boxShadow:"0 2px 8px rgba(226,75,74,.1)"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
                        <div style={{width:"38px",height:"38px",borderRadius:"50%",background:"#e1f5ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14.5px",fontWeight:"700",color:"#0f6e56",flexShrink:"0"}}>
                          RK
                        </div>
                        <div style={{flex:"1"}}>
                          <div style={{fontSize:"13.5px",fontWeight:"700",color:"#1a1a1a"}}>
                            Raju Kumar
                          </div>
                          <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                            Yesterday
                          </div>
                        </div>
                        <div style={{fontSize:"22px"}}>
                          🔥
                        </div>
                      </div>
                      <div style={{fontSize:"13.5px",color:"#1a1a1a",lineHeight:"1.5",background:"#fff9f9",borderRadius:"8px",padding:"8px 10px"}}>
                        "Nice cross-sell on the Tranquo chair! Impressed by how you read the customer."
                      </div>
                    </div>
                    <div style={{margin:"0 12px 8px",background:"linear-gradient(135deg,#f0fdf4,#fff)",borderRadius:"14px",padding:"12px 14px",border:"1.5px solid #86efac",boxShadow:"0 2px 8px rgba(29,158,117,.08)"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
                        <div style={{width:"38px",height:"38px",borderRadius:"50%",background:"#faeeda",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14.5px",fontWeight:"700",color:"#854f0b",flexShrink:"0"}}>
                          SR
                        </div>
                        <div style={{flex:"1"}}>
                          <div style={{fontSize:"13.5px",fontWeight:"700",color:"#1a1a1a"}}>
                            Sunita Rao (Manager)
                          </div>
                          <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                            2 days ago
                          </div>
                        </div>
                        <div style={{fontSize:"22px"}}>
                          💪
                        </div>
                      </div>
                      <div style={{fontSize:"13.5px",color:"#1a1a1a",lineHeight:"1.5",background:"#f7fffe",borderRadius:"8px",padding:"8px 10px"}}>
                        "Top SOP score this week — 72/100 on Mukunda's conversation. Store leader!"
                      </div>
                    </div>
                    <div style={{padding:"10px 12px",fontSize:"12.5px",color:"#8e8e93",textAlign:"center"}}>
                      Your all-time kudos:{" "}
                      <b style={{color:"#1d9e75"}}>
                        12
                      </b>
                      {" "}🎉
                    </div>
                  </div>
                </div>
              </div>
              <div id="notificationOverlay" style={{position:"absolute",inset:"0",background:"#f7f7f9",zIndex:"320",display:"none",flexDirection:"column"}}>
                <div style={{background:"#fff",borderBottom:"1px solid #e5e5ea",padding:"14px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0",boxShadow:"0 1px 3px rgba(0,0,0,.04)"}}>
                  <button onClick={on(function(event){closeNotificationOverlay()
})} title="Back" style={{background:"#f0f0f3",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#45454d",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
                    ←
                  </button>
                  <div style={{flex:"1"}}>
                    <div style={{fontSize:"16px",fontWeight:"800",color:"#1a1a1a"}}>
                      Notifications
                    </div>
                    <div style={{fontSize:"12px",color:"#8e8e93"}} id="notifHeaderSub">
                      —{" "}
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",background:"#f2f2f7",margin:"10px 12px 0",borderRadius:"9px",padding:"2px"}} id="notifFilterRow">
                  <button onClick={on(function(event){notifSetFilter('all',this)
})} className="notif-filter-btn active" style={{flex:"1",padding:"6px 11px",borderRadius:"7px",fontSize:"12.5px",fontWeight:"700",border:"none",cursor:"pointer",background:"#fff",color:"#1a1a1a"}}>
                    All
                  </button>
                  {" "}
                  <button onClick={on(function(event){notifSetFilter('action',this)
})} className="notif-filter-btn" style={{flex:"1",padding:"6px 11px",borderRadius:"7px",fontSize:"12.5px",fontWeight:"700",border:"none",cursor:"pointer",background:"none",color:"#8e8e93"}}>
                    Needs action
                  </button>
                  {" "}
                  <button onClick={on(function(event){notifSetFilter('alert',this)
})} className="notif-filter-btn" style={{flex:"1",padding:"6px 11px",borderRadius:"7px",fontSize:"12.5px",fontWeight:"700",border:"none",cursor:"pointer",background:"none",color:"#8e8e93"}}>
                    Alerts
                  </button>
                </div>
                <div style={{flex:"1",overflowY:"auto",padding:"12px"}} id="notifListBody" />
              </div>
              <div id="pulseChatOverlay" style={{position:"absolute",inset:"0",background:"#fff",zIndex:"300",display:"none",flexDirection:"column"}}>
                <div style={{background:"#3b1a5a",padding:"12px 14px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0"}}>
                  <button onClick={on(function(event){closePulseChat()
})} title="Back" style={{background:"rgba(255,255,255,.18)",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
                    ←
                  </button>
                  <div id="pchatTitle" style={{fontSize:"15px",fontWeight:"700",color:"#fff",flex:"1"}}>
                    #callcentre-team
                  </div>
                  <button onClick={on(function(event){avaniOpenSearchStaff()
})} title="Ask AvaniBot about this channel" style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:"50%",width:"28px",height:"28px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:"0"}}>
                    <i className="ti ti-sparkles" style={{fontSize:"14.5px",color:"#fff"}} />
                  </button>
                </div>
                <div style={{flex:"1",overflowY:"auto",padding:"12px 14px",background:"#f9f9f9"}} id="pchatBody" />
                <div style={{background:"#fff",borderTop:"0.5px solid #e5e5ea",padding:"8px 10px",flexShrink:"0"}}>
                  <div style={{display:"flex",gap:"8px",alignItems:"flex-end"}}>
                    <div style={{flex:"1",background:"#f2f2f7",borderRadius:"20px",padding:"8px 12px",minHeight:"36px",display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:"13.5px",color:"#8e8e93"}} id="pchatInput" suppressContentEditableWarning contentEditable="true">
                        Message #callcentre-team…
                      </span>
                    </div>
                    <button onClick={on(function(event){togglePulseEmoji()
})} style={{width:"32px",height:"32px",borderRadius:"50%",background:"#f2f2f7",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:"0",fontSize:"17px"}}>
                      😊
                    </button>
                    {" "}
                    <button onClick={on(function(event){sendPulseMsg()
})} style={{width:"32px",height:"32px",borderRadius:"50%",background:"#1d9e75",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:"0"}}>
                      <i className="ti ti-send" style={{fontSize:"15px",color:"#fff"}} />
                    </button>
                  </div>
                  <div id="pulseEmojiPicker" style={{display:"none",padding:"8px 0 0",flexWrap:"wrap",gap:"4px"}}>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",padding:"4px 2px"}}>
                      <span onClick={on(function(event){insertEmoji('👍')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        👍
                      </span>
                      {" "}
                      <span onClick={on(function(event){insertEmoji('🙌')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        🙌
                      </span>
                      {" "}
                      <span onClick={on(function(event){insertEmoji('🔥')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        🔥
                      </span>
                      {" "}
                      <span onClick={on(function(event){insertEmoji('💪')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        💪
                      </span>
                      {" "}
                      <span onClick={on(function(event){insertEmoji('🏆')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        🏆
                      </span>
                      {" "}
                      <span onClick={on(function(event){insertEmoji('😊')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        😊
                      </span>
                      {" "}
                      <span onClick={on(function(event){insertEmoji('✅')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        ✅
                      </span>
                      {" "}
                      <span onClick={on(function(event){insertEmoji('❤️')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        ❤️
                      </span>
                      {" "}
                      <span onClick={on(function(event){insertEmoji('🎉')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        🎉
                      </span>
                      {" "}
                      <span onClick={on(function(event){insertEmoji('📢')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        📢
                      </span>
                      {" "}
                      <span onClick={on(function(event){insertEmoji('💡')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        💡
                      </span>
                      {" "}
                      <span onClick={on(function(event){insertEmoji('🛏️')
})} style={{fontSize:"20px",cursor:"pointer"}}>
                        🛏️
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div id="avaniSearchOverlayStaff" style={{position:"absolute",inset:"0",background:"#fff",zIndex:"305",display:"none",flexDirection:"column"}}>
                <div style={{background:"#3b1a5a",padding:"12px 14px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0"}}>
                  <button onClick={on(function(event){closeAvaniSearchStaff()
})} title="Back" style={{background:"rgba(255,255,255,.18)",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
                    ←
                  </button>
                  <div style={{flex:"1"}}>
                    <div style={{fontSize:"15px",fontWeight:"700",color:"#fff",display:"flex",alignItems:"center",gap:"6px"}}>
                      ✨ AvaniBot
                    </div>
                    <div style={{fontSize:"13px",color:"#c9b6ea"}} id="avaniSearchSubStaff">
                      Searching in #callcentre-team
                    </div>
                  </div>
                </div>
                <div style={{padding:"10px 14px",borderBottom:"1px solid #e5e5ea",flexShrink:"0",background:"#fafafc"}}>
                  <div style={{display:"flex",gap:"8px",alignItems:"center",background:"#fff",border:"1.5px solid #e5e5ea",borderRadius:"20px",padding:"7px 12px"}}>
                    <i className="ti ti-search" style={{fontSize:"15px",color:"#8e8e93"}} />
                    {" "}
                    <input id="avaniSearchInputStaff" placeholder="Ask a question about this channel…" style={{flex:"1",border:"none",background:"none",outline:"none",fontSize:"14px"}} onKeyDown={on(function(event){if(event.key==='Enter')avaniRunSearchStaff()
})} />
                  </div>
                  <button onClick={on(function(event){avaniRunSearchStaff()
})} style={{marginTop:"8px",width:"100%",padding:"9px",border:"none",borderRadius:"9px",background:"#7c3aed",color:"#fff",fontSize:"14px",fontWeight:"700",cursor:"pointer"}}>
                    Ask AvaniBot
                  </button>
                </div>
                <div id="avaniSearchResultsStaff" style={{flex:"1",overflowY:"auto",padding:"14px",background:"#fafafc"}} />
              </div>
              <div id="pulseCustomerChatOverlay" style={{position:"absolute",inset:"0",background:"#e9edf1",zIndex:"310",display:"none",flexDirection:"column"}}>
                <div style={{background:"#075e54",padding:"10px 12px",display:"flex",alignItems:"center",gap:"9px",flexShrink:"0",boxShadow:"0 2px 8px rgba(0,0,0,.15)"}}>
                  <button onClick={on(function(event){closePulseCustomerChat()
})} title="Back" style={{background:"rgba(255,255,255,.18)",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
                    ←
                  </button>
                  <div id="pccAvatar" style={{width:"32px",height:"32px",borderRadius:"50%",background:"#0f6e56",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13.5px",fontWeight:"700",flexShrink:"0"}}>
                    MK
                  </div>
                  <div style={{flex:"1",minWidth:"0"}}>
                    <div id="pccName" style={{fontSize:"14.5px",fontWeight:"700",color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                      Mukunda
                    </div>
                    <div id="pccSub" style={{fontSize:"12.5px",color:"rgba(255,255,255,.65)"}}>
                      +91 98765 43210 · Hot Lead
                    </div>
                  </div>
                  <button onClick={on(function(event){pulseStartCall()
})} style={{background:"rgba(255,255,255,.15)",border:"none",width:"30px",height:"30px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                    <i className="ti ti-phone" style={{color:"#fff",fontSize:"15px"}} />
                  </button>
                  {" "}
                  <button onClick={on(function(event){openPulseTagSheet()
})} style={{background:"rgba(255,255,255,.15)",border:"none",width:"30px",height:"30px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                    <i className="ti ti-user-plus" style={{color:"#fff",fontSize:"15px"}} />
                  </button>
                </div>
                <div id="pccUnansweredStrip" style={{display:"none",background:"#fff3cd",padding:"6px 12px",fontSize:"13px",color:"#7c4a00",fontWeight:"600",textAlign:"center",borderBottom:"1px solid #f3dfa8"}}>
                  <i className="ti ti-phone-x" style={{fontSize:"13.5px",verticalAlign:"-1px",marginRight:"3px"}} />
                  Missed this call — call back or reply to keep SLA{" "}
                </div>
                <div id="pccMessages" style={{flex:"1",overflowY:"auto",padding:"12px 14px",background:"#e9edf1",backgroundImage:"radial-gradient(#d7dee3 1px,transparent 1px)",backgroundSize:"14px 14px"}} />
                <div style={{background:"#fff",borderTop:"0.5px solid #e5e5ea",flexShrink:"0"}}>
                  <div style={{display:"flex",padding:"6px 10px 0",gap:"6px"}}>
                    <div id="pccChanWa" onClick={on(function(event){pulseSetChannel('wa')
})} style={{flex:"1",textAlign:"center",padding:"6px 0",borderRadius:"8px 8px 0 0",fontSize:"12.5px",fontWeight:"700",color:"#0f6e56",background:"#dcf8c6",cursor:"pointer"}}>
                      💬 WhatsApp
                    </div>
                    <div id="pccChanCall" onClick={on(function(event){pulseSetChannel('call')
})} style={{flex:"1",textAlign:"center",padding:"6px 0",borderRadius:"8px 8px 0 0",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",background:"#f2f2f7",cursor:"pointer"}}>
                      📞 Voice Call
                    </div>
                  </div>
                  <div id="pccComposeWa" style={{padding:"8px 10px 10px",display:"flex",gap:"8px",alignItems:"flex-end"}}>
                    <div style={{flex:"1",background:"#f2f2f7",borderRadius:"20px",padding:"8px 12px",minHeight:"36px",display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:"13.5px",color:"#8e8e93"}} id="pccInput" suppressContentEditableWarning contentEditable="true">
                        Message on WhatsApp…
                      </span>
                    </div>
                    <button onClick={on(function(event){sendPulseCustomerMsg()
})} style={{width:"34px",height:"34px",borderRadius:"50%",background:"#1d9e75",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:"0"}}>
                      <i className="ti ti-send" style={{fontSize:"15px",color:"#fff"}} />
                    </button>
                  </div>
                  <div id="pccComposeCall" style={{display:"none",padding:"10px 14px 14px",textAlign:"center"}}>
                    <div style={{fontSize:"13px",color:"#8e8e93",marginBottom:"8px"}}>
                      Switch to voice — this logs as an on-ground call on this lead
                    </div>
                    <button onClick={on(function(event){pulseStartCall()
})} style={{border:"none",borderRadius:"100px",padding:"10px 22px",fontSize:"14px",fontWeight:"700",color:"#fff",background:"#1d9e75",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"6px"}}>
                      <i className="ti ti-phone-call" />
                      Start On-ground Call
                    </button>
                  </div>
                </div>
              </div>
              <div className="ios-overlay" id="pulseTagOverlay">
                <div className="ios-sheet" style={{position:"relative"}}>
                  <div className="ios-sheet-handle" />
                  <button className="sheet-close-btn" onClick={on(function(event){closePulseTagSheet()
})}>
                    ✕
                  </button>
                  <div className="ios-sheet-inner">
                    <div className="ios-sheet-title">
                      Tag or forward
                    </div>
                    <div className="ios-sheet-sub" style={{marginBottom:"12px"}}>
                      Loop in a teammate or your manager on this chat
                    </div>
                    <div id="pulseTagList">
                      <div className="pulse-tag-opt" data-name="Sunita Rao" onClick={on(function(event){togglePulseTagPerson(this)
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 10px",border:"1.5px solid #e5e5ea",borderRadius:"11px",marginBottom:"7px",cursor:"pointer"}}>
                        <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"#faeeda",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12.5px",fontWeight:"700",color:"#854f0b",flexShrink:"0"}}>
                          SR
                        </div>
                        <div style={{flex:"1"}}>
                          <div style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                            Sunita Rao
                          </div>
                          <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                            Store Manager
                          </div>
                        </div>
                        <i className="ti ti-circle-check" style={{fontSize:"16px",color:"#c0c0c0"}} />
                      </div>
                      <div className="pulse-tag-opt" data-name="Priya Krishnan" onClick={on(function(event){togglePulseTagPerson(this)
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 10px",border:"1.5px solid #e5e5ea",borderRadius:"11px",marginBottom:"7px",cursor:"pointer"}}>
                        <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"#e1f5ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12.5px",fontWeight:"700",color:"#0f6e56",flexShrink:"0"}}>
                          PK
                        </div>
                        <div style={{flex:"1"}}>
                          <div style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                            Priya Krishnan
                          </div>
                          <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                            Sales Associate
                          </div>
                        </div>
                        <i className="ti ti-circle-check" style={{fontSize:"16px",color:"#c0c0c0"}} />
                      </div>
                      <div className="pulse-tag-opt" data-name="Raju Kumar" onClick={on(function(event){togglePulseTagPerson(this)
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 10px",border:"1.5px solid #e5e5ea",borderRadius:"11px",marginBottom:"2px",cursor:"pointer"}}>
                        <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"#e5f1fb",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12.5px",fontWeight:"700",color:"#1a56a0",flexShrink:"0"}}>
                          RK
                        </div>
                        <div style={{flex:"1"}}>
                          <div style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                            Raju Kumar
                          </div>
                          <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                            Sales Associate
                          </div>
                        </div>
                        <i className="ti ti-circle-check" style={{fontSize:"16px",color:"#c0c0c0"}} />
                      </div>
                    </div>
                    <div className="ios-btn-row" style={{marginTop:"12px"}}>
                      <button className="ios-btn-secondary" onClick={on(function(event){pulseTagAction('tag')
})}>
                        Tag in Chat
                      </button>
                      {" "}
                      <button onClick={on(function(event){pulseTagAction('forward')
})} style={{flex:"1",padding:"13px",border:"none",borderRadius:"100px",fontSize:"14.5px",color:"#fff",background:"#1d9e75",cursor:"pointer",fontWeight:"600"}}>
                        Forward Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {" "}
              <div className="sc active" id="asc-dash">
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
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",margin:"10px 12px 0",alignItems:"start"}}>
                  <div style={{display:"flex",flexDirection:"column",gap:"10px",minWidth:"0"}}>
                    <div className="prog-banner" style={{margin:"0"}}>
                      <div className="prog-eyebrow">
                        <span className="dot" />
                        My Progress · today
                      </div>
                      <div className="prog-grid" id="progGrid" style={{gridTemplateColumns:"repeat(2,1fr)"}}>
                        <div className="prog-metric" style={{cursor:"default"}}>
                          <div className="prog-val">
                            3
                          </div>
                          <div className="prog-delta warn">
                            ▲ +1
                          </div>
                          <div className="prog-lbl">
                            Leads Created
                          </div>
                        </div>
                        <div className="prog-metric" style={{cursor:"default"}}>
                          <div className="prog-val">
                            2
                          </div>
                          <div className="prog-delta good">
                            ▲ +2
                          </div>
                          <div className="prog-lbl">
                            Leads Called
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{margin:"4px 2px 0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}}>
                        Who's waiting
                      </span>
                      {" "}
                      <span onClick={on(function(event){aSwitch('calls')
})} style={{fontSize:"12.5px",fontWeight:"700",color:"#0f6e56",cursor:"pointer"}}>
                        Open planner →
                      </span>
                    </div>
                    <div id="dashQueueDetail" style={{margin:"0"}} />
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:"10px",minWidth:"0"}}>
                    <div id="hcEarn" style={{margin:"0",background:"#fff",border:"1px solid #ececef",borderRadius:"16px",padding:"12px 14px",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
                      <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:"8px"}}>
                        <div style={{fontSize:"13.5px",fontWeight:"800",color:"#1a1a1a"}}>
                          💰 My earnings this month
                        </div>
                        <div style={{fontSize:"12.5px",color:"#6b7280"}}>
                          ₹800 to ₹6,000 slab
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"baseline",gap:"8px",marginTop:"4px"}}>
                        <div style={{fontSize:"26px",fontWeight:"800",color:"#0f6e56",lineHeight:"1.1"}}>
                          ₹5,200
                        </div>
                        <div style={{fontSize:"13px",color:"#6b7280"}}>
                          ₹1,700 from coached moves
                        </div>
                      </div>
                      <div style={{height:"7px",background:"#eef0f2",borderRadius:"4px",overflow:"hidden",marginTop:"8px"}}>
                        <div style={{width:"87%",height:"100%",background:"linear-gradient(90deg,#1d9e75,#5dcaa5)"}} />
                      </div>
                    </div>
                    <div id="hcMyTasks" style={{background:"linear-gradient(135deg,#3b2304,#92400e)",borderRadius:"16px",padding:"11px 12px",boxShadow:"0 4px 14px rgba(146,64,14,.25)"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
                        <i className="ti ti-checklist" style={{fontSize:"17px",color:"#fcd34d"}} />
                        <div style={{fontSize:"15px",fontWeight:"800",color:"#fff"}}>
                          My Tasks
                        </div>
                        <span id="taskCountBadge" style={{background:"#ef4444",color:"#fff",fontSize:"12.5px",fontWeight:"800",padding:"1px 8px",borderRadius:"10px"}}>
                          3
                        </span>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                        <div data-tid="w1" onClick={on(function(event){hcStaffTask('Call Centre Team','Confirm the 4:30pm callback')
})} style={{background:"#fff",borderRadius:"11px",padding:"8px 10px",display:"flex",alignItems:"center",gap:"9px",cursor:"pointer"}}>
                          <div style={{width:"26px",height:"26px",borderRadius:"8px",background:"#e0f2fe",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                            <i className="ti ti-phone-call" style={{fontSize:"15px",color:"#0369a1"}} />
                          </div>
                          <div style={{flex:"1",minWidth:"0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                            <span style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                              2 callbacks
                            </span>
                            {" "}
                            <span style={{fontSize:"12.5px",color:"#8e8e93"}}>
                              next 4:30pm
                            </span>
                          </div>
                          <i className="ti ti-chevron-right" style={{fontSize:"15px",color:"#c0c0c0"}} />
                        </div>
                        <div data-tid="w2" onClick={on(function(event){hcStaffTask('AvaniBot','Call now or reassign the 2 leads')
})} style={{background:"#fff",borderRadius:"11px",padding:"8px 10px",display:"flex",alignItems:"center",gap:"9px",cursor:"pointer"}}>
                          <div style={{width:"26px",height:"26px",borderRadius:"8px",background:"#f1ecff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                            <i className="ti ti-users" style={{fontSize:"15px",color:"#7c3aed"}} />
                          </div>
                          <div style={{flex:"1",minWidth:"0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                            <span style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                              2 hot leads
                            </span>
                            {" "}
                            <span style={{fontSize:"12.5px",color:"#8e8e93"}}>
                              untouched 24h
                            </span>
                          </div>
                          <i className="ti ti-chevron-right" style={{fontSize:"15px",color:"#c0c0c0"}} />
                        </div>
                        <div data-tid="w3" onClick={on(function(event){hcStaffTask('AvaniBot','Log the outcome of this morning\'s call')
})} style={{background:"#fff",borderRadius:"11px",padding:"8px 10px",display:"flex",alignItems:"center",gap:"9px",cursor:"pointer"}}>
                          <div style={{width:"26px",height:"26px",borderRadius:"8px",background:"#fef3c7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                            <i className="ti ti-notes" style={{fontSize:"15px",color:"#b45309"}} />
                          </div>
                          <div style={{flex:"1",minWidth:"0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                            <span style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                              1 outcome
                            </span>
                            {" "}
                            <span style={{fontSize:"12.5px",color:"#8e8e93"}}>
                              to log
                            </span>
                          </div>
                          <i className="ti ti-chevron-right" style={{fontSize:"15px",color:"#c0c0c0"}} />
                        </div>
                      </div>
                      <span id="taskLeadsSLA" style={{display:"none"}} />
                    </div>
                  </div>
                </div>
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
            </div>
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
            {" "}
            <div className="ios-overlay" id="leadsOverlay" style={{alignItems:"center",justifyContent:"center"}}>
              <div style={{background:"#fff",borderRadius:"20px",width:"94%",maxWidth:"420px",maxHeight:"82vh",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 20px 60px rgba(0,0,0,.35)"}}>
                <div style={{background:"linear-gradient(135deg,#3b1254,#6b2fa0)",padding:"14px 16px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0"}}>
                  <i className="ti ti-users" style={{fontSize:"19px",color:"#c084fc"}} />
                  <div style={{flex:"1"}}>
                    <div style={{fontSize:"16.5px",fontWeight:"700",color:"#fff"}}>
                      Leads
                    </div>
                    <div style={{fontSize:"13.5px",color:"rgba(255,255,255,.7)"}} id="leadsModalSub">
                      Your allocated leads · SLA to close
                    </div>
                  </div>
                  <button onClick={on(function(event){closeLeadsModal()
})} title="Close" style={{background:"rgba(255,255,255,.16)",border:"none",borderRadius:"50%",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
                    ✕
                  </button>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"9px 14px",borderBottom:"1px solid #f0f0f0",flexShrink:"0",background:"#fafafc"}}>
                  <button onClick={on(function(event){leadsModalNav(-1)
})} id="leadsPrevBtn" style={{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid #e5e5ea",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16.5px",color:"#3b1254",flexShrink:"0"}}>
                    ‹
                  </button>
                  <div style={{flex:"1",display:"flex",justifyContent:"center",gap:"5px"}} id="leadsPagerDots" />
                  <button onClick={on(function(event){leadsModalNav(1)
})} id="leadsNextBtn" style={{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid #e5e5ea",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16.5px",color:"#3b1254",flexShrink:"0"}}>
                    ›
                  </button>
                </div>
                <div style={{flex:"1",overflowY:"auto",padding:"14px"}} id="leadsModalPage" />
                <div style={{padding:"9px 14px",borderTop:"1px solid #f0f0f0",flexShrink:"0",background:"#fff9f9"}}>
                  <div style={{fontSize:"12.5px",fontWeight:"700",color:"#e24b4a",textTransform:"uppercase",letterSpacing:".5px",display:"flex",alignItems:"center",gap:"5px"}}>
                    <span style={{width:"7px",height:"7px",borderRadius:"50%",background:"#e24b4a"}} />
                    Cumulative Missed: 2{" "}
                    <span style={{fontWeight:"500",color:"#a32d2d",textTransform:"none",letterSpacing:"0"}}>
                      · expired without close, visible to manager
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ios-overlay" id="onGroundSopOverlay" style={{alignItems:"flex-end"}}>
              <div className="sop-check-overlay-card">
                <div className="sop-check-head">
                  <div className="sop-check-head-top">
                    <div className="sop-check-lead-av" id="sopCheckAv">
                      MK
                    </div>
                    <div style={{flex:"1"}}>
                      <div style={{fontSize:"16.5px",fontWeight:"700",color:"#fff"}} id="sopCheckName">
                        Before you call Mukunda
                      </div>
                      <div style={{fontSize:"13px",color:"rgba(255,255,255,.7)"}}>
                        Lead SOP parameters · review, then place the call
                      </div>
                    </div>
                    <button onClick={on(function(event){closeOnGroundSop()
})} title="Close" style={{background:"rgba(255,255,255,.16)",border:"none",borderRadius:"50%",width:"28px",height:"28px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"15px",cursor:"pointer",flexShrink:"0"}}>
                      ✕
                    </button>
                  </div>
                </div>
                <div className="sop-check-body" id="sopCheckBody" />
                <div className="sop-check-footer">
                  <button className="sop-check-proceed-btn" id="sopCheckProceedBtn" onClick={on(function(event){proceedOnGroundCall()
})}>
                    <i className="ti ti-phone-outgoing" />
                    Skip · Place the call
                  </button>
                  <div className="sop-check-skip-note">
                    These are the same Lead SOP checkpoints your manager set — reviewing them takes 10 seconds and keeps the call on-target.
                  </div>
                </div>
              </div>
            </div>
            <div className="ios-overlay" id="statDetailOverlay">
              <div className="ios-sheet" style={{position:"relative"}}>
                <div className="ios-sheet-handle" />
                <button className="sheet-close-btn" onClick={on(function(event){closeStatDetail()
})}>
                  ✕
                </button>
                <div className="ios-sheet-inner" id="statDetailBody" style={{padding:"18px 20px 24px"}} />
              </div>
            </div>
            {" "}
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
            <div className="ios-overlay" id="rankDetailOverlay">
              <div className="ios-sheet" style={{position:"relative"}}>
                <div className="ios-sheet-handle" />
                <button className="sheet-close-btn" onClick={on(function(event){closeRankDetail()
})}>
                  ✕
                </button>
                <div className="ios-sheet-inner" style={{padding:"20px 20px 24px"}}>
                  <div style={{textAlign:"center",marginBottom:"16px"}}>
                    <div style={{fontSize:"12.5px",fontWeight:"800",color:"#5dcaa5",textTransform:"uppercase",letterSpacing:".6px",marginBottom:"6px"}}>
                      Your Rank
                    </div>
                    <div style={{fontSize:"40px",fontWeight:"800",color:"#1a1a1a",lineHeight:"1"}}>
                      #
                      <span id="rankDetailNum">
                        3
                      </span>
                    </div>
                    <div style={{fontSize:"13.5px",color:"#8e8e93",marginTop:"2px"}}>
                      within{" "}
                      <span id="rankDetailStore">
                        RT Nagar
                      </span>
                      {" "}· 6 staff ranked
                    </div>
                  </div>
                  <div style={{background:"#f7f7f5",borderRadius:"12px",padding:"12px 14px",marginBottom:"14px"}}>
                    <div style={{fontSize:"12.5px",color:"#4b4b52",lineHeight:"1.5"}}>
                      Your rank is a weighted blend of the same numbers in{" "}
                      <b>
                        My Progress
                      </b>
                      {" "}above — not just one metric. Here's exactly how it adds up this period.
                    </div>
                  </div>
                  <div id="rankWeightBreakdown" />
                  <div style={{background:"linear-gradient(135deg,#0a1a14,#1d3a2e)",borderRadius:"12px",padding:"12px 14px",marginTop:"6px",color:"#fff"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                      <i className="ti ti-bulb" style={{fontSize:"16px",color:"#FFD700",flexShrink:"0"}} />
                      {" "}
                      <span style={{fontSize:"13px",lineHeight:"1.5"}}>
                        Closing 1 more lead this week would add ~4 points — enough to pass #2.{" "}
                        <b>
                          Leads Called
                        </b>
                        {" "}is your fastest lever right now.
                      </span>
                    </div>
                  </div>
                  <div style={{fontSize:"12.5px",color:"#b5b5bb",textAlign:"center",marginTop:"12px"}}>
                    Weights are store defaults, set by your manager under Settings → Customer Interaction preferences.
                  </div>
                </div>
              </div>
            </div>
            <div className="ios-overlay" id="linkedinPushOverlay">
              <div className="ios-sheet" style={{position:"relative"}}>
                <div className="ios-sheet-handle" />
                <button className="sheet-close-btn" onClick={on(function(event){closeLinkedInPush()
})}>
                  ✕
                </button>
                <div className="ios-sheet-inner" style={{padding:"18px 20px 24px"}} id="linkedinPushBody">
                  <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"13px"}}>
                    <i className="ti ti-brand-linkedin" style={{fontSize:"23px",color:"#0a66c2"}} />
                    <div style={{fontSize:"16.5px",fontWeight:"700",color:"#1a1a1a"}}>
                      Share your OG Score™ milestone
                    </div>
                  </div>
                  <div style={{background:"#f7f7f9",borderRadius:"12px",padding:"14px",fontSize:"15px",color:"#333",lineHeight:"1.65"}}>
                    Hit a new OG Score™ milestone this month —{" "}
                    <b>
                      76 and climbing
                    </b>
                    {" "}🚀 Proud of the growth, especially in closing and handling objections with more confidence. Onward and upward! #Sales #GrowthMindset #OnGroundAI
                  </div>
                  <div style={{fontSize:"13px",color:"#6b6b74",marginTop:"8px"}}>
                    Posts to{" "}
                    <span id="linkedinPushUrl">
                      your LinkedIn profile
                    </span>
                  </div>
                  <button onClick={on(function(event){confirmLinkedInPush()
})} style={{width:"100%",marginTop:"14px",padding:"12px",border:"none",borderRadius:"12px",fontSize:"15.5px",fontWeight:"700",color:"#fff",background:"#0a66c2",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px"}}>
                    <i className="ti ti-brand-linkedin" />
                    Post to LinkedIn
                  </button>
                </div>
              </div>
            </div>
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
                  <div style={{margin:"0 0 10px"}}>
                    <div style={{fontSize:"13.5px",fontWeight:"700",color:"#6b6b74",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"6px"}}>
                      Customer Type
                    </div>
                    <div style={{display:"flex",gap:"8px"}}>
                      <label style={{flex:"1",display:"flex",alignItems:"center",gap:"7px",background:"#f9f9f9",border:"1.5px solid #e5e5ea",borderRadius:"10px",padding:"8px 10px",cursor:"pointer",transition:"border-color .2s"}} id="custFirstLbl">
                        <input type="radio" name="custType" defaultValue="first" style={{accentColor:"#1d9e75",width:"14px",height:"14px"}} onChange={on(function(event){this.closest('label').style.borderColor='#1d9e75';this.closest('label').style.background='#f0faf5';document.getElementById('custRepeatLbl').style.borderColor='#e5e5ea';document.getElementById('custRepeatLbl').style.background='#f9f9f9'
})} />
                        {" "}
                        <span style={{fontSize:"14.5px",color:"#1a1a1a",flex:"1"}}>
                          🆕 First Time
                        </span>
                      </label>
                      {" "}
                      <label style={{flex:"1",display:"flex",alignItems:"center",gap:"7px",background:"#f9f9f9",border:"1.5px solid #e5e5ea",borderRadius:"10px",padding:"8px 10px",cursor:"pointer",transition:"border-color .2s"}} id="custRepeatLbl">
                        <input type="radio" name="custType" defaultValue="repeat" style={{accentColor:"#1d9e75",width:"14px",height:"14px"}} onChange={on(function(event){this.closest('label').style.borderColor='#1d9e75';this.closest('label').style.background='#f0faf5';document.getElementById('custFirstLbl').style.borderColor='#e5e5ea';document.getElementById('custFirstLbl').style.background='#f9f9f9'
})} />
                        {" "}
                        <span style={{fontSize:"14.5px",color:"#1a1a1a",flex:"1"}}>
                          🔁 Repeat Customer
                        </span>
                      </label>
                    </div>
                    <div style={{fontSize:"12.5px",color:"#6b6b74",marginTop:"5px"}}>
                      Not sure? Leave blank — Avani falls back to your manager's repeat-visit window &amp; phone match.
                    </div>
                  </div>
                  <textarea className="ios-textarea" placeholder="Manager notes — e.g. customer was exploring for 3 months, returning next week" />
                  {" "}
                  <div style={{margin:"4px 0 10px"}}>
                    <div style={{fontSize:"13.5px",fontWeight:"700",color:"#6b6b74",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"6px"}}>
                      Quote &amp; ICP
                    </div>
                    <div style={{display:"flex",gap:"8px",marginBottom:"10px"}}>
                      <label style={{flex:"1",display:"flex",alignItems:"center",gap:"7px",background:"#f9f9f9",border:"1.5px solid #e5e5ea",borderRadius:"10px",padding:"8px 10px",cursor:"pointer",transition:"border-color .2s"}} id="quoteYesLbl">
                        <input type="radio" name="quoteReq" defaultValue="yes" style={{accentColor:"#1d9e75",width:"14px",height:"14px"}} onChange={on(function(event){this.closest('label').style.borderColor='#1d9e75';document.getElementById('quoteNoLbl').style.borderColor='#e5e5ea'
})} />
                        {" "}
                        <span style={{fontSize:"14.5px",color:"#1a1a1a",flex:"1"}}>
                          Wants a quote
                        </span>
                        {" "}
                        <i className="ti ti-receipt" style={{fontSize:"15.5px",color:"#1d9e75"}} />
                      </label>
                      {" "}
                      <label style={{flex:"1",display:"flex",alignItems:"center",gap:"7px",background:"#f9f9f9",border:"1.5px solid #e5e5ea",borderRadius:"10px",padding:"8px 10px",cursor:"pointer"}} id="quoteNoLbl">
                        <input type="radio" name="quoteReq" defaultValue="no" defaultChecked style={{accentColor:"#6b6b74",width:"14px",height:"14px"}} />
                        {" "}
                        <span style={{fontSize:"14.5px",color:"#1a1a1a",flex:"1"}}>
                          No quote
                        </span>
                      </label>
                    </div>
                    <div style={{background:"#f9f9f9",borderRadius:"12px",border:"0.5px solid #e5e5ea",padding:"10px 12px"}}>
                      <div className="icp-fold-head" onClick={on(function(event){this.querySelector('.icp-fold-chev').classList.toggle('open');this.nextElementSibling.classList.toggle('open')
})}>
                        <div style={{fontSize:"12.5px",fontWeight:"700",color:"#555",textTransform:"uppercase",letterSpacing:".5px"}}>
                          🎯 ICP Fit — This Lead
                        </div>
                        <i className="ti ti-chevron-right icp-fold-chev" />
                      </div>
                      <div className="icp-fold-body">
                        <div style={{marginBottom:"7px",paddingTop:"8px"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"3px"}}>
                            <span style={{fontSize:"13.5px",color:"#1a1a1a",fontWeight:"500"}}>
                              Budget Fit
                            </span>
                            <span style={{fontSize:"14.5px",fontWeight:"700",color:"#1d9e75"}}>
                              80%
                            </span>
                          </div>
                          <div style={{height:"5px",background:"#e5e5ea",borderRadius:"3px",overflow:"hidden"}}>
                            <div style={{width:"80%",height:"100%",background:"#1d9e75",borderRadius:"3px"}} />
                          </div>
                          <div style={{fontSize:"12.5px",color:"#6b6b74",marginTop:"2px"}}>
                            Matches pricing tier
                          </div>
                        </div>
                        <div style={{marginBottom:"7px"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"3px"}}>
                            <span style={{fontSize:"13.5px",color:"#1a1a1a",fontWeight:"500"}}>
                              Need Match
                            </span>
                            <span style={{fontSize:"14.5px",fontWeight:"700",color:"#c8860a"}}>
                              65%
                            </span>
                          </div>
                          <div style={{height:"5px",background:"#e5e5ea",borderRadius:"3px",overflow:"hidden"}}>
                            <div style={{width:"65%",height:"100%",background:"#c8860a",borderRadius:"3px"}} />
                          </div>
                          <div style={{fontSize:"12.5px",color:"#6b6b74",marginTop:"2px"}}>
                            Pain point partially addressed
                          </div>
                        </div>
                        <div>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"3px"}}>
                            <span style={{fontSize:"13.5px",color:"#1a1a1a",fontWeight:"500"}}>
                              Decision Stage
                            </span>
                            <span style={{fontSize:"14.5px",fontWeight:"700",color:"#7c3aed"}}>
                              55%
                            </span>
                          </div>
                          <div style={{height:"5px",background:"#e5e5ea",borderRadius:"3px",overflow:"hidden"}}>
                            <div style={{width:"55%",height:"100%",background:"#7c3aed",borderRadius:"3px"}} />
                          </div>
                          <div style={{fontSize:"12.5px",color:"#6b6b74",marginTop:"2px"}}>
                            Exploring, not ready to buy
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
            <div className="ios-overlay" id="aWaOverlay">
              <div className="ios-sheet" style={{position:"relative"}}>
                <div className="ios-sheet-handle" />
                <button className="sheet-close-btn" onClick={on(function(event){closeWaSheet()
})}>
                  ✕
                </button>
                <div className="ios-sheet-inner">
                  <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
                    <div style={{width:"44px",height:"44px",borderRadius:"50%",background:"#dcf8c6",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#128C7E">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                    <div>
                      <div className="ios-sheet-title">
                        Send via WhatsApp
                      </div>
                      <div className="ios-sheet-sub">
                        Quote, brochure, or product info
                      </div>
                    </div>
                  </div>
                  <div style={{fontSize:"14.5px",fontWeight:"600",color:"#555",marginBottom:"6px"}}>
                    What to send
                  </div>
                  <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"14px"}}>
                    <div style={{padding:"6px 12px",background:"#e1f5ee",border:"1px solid #1d9e75",borderRadius:"20px",fontSize:"14.5px",color:"#0f6e56",fontWeight:"500",cursor:"pointer"}}>
                      📄 Product Quote
                    </div>
                    <div style={{padding:"6px 12px",background:"#f2f2f7",border:"1px solid #e5e5ea",borderRadius:"20px",fontSize:"14.5px",color:"#555",cursor:"pointer"}}>
                      📋 Brochure PDF
                    </div>
                    <div style={{padding:"6px 12px",background:"#f2f2f7",border:"1px solid #e5e5ea",borderRadius:"20px",fontSize:"14.5px",color:"#555",cursor:"pointer"}}>
                      💳 EMI Options
                    </div>
                    <div style={{padding:"6px 12px",background:"#f2f2f7",border:"1px solid #e5e5ea",borderRadius:"20px",fontSize:"14.5px",color:"#555",cursor:"pointer"}}>
                      🛡️ Warranty Info
                    </div>
                  </div>
                  <div style={{fontSize:"14.5px",fontWeight:"600",color:"#555",marginBottom:"8px"}}>
                    Send to
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 12px",borderRadius:"12px",border:"2px solid #25D366",background:"#f0fff6",marginBottom:"8px",cursor:"pointer"}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <div style={{flex:"1"}}>
                      <div style={{fontSize:"15px",fontWeight:"600",color:"#1a1a1a"}}>
                        Customer's WhatsApp
                      </div>
                      <div style={{fontSize:"13.5px",color:"#6b6b74"}}>
                        Sent from brand WA Business account
                      </div>
                    </div>
                    <div style={{width:"18px",height:"18px",borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                      <i className="ti ti-check" style={{fontSize:"13.5px",color:"#fff"}} />
                    </div>
                  </div>
                  <div style={{marginBottom:"12px"}}>
                    <input className="ios-input" placeholder="+91 98765 43210 (Customer)" style={{width:"100%",fontSize:"15px"}} />
                  </div>
                  <div className="ios-btn-row">
                    <button className="ios-btn-secondary" onClick={on(function(event){closeWaSheet()
})}>
                      Cancel
                    </button>
                    {" "}
                    <button onClick={on(function(event){closeWaSheet()
})} style={{flex:"1",padding:"13px",border:"none",borderRadius:"100px",fontSize:"15.5px",color:"#fff",background:"linear-gradient(135deg,#128C7E,#25D366)",cursor:"pointer",fontWeight:"600",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",boxShadow:"0 2px 10px rgba(37,211,102,.4)"}}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      {" "}Send on WhatsApp{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="settings-panel" id="settingsPanel">
              <div className="settings-header">
                <i className="ti ti-arrow-left" onClick={on(function(event){closeSettings()
})} />
                <span>
                  Settings
                </span>
              </div>
              <div className="settings-section">
                Employee Profile
              </div>
              <div style={{margin:"6px 12px 10px",background:"#fff",borderRadius:"12px",padding:"12px 14px"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 10px"}}>
                  <div>
                    <div style={{fontSize:"11.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"3px"}}>
                      Full Name
                    </div>
                    <input defaultValue="Aditi Sharma" onInput={on(function(event){markSettingsDirty()
})} style={{width:"100%",fontSize:"13.5px",fontWeight:"600",color:"#1a1a1a",background:"#f7f7f9",border:"1px solid #e5e5ea",borderRadius:"9px",padding:"8px 10px",boxSizing:"border-box"}} />
                  </div>
                  <div>
                    <div style={{fontSize:"11.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"3px"}}>
                      Employee ID
                    </div>
                    <input defaultValue="OG-EMP-07734" disabled style={{width:"100%",fontSize:"13.5px",fontWeight:"700",color:"#8e8e93",background:"#eeeef1",border:"1px solid #e0e0e5",borderRadius:"9px",padding:"8px 10px",boxSizing:"border-box",cursor:"not-allowed"}} />
                  </div>
                  <div>
                    <div style={{fontSize:"11.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"3px"}}>
                      Email
                    </div>
                    <input defaultValue="aditi.s@ogretail.in" onInput={on(function(event){markSettingsDirty()
})} style={{width:"100%",fontSize:"13.5px",fontWeight:"600",color:"#1a1a1a",background:"#f7f7f9",border:"1px solid #e5e5ea",borderRadius:"9px",padding:"8px 10px",boxSizing:"border-box"}} />
                  </div>
                  <div>
                    <div style={{fontSize:"11.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"3px"}}>
                      Phone Number
                    </div>
                    <input defaultValue="+91 98450 11223" onInput={on(function(event){markSettingsDirty()
})} style={{width:"100%",fontSize:"13.5px",fontWeight:"600",color:"#1a1a1a",background:"#f7f7f9",border:"1px solid #e5e5ea",borderRadius:"9px",padding:"8px 10px",boxSizing:"border-box"}} />
                  </div>
                </div>
              </div>
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
              {" "}
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
              <div className="settings-section">
                Industry
              </div>
              <div style={{margin:"6px 12px 10px",background:"#fff",borderRadius:"12px",padding:"12px 14px"}}>
                <div id="industryLockNote" style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"10px"}}>
                  <i className="ti ti-lock" style={{fontSize:"13.5px",color:"#8e8e93"}} />
                  <div style={{fontSize:"12.5px",color:"#666",lineHeight:"1.5"}}>
                    Set by your brand's M3 Super Admin in the Manager web app (Settings → General → Brand Vertical). Contact your admin to change this.
                  </div>
                </div>
                <div id="verticalOptRetail" className="vertical-opt selected" onClick={on(function(event){devModeOn && setVertical('retail')
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 12px",border:"1.5px solid #1d9e75",background:"#f0fff6",borderRadius:"12px",cursor:"default",marginBottom:"8px"}}>
                  <div style={{width:"34px",height:"34px",borderRadius:"9px",background:"#e7f9ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:"0"}}>
                    🛏️
                  </div>
                  <div style={{flex:"1"}}>
                    <div style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                      Retail — Premium Brands
                    </div>
                    <div style={{fontSize:"12px",color:"#8e8e93",marginTop:"1px"}}>
                      Mattress / furniture retail — Call Centre Staff
                    </div>
                  </div>
                  <i className="ti ti-circle-check" style={{fontSize:"16px",color:"#1d9e75",flexShrink:"0"}} id="verticalCheckRetail" />
                </div>
                <div id="verticalOptHealth" className="vertical-opt" onClick={on(function(event){devModeOn && setVertical('healthcare')
})} style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 12px",border:"1.5px solid #e5e5ea",background:"#fff",borderRadius:"12px",cursor:"default",opacity:".5"}}>
                  <div style={{width:"34px",height:"34px",borderRadius:"9px",background:"#fdecec",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:"0"}}>
                    🏥
                  </div>
                  <div style={{flex:"1"}}>
                    <div style={{fontSize:"14px",fontWeight:"700",color:"#1a1a1a"}}>
                      Healthcare — Hospital
                    </div>
                    <div style={{fontSize:"12px",color:"#8e8e93",marginTop:"1px"}}>
                      Patient helpline — Helpline Staff
                    </div>
                  </div>
                  <i className="ti ti-circle-check" style={{fontSize:"16px",color:"#c0c0c0",flexShrink:"0"}} id="verticalCheckHealth" />
                </div>
              </div>
              <div className="settings-section">
                OG Score™ on LinkedIn
              </div>
              <div style={{margin:"6px 12px 10px",background:"#fff",borderRadius:"12px",padding:"12px 14px"}}>
                <div style={{fontSize:"13px",color:"#666",lineHeight:"1.5",marginBottom:"10px"}}>
                  Link once — whenever you're ready to announce a milestone, push a ready-made OG Score™ story to LinkedIn in one tap.
                </div>
                <label style={{fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px"}}>
                  LinkedIn Profile URL
                </label>
                {" "}
                <input type="text" id="linkedinUrlInput" placeholder="linkedin.com/in/your-name" style={{width:"100%",border:"1px solid #e0e0e0",borderRadius:"9px",padding:"9px 11px",fontSize:"13.5px",marginTop:"5px",fontFamily:"inherit",boxSizing:"border-box"}} />
                {" "}
                <button onClick={on(function(event){saveLinkedInUrl()
})} id="linkedinSaveBtn" style={{width:"100%",marginTop:"9px",padding:"11px",border:"none",borderRadius:"10px",fontSize:"14px",fontWeight:"700",color:"#fff",background:"#0a66c2",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px"}}>
                  <i className="ti ti-brand-linkedin" />
                  Save &amp; Connect LinkedIn
                </button>
                <div id="linkedinConnectedState" style={{display:"none",marginTop:"10px",background:"#e8f0fe",borderRadius:"10px",padding:"10px 11px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"13px",color:"#0a66c2",fontWeight:"700"}}>
                    <i className="ti ti-circle-check" />
                    <span>
                      Connected ·{" "}
                      <span id="linkedinUrlDisplay" />
                    </span>
                  </div>
                  <button onClick={on(function(event){openLinkedInPush()
})} style={{width:"100%",marginTop:"9px",padding:"10px",border:"none",borderRadius:"9px",fontSize:"13.5px",fontWeight:"700",color:"#fff",background:"#0a66c2",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"}}>
                    <i className="ti ti-share" />
                    Push my OG Score™ to LinkedIn
                  </button>
                </div>
              </div>
              <div id="settingsSaveBar" style={{display:"none",position:"sticky",bottom:"0",left:"0",right:"0",background:"#fff",borderTop:"1px solid #eee",padding:"10px 14px",marginTop:"14px",boxShadow:"0 -4px 12px rgba(0,0,0,.06)"}}>
                <button onClick={on(function(event){saveSettingsChanges()
})} style={{width:"100%",padding:"12px",border:"none",borderRadius:"10px",fontSize:"14.5px",fontWeight:"700",color:"#fff",background:"#1d9e75",cursor:"pointer"}}>
                  Save Changes
                </button>
              </div>
            </div>
            <div className="settings-panel" id="avatarPanel">
              <div className="settings-header">
                <i className="ti ti-arrow-left" onClick={on(function(event){closeAvatarPanel()
})} />
                <span>
                  Avatar
                </span>
              </div>
              <div className="settings-section">
                Your Selling Persona
              </div>
              <div style={{margin:"4px 12px 0",background:"#fff",borderRadius:"12px 12px 0 0",padding:"12px 14px 6px",display:"flex",alignItems:"center",gap:"12px"}}>
                <div id="avatarPreviewBadge" style={{width:"48px",height:"48px",borderRadius:"50%",background:"#5dcaa5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",border:"2px solid #1d9e75",flexShrink:"0"}}>
                  🦸‍♂️
                </div>
                <div>
                  <div style={{fontSize:"14.5px",fontWeight:"600",color:"#1a1a1a"}} id="avatarPreviewName">
                    Captain
                  </div>
                  <div style={{fontSize:"12.5px",color:"#8e8e93",marginTop:"2px"}}>
                    Pick the persona shown on your profile badge
                  </div>
                </div>
              </div>
              <div className="sav-grid">
                <div className="sav-opt selected" onClick={on(function(event){selectSellingAvatar(this,'🦸‍♂️','Captain')
})}>
                  <div className="sav-opt-img" style={{background:"#e6f1fb"}}>
                    🦸‍♂️
                  </div>
                  <div className="sav-opt-label">
                    Captain
                  </div>
                </div>
                <div className="sav-opt" onClick={on(function(event){selectSellingAvatar(this,'🦸‍♀️','Valkyrie')
})}>
                  <div className="sav-opt-img" style={{background:"#fcebeb"}}>
                    🦸‍♀️
                  </div>
                  <div className="sav-opt-label">
                    Valkyrie
                  </div>
                </div>
                <div className="sav-opt" onClick={on(function(event){selectSellingAvatar(this,'🦹‍♀️','Vortex')
})}>
                  <div className="sav-opt-img" style={{background:"#f3e8ff"}}>
                    🦹‍♀️
                  </div>
                  <div className="sav-opt-label">
                    Vortex
                  </div>
                </div>
                <div className="sav-opt" onClick={on(function(event){selectSellingAvatar(this,'🦹‍♂️','Blaze')
})}>
                  <div className="sav-opt-img" style={{background:"#fff3e0"}}>
                    🦹‍♂️
                  </div>
                  <div className="sav-opt-label">
                    Blaze
                  </div>
                </div>
                <div className="sav-opt" onClick={on(function(event){selectSellingAvatar(this,'🥷','Shadow')
})}>
                  <div className="sav-opt-img" style={{background:"#e1f5ee"}}>
                    🥷
                  </div>
                  <div className="sav-opt-label">
                    Shadow
                  </div>
                </div>
              </div>
              <div style={{margin:"16px 12px 0"}}>
                <button onClick={on(function(event){saveAvatarAndClose()
})} style={{width:"100%",padding:"13px",border:"none",borderRadius:"100px",fontSize:"15px",color:"#fff",background:"#1d9e75",cursor:"pointer",fontWeight:"600",boxShadow:"0 2px 8px rgba(29,158,117,.4)"}}>
                  Save Avatar
                </button>
              </div>
            </div>
          </div>
          <div className="ios-overlay" id="noInterestOverlay" style={{alignItems:"flex-end"}}>
            <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",overflow:"hidden"}}>
              <div style={{background:"linear-gradient(135deg,#e24b4a,#a32d2d)",padding:"14px 16px",display:"flex",alignItems:"center",gap:"10px"}}>
                <i className="ti ti-thumb-down" style={{fontSize:"19px",color:"#fff"}} />
                <div style={{flex:"1"}}>
                  <div style={{fontSize:"16.5px",fontWeight:"700",color:"#fff"}}>
                    No Interest
                  </div>
                  <div id="niLeadName" style={{fontSize:"13.5px",color:"rgba(255,255,255,.75)"}}>
                    Lead
                  </div>
                </div>
                <button onClick={on(function(event){closeNoInterestSheet()
})} style={{background:"none",border:"none",color:"#fff",fontSize:"21px",cursor:"pointer"}}>
                  ✕
                </button>
              </div>
              <div style={{padding:"14px 16px 24px"}}>
                <div style={{fontSize:"15px",fontWeight:"600",color:"#555",marginBottom:"8px"}} id="noInterestQ">
                  Why did the customer lose interest?
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"12px"}} id="niReasonList">
                  <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
                    <input type="radio" name="niReason" defaultValue="price" style={{accentColor:"#e24b4a"}} />
                    <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                      Price too high
                    </span>
                  </label>
                  {" "}
                  <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
                    <input type="radio" name="niReason" defaultValue="competitor" style={{accentColor:"#e24b4a"}} />
                    <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                      Went to competitor
                    </span>
                  </label>
                  {" "}
                  <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
                    <input type="radio" name="niReason" defaultValue="not_ready" style={{accentColor:"#e24b4a"}} />
                    <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                      Not ready to buy
                    </span>
                  </label>
                  {" "}
                  <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
                    <input type="radio" name="niReason" defaultValue="other" style={{accentColor:"#e24b4a"}} />
                    <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                      Other
                    </span>
                  </label>
                </div>
                <textarea id="niOtherText" style={{width:"100%",padding:"10px 12px",border:"0.5px solid #e5e5ea",borderRadius:"12px",fontSize:"15px",color:"#333",background:"#f9f9f9",height:"56px",resize:"none",marginBottom:"12px"}} placeholder="Add more detail (optional)…" />
                <div style={{display:"flex",gap:"10px"}}>
                  <button onClick={on(function(event){closeNoInterestSheet()
})} style={{flex:"1",padding:"12px",border:"1.5px solid #e5e5ea",borderRadius:"100px",fontSize:"15.5px",color:"#555",background:"#fff",cursor:"pointer"}}>
                    Cancel
                  </button>
                  {" "}
                  <button onClick={on(function(event){submitNoInterest()
})} style={{flex:"1",padding:"12px",border:"none",borderRadius:"100px",fontSize:"15.5px",color:"#fff",background:"#e24b4a",cursor:"pointer",fontWeight:"600"}}>
                    Confirm No Interest
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="ios-overlay" id="cameBackOverlay" style={{alignItems:"flex-end"}}>
            <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",overflow:"hidden"}}>
              <div style={{background:"linear-gradient(135deg,#0a1a14,#1d9e75)",padding:"14px 16px",display:"flex",alignItems:"center",gap:"10px"}}>
                <i className="ti ti-calendar-check" style={{fontSize:"19px",color:"#fff"}} />
                <div style={{flex:"1"}}>
                  <div style={{fontSize:"16.5px",fontWeight:"700",color:"#fff"}}>
                    Came Back ✓
                  </div>
                  <div id="cbLeadName" style={{fontSize:"13.5px",color:"rgba(255,255,255,.75)"}}>
                    Lead
                  </div>
                </div>
                <button onClick={on(function(event){closeCameBackSheet()
})} style={{background:"none",border:"none",color:"#fff",fontSize:"21px",cursor:"pointer"}}>
                  ✕
                </button>
              </div>
              <div style={{padding:"14px 16px 24px"}}>
                <div style={{fontSize:"15px",fontWeight:"600",color:"#555",marginBottom:"8px"}} id="cameBackQ">
                  When did/will the customer come back?
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"12px"}}>
                  <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
                    <input type="radio" name="cbWhen" defaultValue="today" style={{accentColor:"#1d9e75"}} />
                    <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                      Today (already in store)
                    </span>
                  </label>
                  {" "}
                  <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
                    <input type="radio" name="cbWhen" defaultValue="this_week" style={{accentColor:"#1d9e75"}} />
                    <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                      This week
                    </span>
                  </label>
                  {" "}
                  <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",background:"#f9f9f9",borderRadius:"10px",border:"0.5px solid #e5e5ea",cursor:"pointer"}}>
                    <input type="radio" name="cbWhen" defaultValue="specific" style={{accentColor:"#1d9e75"}} />
                    <span style={{fontSize:"15px",color:"#1a1a1a"}}>
                      Specific date
                    </span>
                  </label>
                </div>
                <input type="date" id="cbDatePicker" style={{width:"100%",padding:"10px 12px",border:"0.5px solid #e5e5ea",borderRadius:"12px",fontSize:"15px",color:"#333",background:"#f9f9f9",marginBottom:"12px"}} />
                {" "}
                <textarea id="cbNotes" style={{width:"100%",padding:"10px 12px",border:"0.5px solid #e5e5ea",borderRadius:"12px",fontSize:"15px",color:"#333",background:"#f9f9f9",height:"56px",resize:"none",marginBottom:"12px"}} placeholder="Any notes about the return visit…" />
                <div style={{display:"flex",gap:"10px"}}>
                  <button onClick={on(function(event){closeCameBackSheet()
})} style={{flex:"1",padding:"12px",border:"1.5px solid #e5e5ea",borderRadius:"100px",fontSize:"15.5px",color:"#555",background:"#fff",cursor:"pointer"}}>
                    Cancel
                  </button>
                  {" "}
                  <button onClick={on(function(event){submitCameBack()
})} style={{flex:"1",padding:"12px",border:"none",borderRadius:"100px",fontSize:"15.5px",color:"#fff",background:"#1d9e75",cursor:"pointer",fontWeight:"600"}}>
                    Confirm Return
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="ios-overlay" id="leadAnalysisOverlay" style={{alignItems:"flex-end"}}>
            <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",overflow:"hidden",maxHeight:"92vh",overflowY:"auto"}}>
              <div style={{width:"36px",height:"4px",background:"#e0e0e0",borderRadius:"2px",margin:"10px auto 0",flexShrink:"0"}} />
              <div style={{padding:"12px 16px 10px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:"0"}}>
                <div>
                  <div style={{fontSize:"17px",fontWeight:"800",color:"#1a1a1a"}}>
                    Lead Analysis
                  </div>
                  <div style={{fontSize:"14.5px",color:"#6b6b74",marginTop:"1px"}}>
                    This Week
                  </div>
                </div>
                <button onClick={on(function(event){closeLeadAnalysisModal()
})} style={{width:"30px",height:"30px",borderRadius:"50%",background:"#f2f2f7",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16.5px",color:"#555",flexShrink:"0"}}>
                  ✕
                </button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",padding:"0 14px 10px"}}>
                <div style={{background:"#e8f0fe",borderRadius:"14px",padding:"14px 12px",display:"flex",alignItems:"center",gap:"10px"}}>
                  <div style={{width:"34px",height:"34px",borderRadius:"10px",background:"#185fa5",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                    <i className="ti ti-user-plus" style={{fontSize:"17px",color:"#fff"}} />
                  </div>
                  <div>
                    <div style={{fontSize:"23px",fontWeight:"800",color:"#185fa5",lineHeight:"1"}}>
                      6
                    </div>
                    <div style={{fontSize:"13.5px",color:"#185fa5",fontWeight:"600",marginTop:"3px"}}>
                      Captured
                    </div>
                  </div>
                </div>
                <div style={{background:"#e1f5ee",borderRadius:"14px",padding:"14px 12px",display:"flex",alignItems:"center",gap:"10px"}}>
                  <div style={{width:"34px",height:"34px",borderRadius:"10px",background:"#1d9e75",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                    <i className="ti ti-chart-line" style={{fontSize:"17px",color:"#fff"}} />
                  </div>
                  <div>
                    <div style={{fontSize:"23px",fontWeight:"800",color:"#1d9e75",lineHeight:"1"}}>
                      17%
                    </div>
                    <div style={{fontSize:"13.5px",color:"#1d9e75",fontWeight:"600",marginTop:"3px"}}>
                      Conversion
                    </div>
                  </div>
                </div>
                <div style={{background:"#fff8e1",borderRadius:"14px",padding:"14px 12px",display:"flex",alignItems:"center",gap:"10px"}}>
                  <div style={{width:"34px",height:"34px",borderRadius:"10px",background:"#c8860a",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                    <i className="ti ti-clock-exclamation" style={{fontSize:"17px",color:"#fff"}} />
                  </div>
                  <div>
                    <div style={{fontSize:"23px",fontWeight:"800",color:"#c8860a",lineHeight:"1"}}>
                      1
                    </div>
                    <div style={{fontSize:"13.5px",color:"#c8860a",fontWeight:"600",marginTop:"3px"}}>
                      Ageing
                    </div>
                  </div>
                </div>
                <div style={{background:"#fdecec",borderRadius:"14px",padding:"14px 12px",display:"flex",alignItems:"center",gap:"10px"}}>
                  <div style={{width:"34px",height:"34px",borderRadius:"10px",background:"#e24b4a",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                    <i className="ti ti-x" style={{fontSize:"17px",color:"#fff"}} />
                  </div>
                  <div>
                    <div style={{fontSize:"23px",fontWeight:"800",color:"#e24b4a",lineHeight:"1"}}>
                      2
                    </div>
                    <div style={{fontSize:"13.5px",color:"#e24b4a",fontWeight:"600",marginTop:"3px"}}>
                      Missed
                    </div>
                  </div>
                </div>
              </div>
              <div style={{padding:"0 14px 12px"}}>
                <div style={{background:"#f9f9f9",borderRadius:"14px",padding:"14px 14px 10px"}}>
                  <div style={{marginBottom:"14px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"6px"}}>
                      <span style={{fontSize:"14.5px",fontWeight:"700",color:"#1a1a1a"}}>
                        Capture rate
                      </span>
                      {" "}
                      <span style={{fontSize:"16.5px",fontWeight:"800",color:"#185fa5"}}>
                        67%
                      </span>
                    </div>
                    <div style={{height:"8px",background:"#e5e5ea",borderRadius:"4px",overflow:"hidden"}}>
                      <div style={{width:"67%",height:"100%",background:"linear-gradient(90deg,#185fa5,#60a5fa)",borderRadius:"4px"}} />
                    </div>
                  </div>
                  <div style={{marginBottom:"14px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"6px"}}>
                      <span style={{fontSize:"14.5px",fontWeight:"700",color:"#1a1a1a"}}>
                        Closed won
                      </span>
                      {" "}
                      <span style={{fontSize:"16.5px",fontWeight:"800",color:"#1d9e75"}}>
                        17%
                      </span>
                    </div>
                    <div style={{height:"8px",background:"#e5e5ea",borderRadius:"4px",overflow:"hidden"}}>
                      <div style={{width:"17%",height:"100%",background:"linear-gradient(90deg,#1d9e75,#5dcaa5)",borderRadius:"4px"}} />
                    </div>
                  </div>
                  <div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"6px"}}>
                      <span style={{fontSize:"14.5px",fontWeight:"700",color:"#1a1a1a"}}>
                        SLA on-time
                      </span>
                      {" "}
                      <span style={{fontSize:"16.5px",fontWeight:"800",color:"#c8860a"}}>
                        50%
                      </span>
                    </div>
                    <div style={{height:"8px",background:"#e5e5ea",borderRadius:"4px",overflow:"hidden"}}>
                      <div style={{width:"50%",height:"100%",background:"linear-gradient(90deg,#c8860a,#fbbf24)",borderRadius:"4px"}} />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{margin:"0 14px 24px",borderRadius:"14px",overflow:"hidden"}}>
                <div style={{background:"linear-gradient(135deg,#0a1a14 0%,#0f6e56 100%)",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"700",textTransform:"uppercase",letterSpacing:".6px",marginBottom:"4px"}}>
                      Pipeline Value
                    </div>
                    <div style={{fontSize:"25px",fontWeight:"800",color:"#fff",lineHeight:"1"}}>
                      ₹1.5L
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:"15px",fontWeight:"700",color:"#fff"}}>
                      3 OF 18 CLOSED
                    </div>
                    <div style={{fontSize:"13.5px",color:"#5dcaa5",marginTop:"3px"}}>
                      avg ₹50K / deal
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p style={{textAlign:"center",fontSize:"12.5px",color:"var(--color-text-secondary,#888)",marginTop:"8px"}}>
        Web — On-Ground.ai Advisor App v9 · Retail
      </p>
    </>
  );
}

export default App;

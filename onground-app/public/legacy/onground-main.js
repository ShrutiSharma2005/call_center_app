

// Pulse tabs
// Pulse now shows Channels + Direct Messages in one unified Slack-style sidebar (no more Customer Discussions/Internal/Channels/DMs/Kudos structure).
// Customer Discussions and Kudos are reached via their own channel-style row, opening as an overlay on top of the sidebar.
function openPulseCustomerList(){ document.getElementById('pulseCustomerListOverlay').style.display = 'flex'; }
function closePulseCustomerList(){ document.getElementById('pulseCustomerListOverlay').style.display = 'none'; }
function openPulseKudosList(){ document.getElementById('pulseKudosListOverlay').style.display = 'flex'; }
function closePulseKudosList(){ document.getElementById('pulseKudosListOverlay').style.display = 'none'; }
// Back-compat shims for any older caller still passing a tab/mode name.
function pulseTabs(tab) {
  if(tab === 'kudos') openPulseKudosList();
  // 'channels' / 'dms' both live in the same always-visible sidebar now — nothing to switch.
}
function pulseExtInt(mode) {
  if(mode === 'external') openPulseCustomerList();
}
// Leads sub-tabs
function leadsSubTab(tab) {
  var _ll=document.getElementById('lpanel-leads');if(_ll)_ll.style.display=(tab==='leads')?'flex':'none';
  var _li=document.getElementById('lpanel-icp');if(_li)_li.style.display=(tab==='icp')?'flex':'none';
  ['leads','icp'].forEach(t=>{
    var el = document.getElementById('ltab-'+t);
    if(el){ el.style.color=(t===tab)?'#1d9e75':'#8e8e93'; el.style.borderBottomColor=(t===tab)?'#1d9e75':'transparent'; }
  });
}
function openWaLeadContact(name, phone) {
  closeLeadsModal();
  document.getElementById('aWaOverlay').classList.add('show');
}
// ---- Internal Pulse chat (channels + DMs) — data-driven so AvaniBot can participate ----
var PULSE_INTERNAL_THREADS = {
  'Call Centre Team': { title:'#callcentre-team', dateLabel:'Today · Call Centre Team', messages:[
      {who:'Sunita Rao', init:'SR', bg:'#faeeda', color:'#854f0b', text:'👥 <b>STAKEHOLDERS:</b> <b style="color:#854f0b">@You (Arvind R.)</b>, whole call centre shift', time:'2:05pm'},
      {who:'Sunita Rao', init:'SR', bg:'#faeeda', color:'#854f0b', text:'📋 <b>ISSUE DEFINITION:</b> Greeting-in-first-10s QA score is at 71% this week, below our 85% target.', time:'2:05pm'},
      {who:'Sunita Rao', init:'SR', bg:'#faeeda', color:'#854f0b', text:'➡️ <b>SUGGESTED RESOLUTION:</b> Let\'s push that up 💪 — open every call with the greeting script. I\'ll check back Friday.', time:'2:05pm'},
      {who:'You', init:'AR', text:'On it! Will make sure I open every call with the greeting script 🙌', time:'2:10pm'},
      {who:'Sunita Rao', init:'SR', bg:'#faeeda', color:'#854f0b', text:'Great attitude Arvind 🌟', time:'2:14pm'}
    ]},
  'All Stores': { title:'#all-stores', dateLabel:'Today · All Stores', messages:[
      {who:'Manager Helper', init:'📢', bg:'#e8f0fe', color:'#1d4ed8', isBot:true, text:'New Ortho Grid campaign live from 1 June — ask customers about the bundled EMI offer!', time:'10:22am'}
    ]},
  'Avani AI Coaching': { title:'#avani-coaching', dateLabel:'Today · Avani AI Coaching', messages:[
      {who:'Avani', init:'✨', bg:'#e1f5ee', color:'#0f6e56', isBot:true, text:'Your average handle time is up 8% this week — try confirming the customer\'s need in your first question instead of after the pitch.', time:'9:01am'}
    ]},
  'Manage Shipment': { title:'#manage-shipment', dateLabel:'Today · Manage Shipment', messages:[
      {who:'Shipping Agent', init:'📦', bg:'#e8f0fe', color:'#185fa5', isBot:true, time:'10:05am',
        card:{icon:'📦', title:'Shipping Notifications', badge:'Ready for delivery ✓',
          fields:[['Model','Ortho Grid Pro, King'],['Tracking','4RS4DDF6549B4'],['Destination','RT Nagar, Bengaluru']],
          actions:[{label:'View details'},{label:'Notify customer', style:'primary'}]}}
    ]},
  'Quotation Tickets': { title:'#quotation-tickets', dateLabel:'Today · Quotation Tickets', messages:[
      {who:'Ticket Desk Agent', init:'🎫', bg:'#fdecec', color:'#e24b4a', isBot:true, time:'9:12am',
        card:{icon:'📝', title:'Quotation approval — Mukunda R.', badge:'Awaiting approval',
          fields:[['Product','Ortho Grid Pro, bundled'],['Value','₹58,000'],['Raised by','You']],
          actions:[{label:'View lead', onclick:"closePulseChat();openLeadsModal()"}]}}
    ]},
  'New Hire Onboarding': { title:'#new-hire-onboarding', dateLabel:'Today · New Hire Onboarding', messages:[
      {who:'Onboarding Agent', init:'👋', bg:'#e1f5ee', color:'#0a7d4f', isBot:true, time:'8:30am',
        card:{icon:'🎉', title:'Welcome to the team!',
          fields:[['SOP training','Starts today, 3:00pm'],['Buddy manager','Sunita Rao']],
          actions:[{label:'Get started', style:'primary', onclick:"closePulseChat();pulseTabs('channels')"}]}}
    ]},
  'Sunita Rao': { title:'Sunita Rao', dateLabel:'Today', messages:[
      {who:'Sunita Rao', init:'SR', bg:'#faeeda', color:'#854f0b', text:'🌟 Great work with Mukunda — keep it up', time:'12:40pm'}
    ]},
  'Priya Krishnan': { title:'Priya Krishnan', dateLabel:'Today', messages:[
      {who:'Priya Krishnan', init:'PK', bg:'#fdecec', color:'#a32d2d', text:'Can you cover my 3pm slot today?', time:'9:55am'}
    ]},
  'Raju Kumar': { title:'Raju Kumar', dateLabel:'Yesterday', messages:[
      {who:'Raju Kumar', init:'RK', bg:'#e1f5ee', color:'#0f6e56', text:'Nice cross-sell on the Tranquo chair! 🔥', time:'Yesterday'}
    ]},
  'AvaniBot': { title:'AvaniBot', dateLabel:'Today', messages:[
      {who:'AvaniBot', init:'✨', bg:'#f1ecff', color:'#7c3aed', isBot:true, text:'Hey! I\'m AvaniBot ✨ Ask me things like <b>"what are my action items from Sunita"</b>, or tap the ✨ icon inside any channel to search just that channel.', time:'9:00am'}
    ]}
};
var pulseChatActive = null;

// ───────────────── Custom Agents (staff-facing) ─────────────────
var STAFF_AGENT_TASKS = {
  skillimprovement: {
    icon:'🎯', title:'Skill Improvement Coach', sub:'Practice & feedback agent',
    gradient:'linear-gradient(135deg,#5b21b6,#7c3aed)',
    desc:'Pick a skill you want to get sharper at — warranty pitch, objection handling, EMI close — and get a model example of what great looks like, a place to practice, and a way to get feedback from your manager or L&D.',
    defaultStakeholders:'Store Manager, L&D, ASM',
    openingQuestion:'👥 <b>STAKEHOLDERS:</b> You, plus your Store Manager and L&D once you share something for feedback.<br><br>📋 <b>ISSUE DEFINITION:</b> I\'m ready whenever you want to get sharper at something — warranty pitch, objection handling, EMI close.<br><br>➡️ <b>SUGGESTED RESOLUTION:</b> Tell me which skill and I\'ll pull a model example, set up a place to practice, and get you feedback.'
  },
  sopcoach: {
    icon:'📋', title:'My SOP Coach', sub:'Personal coaching agent',
    gradient:'linear-gradient(135deg,#1e1b4b,#4338ca)',
    desc:'Every day, finds your weakest SOP step from your own conversations and sends you a ready-to-use line to fix it — a personal coach that never sleeps.',
    defaultStakeholders:'Store Manager, L&D',
    openingQuestion:'👥 <b>STAKEHOLDERS:</b> You, with your Store Manager and L&D looped in if it doesn\'t improve.<br><br>📋 <b>ISSUE DEFINITION:</b> Your weakest step this week is the warranty pitch — mentioned in only 2 of your last 5 conversations.<br><br>➡️ <b>SUGGESTED RESOLUTION:</b> I\'m sending you a ready-to-use script for it now. If it\'s still your weakest step by Friday, I\'ll loop in your Store Manager.'
  },
  kudos: {
    icon:'🏆', title:'Recognition Bot', sub:'Kudos automation agent',
    gradient:'linear-gradient(135deg,#7a4a00,#c8860a)',
    desc:'Flags your wins to your manager automatically — great saves, cross-sells, warranty pitches landed — so recognition happens even on your manager\'s busiest days.',
    defaultStakeholders:'Store Manager',
    openingQuestion:'👥 <b>STAKEHOLDERS:</b> You and Sunita (Store Manager).<br><br>📋 <b>ISSUE DEFINITION:</b> Nice save on that price objection today — that\'s the kind of recovery that keeps a sale alive.<br><br>➡️ <b>SUGGESTED RESOLUTION:</b> Flagging it to Sunita right now so it doesn\'t get lost in her day.'
  }
};
var STAFF_AGENT_ACTIVE = {};
var STAFF_AGENT_STATE = {};
// Staff never "activates" an agent — these are the beneficiaries of whatever M2 has already
// configured in Settings → Custom Agents (destination stakeholders include "Call Centre Staff"),
// so every catalog agent is seeded as already-live and shown as an inherited channel the moment
// the app loads. Tapping a card just opens its channel — no setup gate, no activation button.
function seedStaffAgentsActive(){
  Object.keys(STAFF_AGENT_TASKS).forEach(function(key){
    if(STAFF_AGENT_ACTIVE[key]) return;
    var t = STAFF_AGENT_TASKS[key];
    STAFF_AGENT_ACTIVE[key] = true;
    var channelName = t.title;
    if(!PULSE_INTERNAL_THREADS[channelName]){
      PULSE_INTERNAL_THREADS[channelName] = {title:'#'+agentTitleToChannelSlug(t.title), dateLabel:'Today · '+t.title, messages:[
        {who:t.title, init:t.icon, bg:'#f1ecff', color:'#7c3aed', isBot:true, text:t.openingQuestion, time:'Just now'}
      ]};
      if(key === 'skillimprovement'){
        PULSE_INTERNAL_THREADS[channelName].messages.push({who:'You', init:'AR', text:'Warranty pitch — I keep forgetting to bring it up before the customer decides.', time:'Just now'});
        PULSE_INTERNAL_THREADS[channelName].messages.push({who:t.title, init:t.icon, bg:'#f1ecff', color:'#7c3aed', isBot:true, time:'Just now',
          text:'Got it — here\'s what great looks like for a warranty pitch, then a place to practice your own.'
            + '<div style="margin-top:9px;background:#0a1a14;border-radius:10px;padding:10px;position:relative;overflow:hidden">'
              + '<div style="display:flex;align-items:center;gap:9px">'
                + '<div style="width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti ti-player-play" style="font-size:16px;color:#fff"></i></div>'
                + '<div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:700;color:#fff">Warranty pitch — model example</div><div style="font-size:12.5px;color:#9fe1cb">Sameena Sultana · 0:42 · top-rated call</div></div>'
              + '</div>'
            + '</div>'
            + '<div style="display:flex;gap:7px;margin-top:9px">'
              + '<button onclick="staffAgentStartPractice(\''+key+'\')" style="flex:1;padding:9px;border:none;border-radius:9px;background:linear-gradient(135deg,#5b21b6,#7c3aed);color:#fff;font-size:13px;font-weight:700;cursor:pointer">🎙️ Start Practice</button>'
              + '<button onclick="staffAgentShareForFeedback(\''+key+'\')" style="flex:1;padding:9px;border:1.5px solid #d9d9e0;border-radius:9px;background:#fff;color:#3a3a42;font-size:13px;font-weight:700;cursor:pointer">📤 Share for Feedback</button>'
            + '</div>'
        });
      }
      // sopcoach and kudos each get a tailored agentic-action card too — the bot doesn't just
      // narrate, it visibly sends the script / flags the win, matching the manager-side pattern.
      if(key === 'sopcoach'){
        PULSE_INTERNAL_THREADS[channelName].messages.push({who:t.title, init:t.icon, bg:'#f1ecff', color:'#4338ca', isBot:true, time:'Just now',
          text:'<div style="background:#0a1a14;border-radius:10px;padding:11px;color:#fff">'
            + '<div style="font-size:11px;font-weight:800;letter-spacing:.5px;color:#c7d2fe;text-transform:uppercase;margin-bottom:4px">✅ Sent</div>'
            + '<div style="font-size:13px;font-weight:700;margin-bottom:5px">Warranty pitch — quick script</div>'
            + '<div style="font-size:12.5px;color:#c9dcd5;line-height:1.5">"Since this comes with our extended warranty, if anything goes wrong in the first two years, it\'s covered — most customers don\'t realise that until I mention it."</div>'
          + '</div>'
        });
      }
      if(key === 'kudos'){
        PULSE_INTERNAL_THREADS[channelName].messages.push({who:t.title, init:t.icon, bg:'#f1ecff', color:'#c8860a', isBot:true, time:'Just now',
          text:'<div style="background:#0a1a14;border-radius:10px;padding:11px;color:#fff;display:flex;align-items:center;gap:10px">'
            + '<div style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px">🏆</div>'
            + '<div><div style="font-size:11px;font-weight:800;letter-spacing:.5px;color:#ffe3b3;text-transform:uppercase">✅ Sent to Sunita</div><div style="font-size:12.5px;color:#c9dcd5;margin-top:2px">She\'s been notified — keep an eye out for a shoutout in tomorrow\'s huddle.</div></div>'
          + '</div>'
        });
      }
    }
  });
}
function renderStaffAgentCatalog(){
  var box = document.getElementById('staffAgentFoldBody'); if(!box) return;
  box.innerHTML = Object.keys(STAFF_AGENT_TASKS).map(function(key){
    var t = STAFF_AGENT_TASKS[key];
    return '<div onclick="openStaffAgentChannel(\''+key+'\')" style="display:flex;align-items:center;gap:10px;background:#fafafc;border:1px solid #ece7fa;border-radius:12px;padding:10px 11px;margin-top:7px;cursor:pointer">'
      + '<div style="width:34px;height:34px;border-radius:10px;background:'+t.gradient+';display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px">'+t.icon+'</div>'
      + '<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:700;color:#1a1a1a">'+t.title+'</div><div style="font-size:13px;color:#8e8e93">'+t.sub+'</div></div>'
      + '<i class="ti ti-chevron-right" style="font-size:15px;color:#c5c5c5;flex-shrink:0"></i>'
    + '</div>';
  }).join('');
}
window.staffAgentFoldToggle = function(el){
  var body = document.getElementById('staffAgentFoldBody');
  var chevron = document.getElementById('staffAgentFoldChevron');
  var open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  chevron.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
  if(!open) renderStaffAgentCatalog();
};
// Tapping any catalog card opens its channel directly — already-live, no activation gate.
window.openStaffAgentChannel = function(key){
  var t = STAFF_AGENT_TASKS[key]; if(!t) return;
  openPulseChat(t.title, t.icon, '#'+agentTitleToChannelSlug(t.title), 'agent');
};
document.addEventListener('DOMContentLoaded', function(){ seedStaffAgentsActive(); renderStaffAgentCatalog(); });
window.staffAgentStartPractice = function(key){
  closePulseChat();
  aSwitch('calls');
};
window.staffAgentShareForFeedback = function(key){
  var t = STAFF_AGENT_TASKS[key];
  var d = PULSE_INTERNAL_THREADS[t.title];
  if(d){
    d.messages.push({who:'You', init:'AR', text:'Sharing my practice attempt with Sunita and L&D for feedback 🙏', time:'Just now'});
    d.messages.push({who:t.title, init:t.icon, bg:'#f1ecff', color:'#7c3aed', isBot:true, text:'📤 Sent to Sunita Rao (Store Manager) and Fahmy (L&D) — they\'ll reply here with feedback.', time:'Just now'});
    renderStaffPulseThread();
  }
  var toast = document.createElement('div');
  toast.innerHTML = '<i class="ti ti-circle-check" style="font-size:15px;vertical-align:-2px;margin-right:5px"></i>Shared for feedback';
  toast.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#0a1a14;color:#fff;font-size:13.5px;font-weight:700;padding:10px 16px;border-radius:20px;z-index:99999;box-shadow:0 6px 20px rgba(0,0,0,.25)';
  document.body.appendChild(toast);
  setTimeout(function(){ toast.remove(); }, 2200);
};
function agentTitleToChannelSlug(title){
  return String(title||'agent').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40) || 'agent';
}
document.addEventListener('DOMContentLoaded', renderStaffAgentCatalog);
// ───────────────── Vertical Custom Agent channels (mirrors manager web) ─────────────────
// When an M2 manager activates a Vertical Template in Settings → Custom Agents with
// "Call Centre Staff (M0)" checked as a destination stakeholder, that agent's channel is meant
// to show up here as a normal # channel — same visual treatment as callcentre-team / all-stores —
// instead of being buried in the generic "Custom Agents" practice fold above. This file is a
// static prototype with no live link to the manager console, so the EMI Push Nudge channel below
// is seeded as already-activated to demonstrate the intended end state; a real backend would push
// this list based on which agents are actually live with call centre / field / store staff checked.
var STAFF_VERTICAL_AGENT_CHANNELS = [
  {id:'emi-push-nudges', name:'emi-push-nudges', agent:'EMI Push Nudge', icon:'💳', meta:'EMI mentioned in 4/11 calls this shift (36%) — below target', time:'Just now', badge:1, active:true}
];
function renderStaffVerticalAgentChannels(){
  var box = document.getElementById('staffVerticalAgentChannels'); if(!box) return;
  var live = STAFF_VERTICAL_AGENT_CHANNELS.filter(function(c){ return c.active; });
  if(!live.length){ box.innerHTML = ''; return; }
  box.innerHTML = '<div style="display:flex;align-items:center;gap:6px;margin:0 12px 6px;font-size:12.5px;color:#7c3aed;font-weight:700"><i class="ti ti-diamond" style="font-size:12.5px"></i>From your manager\'s Custom Agents</div>'
    + live.map(function(c){
        return '<div class="slack-ch-row" onclick="openPulseChat(\''+c.agent+'\',\''+c.icon+'\',\'#'+c.id+'\',\'agent\')">'
          + '<span class="slack-ch-hash">#</span>'
          + '<div class="slack-ch-body"><span class="slack-ch-name">'+c.name+'</span><span class="slack-ch-meta">'+c.meta+'</span></div>'
          + '<span class="slack-ch-time">'+c.time+'</span>'+(c.badge?'<span class="slack-ch-badge">'+c.badge+'</span>':'')
        + '</div>';
      }).join('');
}
document.addEventListener('DOMContentLoaded', renderStaffVerticalAgentChannels);
function renderStaffCardBody(c){
  var fields = (c.fields||[]).map(function(f){
    return '<div style="margin-bottom:4px"><span style="font-size:12.5px;color:#8e8e93">'+f[0]+':</span> <span style="font-size:13px;font-weight:700;color:#1a1a1a">'+f[1]+'</span></div>';
  }).join('');
  var actions = (c.actions||[]).map(function(a){
    var primary = a.style === 'primary';
    return '<button onclick="'+(a.onclick||'')+'" style="font-size:13px;font-weight:700;padding:6px 11px;border-radius:7px;cursor:pointer;border:'+(primary?'none':'1.5px solid #d9d9e0')+';background:'+(primary?'#1d9e75':'#fff')+';color:'+(primary?'#fff':'#333')+'">'+a.label+'</button>';
  }).join('');
  return '<div style="background:#fafafc;border:1px solid #e5e5ea;border-radius:9px;padding:8px 10px;margin-top:5px;max-width:210px">'
    + (c.badge ? '<div style="display:inline-block;font-size:12.5px;font-weight:800;color:#0f6e56;background:#e1f5ee;border-radius:5px;padding:2px 6px;margin-bottom:5px">'+c.badge+'</div>' : '')
    + '<div style="font-size:13px;font-weight:800;color:#1a1a1a;margin-bottom:5px">'+(c.icon?c.icon+' ':'')+c.title+'</div>'
    + fields
    + (actions ? '<div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">'+actions+'</div>' : '')
  + '</div>';
}
function renderStaffChatBubble(m){
  var mine = m.who === 'You';
  var body = (m.text||'') + (m.card ? renderStaffCardBody(m.card) : '');
  if(mine){
    return '<div style="display:flex;flex-direction:row-reverse;gap:8px;margin-bottom:10px">'
      +'<div style="width:28px;height:28px;border-radius:50%;background:#5dcaa5;display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:700;color:#04342c;flex-shrink:0">'+m.init+'</div>'
      +'<div style="flex:1;display:flex;flex-direction:column;align-items:flex-end"><div style="font-size:12.5px;font-weight:700;color:#1a1a1a;margin-bottom:2px">You <span style="font-size:12.5px;color:#8e8e93;font-weight:400">'+m.time+'</span></div><div style="background:#1d9e75;border-radius:10px 0 10px 10px;padding:8px 10px;font-size:13.5px;color:#fff;display:inline-block;max-width:85%">'+body+'</div></div></div>';
  }
  return '<div style="display:flex;gap:8px;margin-bottom:10px">'
    +'<div style="width:28px;height:28px;border-radius:50%;background:'+(m.bg||'#faeeda')+';display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:700;color:'+(m.color||'#854f0b')+';flex-shrink:0">'+m.init+'</div>'
    +'<div style="flex:1"><div style="font-size:12.5px;font-weight:700;color:#1a1a1a;margin-bottom:2px">'+m.who+(m.isBot?' <span style="font-size:12px;font-weight:700;color:#7c3aed;background:#f1ecff;border-radius:5px;padding:1px 4px">BOT</span>':'')+' <span style="font-size:12.5px;color:#8e8e93;font-weight:400">'+m.time+'</span></div><div style="background:#fff;border-radius:0 10px 10px 10px;padding:8px 10px;font-size:13.5px;color:#1a1a1a;border:0.5px solid #e5e5ea;display:inline-block;max-width:85%">'+body+'</div></div></div>';
}
function renderStaffPulseThread(){
  var d = PULSE_INTERNAL_THREADS[pulseChatActive];
  if(!d) return;
  if(!d.messages || d.messages.length === 0){
    document.getElementById('pchatBody').innerHTML = '<div style="text-align:center;margin-top:50px;color:#a8a8ad"><div style="font-size:32px;margin-bottom:8px">👋</div><div style="font-size:13.5px;font-weight:600;color:#6b6b74">This is the very beginning of '+d.title+'</div><div style="font-size:13px;margin-top:3px">Nothing here yet — break the ice!</div></div>';
    return;
  }
  var html = '<div style="text-align:center;font-size:12.5px;color:#8e8e93;margin-bottom:12px">'+d.dateLabel+'</div>';
  html += d.messages.map(renderStaffChatBubble).join('');
  var box = document.getElementById('pchatBody');
  box.innerHTML = html;
  box.scrollTop = box.scrollHeight;
}
function openPulseChat(name, initials, channel, type) {
  var d = PULSE_INTERNAL_THREADS[name];
  if(!d) return;
  pulseChatActive = name;
  document.getElementById('pchatTitle').textContent = d.title;
  var inp = document.getElementById('pchatInput');
  inp.textContent = 'Message ' + d.title + '…';
  inp.style.color = '#8e8e93';
  renderStaffPulseThread();
  document.getElementById('pulseChatOverlay').style.display = 'flex';
}
function closePulseChat() { document.getElementById('pulseChatOverlay').style.display = 'none'; }
// ── Notification overlay for call centre staff — scoped to what's relevant to them: pending Pulse
// replies (their team channel, their agent coaching channels) plus pure alerts (kudos, streaks).
// No manager-only items (quotations, campaigns) show up here. ──
var NOTIFICATIONS_FEED = [
  {id:'n1', needsAction:true, icon:'☎️', color:'#854f0b', title:'Sunita Rao is checking greeting-QA scores Friday — reply in #callcentre-team', time:'2:05pm', cta:'Open #callcentre-team', action:function(){ closeNotificationOverlay(); openPulseChat('Call Centre Team', 'SR', '#callcentre-team', 'channel'); }},
  {id:'n2', needsAction:true, icon:'🎯', color:'#5b21b6', title:'Skill Improvement Coach is waiting on you to pick a skill to practice', time:'Today', cta:'Open Skill Improvement Coach', action:function(){ closeNotificationOverlay(); openPulseChat('Skill Improvement Coach', '🎯', '#skill-improvement', 'agent'); }},
  {id:'n3', needsAction:false, icon:'🌟', color:'#0f6e56', title:'Your EMI-pitch rate hit 55% this shift — target met, nice work', time:'1:05pm', cta:null},
  {id:'n4', needsAction:false, icon:'🏆', color:'#c8860a', title:'You hit a 7-day SOP streak — kudos sent automatically', time:'Yesterday', cta:null},
  {id:'n5', needsAction:true, icon:'📞', color:'#185fa5', title:'1 callback still open from this morning\'s queue', time:'11:40am', cta:'Open queue', action:function(){ closeNotificationOverlay(); aSwitch('calls'); }},
  {id:'n6', needsAction:false, icon:'📈', color:'#c2410c', title:'Weekly call-quality summary was sent to your registered number', time:'Mon 8:00am', cta:null}
];
var notifFilterState = 'all';
var notifLoadedCount = 6;
window.openNotificationOverlay = function(){
  notifLoadedCount = 6;
  renderNotificationList();
  document.getElementById('notificationOverlay').style.display = 'flex';
  var dot = document.getElementById('notifBellDot'); if(dot) dot.style.display = 'none';
};
window.closeNotificationOverlay = function(){ document.getElementById('notificationOverlay').style.display = 'none'; };
window.notifSetFilter = function(f, el){
  notifFilterState = f;
  document.querySelectorAll('.notif-filter-btn').forEach(function(b){ b.classList.remove('active'); b.style.background='none'; b.style.color='#8e8e93'; });
  el.classList.add('active'); el.style.background = '#fff'; el.style.color = '#1a1a1a';
  renderNotificationList();
};
function renderNotificationList(){
  var list = NOTIFICATIONS_FEED.filter(function(n){
    if(notifFilterState==='action') return n.needsAction;
    if(notifFilterState==='alert') return !n.needsAction;
    return true;
  });
  var actionCount = NOTIFICATIONS_FEED.filter(function(n){ return n.needsAction; }).length;
  var sub = document.getElementById('notifHeaderSub'); if(sub) sub.textContent = actionCount + ' need action · ' + (NOTIFICATIONS_FEED.length - actionCount) + ' alerts';
  var shown = [];
  for(var i=0;i<notifLoadedCount && list.length;i++){
    var base = list[i % list.length];
    var cycle = Math.floor(i / list.length);
    shown.push(cycle===0 ? base : Object.assign({}, base, {time: cycle+'w ago', id: base.id+'-'+cycle}));
  }
  var html = shown.map(function(n){
    return '<div onclick="notifItemTap(\''+n.id+'\')" style="display:flex;align-items:flex-start;gap:11px;background:#fff;border-left:3px solid '+(n.needsAction?'#c8860a':'#d5d5da')+';border-radius:10px;padding:11px 12px;margin-bottom:8px;cursor:'+(n.action?'pointer':'default')+'">'
      + '<div style="width:32px;height:32px;border-radius:9px;background:'+n.color+'22;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px">'+n.icon+'</div>'
      + '<div style="flex:1;min-width:0">'
        + '<div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">'
          + '<span style="font-size:11px;font-weight:800;padding:1px 7px;border-radius:6px;'+(n.needsAction?'background:#fff3d6;color:#7a4a00':'background:#f0f0f3;color:#6b6b74')+'">'+(n.needsAction?'ACTION NEEDED':'ALERT')+'</span>'
          + '<span style="font-size:11.5px;color:#a8a8ad">'+n.time+'</span>'
        + '</div>'
        + '<div style="font-size:13.5px;color:#1a1a1a;line-height:1.4">'+n.title+'</div>'
        + (n.cta ? '<div style="font-size:12.5px;font-weight:700;color:#185fa5;margin-top:4px">'+n.cta+' →</div>' : '')
      + '</div>'
    + '</div>';
  }).join('');
  if(!shown.length) html = '<div style="text-align:center;padding:40px 20px;color:#8e8e93;font-size:13.5px">Nothing here right now.</div>';
  else html += '<div onclick="notifLoadMore()" style="text-align:center;padding:12px;color:#185fa5;font-weight:700;font-size:13px;cursor:pointer">Load more ↓</div>';
  document.getElementById('notifListBody').innerHTML = html;
  window._notifCurrentList = shown;
}
window.notifLoadMore = function(){ notifLoadedCount += 6; renderNotificationList(); };
window.notifItemTap = function(id){
  var n = (window._notifCurrentList||[]).filter(function(x){ return x.id===id; })[0];
  if(n && typeof n.action === 'function') n.action();
};
// ── @-mention indicator: any Pulse row (channel or DM) whose thread contains an @mention gets a
// small "@" pill, so staff can see at a glance where they've been tagged by a teammate or an agent. ──
function channelHasMention(name){
  var d = PULSE_INTERNAL_THREADS[name];
  if(!d || !d.messages) return false;
  return d.messages.some(function(m){ return /@[A-Za-z]/.test(m.text||''); });
}
function applyMentionBadgesToStaticRows(){
  document.querySelectorAll('[onclick*="openPulseChat("]').forEach(function(el){
    var m = (el.getAttribute('onclick')||'').match(/openPulseChat\('([^']+)'/);
    if(!m || !channelHasMention(m[1])) return;
    if(el.querySelector('.pulse-mention-badge')) return;
    var badge = document.createElement('span');
    badge.className = 'pulse-mention-badge';
    badge.title = "You're tagged in this thread";
    badge.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:17px;height:17px;border-radius:50%;background:#7c3aed;color:#fff;font-size:10.5px;font-weight:800;flex-shrink:0;margin-left:6px';
    badge.textContent = '@';
    el.appendChild(badge);
  });
}
document.addEventListener('DOMContentLoaded', applyMentionBadgesToStaticRows);

// ---- Customer-facing chat (WhatsApp / Voice Call channel selector) ----
var PULSE_CUSTOMER_DATA = {
  'Mukunda': { initials:'MK', avatarBg:'#0f6e56', phone:'+91 98765 43210', status:'Hot Lead', missed:false,
    thread:[
      {from:'customer', ch:'wa', text:'Hi, is the Ortho GRID mattress in stock in Queen size?', time:'2:12pm'},
      {from:'staff', ch:'wa', text:'Yes it is! Sending you the quote now 👍', time:'2:18pm'},
      {from:'system', ch:'wa', text:'Quote for Ortho GRID (₹8,490) sent', time:'2:19pm'},
      {from:'customer', ch:'wa', text:'Ok let me check with my wife and get back', time:'2:40pm'}
    ]},
  'Kavitha R.': { initials:'KR', avatarBg:'#c8860a', phone:'+91 97654 32109', status:'Ageing · SLA at risk', missed:false,
    thread:[
      {from:'customer', ch:'wa', text:'When can I come see the hybrid mattress?', time:'11:02am'},
      {from:'staff', ch:'call', text:'Called to confirm visit slot', time:'11:10am', callDuration:'1m 40s', callStatus:'Answered'},
      {from:'customer', ch:'wa', text:'When can I come see the hybrid mattress?', time:'11:15am'}
    ]},
  'Ali': { initials:'AL', avatarBg:'#c0392b', phone:'+91 90000 11122', status:'Missed call · not returned', missed:true,
    thread:[
      {from:'customer', ch:'call', text:'Incoming call', time:'9:40am', callDuration:'—', callStatus:'Missed'},
      {from:'system', ch:'wa', text:'Auto-reply sent: "Sorry we missed you, we will call back shortly"', time:'9:41am'}
    ]}
};
var pulseCustomerActive = null;
var pulseCustomerChannel = 'wa';

function openPulseCustomerChat(name, initials, phone, type){
  var d = PULSE_CUSTOMER_DATA[name];
  if(!d) return;
  pulseCustomerActive = name;
  document.getElementById('pccAvatar').textContent = d.initials;
  document.getElementById('pccAvatar').style.background = d.avatarBg;
  document.getElementById('pccName').textContent = name;
  document.getElementById('pccSub').textContent = d.phone+' · relayed via WhatsApp Business · '+d.status;
  document.getElementById('pccUnansweredStrip').style.display = d.missed ? 'block' : 'none';
  renderPulseCustomerThread();
  pulseSetChannel('wa');
  document.getElementById('pulseCustomerChatOverlay').style.display = 'flex';
}
function closePulseCustomerChat(){ document.getElementById('pulseCustomerChatOverlay').style.display = 'none'; pulseCustomerActive = null; }

function renderPulseCustomerThread(){
  var d = PULSE_CUSTOMER_DATA[pulseCustomerActive];
  if(!d) return;
  var html = '<div style="text-align:center;margin:2px 0 12px"><span style="display:inline-flex;align-items:center;gap:5px;background:#dcf8c6;color:#075e54;font-size:12.5px;font-weight:700;padding:4px 10px;border-radius:20px">💬 This is a staff-facing proxy for the real WhatsApp conversation with '+pulseCustomerActive+'</span></div>';
  html += d.thread.map(function(m){
    if(m.ch==='call'){
      var icon = m.callStatus==='Missed' ? 'ti-phone-x' : 'ti-phone-call';
      var col = m.callStatus==='Missed' ? '#c0392b' : '#1d9e75';
      return '<div style="text-align:center;margin:10px 0"><span style="display:inline-flex;align-items:center;gap:5px;background:#fff;border-radius:20px;padding:5px 12px;font-size:13px;color:'+col+';font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.08)"><i class="ti '+icon+'" style="font-size:13.5px"></i>'+m.callStatus+' call · '+m.callDuration+' · '+m.time+'</span></div>';
    }
    if(m.from==='system'){
      return '<div style="text-align:center;margin:8px 0"><span style="background:#fff;border-radius:8px;padding:5px 10px;font-size:12.5px;color:#6b6b74;box-shadow:0 1px 2px rgba(0,0,0,.06)">'+m.text+'</span></div>';
    }
    var mine = m.from==='staff';
    return '<div style="display:flex;'+(mine?'flex-direction:row-reverse':'')+';margin-bottom:8px">'+
      '<div style="max-width:78%;background:'+(mine?'#dcf8c6':'#fff')+';border-radius:'+(mine?'10px 0 10px 10px':'0 10px 10px 10px')+';padding:7px 10px;box-shadow:0 1px 2px rgba(0,0,0,.08)">'+
      '<div style="font-size:14px;color:#1a1a1a;line-height:1.4">'+m.text+'</div>'+
      '<div style="font-size:12.5px;color:#8e8e93;text-align:right;margin-top:2px">'+m.time+'</div></div></div>';
  }).join('');
  document.getElementById('pccMessages').innerHTML = html;
  var box = document.getElementById('pccMessages'); box.scrollTop = box.scrollHeight;
}

function pulseSetChannel(ch){
  pulseCustomerChannel = ch;
  var wa = document.getElementById('pccChanWa'), call = document.getElementById('pccChanCall');
  wa.style.background = ch==='wa' ? '#dcf8c6' : '#f2f2f7';
  wa.style.color = ch==='wa' ? '#0f6e56' : '#8e8e93';
  call.style.background = ch==='call' ? '#e1f5ee' : '#f2f2f7';
  call.style.color = ch==='call' ? '#0f6e56' : '#8e8e93';
  document.getElementById('pccComposeWa').style.display = ch==='wa' ? 'flex' : 'none';
  document.getElementById('pccComposeCall').style.display = ch==='call' ? 'block' : 'none';
}

function sendPulseCustomerMsg(){
  var inp = document.getElementById('pccInput');
  var text = inp.textContent.trim();
  if(!text || text==='Message on WhatsApp…') return;
  var d = PULSE_CUSTOMER_DATA[pulseCustomerActive];
  if(!d) return;
  d.thread.push({from:'staff', ch:'wa', text:text, time:'Just now'});
  d.missed = false;
  document.getElementById('pccUnansweredStrip').style.display = 'none';
  inp.textContent = 'Message on WhatsApp…';
  inp.style.color = '#8e8e93';
  renderPulseCustomerThread();
}

function pulseStartCall(){
  var d = PULSE_CUSTOMER_DATA[pulseCustomerActive];
  if(!d) return;
  d.thread.push({from:'staff', ch:'call', text:'Outgoing call', time:'Just now', callDuration:'in progress', callStatus:'Calling'});
  d.missed = false;
  document.getElementById('pccUnansweredStrip').style.display = 'none';
  renderPulseCustomerThread();
  if(typeof openOnGroundCallCheck === 'function'){ openOnGroundCallCheck(pulseCustomerActive, d.phone, d.initials); }
}

// Tag / forward sheet
var pulseTagSelected = [];
function openPulseTagSheet(){
  pulseTagSelected = [];
  document.querySelectorAll('.pulse-tag-opt').forEach(function(o){
    o.style.borderColor = '#e5e5ea'; o.style.background = '#fff';
    o.querySelector('.ti-circle-check').style.color = '#c0c0c0';
  });
  document.getElementById('pulseTagOverlay').classList.add('show');
}
function closePulseTagSheet(){ document.getElementById('pulseTagOverlay').classList.remove('show'); }
function togglePulseTagPerson(el){
  var name = el.getAttribute('data-name');
  var idx = pulseTagSelected.indexOf(name);
  var check = el.querySelector('.ti-circle-check');
  if(idx>-1){ pulseTagSelected.splice(idx,1); el.style.borderColor='#e5e5ea'; el.style.background='#fff'; check.style.color='#c0c0c0'; }
  else { pulseTagSelected.push(name); el.style.borderColor='#1d9e75'; el.style.background='#f0fff6'; check.style.color='#1d9e75'; }
}
function pulseTagAction(kind){
  if(pulseTagSelected.length===0){ closePulseTagSheet(); return; }
  var d = PULSE_CUSTOMER_DATA[pulseCustomerActive];
  var names = pulseTagSelected.join(', ');
  if(d){
    d.thread.push({from:'system', ch:'wa', text: (kind==='tag' ? 'You tagged '+names+' on this chat' : 'Chat forwarded to '+names), time:'Just now'});
    renderPulseCustomerThread();
  }
  closePulseTagSheet();
}
function togglePulseEmoji() {
  var ep = document.getElementById('pulseEmojiPicker');
  ep.style.display = (ep.style.display==='none'||ep.style.display==='')?'flex':'none';
}
function insertEmoji(e) {
  var inp = document.getElementById('pchatInput');
  if (inp.textContent.indexOf('Message') === 0) inp.textContent = '';
  inp.textContent += e;
}
function sendPulseMsg() {
  var inp = document.getElementById('pchatInput');
  var text = inp.textContent.trim();
  var d = PULSE_INTERNAL_THREADS[pulseChatActive];
  if(!text || !d || text.indexOf('Message ') === 0) return;
  d.messages.push({who:'You', init:'Y', text:text, time:'Just now'});
  inp.textContent = 'Message ' + d.title + '…';
  inp.style.color = '#8e8e93';
  renderStaffPulseThread();
  if(pulseChatActive === 'AvaniBot'){
    setTimeout(function(){ avaniBotDMReplyStaff(text); }, 550);
  }
}

// ───────────────── AvaniBot — in-channel AI search + lightweight DM assistant (staff) ─────────────────
var AVANI_ACTION_ITEMS_STAFF = {
  'sunita': {name:'Sunita Rao', items:['Approve your quote for Mukunda — flagged waiting since yesterday'], source:'DM with Sunita Rao'},
  'priya': {name:'Priya Krishnan', items:['Cover her 3pm slot today — she asked this morning'], source:'DM with Priya Krishnan'},
  'raju': {name:'Raju Kumar', items:['No open action items — he just sent you kudos ✓'], source:'DM with Raju Kumar'}
};
// AvaniBot hero card quick actions — Daily Brief posts a real, data-grounded summary; Ask a
// Question just opens the DM with focus in the input, ready to type.
function avaniQuickDailyBriefStaff(){
  var d = PULSE_INTERNAL_THREADS['AvaniBot'];
  openPulseChat('AvaniBot','✨','AvaniBot','avanibot');
  if(!d) return;
  d.messages.push({who:'You', init:'Y', text:'Give me my daily brief', time:'Just now'});
  renderStaffPulseThread();
  setTimeout(function(){
    d.messages.push({who:'AvaniBot', init:'✨', bg:'#f1ecff', color:'#7c3aed', isBot:true, time:'Just now',
      text:'☀️ <b>Here\'s today\'s brief</b><br>'
        + '• Avg Handle Time: 4m 12s <span style="color:#0f6e56">▼8%</span> — nice improvement<br>'
        + '• Warranty score down 12% this week — worth a look in #avani-coaching<br>'
        + '• Greeting-in-first-10s at 71% — Sunita wants this pushed up<br>'
        + '• You\'ve got 3 new kudos waiting 🏆<br><br>'
        + 'Want me to open avani-coaching, or pull up your kudos?'});
    if(pulseChatActive === 'AvaniBot') renderStaffPulseThread();
  }, 550);
}
function avaniQuickAskQuestionStaff(){
  openPulseChat('AvaniBot','✨','AvaniBot','avanibot');
  setTimeout(function(){
    var inp = document.getElementById('pchatInput');
    if(inp) inp.focus();
  }, 150);
}
function avaniBotDMReplyStaff(userText){
  var d = PULSE_INTERNAL_THREADS['AvaniBot'];
  if(!d) return;
  var lower = userText.toLowerCase();
  var match = null;
  Object.keys(AVANI_ACTION_ITEMS_STAFF).forEach(function(k){ if(lower.indexOf(k) !== -1) match = AVANI_ACTION_ITEMS_STAFF[k]; });
  var replyText;
  if(lower.indexOf('action item') !== -1 && match){
    replyText = '✨ Here\'s what I found for <b>'+match.name+'</b>:<br>' + match.items.map(function(i){ return '• '+i; }).join('<br>') + '<br><br><span style="color:#8e8e93;font-size:13px">Source: '+match.source+'</span>';
  } else if(lower.indexOf('action item') !== -1){
    replyText = 'Hmm 🤔 I couldn\'t match that name — try "what are my action items from Sunita" or "…from Priya".';
  } else {
    replyText = '✨ I can search Pulse for you! Try asking things like <b>"what are my action items from Sunita"</b>, or open any channel and tap the ✨ icon to search just that channel.';
  }
  d.messages.push({who:'AvaniBot', init:'✨', bg:'#f1ecff', color:'#7c3aed', isBot:true, text:replyText, time:'Just now'});
  if(pulseChatActive === 'AvaniBot') renderStaffPulseThread();
}
function avaniOpenSearchStaff(){
  var d = PULSE_INTERNAL_THREADS[pulseChatActive];
  if(!d) return;
  document.getElementById('avaniSearchSubStaff').textContent = 'Searching in ' + d.title;
  document.getElementById('avaniSearchInputStaff').value = '';
  document.getElementById('avaniSearchResultsStaff').innerHTML = '<div style="text-align:center;color:#8e8e93;font-size:13.5px;margin-top:30px">✨ Ask me anything about this channel\'s history — I\'ll cite my sources.</div>';
  document.getElementById('avaniSearchOverlayStaff').style.display = 'flex';
  setTimeout(function(){ document.getElementById('avaniSearchInputStaff').focus(); }, 80);
}
function closeAvaniSearchStaff(){ document.getElementById('avaniSearchOverlayStaff').style.display = 'none'; }
function avaniRunSearchStaff(){
  var q = document.getElementById('avaniSearchInputStaff').value.trim();
  var d = PULSE_INTERNAL_THREADS[pulseChatActive];
  if(!q || !d) return;
  var qLower = q.toLowerCase();
  var words = qLower.split(/\s+/).filter(function(w){ return w.length > 3; });
  var matches = (d.messages || []).filter(function(m){
    var hay = (m.text||'').toLowerCase();
    return hay.indexOf(qLower) !== -1 || words.some(function(w){ return hay.indexOf(w) !== -1; });
  });
  var sources = matches.slice(0,2);
  var answer;
  if(sources.length){
    answer = 'Based on '+sources.length+' message'+(sources.length>1?'s':'')+' in this channel, here\'s what I found: ' + sources.map(function(m){ return m.text; }).join(' — ') + '.';
  } else {
    answer = 'Hmm 🤔 I couldn\'t find anything matching that in this channel yet — try a broader term, or DM me and I\'ll search across all of Pulse.';
  }
  var sourcesHtml = sources.map(function(m){
    return '<div style="background:#fff;border:1px solid #e5e5ea;border-radius:10px;padding:9px 11px;margin-bottom:8px">'
      +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><span style="font-size:12.5px;font-weight:700;color:#1a1a1a">'+m.who+'</span><span style="font-size:12.5px;color:#a0a0a8">'+m.time+'</span></div>'
      +'<div style="font-size:13.5px;color:#444;line-height:1.4">'+m.text+'</div></div>';
  }).join('') || '<div style="font-size:13px;color:#a0a0a8;text-align:center;margin:10px 0">No source messages matched</div>';
  document.getElementById('avaniSearchResultsStaff').innerHTML =
    '<div style="background:#f1ecff;border-radius:12px;padding:12px 14px;margin-bottom:14px">'
    +'<div style="font-size:12.5px;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">✨ AI answer</div>'
    +'<div style="font-size:14.5px;color:#3b1254;line-height:1.5">'+answer+'</div></div>'
    +'<div style="font-size:12.5px;font-weight:800;color:#8e8e93;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Sources</div>'
    +sourcesHtml;
}
// Quotes & Leads

var WA_ICON_SVG = '<svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';

var LEADS_MODAL_DATA_RETAIL = [
  {
    name:'Mukunda', initials:'MK', avatarBg:'#e1f5ee', avatarColor:'#0f6e56',
    interest:'Interested: Ortho GRID · ₹8,490',
    product:'Ortho GRID Mattress', crossSell:'Mattress Protector · ₹1,999', emi:'Asked about EMI — quote the 12-month zero-interest plan',
    attractivenessScore:90, expectedValue:8490,
    badge:'2h left', badgeBg:'#e1f5ee', badgeColor:'#0f6e56',
    statusLabel:'Open', statusColor:'#1d9e75',
    quoteOn:true,
    icp:87, icpColor:'#1d9e75',
    intentScore:91,
    subscores:[{label:'Budget Fit',pct:87,color:'#1d9e75'},{label:'Need Match',pct:72,color:'#c8860a'},{label:'Decision Stage',pct:60,color:'#7c3aed'}],
    slaNote:null,
    notes:['Asked about EMI on the Ortho GRID — lead with the 12-month zero-interest plan.','Price-sensitive — compared us with a competitor, so mention the 100-night trial to reduce risk.','Prefers evening calls, after 6pm.'],
    problemBuckets:[
      {cat:'Financing Related', text:'Asked specifically about EMI options on the Ortho GRID — budget is a live concern, not a blocker'},
      {cat:'Quotation Demanded', text:'Compared pricing with a competitor before reaching out — price-anchored, expects a competitive number'},
      {cat:'Warranty Related', text:'Hasn\'t raised this yet — worth proactively mentioning the 100-night trial to reduce perceived risk'}
    ],
    journey:[
      {date:'18 May',channel:'Meta Ad',icon:'📢',color:'#1877f2',text:'Clicked our "0% EMI on Ortho GRID" retargeting ad — first touch'},
      {date:'20 May',channel:'AI Agent',icon:'🤖',color:'#7c3aed',text:'WhatsApp opt-in — shared preferred size'},
      {date:'22 May',channel:'Voice AI',icon:'🎙️',color:'#7c3aed',text:'4m 12s qualifying call — asked if pillows come bundled'},
      {date:'24 May',channel:'WhatsApp',icon:'💬',color:'#25D366',text:'Asked for a quote with pillows bundled in'}
    ],
    phone:'+91 98765 43210',
    actions:'open'
  },
  {
    name:'Kavitha R.', initials:'KR', avatarBg:'#fff8e1', avatarColor:'#c8860a',
    interest:'Interested: SmartGRID Hybrid · ₹24,990',
    product:'SmartGRID Hybrid Mattress', crossSell:'Cooling Pillow Set · ₹2,499', emi:'Budget borderline — a payment plan could tip this',
    attractivenessScore:55, expectedValue:24990,
    badge:'+3d ageing', badgeBg:'#fff8e1', badgeColor:'#c8860a',
    statusLabel:'Ageing', statusColor:'#c8860a',
    quoteOn:false,
    icp:61, icpColor:'#c8860a',
    intentScore:63,
    subscores:[{label:'Budget Fit',pct:61,color:'#c8860a'},{label:'Need Match',pct:42,color:'#e24b4a'},{label:'Decision Stage',pct:35,color:'#7c3aed'}],
    slaNote:'SLA missed — 5 days grace left to close',
    notes:['SLA already missed — open with an apology for the delay, not a sales pitch.','Low Need Match (42%) — re-confirm the SmartGRID Hybrid is still the right fit before pushing further.',"Hasn't responded to the last 2 WhatsApp messages — try a call instead."],
    problemBuckets:[
      {cat:'Product Related', text:'Uncertain whether SmartGRID Hybrid actually fits her need — Need Match score is low (42%), worth re-confirming fit before pushing further'},
      {cat:'In-Store Experience Needed', text:'Hasn\'t responded to WhatsApp — may prefer to see/feel the product before deciding, worth inviting her back in'},
      {cat:'Financing Related', text:'Budget fit is borderline (61%) — a payment plan or bundle discount could tip this'}
    ],
    journey:[
      {date:'12 May',channel:'Google Ad',icon:'🔍',color:'#ea4335',text:'Searched "cooling gel mattress bangalore", clicked our top search ad'},
      {date:'15 May',channel:'AI Agent',icon:'🤖',color:'#7c3aed',text:'WhatsApp auto-reply engaged — confirmed interest in the cooling gel layer'},
      {date:'19 May',channel:'WhatsApp',icon:'💬',color:'#25D366',text:'Asked to hold the price for 2 days, went quiet since'}
    ],
    phone:'+91 97654 32109',
    actions:'ageing'
  },
  {
    name:'Faizan A.', initials:'FA', avatarBg:'#e8f0fe', avatarColor:'#185fa5',
    interest:'Interested: Tranquo Massager Chair · ₹24,990',
    product:'Tranquo Massager Chair', crossSell:'Ergo Seat Cushion · ₹1,299', emi:'Confirmed he wants the 6-month no-cost EMI plan',
    attractivenessScore:88, expectedValue:24990,
    badge:'Confirmed date', badgeBg:'#e1f5ee', badgeColor:'#0f6e56',
    statusLabel:'Open', statusColor:'#1d9e75',
    quoteOn:true,
    icp:82, icpColor:'#1d9e75',
    intentScore:85,
    subscores:[{label:'Budget Fit',pct:82,color:'#1d9e75'},{label:'Need Match',pct:78,color:'#1d9e75'},{label:'Decision Stage',pct:70,color:'#c8860a'}],
    slaNote:null,
    notes:['Confirmed Monday as the day he\'ll decide — call back then, don\'t let this go quiet.','Wants the 6-month no-cost EMI plan — have the paperwork ready.','Already compared with a competitor and preferred our warranty terms.'],
    problemBuckets:[
      {cat:'Financing Related', text:'Explicitly asked for the no-cost EMI plan — ready to commit if financing is confirmed'},
      {cat:'Warranty Related', text:'Compared warranty terms with a competitor and preferred ours — reinforce this on the call'}
    ],
    journey:[
      {date:'2 Jun',channel:'Store Visit',icon:'🏬',color:'#0f6e56',text:'Tried the chair in-store, asked detailed questions on massage programs'},
      {date:'4 Jun',channel:'Call',icon:'📞',color:'#185fa5',text:'6m 40s call — confirmed budget and asked about EMI'}
    ],
    phone:'+91 96543 21098',
    actions:'open'
  },
  {
    name:'Ritu S.', initials:'RS', avatarBg:'#fdf1e0', avatarColor:'#c2410c',
    interest:'Interested: Smart Luxe Mattress · ₹13,390',
    product:'Smart Luxe Mattress', crossSell:'Mattress Protector · ₹1,999', emi:'Not yet discussed — surface it early, she asked about total cost',
    attractivenessScore:96, expectedValue:13390,
    badge:'Hot lead', badgeBg:'#e1f5ee', badgeColor:'#0f6e56',
    statusLabel:'Open', statusColor:'#1d9e75',
    quoteOn:true,
    icp:94, icpColor:'#1d9e75',
    intentScore:96,
    subscores:[{label:'Budget Fit',pct:90,color:'#1d9e75'},{label:'Need Match',pct:88,color:'#1d9e75'},{label:'Decision Stage',pct:85,color:'#1d9e75'}],
    slaNote:null,
    notes:['Asked "how soon can this be delivered" — very high buying signal, close fast.','Already visited the RT Nagar store last week.','Has this lead in CRM from a prior visit — high expected value.'],
    problemBuckets:[
      {cat:'Quotation Demanded', text:'Asked for delivery timeline immediately — ready to commit once price is confirmed'}
    ],
    journey:[
      {date:'28 May',channel:'Store Visit',icon:'🏬',color:'#0f6e56',text:'Visited RT Nagar store, tried the Smart Luxe in person'},
      {date:'30 May',channel:'Missed Call',icon:'📵',color:'#e24b4a',text:'Called back after store visit, missed — needs a callback'}
    ],
    phone:'+91 98450 00001',
    actions:'open'
  },
  {
    name:'Divya P.', initials:'DP', avatarBg:'#f2f2f7', avatarColor:'#6b6b74',
    interest:'Browsing: Aura Executive Chair · ₹18,490',
    product:'Aura Executive Chair', crossSell:'Ergo Seat Cushion · ₹1,299', emi:'Not discussed — low priority to raise financing yet',
    attractivenessScore:38, expectedValue:18490,
    badge:'Low signal', badgeBg:'#f2f2f7', badgeColor:'#6b6b74',
    statusLabel:'Cold', statusColor:'#8e8e93',
    quoteOn:false,
    icp:34, icpColor:'#e24b4a',
    intentScore:38,
    subscores:[{label:'Budget Fit',pct:40,color:'#e24b4a'},{label:'Need Match',pct:35,color:'#e24b4a'},{label:'Decision Stage',pct:20,color:'#e24b4a'}],
    slaNote:null,
    notes:['Gave one-word replies on the last call — low engagement.',"Said she's \"just looking around\" — treat as low priority this week."],
    problemBuckets:[
      {cat:'In-Store Experience Needed', text:'Vague, non-committal answers — may need to see the product before engaging further'}
    ],
    journey:[
      {date:'1 Jun',channel:'Website',icon:'🌐',color:'#8e8e93',text:'Browsed chair category, no form filled'}
    ],
    phone:'+91 90000 44556',
    actions:'ageing'
  }
];
var LEADS_MODAL_DATA_HEALTH = [
  {
    name:'Mukunda', initials:'MK', avatarBg:'#e1f5ee', avatarColor:'#0f6e56',
    interest:'Post-discharge follow-up \u00b7 BP review',
    product:'Medication Adherence Check', crossSell:'Book BP review visit', emi:'Escalate to doctor if new symptoms reported',
    attractivenessScore:91, expectedValue:0,
    badge:'2h left', badgeBg:'#e1f5ee', badgeColor:'#0f6e56',
    statusLabel:'Open', statusColor:'#1d9e75',
    quoteOn:true,
    icp:87, icpColor:'#1d9e75',
    intentScore:91,
    subscores:[{label:'Medication Adherence',pct:87,color:'#1d9e75'},{label:'Symptom Risk',pct:72,color:'#c8860a'},{label:'Follow-up Urgency',pct:60,color:'#7c3aed'}],
    slaNote:null,
    notes:['Missed his last two medication reminders \u2014 confirm BP tablets are being taken as prescribed.','Ask about dizziness, swelling, or chest discomfort before ending the call.','Prefers evening calls, after 6pm.'],
    problemBuckets:[
      {cat:'Medication Adherence', text:'Missed his last two medication reminders \u2014 confirm BP tablets are being taken as prescribed since discharge'},
      {cat:'New Symptoms', text:'Not yet asked about dizziness, swelling, or chest discomfort this week'},
      {cat:'Follow-up Booking', text:'Hasn\'t booked his next BP review yet \u2014 offer a slot before ending the call'}
    ],
    journey:[
      {date:'18 May',channel:'Discharge',icon:'\ud83c\udfe5',color:'#0f6e56',text:'Discharged after BP admission \u2014 medication and follow-up plan shared'},
      {date:'20 May',channel:'Helpline Call',icon:'\ud83d\udcde',color:'#7c3aed',text:'Follow-up call \u2014 confirmed he collected his prescription'},
      {date:'24 May',channel:'WhatsApp',icon:'\ud83d\udcac',color:'#25D366',text:'Asked when his next review appointment should be'}
    ],
    phone:'+91 98765 43210',
    actions:'open'
  },
  {
    name:'Kavitha R.', initials:'KR', avatarBg:'#fff8e1', avatarColor:'#c8860a',
    interest:'Diabetes follow-up \u00b7 overdue',
    product:'Diabetes Follow-up Check', crossSell:'Book HbA1c retest', emi:'Escalate to endocrinology if readings stay high',
    attractivenessScore:63, expectedValue:0,
    badge:'+3d ageing', badgeBg:'#fff8e1', badgeColor:'#c8860a',
    statusLabel:'Ageing', statusColor:'#c8860a',
    quoteOn:false,
    icp:61, icpColor:'#c8860a',
    intentScore:63,
    subscores:[{label:'Medication Adherence',pct:61,color:'#c8860a'},{label:'Symptom Risk',pct:42,color:'#e24b4a'},{label:'Follow-up Urgency',pct:35,color:'#7c3aed'}],
    slaNote:'SLA missed \u2014 5 days grace left to close',
    notes:['Follow-up already overdue \u2014 open with an apology for the delay, not a routine reminder.','Home sugar-log readings not yet confirmed \u2014 check she\'s still logging daily.','Hasn\'t responded to the last 2 WhatsApp messages \u2014 try a call instead.'],
    problemBuckets:[
      {cat:'Follow-up Overdue', text:'Diabetes review is 2 weeks overdue \u2014 her last HbA1c reading was borderline high'},
      {cat:'Home Readings', text:'Hasn\'t confirmed she\'s still logging sugar levels at home \u2014 worth checking before the visit'},
      {cat:'Lab Work', text:'HbA1c retest not yet booked \u2014 get fresh numbers before her next review'}
    ],
    journey:[
      {date:'12 May',channel:'Ward Visit',icon:'\ud83c\udfe5',color:'#0f6e56',text:'Diabetes review \u2014 HbA1c came back borderline high'},
      {date:'15 May',channel:'Helpline Call',icon:'\ud83d\udcde',color:'#7c3aed',text:'Follow-up call \u2014 confirmed she understood the diet advice'},
      {date:'19 May',channel:'WhatsApp',icon:'\ud83d\udcac',color:'#25D366',text:'Asked to reschedule this week\'s check, went quiet since'}
    ],
    phone:'+91 97654 32109',
    actions:'ageing'
  }
];
var LEADS_MODAL_DATA = LEADS_MODAL_DATA_RETAIL;
var leadsModalIdx = 0;

function renderLeadsModalPage(){
  var d = LEADS_MODAL_DATA[leadsModalIdx];
  var sub = document.getElementById('leadsModalSub');
  if(sub) sub.textContent = 'Lead '+(leadsModalIdx+1)+' of '+LEADS_MODAL_DATA.length+' · SLA to close';

  var dots = document.getElementById('leadsPagerDots');
  if(dots){
    dots.innerHTML = LEADS_MODAL_DATA.map(function(_,i){
      return '<span style="display:inline-block;width:'+(i===leadsModalIdx?16:6)+'px;height:6px;border-radius:3px;background:'+(i===leadsModalIdx?'#6b2fa0':'#e5e5ea')+';transition:all .2s"></span>';
    }).join('');
  }
  var prevBtn = document.getElementById('leadsPrevBtn'), nextBtn = document.getElementById('leadsNextBtn');
  if(prevBtn) prevBtn.style.visibility = leadsModalIdx===0 ? 'hidden' : 'visible';
  if(nextBtn) nextBtn.style.visibility = leadsModalIdx===LEADS_MODAL_DATA.length-1 ? 'hidden' : 'visible';

  var subBars = d.subscores.map(function(s){
    return '<div style="margin-bottom:5px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px"><span style="font-size:12.5px;color:#555">'+s.label+'</span><span style="font-size:13.5px;font-weight:700;color:'+s.color+'">'+s.pct+'%</span></div><div style="height:4px;background:#e5e5ea;border-radius:2px;overflow:hidden"><div style="width:'+s.pct+'%;height:100%;background:'+s.color+';border-radius:2px"></div></div></div>';
  }).join('');

  var BUCKET_ICON = {'Quotation Demanded':'ti-file-invoice','Product Related':'ti-package','Financing Related':'ti-currency-rupee','Warranty Related':'ti-shield-check','In-Store Experience Needed':'ti-building-store'};
  var bucketsHtml = (d.problemBuckets||[]).map(function(b){
    return '<div class="problem-crit-row"><div class="problem-crit-name"><i class="ti '+(BUCKET_ICON[b.cat]||'ti-tag')+'" style="color:#c8860a;margin-right:5px"></i>'+b.cat+'</div><div class="problem-crit-snippet">'+b.text+'</div></div>';
  }).join('');

  var journeyHtml = (d.journey && d.journey.length) ? (
    '<div class="pid-timeline">'
    + d.journey.map(function(ev){
        return '<div class="pid-tl-item">'
          + '<div class="pid-tl-dot" style="background:'+ev.color+'">'+ev.icon+'</div>'
          + '<div class="pid-tl-date">'+ev.date+'<span class="pid-tl-channel">'+ev.channel+'</span></div>'
          + '<div class="pid-tl-text">'+ev.text+'</div>'
        + '</div>';
      }).join('')
    + '</div>'
  ) : '';

  var notesHtml = d.notes.map(function(n){ return '<div class="precall-note-item"><i class="ti ti-point-filled"></i>'+n+'</div>'; }).join('');

  var actionsHtml;
  if(d.actions==='open'){
    actionsHtml = '<div class="lead-action-row">'+
      '<button onclick="openNoInterestSheet(\''+d.name+'\')" style="flex:1;padding:7px;border:1px solid #e24b4a;border-radius:9px;font-size:13.5px;color:#e24b4a;background:#fff;cursor:pointer;font-weight:600">No Interest</button>'+
      '<button onclick="openWaLeadContact(\''+d.name+'\',\''+d.phone+'\')" style="flex:1;padding:7px;border:none;border-radius:9px;font-size:13.5px;color:#fff;background:#25D366;cursor:pointer;font-weight:600;display:flex;align-items:center;justify-content:center;gap:4px">'+WA_ICON_SVG+'WhatsApp</button>'+
      '<button class="og-call-btn" onclick="openOnGroundCallCheck(\''+d.name+'\',\''+d.phone+'\',\''+d.initials+'\')"><i class="ti ti-phone-call" style="font-size:15px"></i>On-ground Call</button>'+
      '<button onclick="openCameBackSheet(\''+d.name+'\')" style="flex:1;padding:7px;border:none;border-radius:9px;font-size:13.5px;color:#fff;background:#1d9e75;cursor:pointer;font-weight:600">Came Back ✓</button>'+
    '</div>';
  } else {
    actionsHtml = '<div class="lead-action-row">'+
      '<button style="flex:1;padding:7px;border:1px solid #e24b4a;border-radius:9px;font-size:13.5px;color:#e24b4a;background:#fff;cursor:pointer;font-weight:600">Close · No Sale</button>'+
      '<button onclick="openWaLeadContact(\''+d.name+'\',\''+d.phone+'\')" style="flex:1;padding:7px;border:none;border-radius:9px;font-size:13.5px;color:#fff;background:#25D366;cursor:pointer;font-weight:600;display:flex;align-items:center;justify-content:center;gap:4px">'+WA_ICON_SVG+'WhatsApp</button>'+
      '<button class="og-call-btn" onclick="openOnGroundCallCheck(\''+d.name+'\',\''+d.phone+'\',\''+d.initials+'\')"><i class="ti ti-phone-call" style="font-size:15px"></i>On-ground Call</button>'+
    '</div>';
  }

  document.getElementById('leadsModalPage').innerHTML =
    '<div style="display:flex;align-items:center;gap:6px;margin-bottom:10px"><span style="width:8px;height:8px;border-radius:50%;background:'+d.statusColor+'"></span><span style="font-size:12.5px;font-weight:700;color:'+d.statusColor+';text-transform:uppercase;letter-spacing:.5px">'+d.statusLabel+'</span></div>'+
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'+
      '<div style="width:36px;height:36px;border-radius:50%;background:'+d.avatarBg+';display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:'+d.avatarColor+'">'+d.initials+'</div>'+
      '<div style="flex:1"><div style="font-size:15.5px;font-weight:700;color:#1a1a1a">'+d.name+'</div><div style="font-size:13.5px;color:#6b6b74">'+d.interest+'</div></div>'+
      '<span style="font-size:12.5px;background:'+d.badgeBg+';color:'+d.badgeColor+';padding:2px 7px;border-radius:6px;font-weight:700">'+d.badge+'</span>'+
    '</div>'+
    '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;background:#fdf3e0;border:1px solid #f3dfa8;border-radius:9px;padding:6px 9px;margin-bottom:8px">'+
      '<span style="font-size:13px;color:#7c4a00;font-weight:600"><i class="ti ti-receipt" style="font-size:14.5px;vertical-align:-1px;margin-right:3px"></i>Quote to be given to customer</span>'+
      '<div class="toggle-sw'+(d.quoteOn?' on':'')+'" style="transform:scale(.62)" onclick="event.stopPropagation();this.classList.toggle(\'on\')"><div class="knob"></div></div>'+
    '</div>'+
    (d.slaNote ? '<div style="font-size:13.5px;color:#c8860a;background:#fff3cd;border-radius:7px;padding:5px 8px;margin-bottom:8px">'+d.slaNote+'</div>' : '')+
    '<div style="display:flex;align-items:center;gap:8px;padding:2px 0 8px">'+
      '<div style="font-size:12.5px;color:#555;font-weight:600">🎯 ICP</div>'+
      '<div style="flex:1;height:5px;background:#e5e5ea;border-radius:3px;overflow:hidden"><div style="width:'+d.icp+'%;height:100%;background:'+d.icpColor+';border-radius:3px"></div></div>'+
      '<div style="font-size:14.5px;font-weight:800;color:'+d.icpColor+';min-width:32px;text-align:right">'+d.icp+'%</div>'+
    '</div>'+
    (d.intentScore!==undefined ? '<div style="display:flex;align-items:center;gap:8px;background:'+(d.intentScore>=80?'#e1f5ee':d.intentScore>=55?'#fff3d6':'#fdecec')+';border-radius:9px;padding:7px 10px;margin-bottom:8px">'+
      '<span style="font-size:12.5px;font-weight:700;color:'+(d.intentScore>=80?'#0f6e56':d.intentScore>=55?'#c8860a':'#e24b4a')+'">🎯 Lead Intent Score</span>'+
      '<span style="margin-left:auto;font-size:15px;font-weight:800;color:'+(d.intentScore>=80?'#0f6e56':d.intentScore>=55?'#c8860a':'#e24b4a')+'">'+d.intentScore+'</span>'+
    '</div>' : '')+
    '<div style="background:#f9f9f9;border-radius:10px;border:0.5px solid #e5e5ea;padding:8px 10px;margin-bottom:8px">'+
      '<div class="icp-fold-head" onclick="this.querySelector(\'.icp-fold-chev\').classList.toggle(\'open\');this.nextElementSibling.classList.toggle(\'open\')">'+
        '<div style="font-size:12.5px;font-weight:700;color:#6b6b74;text-transform:uppercase;letter-spacing:.4px">ICP Fit Breakdown</div>'+
        '<i class="ti ti-chevron-right icp-fold-chev"></i>'+
      '</div>'+
      '<div class="icp-fold-body">'+
        '<div style="padding-top:8px">'+subBars+'</div>'+
      '</div>'+
    '</div>'+
    (journeyHtml ? '<div style="background:#faf8ff;border-radius:10px;border:0.5px solid #ece2fb;padding:8px 10px;margin-bottom:8px">'+
      '<div class="icp-fold-head" onclick="this.querySelector(\'.icp-fold-chev\').classList.toggle(\'open\');this.nextElementSibling.classList.toggle(\'open\')">'+
        '<div style="font-size:12.5px;font-weight:700;color:#6d28d9;text-transform:uppercase;letter-spacing:.4px"><i class="ti ti-route" style="margin-right:4px"></i>How we got here</div>'+
        '<i class="ti ti-chevron-right icp-fold-chev"></i>'+
      '</div>'+
      '<div class="icp-fold-body">'+
        '<div style="padding-top:8px">'+journeyHtml+'</div>'+
      '</div>'+
    '</div>' : '')+
    (bucketsHtml ? '<div style="background:#fef6ec;border-radius:10px;border:0.5px solid #f5cf94;padding:8px 10px;margin-bottom:8px">'+
      '<div class="icp-fold-head open" onclick="this.querySelector(\'.icp-fold-chev\').classList.toggle(\'open\');this.nextElementSibling.classList.toggle(\'open\')">'+
        '<div style="font-size:12.5px;font-weight:700;color:#7c4a00;text-transform:uppercase;letter-spacing:.4px">📋 Where we picked up signals</div>'+
        '<i class="ti ti-chevron-right icp-fold-chev open"></i>'+
      '</div>'+
      '<div class="icp-fold-body open">'+
        '<div style="padding-top:8px">'+bucketsHtml+'</div>'+
      '</div>'+
    '</div>' : '')+
    '<div class="precall-notes" style="margin-bottom:10px">'+
      '<div class="precall-notes-head"><i class="ti ti-notes"></i>Before you reach out</div>'+
      notesHtml+
    '</div>'+
    actionsHtml;
}

function leadsModalNav(dir){
  leadsModalIdx = Math.max(0, Math.min(LEADS_MODAL_DATA.length-1, leadsModalIdx+dir));
  renderLeadsModalPage();
}

function openLeadsModal() { leadsModalIdx = 0; renderLeadsModalPage(); document.getElementById('leadsOverlay').classList.add('show'); }
function closeLeadsModal() { document.getElementById('leadsOverlay').classList.remove('show'); }

// ───────────────── On-ground Call: Lead SOP checklist before the call connects ─────────────────
var LEAD_SOP_CHECK_DATA_RETAIL = {
  'Mukunda': {
    initials: 'MK', phone: '+91 98765 43210',
    product: {
      emoji:'🛏️', name:'Smart Ortho GRID Mattress', price:'₹8,490', orig:'₹14,490',
      why:'Highest-intent product in this thread and he\'s price-sensitive — lead with GRID technology and value, not the luxury range.',
      pitch:'"Since back support and budget both matter here, the Ortho GRID is built exactly for that — GRID tech for spinal alignment, and it\'s ₹6,000 lighter on the wallet than the Hybrid, with the same 10-year warranty and 100-night trial."',
      cross: {emoji:'💊', name:'Smart Pillow · ₹1,499', line:'"Pair it with our Smart Pillow — it aligns the neck the same way the GRID aligns the spine. Most Ortho GRID buyers add it at checkout."'},
      emi: {plan:'12-month zero-interest EMI', monthly:'₹708/mo', line:'"That\'s just ₹708 a month, zero interest — lock today\'s price before the offer ends."'}
    },
    items: [
      {title:'Quotation Demanded', sub:'Asked for pricing / EMI breakdown on the Ortho GRID', hit:true},
      {title:'Financing Related', sub:'Price-sensitive, compared with a competitor — lead with the 12-month zero-interest plan', hit:true},
      {title:'Product Related', sub:'No open questions on firmness or fit', hit:false},
      {title:'Warranty Related', sub:'Mention the 100-night trial proactively — reduces their risk', hit:true},
      {title:'In-Store Experience Needed', sub:'Hasn\'t asked to visit a store yet', hit:false}
    ]
  },
  'Kavitha R.': {
    initials: 'KR', phone: '+91 97654 32109',
    product: {
      emoji:'🛏️', name:'SmartGRID Hybrid Mattress', price:'₹24,990', orig:'₹34,990',
      why:'Already warm on the Hybrid from the last call — she needs confidence on financing, not a fresh pitch.',
      pitch:'"You were right to like the Hybrid — it\'s our best-rated for firmness plus pressure relief, and it comes with the same 10-year warranty and 100-night trial as every SmartGRID mattress."',
      cross: {emoji:'🛡️', name:'Mattress Protector · ₹1,999', line:'"I\'d also add the Mattress Protector — it keeps the warranty valid and protects the investment from day one."'},
      emi: {plan:'24-month zero-interest EMI', monthly:'₹1,041/mo', line:'"On 24-month EMI that\'s ₹1,041 a month — I can start it from next month so today\'s price is locked in."'}
    },
    items: [
      {title:'Quotation Demanded', sub:'No open pricing question right now', hit:false},
      {title:'Financing Related', sub:'Budget concern flagged early in the conversation', hit:true},
      {title:'Product Related', sub:'Undecided between SmartGRID Hybrid and a firmer option — confirm fit before pushing', hit:true},
      {title:'Warranty Related', sub:'No open question', hit:false},
      {title:'In-Store Experience Needed', sub:'SLA already missed — open with an apology, not a pitch', hit:true}
    ]
  }
};
var LEAD_SOP_CHECK_DATA_HEALTH = {
  'Mukunda': {
    initials: 'MK', phone: '+91 98765 43210',
    items: [
      {title:'Medication Adherence', sub:'Confirm BP tablets taken as prescribed since discharge', hit:true},
      {title:'New Symptoms', sub:'Ask about dizziness, swelling, or chest discomfort', hit:true},
      {title:'Follow-up Booking', sub:'Hasn\'t booked next BP review yet', hit:true},
      {title:'Insurance / Billing', sub:'No open query on this', hit:false},
      {title:'Escalation Needed', sub:'Flag to doctor only if new symptoms reported', hit:false}
    ]
  },
  'Kavitha R.': {
    initials: 'KR', phone: '+91 97654 32109',
    items: [
      {title:'Follow-up Overdue', sub:'Diabetes review is 2 weeks overdue', hit:true},
      {title:'Home Readings', sub:'Confirm she has been logging sugar levels at home', hit:true},
      {title:'Lab Work', sub:'HbA1c retest not yet booked', hit:true},
      {title:'Medication Change', sub:'No open question on current dosage', hit:false},
      {title:'In-Person Visit Needed', sub:'SLA already missed — open with an apology, not a routine reminder', hit:true}
    ]
  }
};
var LEAD_SOP_CHECK_DATA = LEAD_SOP_CHECK_DATA_RETAIL;
var onGroundCallPending = null;
window.openOnGroundCallCheck = function(name, phone, initials){
  var data = LEAD_SOP_CHECK_DATA[name];
  var isHealth = (CURRENT_VERTICAL === 'healthcare');
  closeLeadsModal();
  onGroundCallPending = {name: name, phone: phone};
  document.getElementById('sopCheckAv').textContent = initials || (data ? data.initials : '');
  document.getElementById('sopCheckName').textContent = 'Before you call ' + name;
  var body = document.getElementById('sopCheckBody');
  if(data){
    var pcHtml = '';
    if(data.product){
      var p = data.product;
      pcHtml = '<div class="pc-card">'
        + '<div class="pc-head"><div class="pc-emoji">' + p.emoji + '</div><div class="pc-head-text"><div class="pc-eyebrow">'+(isHealth?'Reason for follow-up':'Product to champion')+'</div><div class="pc-name">' + p.name + '</div><div class="pc-price">' + p.price + (p.orig ? '<s>' + p.orig + '</s>' : '') + '</div></div></div>'
        + '<div class="pc-body">'
        + '<div class="pc-why"><i class="ti ti-target-arrow" style="font-size:14.5px;margin-top:1px;flex-shrink:0"></i><span>' + p.why + '</span></div>'
        + '<div class="pc-block"><div class="pc-block-label"><i class="ti ti-message-circle" style="font-size:14px"></i>'+(isHealth?'What to say':'Pitching language')+'</div><div class="pc-quote">' + p.pitch + '</div></div>'
        + '<div class="pc-block"><div class="pc-chip-row">'
        + '<div class="pc-chip"><div class="pc-chip-title">' + p.cross.emoji + ' '+(isHealth?'Next step':'Cross-sell')+'</div><div class="pc-chip-sub">' + p.cross.name + '</div><div class="pc-chip-sub" style="margin-top:4px;font-style:italic">' + p.cross.line + '</div></div>'
        + '<div class="pc-chip"><div class="pc-chip-title"><i class="ti '+(isHealth?'ti-alert-circle':'ti-credit-card')+'" style="font-size:14.5px;color:#0f6e56"></i> '+(isHealth?'Escalation':'Ideal EMI')+'</div><div class="pc-emi-num">' + p.emi.monthly + '</div><div class="pc-chip-sub">' + p.emi.plan + '</div></div>'
        + '</div></div>'
        + '</div></div>'
        + '<div class="sop-divider">'+(isHealth?'Patient SOP checkpoints':'Lead SOP checkpoints')+'</div>';
    }
    body.innerHTML = pcHtml + data.items.map(function(it){
      return '<div class="sop-check-item' + (it.hit ? ' hit' : '') + '">'
        + '<div class="sop-check-icon"><i class="ti ' + (it.hit ? 'ti-flag-filled' : 'ti-minus') + '" style="font-size:14.5px"></i></div>'
        + '<div><div class="sop-check-title">' + it.title + (it.hit ? ' <span style="color:#c8860a;font-size:12.5px;font-weight:800">· relevant here</span>' : '') + '</div>'
        + '<div class="sop-check-sub">' + it.sub + '</div></div></div>';
    }).join('');
  } else {
    body.innerHTML = '<div class="sop-check-sub">'+(isHealth?'No Patient SOP signals recorded yet for this patient.':'No Lead SOP signals recorded yet for this lead.')+'</div>';
  }
  document.getElementById('onGroundSopOverlay').classList.add('show');
};
window.closeOnGroundSop = function(){
  document.getElementById('onGroundSopOverlay').classList.remove('show');
  onGroundCallPending = null;
};
window.proceedOnGroundCall = function(){
  var btn = document.getElementById('sopCheckProceedBtn');
  var pending = onGroundCallPending;
  btn.disabled = true;
  btn.innerHTML = '<i class="ti ti-loader-2"></i>Connecting via On-ground…';
  setTimeout(function(){
    document.getElementById('onGroundSopOverlay').classList.remove('show');
    btn.disabled = false;
    btn.innerHTML = '<i class="ti ti-phone-outgoing"></i>Skip · Place the call';
    if(pending && pending.phone){ window.location.href = 'tel:' + pending.phone.replace(/\s+/g,''); }
  }, 700);
};
// Catalog quote bar
function closeQuoteBar() { var _cqb2=document.getElementById('catalogQuoteBar');if(_cqb2)_cqb2.style.display='none'; }
// Show quote bar when conversation saved
var _origShowMotivToast = showMotivToast;
// SOP map advance
var sopCurrentIdx = 0;
var SOP_STEPS_RETAIL = ['Greet Customer','Probe Needs','Showcase Product','Pitch EMI','Pitch Warranty','Cross-sell','Capture Lead'];
var SOP_STEPS_HEALTH = ['Greet Patient','Verify Identity','Understand Query','Check Records','Resolve / Book Appointment','Confirm Next Steps','Document Call'];
var sopSteps = SOP_STEPS_RETAIL;
var sopWidths = ['14%','28%','43%','57%','71%','86%','100%'];
function sopStep(idx) {
  sopCurrentIdx = idx;
  var fill = document.getElementById('sopRoadFill');
  if (fill) fill.style.width = sopWidths[idx];
  for (var i=0;i<7;i++) {
    var dot = document.getElementById('sm'+i);
    if (!dot) continue;
    if (i < idx) {
      dot.style.background = '#1d9e75'; dot.style.borderColor='#5dcaa5';
      dot.innerHTML = '<i class="ti ti-check" style="font-size:12.5px;color:#fff"></i>';
    } else if (i === idx) {
      dot.style.background = '#FFD700'; dot.style.borderColor='#FFD700';
    } else {
      dot.style.background = 'rgba(255,255,255,.1)'; dot.style.borderColor='rgba(255,255,255,.2)';
    }
  }
  var lbl = document.getElementById('sopCurrentStep');
  if (lbl) lbl.textContent = sopSteps[idx]||'';
  var next = document.getElementById('sopNextLabel');
  if (next && sopSteps[idx+1]) next.innerHTML = '▶ Next: <span style="color:#FFD700;font-weight:600">'+sopSteps[idx+1]+'</span>';
  else if (next) next.innerHTML = '✅ <span style="color:#5dcaa5;font-weight:600">All milestones done!</span>';
}
// SOP auto-advance integrated into toggleAndRec
var sopAutoInt = null;

var currentTab='dash';
/* Dialer screen — quick dial from leads, recent call log, active-call simulation, and a real keypad. */
var DIALER_RECENT_CALLS = [
  {dir:'in', name:'Mukunda R.', time:'10:42 AM', duration:'4m 12s'},
  {dir:'out', name:'Kavitha R.', time:'Yesterday', duration:'2m 05s'},
  {dir:'missed', name:'Unknown', time:'Yesterday', duration:'—'},
  {dir:'missed', name:'Ritu S.', time:'Today 11:20 AM', duration:'—'},
  {dir:'missed', name:'Faizan A.', time:'Today 10:05 AM', duration:'—'},
  {dir:'missed', name:'Kavitha R.', time:'Yesterday 4:40 PM', duration:'—'},
  {dir:'missed', name:'Divya P.', time:'Yesterday 2:15 PM', duration:'—'},
  {dir:'out', name:'Faizan A.', time:'Mon', duration:'6m 40s'}
];
// ───────────────── Planner: Incoming (missed calls, ranked by expected value) ─────────────────
function renderPlanIncoming(){
  var box = document.getElementById('planIncomingList'); if(!box) return;
  var summaryBox = document.getElementById('planIncomingSummary');
  var missed = DIALER_RECENT_CALLS.filter(function(c){ return c.dir==='missed'; }).map(function(c){
    var lead = LEADS_MODAL_DATA.filter(function(l){ return c.name && c.name.indexOf(l.name)===0; })[0];
    return {call:c, lead:lead, value: lead ? (lead.expectedValue||0) : 0};
  }).sort(function(a,b){ return b.value - a.value; });
  if(!missed.length){
    if(summaryBox) summaryBox.style.display = 'none';
    box.innerHTML = '<div style="text-align:center;padding:26px 14px;color:#a8a8ad"><div style="font-size:28px;margin-bottom:6px">✅</div><div style="font-size:14.5px;font-weight:700;color:#6b6b74">No missed calls</div></div>';
    return;
  }
  if(summaryBox){
    var totalValue = missed.reduce(function(s,m){ return s + m.value; }, 0);
    summaryBox.style.display = 'flex';
    summaryBox.innerHTML = '<div><div style="font-size:19px;font-weight:800;color:#1a1a1a">'+missed.length+'</div><div style="font-size:12px;color:#8e8e93;font-weight:700;text-transform:uppercase">Missed today</div></div>'
      + '<div style="width:1px;height:28px;background:#ece7fa"></div>'
      + '<div><div style="font-size:19px;font-weight:800;color:#0f6e56">₹'+totalValue.toLocaleString('en-IN')+'</div><div style="font-size:12px;color:#8e8e93;font-weight:700;text-transform:uppercase">Expected value at stake</div></div>';
  }
  box.innerHTML = missed.map(function(m){
    var c = m.call, l = m.lead;
    var valueTag = l ? '₹'+l.expectedValue.toLocaleString('en-IN')+' expected' : 'New contact';
    var signalTag = l ? (l.icp>=80 ? 'Visited store / in CRM' : (l.icp>=55?'Warm lead':'Cold lead')) : 'No prior record';
    return '<div class="plan-row"><div class="plan-row-head" style="cursor:default">'
      + '<div style="width:36px;height:36px;border-radius:50%;background:#fdecec;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti ti-phone-x" style="font-size:16px;color:#e24b4a"></i></div>'
      + '<div style="flex:1;min-width:0"><div style="font-size:14.5px;font-weight:700;color:#1a1a1a">'+(c.name||'Unknown')+'</div><div style="font-size:12.5px;color:#8e8e93">Missed '+c.time+' · '+signalTag+'</div></div>'
      + '<div style="text-align:right;flex-shrink:0">'
      +   '<div style="font-size:13.5px;font-weight:800;color:'+(l?'#0f6e56':'#8e8e93')+'">'+valueTag+'</div>'
      +   '<button onclick="planPlaceCall(\''+(c.name||'').replace(/'/g,"\'")+'\')" style="margin-top:4px;font-size:12.5px;font-weight:700;color:#fff;background:#0f6e56;border:none;border-radius:7px;padding:4px 9px;cursor:pointer"><i class="ti ti-phone" style="font-size:12px;margin-right:3px"></i>Call back</button>'
      + '</div>'
    + '</div></div>';
  }).join('');
}

// ───────────────── Planner: Outgoing (planned calls, ranked by lead attractiveness, paginated) ─────────────────
var planOutgoingPage = 0, planOutgoingExpanded = null;
var PLAN_OUTGOING_PER_PAGE = 2;
function planOutgoingLeads(){
  return LEADS_MODAL_DATA.filter(function(l){ return l.actions==='open' || l.actions==='ageing'; })
    .slice().sort(function(a,b){ return (b.attractivenessScore||0) - (a.attractivenessScore||0); });
}
function renderPlanOutgoing(){
  var box = document.getElementById('planOutgoingList'); if(!box) return;
  var leads = planOutgoingLeads();
  var totalPages = Math.max(1, Math.ceil(leads.length / PLAN_OUTGOING_PER_PAGE));
  planOutgoingPage = Math.max(0, Math.min(planOutgoingPage, totalPages-1));
  var pageLeads = leads.slice(planOutgoingPage*PLAN_OUTGOING_PER_PAGE, planOutgoingPage*PLAN_OUTGOING_PER_PAGE + PLAN_OUTGOING_PER_PAGE);
  box.innerHTML = pageLeads.map(function(l){
    var idx = leads.indexOf(l);
    var expanded = planOutgoingExpanded === idx;
    var scoreColor = l.attractivenessScore>=80 ? '#0f6e56' : l.attractivenessScore>=55 ? '#c8860a' : '#e24b4a';
    var head = '<div class="plan-row-head" onclick="planOutgoingToggle('+idx+')">'
      + '<div style="width:36px;height:36px;border-radius:50%;background:'+l.avatarBg+';color:'+l.avatarColor+';font-size:14.5px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+l.initials+'</div>'
      + '<div style="flex:1;min-width:0"><div style="font-size:14.5px;font-weight:700;color:#1a1a1a">'+l.name+'</div><div style="font-size:12.5px;color:#8e8e93">'+l.interest+'</div></div>'
      + '<div style="text-align:right;flex-shrink:0"><div style="font-size:14.5px;font-weight:800;color:'+scoreColor+'">'+l.attractivenessScore+'</div><div style="font-size:11px;color:#a8a8ad;text-transform:uppercase">score</div></div>'
      + '<i class="ti '+(expanded?'ti-chevron-up':'ti-chevron-down')+'" style="font-size:15px;color:#c5c5c5;margin-left:4px;flex-shrink:0"></i>'
    + '</div>';
    var detail = '';
    if(expanded){
      var storySummary = (l.journey||[]).map(function(j){ return j.text; }).join(' → ');
      detail = '<div class="plan-row-detail">'
        + '<div style="font-size:12.5px;font-weight:800;color:#8e8e93;text-transform:uppercase;letter-spacing:.4px;margin:10px 0 4px">Story so far</div>'
        + '<div style="font-size:13.5px;color:#3a3a42;line-height:1.5">'+(storySummary||'No prior journey logged yet.')+'</div>'
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">'
        +   '<div style="background:#f7f7f9;border-radius:9px;padding:8px 10px"><div style="font-size:11px;font-weight:800;color:#8e8e93;text-transform:uppercase">Preferred product</div><div style="font-size:13px;font-weight:700;color:#1a1a1a;margin-top:2px">'+(l.product||'—')+'</div></div>'
        +   '<div style="background:#f7f7f9;border-radius:9px;padding:8px 10px"><div style="font-size:11px;font-weight:800;color:#8e8e93;text-transform:uppercase">Cross-sell</div><div style="font-size:13px;font-weight:700;color:#1a1a1a;margin-top:2px">'+(l.crossSell||'—')+'</div></div>'
        + '</div>'
        + '<div style="background:#fff8e1;border:1px solid #f5cf94;border-radius:9px;padding:8px 10px;margin-top:8px"><div style="font-size:11px;font-weight:800;color:#a16207;text-transform:uppercase">EMI / financing</div><div style="font-size:13px;color:#7c4a00;margin-top:2px">'+(l.emi||'Not discussed yet')+'</div></div>'
        + '<button onclick="planPlaceCall(\''+l.name.replace(/'/g,"\'")+'\')" style="width:100%;margin-top:12px;padding:11px;border:none;border-radius:10px;font-size:14.5px;font-weight:700;color:#fff;background:#0f6e56;cursor:pointer"><i class="ti ti-phone" style="font-size:15px;vertical-align:-2px;margin-right:5px"></i>Place call</button>'
      + '</div>';
    }
    return '<div class="plan-row">'+head+detail+'</div>';
  }).join('');
  var pager = document.getElementById('planOutgoingPager');
  if(pager){
    pager.innerHTML = '<button onclick="planOutgoingNav(-1)" '+(planOutgoingPage===0?'disabled':'')+' style="width:30px;height:30px;border-radius:50%;border:1px solid #e5e5ea;background:#fff;cursor:pointer;opacity:'+(planOutgoingPage===0?'.4':'1')+'"><i class="ti ti-chevron-left" style="font-size:15px"></i></button>'
      + '<span style="font-size:12.5px;font-weight:700;color:#6b6b74">Page '+(planOutgoingPage+1)+' of '+totalPages+'</span>'
      + '<button onclick="planOutgoingNav(1)" '+(planOutgoingPage>=totalPages-1?'disabled':'')+' style="width:30px;height:30px;border-radius:50%;border:1px solid #e5e5ea;background:#fff;cursor:pointer;opacity:'+(planOutgoingPage>=totalPages-1?'.4':'1')+'"><i class="ti ti-chevron-right" style="font-size:15px"></i></button>';
  }
}
window.planOutgoingToggle = function(idx){ planOutgoingExpanded = (planOutgoingExpanded===idx) ? null : idx; renderPlanOutgoing(); };
window.planOutgoingNav = function(dir){ planOutgoingPage += dir; planOutgoingExpanded = null; renderPlanOutgoing(); };
window.planPlaceCall = function(name){ dialerStartCall(name); var av=document.getElementById('dialerActiveCall'); if(av) av.scrollIntoView({behavior:'smooth',block:'start'}); };

// ───────────────── Planner: Recent calls (tap to review vs SOP) ─────────────────
function renderPlanRecent(){
  var box = document.getElementById('planRecentList'); if(!box) return;
  var iconMap = {in:{icon:'ti-phone-incoming',color:'#0f6e56',bg:'#e1f5ee'},out:{icon:'ti-phone-outgoing',color:'#185fa5',bg:'#e8f0fe'},missed:{icon:'ti-phone-x',color:'#e24b4a',bg:'#fdecec'}};
  box.innerHTML = DIALER_RECENT_CALLS.map(function(c,i){
    var m = iconMap[c.dir] || iconMap.out;
    var outcomeTag = c.outcome ? '<span style="font-size:12.5px;font-weight:700;color:#0f6e56;background:#e1f5ee;padding:1px 6px;border-radius:6px;margin-left:6px;white-space:nowrap;display:inline-block">'+c.outcome+'</span>' : '';
    return '<div class="plan-row"><div class="plan-row-head" onclick="openCallSopReview('+i+')">'
      + '<div style="width:36px;height:36px;border-radius:50%;background:'+m.bg+';display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti '+m.icon+'" style="font-size:16px;color:'+m.color+'"></i></div>'
      + '<div style="flex:1;min-width:0"><div style="font-size:14.5px;font-weight:700;color:#1a1a1a;display:flex;align-items:center;flex-wrap:wrap;gap:2px">'+c.name+outcomeTag+'</div><div style="font-size:12.5px;color:#8e8e93">'+c.time+' · '+c.duration+'</div></div>'
      + '<i class="ti ti-chevron-right" style="font-size:15px;color:#c5c5c5;flex-shrink:0"></i>'
    + '</div></div>';
  }).join('');
}

// ───────────────── Call SOP review — mirrors the manager's Calling Channel Analysis script-adherence
// items (Settings → Customer Growth Preferences → SOP Template Questions, Call Centre channel),
// scored against this specific recent call. ─────────────────
var CALL_SOP_ITEMS = [
  {label:'Opening & Intent Confirm'},
  {label:'Needs Discovery'},
  {label:'Product Pitch'},
  {label:'EMI / Financing Mention'},
  {label:'Warranty Mention'},
  {label:'Closing / Callback Booking'}
];
var SOP_REVIEW_TEMPLATES = [
  [true,true,true,true,false,true],
  [true,true,false,true,false,false],
  [true,false,true,false,false,true],
  [true,true,true,false,true,true]
];
// Evidence lines — short transcript-style quotes justifying each pass/fail, so the review reads as
// backed by what was actually said on the call rather than an unexplained checkmark.
var SOP_REVIEW_EVIDENCE = [
  [
    '"This is Aditi calling from The Sleep Company, is now an okay time?"',
    '"Can I ask what matters most to you — firmness or price?"',
    '"The GRID layer gives pressure relief exactly where you need it."',
    '"We do have a 6-month no-cost EMI plan if that helps."',
    'No mention of the warranty period anywhere in the call.',
    '"I\'ll send the quote over and follow up Thursday, does that work?"'
  ],
  [
    '"Hi, calling about your enquiry — good time to talk?"',
    '"So tell me, what are you looking for exactly?"',
    'Jumped to price before confirming the customer\'s actual need.',
    '"There\'s an EMI option starting at ₹1,200/month."',
    'No warranty details were shared.',
    'Call ended without confirming a next step or callback time.'
  ],
  [
    '"This is Aditi, is this an alright time to talk?"',
    'Moved straight to pitching without asking what the customer needs.',
    '"This model is our best-seller for back support."',
    'EMI never came up even though the customer asked about total cost.',
    'No warranty mention.',
    '"I\'ll note this down and call you back tomorrow at the same time."'
  ],
  [
    '"Hello, this is Aditi from The Sleep Company."',
    '"What\'s brought this on — any specific concern with sleep or back pain?"',
    '"Given what you described, the Ortho GRID would be the right fit."',
    'Customer asked about payment plans but it wasn\'t addressed on the call.',
    '"It comes with a 10-year warranty, so you\'re covered either way."',
    '"Let\'s lock in delivery for this Friday, I\'ll send the confirmation."'
  ]
];
function getCallSopResults(idx){
  var t = SOP_REVIEW_TEMPLATES[idx % SOP_REVIEW_TEMPLATES.length];
  var ev = SOP_REVIEW_EVIDENCE[idx % SOP_REVIEW_EVIDENCE.length];
  return CALL_SOP_ITEMS.map(function(item,i){ return {label:item.label, pass:t[i], evidence:ev[i]}; });
}
window.openCallSopReview = function(idx){
  var call = DIALER_RECENT_CALLS[idx]; if(!call) return;
  document.getElementById('sopReviewName').textContent = 'Call with '+call.name;
  document.getElementById('sopReviewMeta').textContent = call.time+' · '+call.duration;
  var results = getCallSopResults(idx);
  var passCount = results.filter(function(r){ return r.pass; }).length;
  var pct = Math.round(100*passCount/results.length);
  var color = pct>=80?'#0f6e56':pct>=50?'#c8860a':'#e24b4a';
  document.getElementById('sopReviewScoreBar').innerHTML =
    '<div style="flex:1"><div style="font-size:12.5px;font-weight:700;color:#6b6b74">SOP adherence on this call</div><div style="height:6px;background:#eee;border-radius:3px;margin-top:5px;overflow:hidden"><div style="width:'+pct+'%;height:100%;background:'+color+'"></div></div></div>'
    + '<div style="font-size:19px;font-weight:800;color:'+color+'">'+pct+'%</div>';
  document.getElementById('sopReviewList').innerHTML = results.map(function(r){
    return '<div style="padding:10px 0;border-bottom:1px solid #f2f2f5">'
      + '<div style="display:flex;align-items:center;gap:8px"><i class="ti '+(r.pass?'ti-check':'ti-x')+'" style="font-size:16px;color:'+(r.pass?'#1d9e75':'#e24b4a')+'"></i><span style="font-size:14px;color:#1a1a1a;font-weight:'+(r.pass?'500':'700')+'">'+r.label+'</span>'+(r.pass?'':'<span style="margin-left:auto;font-size:12px;font-weight:700;color:#e24b4a;background:#fdecec;padding:2px 6px;border-radius:6px">Missed</span>')+'</div>'
      + '<div style="font-size:12.5px;color:'+(r.pass?'#6b6b74':'#a3311f')+';margin:4px 0 0 23px;line-height:1.4;font-style:'+(r.pass?'italic':'normal')+'">'+r.evidence+'</div>'
    + '</div>';
  }).join('');
  document.getElementById('callSopOverlay').style.display = 'flex';
};
window.closeCallSopReview = function(){ document.getElementById('callSopOverlay').style.display = 'none'; };

// ───────────────── Planner sidebar switching + date label ─────────────────
window.planSubTab = function(tab){
  ['incoming','outgoing','recent'].forEach(function(t){
    var panel = document.getElementById('planPanel-'+t);
    if(panel) panel.style.display = (t===tab)?'block':'none';
    var btn = document.getElementById('plannav-'+t);
    if(btn) btn.classList.toggle('active', t===tab);
  });
  if(tab==='incoming') renderPlanIncoming();
  if(tab==='outgoing') renderPlanOutgoing();
  if(tab==='recent') renderPlanRecent();
};
function renderPlanDate(){
  var el = document.getElementById('planDateLabel'); if(!el) return;
  var d = new Date();
  el.textContent = d.toLocaleDateString('en-IN', {weekday:'short', day:'numeric', month:'short'});
}

var dialerNumber = '';
function renderDialerKeypad(){
  var grid = document.getElementById('dialerKeypadGrid'); if(!grid) return;
  var keys = ['1','2','3','4','5','6','7','8','9','*','0','#'];
  grid.innerHTML = keys.map(function(k){
    return '<button onclick="dialerKeyPress(\''+k+'\')" style="height:52px;border-radius:50%;background:#f2f2f7;border:none;font-size:19px;font-weight:600;color:#1a1a1a;cursor:pointer">'+k+'</button>';
  }).join('');
}
function dialerKeyPress(k){ dialerNumber += k; document.getElementById('dialerNumberDisplay').value = dialerNumber; }
function dialerToggleKeypad(){
  var sheet = document.getElementById('dialerKeypadSheet');
  sheet.style.display = (sheet.style.display === 'flex') ? 'none' : 'flex';
}
var dialerTimerInt = null, dialerSeconds = 0;
var _dialerCallDirection = 'out';
window.dialerStartCall = function(name, direction){
  _dialerCallDirection = direction || 'out';
  var keypadEl = document.getElementById('dialerKeypadSheet'); if(keypadEl) keypadEl.style.display = 'none';
  var nameEl = document.getElementById('dialerActiveName'); if(nameEl) nameEl.textContent = name || (dialerNumber || 'Unknown number');
  var activeEl = document.getElementById('dialerActiveCall'); if(activeEl) activeEl.style.display = 'block';
  dialerSeconds = 0;
  var timerEl = document.getElementById('dialerActiveTimer'); if(timerEl) timerEl.textContent = '00:00';
  if(dialerTimerInt) clearInterval(dialerTimerInt);
  dialerTimerInt = setInterval(function(){
    dialerSeconds++;
    var m = Math.floor(dialerSeconds/60), s = dialerSeconds%60;
    var t = document.getElementById('dialerActiveTimer'); if(t) t.textContent = (m<10?'0':'')+m+':'+(s<10?'0':'')+s;
  }, 1000);
  renderAiAssist(name);
  var assistCol = document.getElementById('dialerAiAssistCol'); if(assistCol) assistCol.style.display = 'block';
  startCallTranscript(name || dialerNumber || 'Unknown number');
  var panelsWrap = document.getElementById('planPanelsWrap'); if(panelsWrap) panelsWrap.style.display = 'none';
};
window.dialerSimulateIncoming = function(){
  var pool = ['Ritu S.','Lakshmi R.','Sameer Q.','Faizan A.'];
  var name = pool[Math.floor(Math.random()*pool.length)];
  var lead = LEADS_MODAL_DATA.filter(function(l){ return l.name===name; })[0];
  document.getElementById('dialerIncomingName').textContent = name;
  document.getElementById('dialerIncomingSub').textContent = '🎯 Intent '+((lead&&lead.intentScore)||'—')+' · calling from +91 98450 xxxxx';
  document.getElementById('dialerIncomingCall').style.display = 'block';
  window._dialerIncomingName = name;
};
window.dialerAcceptIncoming = function(){
  document.getElementById('dialerIncomingCall').style.display = 'none';
  dialerStartCall(window._dialerIncomingName || 'Unknown', 'in');
};
window.dialerDeclineIncoming = function(){
  document.getElementById('dialerIncomingCall').style.display = 'none';
};
window.dialerEndCall = function(){
  if(dialerTimerInt) clearInterval(dialerTimerInt);
  var nameEl = document.getElementById('dialerActiveName');
  var durEl = document.getElementById('dialerActiveTimer');
  var name = nameEl ? nameEl.textContent : 'Unknown';
  var duration = durEl ? durEl.textContent : '00:00';
  var activeEl = document.getElementById('dialerActiveCall'); if(activeEl) activeEl.style.display = 'none';
  var assistEl = document.getElementById('dialerAiAssist'); if(assistEl) assistEl.style.display = 'none';
  var assistColEl = document.getElementById('dialerAiAssistCol'); if(assistColEl) assistColEl.style.display = 'none';
  dialerNumber = '';
  var liveSummary = stopCallTranscript();
  var panelsWrap = document.getElementById('planPanelsWrap'); if(panelsWrap) panelsWrap.style.display = 'block';
  openCallWrapup(name, duration, liveSummary);
};
window.dialerToggleMute = function(el){ el.style.background = el.style.background === 'rgb(226, 75, 74)' ? 'rgba(255,255,255,.15)' : '#e24b4a'; };
window.dialerToggleHold = function(el){ el.style.background = el.style.background === 'rgb(200, 134, 10)' ? 'rgba(255,255,255,.15)' : '#c8860a'; };

// ───────────────── Live transcript + live SOP checklist + live-drafting summary — all grounded in the
// same script, so a nudge only appears when the call has genuinely gone a beat too long without hitting
// the next expected SOP item, never as a random pop-up. ─────────────────
var CALL_SOP_KEYS = ['opening','needs','pitch','financing','warranty','closing'];
var CALL_SOP_SCRIPTS = {
  'Mukunda': [
    {who:'agent', text:'Namaste! This is Aditi from The Sleep Company, calling about the Ortho GRID you enquired on — is now an okay time?', sop:'opening'},
    {who:'customer', text:'Yes, go ahead. I was actually comparing it with another brand.'},
    {who:'agent', text:'Totally fair — can I ask what mattered most in that comparison, firmness or price?', sop:'needs'},
    {who:'customer', text:'Mostly price, but also whether it actually helps with back pain.'},
    {who:'agent', text:'The GRID layer is built exactly for that — pressure relief along the spine, and most customers notice a difference within the first week.', sop:'pitch'},
    {who:'customer', text:'Okay, and if I wanted to pay it off over a few months?'}
  ],
  'Ritu S.': [
    {who:'agent', text:'Hi Ritu, this is Aditi — following up after your visit to our RT Nagar store on the Smart Luxe.', sop:'opening'},
    {who:'customer', text:'Yes! I loved it, was just checking how soon it could be delivered.'},
    {who:'agent', text:'Delivery inside the city is usually 2-3 days — can I check your address is still the one on file from the visit?', sop:'needs'},
    {who:'customer', text:'Yes, same address. What about the total cost with delivery?'},
    {who:'agent', text:'For the Smart Luxe it comes to ₹13,390 including free delivery and setup.', sop:'pitch'},
    {who:'customer', text:'That works for me, can we go ahead?'}
  ],
  'default': [
    {who:'agent', text:'Hello, this is Aditi calling from The Sleep Company — is this a good time to talk?', sop:'opening'},
    {who:'customer', text:'Sure, go ahead.'},
    {who:'agent', text:'Great — could you tell me a bit about what you\'re looking for, so I can point you to the right option?', sop:'needs'},
    {who:'customer', text:'I need something firm, I have some back pain.'},
    {who:'agent', text:'Understood — our Ortho GRID range is designed exactly for that kind of support.', sop:'pitch'},
    {who:'customer', text:'Sounds good, what does it cost?'}
  ]
};
var liveTranscriptTimer = null, liveTranscriptIdx = 0, liveTranscriptScript = [], liveSopDone = {}, liveSummaryParts = [], liveSentimentScore = 65, currentCallLead = null;
function scriptFor(name){
  var key = Object.keys(CALL_SOP_SCRIPTS).filter(function(k){ return k!=='default' && name && name.indexOf(k)===0; })[0];
  return CALL_SOP_SCRIPTS[key || 'default'];
}
function renderLiveSopChecklist(){
  var box = document.getElementById('liveSopChecklist'); if(!box) return;
  box.innerHTML = CALL_SOP_ITEMS.map(function(item, i){
    var key = CALL_SOP_KEYS[i];
    var done = !!liveSopDone[key];
    return '<span style="display:inline-flex;align-items:center;gap:4px;font-size:12.5px;font-weight:700;padding:5px 9px;border-radius:14px;background:'+(done?'#e1f5ee':'#f2f2f7')+';color:'+(done?'#0f6e56':'#8e8e93')+'"><i class="ti '+(done?'ti-check':'ti-point')+'" style="font-size:12.5px"></i>'+item.label+'</span>';
  }).join('');
}
function checkSopNudge(){
  var nudgeBox = document.getElementById('sopNudgeBox'); if(!nudgeBox) return;
  // Only nudge once we're past the pitch stage but financing/warranty haven't come up yet — a real off-SOP moment, not a timer gimmick
  if(liveSopDone.pitch && !liveSopDone.financing){
    nudgeBox.style.display = 'block';
    nudgeBox.innerHTML = '<div style="display:flex;gap:8px;align-items:flex-start"><i class="ti ti-alert-triangle" style="font-size:15px;color:#a16207;flex-shrink:0;margin-top:1px"></i><div><div style="font-size:12.5px;font-weight:800;color:#a16207;text-transform:uppercase;letter-spacing:.3px;margin-bottom:2px">Drifting off SOP</div><div style="font-size:13.5px;color:#7c4a00;line-height:1.45">EMI hasn\'t come up yet and the pitch is done — this customer responds well to financing options. Mention the no-cost EMI plan before moving to close.</div></div></div>';
  } else if(liveSopDone.financing && !liveSopDone.warranty){
    nudgeBox.style.display = 'block';
    nudgeBox.innerHTML = '<div style="display:flex;gap:8px;align-items:flex-start"><i class="ti ti-alert-triangle" style="font-size:15px;color:#a16207;flex-shrink:0;margin-top:1px"></i><div><div style="font-size:12.5px;font-weight:800;color:#a16207;text-transform:uppercase;letter-spacing:.3px;margin-bottom:2px">Drifting off SOP</div><div style="font-size:13.5px;color:#7c4a00;line-height:1.45">Warranty hasn\'t been mentioned — worth reinforcing the 10-year warranty to close the price conversation with confidence.</div></div></div>';
  } else {
    nudgeBox.style.display = 'none';
  }
}
function appendTranscriptLine(line){
  var box = document.getElementById('transcriptLines'); if(!box) return;
  var isAgent = line.who === 'agent';
  var row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;'+(isAgent?'':'flex-direction:row-reverse');
  row.innerHTML = '<div style="width:22px;height:22px;border-radius:50%;background:'+(isAgent?'#1d2a1f':'#2a3252')+';display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:'+(isAgent?'#5dcaa5':'#aab4dd')+';flex-shrink:0">'+(isAgent?'AR':'C')+'</div>'
    + '<div style="max-width:82%"><div style="font-size:11.5px;color:#6b7280;margin-bottom:2px;'+(isAgent?'':'text-align:right')+'">'+(isAgent?'You':'Customer')+'</div><div style="font-size:13.5px;line-height:1.45;color:#dcdad1;background:'+(isAgent?'#1a1f2b':'#1f2540')+';border-radius:'+(isAgent?'4px 12px 12px 12px':'12px 4px 12px 12px')+';padding:8px 11px">'+line.text+'</div></div>';
  box.appendChild(row);
  box.scrollTop = box.scrollHeight;
}
function startCallTranscript(name){
  stopCallTranscript();
  currentCallLead = LEADS_MODAL_DATA.filter(function(l){ return name && name.indexOf(l.name)===0; })[0];
  liveTranscriptScript = scriptFor(name);
  liveTranscriptIdx = 0;
  liveSopDone = {};
  liveSummaryParts = [];
  liveSentimentScore = currentCallLead ? Math.min(85, (currentCallLead.intentScore||60)) : 60;
  var linesEl = document.getElementById('transcriptLines'); if(linesEl) linesEl.innerHTML = '';
  var summaryEl = document.getElementById('liveSummaryBox'); if(summaryEl) summaryEl.innerHTML = '<span style="color:#a8a8ad">Building as the call progresses…</span>';
  var nudgeEl = document.getElementById('sopNudgeBox'); if(nudgeEl) nudgeEl.style.display = 'none';
  renderLiveSopChecklist();
  updateSentimentUI();
  var wrapEl = document.getElementById('dialerLiveTranscript'); if(wrapEl) wrapEl.style.display = 'block';
  if(liveTranscriptTimer) clearInterval(liveTranscriptTimer);
  liveTranscriptTimer = setInterval(advanceTranscript, 2600);
}
function advanceTranscript(){
  if(liveTranscriptIdx >= liveTranscriptScript.length){
    clearInterval(liveTranscriptTimer);
    liveTranscriptTimer = null;
    return;
  }
  var line = liveTranscriptScript[liveTranscriptIdx++];
  appendTranscriptLine(line);
  if(line.sop){
    liveSopDone[line.sop] = true;
    renderLiveSopChecklist();
    checkSopNudge();
  }
  if(line.who === 'agent'){
    liveSummaryParts.push(line.text.replace(/^(Namaste!?|Hi |Hello,?|Great —?)/i,'').trim());
    var summaryEl = document.getElementById('liveSummaryBox');
    if(summaryEl) summaryEl.textContent = liveSummaryParts.join(' ');
  } else {
    // customer lines nudge sentiment a little, biased by whether the call is on-SOP
    liveSentimentScore = Math.max(20, Math.min(97, liveSentimentScore + (liveSopDone.pitch ? 4 : 1)));
    updateSentimentUI();
  }
}
function updateSentimentUI(){
  var fill = document.getElementById('sentimentFill'), label = document.getElementById('sentimentLabel');
  if(!fill) return;
  var color = liveSentimentScore>=65?'#5dcaa5':liveSentimentScore>=40?'#e0b04a':'#e2694b';
  var text = liveSentimentScore>=65?'Positive':liveSentimentScore>=40?'Neutral':'Negative';
  fill.style.width = liveSentimentScore+'%';
  fill.style.background = color;
  if(label){ label.textContent = text; label.style.color = color; }
}
function stopCallTranscript(){
  if(liveTranscriptTimer){ clearInterval(liveTranscriptTimer); liveTranscriptTimer = null; }
  var box = document.getElementById('dialerLiveTranscript');
  if(box) box.style.display = 'none';
  return liveSummaryParts.length ? liveSummaryParts.join(' ') : null;
}

// ───────────────── Call wrap-up — AI-drafted summary + outcome tag, saved to Recent Calls and the lead's notes ─────────────────
var WRAPUP_OUTCOMES = [
  {key:'interested', label:'Interested', icon:'ti-thumb-up', color:'#0f6e56', bg:'#e1f5ee'},
  {key:'followup', label:'Follow-up needed', icon:'ti-calendar-event', color:'#c8860a', bg:'#fff3d6'},
  {key:'callback', label:'Requested callback', icon:'ti-phone-outgoing', color:'#185fa5', bg:'#e8f0fe'},
  {key:'resolved', label:'Resolved', icon:'ti-circle-check', color:'#1d9e75', bg:'#e1f5ee'},
  {key:'notinterested', label:'Not interested', icon:'ti-mood-sad', color:'#e24b4a', bg:'#fdecec'}
];
var wrapupState = {name:'', duration:'', outcome:'interested'};
function draftAiCallSummary(name, duration){
  var lead = LEADS_MODAL_DATA.filter(function(l){ return name && name.indexOf(l.name) === 0; })[0];
  if(!lead) return 'Spoke with '+(name||'the customer')+' for '+duration+'. No prior lead record on file — add notes manually if needed.';
  var bucket = (lead.problemBuckets && lead.problemBuckets[0]) ? lead.problemBuckets[0].text : lead.interest;
  return 'Discussed '+(lead.interest||'their enquiry').replace('Interested: ','')+'. '+bucket+'. Call lasted '+duration+'.';
}
window.openCallWrapup = function(name, duration, liveSummary){
  wrapupState = {name:name, duration:duration, outcome:'interested'};
  document.getElementById('wrapupName').textContent = 'Call with '+name;
  document.getElementById('wrapupMeta').textContent = duration+' · just now';
  document.getElementById('wrapupSummary').value = liveSummary || draftAiCallSummary(name, duration);
  document.getElementById('wrapupOutcomeRow').innerHTML = WRAPUP_OUTCOMES.map(function(o){
    var active = o.key === wrapupState.outcome;
    return '<div onclick="setWrapupOutcome(\''+o.key+'\',this)" style="display:flex;align-items:center;gap:5px;padding:7px 11px;border-radius:20px;font-size:12.5px;font-weight:700;cursor:pointer;border:1.5px solid '+(active?o.color:'#e5e5ea')+';background:'+(active?o.bg:'#fff')+';color:'+(active?o.color:'#555')+'"><i class="ti '+o.icon+'" style="font-size:13.5px"></i>'+o.label+'</div>';
  }).join('');
  document.getElementById('callWrapupOverlay').style.display = 'flex';
};
window.setWrapupOutcome = function(key, el){
  wrapupState.outcome = key;
  el.parentElement.querySelectorAll('div').forEach(function(d){ d.style.border='1.5px solid #e5e5ea'; d.style.background='#fff'; d.style.color='#555'; });
  var o = WRAPUP_OUTCOMES.filter(function(x){ return x.key===key; })[0];
  el.style.border = '1.5px solid '+o.color; el.style.background = o.bg; el.style.color = o.color;
};
window.saveCallWrapup = function(){
  var summary = document.getElementById('wrapupSummary').value.trim();
  var outcome = WRAPUP_OUTCOMES.filter(function(o){ return o.key===wrapupState.outcome; })[0];
  DIALER_RECENT_CALLS.unshift({dir:_dialerCallDirection, name:wrapupState.name, time:'Just now', duration:wrapupState.duration, outcome:outcome?outcome.label:null});
  var lead = LEADS_MODAL_DATA.filter(function(l){ return wrapupState.name && wrapupState.name.indexOf(l.name) === 0; })[0];
  if(lead && summary){ if(!lead.notes) lead.notes = []; lead.notes.unshift(summary+' ('+(outcome?outcome.label:'logged')+')'); }
  renderPlanRecent();
  document.getElementById('callWrapupOverlay').style.display = 'none';
  var closingChance = lead ? Math.round(lead.attractivenessScore || lead.intentScore || 50) : 50;
  var toast = document.createElement('div');
  toast.innerHTML = '<div style="display:flex;align-items:center;gap:6px;margin-bottom:2px"><i class="ti ti-circle-check" style="font-size:15px"></i><b>Nice work!</b> Saved to CRM — '+wrapupState.name+'</div>'
    + '<div style="font-size:12.5px;color:#9fe1cb;font-weight:600">🎯 Estimated chance of closing: '+closingChance+'%</div>';
  toast.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#0a1a14;color:#fff;font-size:13.5px;font-weight:700;padding:10px 16px;border-radius:16px;z-index:99999;box-shadow:0 6px 20px rgba(0,0,0,.25);text-align:center';
  document.body.appendChild(toast);
  setTimeout(function(){ toast.remove(); }, 3200);
};
window.skipCallWrapup = function(){
  DIALER_RECENT_CALLS.unshift({dir:_dialerCallDirection, name:wrapupState.name, time:'Just now', duration:wrapupState.duration});
  renderPlanRecent();
  document.getElementById('callWrapupOverlay').style.display = 'none';
};

// AI Assist — live suggested answer, quick replies, and case history alongside an active call (Nextiva-style AI fallback)
var AI_QUICK_REPLIES = ['Send price on WhatsApp','Offer callback slot','Explain warranty terms','Escalate to manager'];
var dialerActiveLeadName = null;
// Generic knowledge base for questions that aren't specific to the lead on the call — the search
// bar checks the lead's own notes/record first, then falls back to this.
var AI_ANSWER_KB = [
  {match:['return','refund','trial'], answer:'Every mattress comes with a 100-night home trial — full refund if it\'s not the right fit, no questions asked.'},
  {match:['warranty'], answer:'Standard warranty is 10 years against manufacturing defects, extendable on select models.'},
  {match:['deliver','shipping'], answer:'Delivery is 2–3 business days within city limits, up to 7 days elsewhere. Installation is included.'},
  {match:['emi','installment','installement','finance','financing'], answer:'We offer 0% interest EMI from 3 to 24 months depending on order value — no processing fee.'},
  {match:['discount','offer','coupon','code'], answer:'The price shown already reflects the best current offer — no additional codes stack on top of it.'},
  {match:['exchange','old mattress','pickup'], answer:'We pick up and recycle the old mattress free of charge on delivery of the new one, if requested at checkout.'}
];
window.aiAssistAsk = function(){
  var input = document.getElementById('aiAssistAskInput');
  var box = document.getElementById('aiAssistSuggested');
  if(!input || !box) return;
  var q = input.value.trim();
  if(!q) return;
  box.innerHTML = '<i class="ti ti-loader-2"></i> Searching the call &amp; product knowledge base…';
  setTimeout(function(){
    var qLower = q.toLowerCase();
    var answer = null;
    var lead = LEADS_MODAL_DATA.filter(function(l){ return l.name === dialerActiveLeadName; })[0];
    if(lead && lead.notes){
      var hit = lead.notes.filter(function(n){ return qLower.split(' ').some(function(w){ return w.length>3 && n.toLowerCase().indexOf(w)>-1; }); })[0];
      if(hit) answer = hit;
    }
    if(!answer){
      var kbHit = AI_ANSWER_KB.filter(function(k){ return k.match.some(function(m){ return qLower.indexOf(m)>-1; }); })[0];
      if(kbHit) answer = kbHit.answer;
    }
    if(!answer) answer = 'No direct match on this call or our product FAQs yet — try asking about warranty, EMI, delivery, returns, or exchange.';
    box.innerHTML = '<div style="font-size:12.5px;color:#8e8e93;margin-bottom:3px">"' + q + '"</div>💡 ' + answer;
    input.value = '';
  }, 550);
};
function renderAiAssist(name){
  var panel = document.getElementById('dialerAiAssist');
  if(!panel) return;
  dialerActiveLeadName = name;
  var lead = LEADS_MODAL_DATA.filter(function(l){ return l.name === name; })[0];
  var suggested = document.getElementById('aiAssistSuggested');
  var quick = document.getElementById('aiAssistQuickReplies');
  var history = document.getElementById('aiAssistCaseHistory');
  var gamifyStrip = document.getElementById('aiAssistGamifyStrip');
  if(lead && lead.notes && lead.notes.length){
    suggested.innerHTML = '💡 <b>Tip:</b> ' + lead.notes[0];
  } else {
    suggested.innerHTML = '💡 No prior notes on this caller yet — greet warmly and ask how you can help, or search a question above.';
  }
  quick.innerHTML = AI_QUICK_REPLIES.map(function(r){
    return '<span style="font-size:13px;font-weight:700;color:#4c1d95;background:#f1ecff;border:1px solid #ddc9fb;border-radius:16px;padding:6px 11px;cursor:pointer">'+r+'</span>';
  }).join('');

  // Product to Champion + lead-specific SOP checkpoints — synthesised down to the compact style
  // (icon+name+price, one-line why, cross-sell+EMI as a stat row, only relevant checkpoints) used
  // in the mobile app's "Before you call" screen. Falls back to building the same card straight
  // from this lead's own product/crossSell/emi/problemBuckets fields (already present on every
  // lead in LEADS_MODAL_DATA) when there's no hand-authored LEAD_SOP_CHECK_DATA entry for them —
  // so every caller gets a populated card, not just the couple of leads with bespoke data.
  var preCallBox = document.getElementById('aiAssistPreCall');
  if(preCallBox){
    var sopData = (typeof LEAD_SOP_CHECK_DATA !== 'undefined' && name) ? LEAD_SOP_CHECK_DATA[name] : null;
    var isHealthPc = (typeof CURRENT_VERTICAL !== 'undefined' && CURRENT_VERTICAL === 'healthcare');
    var pcHtml = '';
    if(sopData && sopData.product){
      var p = sopData.product;
      pcHtml += '<div style="display:flex;align-items:center;gap:9px;margin-bottom:9px">'
        + '<div style="font-size:24px;flex-shrink:0">' + p.emoji + '</div>'
        + '<div style="flex:1;min-width:0">'
        + '<div style="font-size:14.5px;font-weight:800;color:#1a1a1a">' + p.name + ' · ' + p.price + '</div>'
        + '<div style="font-size:12px;color:#8e8e93;line-height:1.35;margin-top:1px">' + p.why + '</div>'
        + '</div></div>'
        + '<div style="display:flex;gap:8px;margin-bottom:9px">'
        + '<div style="flex:1;background:#f7f7f9;border-radius:8px;padding:6px 9px"><div style="font-size:10px;font-weight:800;letter-spacing:.4px;color:#0f6e56;text-transform:uppercase;margin-bottom:1px">'+p.cross.emoji+' Cross-sell this</div><div style="font-size:13px;font-weight:700;color:#1a1a1a">' + p.cross.name + '</div></div>'
        + '<div style="flex:1;background:#f7f7f9;border-radius:8px;padding:6px 9px"><div style="font-size:10px;font-weight:800;letter-spacing:.4px;color:#0f6e56;text-transform:uppercase;margin-bottom:1px">'+(isHealthPc?'⚠️ Escalation':'💳 Offer this EMI')+'</div><div style="font-size:13px;font-weight:700;color:#1a1a1a">' + p.emi.monthly + '</div></div>'
        + '</div>';
      if(sopData.items){
        var hitItems = sopData.items.filter(function(it){ return it.hit; });
        if(hitItems.length){
          pcHtml += '<div style="display:flex;flex-wrap:wrap;gap:6px">' + hitItems.map(function(it){
            return '<span style="display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:700;color:#1a1a1a;background:#fff3d6;border-radius:12px;padding:4px 9px"><i class="ti ti-flag-filled" style="font-size:12px;color:#c8860a"></i>' + it.title + '</span>';
          }).join('') + '</div>';
        }
      }
    } else if(lead && lead.product){
      // Fallback: no bespoke LEAD_SOP_CHECK_DATA entry, but this lead's own record already has
      // product/crossSell/emi/problemBuckets — build the same compact card straight from those.
      pcHtml += '<div style="display:flex;align-items:center;gap:9px;margin-bottom:9px">'
        + '<div style="font-size:24px;flex-shrink:0">🛋️</div>'
        + '<div style="flex:1;min-width:0">'
        + '<div style="font-size:14.5px;font-weight:800;color:#1a1a1a">' + lead.product + (lead.expectedValue ? ' · ₹' + lead.expectedValue.toLocaleString('en-IN') : '') + '</div>'
        + '<div style="font-size:12px;color:#8e8e93;line-height:1.35;margin-top:1px">' + (lead.interest || 'Highest-intent product in this thread') + '</div>'
        + '</div></div>'
        + '<div style="display:flex;gap:8px;margin-bottom:9px">'
        + (lead.crossSell ? '<div style="flex:1;background:#f7f7f9;border-radius:8px;padding:6px 9px"><div style="font-size:10px;font-weight:800;letter-spacing:.4px;color:#0f6e56;text-transform:uppercase;margin-bottom:1px">🔁 Cross-sell this</div><div style="font-size:13px;font-weight:700;color:#1a1a1a">' + lead.crossSell + '</div></div>' : '')
        + (lead.emi ? '<div style="flex:1;background:#f7f7f9;border-radius:8px;padding:6px 9px"><div style="font-size:10px;font-weight:800;letter-spacing:.4px;color:#0f6e56;text-transform:uppercase;margin-bottom:1px">💳 EMI to offer</div><div style="font-size:13px;font-weight:700;color:#1a1a1a">' + lead.emi + '</div></div>' : '')
        + '</div>';
      if(lead.problemBuckets && lead.problemBuckets.length){
        pcHtml += '<div style="display:flex;flex-wrap:wrap;gap:6px">' + lead.problemBuckets.map(function(b){
          return '<span style="display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:700;color:#1a1a1a;background:#fff3d6;border-radius:12px;padding:4px 9px"><i class="ti ti-flag-filled" style="font-size:12px;color:#c8860a"></i>' + b.cat + '</span>';
        }).join('') + '</div>';
      }
    }
    preCallBox.innerHTML = pcHtml;
  }

  if(!lead){
    history.innerHTML = '<div style="font-size:14px;color:#8e8e93;padding:6px 0">First interaction — no prior record for this caller</div>';
    gamifyStrip.style.display = 'none';
    panel.style.display = 'block';
    return;
  }

  var priceMatchTop = (lead.interest||'').match(/₹[\d,]+/);
  document.getElementById('aiGamifyValue').textContent = priceMatchTop ? priceMatchTop[0] : '₹—';
  document.getElementById('aiGamifyPts').textContent = '+' + Math.round((lead.intentScore||50) / 12) + ' pts';
  document.getElementById('aiGamifyRank').textContent = '#' + Math.max(1, 3 - Math.floor(Math.round((lead.intentScore||50) / 12)/3));
  gamifyStrip.style.display = 'flex';

  // Expected value unlock — parsed from the lead's interest line (e.g. "Interested: Ortho GRID · ₹8,490")
  var priceMatch = (lead.interest||'').match(/₹[\d,]+/);
  var dealValue = priceMatch ? priceMatch[0] : '₹—';
  var ogPointsUnlock = Math.round((lead.intentScore||50) / 12); // illustrative — higher-intent closes are worth more to your score

  var html = '';

  // Intent summary
  html += '<div style="background:#f7f7fb;border-radius:12px;padding:11px 12px;margin-bottom:10px">';
  html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">';
  html += '<div style="width:30px;height:30px;border-radius:50%;background:conic-gradient('+(lead.icpColor||'#1d9e75')+' '+(lead.icp||0)+'%,#e5e5ea 0);display:flex;align-items:center;justify-content:center;flex-shrink:0"><div style="width:22px;height:22px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:'+(lead.icpColor||'#1d9e75')+'">'+(lead.icp||'—')+'</div></div>';
  html += '<div style="flex:1"><div style="font-size:14px;font-weight:700;color:#1a1a1a">Intent Score '+(lead.intentScore||'—')+'/100</div><div style="font-size:13px;color:#8e8e93">ICP fit '+(lead.icp||'—')+'%</div></div>';
  html += '</div>';
  if(lead.subscores){
    html += '<div style="display:flex;flex-direction:column;gap:5px">' + lead.subscores.map(function(s){
      return '<div style="display:flex;align-items:center;gap:7px"><span style="font-size:12.5px;color:#5c5c66;width:78px;flex-shrink:0">'+s.label+'</span><div style="flex:1;height:5px;background:#e5e5ea;border-radius:3px;overflow:hidden"><div style="width:'+s.pct+'%;height:100%;background:'+s.color+';border-radius:3px"></div></div><span style="font-size:12.5px;font-weight:700;color:'+s.color+';width:26px;text-align:right;flex-shrink:0">'+s.pct+'%</span></div>';
    }).join('') + '</div>';
  }
  html += '</div>';

  // Cross-channel journey
  if(lead.journey && lead.journey.length){
    html += '<div style="font-size:13px;font-weight:700;color:#8e8e93;text-transform:uppercase;letter-spacing:.4px;margin:4px 0 6px">How they\'ve interacted with us</div>';
    html += '<div style="margin-bottom:10px">' + lead.journey.map(function(j, i){
      var isLast = i === lead.journey.length - 1;
      return '<div style="display:flex;gap:9px">'
        + '<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">'
        +   '<div style="width:22px;height:22px;border-radius:50%;background:'+j.color+'22;display:flex;align-items:center;justify-content:center;font-size:12.5px">'+j.icon+'</div>'
        +   (isLast ? '' : '<div style="width:2px;flex:1;background:#e5e5ea;margin:2px 0"></div>')
        + '</div>'
        + '<div style="flex:1;padding-bottom:'+(isLast?'0':'10px')+'">'
        +   '<div style="display:flex;align-items:center;gap:6px"><span style="font-size:13px;font-weight:700;color:#1a1a1a">'+j.channel+'</span><span style="font-size:12.5px;color:#a8a8ad">'+j.date+'</span></div>'
        +   '<div style="font-size:13px;color:#5c5c66;margin-top:1px;line-height:1.4">'+j.text+'</div>'
        + '</div>'
      + '</div>';
    }).join('') + '</div>';
  }

  // Likes / concerns (problemBuckets)
  if(lead.problemBuckets && lead.problemBuckets.length){
    html += '<div style="font-size:13px;font-weight:700;color:#8e8e93;text-transform:uppercase;letter-spacing:.4px;margin:4px 0 6px">What they liked / are concerned about</div>';
    html += '<div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px">' + lead.problemBuckets.map(function(p){
      return '<div style="background:#fff;border:1px solid #ece7fa;border-left:3px solid #7c3aed;border-radius:8px;padding:7px 10px"><div style="font-size:12.5px;font-weight:800;color:#6d28d9;text-transform:uppercase;letter-spacing:.3px;margin-bottom:2px">'+p.cat+'</div><div style="font-size:13px;color:#3a3a42;line-height:1.4">'+p.text+'</div></div>';
    }).join('') + '</div>';
  }

  // Gamified expected value unlock
  html += '<div style="background:linear-gradient(120deg,#0a1a14,#0f3d2f 55%,#0f6e56);border-radius:14px;padding:12px 14px;position:relative;overflow:hidden">';
  html += '<div style="position:absolute;top:-40%;right:-10%;width:140px;height:140px;background:radial-gradient(circle,rgba(93,202,165,.25),transparent 70%);pointer-events:none"></div>';
  html += '<div style="display:flex;align-items:center;gap:7px;margin-bottom:7px;position:relative;z-index:1"><i class="ti ti-trophy" style="font-size:15px;color:#FFD700"></i><span style="font-size:12.5px;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:.4px">Close this, unlock</span></div>';
  html += '<div style="display:flex;gap:16px;position:relative;z-index:1">';
  html += '<div><div style="font-size:19px;font-weight:800;color:#fff">'+dealValue+'</div><div style="font-size:12.5px;color:#9fe1cb;font-weight:600">Deal value</div></div>';
  html += '<div><div style="font-size:19px;font-weight:800;color:#FFD700">+'+ogPointsUnlock+' pts</div><div style="font-size:12.5px;color:#9fe1cb;font-weight:600">OG Score™ boost</div></div>';
  html += '<div><div style="font-size:19px;font-weight:800;color:#fff">#'+Math.max(1, 3 - Math.floor(ogPointsUnlock/3))+'</div><div style="font-size:12.5px;color:#9fe1cb;font-weight:600">Leaderboard rank</div></div>';
  html += '</div></div>';

  history.innerHTML = html;
  panel.style.display = 'block';
}

// ───────────────── Dashboard: who's waiting in queue right now (backs the "In Queue" KPI tile) ─────────────────
var CALL_QUEUE_NOW = [
  {name:'Priya Iyer', wait:'4m 20s', waitLevel:'hi', intent:'Likely billing dispute — flagged before'},
  {name:'Suresh Nair', wait:'1m 50s', waitLevel:'mid', intent:'Plan upgrade enquiry'}
];
function renderDashQueueDetail(){
  var box = document.getElementById('dashQueueDetail'); if(!box) return;
  if(!CALL_QUEUE_NOW.length){
    box.innerHTML = '<div style="text-align:center;padding:16px;color:#a8a8ad;font-size:13.5px;background:#fff;border:1px solid #ece7fa;border-radius:12px">Queue is empty right now</div>';
    return;
  }
  var levelColor = {hi:'#e24b4a', mid:'#c8860a', lo:'#0f6e56'};
  var levelBg = {hi:'#fdecec', mid:'#fff3d6', lo:'#e1f5ee'};
  box.innerHTML = CALL_QUEUE_NOW.map(function(q){
    return '<div style="display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #ece7fa;border-radius:12px;padding:9px 11px;margin-bottom:7px">'
      + '<div style="width:32px;height:32px;border-radius:50%;background:#f2f2f7;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti ti-headset" style="font-size:15px;color:#6b6b74"></i></div>'
      + '<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:700;color:#1a1a1a">'+q.name+'</div><div style="font-size:12.5px;color:#8e8e93">'+q.intent+'</div></div>'
      + '<span style="font-size:12.5px;font-weight:800;color:'+levelColor[q.waitLevel]+';background:'+levelBg[q.waitLevel]+';padding:3px 8px;border-radius:8px;flex-shrink:0">'+q.wait+'</span>'
    + '</div>';
  }).join('');
}
function renderDashGamifySummary(){
  var box = document.getElementById('dashGamifySummary'); if(!box) return;
  var leads = LEADS_MODAL_DATA.slice(0, 6);
  var totalValue = 0, totalPts = 0;
  leads.forEach(function(l){
    var m = (l.interest||'').match(/₹([\d,]+)/);
    if(m) totalValue += parseInt(m[1].replace(/,/g,''), 10) || 0;
    totalPts += Math.round((l.intentScore||50) / 12);
  });
  var fmtValue = totalValue >= 100000 ? '₹' + (totalValue/100000).toFixed(1) + 'L' : '₹' + totalValue.toLocaleString('en-IN');
  box.innerHTML = ''
    + '<div><div style="font-size:20px;font-weight:800;color:#fff">'+fmtValue+'</div><div style="font-size:12.5px;color:#9fe1cb;font-weight:600">Across '+leads.length+' leads today</div></div>'
    + '<div><div style="font-size:20px;font-weight:800;color:#FFD700">+'+totalPts+' pts</div><div style="font-size:12.5px;color:#9fe1cb;font-weight:600">OG Score™ if all close</div></div>'
    + '<div><div style="font-size:20px;font-weight:800;color:#fff">#1</div><div style="font-size:12.5px;color:#9fe1cb;font-weight:600">Leaderboard rank unlocked</div></div>';
}
document.addEventListener('DOMContentLoaded', function(){
  renderDialerKeypad();
  renderPlanDate();
  renderPlanIncoming();
  renderPlanOutgoing();
  renderPlanRecent();
  renderDashGamifySummary();
  renderDashQueueDetail();
});

window.togglePulseNewMsgMenu = function(e){
  e.stopPropagation();
  var menu = document.getElementById('pulseNewMsgMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
};
window.closePulseNewMsgMenu = function(){
  document.getElementById('pulseNewMsgMenu').style.display = 'none';
};
document.addEventListener('click', function(e){
  var menu = document.getElementById('pulseNewMsgMenu');
  if(menu && menu.style.display==='block' && !e.target.closest('#pulseNewMsgMenu') && !e.target.closest('#pulseCreateBtn')) menu.style.display='none';
});

// ───────────────── Calendar (ported from manager web) ─────────────────
var CALENDAR_INVITES = [
  {day:23, time:'11:00 AM', title:'SOP coaching session', meta:'With Sunita Rao (Manager) · via #callcentre-team'},
  {day:26, time:'2:30 PM', title:'Warranty pitch refresher', meta:'With L&D team · flagged from your last 3 calls'},
  {day:28, time:'10:00 AM', title:'Weekly team huddle', meta:'With Call Centre team · #callcentre-team'}
];
var calSelectedDay = null;
var calViewMonth = new Date().getMonth();
var calViewYear = new Date().getFullYear();
function calSelectDay(day){
  if(day < 1) return;
  calSelectedDay = (calSelectedDay === day) ? null : day;
  calRenderInvitesList();
  calRenderMonthGrid();
}
function calMonthNav(delta){
  calViewMonth += delta;
  if(calViewMonth > 11){ calViewMonth = 0; calViewYear++; }
  if(calViewMonth < 0){ calViewMonth = 11; calViewYear--; }
  calSelectedDay = null;
  calRenderMonthGrid();
  calRenderInvitesList();
}
function calJumpToday(){
  var now = new Date();
  calViewMonth = now.getMonth();
  calViewYear = now.getFullYear();
  calSelectedDay = now.getDate();
  calRenderMonthGrid();
  calRenderInvitesList();
}
function calRenderMonthGrid(){
  var grid = document.getElementById('calMonthGrid'); if(!grid) return;
  var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var label = document.getElementById('calMonthLabel');
  if(label) label.textContent = monthNames[calViewMonth]+' '+calViewYear;
  var weekdayBox = document.getElementById('calMonthWeekdays');
  if(weekdayBox && !weekdayBox.children.length){
    weekdayBox.innerHTML = ['S','M','T','W','T','F','S'].map(function(d){ return '<div class="cal-weekday-cell">'+d+'</div>'; }).join('');
  }
  var firstDay = new Date(calViewYear, calViewMonth, 1);
  var startOffset = firstDay.getDay();
  var daysInMonth = new Date(calViewYear, calViewMonth+1, 0).getDate();
  var today = new Date();
  var isRealMonth = (calViewMonth === today.getMonth() && calViewYear === today.getFullYear());
  var invDays = {};
  if(isRealMonth){ CALENDAR_INVITES.forEach(function(iv){ invDays[iv.day] = true; }); }
  var cells = '';
  for(var i=0;i<startOffset;i++) cells += '<div class="cal-day-cell empty"></div>';
  for(var d=1; d<=daysInMonth; d++){
    var isToday = isRealMonth && d === today.getDate();
    var isSelected = isRealMonth && calSelectedDay === d;
    var hasInvite = isRealMonth && !!invDays[d];
    cells += '<div class="cal-day-cell'+(isToday?' today':'')+(isSelected?' selected':'')+'" onclick="calSelectDay('+(isRealMonth?d:-1)+')">'
      + '<span>'+d+'</span>'
      + (hasInvite ? '<div class="cal-day-cell-dot"></div>' : '')
    + '</div>';
  }
  grid.innerHTML = cells;
}
function calRenderInvitesList(){
  var box = document.getElementById('calInvitesListBody'); if(!box) return;
  var list = calSelectedDay ? CALENDAR_INVITES.filter(function(iv){ return iv.day === calSelectedDay; }) : CALENDAR_INVITES;
  box.innerHTML = list.length ? list.map(function(iv){
    var idx = CALENDAR_INVITES.indexOf(iv);
    var sharedChips = (iv.sharedWith && iv.sharedWith.length) ? '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:5px">' + iv.sharedWith.map(function(s){ return '<span style="font-size:12.5px;font-weight:700;color:#0f6e56;background:#e1f5ee;padding:2px 7px;border-radius:8px">'+s+'</span>'; }).join('') + '</div>' : '';
    return '<div class="cal-invite-item">'
      + '<div class="cal-invite-time-col"><div class="cal-invite-time">'+iv.time.replace(' ','<br>')+'</div></div>'
      + '<div class="cal-invite-body">'
      +   '<div style="display:flex;align-items:flex-start;gap:8px">'
      +     '<div style="flex:1;min-width:0"><div class="cal-invite-title">'+iv.title+'</div><div class="cal-invite-meta"><i class="ti ti-users" style="font-size:12.5px"></i>'+iv.meta+'</div>'+sharedChips+'</div>'
      +     '<button onclick="openCalShareInvite('+idx+')" title="Share invite" style="flex-shrink:0;background:#f1ecff;border:none;border-radius:8px;width:26px;height:26px;cursor:pointer;display:flex;align-items:center;justify-content:center"><i class="ti ti-share" style="font-size:14.5px;color:#7c3aed"></i></button>'
      +   '</div>'
      + '</div>'
    + '</div>';
  }).join('') : '<div style="margin:0 12px 8px;padding:22px 14px;text-align:center;background:#fafbfc;border:1px dashed #e5e5ea;border-radius:14px"><div style="font-size:26px;margin-bottom:6px">🗓️</div><div style="font-size:13px;color:#a0a0a8;font-weight:600">Nothing scheduled '+(calSelectedDay?'this day':'')+'</div></div>';
}
function calRenderAll(){
  calRenderMonthGrid();
  calRenderInvitesList();
}
var calShareInviteIdx = null;
window.openCalShareInvite = function(idx){
  calShareInviteIdx = idx;
  var iv = CALENDAR_INVITES[idx];
  if(!iv.sharedWith) iv.sharedWith = [];
  document.getElementById('calShareTitle').textContent = iv.title;
  renderCalShareOptions();
  document.getElementById('calShareOverlay').classList.add('show');
};
window.closeCalShareInvite = function(){
  document.getElementById('calShareOverlay').classList.remove('show');
};
var CAL_SHARE_OPTIONS = [
  {id:'manager', label:'Sunita Rao', sub:'Manager', icon:'👤'},
  {id:'team', label:'Call Centre Team', sub:'All members · #callcentre-team', icon:'👥'},
  {id:'landd', label:'Fahmy', sub:'L&D', icon:'🎓'}
];
function renderCalShareOptions(){
  var box = document.getElementById('calShareOptionsList'); if(!box) return;
  var iv = CALENDAR_INVITES[calShareInviteIdx];
  box.innerHTML = CAL_SHARE_OPTIONS.map(function(o){
    var checked = iv.sharedWith && iv.sharedWith.indexOf(o.label) > -1;
    return '<div onclick="calToggleShareOption(\''+o.id+'\')" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;cursor:pointer;background:'+(checked?'#f1ecff':'#fff')+';border:1px solid '+(checked?'#ddc9fb':'#ececef')+';margin-bottom:6px">'
      + '<span style="font-size:18px;flex-shrink:0">'+o.icon+'</span>'
      + '<div style="flex:1"><div style="font-size:14.5px;font-weight:700;color:#1a1a1a">'+o.label+'</div><div style="font-size:12.5px;color:#8e8e93">'+o.sub+'</div></div>'
      + '<div style="width:20px;height:20px;border-radius:6px;border:1.5px solid '+(checked?'#7c3aed':'#d5d5da')+';background:'+(checked?'#7c3aed':'#fff')+';display:flex;align-items:center;justify-content:center;flex-shrink:0">'+(checked?'<i class="ti ti-check" style="font-size:13.5px;color:#fff"></i>':'')+'</div>'
    + '</div>';
  }).join('');
}
window.calToggleShareOption = function(id){
  var opt = CAL_SHARE_OPTIONS.filter(function(o){ return o.id===id; })[0];
  var iv = CALENDAR_INVITES[calShareInviteIdx];
  if(!iv.sharedWith) iv.sharedWith = [];
  var pos = iv.sharedWith.indexOf(opt.label);
  if(pos > -1) iv.sharedWith.splice(pos,1); else iv.sharedWith.push(opt.label);
  renderCalShareOptions();
};
window.calConfirmShare = function(){
  var iv = CALENDAR_INVITES[calShareInviteIdx];
  closeCalShareInvite();
  calRenderInvitesList();
  var toast = document.createElement('div');
  var n = (iv.sharedWith||[]).length;
  toast.innerHTML = '<i class="ti ti-circle-check" style="font-size:15px;vertical-align:-2px;margin-right:5px"></i>' + (n ? 'Shared with ' + n + (n===1?' person':' people') : 'Sharing cleared');
  toast.style.cssText = 'position:fixed;left:50%;bottom:30px;transform:translateX(-50%);background:#0a1a14;color:#fff;font-size:13.5px;font-weight:700;padding:10px 16px;border-radius:20px;z-index:99999;box-shadow:0 6px 20px rgba(0,0,0,.25)';
  document.body.appendChild(toast);
  setTimeout(function(){ toast.remove(); }, 2200);
};

function aSwitch(tab,el){
  document.querySelectorAll('.sc').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.ios-nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('asc-'+tab).classList.add('active');
  if(el&&el.classList.contains('ios-nav-item')){el.classList.add('active');}
  else {
    var map = {dash:0, calls:1, calendar:2, pulse:3};
    var items = document.querySelectorAll('.ios-nav-item');
    if(map[tab]!==undefined && items[map[tab]]) items[map[tab]].classList.add('active');
  }
  if(tab==='calendar' && typeof calRenderAll==='function') calRenderAll();
  currentTab=tab;
}
function toggleDropdown(){document.getElementById('userDropdown').classList.toggle('open');}
document.addEventListener('click',function(e){if(!e.target.closest('.topbar-right'))document.getElementById('userDropdown').classList.remove('open');});
function openAvatarPanel(){document.getElementById('userDropdown').classList.remove('open');document.getElementById('avatarPanel').classList.add('open');}
function closeAvatarPanel(){document.getElementById('avatarPanel').classList.remove('open');}
function saveAvatarAndClose(){closeAvatarPanel();}
function openSettings(){document.getElementById('userDropdown').classList.remove('open');document.getElementById('settingsPanel').classList.add('open');}
function closeSettings(){document.getElementById('settingsPanel').classList.remove('open');}
var staffChannel = 'callcentre';
function selectStaffChannel(channel, el){
  staffChannel = channel;
  document.querySelectorAll('.channel-opt').forEach(function(opt){
    opt.classList.remove('selected');
    opt.style.border = '1.5px solid #e5e5ea';
    opt.style.background = '#fff';
  });
  el.classList.add('selected');
  el.style.border = '1.5px solid #1d9e75';
  el.style.background = '#f0fff6';
  document.getElementById('channelCheckCallCentre').style.color = (channel === 'callcentre') ? '#1d9e75' : '#c0c0c0';
  var roleLbl = document.getElementById('roleDesigLabel');
  if(roleLbl){
    var roleNames = {callcentre: (CURRENT_VERTICAL==='healthcare' ? 'Helpline Staff' : 'Call Centre Staff')};
    roleLbl.textContent = roleNames[channel] || 'Call Centre Staff';
  }
}

// ───────────────── Industry — INHERITED from Manager Web's Brand Vertical, same pattern as
// staff_mobile.html. This file is single-channel (Call Centre only), so there's no M0 subtype
// split here — the whole app just relabels itself as a Patient Helpline for Healthcare. ─────────
// ───────────────── Language — same mechanism as staff_mobile.html. ─────────────────
var LANGUAGES = [
  {code:'en', english:'English', native:'English'},
  {code:'hi', english:'Hindi', native:'हिन्दी'},
  {code:'bn', english:'Bengali', native:'বাংলা'},
  {code:'mr', english:'Marathi', native:'मराठी'},
  {code:'te', english:'Telugu', native:'తెలుగు'},
  {code:'ta', english:'Tamil', native:'தமிழ்'},
  {code:'gu', english:'Gujarati', native:'ગુજરાતી'},
  {code:'ur', english:'Urdu', native:'اردو'},
  {code:'kn', english:'Kannada', native:'ಕನ್ನಡ'}
];
var NAV_TRANSLATIONS = {
  en: {dashboard:'Dashboard', calendar:'Calendar'},
  hi: {dashboard:'डैशबोर्ड', calendar:'कैलेंडर'},
  bn: {dashboard:'ড্যাশবোর্ড', calendar:'ক্যালেন্ডার'},
  mr: {dashboard:'डॅशबोर्ड', calendar:'दिनदर्शिका'},
  te: {dashboard:'డాష్‌బోర్డ్', calendar:'క్యాలెండర్'},
  ta: {dashboard:'டாஷ்போர்டு', calendar:'நாட்காட்டி'},
  gu: {dashboard:'ડેશબોર્ડ', calendar:'કેલેન્ડર'},
  ur: {dashboard:'ڈیش بورڈ', calendar:'کیلنڈر'},
  kn: {dashboard:'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', calendar:'ಕ್ಯಾಲೆಂಡರ್'}
};
var CURRENT_LANGUAGE = 'en';
function renderLanguagePicker(){
  var box = document.getElementById('languagePickerList'); if(!box) return;
  box.innerHTML = LANGUAGES.map(function(l){
    var selected = (l.code === CURRENT_LANGUAGE);
    return '<div onclick="applyLanguage(\''+l.code+'\')" style="display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:10px;cursor:pointer;background:'+(selected?'#f0fff6':'#fff')+';border:1.5px solid '+(selected?'#1d9e75':'#ececef')+';margin-bottom:5px">'
      + '<div style="flex:1"><div style="font-size:14.5px;font-weight:700;color:#1a1a1a">'+l.native+'</div><div style="font-size:11.5px;color:#8e8e93">'+l.english+'</div></div>'
      + '<i class="ti ti-circle-check" style="font-size:16px;color:'+(selected?'#1d9e75':'#c0c0c0')+';flex-shrink:0"></i>'
    + '</div>';
  }).join('');
}
window.applyLanguage = function(code){
  CURRENT_LANGUAGE = code;
  var t = NAV_TRANSLATIONS[code] || NAV_TRANSLATIONS.en;
  var lang = LANGUAGES.filter(function(l){ return l.code===code; })[0];
  var dashLbl = document.getElementById('navLabelDash'); if(dashLbl) dashLbl.textContent = t.dashboard;
  var calLbl = document.getElementById('navLabelCalendar'); if(calLbl) calLbl.textContent = t.calendar;
  renderLanguagePicker();
  var toast = document.createElement('div');
  toast.innerHTML = '<i class="ti ti-circle-check" style="font-size:15px;vertical-align:-2px;margin-right:5px"></i>'+(lang?lang.native:code);
  toast.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#0a1a14;color:#fff;font-size:13.5px;font-weight:700;padding:10px 16px;border-radius:20px;z-index:99999;box-shadow:0 6px 20px rgba(0,0,0,.25)';
  document.body.appendChild(toast);
  setTimeout(function(){ toast.remove(); }, 2000);
};
document.addEventListener('DOMContentLoaded', renderLanguagePicker);

var MANAGER_VERTICAL_TO_STAFF_VERTICAL = {
  mattress:'retail', health:'healthcare',
  auto:'retail', realestate:'retail', solar:'retail', ev:'retail', education:'retail',
  fertility:'retail', cosmetic:'retail', dental:'retail', eyewear:'retail'
};
var BRAND_VERTICAL_FROM_MANAGER = 'mattress';
var CURRENT_VERTICAL = MANAGER_VERTICAL_TO_STAFF_VERTICAL[BRAND_VERTICAL_FROM_MANAGER] || 'retail';
var devModeOn = false;
// Settings Save bar — was missing entirely; any edit to a Settings field reveals it.
function markSettingsDirty(){
  var bar = document.getElementById('settingsSaveBar');
  if(bar) bar.style.display = 'block';
}
function saveSettingsChanges(){
  var bar = document.getElementById('settingsSaveBar');
  if(bar) bar.style.display = 'none';
  var toast = document.createElement('div');
  toast.innerHTML = '<i class="ti ti-circle-check" style="font-size:15px;vertical-align:-2px;margin-right:5px"></i>Changes saved';
  toast.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#0a1a14;color:#fff;font-size:13.5px;font-weight:700;padding:10px 16px;border-radius:20px;z-index:99999;box-shadow:0 6px 20px rgba(0,0,0,.25)';
  document.body.appendChild(toast);
  setTimeout(function(){ toast.remove(); }, 2000);
}
function toggleDevMode(){
  devModeOn = !devModeOn;
  document.getElementById('devModeToggle').classList.toggle('on', devModeOn);
  var note = document.getElementById('industryLockNote');
  document.getElementById('verticalOptRetail').style.opacity = devModeOn ? '1' : (CURRENT_VERTICAL==='retail' ? '1' : '.5');
  document.getElementById('verticalOptHealth').style.opacity = devModeOn ? '1' : (CURRENT_VERTICAL==='healthcare' ? '1' : '.5');
  note.innerHTML = devModeOn
    ? '<i class="ti ti-tool" style="font-size:13.5px;color:#a3660a"></i><div style="font-size:12.5px;color:#7a5a00;line-height:1.5"><b>Dev Mode is on</b> — tap a card below to preview that industry live. Turn this off before shipping/demoing.</div>'
    : '<i class="ti ti-lock" style="font-size:13.5px;color:#8e8e93"></i><div style="font-size:12.5px;color:#666;line-height:1.5">Set by your brand\'s M3 Super Admin in the Manager web app (Settings → General → Brand Vertical). Contact your admin to change this.</div>';
}
function setVertical(v, silent){
  CURRENT_VERTICAL = v;
  var isHealth = (v === 'healthcare');

  document.getElementById('verticalOptRetail').style.border = isHealth ? '1.5px solid #e5e5ea' : '1.5px solid #1d9e75';
  document.getElementById('verticalOptRetail').style.background = isHealth ? '#fff' : '#f0fff6';
  document.getElementById('verticalOptRetail').classList.toggle('selected', !isHealth);
  document.getElementById('verticalOptRetail').style.opacity = devModeOn ? '1' : (isHealth ? '.5' : '1');
  document.getElementById('verticalCheckRetail').style.color = isHealth ? '#c0c0c0' : '#1d9e75';
  document.getElementById('verticalOptHealth').style.border = isHealth ? '1.5px solid #1d9e75' : '1.5px solid #e5e5ea';
  document.getElementById('verticalOptHealth').style.background = isHealth ? '#f0fff6' : '#fff';
  document.getElementById('verticalOptHealth').classList.toggle('selected', isHealth);
  document.getElementById('verticalOptHealth').style.opacity = devModeOn ? '1' : (isHealth ? '1' : '.5');
  document.getElementById('verticalCheckHealth').style.color = isHealth ? '#1d9e75' : '#c0c0c0';

  document.getElementById('storeSectionTitle').textContent = isHealth ? 'Hospital' : 'Store';
  document.getElementById('baseStoreLabel').textContent = isHealth ? 'Base Hospital' : 'Base Store';
  document.getElementById('baseStoreSub').textContent = isHealth ? 'Koramangala — Meridian Multispecialty Hospital' : 'Koramangala — The Sleep Company';
  document.getElementById('roleDesigDesc').innerHTML = isHealth
    ? 'Staff tier — sits below Manager designations (M1 Charge Nurse / Ward Manager, M2 Hospital Operations Manager). This app is the Patient Helpline.'
    : 'Staff tier — sits below Manager designations (M1 Store Manager, M2 Ops Manager) shown in Settings on the Manager app. Your exact sub-role is set below.';
  document.getElementById('channelSectionTitle').textContent = isHealth ? 'Your Patient Channel' : 'Your Customer Channel';
  document.getElementById('channelSectionDesc').textContent = isHealth
    ? 'This app is the Patient Helpline — your channel is fixed accordingly. Ward Staff, Frontline and Medico roles live in the Staff mobile app instead.'
    : 'This app is for Call Centre staff — your customer channel is fixed accordingly. Store and Field Staff sub-roles are available in the Staff mobile app instead.';
  document.getElementById('channelIconCallCentre').textContent = isHealth ? '🏥' : '☎️';
  document.getElementById('channelTitleCallCentre').textContent = isHealth ? 'Helpline Staff' : 'Call Centre Staff';
  document.getElementById('channelSubCallCentre').textContent = isHealth ? 'I mostly handle patients over the phone' : 'I mostly handle customers over the phone';
  var roleLbl = document.getElementById('roleDesigLabel'); if(roleLbl) roleLbl.textContent = isHealth ? 'Helpline Staff' : 'Call Centre Staff';

  var brandLine = isHealth ? 'Meridian Multispecialty Hospital · Koramangala' : 'The Sleep Company · Koramangala';
  var pulseBrand = document.getElementById('pulseBrandLine'); if(pulseBrand) pulseBrand.textContent = brandLine;
  var ccBrand = document.getElementById('ccBrandLine'); if(ccBrand) ccBrand.textContent = isHealth ? 'Meridian Multispecialty Hospital · Patient Helpline' : 'The Sleep Company · Call Centre';

  LEADS_MODAL_DATA = isHealth ? LEADS_MODAL_DATA_HEALTH : LEADS_MODAL_DATA_RETAIL;
  leadsModalIdx = 0;
  LEAD_SOP_CHECK_DATA = isHealth ? LEAD_SOP_CHECK_DATA_HEALTH : LEAD_SOP_CHECK_DATA_RETAIL;
  sopSteps = isHealth ? SOP_STEPS_HEALTH : SOP_STEPS_RETAIL;
  if(sopCurrentIdx !== undefined) sopStep(sopCurrentIdx || 0);

  var ccHeader = document.getElementById('custConvHeader'); if(ccHeader) ccHeader.textContent = isHealth ? 'Patient Conversations' : 'Customer Conversations';
  var ccFooter = document.getElementById('custConvFooter'); if(ccFooter) ccFooter.textContent = isHealth ? 'Patient threads managed via WhatsApp Business + On-ground Calling' : 'Customer threads managed via WhatsApp Business + On-ground Calling';
  var noInterestQ = document.getElementById('noInterestQ'); if(noInterestQ) noInterestQ.textContent = isHealth ? 'Why is the patient not reachable?' : 'Why did the customer lose interest?';
  var cameBackQ = document.getElementById('cameBackQ'); if(cameBackQ) cameBackQ.textContent = isHealth ? 'When did/will the patient follow up?' : 'When did/will the customer come back?';

  if(!silent){
    var toast = document.createElement('div');
    toast.innerHTML = '<i class="ti ti-circle-check" style="font-size:15px;vertical-align:-2px;margin-right:5px"></i>Switched to '+(isHealth?'Healthcare — Patient Helpline':'Retail — Call Centre');
    toast.style.cssText = 'position:fixed;left:50%;bottom:30px;transform:translateX(-50%);background:#0a1a14;color:#fff;font-size:13.5px;font-weight:700;padding:10px 16px;border-radius:20px;z-index:99999;box-shadow:0 6px 20px rgba(0,0,0,.25)';
    document.body.appendChild(toast);
    setTimeout(function(){ toast.remove(); }, 2200);
  }
}
document.addEventListener('DOMContentLoaded', function(){ setVertical(CURRENT_VERTICAL, true); });

function dismissNotif(){var p=document.getElementById('notifPill');if(!p)return;p.style.animation='pillFade .3s ease forwards';setTimeout(()=>p.style.display='none',280);}
var aRecOn=false,liveTimerInt=null,liveSeconds=0,liveTypeInt=null;
function toggleAndRec(){
  aRecOn=!aRecOn;
  var btn=document.getElementById('aRecBtn'),icon=document.getElementById('aRecIcon'),ring=document.getElementById('aRipple'),label=document.getElementById('aRecLabel');
  var liveBtn=document.getElementById('liveNavBtn');
  if(aRecOn){
    btn.classList.add('on');icon.className='ti ti-player-stop';ring.classList.add('on');label.textContent='Stop';label.classList.add('on');
    liveBtn.classList.add('recording');
    startLiveTranscript();
    if(sopAutoInt) clearInterval(sopAutoInt);
    sopAutoInt=setInterval(function(){if(sopCurrentIdx<6){sopCurrentIdx++;sopStep(sopCurrentIdx);}else{clearInterval(sopAutoInt);}},8000);
  } else {
    btn.classList.remove('on');icon.className='ti ti-microphone';ring.classList.remove('on');label.textContent='Tap to record';label.classList.remove('on');
    liveBtn.classList.remove('recording');
    stopLiveTranscript();
    if(sopAutoInt){clearInterval(sopAutoInt);sopCurrentIdx=0;sopStep(0);}
    var qbar=document.getElementById('catalogQuoteBar');if(qbar)qbar.style.display='block';
    document.getElementById('aosOverlay').classList.add('show');
    document.getElementById('motivToast').style.display='none';
  }
}
function startLiveTranscript(){
  document.getElementById('liveIdleState').style.display='none';
  document.getElementById('liveActiveState').style.display='flex';
  liveSeconds=0;
  liveTimerInt=setInterval(function(){
    liveSeconds++;
    var m=String(Math.floor(liveSeconds/60)).padStart(2,'0'),s=String(liveSeconds%60).padStart(2,'0');
    document.getElementById('liveTimer').textContent=m+':'+s;
  },1000);
  var phrases=['Pricing ₹8,490 ಆಗುತ್ತಾ?','Warranty ಎಷ್ಟು ಇದೆ?','EMI option ಇದ್ಯಾ?','Delivery ಎಷ್ಟು ದಿನ ಆಗುತ್ತೆ?'];
  var staffReplies=['Bilkul madam, 10 year warranty + no cost EMI available!','Yes madam, free delivery within 5 days.','Great choice! Shall I raise a quote for you?','Of course — let me show you the trial options.'];
  var pi=0,ci=0;
  function typeChar(){
    var el=document.getElementById('liveTypingText');
    if(!el)return;
    if(ci<phrases[pi].length){
      el.textContent=phrases[pi].slice(0,ci+1);
      var cur=document.createElement('span');cur.className='live-cursor';el.appendChild(cur);
      ci++;liveTypeInt=setTimeout(typeChar,55);
    } else {
      setTimeout(function(){
        var scroll=document.getElementById('liveTranscriptScroll');
        var staffLine=document.createElement('div');staffLine.className='live-line';
        staffLine.innerHTML='<span class="live-spk">Staff</span><div class="live-bubble">'+staffReplies[pi%staffReplies.length]+'</div>';
        scroll.insertBefore(staffLine,document.getElementById('liveTypingLine'));
        var custLine=document.createElement('div');custLine.className='live-line';
        custLine.innerHTML='<span class="live-spk cust">Customer</span><div class="live-bubble cust" id="liveTypingText"><span class="live-cursor"></span></div>';
        var oldTyping=document.getElementById('liveTypingLine');
        oldTyping.replaceWith(custLine);
        custLine.id='liveTypingLine';
        pi=(pi+1)%phrases.length;ci=0;
        scroll.scrollTop=scroll.scrollHeight;
        liveTypeInt=setTimeout(typeChar,1600);
      },800);
    }
  }
  liveTypeInt=setTimeout(typeChar,1000);
}
function stopLiveTranscript(){
  clearInterval(liveTimerInt);clearTimeout(liveTypeInt);
  document.getElementById('liveTimer').textContent='00:00';
  document.getElementById('liveIdleState').style.display='flex';
  document.getElementById('liveActiveState').style.display='none';
}
function closeSheet(){document.getElementById('aosOverlay').classList.remove('show');}

// ───────────────── Stat detail sheet — reached from the Progress banner's 4 metrics ─────────────────
var STAT_DETAIL_DATA = {
  convos: {icon:'💬', title:'Conversations', big:'5', sub:'Goal 8/day · 3 more to hit today\'s target', extra:'Today\'s conversations are 62m total, averaging 12.4m each — a bit above your usual pace.'},
  sellTime: {icon:'⏱️', title:'Conversation Time', big:'47m', sub:'avg 9.4m per conversation', extra:'Total time spent today: 47m across 5 conversations. Your fastest was 4m, longest was 18m with Mukunda R.'},
  leads: {icon:'🎯', title:'Leads Created', big:'3', sub:'2 leads called so far', extra:'3 new leads logged today. Tap into the Leads tab to see follow-up status and SLA on each.<br><br><span style="color:#185fa5;font-weight:700;cursor:pointer" onclick="closeStatDetail();openLeadAnalysisModal()">View full lead analysis →</span>'},
  convPct: {icon:'📈', title:'Leads Called', big:'2', sub:'of 3 leads created · 0% confirmed sale so far', extra:'Conversion is inferred from conversations right now. With ERP integration this will be calculated from confirmed sales instead.'},
  delivery: {icon:'🚚', title:'On-time Delivery', big:'92%', sub:'4 delivered on time this week · 1 due today', extra:'Your on-time rate is up 4pts vs last week. 1 order is due today and 1 was delayed (narrow stairwell access, rescheduled). Shipment tracking now lives in Pulse.<br><br><span style="color:#185fa5;font-weight:700;cursor:pointer" onclick="closeStatDetail();aSwitch(\'pulse\')">Open #manage-shipment →</span>'},
  csat: {icon:'😊', title:'CSAT Today', big:'94%', sub:'Based on 14 rated calls today', extra:'Customer satisfaction is up 2pts vs your weekly average — callers are rating your calls positively, especially on warranty and financing questions.'}
};
window.openStatDetail = function(key){
  var d = STAT_DETAIL_DATA[key];
  if(!d) return;
  document.getElementById('statDetailBody').innerHTML =
    '<div style="text-align:center;margin-bottom:6px">'
    + '<div style="font-size:31px">'+d.icon+'</div>'
    + '<div style="font-size:27px;font-weight:800;color:#1a1a1a;margin-top:4px">'+d.big+'</div>'
    + '<div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-top:2px">'+d.title+'</div>'
    + '<div style="font-size:14.5px;color:#6b6b74;margin-top:2px">'+d.sub+'</div>'
    + '</div>'
    + '<div style="background:#faf9f6;border-radius:12px;padding:12px 14px;font-size:14.5px;color:#4b4b52;line-height:1.6;margin-top:10px">'+d.extra+'</div>';
  document.getElementById('statDetailOverlay').classList.add('show');
};
window.closeStatDetail = function(){ document.getElementById('statDetailOverlay').classList.remove('show'); };

var acceptedPlanItems = [];

var ogRadarChart = null;
window.openOgScoreDetail = function(){
  document.getElementById('ogScoreOverlay').classList.add('show');
  setTimeout(function(){
    var ctx = document.getElementById('ogCapabilityRadar');
    if(!ctx || !window.Chart) return;
    if(ogRadarChart) ogRadarChart.destroy();
    ogRadarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Follow-up', 'Greeting', 'Product Knowledge', 'Warranty', 'Objections', 'Closing'],
        datasets: [{
          label: 'OG Score™',
          data: [88, 82, 78, 71, 65, 58],
          backgroundColor: 'rgba(29,158,117,.18)',
          borderColor: '#1d9e75',
          borderWidth: 2,
          pointBackgroundColor: '#1d9e75',
          pointRadius: 3
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { r: {
          min: 0, max: 100,
          ticks: { display: false, stepSize: 25 },
          grid: { color: '#eee' },
          angleLines: { color: '#eee' },
          pointLabels: { font: { size: 9.5, weight: '600' }, color: '#555' }
        }},
        maintainAspectRatio: false
      }
    });
  }, 80);
};
window.closeOgScoreDetail = function(){ document.getElementById('ogScoreOverlay').classList.remove('show'); };

// ───────────────── Rank explanation — weighted scoring behind "Your Rank" ─────────────────
// Default weights live here; a manager can change them in Settings → Customer Interaction preferences (manager app/web).
var RANK_WEIGHTS = [
  { key:'ogscore', label:'OG Score™', weight:40, value:76, max:100, icon:'🏆' },
  { key:'leadscalled', label:'Leads Called', weight:20, value:2, max:5, icon:'📞' },
  { key:'leadscreated', label:'Leads Created', weight:15, value:3, max:5, icon:'🎯' },
  { key:'convtime', label:'Conversation Time', weight:15, value:62, max:90, icon:'⏱️' },
  { key:'delivery', label:'On-time Delivery', weight:10, value:92, max:100, icon:'🚚' }
];
function rankRenderBreakdown(){
  var box = document.getElementById('rankWeightBreakdown');
  if(!box) return;
  var total = 0;
  var html = RANK_WEIGHTS.map(function(r){
    var achievement = Math.min(1, r.value / r.max);
    var pts = achievement * r.weight;
    total += pts;
    var valLabel = (r.key === 'convtime') ? (r.value + 'm') : (r.key === 'delivery') ? (r.value + '%') : r.value;
    return '<div style="margin-bottom:11px">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">'
      + '<span style="font-size:13px;font-weight:700;color:#1a1a1a">' + r.icon + ' ' + r.label + '</span>'
      + '<span style="font-size:13px;color:#8e8e93"><b style="color:#1a1a1a">' + valLabel + '</b> · ' + r.weight + '% weight</span>'
      + '</div>'
      + '<div style="height:6px;background:#eef0f2;border-radius:99px;overflow:hidden">'
      + '<div style="width:' + (achievement*100).toFixed(0) + '%;height:100%;background:linear-gradient(90deg,#5dcaa5,#1d9e75);border-radius:99px"></div>'
      + '</div></div>';
  }).join('');
  html += '<div style="display:flex;align-items:center;justify-content:space-between;padding-top:8px;border-top:1px solid #eee;margin-top:2px">'
    + '<span style="font-size:13px;font-weight:800;color:#1a1a1a">Composite score</span>'
    + '<span style="font-size:16px;font-weight:800;color:#1d9e75">' + total.toFixed(1) + ' / 100</span></div>';
  box.innerHTML = html;
}
window.openRankDetail = function(){
  rankRenderBreakdown();
  document.getElementById('rankDetailOverlay').classList.add('show');
};
window.closeRankDetail = function(){ document.getElementById('rankDetailOverlay').classList.remove('show'); };
// ───────────────── OG Score™ → LinkedIn ─────────────────
var linkedInConnectedUrl = null;
window.saveLinkedInUrl = function(){
  var input = document.getElementById('linkedinUrlInput');
  var url = input.value.trim();
  if(!url) return;
  linkedInConnectedUrl = url;
  document.getElementById('linkedinUrlDisplay').textContent = url;
  document.getElementById('linkedinConnectedState').style.display = 'block';
  document.getElementById('linkedinSaveBtn').innerHTML = '<i class="ti ti-refresh"></i>Update LinkedIn URL';
};
window.openLinkedInPush = function(){
  document.getElementById('linkedinPushUrl').textContent = linkedInConnectedUrl || 'your LinkedIn profile';
  document.getElementById('linkedinPushOverlay').classList.add('show');
};
window.closeLinkedInPush = function(){ document.getElementById('linkedinPushOverlay').classList.remove('show'); };
window.confirmLinkedInPush = function(){
  document.getElementById('linkedinPushBody').innerHTML =
    '<div style="text-align:center;padding:20px 0">'
    + '<div style="width:56px;height:56px;border-radius:50%;background:#e8f0fe;display:flex;align-items:center;justify-content:center;margin:0 auto 14px"><i class="ti ti-circle-check" style="font-size:29px;color:#0a66c2"></i></div>'
    + '<div style="font-size:16.5px;font-weight:700;color:#1a1a1a;margin-bottom:5px">Posted to LinkedIn</div>'
    + '<div style="font-size:14.5px;color:#6b6b74">Your OG Score™ milestone is live on your profile.</div>'
    + '</div>';
  setTimeout(closeLinkedInPush, 1400);
};
window.avaniPracticeFocusAreas = function(areaLabels){
  var map = {'Closing':'closing', 'Objection Handling':'price', 'Warranty Communication':'warranty', 'Product Knowledge':'knowledge'};
  window.__ogFocusIds = areaLabels.map(function(l){ return map[l]; }).filter(Boolean);
  window.__ogFocusLabels = areaLabels;
  setTimeout(function(){
    practiseRenderPicker();
    var banner = document.getElementById('avaniFocusBanner');
    if(banner){
      banner.style.display = 'flex';
      banner.querySelector('span').textContent = 'Recommended for you, based on your OG Score™: ' + areaLabels.join(' · ');
    }
  }, 300);
};

function showMotivToast(){document.getElementById('motivToast').style.display='block';}
function closeAndGoToDash(){document.getElementById('aosOverlay').classList.remove('show');var navBtns=document.querySelectorAll('.ios-nav-item');aSwitch('dash',navBtns[0]);}
function openWaSend(){document.getElementById('aWaOverlay').classList.add('show');}
function closeWaSheet(){document.getElementById('aWaOverlay').classList.remove('show');}
function selectAvatar(el){document.querySelectorAll('.av-opt').forEach(o=>o.classList.remove('selected'));el.classList.add('selected');}
// Avatar ring colour per persona
var avatarRings={'🦸‍♂️':'conic-gradient(#4fc3f7,#1d9e75,#5dcaa5,#4fc3f7)','🦸‍♀️':'conic-gradient(#f48fb1,#e91e63,#ff80ab,#f48fb1)','🦹‍♀️':'conic-gradient(#ce93d8,#7b1fa2,#e040fb,#ce93d8)','🦹‍♂️':'conic-gradient(#FFCC02,#FF8C00,#FFD700,#FFCC02)','🥷':'conic-gradient(#90a4ae,#37474f,#b0bec5,#90a4ae)'};
function selectSellingAvatar(el,emoji,name){
  document.querySelectorAll('.sav-opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
  if(emoji){
    // Topbar badge
    document.getElementById('arBadgeEmoji').textContent=emoji;
    var ring=document.getElementById('arBadgeRing');
    if(ring&&avatarRings[emoji])ring.style.background=avatarRings[emoji];
    // Dropdown header avatar
    var ddAv=document.getElementById('ddAvatar');
    if(ddAv)ddAv.textContent=emoji;
    // Avatar panel preview
    var prev=document.getElementById('avatarPreviewBadge');
    if(prev)prev.textContent=emoji;
    var nm=document.getElementById('avatarPreviewName');
    if(nm)nm.textContent=name;
  }
}
function aSetMode(el,mode){
  document.querySelectorAll('.seg-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  // Learn panel is outside split area - toggled directly
  document.getElementById('a-panel-learn').style.display=mode==='learn'?'block':'none';
  // Assess panel lives inside split area - show/hide the split area
  var splitArea=document.getElementById('avani-split-area');
  if(splitArea) splitArea.style.display=mode==='assess'?'flex':'none';
  // Practise panel - toggled directly, always resets to the picker screen when entered
  var practiseArea=document.getElementById('a-panel-practise');
  if(practiseArea){ practiseArea.style.display=mode==='practise'?'block':'none'; if(mode==='practise'){ practiseRenderPicker(); practiseGoTo('picker'); } }
  // Init session if first time in assess mode
  if(mode==='assess' && !currentSessionId){ currentSessionId=genId(); renderHistoryList(); }
}

// ── Assess chat history (persists for session) ──────────────────
// ── Practise — SOP-step rehearsal ground (net practise for staff) ──
var practiseSOPs = [
  {id:'greet', icon:'👋', name:'Greeting &amp; Assistance', tip:'Introduce yourself by name and role, welcome the customer to the store, and ask how you can help — all within the first 30 seconds.', example:'"Good morning Ma\'am/Sir! I\'m Raghav, your trained Sleep Expert. Welcome to our store! How may I assist you today?"', watch:['Did you say your name?','Did you mention you\'re a trained Sleep Expert?','Did you welcome them to the store?','Did you ask an open question to start the conversation?']},
  {id:'foam', icon:'🧠', name:'Memory Foam Comparison', tip:'Explain that memory foam is older technology, name its real issues (heat, slow response, pressure points), then show exactly how SmartGRID solves each one.', example:'"Memory foam has been around 60+ years and traps heat, sinks too much, and responds slowly. SmartGRID solves all of this — adaptive support, stays cooler, keeps spinal alignment, and is more breathable."', watch:['Did you name at least 2 memory foam issues?','Did you map each issue to a SmartGRID solution?','Did it sound convincing, not just a list?']},
  {id:'smartgrid', icon:'🛏️', name:'SmartGRID Technology', tip:'Introduce the in-store SmartGRID experience — cover at least 4 features (air channels, certification, sweat-proof, trial period, warranty, patent).', example:'"Our SmartGRID mattress uses adaptive support, 2,500+ air channels for breathability, AIHA-certified orthopedic support, is sweat-proof and sag-resistant, and comes with a 100-night trial and 10-year warranty."', watch:['Did you mention 4 or more distinct features?','Did you explain each clearly, not just name it?','Did the customer seem engaged?']},
  {id:'motivation', icon:'🎯', name:'Purchase Motivation', tip:'Ask interactive questions to uncover why the customer is buying — back pain, upgrading, new home, gifting, etc.', example:'"What\'s prompting the mattress search today — is your current one wearing out, or are you setting up a new room?"', watch:['Did you ask at least one open question?','Did the customer actually respond with a reason?','Did you use their answer later in the pitch?']},
  {id:'pressure', icon:'✋', name:'Pressure Test Demo', tip:'Invite the customer to physically press, touch, or lie on the mattress — and narrate what they should notice while they do it.', example:'"Go ahead and press here — notice how it feels soft and firm at the same time. See how the SmartGRID adapts to the pressure."', watch:['Did you invite a physical touch/press/lie-down?','Did you narrate what they should feel while doing it?','Did you check their reaction afterward?']},
  {id:'preference', icon:'❓', name:'Product Preference', tip:'Ask probing questions to uncover what they currently use and prefer — brand, firmness, and adjacent categories like recliners.', example:'"Which brand of mattress are you currently using? Do you prefer it hard or soft? Are you also interested in recliners or chairs?"', watch:['Did you ask about their current mattress/brand?','Did you ask firmness preference?','Did you probe an adjacent category?']},
  {id:'recommend', icon:'🎁', name:'Tailored Recommendations', tip:'Recommend a specific product that matches what the customer just told you — not a generic pitch.', example:'"Since you mentioned this is for your parents, I\'d recommend the Ortho Pro range — firm support and optimal comfort for older adults."', watch:['Did the recommendation reference something the customer said?','Was it a specific product, not a generic one?','Did the customer show agreement or interest?']},
  {id:'closing', icon:'🤝', name:'Closing the Sale', tip:'Once objections are addressed, ask directly for the sale — don\'t just let the conversation trail off. Suggest a next step (booking, hold, or purchase) with confidence.', example:'"It sounds like the SmartGRID Hybrid checks every box for you — shall I get this held for you at today\'s price, or would you like to go ahead and book it now?"', watch:['Did you ask directly for the sale/next step?','Did you do this only after addressing their concerns?','Did you offer a clear, specific next action (not a vague \'let me know\')?']},
  {id:'retail2', icon:'☕', name:'Retail 2.0 Experience', tip:'Offer at least one Retail 2.0 touch — relaxing headphones with music, a sleep mask, or tea/coffee — during the trial.', example:'"Would you like some tea or coffee while you try the mattress? Please wear these headphones and a sleep mask for a more comfortable trial."', watch:['Did you offer at least one Retail 2.0 element?','Did you explain why it helps the trial?','Did the customer accept or engage with it?']},
  {id:'knowledge', icon:'📘', name:'Product Knowledge', tip:'After recommending a product, explain its features accurately and confidently so the customer understands exactly what they\'re getting.', example:'"This mattress features HR foam for firm support and durability, plus a SnowTec cooling layer that keeps it comfortable even in warm weather."', watch:['Was the explanation accurate?','Did you sound confident, not hesitant?','Did the customer seem satisfied with the explanation?']},
  {id:'price', icon:'💰', name:'Price Objection', tip:'Acknowledge the concern, stay positive, frame it as a long-term investment, and mention EMI/offers if they push further.', example:'"I understand it feels like a big investment, but this mattress is designed to last 10+ years while improving your sleep. We also have EMI options and ongoing offers."', watch:['Did you acknowledge the concern without getting defensive?','Did you frame it as long-term value?','Did you mention EMI/offers if they pushed back again?']},
  {id:'warranty', icon:'🛡️', name:'Warranty Objection', tip:'Give a confident, complete answer to any warranty question — coverage, duration, and how claims work.', example:'"That\'s a great question! Our recliners come with a 3-year warranty covering the motor and key mechanical parts — fully protected."', watch:['Was the answer complete (duration + what\'s covered)?','Did you sound confident, not unsure?','Did you offer a spec sheet or written proof?']},
  {id:'afterservice', icon:'🔧', name:'After-Service Objection', tip:'When asked about measurement, installation, or repairs, explain the support process clearly and reassuringly.', example:'"No worries at all! Our team handles full installation at your home, and if there\'s ever an issue, we\'ll send a technician to fix it."', watch:['Did you cover installation AND repair process?','Did you sound reassuring, not vague?','Did the customer seem satisfied with the answer?']},
  {id:'other', icon:'💬', name:'Other Objection Handling', tip:'For comfort, return, or exchange concerns — listen without interrupting, respond with empathy, and resolve or escalate.', example:'"I completely understand your concern about comfort. Let\'s see how we can help — we can explore an exchange or another model."', watch:['Did you let them finish without interrupting?','Did you respond with empathy first?','Did you offer a concrete resolution or escalation?']},
  {id:'crosssell', icon:'🛋️', name:'Cross-Sell (Add-ons)', tip:'Recommend a relevant product from a different category — pillow, protector, or recliner — timed naturally into the conversation.', example:'"Since you\'re buying this mattress, I\'d recommend this orthopedic pillow — it supports your neck and complements the mattress perfectly."', watch:['Was the cross-sell relevant to their main purchase?','Was the timing natural, not forced?','Did you explain why it complements their choice?']},
  {id:'discount', icon:'🏷️', name:'Discount Presentation', tip:'State the original price first, then clearly present the discounted price — most offers are 40–45% off.', example:'"This mattress is originally priced at ₹50,000, but today we\'re offering it at ₹30,000 — a 40% discount for excellent value."', watch:['Did you state the original price first?','Was the discount % clear and correct?','Did the customer react with interest?']},
  {id:'referral', icon:'📣', name:'Referral Question', tip:'Ask how the customer discovered the store — friend, online, ad, or walk-in — and acknowledge their answer.', example:'"How did you hear about The Sleep Company? Was it through a friend, online, or one of our ads?"', watch:['Did you ask the referral question at all?','Did you acknowledge their answer?','Was it asked early in the interaction, not forgotten?']},
  {id:'googlereview', icon:'⭐', name:'Google Review Request', tip:'Near the end of the interaction, proactively and clearly ask the customer to leave a Google review.', example:'"We\'d love to hear your feedback! Could you take a moment to leave us a review on Google? It really helps us."', watch:['Did you ask for the review at all?','Was it near the end of the conversation, not mid-pitch?','Did you make it easy for them (mentioned how)?']}
];
var practiseCurrent = null;
var practiseTimerInt = null;
var practiseSeconds = 0;

function practiseGoTo(state){
  ['picker','howto','recording','feedback'].forEach(function(s){
    var el = document.getElementById('practise-'+s);
    if(el) el.style.display = (s===state) ? 'block' : 'none';
  });
}
function practiseBackToPicker(){
  if(practiseTimerInt){ clearInterval(practiseTimerInt); practiseTimerInt=null; }
  practiseCurrent = null;
  practiseGoTo('picker');
}

function practiseRenderPicker(){
  var grid = document.getElementById('practise-grid');
  if(!grid) return;
  var focusIds = window.__ogFocusIds || [];
  grid.innerHTML = practiseSOPs.map(function(s){
    var isFocus = focusIds.indexOf(s.id) > -1;
    var style = isFocus
      ? 'background:#fff8e9;border:1.5px solid #f3dfa8;border-radius:12px;padding:12px 10px;box-shadow:0 2px 8px rgba(200,134,10,.15);cursor:pointer;display:flex;flex-direction:column;align-items:flex-start;gap:6px;position:relative'
      : 'background:#fff;border-radius:12px;padding:12px 10px;box-shadow:0 1px 3px rgba(0,0,0,.08);cursor:pointer;display:flex;flex-direction:column;align-items:flex-start;gap:6px;position:relative';
    return '<div onclick="practiseSelect(\''+s.id+'\')" style="'+style+'">'+
      (isFocus ? '<span style="position:absolute;top:8px;right:8px;font-size:12.5px;font-weight:800;color:#c8860a;background:#fef6ec;border-radius:6px;padding:2px 5px">⭐ Focus</span>' : '')+
      '<div style="font-size:23px">'+s.icon+'</div>'+
      '<div style="font-size:14.5px;font-weight:600;color:#1a1a1a;line-height:1.3">'+s.name+'</div>'+
      '<div style="font-size:12.5px;color:#1d9e75;font-weight:600;display:flex;align-items:center;gap:3px"><i class="ti ti-microphone" style="font-size:13.5px"></i>Practise now</div>'+
    '</div>';
  }).join('');
}

function practiseSelect(id){
  practiseCurrent = practiseSOPs.find(function(s){return s.id===id;});
  if(!practiseCurrent) return;
  document.getElementById('practise-howto-icon').textContent = practiseCurrent.icon;
  document.getElementById('practise-howto-title').textContent = practiseCurrent.name;
  document.getElementById('practise-howto-tip').textContent = practiseCurrent.tip;
  document.getElementById('practise-howto-example').textContent = practiseCurrent.example;
  practiseGoTo('howto');
}

function practiseStartRecording(){
  if(!practiseCurrent) return;
  document.getElementById('practise-rec-title').textContent = 'Practising: '+practiseCurrent.name;
  practiseSeconds = 0;
  document.getElementById('practise-rec-timer').textContent = '0:00';
  var dot = document.getElementById('practise-rec-dot');
  if(dot) dot.classList.add('on');
  practiseGoTo('recording');
  practiseTimerInt = setInterval(function(){
    practiseSeconds++;
    var m = Math.floor(practiseSeconds/60), sec = practiseSeconds%60;
    document.getElementById('practise-rec-timer').textContent = m+':'+(sec<10?'0':'')+sec;
  }, 1000);
}

function practiseStopRecording(){
  if(practiseTimerInt){ clearInterval(practiseTimerInt); practiseTimerInt=null; }
  practiseRenderFeedback();
  practiseGoTo('feedback');
}

function practiseRenderFeedback(){
  if(!practiseCurrent) return;
  var s = practiseCurrent;
  // Deterministic-feeling pseudo-score based on module + duration, purely for demo
  var base = 58 + (practiseSeconds % 30);
  var score = Math.min(96, base);
  var scoreColor = score>=75 ? '#1d9e75' : (score>=50 ? '#c8860a' : '#e24b4a');
  document.getElementById('practise-fb-title').textContent = s.name+' — '+score+'/100';
  document.getElementById('practise-fb-title').style.color = scoreColor;
  document.getElementById('practise-fb-duration').textContent = 'Recorded '+document.getElementById('practise-rec-timer').textContent+' · scored against this step\'s rubric';
  var checkList = document.getElementById('practise-fb-checklist');
  checkList.innerHTML = s.watch.map(function(w,i){
    var hit = (i%2===0) || score>70; // demo heuristic so feedback varies by score
    return '<div style="display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:0.5px solid #f0f0f0">'+
      '<i class="ti '+(hit?'ti-circle-check':'ti-circle-x')+'" style="font-size:17px;color:'+(hit?'#1d9e75':'#e24b4a')+';flex-shrink:0;margin-top:1px"></i>'+
      '<span style="font-size:15px;color:#1a1a1a;line-height:1.4">'+w+'</span></div>';
  }).join('');
  var tips = document.getElementById('practise-fb-tip');
  tips.textContent = score>=75
    ? 'Strong rendition — this is close to the model example. Try it once more at a slightly faster pace to sound more natural on the floor.'
    : 'Good attempt. Re-read the model example, then try again focusing on the points marked with a red cross above.';
}


var assessIsLoading = false;

var AVANI_SYSTEM = `You are Avani AI, a personal sales coach for retail staff at The Sleep Company stores in India. You are warm, encouraging, and concise. You help staff learn product knowledge and sales techniques.

Key products:
- Smart Ortho GRID Mattress: ₹8,490 (was ₹14,490), best for back pain, GRID technology
- Smart Luxe Mattress: ₹13,390 (was ₹20,990), premium comfort
- Tranquo Massager Chair: ₹24,990 (was ₹54,990)
- Aura Executive Chair: ₹18,490 (was ₹37,990)

Key policies:
- 100-night free trial: sleep on it at home, full refund no questions if not satisfied
- 10-year warranty on all mattresses
- No-cost EMI available
- Free delivery within 5 days

Sales SOP steps: Greet → Probe needs → Showcase → Pitch EMI → Pitch Warranty → Cross-sell → Capture lead

Staff weak areas this week: warranty communication (missed in last 3 conversations), cross-selling.

Keep responses SHORT (2-4 sentences max). Use bullet points for lists. Be coaching, not lecturing. Occasionally quiz the staff member to test their knowledge. Respond in the same language the user writes in (English, Kannada mix is fine).`;

function assessChip(text){
  document.getElementById('assess-input').value = text;
  assessInputChange(document.getElementById('assess-input'));
  sendAssessMessage();
}

function assessInputChange(el){
  el.style.height='auto';
  el.style.height=Math.min(el.scrollHeight,88)+'px';
  var hasText=el.value.trim().length>0;
  var sendBtn=document.getElementById('assess-send-btn');
  var micBtn=document.getElementById('assess-mic-btn');
  if(hasText){
    sendBtn.style.opacity='1';sendBtn.style.pointerEvents='all';
    micBtn.style.display='none';
  } else {
    sendBtn.style.opacity='.4';sendBtn.style.pointerEvents='none';
    micBtn.style.display='flex';
  }
}
// legacy alias
function autoGrow(el){assessInputChange(el);}

function scrollAssessToBottom(){
  var s=document.getElementById('assess-chat-scroll');
  if(s) s.scrollTop=s.scrollHeight;
}

function appendUserBubble(text){
  var scroll=document.getElementById('assess-chat-scroll');
  var row=document.createElement('div');
  row.style.cssText='display:flex;justify-content:flex-end;margin-bottom:16px';
  row.innerHTML='<div style="max-width:78%;background:#1d9e75;border-radius:18px 18px 4px 18px;padding:10px 14px;font-size:15.5px;color:#fff;line-height:1.55;box-shadow:0 1px 4px rgba(29,158,117,.25)">'+escHtml(text)+'</div>';
  scroll.appendChild(row);
  scrollAssessToBottom();
}

function appendAvaniBubble(html, isStreaming){
  var scroll=document.getElementById('assess-chat-scroll');
  var row=document.createElement('div');
  row.className='avani-msg-row';
  row.style.cssText='display:flex;gap:8px;margin-bottom:16px;align-items:flex-start';
  row.innerHTML=
    '<div style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#0f6e56,#1d9e75);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">'+
      '<svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 4.5h8M3 7h6M3 9.5h7" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/></svg>'+
    '</div>'+
    '<div style="flex:1">'+
      '<div style="font-size:13.5px;font-weight:600;color:#1d9e75;margin-bottom:4px;letter-spacing:.2px">Avani AI</div>'+
      '<div class="avani-bubble" style="font-size:15.5px;color:#1a1a1a;line-height:1.6">'+html+'</div>'+
    '</div>';
  scroll.appendChild(row);
  scrollAssessToBottom();
  return row.querySelector('.avani-bubble');
}

function appendTypingIndicator(){
  var scroll=document.getElementById('assess-chat-scroll');
  var row=document.createElement('div');
  row.id='assess-typing';
  row.style.cssText='display:flex;gap:8px;margin-bottom:16px;align-items:flex-start';
  row.innerHTML=
    '<div style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#0f6e56,#1d9e75);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">'+
      '<svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 4.5h8M3 7h6M3 9.5h7" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/></svg>'+
    '</div>'+
    '<div style="flex:1">'+
      '<div style="font-size:13.5px;font-weight:600;color:#1d9e75;margin-bottom:4px">Avani AI</div>'+
      '<div style="display:flex;gap:4px;padding:4px 0;align-items:center">'+
        '<span style="width:7px;height:7px;border-radius:50%;background:#1d9e75;display:inline-block;animation:tdot .9s ease-in-out infinite"></span>'+
        '<span style="width:7px;height:7px;border-radius:50%;background:#1d9e75;display:inline-block;animation:tdot .9s ease-in-out .2s infinite"></span>'+
        '<span style="width:7px;height:7px;border-radius:50%;background:#1d9e75;display:inline-block;animation:tdot .9s ease-in-out .4s infinite"></span>'+
      '</div>'+
    '</div>';
  scroll.appendChild(row);
  scrollAssessToBottom();
}

// Add typing dot animation
(function(){var s=document.createElement('style');s.textContent='@keyframes tdot{0%,80%,100%{transform:scale(0.6);opacity:.5}40%{transform:scale(1);opacity:1}}';document.head.appendChild(s);})();

function removeTypingIndicator(){
  var t=document.getElementById('assess-typing');
  if(t) t.remove();
}

function escHtml(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function markdownToHtml(md){
  // Bold
  md = md.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  // Bullet lists
  md = md.replace(/^[\-\*] (.+)$/gm,'<li>$1</li>');
  md = md.replace(/(<li>.*<\/li>)/s, function(m){return '<ul style="margin:6px 0 6px 14px;padding:0;list-style:disc">'+m+'</ul>';});
  // Line breaks
  md = md.replace(/\n\n/g,'</p><p style="margin:6px 0 0">').replace(/\n/g,'<br>');
  return md;
}

async function sendAssessMessage(){
  if(assessIsLoading) return;
  var inp=document.getElementById('assess-input');
  var text=inp.value.trim();
  if(!text) return;

  // Hide chips after first message
  var chips=document.getElementById('assess-chips');
  if(chips) chips.style.display='none';

  // Add to UI + history
  appendUserBubble(text);
  assessHistory.push({role:'user', content: text});

  // Clear input
  inp.value='';
  inp.style.height='auto';
  assessInputChange(inp);

  // Show typing
  assessIsLoading=true;
  appendTypingIndicator();

  try {
    var res = await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-sonnet-4-6',
        max_tokens:1000,
        system: AVANI_SYSTEM,
        messages: assessHistory
      })
    });
    var data = await res.json();
    var reply = (data.content && data.content[0] && data.content[0].text) ? data.content[0].text : 'Sorry, I had trouble responding. Please try again.';
    assessHistory.push({role:'assistant', content: reply});
    removeTypingIndicator();
    appendAvaniBubble(markdownToHtml(reply));
    // Auto-save and auto-title after first exchange
    if(assessHistory.length===2) autoTitleSession();
    saveCurrentSession();
  } catch(e){
    removeTypingIndicator();
    appendAvaniBubble('⚠️ Connection issue. Please check your network and try again.');
  }
  assessIsLoading=false;
}

function handleAssessAttachment(input){if(!input.files||!input.files[0])return;var preview=document.getElementById('assess-attachment-preview');var nameEl=document.getElementById('assess-attachment-name');nameEl.textContent=input.files[0].name;preview.style.display='block';}
function removeAttachment(){document.getElementById('assess-attachment-preview').style.display='none';document.getElementById('assess-file-input').value='';}
var assessMicOn=false;
function toggleAssessMic(){
  assessMicOn=!assessMicOn;
  var btn=document.getElementById('assess-mic-btn');
  btn.style.background=assessMicOn?'#e24b4a':'#f2f2f7';
  btn.querySelector('i').style.color=assessMicOn?'#fff':'#666';
}

// ── History management ─────────────────────────────────────────
var assessSessions = JSON.parse(localStorage.getItem('avani_sessions')||'[]');
// Seed two realistic past sessions so history isn't empty on first load
if(assessSessions.length===0){
  var seedTs = Date.now();
  assessSessions = [
    {id:'seed1_'+seedTs, title:'How do I explain the 100-night trial?', ts: seedTs - 5400000, history:[
      {role:'user',content:'How do I explain the 100-night trial?'},
      {role:'assistant',content:"Keep it simple: customers get 100 nights to actually sleep on it at home — if it's not right, we do a free pickup and exchange, no questions asked. Lead with the confidence it shows in the product, not the fine print. Want to practise this one in the Practise tab?"}
    ]},
    {id:'seed2_'+seedTs, title:'What are my weak areas this week?', ts: seedTs - 96000000, history:[
      {role:'user',content:'What are my weak areas this week?'},
      {role:'assistant',content:"Looking at your last 5 logged conversations: greeting timing is strong, but cross-sell only came up once. Try pairing your mattress pitch with the orthopedic pillow every time — it's a natural add-on and you're leaving it on the table."}
    ]}
  ];
  localStorage.setItem('avani_sessions', JSON.stringify(assessSessions));
}

var currentSessionId = null;

function genId(){ return 'sess_'+Date.now()+'_'+Math.random().toString(36).slice(2,7); }

function saveCurrentSession(){
  if(!assessHistory.length || !currentSessionId) return;
  var idx = assessSessions.findIndex(s=>s.id===currentSessionId);
  var sess = idx>=0 ? assessSessions[idx] : {id:currentSessionId, title:'New chat', ts: Date.now(), history:[]};
  sess.history = assessHistory.slice();
  sess.ts = Date.now();
  if(idx>=0) assessSessions[idx]=sess; else assessSessions.unshift(sess);
  // keep max 50 sessions
  if(assessSessions.length>50) assessSessions=assessSessions.slice(0,50);
  localStorage.setItem('avani_sessions', JSON.stringify(assessSessions));
}

async function autoTitleSession(){
  if(!currentSessionId) return;
  var firstUser = assessHistory.find(m=>m.role==='user');
  if(!firstUser) return;
  // Use first user message as title (trimmed)
  var title = firstUser.content.slice(0,48);
  if(firstUser.content.length>48) title+='…';
  var idx=assessSessions.findIndex(s=>s.id===currentSessionId);
  if(idx>=0){assessSessions[idx].title=title;localStorage.setItem('avani_sessions',JSON.stringify(assessSessions));}
}

function startNewAssessChat(){
  // Save current before starting new
  saveCurrentSession();
  currentSessionId = genId();
  assessHistory = [];
  assessIsLoading = false;
  closeAssessHistory();
  var titleEl=document.getElementById('assess-session-title');
  if(titleEl) titleEl.textContent='New session';

  // Reset DOM
  var scroll = document.getElementById('assess-chat-scroll');
  scroll.innerHTML = `
    <div class="avani-msg-row" style="display:flex;gap:8px;margin-bottom:16px;align-items:flex-start">
      <div style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#0f6e56,#1d9e75);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 4.5h8M3 7h6M3 9.5h7" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/></svg>
      </div>
      <div style="flex:1">
        <div style="font-size:13.5px;font-weight:600;color:#1d9e75;margin-bottom:4px;letter-spacing:.2px">Avani AI</div>
        <div class="avani-bubble" style="font-size:15.5px;color:#1a1a1a;line-height:1.6">Ready to assess! Ask me anything about products, sales techniques, or objection handling — I'll give you feedback and coaching. 🎯</div>
        <div id="assess-chips" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">
          <div onclick="assessChip('How do I explain the 100-night trial?')" style="padding:6px 11px;background:#fff;border:1px solid #e0e0e0;border-radius:20px;font-size:14.5px;color:#333;cursor:pointer;display:flex;align-items:center;gap:5px;box-shadow:0 1px 3px rgba(0,0,0,.05);white-space:nowrap"><i class="ti ti-moon" style="font-size:15px;color:#1d9e75"></i>100-night trial</div>
          <div onclick="assessChip('How do I handle price objections?')" style="padding:6px 11px;background:#fff;border:1px solid #e0e0e0;border-radius:20px;font-size:14.5px;color:#333;cursor:pointer;display:flex;align-items:center;gap:5px;box-shadow:0 1px 3px rgba(0,0,0,.05);white-space:nowrap"><i class="ti ti-currency-rupee" style="font-size:15px;color:#1d9e75"></i>Price objection</div>
          <div onclick="assessChip('What are my weak areas this week?')" style="padding:6px 11px;background:#fff;border:1px solid #e0e0e0;border-radius:20px;font-size:14.5px;color:#333;cursor:pointer;display:flex;align-items:center;gap:5px;box-shadow:0 1px 3px rgba(0,0,0,.05);white-space:nowrap"><i class="ti ti-chart-bar" style="font-size:15px;color:#1d9e75"></i>My weak areas</div>
          <div onclick="assessChip('Quiz me on the warranty policy')" style="padding:6px 11px;background:#fff;border:1px solid #e0e0e0;border-radius:20px;font-size:14.5px;color:#333;cursor:pointer;display:flex;align-items:center;gap:5px;box-shadow:0 1px 3px rgba(0,0,0,.05);white-space:nowrap"><i class="ti ti-shield" style="font-size:15px;color:#1d9e75"></i>Warranty quiz</div>
        </div>
      </div>
    </div>`;

  var inp=document.getElementById('assess-input');
  inp.value='';inp.style.height='auto';assessInputChange(inp);
}

function loadSession(id){
  saveCurrentSession();
  var sess=assessSessions.find(s=>s.id===id);
  if(!sess) return;
  currentSessionId=id;
  assessHistory=sess.history.slice();
  assessIsLoading=false;

  var scroll=document.getElementById('assess-chat-scroll');
  scroll.innerHTML='';

  // Replay messages into DOM
  assessHistory.forEach(function(m){
    if(m.role==='user') appendUserBubble(m.content);
    else appendAvaniBubble(markdownToHtml(m.content));
  });
  scrollAssessToBottom();
  closeAssessHistory();
  var titleEl=document.getElementById('assess-session-title');
  if(titleEl && sess.title) titleEl.textContent=sess.title.slice(0,30)+(sess.title.length>30?'…':'');
}

function deleteSession(id, e){
  e.stopPropagation();
  assessSessions=assessSessions.filter(s=>s.id!==id);
  localStorage.setItem('avani_sessions',JSON.stringify(assessSessions));
  if(currentSessionId===id) startNewAssessChat();
  renderHistoryList('');
}

function timeAgo(ts){
  var d=Math.floor((Date.now()-ts)/1000);
  if(d<60) return 'Just now';
  if(d<3600) return Math.floor(d/60)+'m ago';
  if(d<86400) return Math.floor(d/3600)+'h ago';
  return Math.floor(d/86400)+'d ago';
}

function groupByDate(sessions){
  var groups={Today:[],Yesterday:[],Earlier:[]};
  var now=new Date(),today=now.toDateString();
  var yest=new Date(now-86400000).toDateString();
  sessions.forEach(function(s){
    var d=new Date(s.ts).toDateString();
    if(d===today) groups.Today.push(s);
    else if(d===yest) groups.Yesterday.push(s);
    else groups.Earlier.push(s);
  });
  return groups;
}

function renderHistoryList(filter){
  var list=document.getElementById('history-list');
  var empty=document.getElementById('history-empty');
  var filtered=assessSessions.filter(s=>!filter||s.title.toLowerCase().includes(filter.toLowerCase()));

  if(!filtered.length){
    list.innerHTML='';
    empty.style.display='flex';
    return;
  }
  empty.style.display='none';

  var groups=groupByDate(filtered);
  var html='';
  Object.keys(groups).forEach(function(label){
    if(!groups[label].length) return;
    html+='<div style="padding:6px 8px 3px;font-size:12.5px;font-weight:700;color:#aaa;text-transform:uppercase;letter-spacing:.4px">'+label+'</div>';
    groups[label].forEach(function(s){
      var isActive=s.id===currentSessionId;
      var preview=s.title;
      html+=`<div onclick="loadSession('${s.id}')" style="padding:7px 8px;cursor:pointer;background:${isActive?'#e1f5ee':'transparent'};border-left:2px solid ${isActive?'#1d9e75':'transparent'};position:relative" onmouseenter="this.style.background='${isActive?'#e1f5ee':'#e8e8e8'}'" onmouseleave="this.style.background='${isActive?'#e1f5ee':'transparent'}'">
        <div style="display:flex;align-items:flex-start;gap:5px">
          <i class="ti ti-message-circle-2" style="font-size:15px;color:${isActive?'#1d9e75':'#aaa'};flex-shrink:0;margin-top:1px"></i>
          <div style="flex:1;min-width:0">
            <div style="font-size:13.5px;font-weight:${isActive?'600':'400'};color:${isActive?'#0f6e56':'#333'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.3">${escHtml(preview)}</div>
            <div style="font-size:12.5px;color:#bbb;margin-top:1px">${timeAgo(s.ts)}</div>
          </div>
          <button onclick="deleteSession('${s.id}',event)" style="width:18px;height:18px;border-radius:4px;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;opacity:0" onmouseenter="this.style.opacity='1'" onmouseleave="this.style.opacity='0'">
            <i class="ti ti-x" style="font-size:13.5px;color:#e24b4a"></i>
          </button>
        </div>
      </div>`;
    });
  });
  list.innerHTML=html;
}

function filterHistoryList(val){ renderHistoryList(val); }

function openAssessHistory(){
  saveCurrentSession();
  renderHistoryList('');
  var search=document.getElementById('history-search');
  if(search) search.value='';
  var drawer=document.getElementById('assess-history-drawer');
  var backdrop=document.getElementById('assess-history-backdrop');
  drawer.style.pointerEvents='all';
  backdrop.style.display='block';
  requestAnimationFrame(function(){
    drawer.style.transform='translateX(0)';
    backdrop.style.opacity='1';
  });
}

function closeAssessHistory(){
  var drawer=document.getElementById('assess-history-drawer');
  var backdrop=document.getElementById('assess-history-backdrop');
  if(!drawer) return;
  drawer.style.transform='translateX(-100%)';
  backdrop.style.opacity='0';
  drawer.style.pointerEvents='none';
  setTimeout(function(){ backdrop.style.display='none'; }, 280);
}
function aPulseTab(el,tab){document.querySelectorAll('.ios-seg').forEach(s=>s.classList.remove('active'));el.classList.add('active');var _ai=document.getElementById('apc-instore');if(_ai)_ai.style.display=tab==='instore'?'block':'none';var _ac=document.getElementById('apc-customer');if(_ac)_ac.style.display=tab==='customer'?'block':'none';var _ak=document.getElementById('apc-kudos');if(_ak)_ak.style.display=tab==='kudos'?'block':'none';}
function sendKudos(el){el.style.background='#e1f5ee';el.style.borderColor='#1d9e75';var msg=document.getElementById('a-kudos-msg');if(msg){msg.style.display='block';}}
var dateCycle=['This Week','This Month','Today'],dateIdx=0;
function cycleDateFilter(btn){dateIdx=(dateIdx+1)%3;document.getElementById('dateFilterLabel').textContent=dateCycle[dateIdx];}
function iToggleConv(id){var detail=document.getElementById(id+'-detail'),chev=document.getElementById(id+'-chev'),isOpen=detail.classList.contains('open');document.querySelectorAll('.ios-tc-detail').forEach(d=>d.classList.remove('open'));document.querySelectorAll('.ios-tc-chevron').forEach(c=>c.classList.remove('open'));if(!isOpen){detail.classList.add('open');chev.classList.add('open');}}
function iConvTab(convId,tab,el){var detail=document.getElementById(convId+'-detail');detail.querySelectorAll('.ios-tc-tab').forEach(t=>t.classList.remove('active'));detail.querySelectorAll('.ios-tc-panel').forEach(p=>p.classList.remove('active'));el.classList.add('active');document.getElementById(convId+'-'+tab).classList.add('active');}
function dashConvTab(tab){
  var panels = {inperson: document.getElementById('dashconv-inperson'), calling: document.getElementById('dashconv-calling')};
  var tabs = {inperson: document.getElementById('dashconv-tab-inperson'), calling: document.getElementById('dashconv-tab-calling')};
  Object.keys(panels).forEach(function(k){
    if(panels[k]) panels[k].style.display = (k===tab) ? '' : 'none';
    if(tabs[k]){
      tabs[k].style.background = (k===tab) ? '#fff' : 'transparent';
      tabs[k].style.color = (k===tab) ? (tab==='calling'?'#7c3aed':'#0f6e56') : '#555';
      tabs[k].style.boxShadow = (k===tab) ? '0 1px 3px rgba(0,0,0,.1)' : 'none';
    }
  });
}
// ───────────────── Product Detail: catalog card → detail sheet with specs/reviews/video ─────────────────
var PRODUCT_DATA = {
  ortho_grid: {
    name:'Smart Ortho GRID Mattress', emoji:'🛏️', bg:'#e7f9ee', price:'₹8,490', orig:'₹14,490', badge:'-41%',
    rating:4.6, reviewCount:128, videoDur:'0:42',
    desc:'GRID-technology orthopedic mattress designed for spinal alignment and pressure relief. 100-night trial, 10-year warranty.',
    specs:['GRID pressure-relief technology','Medium-firm feel · back & side sleepers','100-night home trial','10-year warranty','Free installation & old mattress pickup'],
    reviews:[
      {name:'Priya M.', rating:5, text:"Back pain gone within 2 weeks. Best purchase this year."},
      {name:'Rahul K.', rating:4, text:'Great support but took a few nights to get used to the firmness.'},
      {name:'Ananya S.', rating:5, text:'Customer service was excellent, installation was quick and clean.'}
    ]
  },
  luxe: {
    name:'Smart Luxe Mattress', emoji:'🛏️', bg:'#f0f4ff', price:'₹13,390', orig:'₹20,990', badge:'-36%',
    rating:4.4, reviewCount:76, videoDur:'0:38',
    desc:'Premium memory-foam layer with cooling gel top for a plush, hotel-like sleep experience.',
    specs:['Cooling gel-infused memory foam','Plush-medium feel','100-night home trial','10-year warranty','Free installation & old mattress pickup'],
    reviews:[
      {name:'Vikram S.', rating:5, text:'Feels like a 5-star hotel bed. Worth every rupee.'},
      {name:'Meera T.', rating:4, text:'Very comfortable, wish it came in a firmer variant too.'},
      {name:'Suresh N.', rating:4, text:'Good quality, delivery took a day longer than promised.'}
    ]
  },
  tranquo: {
    name:'Tranquo Massager Chair', emoji:'🪑', bg:'#f0f0f0', price:'₹24,990', orig:'₹54,990', badge:'-54%',
    rating:4.7, reviewCount:54, videoDur:'1:05',
    desc:'Full-body massage chair with heat therapy, zero-gravity recline, and 4 pre-set massage programs.',
    specs:['Zero-gravity recline','4 massage programs + heat therapy','Bluetooth speaker built-in','3-year warranty','Free installation'],
    reviews:[
      {name:'Kavya R.', rating:5, text:"My husband hasn't left this chair since we bought it. Amazing for back pain."},
      {name:'Arjun D.', rating:5, text:'Heat + massage combo is fantastic after long work days.'},
      {name:'Divya P.', rating:4, text:'Great chair, a bit bulky for smaller living rooms.'}
    ]
  },
  aura: {
    name:'Aura Executive Chair', emoji:'🪑', bg:'#fdf4ee', price:'₹18,490', orig:'₹37,990', badge:'-51%',
    rating:4.5, reviewCount:41, videoDur:'0:51',
    desc:'Ergonomic executive chair with lumbar support, adjustable armrests, and breathable mesh back.',
    specs:['Adjustable lumbar support','Breathable mesh back','4D adjustable armrests','5-year warranty','Free installation'],
    reviews:[
      {name:'Rohan K.', rating:5, text:'Best chair for long work-from-home days. My back thanks me every day.'},
      {name:'Sneha L.', rating:4, text:'Comfortable and sturdy, assembly took about 20 minutes.'},
      {name:'Imran H.', rating:4, text:'Good value, armrests could be a bit more padded.'}
    ]
  }
};
function pdStars(rating){
  var full = Math.round(rating), s = '';
  for(var i=0;i<5;i++) s += (i<full ? '★' : '☆');
  return s;
}
window.openProductDetail = function(key){
  var d = PRODUCT_DATA[key];
  if(!d) return;
  document.getElementById('pdHeaderName').textContent = d.name;
  document.getElementById('pdEmoji').textContent = d.emoji;
  document.getElementById('pdHero').style.background = d.bg;
  document.getElementById('pdBadge').textContent = d.badge;
  document.getElementById('pdName').textContent = d.name;
  document.getElementById('pdPrice').textContent = d.price;
  document.getElementById('pdOrig').textContent = d.orig;
  document.getElementById('pdStars').textContent = pdStars(d.rating);
  document.getElementById('pdRatingText').textContent = d.rating + ' · ' + d.reviewCount + ' reviews';
  document.getElementById('pdDesc').textContent = d.desc;
  document.getElementById('pdVideoDur').textContent = d.videoDur;
  document.getElementById('pdReviewSummary').textContent = '★ ' + d.rating + ' (' + d.reviewCount + ')';

  var videoCard = document.getElementById('pdVideoCard');
  videoCard.classList.remove('playing');
  videoCard.querySelector('.pd-video-play').innerHTML = '<div class="pd-play-tri"></div>';
  videoCard.querySelector('.pd-video-title').textContent = 'Watch product video';

  document.getElementById('pdSpecs').innerHTML = d.specs.map(function(s){
    return '<div class="pd-spec-item"><span style="color:#0f6e56;font-weight:700">✓</span>'+s+'</div>';
  }).join('');

  document.getElementById('pdReviews').innerHTML = d.reviews.map(function(r){
    return '<div class="pd-review-item"><div class="pd-review-top"><span class="pd-review-name">'+r.name+'</span><span class="pd-review-stars">'+pdStars(r.rating)+'</span></div><div class="pd-review-text">'+r.text+'</div></div>';
  }).join('');

  document.getElementById('productDetailOverlay').classList.add('show');
};
window.closeProductDetail = function(){
  document.getElementById('productDetailOverlay').classList.remove('show');
  var videoCard = document.getElementById('pdVideoCard');
  if(videoCard) videoCard.classList.remove('playing');
};
window.pdPlayVideo = function(el){
  var playing = el.classList.toggle('playing');
  var icon = el.querySelector('.pd-video-play');
  var title = el.querySelector('.pd-video-title');
  if(playing){
    icon.innerHTML = '<div class="pd-pause-bars"><span></span><span></span></div>';
    title.textContent = 'Now playing…';
  } else {
    icon.innerHTML = '<div class="pd-play-tri"></div>';
    title.textContent = 'Watch product video';
  }
};

function openNoInterestSheet(name){document.getElementById('niLeadName').textContent=name;document.getElementById('noInterestOverlay').classList.add('show');}
function closeNoInterestSheet(){document.getElementById('noInterestOverlay').classList.remove('show');}
function submitNoInterest(){closeNoInterestSheet();closeLeadsModal();}
function openCameBackSheet(name){document.getElementById('cbLeadName').textContent=name;document.getElementById('cameBackOverlay').classList.add('show');}
function closeCameBackSheet(){document.getElementById('cameBackOverlay').classList.remove('show');}
function submitCameBack(){closeCameBackSheet();closeLeadsModal();}


function openDateRange(){document.getElementById('dateRangeOverlay').classList.add('show');}
function closeDateRange(){document.getElementById('dateRangeOverlay').classList.remove('show');}
function drPreset(el,label){
  document.querySelectorAll('.dr-preset').forEach(p=>p.classList.remove('active'));el.classList.add('active');
  var t=new Date(),f=new Date(t),fmt=d=>d.toISOString().slice(0,10);
  if(label==='This Week'){f=new Date(t);f.setDate(t.getDate()-t.getDay());}
  else if(label==='This Month'){f=new Date(t.getFullYear(),t.getMonth(),1);}
  else if(label==='Last 30 Days'){f=new Date(t);f.setDate(t.getDate()-29);}
  if(label!=='Custom'){document.getElementById('drFrom').value=fmt(f);document.getElementById('drTo').value=fmt(t);}
  else{document.getElementById('drFrom').focus();}
}
function applyDateRange(){
  var f=document.getElementById('drFrom').value,t=document.getElementById('drTo').value;
  var label=f.slice(5).replace('-','/')+' – '+t.slice(5).replace('-','/');
  var lbl=document.getElementById('dateFilterLabel')||document.getElementById('dashDateLbl');
  if(lbl)lbl.textContent=label;
  var pb=document.getElementById('progBannerPeriod'); if(pb) pb.textContent=label;
  closeDateRange();
}


function openLeadAnalysisModal(){document.getElementById('leadAnalysisOverlay').classList.add('show');}
function closeLeadAnalysisModal(){document.getElementById('leadAnalysisOverlay').classList.remove('show');}

var STAFF_APP_KIND = 'callcentre';

// ═══════════════════════════════════════════════════════════════════════════════════════════
// ── Cascade from manager web v6 (staff side): agent channels open with a structured
// Stakeholders / Issue / Suggested resolution card, every agent names the metric it is improving,
// and manager agents show this staff member's share of the owner's goal plus their own part.
// Setup (owners, goals, task vs role agents) lives with managers; staff only see the results. ──
// ═══════════════════════════════════════════════════════════════════════════════════════════
var STAFF_IS_CC = (typeof STAFF_APP_KIND !== 'undefined' && STAFF_APP_KIND === 'callcentre');
var STAFF_GOAL_LINKS = {
  'EMI Push Nudge': {kind:'Task', improving:{label:'EMI pitch rate', value:'36%', delta:-2}, owner:'your Store Manager', ownerPoss:'your Store Manager\'s goal',
    goals:[{label:(STAFF_IS_CC?'Call centre':'RT Nagar')+': attach / EMI rate', now:29, target:35, unit:'%'}],
    yours: STAFF_IS_CC ? 'EMI came up in 4 of your 11 calls this shift. Two more gets the call centre back on pace.' : 'EMI came up in 4 of your 11 conversations this shift. Two more gets the store back on pace.',
    lens: STAFF_IS_CC ? 'This counts toward your Store Manager\'s attach / EMI goal of 35%. The call centre is at 29%.' : 'RT Nagar is at 29% attach / EMI against your Store Manager\'s 35% goal. Every EMI you mention moves it.'},
  'Follow-up Agent': {kind:'Task', improving:{label:'Lead conversion', value:'82%', delta:3.2}, owner:'Arvind M. (ASM)', ownerPoss:'your ASM Arvind M.\'s goals',
    goals: STAFF_IS_CC
      ? [{label:'Call centre: leads followed up in 48h', now:64, target:90, unit:'%'}, {label:'Store conversion (all stores)', now:27.4, target:32, unit:'%'}]
      : [{label:'RT Nagar: store conversion', now:28.9, target:32, unit:'%'}, {label:'RT Nagar: leads followed up in 48h', now:73, target:90, unit:'%'}],
    yours: STAFF_IS_CC ? '9 of your allocated leads are past 48h without a call. Clearing them lifts the call centre\'s follow-up rate by about 3 pts.' : '6 of your leads are past 48h without a follow-up. Clearing them is worth about +0.3 pts of RT Nagar conversion.',
    lens: STAFF_IS_CC ? 'Arvind M. (ASM) owns this goal. Your calls are how leads get followed up inside 48h.' : 'RT Nagar is at 28.9% conversion against the 32% goal Arvind M. (ASM) carries. Your follow-ups count toward it.'},
  'Skill Improvement Coach': {kind:'Task', improving:{label:'Your SOP adherence', value:'68%', delta:1.5}, owner:'you', goals:[{label:'Your weakest step: warranty pitch', now:40, target:80, unit:'%'}],
    yours:'Warranty pitch came up in 2 of your last 5 conversations. One practice session a day usually closes this in a week.', lens:'This one is yours. Your Store Manager and L&D only see what you share.'},
  'My SOP Coach': {kind:'Task', improving:{label:'Your SOP adherence', value:'66%', delta:1.2}, owner:'you', goals:[{label:'Your weakest step: warranty pitch', now:40, target:80, unit:'%'}],
    yours:'Warranty pitch came up in 2 of your last 5 calls.', lens:'This one is yours. Your Store Manager and L&D are looped in only if it doesn\'t improve.'},
  'Recognition Bot': {kind:'Task', improving:{label:'Wins flagged to your manager', value:'3 this week', delta:1}, owner:'you', goals:[],
    yours:'3 of your wins were flagged this week, including a price-objection save.', lens:'Your wins go to your Store Manager automatically.'}
};
// Manager agents staff inherit (in addition to #emi-push-nudges).
(function(){
  if(!PULSE_INTERNAL_THREADS['EMI Push Nudge']){
    PULSE_INTERNAL_THREADS['EMI Push Nudge'] = {title:'#emi-push-nudges', dateLabel:'Today', messages:[
      {who:'EMI Push Nudge', init:'💳', bg:'#fdecd8', color:'#c2410c', isBot:true, time:'11:15am',
       text:'👥 <b>STAKEHOLDERS:</b> <b style="color:#5b21b6">@You</b> and your Store Manager.<br><br>📋 <b>ISSUE DEFINITION:</b> EMI mentioned in only 4 of 11 calls this shift (36%), below the 50% target.<br><br>➡️ <b>SUGGESTED RESOLUTION:</b> Try this line on your next call: "Would it help to split this into easy monthly payments? Most customers pick the 12-month option." If the rate is still under target by 5 PM, I\'ll flag it to your Store Manager.'}
    ]};
  }
  PULSE_INTERNAL_THREADS['Follow-up Agent'] = {title:'#lead-conversion', dateLabel:'Today', messages:[
    {who:'Follow-up Agent', init:'📈', bg:'#fdecd8', color:'#c2410c', isBot:true, time:'9:00am',
     text: STAFF_IS_CC
       ? '👥 <b>STAKEHOLDERS:</b> <b style="color:#5b21b6">@You</b>, the call centre lead, and Arvind M. (ASM, owner).<br><br>📋 <b>ISSUE DEFINITION:</b> 9 of your allocated leads are past 48h without a call. The oldest is Sameer Q. (intent 67), last touched Monday.<br><br>➡️ <b>SUGGESTED RESOLUTION:</b> Call Sameer Q. first, then work down by intent score. Your call log updates this channel automatically. If any are still untouched in 24h, I\'ll reassign them.'
       : '👥 <b>STAKEHOLDERS:</b> <b style="color:#5b21b6">@You</b>, your Store Manager, and Arvind M. (ASM, owner).<br><br>📋 <b>ISSUE DEFINITION:</b> 6 of your leads are past 48h without a follow-up. The warmest is Ritu S., who asked about EMI and warranty on Wednesday.<br><br>➡️ <b>SUGGESTED RESOLUTION:</b> Call or WhatsApp Ritu S. first. Anything you log from the lead screen shows up here, so there\'s nothing to report by hand. If she\'s still untouched in 24h, I\'ll flag it to your Store Manager.'}
  ]};
  var add = {id:'lead-conversion', name:'lead-conversion', agent:'Follow-up Agent', icon:'📈', meta:'', time:'9:00am', badge:1, active:true};
  if(!STAFF_VERTICAL_AGENT_CHANNELS.filter(function(c){ return c.id === add.id; }).length) STAFF_VERTICAL_AGENT_CHANNELS.push(add);
})();
function staffNamedPill(g){
  var up = g.improving.delta >= 0, fg = up?'#0f6e56':'#a32d2d', bg = up?'#e1f5ee':'#fdecec';
  return '<span class="snm-pill" style="background:'+bg+';color:'+fg+'"><span class="l">Improving</span><b>'+g.improving.label+'</b><span class="v">'+g.improving.value+' '+(up?'▲':'▼')+Math.abs(g.improving.delta)+'</span></span>';
}
function staffGoalChips(g){
  return g.goals.map(function(x){
    var pct = Math.max(4, Math.min(100, Math.round(x.now / x.target * 100)));
    var gap = Math.round((x.target - x.now) * 10) / 10;
    return '<div class="sgc"><div class="sgc-top"><span>'+x.label+'</span><b>'+x.now+x.unit+' <em>of '+x.target+x.unit+'</em></b></div><div class="sgc-bar"><span style="width:'+pct+'%"></span></div><div class="sgc-foot">'+(gap > 0 ? gap+(x.unit==='%'?' pts':'')+' to go' : 'On track')+'</div></div>';
  }).join('');
}
function staffGoalStripHtml(name){
  var g = STAFF_GOAL_LINKS[name]; if(!g) return '';
  return '<div class="sgs-top">'+staffNamedPill(g)+'<span class="skind">'+g.kind+' agent</span></div>'
    + (g.goals.length ? '<div class="sgs-owner">Moves '+(g.owner === 'you' ? 'your own goal' : (g.ownerPoss || g.owner+'\'s goal'))+'</div><div class="sgs-chips">'+staffGoalChips(g)+'</div>' : '')
    + '<div class="sgs-yours"><b>Your part:</b> '+g.yours+'</div>';
}
// Opening card: one or more bot messages carrying STAKEHOLDERS / ISSUE DEFINITION / SUGGESTED
// RESOLUTION are shown as a single structured card, with the goal link and "your view" rows.
function staffParseOpening(text){
  var t = String(text||'');
  var grab = function(label, next){
    var re = new RegExp(label + ':<\\/b>\\s*([\\s\\S]*?)' + (next ? '(?=(?:<br>\\s*)*(?:👥|📋|➡️)\\s*<b>)' : '$'));
    var m = re.exec(t); return m ? m[1].replace(/(<br>\s*)+$/,'').trim() : null;
  };
  return {who:grab('STAKEHOLDERS', true) || grab('STAKEHOLDERS'), what:grab('ISSUE DEFINITION', true) || grab('ISSUE DEFINITION'), fix:grab('SUGGESTED RESOLUTION')};
}
function staffOpeningCardHtml(parts, name){
  var g = STAFF_GOAL_LINKS[name];
  var row = function(cls, k, v){ return v ? '<div class="soc-row '+cls+'"><div class="soc-k">'+k+'</div><div class="soc-v">'+v+'</div></div>' : ''; };
  return '<div class="staff-opening-card">'
    + (g ? '<div class="soc-head"><span class="skind">'+g.kind+' agent</span>Improving <b>'+g.improving.label+'</b></div>' : '')
    + row('', 'Stakeholders', parts.who)
    + row('soc-issue', 'Issue', parts.what)
    + row('soc-fix', 'Suggested resolution', parts.fix)
    + (g && g.goals.length && g.owner !== 'you' ? row('soc-goal', 'Goal link', g.goals.map(function(x){ return x.label+' '+x.now+x.unit+' of '+x.target+x.unit; }).join('; ')+'. Owner: '+g.owner+'.') : '')
    + (g ? row('soc-lens', 'Your view', g.lens) : '')
  + '</div>';
}
(function(){
  var origThread = renderStaffPulseThread;
  renderStaffPulseThread = function(){
    var d = PULSE_INTERNAL_THREADS[pulseChatActive];
    if(!d || !d.messages || !d.messages.length) return origThread();
    var real = d.messages;
    var out = [];
    for(var i = 0; i < real.length; i++){
      var m = real[i];
      if(m.isBot && /STAKEHOLDERS:<\/b>/.test(m.text||'')){
        var joined = m.text; var j = i + 1;
        while(j < real.length && real[j].isBot && real[j].who === m.who && /(ISSUE DEFINITION|SUGGESTED RESOLUTION):<\/b>/.test(real[j].text||'') && !/STAKEHOLDERS:<\/b>/.test(real[j].text||'')){
          joined += '<br><br>' + real[j].text; j++;
        }
        var parts = staffParseOpening(joined);
        if(parts.what || parts.fix){
          out.push(Object.assign({}, m, {text:staffOpeningCardHtml(parts, pulseChatActive)}));
          i = j - 1; continue;
        }
      }
      out.push(m);
    }
    d.messages = out;
    try { origThread(); } finally { d.messages = real; }
  };
  var origOpen = openPulseChat;
  openPulseChat = function(name, initials, channel, type){
    origOpen(name, initials, channel, type);
    var strip = document.getElementById('pchatGoalStrip');
    if(!strip){
      var title = document.getElementById('pchatTitle'); if(!title) return;
      strip = document.createElement('div'); strip.id = 'pchatGoalStrip'; strip.className = 'staff-goal-strip';
      title.parentNode.insertAdjacentElement('afterend', strip);
    }
    var html = staffGoalStripHtml(name);
    strip.innerHTML = html; strip.style.display = html ? 'block' : 'none';
  };
  window.openPulseChat = openPulseChat;
})();
// Channel rows and the staff agent fold name the metric each agent is improving.
renderStaffVerticalAgentChannels = function(){
  var box = document.getElementById('staffVerticalAgentChannels'); if(!box) return;
  var live = STAFF_VERTICAL_AGENT_CHANNELS.filter(function(c){ return c.active; });
  if(!live.length){ box.innerHTML = ''; return; }
  box.innerHTML = '<div style="display:flex;align-items:center;gap:6px;margin:0 12px 6px;font-size:12.5px;color:#7c3aed;font-weight:700"><i class="ti ti-diamond" style="font-size:14px"></i>From your manager\'s Custom Agents</div>'
    + live.map(function(c){
        var g = STAFF_GOAL_LINKS[c.agent];
        var meta = g ? 'Improving '+g.improving.label+' · '+g.improving.value : c.meta;
        return '<div class="slack-ch-row" onclick="openPulseChat(\''+c.agent+'\',\''+c.icon+'\',\'#'+c.id+'\',\'agent\')">'
          + '<span class="slack-ch-hash">#</span>'
          + '<div class="slack-ch-body"><span class="slack-ch-name">'+c.name+'</span><span class="slack-ch-meta">'+meta+'</span></div>'
          + '<span class="slack-ch-time">'+c.time+'</span>'+(c.badge?'<span class="slack-ch-badge">'+c.badge+'</span>':'')
        + '</div>';
      }).join('');
};
renderStaffAgentCatalog = function(){
  var box = document.getElementById('staffAgentFoldBody'); if(!box) return;
  box.innerHTML = Object.keys(STAFF_AGENT_TASKS).map(function(key){
    var t = STAFF_AGENT_TASKS[key]; var g = STAFF_GOAL_LINKS[t.title];
    return '<div onclick="openStaffAgentChannel(\''+key+'\')" style="display:flex;align-items:center;gap:10px;background:#fafafc;border:1px solid #ece7fa;border-radius:12px;padding:10px 11px;margin-top:7px;cursor:pointer">'
      + '<div style="width:34px;height:34px;border-radius:10px;background:'+t.gradient+';display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px">'+t.icon+'</div>'
      + '<div style="flex:1;min-width:0"><div style="font-size:15px;font-weight:700;color:#1a1a1a">'+t.title+'</div><div style="font-size:13.5px;color:#8e8e93">'+(g ? 'Improving '+g.improving.label : t.sub)+'</div></div>'
      + '<i class="ti ti-chevron-right" style="font-size:16px;color:#c5c5c5;flex-shrink:0"></i>'
    + '</div>';
  }).join('');
};
document.addEventListener('DOMContentLoaded', function(){ renderStaffVerticalAgentChannels(); });


/* --- inline script that was inside the markup --- */
document.addEventListener('DOMContentLoaded', function(){ var b=document.getElementById('avaniDefaultBtn'); if(b && typeof aSetMode==='function') aSetMode(b,'assess'); });
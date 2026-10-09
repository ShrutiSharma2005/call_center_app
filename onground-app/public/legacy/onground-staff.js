/* Pinned "Needs your input" bar: lives between the channel header and the message list, so it never scrolls away. */
window.HCPin=function(cfg){
  var P={cfg:cfg,done:{},open:true};
  function $(i){return document.getElementById(i);}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function pending(ch){ return (cfg.tasks[ch]||[]).filter(function(t){return !P.done[t.id];}); }
  P.pending=pending;
  P.left=function(){ var n=0; Object.keys(cfg.tasks).forEach(function(k){ n+=pending(k).length; }); return n; };
  var BID=cfg.barId||'hcPin';
  function bar(){ var b=$(BID); if(!b){ var body=$(cfg.bodyId); if(!body) return null; b=document.createElement('div'); b.id=BID; body.parentNode.insertBefore(b,body); } return b; }
  P.render=function(){
    var b=bar(); if(!b) return; var ch=cfg.active(); var list=pending(ch);
    if(!list.length){ b.style.display='none'; b.innerHTML=''; return; }
    b.style.cssText='display:block;flex-shrink:0;background:#fffaf0;border-bottom:1.5px solid #f59e0b;padding:8px 12px;max-height:46%;overflow-y:auto;box-shadow:0 2px 6px rgba(146,64,14,.08);position:relative;z-index:2';
    var head='<div style="display:flex;align-items:center;gap:7px;cursor:pointer" onclick="'+cfg.name+'.toggle()"><i class="ti ti-pin" style="font-size:16px;color:#b45309"></i><span style="font-size:13.5px;font-weight:800;color:#7a4a00">Needs your input</span><span style="background:#ef4444;color:#fff;font-size:11.5px;font-weight:800;padding:1px 7px;border-radius:9px">'+list.length+'</span><span style="font-size:12px;color:#a16207;margin-left:2px">pinned</span><i class="ti ti-chevron-'+(P.open?'up':'down')+'" style="margin-left:auto;color:#b45309"></i></div>';
    if(!P.open){ b.innerHTML=head+'<div style="font-size:13px;color:#1a1a1a;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(list[0].q)+(list.length>1?' <span style="color:#a16207">+'+(list.length-1)+' more</span>':'')+'</div>'; return; }
    b.innerHTML=head+list.map(function(t){
      return '<div style="background:#fff;border:1px solid #fde3b0;border-radius:10px;padding:9px 10px;margin-top:7px">'
       +'<div style="font-size:14px;font-weight:700;color:#1a1a1a">'+esc(t.q)+'</div>'
       +(t.ctx?'<div style="font-size:12.5px;color:#6b7280;margin-top:2px">'+esc(t.ctx)+'</div>':'')
       +'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:7px">'+(t.opts||[]).map(function(o){ return '<button onclick="'+cfg.name+'.answer(\''+t.id+'\',this.textContent)" style="border:1px solid #d6d6db;background:#fff;color:#1a1a1a;font:inherit;font-size:12.5px;font-weight:700;border-radius:8px;padding:5px 10px;cursor:pointer">'+esc(o)+'</button>'; }).join('')+'</div>'
       +'<div style="display:flex;gap:6px;margin-top:7px"><input id="hcPinIn-'+t.id+'" placeholder="Or type your answer" onkeydown="if(event.key===\'Enter\')'+cfg.name+'.answerText(\''+t.id+'\')" oninput="var e=document.getElementById(\'hcPinErr-'+t.id+'\');if(e)e.textContent=\'\'" style="flex:1;min-width:0;border:1px solid #e5e5ea;border-radius:8px;padding:6px 9px;font:inherit;font-size:13px"><button onclick="'+cfg.name+'.answerText(\''+t.id+'\')" style="border:none;background:#92400e;color:#fff;font:inherit;font-size:12.5px;font-weight:700;border-radius:8px;padding:6px 11px;cursor:pointer">Send</button></div>'
       +'<div id="hcPinErr-'+t.id+'" style="font-size:12px;color:#b91c1c;margin-top:3px"></div></div>';
    }).join('');
  };
  P.toggle=function(){ P.open=!P.open; P.render(); };
  P.answerText=function(id){ var i=$('hcPinIn-'+id); var v=i?i.value.trim():''; if(!v){ var e=$('hcPinErr-'+id); if(e) e.textContent='Type an answer first'; return; } P.answer(id,v); };
  P.answer=function(id,text){
    if(P.done[id]) return; P.done[id]=true;
    var body=$(cfg.bodyId);
    if(body){ body.insertAdjacentHTML('beforeend','<div style="display:flex;gap:8px;margin:10px 0;align-items:flex-start"><div style="width:30px;height:30px;border-radius:50%;background:#0f6e56;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">You</div><div><div style="font-size:12.5px;font-weight:800;color:#1a1a1a">You <span style="font-weight:500;color:#8e8e93">just now</span></div><div style="font-size:14px;color:#1a1a1a;margin-top:2px">'+esc(text)+'</div><div style="font-size:12px;color:#15803d;font-weight:700;margin-top:3px"><i class="ti ti-check"></i> Task done · removed from your tasks</div></div></div>'); body.scrollTop=body.scrollHeight; }
    P.render(); P.badges(); if(cfg.onDone) cfg.onDone(id,text);
  };
  P.badges=function(){
    document.querySelectorAll('.hc-pin-badge').forEach(function(x){x.remove();});
    Object.keys(cfg.tasks).forEach(function(ch){ var n=pending(ch).length; if(!n) return;
      document.querySelectorAll('[onclick*="openPulseChat(\''+ch+'\'"]').forEach(function(r){ if(r.closest('#'+BID)) return; r.insertAdjacentHTML('beforeend','<span class="hc-pin-badge" title="Needs your input" style="background:#f59e0b;color:#fff;font-size:11px;font-weight:800;padding:1px 7px;border-radius:9px;margin-left:6px;flex-shrink:0"><i class="ti ti-pin" style="font-size:11px"></i> '+n+'</span>'); });
    });
  };
  P.go=function(ch){ cfg.openChannel(ch); setTimeout(function(){ P.open=true; P.render(); var t=pending(ch)[0]; if(t){ var i=$('hcPinIn-'+t.id); } },100); };
  return P;
};

/* Custom agents in Pulse, one combined list of two types:
   Role agents (run a team: ASM, call centre, field) and Task agents (move one metric: cross-sell, SOP, lead conversion, capture).
   Every channel runs the same day: 9:00 digest (Context + Tasks) -> pinned asks and nudges -> 5:00pm reminder -> 6:00pm report (managers only).
   Each channel shows its one key metric in the header, and M3 can add members. */
window.HCRoleAgents=function(cfg){
  function M(n,r,val,d,well,imp,items,good,work,ack,notes){ return {n:n,r:r,val:val,d:d,well:well,imp:imp,items:items,good:good,work:work,ack:ack,notes:notes}; }
  var A={
    'asm-agent':{type:'role',name:'ASM Agent',icon:'ti-building-store',color:'#0f6e56',scope:'In-store staff · RT Nagar, Koramangala, Whitefield',metric:'Conversion',target:30,itemsLabel:'Leads to follow up',members:[
      M('Arvind Rajan','Advisor · Koramangala',31,4,'Offered EMI in 9 of 12 price talks','Ask for the phone number before the demo ends',[['Meera S.','Ortho Grid · call before 1pm'],['Karan P.','Recliner · send quote']],['EMI pitch','Product demo'],['Closing the ask'],true,false),
      M('Sameena S.','Advisor · RT Nagar',38,6,'Captured name and number in 20 of 22 talks','Mention the 100-night trial earlier',[['Divya R.','Pillows · revisit Sat']],['Lead capture','Rapport'],['Trial pitch'],true,true),
      M('Raju K.','Advisor · Koramangala',18,-5,'Strong product knowledge','Greeting came after 40s in 9 talks',[['Rohit B.','Hybrid · price objection']],['Product knowledge'],['Greeting in first 10s','EMI pitch'],false,false),
      M('Priya K.','Advisor · Whitefield',25,1,'Good cross-sell of protectors','Follow up within 24h',[['Anil M.','Ortho Grid · callback 4pm']],['Cross-sell'],['Follow-up speed'],false,true)]},
    'callcentre-agent':{type:'role',name:'Call Centre Agent',icon:'ti-headset',color:'#1d4ed8',scope:'All call-centre staff',metric:'Conversion',target:28,itemsLabel:'Leads to follow up',members:[
      M('Arvind Rajan','Call centre',29,3,'Booked 6 store visits from callbacks','Greeting in the first 10 seconds on 71% of calls',[['Priya Iyer','Billing dispute · call 4:30pm'],['Suresh Nair','Plan upgrade · log outcome']],['Booking visits','Objection handling'],['Opening greeting'],true,false),
      M('Neha P.','Call centre',33,2,'Offered EMI on 11 more calls','Shorter hold times',[['Ravi T.','Mattress · send link']],['EMI offer'],['Hold time'],true,true),
      M('Faiz A.','Call centre',21,-4,'Polite and clear','Ask for the visit, not just the callback',[['Lata V.','Callback 6pm']],['Tone'],['Asking for the visit'],false,false)]},
    'field-agent':{type:'role',name:'Field Staff Agent',icon:'ti-map-pin',color:'#b45309',scope:'All field staff',metric:'Conversion',target:35,itemsLabel:'Leads to follow up',members:[
      M('Kiran T.','Field · North',44,5,'Closed 4 of 9 home visits','Log notes right after each visit',[['Mehta family','Hybrid king · second visit Sat']],['Home demo','Closing'],['Visit notes'],true,false),
      M('Rohit B.','Field · South',29,-2,'Good at bundle offers','3 visits have no notes',[['Iyer residence','Measure for bed frame']],['Bundles'],['Visit notes','On-time arrival'],false,false),
      M('Meena J.','Field · East',38,3,'Every visit confirmed a day ahead','Ask for referrals at the end',[['Kapoor family','Quote follow-up']],['Visit prep'],['Referrals'],true,true)]},
    'cross-sell-agent':{type:'task',name:'Cross-sell & Upsell Agent',icon:'ti-shopping-cart-plus',color:'#7c3aed',scope:'Stores, calls and field',metric:'Attach rate',target:25,itemsLabel:'Customers to upsell',members:[
      M('Arvind Rajan','Advisor · Koramangala',24,2,'Added a protector in 4 of 12 sales','Offer the pillow bundle before billing',[['Meera S.','Bought mattress, no protector · call today'],['Karan P.','Queen to king upgrade · send quote']],['Protector pitch'],['Pillow bundle'],true,false),
      M('Sameena S.','Advisor · RT Nagar',31,3,'Bundled pillows in 7 sales','Try the king upgrade on couples',[['Divya R.','Upgrade to Ortho Grid · revisit Sat']],['Bundles'],['Upgrade ask'],true,true),
      M('Raju K.','Advisor · Koramangala',14,-2,'Explains features well','Ask "anything for the pillows?" at billing',[['Rohit B.','No add-ons yet']],['Product knowledge'],['Add-on ask'],false,false),
      M('Neha P.','Call centre',19,1,'Mentioned protectors on 9 calls','Offer the bundle price, not just the item',[['Ravi T.','Send bundle link']],['Phone pitch'],['Bundle price'],true,true),
      M('Kiran T.','Field · North',33,4,'Sold 3 bed frames on home visits','Leave the brochure for the base',[['Mehta family','Bed frame quote']],['Home demo'],['Brochure handover'],true,false)]},
    'sop-agent':{type:'task',name:'SOP Agent',icon:'ti-list-check',color:'#0e7490',scope:'Stores, calls and field',metric:'SOP adherence',target:85,itemsLabel:'Conversations to review',members:[
      M('Arvind Rajan','Advisor · Koramangala',81,2,'Asked for feedback on every closed sale','Greet within 10 seconds',[['Talk at 11:40am','Greeting after 35s'],['Talk at 3:05pm','No feedback ask']],['Feedback ask'],['Fast greeting'],true,false),
      M('Sameena S.','Advisor · RT Nagar',92,1,'Every SOP step in 19 of 22 talks','Keep it up on busy weekends',[['Talk at 6:10pm','Skipped trial pitch']],['Greeting','Feedback ask'],['Trial pitch'],true,true),
      M('Raju K.','Advisor · Koramangala',64,-4,'Good product walk-through','Greeting late in 9 talks',[['Talk at 12:15pm','No greeting'],['Talk at 4:40pm','No feedback ask']],['Walk-through'],['Greeting','Feedback ask'],false,false),
      M('Neha P.','Call centre',71,2,'Script followed on 30 calls','Open with name and store in first 10s',[['Call at 10:20am','Late greeting']],['Script'],['Opening greeting'],true,true),
      M('Kiran T.','Field · North',86,3,'Confirmed every visit a day ahead','Ask for referrals at the end',[['Visit · Mehta','No referral ask']],['Visit prep'],['Referral ask'],true,false)]},
    'lead-conversion-agent':{type:'task',name:'Lead Conversion Agent',icon:'ti-target-arrow',color:'#be123c',scope:'Stores, calls and field',metric:'Lead to sale',target:30,itemsLabel:'Leads to follow up',members:[
      M('Arvind Rajan','Advisor · Koramangala',31,3,'Called every lead within 24h','Book the revisit on the first call',[['Meera S.','Ortho Grid · call before 1pm'],['Karan P.','Recliner · send quote']],['Fast follow-up'],['Booking the revisit'],true,false),
      M('Sameena S.','Advisor · RT Nagar',38,4,'Closed 5 of 13 leads','Use WhatsApp for leads who miss calls',[['Divya R.','Pillows · revisit Sat']],['Closing'],['WhatsApp follow-up'],true,true),
      M('Raju K.','Advisor · Koramangala',18,-3,'Good first conversations','2 leads untouched for 24h',[['Mukunda R.','Hot lead · untouched 24h'],['Ritu S.','Hot lead · untouched 24h']],['First meeting'],['Follow-up speed'],false,false),
      M('Neha P.','Call centre',33,2,'Booked 4 visits','Confirm the visit a day ahead',[['Ravi T.','Visit Sat 11am']],['Booking visits'],['Visit confirmation'],true,true),
      M('Kiran T.','Field · North',44,5,'Closed 4 of 9 visits','Log notes right after each visit',[['Mehta family','Second visit Sat']],['Closing'],['Visit notes'],true,false)]},
    'capture-agent':{type:'task',name:'Conversation Capture Agent',icon:'ti-microphone',color:'#0f766e',scope:'Stores, calls and field',metric:'Capture coverage',target:90,itemsLabel:'Shifts to capture',members:[
      M('Arvind Rajan','Advisor · Koramangala',78,1,'Recorded every afternoon talk','Start recording at the greeting',[['Mon 11am to 1pm','App not recording'],['Tue 6pm to 8pm','Phone on silent mode']],['Afternoon coverage'],['Starting at the greeting'],true,false),
      M('Sameena S.','Advisor · RT Nagar',94,2,'Recorded 21 of 22 talks','Keep the phone charged on long shifts',[['Sat 7pm to 9pm','Battery died']],['Consistency'],['Battery'],true,true),
      M('Raju K.','Advisor · Koramangala',61,-6,'Always asks consent','3 shifts with no recording',[['Mon full shift','No recording'],['Wed 12pm to 3pm','No recording']],['Consent ask'],['Starting the recording'],false,false),
      M('Neha P.','Call centre',88,1,'Every call auto-recorded','Tag outcomes after each call',[['Thu 4pm to 6pm','Calls untagged']],['Tagging'],['Outcome tags'],true,true),
      M('Kiran T.','Field · North',70,3,'Recorded 7 of 9 visits','Start before you step in',[['Visit · Iyer','Not recorded']],['Field recording'],['Starting before entry'],true,false)]}
  };
    var R={A:A,cur:null,off:{},memOpen:false};
  function $(i){return document.getElementById(i);}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  var isMgr=cfg.viewer==='manager';
  function viewerName(id){ if(isMgr) return null; return A[id].type==='role'?cfg.viewer[id]:(cfg.taskViewer?cfg.taskViewer():null); }
  function me(id){ var la=A[id]; if(la&&la.type==='leader'){ return isMgr?null:me(la.of); } var v=viewerName(id); if(!v) return null; return A[id].members.filter(function(m){return m.n===v;})[0]; }
  function avg(a){ return Math.round(a.members.reduce(function(s,m){return s+m.val;},0)/a.members.length); }
  function avgD(a){ return Math.round(a.members.reduce(function(s,m){return s+m.d;},0)/a.members.length*10)/10; }
  R.me=me;
  R.visible=function(){ return Object.keys(A).filter(function(id){ if(R.off[id]) return false; if(isMgr) return true;
    if(A[id].type==='leader') return false;
    if(A[id].type==='role') return !!cfg.viewer[id] && (!cfg.showOnly || cfg.showOnly()===id);
    return !!me(id); }); };
  var askObj={};
  function buildAsks(){
    Object.keys(askObj).forEach(function(k){ delete askObj[k]; });
    if(isMgr){
      askObj['asm-agent']=[{id:'ra-m1',q:'2 people haven\'t acknowledged today\'s tasks',ctx:'Raju K. and Priya K.',opts:['Nudge them now','Remind at 1pm']}];
      askObj['callcentre-agent']=[{id:'ra-m2',q:'Approve this week\'s coaching focus',ctx:'Opening greeting in the first 10 seconds · team at 71%',opts:['Approve','Pick another']}];
      askObj['field-agent']=[{id:'ra-m3',q:'Rohit B. has 3 visits without notes',ctx:'Ask him to update before 5pm?',opts:['Ask him','Skip today']}];
      askObj['cross-sell-agent']=[{id:'ra-m4',q:'Approve the pillow and protector bundle script',ctx:'For all stores from tomorrow · attach rate 24%, target 25%',opts:['Approve','Edit first']}];
      askObj['sop-agent']=[{id:'ra-m5',q:'Raju K. is at 64% SOP adherence',ctx:'Assign a coaching session this week?',opts:['Assign Fahmy (L&D)','Not now']}];
      askObj['lead-conversion-agent']=[{id:'n8',q:'Assign the 2 hot leads untouched for 24h',ctx:'Mukunda R. and Ritu S.',opts:['Assign to Priya','Assign to Arvind']}];
      askObj['capture-agent']=[{id:'ra-m7',q:'3 shifts had no recording yesterday',ctx:'Raju K. and Priya K.',opts:['Nudge them','Check their phones']}];
    } else Object.keys(A).forEach(function(id){ var m=me(id); if(!m||A[id].type==='leader') return; var key=id+'-'+m.n.replace(/\W+/g,'');
      askObj[id]=[{id:'ra-'+key+'-ack',q:'Acknowledge today\'s tasks',ctx:m.items.length+' '+A[id].itemsLabel.toLowerCase()+' · practise '+m.work[0].toLowerCase(),opts:['Got it']},{id:'ra-'+key+'-note',q:'Update: '+m.items[0][0],ctx:m.items[0][1],opts:['Done','Not yet','Need help']}]; });
  }
  buildAsks();
  R.rebuild=function(){ buildAsks(); R.rows(); };
  R.pin=HCPin({name:cfg.name+'.pin',barId:'hcRAPin',bodyId:'hcRABody',active:function(){ return R.cur||''; },openChannel:function(ch){ R.open(ch); },tasks:askObj,
    onDone:function(id,text){ R.rows(); if(cfg.onDone) cfg.onDone(id,text); try{ (window.hcToast||window.hcsToast)('Task done · cleared from this channel'); }catch(e){} }});
  /* ===== Context & Tasks pinned panel + per-store / per-person KPI grid ===== */
  var KPI=window.PULSE_KPI=window.PULSE_KPI||[
    {l:'Revenue',s:'Rev',a:2888053.51,t:4100000,u:''},
    {l:'ATV',s:'ATV',a:40368,t:51870,u:''},
    {l:'Conversations',s:'Convos',a:1036,t:1300,u:'#'}];
  window.PULSE_KPI_PERIOD=window.PULSE_KPI_PERIOD||{short:'MTD 1–4 Oct',long:'MTD · 1–4 Oct 2026'};
  function hideConv(a){ return !isMgr && /conversion|lead to sale/i.test(a.metric); }
  /* Sample per-unit figures (replace with live data). Period = window.PULSE_KPI_PERIOD; a unit can override with per:'...'. conv = absolute number of conversations. */
  var KU=window.PULSE_KPI_UNITS=window.PULSE_KPI_UNITS||{
    'Koramangala':{rev:[1150000,1600000],atv:[42100,52000],conv:[412,480]},
    'RT Nagar':{rev:[980000,1350000],atv:[39800,51500],conv:[356,430]},
    'Whitefield':{rev:[758053.51,1150000],atv:[38400,52300],conv:[268,390]},
    'Arvind Rajan':{rev:[420000,500000],atv:[38200,45000],conv:[168,200]},
    'Neha P.':{rev:[465000,500000],atv:[41000,45000],conv:[190,200]},
    'Faiz A.':{rev:[305000,500000],atv:[33500,45000],conv:[121,200]},
    'Kiran T.':{rev:[610000,700000],atv:[52000,55000],conv:[38,40]},
    'Rohit B.':{rev:[395000,700000],atv:[44000,55000],conv:[24,40]},
    'Meena J.':{rev:[560000,700000],atv:[50500,55000],conv:[33,40]}};
  function kf(n,u){ if(u==='#') return String(Math.round(n)); if(u==='%') return (Math.round(n*10)/10)+'%'; var x=Math.abs(n); if(x>=1e6) return (n/1e6).toFixed(2).replace(/\.?0+$/,'')+'M'; if(x>=1e3) return (n/1e3).toFixed(1).replace(/\.0$/,'')+'K'; return String(Math.round(n)); }
  function chipK(p,u,narrow){
    var a=p[0], t=p[1], r=Math.round(a/t*100), w=Math.max(0,Math.min(100,a/t*100)), c=r>=100?'#15803d':r>=75?'#b45309':'#b91c1c', bg=r>=100?'#bbf7d0':r>=75?'#fde68a':'#fecaca', gap=Math.round((t-a)*100)/100;
    return '<div title="actual '+a.toLocaleString()+' · target '+t.toLocaleString()+' · gap '+gap.toLocaleString()+'" style="position:relative;overflow:hidden;min-width:0;border-radius:999px;border:1px solid '+c+'44;background:#f4f5f9;padding:3px '+(narrow?5:9)+'px;font-size:'+(narrow?10:12)+'px;line-height:1.35;display:flex;align-items:center;gap:4px;white-space:nowrap">'
      +'<span style="position:absolute;left:0;top:0;bottom:0;width:'+w.toFixed(1)+'%;background:'+bg+';opacity:.75"></span>'
      +'<span style="position:relative;font-weight:800;color:'+c+'">'+kf(a,u)+'</span>'
      +'<span style="position:relative;color:#4b5563;overflow:hidden;text-overflow:ellipsis">/'+(narrow?kf(t,u).replace('%',''):kf(t,u))+'</span>'
      +(narrow?'':'<span style="position:relative;margin-left:auto;font-weight:800;color:'+c+'">'+r+'%</span>')+'</div>';
  }
  function unitOf(m){ var r=m.r||''; if(/^Advisor/.test(r)){ return {key:(r.split('·')[1]||'').trim()||m.n, kind:'store'}; } return {key:m.n, kind:'person'}; }
  function unitsFor(id){
    var a=A[id], base=a.type==='leader'?A[a.of]:a, mine=me(id), src=mine?[mine]:base.members, seen={}, out=[];
    src.forEach(function(m){ var u=unitOf(m); if(!seen[u.key]){ seen[u.key]=1; out.push(u); } });
    return out;
  }
  function kpiGrid(units,narrow,col,staff){
    var heads=narrow?['Rev','ATV','Convos']:['Revenue','ATV','Conversations'], PR=window.PULSE_KPI_PERIOD;
    var h='<div class="hc-kpi" style="display:grid;grid-template-columns:'+(narrow?'92px':'170px')+' repeat(3,minmax(0,1fr));gap:3px 6px;align-items:center;padding:6px 10px;background:#fff;border-bottom:1px solid #eceef4;'+(narrow?'max-height:128px;overflow-y:auto':'')+'"><span title="Period: '+PR.long+'" style="grid-column:1/-1;font-size:'+(narrow?10:11)+'px;font-weight:800;color:#4b5563;display:flex;align-items:center;gap:4px"><i class="ti ti-calendar"></i>Period: '+PR.long+'<span style="font-weight:600;color:#8e8e93"> · conversations = count</span></span><span></span>'
      +heads.map(function(x){ return '<span style="font-size:10px;font-weight:800;color:#6b7280;letter-spacing:.3px;text-transform:uppercase;padding-left:6px">'+x+'</span>'; }).join('');
    units.forEach(function(u){
      var d=KU[u.key]||{rev:[KPI[0].a,KPI[0].t],atv:[KPI[1].a,KPI[1].t],conv:[KPI[2].a,KPI[2].t]};
      var nm=esc(u.key)+(staff&&!narrow?(u.kind==='store'?' · your store':' · you'):'');
      h+='<span title="'+esc(u.key)+(u.kind==='store'?' store':'')+' · '+(d.per||PR.long)+'" class="hc-kpi-l" style="font-size:'+(narrow?10.5:12)+'px;font-weight:800;color:'+col+';white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><i class="ti ti-'+(u.kind==='store'?'building-store':'user')+'" style="margin-right:3px"></i>'+nm+'</span>'
        +chipK(d.rev,'',narrow)+chipK(d.atv,'',narrow)+chipK(d.conv,'#',narrow);
    });
    return h+'</div>';
  }
  function leaderParts(id){
    var a=A[id], base=A[a.of], mine=me(id);
    if(mine) return {a:a,mine:mine,leader:true,tasks:'',ctx:'<div style="font-size:13px;line-height:1.6;color:#334155;margin:6px 0"><div><b>Focus this week:</b> '+esc(a.focus)+'</div><div style="color:#15803d"><b>Shout-out:</b> '+esc(a.win)+'</div><div style="color:#6b7280;font-size:12px;margin-top:4px">Read-only channel. Replies go to your manager.</div></div>'};
    var us=unitsFor(id), st=us.map(function(u){ var ms=base.members.filter(function(m){ return unitOf(m).key===u.key; }); return {u:u,n:ms.length,v:Math.round(ms.reduce(function(s,m){return s+m.val;},0)/ms.length)}; }).sort(function(x,y){return y.v-x.v;});
    var ctx='<div style="font-size:13px;color:#334155;margin:6px 0">'+esc(base.name)+' ranked by '+base.metric.toLowerCase()+' yesterday (target '+base.target+'%). Each store and each person counts on its own.</div>'
      +st.map(function(x){ var g=x.v-base.target, c=g>=0?'#15803d':'#b91c1c'; return '<div style="display:flex;gap:8px;align-items:center;border-top:1px solid #eceef4;padding:6px 0;font-size:13.5px"><b style="flex:1">'+esc(x.u.key)+'</b><span style="font-size:12px;color:#8e8e93">'+(x.u.kind==='store'?x.n+' advisors':'individual')+'</span><b style="color:'+c+'">'+x.v+'%</b><span style="font-size:12px;color:'+c+'">'+(g>=0?'▲ +':'▼ ')+g+'</span></div>'; }).join('');
    var esc2=base.members.filter(function(m){return m.val<base.target;}).map(function(m){ return [m.n+' · '+unitOf(m).key,m.imp]; });
    if(!esc2.length) esc2=[['All on target','Nothing to decide today']];
    var tasks=fold(a.itemsLabel+' · '+esc2.length,esc2.map(function(l){ return '<div style="font-size:13px;padding:3px 0"><b>'+esc(l[0])+'</b> · '+esc(l[1])+'</div>'; }).join(''),true)
      +fold('Soft tasks · leadership focus','<div style="font-size:13px;line-height:1.6"><div><b>Focus:</b> '+esc(a.focus)+'</div><div style="color:#15803d"><b>Replicate:</b> '+esc(a.win)+'</div></div>',false);
    return {a:a,mine:null,ctx:ctx,tasks:tasks};
  }
  (function(P){
    function lab(t,c){ return '<div style="font-size:11.5px;font-weight:800;color:'+(c||'#6d28d9')+';letter-spacing:.4px;margin-top:8px">'+t+'</div>'; }
    function chip(t,c,bg){ return '<span style="font-size:11px;font-weight:800;color:'+c+';background:'+bg+';padding:1px 8px;border-radius:9px;white-space:nowrap">'+t+'</span>'; }
    function btns(t,bd,co){ return (t.opts||[]).map(function(o){ return '<button onclick="'+P.cfg.name+'.answer(\''+t.id+'\',this.textContent)" style="border:1px solid '+bd+';background:#fff;color:'+co+';font:inherit;font-size:12.5px;font-weight:700;border-radius:8px;padding:5px 11px;cursor:pointer">'+esc(o)+'</button>'; }).join(''); }
    function ask(t){ return '<div style="background:#fffaf0;border:1px solid #fde3b0;border-radius:10px;padding:8px 10px;margin-top:6px"><div style="font-size:13.5px;font-weight:700;color:#1a1a1a">'+esc(t.q)+'</div>'+(t.ctx?'<div style="font-size:12.5px;color:#6b7280;margin-top:1px">'+esc(t.ctx)+'</div>':'')+'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">'+btns(t,'#d6d6db','#1a1a1a')+'</div></div>'; }
    function mgrBody(p,list){
      var a=p.a;
      return lab(a.type==='leader'?'UNIT RANKING · EVERY STORE AND PERSON':'TEAM CONTEXT','#4338ca')+p.ctx
        +lab(a.type==='leader'?'LEADERSHIP TASKS':'TASKS YOU DISPENSED','#4338ca')+'<div style="display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 2px">'+chip('Type 1 · '+esc(a.itemsLabel),'#1d4ed8','#dbeafe')+chip('Type 2 · Soft tasks','#b45309','#fef3c7')+'</div>'+p.tasks
        +(list.length?lab('NEEDS YOUR DECISION','#b45309')+list.map(ask).join(''):'');
    }
    function staffBody(p,list){
      var a=p.a, m=p.mine, G='#0f766e';
      if(p.leader) return lab('FROM LEADERSHIP',G)+p.ctx;
      var ack=list.filter(function(t){return /-ack$/.test(t.id);})[0], note=list.filter(function(t){return /-note$/.test(t.id);})[0];
      var h=lab('INCOMING CONTEXT',G)+'<div style="font-size:11.5px;color:#6b7280">Sent 9:00am by AvaniBot for your manager</div>'+p.ctx+lab('MY TASKS TODAY',G)
        +'<div style="border:1px solid #bde5dc;border-radius:12px;background:#f3fbf9;overflow:hidden;margin-top:5px">';
      if(ack) h+='<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:8px 10px;background:#fff7e0;border-bottom:1px solid #fde3b0"><span style="flex:1;min-width:140px;font-size:13px;font-weight:700;color:#7a4a00">Acknowledge today\'s tasks</span>'+btns(ack,'#e0b45a','#7a4a00')+'</div>';
      h+='<div style="padding:8px 10px 2px">'+chip('Type 1 · '+esc(a.itemsLabel),'#1d4ed8','#dbeafe')+'</div>';
      m.items.forEach(function(l,i){
        h+='<div style="padding:6px 10px;border-top:'+(i?'1px solid #dff1ec':'0')+'"><div style="font-size:13px"><b>'+esc(l[0])+'</b> · '+esc(l[1])+'</div>';
        if(i===0) h+= note?'<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:5px"><span style="font-size:12px;color:#6b7280">Update:</span>'+btns(note,'#99d5c9','#0f5132')+'</div>':'<div style="font-size:12px;color:#15803d;margin-top:2px">✓ Updated</div>';
        h+='</div>'; });
      h+='<div style="padding:8px 10px 2px;border-top:1px solid #bde5dc">'+chip('Type 2 · Soft tasks','#b45309','#fef3c7')+'</div><div style="padding:4px 10px 9px;font-size:13px;line-height:1.55"><div style="color:#15803d">Good at: '+m.good.join(', ')+'</div><div style="color:#b45309">Practise today: '+m.work.join(', ')+'</div></div></div>';
      return h;
    }
    P.render=function(){
      var b=$('hcRAPin'); if(!b){ var body=$('hcRABody'); if(!body) return; b=document.createElement('div'); b.id='hcRAPin'; body.parentNode.insertBefore(b,body); }
      var id=R.cur; if(!id||!A[id]){ b.style.display='none'; b.innerHTML=''; return; }
      var host=$(cfg.host), narrow=((host&&host.clientWidth)||window.innerWidth)<520;
      if(P._ini===undefined){ P._ini=1; if(narrow) P.open=false; }
      var p=digestParts(id), a=p.a, mine=p.mine, list=P.pending(id), M=!!isMgr, L=a.type==='leader';
      var n=mine?mine.items.length:a.members.reduce(function(s,x){return s+x.items.length;},0);
      var T=n+(n===1?' task':' tasks');
      var sum=M?(L?'Leadership · ':'Team ')+a.metric.toLowerCase()+' '+avg(a)+'% · '+T+(L?'':' dispensed'):(L?'Focus: '+a.focus:'From your manager · '+T+(list.length?' · '+list.length+' to action':''));
      var th=M?{bd:'#4f46e5',hb:'#312e81',ti:'#fff',su:'#c7d2fe',ic:'#c7d2fe',chip:L?'LEADERSHIP VIEW':'MASTER VIEW',cb:'rgba(255,255,255,.18)',cc:'#fff',ch:'#c7d2fe',bg:'#fff'}
              :{bd:'#0f766e',hb:'#d1fae5',ti:'#065f46',su:'#3f6b60',ic:'#0f766e',chip:L?'READ-ONLY':'FOR YOU',cb:'#0f766e',cc:'#fff',ch:'#3f6b60',bg:'#fcfffe'};
      b.style.cssText='display:block;flex-shrink:0;background:'+th.bg+';border-bottom:1.5px solid '+th.bd+'55;border-left:4px solid '+th.bd+';position:relative;z-index:2';
      var head='<div onclick="'+P.cfg.name+'.toggle()" style="display:flex;align-items:center;gap:7px;cursor:pointer;padding:8px 12px;background:'+th.hb+'"><i class="ti ti-'+(M?'layout-dashboard':'inbox')+'" style="font-size:16px;color:'+th.ic+'"></i><span style="font-size:13.5px;font-weight:800;color:'+th.ti+';white-space:nowrap">'+(M?'Context &amp; Tasks':(L?'Leadership':'My Context &amp; Tasks'))+'</span>'
        +'<span style="font-size:10px;font-weight:800;letter-spacing:.5px;background:'+th.cb+';color:'+th.cc+';padding:1px 7px;border-radius:7px;white-space:nowrap">'+th.chip+'</span>'
        +(list.length?'<span style="background:#ef4444;color:#fff;font-size:11.5px;font-weight:800;padding:1px 7px;border-radius:9px">'+list.length+'</span>':'')
        +'<span style="font-size:12px;color:'+th.su+';flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(sum)+'</span><i class="ti ti-chevron-'+(P.open?'up':'down')+'" style="color:'+th.ch+'"></i></div>';
      var inner=P.open?'<div style="max-height:'+(narrow?'38vh':'34vh')+';overflow-y:auto;padding:0 12px 10px">'+(M?mgrBody(p,list):staffBody(p,list))+'</div>':'';
      b.innerHTML=kpiGrid(unitsFor(id),narrow,M?'#4338ca':'#0f766e',!M)+head+inner;
    };
  })(R.pin);

  function fold(title,inner,open){ return '<details'+(open?' open':'')+' style="background:#f8f9fc;border:1px solid #e6e8f0;border-radius:10px;margin-top:7px"><summary style="cursor:pointer;padding:8px 10px;font-size:13.5px;font-weight:800;color:#1a1a1a">'+title+'</summary><div style="padding:0 10px 10px">'+inner+'</div></details>'; }
  function valTag(m,a){ var col=m.val>=a.target?'#15803d':'#b91c1c'; return '<b style="color:'+col+'">'+m.val+'%</b> <span style="font-size:12px;color:'+(m.d>=0?'#15803d':'#b91c1c')+'">'+(m.d>=0?'▲ +':'▼ ')+m.d+'</span>'; }
  function detail(m,a){ return '<div style="font-size:13px;line-height:1.5;color:#334155;margin-top:4px"><div>'+a.metric+': '+m.val+'% (target '+a.target+'%)</div><div style="color:#15803d">✓ Did well: '+m.well+'</div><div style="color:#b45309">↗ Improve: '+m.imp+'</div></div>'; }
  function bot(t,html,tag){ return '<div style="display:flex;gap:9px;margin:12px 0;align-items:flex-start"><div style="width:30px;height:30px;border-radius:50%;background:#efe9ff;color:#6d28d9;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti ti-sparkles"></i></div><div style="flex:1;min-width:0"><div style="font-size:12.5px;font-weight:800;color:#1a1a1a">AvaniBot <span style="font-weight:500;color:#8e8e93">'+t+'</span>'+(tag?' <span style="font-size:11px;font-weight:800;background:#eef2ff;color:#1e3a8a;padding:1px 6px;border-radius:6px">'+tag+'</span>':'')+'</div><div style="font-size:14px;color:#1a1a1a;margin-top:3px;line-height:1.45">'+html+'</div></div></div>'; }
  function sep(t){ return '<div style="text-align:center;margin:12px 0"><span style="font-size:11.5px;color:#8e8e93;background:#f1f2f6;padding:2px 10px;border-radius:10px">'+t+'</span></div>'; }
  function digestParts(id){ if(A[id].type==='leader') return leaderParts(id);
    var a=A[id], mine=me(id), ctx, tasks;
    if(!mine){
      ctx='<div style="font-size:13px;color:#334155;margin:6px 0">Team '+a.metric.toLowerCase()+' yesterday: <b>'+avg(a)+'%</b> (target '+a.target+'%). '+a.members.length+' members. Tap a name for detail.</div>'
        +a.members.map(function(m){ return '<details style="border-top:1px solid #eceef4;padding:6px 0"><summary style="cursor:pointer;display:flex;gap:8px;align-items:center;font-size:13.5px"><b style="flex:1">'+esc(m.n)+'</b><span style="font-size:12px;color:#8e8e93">'+esc(m.r)+'</span> '+valTag(m,a)+'</summary>'+detail(m,a)+'</details>'; }).join('');
      var all=[]; a.members.forEach(function(m){ m.items.forEach(function(l){ all.push('<div style="font-size:13px;padding:3px 0"><b>'+esc(l[0])+'</b> · '+esc(l[1])+' <span style="color:#8e8e93">· '+esc(m.n.split(' ')[0])+'</span></div>'); }); });
      tasks=fold(a.itemsLabel+' · '+all.length,all.join(''),false)+fold('Soft tasks · skills','<div style="font-size:13px;line-height:1.6">'+a.members.map(function(m){ return '<div><b>'+esc(m.n.split(' ')[0])+'</b>: good at '+m.good.join(', ').toLowerCase()+' · work on <span style="color:#b45309">'+m.work.join(', ').toLowerCase()+'</span></div>'; }).join('')+'</div>',false);
    } else {
      ctx='<div style="display:flex;align-items:baseline;gap:8px;margin:6px 0"><span style="font-size:24px;font-weight:800;color:'+(mine.val>=a.target?'#15803d':'#b91c1c')+'">'+mine.val+'%</span><span style="font-size:13px;color:#6b7280">your '+a.metric.toLowerCase()+' yesterday · target '+a.target+'%</span></div>'+detail(mine,a);
      tasks=fold(a.itemsLabel+' · '+mine.items.length,mine.items.map(function(l){ return '<div style="font-size:13px;padding:3px 0"><b>'+esc(l[0])+'</b> · '+esc(l[1])+'</div>'; }).join(''),true)
        +fold('Soft tasks · your skills','<div style="font-size:13px;line-height:1.6"><div style="color:#15803d">Good at: '+mine.good.join(', ')+'</div><div style="color:#b45309">Practise today: '+mine.work.join(', ')+'</div></div>',true);
    }
    if(mine&&hideConv(a)) ctx='<div style="font-size:13px;line-height:1.5;color:#334155;margin-top:6px"><div style="color:#15803d">✓ Did well: '+esc(mine.well)+'</div><div style="color:#b45309">↗ Improve: '+esc(mine.imp)+'</div></div>'; return {a:a,mine:mine,ctx:ctx,tasks:tasks};
  }
  function digest(id){ var p=digestParts(id), mine=p.mine, a=p.a; if(a.type==='leader'&&mine) return bot('9:00am','Good morning '+esc(mine.n.split(' ')[0])+'. This week\'s leadership note is pinned at the top.'); return bot('9:00am','Good morning'+(mine?' '+esc(mine.n.split(' ')[0]):'')+'. Today\'s '+(a.type==='task'?a.metric.toLowerCase()+' ':'')+'digest is pinned at the top: '+(mine?'incoming context and the tasks allocated to you.':'context and the tasks you '+(a.type==='leader'?'need to decide.':'dispensed.'))); }
  function thread(id){ var a=A[id]; if(a.type==='leader'&&me(id)) return sep('Today')+digest(id)+bot('9:00am','From leadership: '+esc(a.focus),'Leadership note'); return threadBase(id); }
  function threadBase(id){
    var a=A[id], mine=me(id), h=sep('Today')+digest(id);
    if(!mine){
      h+=bot('9:20am',a.members.map(function(m){ return (m.ack?'✓ ':'○ ')+esc(m.n.split(' ')[0]); }).join(' · '),'Acknowledged');
      var late=a.members.filter(function(m){return !m.notes;});
      h+=bot('1:00pm','Reminder sent to '+late.map(function(m){return '<b style="color:#7c3aed">@'+esc(m.n.split(' ')[0])+'</b>';}).join(', ')+' to update their tasks and acknowledge.','Nudge');
      h+=bot('5:00pm','End-of-day report goes out at 6:00pm. Everyone: finish updating tasks and notes if you can.','Reminder');
      var done=a.members.reduce(function(s,m){return s+(m.notes?m.items.length:Math.max(0,m.items.length-1));},0), tot=a.members.reduce(function(s,m){return s+m.items.length;},0);
      var srt=a.members.slice().sort(function(x,y){return y.val-x.val;}), top=srt[0], low=srt[srt.length-1];
      h+=bot('6:00pm','<div style="background:#fff;border:1px solid #c7d2fe;border-radius:12px;padding:10px 12px"><div style="font-size:14px;font-weight:800">End-of-day report · '+a.name+'</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0">'
        +[[a.metric+' today',(avg(a)+1)+'%'],['Tasks done',done+'/'+tot],['Updated',a.members.filter(function(m){return m.notes;}).length+'/'+a.members.length]].map(function(x){return '<div style="background:#f8f9fc;border-radius:9px;padding:7px 9px"><div style="font-size:11.5px;color:#6b7280">'+x[0]+'</div><div style="font-size:18px;font-weight:800">'+x[1]+'</div></div>';}).join('')
        +'</div><div style="font-size:13px;line-height:1.6"><div>🏆 Top: <b>'+esc(top.n)+'</b> at '+top.val+'%</div><div>⚠️ Needs attention: <b>'+esc(low.n)+'</b> at '+low.val+'% · '+esc(low.imp.toLowerCase())+'</div><div>➡️ '+(tot-done)+' items carried to tomorrow\'s digest</div></div></div>','Report · managers only');
    } else {
      h+=bot('1:00pm',(mine.notes?'Thanks for updating your tasks.':'Reminder: <b>'+esc(mine.items[0][0])+'</b> still needs an update.'),'Nudge');
      h+=bot('5:00pm','Your end-of-day update goes to your manager at 6:00pm. Finish your tasks if you can.','Reminder');
      h+=bot('6:00pm','Your day is in. Your manager has today\'s report.');
    }
    return h;
  }
  function metricPill(id){ if(hideConv(A[id])) return ''; var a=A[id], mine=me(id), v=mine?mine.val:avg(a), d=mine?mine.d:avgD(a);
    return '<div style="background:rgba(255,255,255,.18);border-radius:10px;padding:5px 10px;display:flex;align-items:baseline;gap:6px;white-space:nowrap"><span style="font-size:12px;font-weight:700;opacity:.9">'+(mine?'Your ':'')+a.metric+'</span><span style="font-size:17px;font-weight:800">'+v+'%</span><span style="font-size:12px;font-weight:700">'+(d>=0?'▲':'▼')+Math.abs(d)+' today</span></div>'; }
  R.open=function(id){
    var host=$(cfg.host); if(!host) return; R.cur=id; var a=A[id];
    var old=$('hcRA'); if(old) old.remove();
    var who=isMgr?(a.type==='leader'?'Leadership view · every store and person':'Manager view · whole team'):(a.type==='leader'?'Read-only · from leadership':'Your view · only your information');
    host.insertAdjacentHTML('beforeend','<div id="hcRA" style="position:absolute;inset:0;z-index:600;background:#fff;display:flex;flex-direction:column">'
      +'<div style="background:'+a.color+';color:#fff;padding:10px 12px;display:flex;gap:10px;align-items:center;flex-shrink:0;flex-wrap:wrap"><button onclick="'+cfg.name+'.close()" aria-label="Back" style="background:rgba(255,255,255,.18);border:none;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer"><i class="ti ti-arrow-left"></i></button><div style="flex:1;min-width:150px"><div style="font-size:15.5px;font-weight:800"># '+id+' <span style="font-size:11px;font-weight:800;background:rgba(255,255,255,.2);padding:1px 7px;border-radius:7px;vertical-align:2px">'+(a.type==='role'?'Role agent':a.type==='leader'?'Leadership':'Task agent')+'</span></div><div style="font-size:12px;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(a.name)+' · '+esc(a.scope)+' · '+who+'</div></div>'+metricPill(id)
      +'<button onclick="'+cfg.name+'.members()" aria-label="Channel members" style="background:rgba(255,255,255,.18);border:none;color:#fff;height:32px;border-radius:16px;padding:0 10px;cursor:pointer;font:inherit;font-size:13px;font-weight:700;display:flex;align-items:center;gap:5px"><i class="ti ti-users"></i>'+a.members.length+'</button></div>'
      +'<div id="hcRABody" style="flex:1;overflow-y:auto;padding:4px 14px 16px;background:#fff">'+thread(id)+'</div>'
      +'<div style="padding:9px 12px;border-top:1px solid #eceef4;display:flex;gap:8px;flex-shrink:0"><input placeholder="Message #'+id+'" style="flex:1;border:1px solid #e5e5ea;border-radius:18px;padding:8px 12px;font:inherit;font-size:14px"><button aria-label="Send" style="border:none;background:'+a.color+';color:#fff;border-radius:50%;width:36px;height:36px"><i class="ti ti-send"></i></button></div></div>');
    R.pin.render();
  };
  R.members=function(){
    var a=A[R.cur]; if(!a) return; var can=cfg.canAdd&&cfg.canAdd(); var old=$('hcRAMem'); if(old) old.remove();
    $('hcRA').insertAdjacentHTML('beforeend','<div id="hcRAMem" onclick="if(event.target===this)this.remove()" style="position:absolute;inset:0;background:rgba(15,23,42,.45);display:flex;align-items:flex-end;justify-content:center;z-index:5"><div style="background:#fff;width:min(560px,100%);border-radius:18px 18px 0 0;padding:16px 18px 18px;max-height:80%;overflow-y:auto">'
      +'<div style="display:flex;align-items:center;margin-bottom:8px"><div style="font-size:17px;font-weight:800;flex:1">Channel members</div><button onclick="document.getElementById(\'hcRAMem\').remove()" aria-label="Close" style="border:none;background:#f1f2f6;width:32px;height:32px;border-radius:50%;cursor:pointer"><i class="ti ti-x"></i></button></div>'
      +a.members.map(function(m){ var ini=m.n.split(' ').map(function(x){return x[0];}).join('').slice(0,2); return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f0f1f5"><div style="width:36px;height:36px;border-radius:50%;background:#eef2ff;color:#1e3a8a;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center">'+esc(ini)+'</div><div style="flex:1"><div style="font-size:14.5px;font-weight:700">'+esc(m.n)+'</div><div style="font-size:12.5px;color:#8e8e93">'+esc(m.r)+'</div></div>'+(isMgr?'<span style="font-size:12.5px">'+valTag(m,a)+'</span>':'')+'</div>'; }).join('')
      +'<div style="font-size:12.5px;color:#8e8e93;margin-top:8px">'+a.members.length+' members in total</div>'
      +(can?'<div style="display:flex;gap:8px;margin-top:10px"><input id="hcRAMemName" placeholder="Employee name" style="flex:1;border:1px solid #e5e5ea;border-radius:9px;padding:8px 10px;font:inherit;font-size:14px"><input id="hcRAMemRole" placeholder="Role, e.g. Advisor · Indiranagar" style="flex:1;border:1px solid #e5e5ea;border-radius:9px;padding:8px 10px;font:inherit;font-size:14px"><button onclick="'+cfg.name+'.addMember()" style="border:none;background:#1e3a8a;color:#fff;border-radius:9px;padding:8px 13px;font:inherit;font-weight:700;cursor:pointer">Add</button></div><div id="hcRAMemErr" style="font-size:12px;color:#b91c1c;margin-top:4px"></div>'
       :'<div style="font-size:12.5px;color:#8e8e93;text-align:center;margin-top:10px">Only M3 · Super Admin can add employees to a channel.</div>')
      +'</div></div>');
  };
  R.addMember=function(){ var n=$('hcRAMemName').value.trim(), r=$('hcRAMemRole').value.trim(); if(!n){ $('hcRAMemErr').textContent='Enter a name first'; return; }
    var a=A[R.cur]; a.members.push(M(n,r||'Team member',a.target-5,0,'New to this channel','First digest arrives at 9:00 tomorrow',[['Getting started','Read the 9:00 digest']],['New'],['Onboarding'],false,false));
    var id=R.cur; R.open(id); R.members(); R.rows(); try{ (window.hcToast||window.hcsToast)(esc(n)+' added to #'+id); }catch(e){} };
  R.close=function(){ var o=$('hcRA'); if(o) o.remove(); R.cur=null; R.rows(); };
  function rowHtml(id){ var a=A[id], n=R.pin.pending(id).length, mine=me(id), v=mine?mine.val:avg(a), d=mine?mine.d:avgD(a), ok=v>=a.target;
    return '<div onclick="'+cfg.name+'.open(\''+id+'\')" style="display:flex;align-items:center;gap:10px;margin:5px 0;padding:9px 11px;background:#fff;border:1px solid #e6e8f0;border-left:4px solid '+a.color+';border-radius:10px;cursor:pointer"><div style="width:30px;height:30px;border-radius:9px;background:'+a.color+'1f;color:'+a.color+';display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti '+a.icon+'"></i></div>'
     +'<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:800;color:#1a1a1a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"># '+id+'</div><div style="font-size:12px;color:#6b7280;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+(hideConv(a)?esc(a.name):(mine?'Your ':'')+a.metric+' · '+a.members.length+' members')+'</div></div>'
     +'<div style="text-align:right;flex-shrink:0"><div style="font-size:14px;font-weight:800;color:'+(ok?'#15803d':'#b91c1c')+'">'+(hideConv(a)?'':v+'% <span style="font-size:11.5px">'+(d>=0?'▲':'▼')+Math.abs(d)+'</span>')+'</div>'+(n?'<span style="display:inline-block;margin-top:2px;background:#f59e0b;color:#fff;font-size:11px;font-weight:800;padding:0 7px;border-radius:9px"><i class="ti ti-pin" style="font-size:11px"></i> '+n+'</span>':'')+'</div></div>'; }
  R.rows=function(){
    var mt=cfg.mount&&cfg.mount(); if(!mt||!mt[0]) return;
    var box=$('hcRARows'); if(!box){ box=document.createElement('div'); box.id='hcRARows'; if(cfg.pad) box.style.padding=cfg.pad; mt[0].insertBefore(box,mt[1]||mt[0].firstChild); }
    var vis=R.visible(), roles=vis.filter(function(id){return A[id].type==='role';}), tasks=vis.filter(function(id){return A[id].type==='task';}), leads=vis.filter(function(id){return A[id].type==='leader';});
    function lab(t,s,extra){ return '<div style="padding:8px 2px 2px;display:flex;align-items:center;gap:8px"><span style="font-size:12px;font-weight:800;color:#6d28d9;letter-spacing:.4px">'+t+'</span><span style="font-size:11.5px;color:#8e8e93">'+s+'</span>'+(extra||'')+'</div>'; }
    box.innerHTML=(leads.length?lab('ROLE AGENT LEADERSHIP','leaders of each role')+leads.map(rowHtml).join(''):'')+(roles.length?lab('ROLE AGENTS','run a team',cfg.switcher?cfg.switcher():'')+roles.map(rowHtml).join(''):'')+(tasks.length?lab('TASK AGENTS','move one metric')+tasks.map(rowHtml).join(''):'');
  };
  return R;
};

(function(){
/* DPDP consent layer for the staff apps. One rule for every channel (store, field, call):
   ASK  - before recording: say one line, tap Yes or No. Yes issues a Consent ID tied to the conversation.
   LISTEN - the app watches for "unsure", "stop recording" and rights asks, and nudges. Staff tap once.
   DONE - nothing extra. Everything is logged for the DPO and the manager Consent View
          (localStorage 'og_consent_events').
   A demo bar (bottom of screen) starts a conversation and plays what the customer says. */
var CS={on:false,src:null,state:'idle',cid:null,conv:null,who:'',lang:'kn',det:'kn',offers:false,wd:{},log:[],pending:null,left:300,count:null,saved:0,starting:false,native:false};
var SEQ=501, RSEQ=501;
var LANGS={kn:{name:'Kannada',label:'ಕನ್ನಡ'},hi:{name:'Hindi',label:'हिन्दी'},en:{name:'English',label:'English'}};
function $(i){ return document.getElementById(i); }
function esc(t){ return String(t==null?'':t).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function health(){ try{ return CURRENT_VERTICAL==='healthcare'; }catch(e){ return false; } }
function isField(){ try{ return staffChannel==='fieldstaff'; }catch(e){ return false; } }
function N(){ return health()?{s:'patient',S:'Patient'}:{s:'customer',S:'Customer'}; }
function what(){ return CS.src==='call'?'call':(CS.src==='field'?'visit':'conversation'); }
function chName(){ return CS.src==='call'?(CS.native?'Phone call':'Call centre'):(CS.src==='field'?'Field visit':(health()?'In person':'In store')); }
function stamp(){ var d=new Date(); return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2); }
function toast(t){ var d=document.createElement('div'); d.style.cssText='position:fixed;left:50%;top:18px;transform:translateX(-50%);background:#0f172a;color:#fff;font-size:13px;font-weight:600;padding:9px 15px;border-radius:20px;z-index:999999;max-width:90%;text-align:center;font-family:inherit;box-shadow:0 8px 24px rgba(0,0,0,.3)'; d.innerHTML=t; document.body.appendChild(d); setTimeout(function(){ d.remove(); },3200); }
function fmt(s){ return Math.floor(s/60)+':'+('0'+(s%60)).slice(-2); }

/* ---------- the one line staff say, in the customer's language ---------- */
function script(l){
  var h=health(), w=what();
  if(l==='kn'){ var o={conversation:'ಈ ಮಾತುಕತೆಯನ್ನು',call:'ಈ ಕಾಲ್ ಅನ್ನು',visit:'ಈ ಭೇಟಿಯನ್ನು'}[w];
    return o+' ರೆಕಾರ್ಡ್ ಮಾಡಬಹುದಾ? ಇದು '+(h?'ನಿಮ್ಮ ಚಿಕಿತ್ಸೆ':'ನಿಮ್ಮ ಸರ್ವೀಸ್')+' ಮತ್ತು ಫಾಲೋ-ಅಪ್‌ಗೆ ಮಾತ್ರ. ಬೇಡ ಅನ್ನಬಹುದು, ಯಾವಾಗ ಬೇಕಾದರೂ ಡಿಲೀಟ್ ಮಾಡಿಸಬಹುದು.'; }
  if(l==='hi'){ var o2={conversation:'यह बातचीत',call:'यह कॉल',visit:'यह मुलाक़ात'}[w];
    return 'क्या हम '+o2+' रिकॉर्ड कर सकते हैं? सिर्फ़ '+(h?'आपके इलाज':'आपकी सर्विस')+' और फ़ॉलो-अप के लिए है। आप मना कर सकते हैं, या कभी भी डिलीट करवा सकते हैं।'; }
  return scriptEn();
}
function scriptEn(){ var h=health(); return 'Can we record this? Only for '+(h?'your care':'your service')+' and follow-up. You can say no, or ask us to delete it any time.'; }
function reassure(l){
  var h=health();
  if(l==='kn') return 'ರೆಕಾರ್ಡ್ ಮಾಡೋದು ನಿಮ್ಮ ಇಷ್ಟ. ಬೇಡ ಅಂದ್ರೆ '+(h?'ನಿಮ್ಮ ಚಿಕಿತ್ಸೆಗೆ':'ನಿಮಗೆ')+' ಏನೂ ತೊಂದರೆ ಇಲ್ಲ.';
  if(l==='hi') return 'रिकॉर्डिंग आपकी मर्ज़ी है। मना करने से '+(h?'आपके इलाज':'आपकी सर्विस')+' पर कोई असर नहीं पड़ेगा।';
  return 'Recording is your choice. Saying no won\'t change '+(h?'your care':'anything for you')+'.';
}
var DEMO=[
  ['hes','Unsure?',{kn:'ಇದು ರೆಕಾರ್ಡ್ ಆಗ್ತಿದ್ಯಾ? ನನಗೆ ಇಷ್ಟ ಇಲ್ಲ.',hi:'रिकॉर्ड हो रहा है? मुझे अच्छा नहीं लग रहा।',en:'Is this being recorded? I\'d rather it wasn\'t.'}],
  ['copy','My data?',{kn:'ನನ್ನ ಮಾಹಿತಿಯ ಕಾಪಿ ಸಿಗುತ್ತಾ?',hi:'मेरी जानकारी की कॉपी मिल सकती है?',en:'Can I get a copy of my data?'}],
  ['stop','Stop!',{kn:'ರೆಕಾರ್ಡ್ ನಿಲ್ಲಿಸಿ, ಪ್ಲೀಸ್.',hi:'रिकॉर्डिंग बंद कर दीजिए।',en:'Please stop recording.'}]
];

/* ---------- what the listener watches for ---------- */
var PAT=[
  ['stop',/(stop (the )?record|stop recording|delete (my|the|this) record|don'?t record (this|me)|रिकॉर्डिंग बंद|रिकॉर्ड मत|ರೆಕಾರ್ಡ್ ನಿಲ್ಲಿಸಿ|ರೆಕಾರ್ಡ್ ಬೇಡ)/i],
  ['hes',/(being recorded|is this recorded|rather (it )?(wasn'?t|not)|not comfortable being|रिकॉर्ड हो रहा|ರೆಕಾರ್ಡ್ ಆಗ್ತಿದ್ಯಾ)/i],
  ['Sec 11',/(copy of (my|the) (data|information|details)|what (data|information) (do )?you have|मेरी जानकारी|ನನ್ನ ಮಾಹಿತಿ)/i],
  ['Sec 12',/((delete|erase|remove|correct|update) my (data|details|information|number))/i],
  ['Sec 13',/(complain|complaint|शिकायत|ದೂರು)/i],
  ['Sec 14',/(nominee|nominate|on my behalf)/i]
];
var RIGHTS={
  'Sec 11':['See my data','Wants a copy of their data'],
  'Sec 12':['Correct or delete my data','Wants their data corrected or deleted'],
  'Sec 13':['Make a complaint','Wants to make a complaint'],
  'Sec 14':['Name someone for me','Wants to name someone to act for them'],
  'Sec 6':['Withdraw consent','Wants to withdraw consent']
};
function detect(text){ for(var i=0;i<PAT.length;i++){ if(PAT[i][1].test(text)){ handle(PAT[i][0],text); return true; } } return false; }

/* ---------- log, shared with the manager Consent View ---------- */
function emit(sec,txt,extra){
  var e={ts:Date.now(),sec:sec,what:txt,who:CS.who,ch:chName(),lang:LANGS[CS.lang].name,cid:CS.cid,conv:CS.conv};
  if(extra) for(var k in extra) e[k]=extra[k];
  CS.log.push({t:stamp(),sec:sec,what:txt});
  try{ var a=JSON.parse(localStorage.getItem('og_consent_events')||'[]'); if(!Array.isArray(a)) a=[]; a.push(e); if(a.length>200) a=a.slice(-200); localStorage.setItem('og_consent_events',JSON.stringify(a)); }catch(x){}
  renderBar(); if($('ogcPanel')) renderPanel();
}

/* ---------- recording control ---------- */
function sysLine(t){
  var box=$('transcriptLines'); if(!box||CS.native) return;
  var r=document.createElement('div'); r.__ogcSys=1; r.style.cssText='display:flex;justify-content:center;margin:4px 0';
  r.innerHTML='<span style="font-size:11.5px;font-weight:700;color:#fcd34d;background:#2a2516;border-radius:10px;padding:4px 10px">'+t+'</span>';
  box.appendChild(r); box.scrollTop=box.scrollHeight;
}
function storeUi(on){
  var btn=$('aRecBtn'),icon=$('aRecIcon'),ring=$('aRipple'),label=$('aRecLabel'),liveBtn=$('liveNavBtn');
  if(btn) btn.classList[on?'add':'remove']('on'); if(icon) icon.className='ti '+(on?'ti-player-stop':'ti-microphone'); if(ring) ring.classList[on?'add':'remove']('on');
  if(label){ label.textContent=on?'Stop':'Tap to record'; label.classList[on?'add':'remove']('on'); } if(liveBtn) liveBtn.classList[on?'add':'remove']('recording');
}
function inApp(){ return CS.src==='call' && !CS.native; }
function pauseRec(){
  if(inApp()){ try{ if(liveTranscriptTimer){ clearInterval(liveTranscriptTimer); liveTranscriptTimer=null; } }catch(e){} sysLine('Recording paused · nothing kept'); }
  else if(CS.src!=='call'){ try{ clearInterval(liveTimerInt); clearTimeout(liveTypeInt); CS.saved=liveSeconds; }catch(e){} var l=$('aRecLabel'); if(l) l.textContent='Paused'; }
  CS.state='paused'; renderBar();
}
function resumeRec(){
  if(inApp()){ try{ if(!liveTranscriptTimer) liveTranscriptTimer=setInterval(advanceTranscript,2600); }catch(e){} sysLine('Recording resumed · '+N().s+' agreed'); }
  else if(CS.src!=='call'){ try{ aRecOn=true; storeUi(true); startLiveTranscript(); liveSeconds=CS.saved||0; }catch(e){} }
  CS.state='rec'; renderBar();
}
function stopForGood(){
  clearCount();
  if(inApp()){ try{ if(liveTranscriptTimer){ clearInterval(liveTranscriptTimer); liveTranscriptTimer=null; } }catch(e){} sysLine('Recording stopped · nothing after this is kept'); }
  else if(CS.src!=='call'){ try{ if(CS.state==='rec') CS.saved=liveSeconds; if(aRecOn){ aRecOn=false; storeUi(false); stopLiveTranscript(); } if(sopAutoInt) clearInterval(sopAutoInt); }catch(e){} }
  CS.state='stopped'; CS.wd.rec=true; renderBar();
}
function clearCount(){ if(CS.count){ clearInterval(CS.count); CS.count=null; } }

/* ---------- ASK: the gate ---------- */
function showGate(src,name,go,native){
  var keep=CS.on && CS.src===src;
  CS.src=src; CS.native=!!native;
  CS.who=name||(keep?CS.who:(src==='call'?'Caller':(src==='field'?'Field '+N().s:'Walk-in '+N().s)));
  CS.det=src==='call'?'en':'kn'; CS.lang=CS.det; CS.offers=false; CS.minor=false; CS.mode='wa'; CS.sent=false; CS.phone=src==='call'?'98450 61245':''; CS.pending=go;
  if(!keep){ CS.conv=(src==='call'?'CALL-2026-'+(88400+Math.floor(Math.random()*90)):(src==='field'?'VISIT-':'CONV-')+(health()?'OPD':'RTN')+'-'+(500+Math.floor(Math.random()*90))); CS.wd={}; CS.log=[]; }
  renderGate(); renderBar();
}
function closeGate(){ var g=$('ogcGate'); if(g) g.remove(); }
function renderGate(){
  var g=$('ogcGate');
  if(!g){ g=document.createElement('div'); g.id='ogcGate'; g.style.cssText='position:fixed;inset:0;background:rgba(10,20,16,.55);z-index:999980;display:flex;align-items:flex-start;justify-content:center;padding:24px 10px;overflow-y:auto;font-family:inherit;box-sizing:border-box'; document.body.appendChild(g); }
  var n=N(), wa=CS.mode!=='voice';
  var when=CS.src==='call'?'Right after hello':(CS.src==='field'?'At the door':'Before the pitch');
  var L=['kn','hi','en'].map(function(l){ var on=CS.lang===l; return '<button onclick="ogcLang(\''+l+'\')" style="border-radius:14px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;'+(on?'background:#0f6e56;color:#fff;border:1px solid #0f6e56':'background:#fff;color:#0f172a;border:1px solid #d5dbe6')+'">'+LANGS[l].label+'</button>'; }).join('')+'<span style="font-size:11.5px;color:#64748b;align-self:center">+20</span>';
  var en=CS.lang==='en'?'':'<div style="font-size:12px;color:#64748b;margin-top:5px;line-height:1.45">'+scriptEn()+'</div>';
  var lab=function(t){ return '<div style="display:flex;align-items:center;gap:8px;margin-top:14px"><span style="width:20px;height:20px;border-radius:50%;background:#0f172a;color:#fff;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center">'+t[0]+'</span><span style="font-size:13px;font-weight:600;color:#0f172a">'+t[1]+'</span></div>'; };
  var tog=function(on,fn,t,sub,col){ return '<button onclick="'+fn+'()" style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-top:8px;border:1px solid #e3e7f0;background:#fff;border-radius:11px;padding:8px 12px;cursor:pointer;font-family:inherit;color:#0f172a;text-align:left"><span><span style="display:block;font-size:12.5px;font-weight:600">'+t+'</span><span style="display:block;font-size:11.5px;color:#64748b">'+sub+'</span></span><span style="width:36px;height:21px;border-radius:12px;position:relative;flex-shrink:0;background:'+(on?col:'#cfd4de')+'"><span style="position:absolute;top:3px;left:'+(on?'18px':'3px')+';width:15px;height:15px;border-radius:50%;background:#fff"></span></span></button>'; };
  var seg='<div role="tablist" style="display:flex;background:#f1f5f9;border-radius:10px;padding:3px;margin-top:8px">'+[['wa','ti-brand-whatsapp','On WhatsApp'],['voice','ti-microphone','Said out loud']].map(function(m){ var on=(m[0]==='wa')===wa; return '<button role="tab" aria-selected="'+on+'" onclick="ogcMode(\''+m[0]+'\')" style="flex:1;border:none;border-radius:8px;padding:7px 6px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit;'+(on?'background:#fff;color:#0f172a;box-shadow:0 1px 3px rgba(15,23,42,.12)':'background:transparent;color:#64748b')+'"><i class="ti '+m[1]+'"></i> '+m[2]+'</button>'; }).join('')+'</div>';
  var body;
  if(wa && !CS.sent){
    body='<div style="display:flex;gap:6px;margin-top:10px"><span style="border:1px solid #d5dbe6;border-radius:10px;padding:10px;font-size:13.5px;color:#64748b">+91</span><input id="ogcPhone" value="'+esc(CS.phone)+'" inputmode="tel" aria-label="'+(CS.minor?'Parent\'s mobile number':'Customer\'s mobile number')+'" style="flex:1;min-width:0;border:1px solid #d5dbe6;border-radius:10px;padding:10px;font-size:13.5px;font-family:inherit;color:#0f172a"><button onclick="ogcSend()" style="border:none;border-radius:10px;padding:10px 14px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:inherit;background:#0f6e56;color:#fff"><i class="ti ti-send"></i> Send</button></div><div id="ogcPhoneErr" style="font-size:12px;color:#b91c1c;margin-top:4px"></div>'
      +'<div style="font-size:11.5px;color:#64748b;margin-top:2px">They get the same words, and tap Yes or No. Offers are asked separately in the message.</div>'
      +tog(CS.minor,'ogcMinor','Under 18?','Send it to a parent\'s number instead.','#1e3a8a');
  } else if(wa){
    body='<div style="margin-top:10px;background:#fff8e8;border:1px solid #f3dfa6;border-radius:12px;padding:11px 12px"><div style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#7a4c00"><span style="width:8px;height:8px;border-radius:50%;background:#f59e0b"></span>Sent to +91 '+esc(CS.phone)+'. Waiting for their tap.</div><div style="font-size:12px;color:#7a5a20;margin-top:4px">Say: “I\'ve sent it to your WhatsApp. Just tap Yes or No.” Recording stays off until they do.</div></div>'
      +'<div style="display:flex;align-items:center;gap:6px;margin-top:10px;flex-wrap:wrap"><span style="font-size:10.5px;font-weight:700;color:#3b2a00;background:#f5c542;border-radius:10px;padding:4px 8px">DEMO</span><span style="font-size:12px;color:#64748b">They tap:</span><button onclick="ogcWaReply(\'yes\')" style="border:1px solid #cfe3da;background:#ecfdf3;color:#15803d;border-radius:14px;padding:5px 12px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit">Yes</button><button onclick="ogcWaReply(\'no\')" style="border:1px solid #e2e8f0;background:#f8fafc;color:#334155;border-radius:14px;padding:5px 12px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit">No</button><button onclick="ogcResend()" style="margin-left:auto;border:none;background:transparent;color:#0f6e56;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit">Change number</button></div>';
  } else {
    body='<div style="display:flex;gap:8px;margin-top:10px"><button onclick="ogcAgree(\'voice\')" style="flex:1;border:none;border-radius:12px;padding:12px 8px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:inherit;background:#0f6e56;color:#fff"><i class="ti ti-check"></i> '+(CS.minor?'Parent said yes':'They said yes')+'</button><button onclick="ogcRefuse()" style="flex:1;border:1px solid #cfd6e4;background:#fff;color:#0f172a;border-radius:12px;padding:12px 8px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:inherit"><i class="ti ti-x"></i> They said no</button></div>'
      +'<div style="font-size:11.5px;color:#64748b;margin-top:6px">Their spoken yes is saved as a short clip, as proof.</div>'
      +tog(CS.offers,'ogcOffers','Offers on WhatsApp too?','Ask separately. Off unless they say yes.','#0f6e56')
      +tog(CS.minor,'ogcMinor','Under 18?','A parent must say yes.','#1e3a8a');
  }
  g.innerHTML='<div style="background:#fff;border-radius:18px;width:min(420px,100%);padding:16px;box-shadow:0 18px 40px rgba(0,0,0,.3);box-sizing:border-box">'
   +'<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div style="display:flex;align-items:center;gap:9px"><span style="width:34px;height:34px;border-radius:10px;background:#e1f5ee;color:#0f6e56;display:flex;align-items:center;justify-content:center;font-size:18px"><i class="ti ti-shield-lock"></i></span><div><div style="font-size:15px;font-weight:600;color:#0f172a">Ask before you record</div><div style="font-size:12px;color:#64748b">'+chName()+' · '+esc(CS.who)+'</div></div></div><button onclick="ogcCloseGate()" aria-label="Close" style="border:none;background:#f1f2f6;border-radius:50%;width:32px;height:32px;cursor:pointer;font-family:inherit"><i class="ti ti-x"></i></button></div>'
   +lab(['1','Say this · '+when.toLowerCase()])
   +'<div style="margin-top:8px;background:#f1f8f5;border-left:3px solid #0f6e56;border-radius:0;padding:10px 12px"><div style="display:flex;gap:4px;flex-wrap:wrap">'+L+'</div><div style="font-size:13.5px;line-height:1.55;color:#0f172a;margin-top:8px">'+script(CS.lang)+'</div>'+en+'</div>'
   +lab(['2','Get their yes'])+seg+body
   +'<div style="font-size:11.5px;color:#64748b;margin-top:12px;padding-top:10px;border-top:1px solid #f1f3f8">A yes gives a Consent ID tied to this '+what()+'. A no is logged too, and you carry on without recording.</div></div>';
}
window.ogcMode=function(m){ CS.mode=m; CS.sent=false; renderGate(); };
window.ogcSend=function(){ var v=($('ogcPhone')||{}).value||''; var d=v.replace(/\D/g,''); if(d.length!==10){ var e=$('ogcPhoneErr'); if(e) e.textContent='Enter a 10-digit mobile number.'; return; } CS.phone=d.slice(0,5)+' '+d.slice(5); CS.sent=true; emit('Consent','Consent request sent on WhatsApp'+(CS.minor?' to a parent':'')+'. Waiting for a tap.'); renderGate(); };
window.ogcResend=function(){ CS.sent=false; renderGate(); };
window.ogcWaReply=function(r){ if(r==='yes'){ CS.offers=false; ogcAgree('wa'); } else ogcRefuse('wa'); };
window.ogcLang=function(l){ CS.lang=l; renderGate(); };
window.ogcOffers=function(){ CS.offers=!CS.offers; renderGate(); };
window.ogcMinor=function(){ CS.minor=!CS.minor; renderGate(); };
window.ogcCloseGate=function(){ CS.pending=null; closeGate(); if(!CS.on) renderBar(); };
function runPending(){ var go=CS.pending; CS.pending=null; CS.starting=true; try{ if(go) go(); }catch(err){ if(window.console) console.warn('consent gate: start failed',err); }finally{ CS.starting=false; } }
window.ogcAgree=function(how){ how=how||'voice';
  CS.cid='CNS-2026-'+(100000+SEQ++); CS.on=true; CS.state='rec'; CS.wd={};
  closeGate(); runPending(); CS.state='rec';
  emit('Consent','Consent '+CS.cid+': recording yes'+(CS.minor?', from a parent':'')+(how==='wa'?', tapped on WhatsApp':', said out loud (clip saved)')+'. Offers asked separately. Tied to '+CS.conv+'.',{p:{rec:true,follow:true,offers:!!CS.offers},minor:!!CS.minor,method:how==='wa'?'WhatsApp':'Verbal'});
  sysLine('Consent '+CS.cid+' · recording on');
  toast('<i class="ti ti-shield-check"></i> Consent '+CS.cid+' · recording on');
};
window.ogcRefuse=function(how){
  CS.cid=null; CS.on=true; CS.state='declined'; CS.offers=false;
  closeGate();
  if(CS.native) runPending(); else CS.pending=null; /* a phone call still goes ahead, just unrecorded */
  emit('Consent','Said no to recording'+(how==='wa'?' on WhatsApp':'')+'. Logged against '+CS.conv+'.');
  toast('<i class="ti ti-microphone-off"></i> Not recording. Carry on.');
};
function endConv(){ clearCount(); closeNudge(); closeGate(); closePanel(); CS.on=false; CS.state='idle'; CS.cid=null; renderBar(); }

/* ---------- LISTEN: live nudges ---------- */
function closeNudge(){ var n=$('ogcNudge'); if(n) n.remove(); }
function nudgeBox(color,icon,label,title,heard,body,buttons){
  closeNudge();
  var n=document.createElement('div'); n.id='ogcNudge';
  n.style.cssText='position:fixed;left:50%;top:14px;transform:translateX(-50%);width:min(390px,94vw);background:#fff;border:2px solid '+color+';border-radius:16px;box-shadow:0 12px 34px rgba(0,0,0,.25);z-index:999990;padding:12px 14px;font-family:inherit;box-sizing:border-box';
  n.innerHTML='<div style="display:flex;gap:9px;align-items:flex-start"><div style="width:30px;height:30px;border-radius:50%;background:'+color+'1f;color:'+color+';display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti '+icon+'"></i></div><div style="flex:1"><div style="font-size:11.5px;font-weight:800;color:'+color+';letter-spacing:.3px">'+label+'</div><div style="font-size:14px;font-weight:700;color:#0f172a;line-height:1.3;margin-top:1px">'+title+'</div>'+(heard?'<div style="font-size:12px;color:#64748b;margin-top:2px">Heard: “'+esc(heard)+'”</div>':'')+'</div></div>'+body+'<div style="display:flex;gap:8px;margin-top:10px">'+buttons+'</div>';
  document.body.appendChild(n);
}
var B='border-radius:10px;padding:10px 8px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;flex:1;';
function handle(kind,text){
  if(!CS.on) return;
  if(kind==='hes'){
    if(CS.state!=='rec') return;
    pauseRec(); emit('Consent','Sounded unsure. Recording paused.'); CS.left=300;
    nudgeBox('#b45309','ti-microphone-off','LIVE NUDGE','Sounds unsure about recording',text,
      '<div style="font-size:13.5px;font-weight:600;color:#0f172a;line-height:1.45;margin-top:8px">Say once: '+reassure(CS.lang)+'</div><div style="background:#fffbeb;border-radius:9px;padding:7px 10px;margin-top:8px;font-size:12.5px;font-weight:700;color:#92400e">Paused. Stops for good in <span id="ogcLeft">5:00</span> unless they say yes.</div>',
      '<button onclick="ogcHesNo()" style="'+B+'border:none;background:#b91c1c;color:#fff">They said no</button><button onclick="ogcHesYes()" style="'+B+'border:none;background:#e1f5ee;color:#0f6e56">They said yes</button>');
    clearCount();
    CS.count=setInterval(function(){ CS.left--; var l=$('ogcLeft'); if(l) l.textContent=fmt(Math.max(0,CS.left)); if(CS.left<=0){ stopForGood(); closeNudge(); emit('Sec 6','No clear yes in 5 minutes. Recording stopped, erasure queued.'); toast('Recording stopped automatically.'); } },1000);
    return;
  }
  if(kind==='stop'){
    var was=CS.state==='rec'||CS.state==='paused';
    if(was){ stopForGood(); emit('Sec 6','Asked to stop. Recording stopped, erasure queued.'); }
    nudgeBox('#b91c1c','ti-player-stop','LIVE NUDGE · SEC 6',was?'Recording stopped':'Already not recording',text,
      '<div style="font-size:12.5px;color:#334155;margin-top:8px">'+(was?'Done automatically. Erasure is queued. Carry on talking.':'Nothing to stop. Carry on.')+'</div>',
      '<button onclick="ogcCloseNudge()" style="'+B+'border:none;background:#0f172a;color:#fff">OK</button>'+(was?'<button onclick="ogcUndo()" style="'+B+'border:1px solid #cbd5e1;background:#fff;color:#0f172a">Misheard, undo</button>':''));
    return;
  }
  var R=RIGHTS[kind]; if(!R) return;
  nudgeBox('#1d4ed8','ti-user-shield','LIVE NUDGE · '+kind.toUpperCase(),R[1],text,
    '<div style="font-size:12.5px;color:#334155;margin-top:8px">One tap sends it to the DPO. Don\'t promise anything yourself.</div>',
    '<button onclick="ogcLogRight(\''+kind+'\')" style="'+B+'flex:2;border:none;background:#1e3a8a;color:#fff">Send to DPO</button><button onclick="ogcCloseNudge()" style="'+B+'border:1px solid #cbd5e1;background:#fff;color:#0f172a">Not that</button>');
}
window.ogcCloseNudge=closeNudge;
window.ogcSkip=function(){ CS.left=2; };
window.ogcHesNo=function(){ stopForGood(); closeNudge(); emit('Sec 6','Said no mid-'+what()+'. Recording stopped, erasure queued.'); toast('Recording stopped. Carry on.'); };
window.ogcHesYes=function(){ clearCount(); resumeRec(); closeNudge(); emit('Consent','Said yes again. Same Consent ID.'); toast('Recording back on.'); };
window.ogcUndo=function(){ CS.wd.rec=false; resumeRec(); closeNudge(); emit('Consent','Stop undone by staff (misheard). Flagged for DPO.'); };
window.ogcLogRight=function(sec){
  closeNudge();
  if(sec==='Sec 6'){ openPanel(true); return; }
  var ref='RR-2026-0'+(RSEQ++);
  emit(sec,RIGHTS[sec][0]+' · '+ref+' sent to DPO, OTP sent.',{ref:ref});
  toast('<i class="ti ti-user-shield"></i> '+ref+' sent to the DPO');
};

/* ---------- the bar: status, rights and the demo, always visible ---------- */
function stateLabel(){ return {rec:'Recording',paused:'Paused',stopped:'Stopped',declined:'Not recording'}[CS.state]||''; }
function canStore(){ return typeof window.toggleAndRec==='function' && !!$('aRecBtn'); }
function canCall(){ return typeof window.dialerStartCall==='function'; }
function placeBar(){
  var b=$('ogcBar'); if(!b) return;
  var nav=$('liveNavBtn'), row=nav&&nav.parentElement, r=row&&row.getBoundingClientRect();
  if(r && r.width>0){ b.style.bottom=(window.innerHeight-r.top+8)+'px'; b.style.left=(r.left+8)+'px'; b.style.transform='none'; b.style.alignItems='flex-start'; b.style.maxWidth=(r.width-16)+'px'; }
  else { b.style.bottom='22px'; b.style.left='50%'; b.style.transform='translateX(-50%)'; b.style.alignItems='center'; b.style.maxWidth='96vw'; }
}
window.addEventListener('resize',placeBar);
function renderBar(){
  var b=$('ogcBar');
  if(!b){ b=document.createElement('div'); b.id='ogcBar'; b.style.cssText='position:fixed;z-index:999970;display:flex;flex-direction:column;gap:6px;font-family:inherit'; document.body.appendChild(b); }
  setTimeout(placeBar,0);
  var demoBtn='border:none;background:#f1f5f9;color:#0f172a;border-radius:14px;padding:6px 10px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap';
  if(!CS.on){
    var starts=[];
    if(canStore()) starts.push('<button onclick="ogcDemoStart(\''+(isField()?'field':'store')+'\')" style="'+demoBtn+'"><i class="ti ti-microphone"></i> '+(isField()?'Field visit':'Walk-in')+'</button>');
    if(canCall()) starts.push('<button onclick="ogcDemoStart(\'call\')" style="'+demoBtn+'"><i class="ti ti-phone"></i> In-app call</button>');
    starts.push('<button onclick="ogcDemoStart(\'phone\')" style="'+demoBtn+'"><i class="ti ti-phone-outgoing"></i> Phone call</button>');
    starts.push('<button onclick="ogcInfo()" aria-label="How DPDP works in this app" style="border:none;background:#e1f5ee;color:#0f6e56;border-radius:14px;padding:6px 9px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap"><i class="ti ti-shield-lock"></i></button>');
    b.innerHTML='<div style="display:flex;align-items:center;gap:5px;flex-wrap:nowrap;justify-content:center;background:#fff;border:1px solid #e5e7eb;border-radius:22px;padding:5px 6px 5px 5px;box-shadow:0 10px 24px rgba(15,23,42,.18)"><span style="font-size:10.5px;font-weight:800;color:#3b2a00;background:#f5c542;border-radius:14px;padding:6px 9px;white-space:nowrap;letter-spacing:.3px">DEMO</span>'+starts.join('')+'</div>';
    return;
  }
  var dot={rec:'#ff5a5f',paused:'#f5a524'}[CS.state]||'#94a3b8';
  var phrases=DEMO.map(function(d){ return '<button onclick="ogcDemo(\''+d[0]+'\')" style="'+demoBtn+'">“'+d[1]+'”</button>'; }).join('')+'<button onclick="ogcInfo()" aria-label="How DPDP works in this app" style="border:none;background:#e1f5ee;color:#0f6e56;border-radius:14px;padding:6px 9px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap"><i class="ti ti-shield-lock"></i></button>';
  b.innerHTML='<div style="display:flex;align-items:center;gap:5px;flex-wrap:nowrap;justify-content:center;background:#fff;border:1px solid #e5e7eb;border-radius:22px;padding:5px 6px 5px 5px;box-shadow:0 10px 24px rgba(15,23,42,.18)"><span style="font-size:10.5px;font-weight:800;color:#3b2a00;background:#f5c542;border-radius:14px;padding:6px 9px;white-space:nowrap;letter-spacing:.3px">DEMO</span>'+phrases+'</div>'
   +'<button onclick="ogcOpenPanel()" style="display:flex;align-items:center;gap:8px;border:1px solid #1f3a30;background:#0a1a14;color:#e6efe9;border-radius:20px;padding:9px 14px;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.25);font-family:inherit;white-space:nowrap"><span style="width:9px;height:9px;border-radius:50%;background:'+dot+'"></span>'+stateLabel()+(CS.cid?' · '+CS.cid.slice(-6):'')+'<span style="width:1px;height:14px;background:#2f4a40"></span><span style="color:#5dcaa5"><i class="ti ti-user-shield"></i> Rights</span></button>';
}

window.ogcInfo=function(){
  var p=$('ogcPanel');
  if(!p){ p=document.createElement('div'); p.id='ogcPanel'; p.style.cssText='position:fixed;inset:0;background:rgba(10,20,16,.5);z-index:999985;display:flex;align-items:flex-end;justify-content:center;font-family:inherit'; p.onclick=function(e){ if(e.target===p) closePanel(); }; document.body.appendChild(p); }
  var R=[['ti-message-report','#e1f5ee','#0f6e56','Ask first','Read the line, then send it on WhatsApp. Nothing records until they tap Yes.','Sec 5–6'],
    ['ti-microphone-off','#f1f5f9','#334155','No means no','Carry on without recording. Offers stay off unless they say yes.','Sec 6'],
    ['ti-hand-stop','#fef2f2','#b91c1c','Stop means stop','The app stops recording itself the moment it hears it.','Sec 6'],
    ['ti-user-shield','#eef2ff','#1e3a8a','Data questions go to the DPO','One tap. They get a reference number. Don\'t promise anything.','Sec 11–14'],
    ['ti-user-plus','#fff7ed','#c2410c','Under 18 needs a parent','Switch on “Under 18?” and the parent says yes.','Sec 9']];
  p.innerHTML='<div style="background:#fff;border-radius:20px 20px 0 0;width:min(520px,100%);max-height:84vh;overflow-y:auto;padding:18px 16px 22px;box-sizing:border-box">'
   +'<div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:15px;font-weight:700;color:#0f172a">How this app keeps you DPDP-safe</div><div style="font-size:12px;color:#64748b;margin-top:2px">Five rules. The app does most of the work.</div></div><button onclick="ogcClosePanel()" aria-label="Close" style="border:none;background:#f1f2f6;border-radius:50%;width:32px;height:32px;cursor:pointer;font-family:inherit"><i class="ti ti-x"></i></button></div>'
   +R.map(function(r){ return '<div style="display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid #f1f3f8"><span style="width:34px;height:34px;border-radius:10px;background:'+r[1]+';color:'+r[2]+';display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0"><i class="ti '+r[0]+'"></i></span><div style="flex:1"><div style="display:flex;justify-content:space-between;gap:8px"><span style="font-size:13.5px;font-weight:600;color:#0f172a">'+r[3]+'</span><span style="font-size:10.5px;color:#94a3b8;font-weight:600">'+r[5]+'</span></div><div style="font-size:12.5px;color:#475569;line-height:1.45;margin-top:2px">'+r[4]+'</div></div></div>'; }).join('')
   +'<div style="font-size:12px;color:#64748b;margin-top:12px">Every tap is logged for your DPO, on a trail nobody can quietly change.</div></div>';
};
window.ogcDemoStart=function(kind){
  if(kind==='store'||kind==='field'){ if(window.aRecOn) return; window.toggleAndRec(); return; }
  if(kind==='call'){ try{ window.dialerStartCall('Faizan A.','out'); }catch(e){ showGate('call','Faizan A.',null,false); } return; }
  showGate('call','Faizan A.',null,true); /* demo phone call: no real dialling */
};
window.ogcDemo=function(k){
  var d=DEMO.filter(function(x){ return x[0]===k; })[0]; var t=d[2][CS.lang]||d[2].en;
  closePanel();
  if(inApp() && $('transcriptLines') && typeof appendTranscriptLine==='function' && CS.state!=='declined'){ appendTranscriptLine({who:'customer',text:t}); }
  else detect(t);
};

/* ---------- rights panel ---------- */
function openPanel(wd){ CS.wdOpen=!!wd; renderPanel(); }
function closePanel(){ var p=$('ogcPanel'); if(p) p.remove(); }
window.ogcOpenPanel=function(wd){ openPanel(wd); };
window.ogcClosePanel=closePanel;
function renderPanel(){
  var p=$('ogcPanel');
  if(!p){ p=document.createElement('div'); p.id='ogcPanel'; p.style.cssText='position:fixed;inset:0;background:rgba(10,20,16,.5);z-index:999985;display:flex;align-items:flex-end;justify-content:center;font-family:inherit'; p.onclick=function(e){ if(e.target===p) closePanel(); }; document.body.appendChild(p); }
  var n=N();
  var pill=function(s,ok){ return '<span style="font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:6px;'+(ok?'background:#dcfce7;color:#15803d':'background:#f1f5f9;color:#475569')+'">'+s+'</span>'; };
  var recOk=CS.state==='rec';
  var IC={'Sec 11':['ti-eye','#eef2ff','#1e3a8a'],'Sec 12':['ti-edit','#eef2ff','#1e3a8a'],'Sec 13':['ti-message-report','#fff7ed','#c2410c'],'Sec 14':['ti-user-plus','#eef2ff','#1e3a8a'],'Sec 6':['ti-hand-stop','#fef2f2','#b91c1c']};
  var rights=['Sec 11','Sec 12','Sec 13','Sec 14','Sec 6'].map(function(s){ var ic=IC[s]; return '<button onclick="ogcLogRight(\''+s+'\')" style="display:flex;align-items:center;gap:10px;text-align:left;border:1px solid #e6eaf2;background:#fff;border-radius:12px;padding:10px 11px;cursor:pointer;font-family:inherit;color:#0f172a"><span style="width:32px;height:32px;border-radius:9px;background:'+ic[1]+';color:'+ic[2]+';display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0"><i class="ti '+ic[0]+'"></i></span><span><span style="display:block;font-size:13px;font-weight:700;line-height:1.25">'+RIGHTS[s][0]+'</span><span style="display:block;font-size:10.5px;color:#94a3b8;margin-top:1px">'+s+'</span></span></button>'; }).join('');
  var wdList=[['rec','Recording',CS.state==='rec'||CS.state==='paused'],['offers','Offers',CS.offers&&CS.cid&&!CS.wd.offers]].filter(function(x){ return x[2]; });
  var wd=CS.wdOpen?'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:10px 12px;margin-top:8px"><div style="font-size:13px;font-weight:800;color:#92400e">Withdraw what?</div>'+(wdList.length?wdList.map(function(x){ return '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0"><span style="font-size:13.5px;font-weight:600">'+x[1]+'</span><button onclick="ogcWithdraw(\''+x[0]+'\')" style="border:1px solid #d9b77a;background:#fff;color:#7a4100;border-radius:9px;padding:6px 11px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit">Withdraw</button></div>'; }).join(''):'<div style="font-size:12.5px;color:#64748b;margin-top:4px">Nothing left to withdraw.</div>')+'</div>':'';
  var log=CS.log.slice().reverse().slice(0,6).map(function(g){ return '<div style="display:flex;gap:8px;padding:5px 0;font-size:12.5px"><span style="color:#64748b;width:38px;flex-shrink:0">'+g.t+'</span><span style="flex:1;color:#0f172a">'+esc(g.what)+'</span></div>'; }).join('');
  p.innerHTML='<div style="background:#fff;border-radius:20px 20px 0 0;width:min(520px,100%);max-height:84vh;overflow-y:auto;padding:16px 16px 22px;box-sizing:border-box">'
   +'<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div><div style="font-size:15px;font-weight:700;color:#0f172a">'+esc(CS.who)+'</div><div style="font-size:12px;color:#64748b">'+chName()+' · '+(CS.cid||'no Consent ID')+'</div></div><button onclick="ogcClosePanel()" aria-label="Close" style="border:none;background:#f1f2f6;border-radius:50%;width:32px;height:32px;cursor:pointer;font-family:inherit"><i class="ti ti-x"></i></button></div>'
   +'<div style="display:flex;gap:8px;margin-top:10px;font-size:13px;color:#0f172a;align-items:center">Recording '+pill(stateLabel(),recOk)+' Offers '+pill(CS.offers&&CS.cid&&!CS.wd.offers?'Yes':'No',CS.offers&&CS.cid&&!CS.wd.offers)+'</div>'
   +'<div style="font-size:13.5px;font-weight:800;color:#0f172a;margin-top:16px">'+n.S+' is asking to…</div><div style="font-size:12px;color:#64748b;margin-top:2px">One tap sends it to the DPO with a reference number.</div>'
   +'<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:8px">'+rights+'</div>'+wd
   +(log?'<div style="font-size:13px;font-weight:800;color:#0f172a;margin-top:14px">Logged</div>'+log:'')
   +'<button onclick="ogcEnd()" style="margin-top:12px;width:100%;border:none;background:#f1f5f9;color:#0f172a;border-radius:10px;padding:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">End this '+what()+'</button></div>';
}
window.ogcWithdraw=function(k){
  var lab={rec:'Recording',offers:'Offers'}[k];
  if(k==='rec') stopForGood(); else CS.wd[k]=true;
  emit('Sec 6',lab+' withdrawn. Stopped at once, erasure queued.');
  toast(lab+' withdrawn'); renderPanel();
};
window.ogcEnd=function(){
  if(inApp()){ try{ if(typeof window.dialerEndCall==='function'){ window.dialerEndCall(); } }catch(e){} }
  else if(CS.src!=='call' && window.aRecOn && origToggle){ try{ origToggle(); }catch(e){} }
  endConv();
};

/* ---------- hooks into the existing app functions ---------- */
var origToggle=null;
function wrap(name,maker){ var f=window[name]; if(typeof f!=='function'||f.__ogc) return f; var w=maker(f); w.__ogc=1; window[name]=w; return f; }
function ensureHooks(){
  var t=wrap('toggleAndRec',function(orig){ origToggle=orig; return function(){
    var self=this,args=arguments;
    if(!window.aRecOn){ showGate(isField()?'field':'store',null,function(){ orig.apply(self,args); }); return; }
    if(CS.state==='paused'){ clearCount(); closeNudge(); }
    orig.apply(self,args); if(CS.src!=='call') endConv();
  }; });
  wrap('startCallTranscript',function(orig){ return function(name){ var self=this,args=arguments; showGate('call',name,function(){ orig.apply(self,args); },false); }; });
  wrap('stopCallTranscript',function(orig){ return function(){ var r=orig.apply(this,arguments); if(!CS.starting && inApp() && (CS.on||$('ogcGate'))) endConv(); return r; }; });
  wrap('placeOnGroundCallDirect',function(orig){ return function(phone){ var self=this,args=arguments; showGate('call',phone||'Caller',function(){ orig.apply(self,args); },true); }; });
  wrap('proceedOnGroundCall',function(orig){ return function(){ var self=this,args=arguments,pd=null; try{ pd=onGroundCallPending; }catch(e){} showGate('call',(pd&&(pd.name||pd.phone))||'Caller',function(){ orig.apply(self,args); },true); }; });
  var box=$('transcriptLines');
  if(box && !box.__ogc){ box.__ogc=1; new MutationObserver(function(ms){ ms.forEach(function(m){ [].forEach.call(m.addedNodes,function(nd){ if(nd.nodeType!==1||nd.__ogcSys) return; if(!nd.style||nd.style.flexDirection!=='row-reverse') return; detect(nd.textContent||''); }); }); }).observe(box,{childList:true}); }
}
function boot(){ ensureHooks(); renderBar(); document.addEventListener('click',ensureHooks,true); setTimeout(ensureHooks,1500); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ setTimeout(boot,0); }); else setTimeout(boot,0);
})();
(function(){
/* Task rows open the Pulse thread where the ask is pinned; answering clears it here and on the dashboard */
window.hcsToast=window.hcsToast||function(x){var d=document.createElement('div');d.style.cssText='position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#0f172a;color:#fff;font-size:13.5px;font-weight:700;padding:10px 16px;border-radius:20px;z-index:999999';d.innerHTML=x;document.body.appendChild(d);setTimeout(function(){d.remove();},2400);};
var IS_WEB=!!document.querySelector('[onclick*="aSwitch(\'calls\')"]');
var TASKS=IS_WEB?{
  'Call Centre Team':[{id:'w1',q:'Confirm the 4:30pm callback',ctx:'Priya Iyer · likely billing dispute',opts:['Confirmed','Reschedule']}],
  'AvaniBot':[{id:'w2',q:'Call now or reassign the 2 hot leads',ctx:'Untouched for 24h',opts:['Calling now','Reassign']},{id:'w3',q:'Log this morning\'s call outcome',ctx:'Suresh Nair · plan upgrade enquiry',opts:['Converted','Callback','Not interested']}]
}:{
  'AvaniBot':[{id:'s1',q:'Update the ageing lead',ctx:'Meera S. · Ortho Grid · no contact in 3 days',opts:['Called, follow-up Sat','Not interested','Hand back']}],
  'RT Nagar Store Team':[{id:'s2',q:'Who calls back at 4:30pm?',ctx:'2 callbacks · Karan P. and Divya R.',opts:['I will','Ask Sameena']}],
  'Quotation Tickets':[{id:'s3',q:'Send the Ortho Grid quote for approval',ctx:'Meera S. · king size · ₹42,000 with EMI',opts:['Send for approval','Change price']}]
};
function boot(){
  if(typeof HCPin!=='function' || window.HCS) return;
  window.HCS=HCPin({name:'HCS',bodyId:'pchatBody',active:function(){ try{ return pulseChatActive; }catch(e){ return ''; } },
    openChannel:function(ch){ try{ aSwitch('pulse'); }catch(e){} setTimeout(function(){ try{ openPulseChat(ch); }catch(e){} },60); },
    tasks:TASKS,
    onDone:function(id){ var r=document.querySelector('#hcMyTasks [data-tid="'+id+'"]'); if(r) r.style.display='none'; var n=HCS.left(); var c=document.getElementById('taskCountBadge'); if(c) c.textContent=n;
      if(!n){ var m=document.getElementById('hcMyTasks'); if(m){ var lst=m.querySelector('div[style*="flex-direction:column"]'); if(lst) lst.innerHTML='<div style="background:#fff;border-radius:11px;padding:9px 11px;font-size:14px;font-weight:700;color:#15803d"><i class="ti ti-circle-check"></i> All caught up</div>'; } }
      hcsToast('Task done · removed from My Tasks'); }
  });
  if(typeof openPulseChat==='function'){ var o=openPulseChat; openPulseChat=function(){ var r=o.apply(this,arguments); setTimeout(function(){ HCS.render(); },0); return r; }; window.openPulseChat=openPulseChat; }
  if(typeof renderStaffPulseThread==='function'){ var rt=renderStaffPulseThread; renderStaffPulseThread=function(){ var r=rt.apply(this,arguments); setTimeout(function(){ HCS.render(); },0); return r; }; }
  setInterval(function(){ if(!document.querySelector('.hc-pin-badge') && HCS.left()) HCS.badges(); },1500);
}
window.hcStaffTask=function(thread){ boot(); if(window.HCS) HCS.go(thread); };
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ setTimeout(boot,0); }); else setTimeout(boot,0);
})();

(function(){
/* Role agent channels for staff: each person sees only their own digest, tasks and nudges */
var IS_WEB=!!document.querySelector('[onclick*="aSwitch(\'calls\')"]');
function boot(){
  if(typeof HCRoleAgents!=='function' || window.HCRAS) return;
  var as='asm-agent';
  window.HCRAS=HCRoleAgents({name:'HCRAS',host:'asc-pulse',pad:'0 10px 8px',canAdd:function(){return false;},taskViewer:function(){ return (!IS_WEB && as==='field-agent')?'Kiran T.':'Arvind Rajan'; },mount:function(){ var b=document.getElementById('staffAgentFoldBody'); return b?[b.parentNode,b]:null; },
    viewer: IS_WEB?{'callcentre-agent':'Arvind Rajan'}:{'asm-agent':'Arvind Rajan','field-agent':'Kiran T.'},
    showOnly: IS_WEB?null:function(){ return as; },
    switcher: IS_WEB?null:function(){ return '<span style="margin-left:auto;display:flex;gap:4px">'+[['asm-agent','In-store'],['field-agent','Field']].map(function(x){ return '<span onclick="event.stopPropagation();HCRAS.setAs(\''+x[0]+'\')" style="font-size:11.5px;font-weight:700;padding:2px 8px;border-radius:9px;cursor:pointer;'+(as===x[0]?'background:#6d28d9;color:#fff':'background:#f1f2f6;color:#475569')+'">'+x[1]+'</span>'; }).join('')+'</span>'; }
  });
  HCRAS.setAs=function(id){ as=id; HCRAS.rebuild(); };
  HCRAS.rows();
  var st=document.createElement('style'); st.textContent='#staffVerticalAgentChannels{display:none !important}'; document.head.appendChild(st);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ setTimeout(boot,50); }); else setTimeout(boot,50);
})();

const $ = s => document.querySelector(s);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => '₹' + Number(n).toLocaleString('en-IN', {maximumFractionDigits:2});
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
let state, matches = [], currentQuery, selected, activeTrip;
let toastTimer;
function toast(message){ $('#toast').textContent=message; $('#toast').classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),6500); }
let browserMode = false, demoSnapshot = null, requestQueue = Promise.resolve();
const storageKey = 'routekind-demo-v1';
async function requestApi(path, data){
  const body = browserMode ? {payload:data || {}, demo_snapshot:demoSnapshot} : data;
  const response = await fetch('/api/'+path, body === undefined ? {} : {
    method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)
  });
  let result;
  try { result = await response.json(); } catch { throw new Error('The website API is unavailable. Check that the latest Vercel deployment is ready.'); }
  if(!response.ok) throw new Error(result.error || 'Unable to complete this action.');
  if(result.storage_mode === 'browser'){
    const first = !browserMode;
    browserMode = true;
    if(first){
      try { demoSnapshot = JSON.parse(localStorage.getItem(storageKey) || 'null'); }
      catch { localStorage.removeItem(storageKey); }
      if(demoSnapshot) return requestApi('state', {});
    }
    demoSnapshot = result.demo_snapshot;
    try { localStorage.setItem(storageKey, JSON.stringify(demoSnapshot)); }
    catch { toast('Browser storage is unavailable. Demo changes last only until this page closes.'); }
    delete result.demo_snapshot;
    if(result.message) result.message = result.message.replaceAll('locally','in your browser demo').replaceAll('local demo','browser demo');
  }
  return result;
}
function api(path, data){
  const pending = requestQueue.then(()=>requestApi(path,data));
  requestQueue = pending.catch(()=>{});
  return pending;
}
async function action(fn){try{await fn();}catch(error){toast(error.message);const box=$('#modal-content .modal-error');if(box){box.textContent=error.message;box.hidden=false;}}}
function name(id){return state.stops[id]?.name || id;}
function initials(value){return value.split(' ').map(s=>s[0]).slice(0,2).join('');}
function niceDate(value){return new Date(value+'T12:00:00').toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'});}
function showPage(page){document.querySelectorAll('.page').forEach(el=>el.classList.toggle('active',el.id===page));document.querySelectorAll('.nav').forEach(el=>el.classList.toggle('active',el.dataset.page===page));if(page==='trips') renderTrips();if(page==='safety') renderProfile();if(page==='offer') renderOffers();window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-page]').forEach(el=>el.addEventListener('click',()=>showPage(el.dataset.page)));
function options(){return Object.entries(state.stops).map(([id,s])=>`<option value="${id}">${esc(s.name)}</option>`).join('');}
function dayPicker(id, chosen=[0,1,2,3,4]){const root=$(id);root.innerHTML=days.map((d,i)=>`<button type="button" class="day ${chosen.includes(i)?'selected':''}" data-day="${i}" aria-pressed="${chosen.includes(i)}">${d}</button>`).join('');root.querySelectorAll('button').forEach(b=>b.onclick=()=>{b.classList.toggle('selected');b.setAttribute('aria-pressed',b.classList.contains('selected'));});}
function chosenDays(id){return [...$(id).querySelectorAll('.selected')].map(b=>Number(b.dataset.day));}
async function refresh(){state=await api('state');$('#trip-count').textContent=state.bookings.filter(b=>['confirmed','in_progress'].includes(b.status)).length;$('#profile-name').textContent=state.profile.name;$('.avatar.me').textContent=initials(state.profile.name);}
function getQuery(){return {origin:$('#origin').value,destination:$('#destination').value,date:$('#date').value,time:$('#time').value,tolerance:Number($('#tolerance').value),women_only:$('#women').checked,verified_only:$('#verified').checked};}
async function search(){const button=$('.search-button');button.disabled=true;try{currentQuery=getQuery();const result=await api('search',currentQuery);matches=result.matches;selected=matches[0];renderMatches();renderMap(selected);}finally{button.disabled=false;}}
$('#search-form').onsubmit=e=>{e.preventDefault();action(search);};
$('#swap').onclick=()=>{const old=$('#origin').value;$('#origin').value=$('#destination').value;$('#destination').value=old;};
function renderMatches(){
  $('#match-count').textContent=matches.length;
  $('#results-subtitle').textContent=`${niceDate(currentQuery.date)} · Ranked by route efficiency and pickup time`;
  $('#matches').innerHTML=matches.length?matches.map((r,i)=>`<article class="ride-card ${i===0?'selected':''}" data-card="${r.id}">
  <div class="ride-top"><div class="avatar" style="background:${['#e9dfd4','#e0e5d8','#e8dfec'][i%3]}">${esc(initials(r.name))}</div><div class="ride-person"><strong>${esc(r.name)}</strong>${r.verified?'<span class="verified-mark" title="Demo verified identity">✦</span>':''}<small><span class="rating">★ ${r.rating ?? 'New'}</span> · ${r.reviews} ratings · ${esc(r.car)}</small></div><span class="match-badge">${r.score}% match</span></div>
  <div class="ride-route"><div class="ride-time">${esc(r.pickup)}<small>${r.gap===0?'Right on time':r.gap+' min from target'}</small></div><div class="route-stops"><div>${esc(name(currentQuery.origin))}</div><div>${esc(name(currentQuery.destination))}</div></div></div>
  <div class="ride-tags"><span class="tag green">↗ ${r.shared_km} km together</span><span class="tag">${r.available} seat${r.available===1?'':'s'} left</span>${r.women_only?'<span class="tag women">♀ Women only</span>':''}<span class="tag">↻ ${r.days.map(d=>days[d]).join(' · ')}</span></div>
  <div class="ride-bottom"><div><span class="price">${money(r.fare.amount)} <small>/ trip est.</small></span><button class="text-button" data-preview="${r.id}">View route</button></div><button class="primary" data-book="${r.id}">View ride ↗</button></div></article>`).join(''):'<div class="empty"><h3>No shared routes just yet.</h3><p>Try a wider time window, another weekday, or Indiranagar → RMZ Ecospace around 08:30.</p></div>';
  document.querySelectorAll('[data-book]').forEach(b=>b.onclick=()=>openBooking(b.dataset.book));
  document.querySelectorAll('[data-preview]').forEach(b=>b.onclick=()=>{selected=matches.find(r=>r.id===b.dataset.preview);renderMap(selected);document.querySelectorAll('[data-card]').forEach(c=>c.classList.toggle('selected',c.dataset.card===selected.id));});
}
function points(path){return path.map(id=>`${state.stops[id].x},${state.stops[id].y}`).join(' ');}
function mapSvg(ride, origin, destination, progress){
  const path=ride?.path||[];const start=path.indexOf(origin),end=path.indexOf(destination);const shared=start>=0&&end>start?path.slice(start,end+1):[];
  let marker='';
  if(progress!==undefined&&shared.length){
    const lengths=shared.slice(1).map((id,i)=>Math.hypot(state.stops[id].x-state.stops[shared[i]].x,state.stops[id].y-state.stops[shared[i]].y));let remaining=lengths.reduce((a,b)=>a+b,0)*progress/100;let index=0;while(index<lengths.length-1&&remaining>lengths[index]){remaining-=lengths[index++];}const a=state.stops[shared[index]],b=state.stops[shared[index+1]],t=Math.min(1,remaining/lengths[index]);marker=`<g transform="translate(${a.x+(b.x-a.x)*t},${a.y+(b.y-a.y)*t})"><circle r="23" fill="#276d4d" opacity=".15"/><circle r="13" fill="#276d4d" stroke="white" stroke-width="4"/><text y="4" text-anchor="middle" fill="white" font-size="11">↗</text></g>`;
  }
  return `<svg viewBox="0 0 740 530" role="img" aria-label="Illustrative Bengaluru route map${progress!==undefined?', simulated progress '+progress+' percent':''}"><defs><pattern id="grid" width="65" height="65" patternUnits="userSpaceOnUse"><path d="M 65 0 L 0 0 0 65" fill="none" stroke="#e6e9df" stroke-width="2"/></pattern></defs><rect width="740" height="530" fill="#eff1e7"/><rect width="740" height="530" fill="url(#grid)"/>
  <path d="M50 270 Q170 290 135 370 Q90 405 42 358Z M370 30 Q450 30 440 90 Q360 115 345 65Z M620 340 Q700 310 710 410 L655 465 600 402Z" fill="#e0e8ce"/><path d="M390 400 Q430 370 474 435 Q465 480 390 470Z" fill="#d3e4e1"/>
  <path d="M0 90L740 430 M-20 450L610 0 M80 530L360 0 M0 350L740 280 M420 530L740 80" stroke="#fff" stroke-width="10" fill="none"/>
  ${state.edges.map(([a,b])=>`<polyline points="${points([a,b])}" fill="none" stroke="#fff" stroke-width="12"/><polyline points="${points([a,b])}" fill="none" stroke="#d5dccc" stroke-width="2"/>`).join('')}
  ${path.length?`<polyline points="${points(path)}" fill="none" stroke="#9cb190" stroke-width="6" stroke-dasharray="8 7" stroke-linecap="round" stroke-linejoin="round"/>`:''}
  ${shared.length?`<polyline points="${points(shared)}" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><polyline points="${points(shared)}" fill="none" stroke="#3a8259" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`:''}
  ${Object.entries(state.stops).map(([id,s])=>`<circle cx="${s.x}" cy="${s.y}" r="${id===origin||id===destination?8:3}" fill="${id===origin?'#fff':id===destination?'#286b4b':'#bcc9ad'}" stroke="${id===origin||id===destination?'#347c53':'#b8c5ac'}" stroke-width="${id===origin||id===destination?4:1}"/><text x="${s.x}" y="${s.y+(id==='domlur'||id==='ecospace'?25:-18)}" text-anchor="middle" font-size="${shared.includes(id)?14:12}" font-family="sans-serif" fill="${shared.includes(id)?'#3e6545':'#98a38c'}" font-weight="${shared.includes(id)?600:400}" paint-order="stroke" stroke="#eff1e7" stroke-width="4">${esc(s.name)}</text>`).join('')}${marker}<text x="35" y="500" font-size="10" fill="#9fa991" letter-spacing="2">BENGALURU · DEMO ROAD NETWORK</text></svg>`;
}
function renderMap(ride){$('#route-map').innerHTML=mapSvg(ride,currentQuery.origin,currentQuery.destination);$('#route-summary').innerHTML=ride?`<div><strong>${ride.shared_km} km</strong><small>Shared distance</small></div><div><strong>~${ride.duration} min</strong><small>Demo travel time</small></div><div><strong>${ride.driver_overlap}%</strong><small>Of driver's route</small></div>`:'<small>Choose a matching ride to preview your route.</small>';}
function openModal(html){$('#modal-content').innerHTML=html;if(!$('#modal').open)$('#modal').showModal();}
$('.modal-close').onclick=()=>$('#modal').close();
$('#modal').addEventListener('click',e=>{if(e.target===$('#modal')){const r=$('#modal').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('#modal').close();}});
function fareHtml(fare){return fare.segments.map(s=>`<div class="fare-line"><span>${esc(s.from)} → ${esc(s.to)}<small>${s.km} km · Split between ${s.people} people, including driver</small></span><strong>${money(s.share)}</strong></div>`).join('')+`<div class="fare-total"><span>Your estimated share</span><strong>${money(fare.amount)}</strong></div>`;}
function openBooking(id){
  const r=matches.find(m=>m.id===id);selected=r;renderMap(r);
  openModal(`<div class="modal-top"><p class="eyebrow">YOUR NEXT GOOD COMMUTE</p><h2>Ride with ${esc(r.name.split(' ')[0])}.</h2><p>${esc(name(currentQuery.origin))} → ${esc(name(currentQuery.destination))}<br>${niceDate(currentQuery.date)} · Pickup ${r.pickup} · ${esc(r.car)}</p></div><div class="ride-tags">${r.women_only?'<span class="tag women">Women-only ride</span>':''}<span class="tag green">${r.verified?'Demo verified driver':'Unverified driver'}</span><span class="tag">★ ${r.rating}</span></div><h3>A fair share, kilometre by kilometre</h3>${fareHtml(r.fare)}<label class="check"><input type="checkbox" id="recurring"> Make this my recurring commute</label><div id="repeat-settings" hidden><p class="help">Reserve matching weekdays over 14 days from your selected date. Driver operates ${r.days.map(d=>days[d]).join(', ')}.</p><div class="day-picker" id="booking-days"></div><p id="recurring-total" class="help"></p></div><div class="notice">Estimate at booking time; no payment is taken. The demo stores this estimate. A real shared fare may change with occupancy.</div><div class="inline-error modal-error" hidden></div><div class="modal-actions"><button class="secondary" id="back-button">Not now</button><button class="primary" id="confirm-booking">Confirm demo booking ↗</button></div>`);
  dayPicker('#booking-days',r.days.filter(d=>d<5));
  const total=()=>{const weekdays=chosenDays('#booking-days');let count=0;const start=new Date(currentQuery.date+'T12:00:00');for(let i=0;i<14;i++){const d=new Date(start);d.setDate(d.getDate()+i);if(weekdays.includes((d.getDay()+6)%7))count++;}$('#recurring-total').textContent=`${count} trips · ${money(count*r.fare.amount)} estimated total (availability checked at booking)`;};
  total();$('#booking-days').addEventListener('click',total);
  $('#recurring').onchange=e=>$('#repeat-settings').hidden=!e.target.checked;
  $('#back-button').onclick=()=>$('#modal').close();
  $('#confirm-booking').onclick=()=>action(async()=>{const button=$('#confirm-booking');button.disabled=true;try{const result=await api('book',{...currentQuery,ride_id:r.id,recurring:$('#recurring').checked,days:chosenDays('#booking-days')});await refresh();$('#modal').close();showPage('trips');toast(result.message);}finally{button.disabled=false;}});
}
$('#explain-cost').onclick=()=>openModal(`<div class="modal-top"><p class="eyebrow">SMALL SHARES. FAIR JOURNEYS.</p><h2>Pay for your part of the ride.</h2><p>For each road segment, the vehicle cost is divided equally among the driver and passengers on board.</p></div><div class="fare-line"><span>6 km × ₹8 vehicle cost per km</span><strong>₹48</strong></div><div class="fare-line"><span>Driver + you</span><strong>₹24 each</strong></div><div class="fare-line"><span>Driver + you + another rider</span><strong>₹16 each</strong></div><div class="notice">The algorithm checks occupancy on each segment. You pay nothing for the driver's journey before pickup or after drop-off. Distance and vehicle cost are sample data.</div>`);
function renderTrips(){
  const active=state.bookings.filter(b=>b.status!=='cancelled'),completed=active.filter(b=>b.status==='completed');
  $('#trip-stats').innerHTML=`<div class="stat"><strong>${active.filter(b=>b.status==='confirmed').length}</strong><small>Upcoming commutes</small></div><div class="stat"><strong>${completed.length}</strong><small>Trips completed</small></div><div class="stat"><strong>${money(active.reduce((s,b)=>s+b.amount,0))}</strong><small>Active + completed estimates</small></div>`;
  $('#trip-list').innerHTML=state.bookings.length?state.bookings.map(b=>{const r=state.rides.find(r=>r.id===b.ride_id);return `<article class="trip-card"><div><span class="tag ${b.status==='completed'?'green':''}">${esc(b.status.replace('_',' '))}</span>${b.recurring?'<span class="tag">↻ Recurring</span>':''}<h3>${esc(name(b.origin))} → ${esc(name(b.destination))}</h3><p>${niceDate(b.date)} · ${b.pickup} · ${esc(r.name)} · ${money(b.amount)} estimate</p>${b.rating?`<p>★ You rated this ride ${b.rating}/5</p>`:''}</div><div class="trip-actions">${b.status==='confirmed'?`<button class="primary" data-track="${b.id}">Start demo trip</button><button class="secondary" data-cancel="${b.id}">Cancel</button>`:b.status==='in_progress'?`<button class="primary" data-track="${b.id}">Track demo trip ↗</button>`:b.status==='completed'&&!b.rating?`<button class="secondary" data-rate="${b.id}">Rate your ride ★</button>`:''}</div></article>`;}).join(''):'<div class="empty"><h3>Your next commute is waiting.</h3><p>Find a route you like and book your first demo ride.</p><button class="primary" id="find-first">Find a ride ↗</button></div>';
  $('#find-first')?.addEventListener('click',()=>showPage('find'));
  document.querySelectorAll('[data-track]').forEach(b=>b.onclick=()=>action(async()=>{const booking=state.bookings.find(x=>x.id===b.dataset.track);if(booking.status==='confirmed'){await api('booking',{id:booking.id,action:'start'});await refresh();renderTrips();}track(booking.id);}));
  document.querySelectorAll('[data-cancel]').forEach(b=>b.onclick=()=>cancelDialog(b.dataset.cancel));
  document.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>ratingDialog(b.dataset.rate));
}
function cancelDialog(id){const b=state.bookings.find(b=>b.id===id);openModal(`<div class="modal-top"><h2>Change of plans?</h2><p>Release your seat on ${niceDate(b.date)}. No cancellation fee or payment applies in this demo.</p></div>${b.recurring?'<label class="check"><input type="checkbox" id="cancel-series"> Cancel all upcoming trips in this series</label>':''}<div class="modal-actions"><button class="secondary" id="keep-trip">Keep my ride</button><button class="danger" id="do-cancel">Cancel ride</button></div>`);$('#keep-trip').onclick=()=>$('#modal').close();$('#do-cancel').onclick=()=>action(async()=>{const result=await api('booking',{id,action:'cancel',series:$('#cancel-series')?.checked||false});await refresh();renderTrips();$('#modal').close();toast(result.message);});}
function track(id){activeTrip=id;const b=state.bookings.find(b=>b.id===id),r=state.rides.find(r=>r.id===b.ride_id);const contact=state.profile.contact;openModal(`<div class="modal-top"><p class="eyebrow">SIMULATED LIVE TRACKING</p><h2>${b.status==='completed'?'You’ve arrived.':'You’re on your way.'}</h2><p>${esc(name(b.origin))} → ${esc(name(b.destination))} · with ${esc(r.name)}</p></div>${mapSvg(r,b.origin,b.destination,b.progress)}<div class="progress-track"><div style="width:${b.progress}%"></div></div><p class="track-contact">${b.progress}% complete · Demo location, no GPS collected.<br>${contact?'Trusted contact: '+esc(contact)+' '+esc(state.profile.phone):'Add a trusted contact in Safety & profile.'}</p><div class="modal-actions">${b.status==='completed'?`<button class="primary" id="track-rate">Rate this ride ★</button>`:'<button class="danger" id="sos">Test SOS</button><button class="secondary" id="share-status">Copy trip status</button><button class="primary" id="advance">Advance demo ↗</button>'}</div><p class="help">Tracking advances manually for presentations. SOS only records a local event; it does not contact emergency services.</p>`);
  $('#advance')?.addEventListener('click',()=>action(async()=>{await api('booking',{id,action:'progress'});await refresh();renderTrips();track(id);}));
  $('#sos')?.addEventListener('click',()=>action(async()=>{const result=await api('sos',{id});toast(result.message);}));
  $('#share-status')?.addEventListener('click',()=>action(async()=>{const text=`Routekind DEMO trip: ${name(b.origin)} → ${name(b.destination)}, ${niceDate(b.date)} ${b.pickup}. Driver: ${r.name}. Simulated progress: ${b.progress}%. This is a static status, not a live tracking link.`;try{await navigator.clipboard.writeText(text);toast('Demo trip status copied. Share it with your trusted contact yourself.');}catch{openModal(`<div class="modal-top"><h2>Your demo trip status</h2></div><p>${esc(text)}</p><p class="help">Copy this text to share it yourself.</p>`);}}));
  $('#track-rate')?.addEventListener('click',()=>ratingDialog(id));
}
function ratingDialog(id){openModal('<div class="modal-top"><p class="eyebrow">GOOD COMMUTES START WITH FEEDBACK</p><h2>How was your ride?</h2><p>Choose a star rating. Your feedback updates the driver’s demo rating.</p></div><div class="star-picker">'+[1,2,3,4,5].map(n=>`<button data-stars="${n}" aria-label="Rate ${n} out of 5 stars">${n}★</button>`).join('')+'</div>');document.querySelectorAll('[data-stars]').forEach(button=>button.onclick=()=>action(async()=>{await api('booking',{id,action:'rate',rating:Number(button.dataset.stars)});await refresh();renderTrips();$('#modal').close();toast('Thanks! Your rating has been saved.');}));}
function renderProfile(){const p=state.profile;$('#edit-name').value=p.name;$('#edit-gender').value=p.gender;$('#contact-name').value=p.contact;$('#contact-phone').value=p.phone;$('#verification-status').textContent=p.verified?'Demo verification complete. Your profile shows a simulated verified status.':'Your demo profile has not completed the verification simulation.';$('#verify-button').disabled=p.verified;$('#verify-button').textContent=p.verified?'Demo verified ✓':'Try demo verification';}
$('#profile-form').onsubmit=e=>{e.preventDefault();action(async()=>{const result=await api('profile',{name:$('#edit-name').value,gender:$('#edit-gender').value,contact:$('#contact-name').value,phone:$('#contact-phone').value});await refresh();renderProfile();await search();toast(result.message);});};
$('#verify-button').onclick=()=>action(async()=>{const result=await api('verify',{});await refresh();renderProfile();toast(result.message);});
$('#offer-form').onsubmit=e=>{e.preventDefault();action(async()=>{const result=await api('offer',{origin:$('#offer-origin').value,destination:$('#offer-destination').value,departure:$('#offer-time').value,seats:Number($('#offer-seats').value),rate:Number($('#offer-rate').value),car:$('#offer-car').value,days:chosenDays('#offer-days'),women_only:$('#offer-women').checked});await refresh();renderOffers();toast(result.message);});};
function renderOffers(){const offers=state.rides.filter(r=>r.driver_id==='you');$('#offered-list').innerHTML=offers.length?offers.map(r=>`<article class="trip-card"><div><span class="tag">${r.verified?'Demo verified':'Unverified'}</span>${r.women_only?'<span class="tag women">Women only</span>':''}<h3>${esc(name(r.origin))} → ${esc(name(r.destination))}</h3><p>${r.departure} · ${r.days.map(d=>days[d]).join(', ')} · ${r.seats} passenger seats · ${esc(r.car)}</p></div><strong>${money(r.rate)}<small> / vehicle km</small></strong></article>`).join(''):'<p class="help">You haven’t offered a ride yet.</p>';}
async function init(){await refresh();['#origin','#destination','#offer-origin','#offer-destination'].forEach(id=>$(id).innerHTML=options());$('#origin').value=$('#offer-origin').value='indiranagar';$('#destination').value=$('#offer-destination').value='ecospace';if(browserMode){document.querySelectorAll('.help,.notice').forEach(el=>{el.textContent=el.textContent.replace('Stored only in your local database. No messages are sent.','Demo contact saved in this browser and sent to the server to process actions. Use sample details only. No messages are sent.').replace('Published rides are saved locally. This is a single-user demo; other commuters cannot access them.','Published rides are saved in this browser’s private demo. Other visitors cannot access them.');});$('.demo-note').textContent='Online demo · Changes saved in this browser only; sent to the server to process actions. Use sample details. No real bookings, payments, identity checks or GPS.';}$('#date').value=state.today;$('#date').min=state.today;dayPicker('#offer-days');renderProfile();await search();}
action(init);

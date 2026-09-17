// ========== LINE 1-17 : initHeader ==========
function initHeader(){
  const toggle=document.getElementById('menuToggle');
  const nav=document.getElementById('headerNav');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',open);
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');
    }));
  }
  const header=document.getElementById('siteHeader');
  if(header){
    let ticking=false;
    window.addEventListener('scroll',()=>{
      if(ticking) return; ticking=true;
      requestAnimationFrame(()=>{header.classList.toggle('scrolled',window.scrollY>8);ticking=false});
    },{passive:true});
  }
}

// ========== LINE 20-28 : initReveal ==========
function initReveal(){
  const els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(el=>el.classList.add('is-visible'));return}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}});
  },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>io.observe(el));
}

// ========== LINE 30-68 : renderTodaySummary ==========
function renderTodaySummary(){
  const el=document.getElementById('todaySummary'); if(!el) return;
  const now=new Date();
  const todayKey=DAY_KEYS[now.getDay()];
  const todayClasses=SCHEDULE[todayKey]||[];
  const tanggal=now.getDate()+' '+MONTH_NAMES[now.getMonth()]+' '+now.getFullYear();
  const info=findNextClass();
  let html=`<div class="today-header">
    <div class="today-date"><span class="day-name">${DAY_NAMES[todayKey]||todayKey.toUpperCase()}</span><span class="full-date">${tanggal}</span></div>
    <div class="today-class-count">${ICONS.cal} ${todayClasses.length} Kelas</div>
  </div>`;
  if(info){
    const r=getTimeRange(info.cls.jamKe);
    const ongoing=info.ongoing;
    const label=ongoing?'SEDANG BERLANGSUNG':(info.dayOffset===0?'SELANJUTNYA':'KELAS BERIKUTNYA');
    const cls=ongoing?'st-ongoing':(info.dayOffset===0?'st-upcoming':'st-free');
    const statusText=ongoing?'Sedang berlangsung':(info.dayOffset===0?'Segera dimulai':'Di luar hari ini');
    const cd=formatCountdown(info);
    html+=`<div class="today-next"><div class="today-next-icon">${ICONS.arrowR}</div>
      <div class="today-next-info">
        <div class="today-next-label">${label}</div>
        <div class="today-next-course">${info.cls.nama}</div>
        <div class="today-next-time">${r.start}–${r.end} • ${info.cls.ruang} • ${info.cls.dosen}</div>
        <span class="today-next-status ${cls}"><span class="dot"></span>${statusText}</span>
        ${cd&&!ongoing?`<div class="today-next-countdown"><span>Kelas berikutnya dalam</span><span class="cd-value" id="cdValue">${cd}</span></div>`:''}
      </div></div>`;
  } else {
    html+=`<div class="today-next"><div class="today-next-icon">${ICONS.calOff}</div>
      <div class="today-next-info"><div class="today-next-label">STATUS</div>
      <div class="today-next-course">Tidak ada kelas minggu ini</div>
      <div class="today-next-time">Selamat beristirahat</div></div></div>`;
  }
  el.innerHTML=html;
}

// ========== LINE 70-79 : updateCountdown ==========
function updateCountdown(){
  const el=document.getElementById('cdValue'); if(!el) return;
  const cd=formatCountdown(findNextClass());
  if(cd&&el.textContent!==cd){
    el.textContent=cd;
    el.classList.remove('cd-pop');void el.offsetWidth;el.classList.add('cd-pop');
    setTimeout(()=>el.classList.remove('cd-pop'),520);
  }
}

// ========== LINE 81-110 : renderSchedule ==========
let currentDayKey='senin';
function renderSchedule(dayKey){
  currentDayKey=dayKey;
  const el=document.getElementById('scheduleContent'); if(!el) return;
  const classes=SCHEDULE[dayKey]||[];
  if(classes.length===0){
    el.innerHTML=`<div class="schedule-card" style="display:block;text-align:center;padding:48px 24px;color:var(--ts)"><h3 style="color:var(--tp);margin-bottom:8px">Tidak ada jadwal kuliah</h3><p style="font-size:14px">Gunakan waktu untuk belajar mandiri atau istirahat.</p></div>`;
    return;
  }
  const now=new Date();
  const isToday=dayKey===DAY_KEYS[now.getDay()];
  const nowMin=now.getHours()*60+now.getMinutes();
  el.innerHTML=classes.map(c=>{
    const r=getTimeRange(c.jamKe);
    const ongoing=isToday&&nowMin>=timeToMinutes(r.start)&&nowMin<timeToMinutes(r.end);
    return `<div class="schedule-card${ongoing?' is-current':''}">
      <div class="card-time"><span class="card-time-value">${r.start}–${r.end}</span><span class="card-time-jam">Jam ke-${c.jamKe}</span></div>
      <div class="card-main">
        <div class="card-course">${c.nama}</div>
        <div class="card-code">${c.kode} • ${c.sks} SKS</div>
        <div class="card-meta">
          <div class="card-meta-item">${ICONS.mapPin}<span>Ruang: <strong>${c.ruang}</strong></span></div>
          <div class="card-meta-item">${ICONS.user}<span>${c.dosen}</span></div>
        </div>
      </div>
      <div class="card-side"><div class="card-kelas-badge">${c.kelas}</div></div>
    </div>`;
  }).join('');
}

// ========== LINE 112-122 : updateCurrentClassHighlight ==========
function updateCurrentClassHighlight(){
  const todayKey=DAY_KEYS[new Date().getDay()];
  if(currentDayKey!==todayKey){document.querySelectorAll('.schedule-card.is-current').forEach(el=>el.classList.remove('is-current'));return}
  const nowMin=new Date().getHours()*60+new Date().getMinutes();
  document.querySelectorAll('#scheduleContent .schedule-card').forEach((card,i)=>{
    const c=(SCHEDULE[currentDayKey]||[])[i]; if(!c) return;
    const r=getTimeRange(c.jamKe);
    card.classList.toggle('is-current',nowMin>=timeToMinutes(r.start)&&nowMin<timeToMinutes(r.end));
  });
}

// ========== LINE 124-131 : renderWeekOverview ==========
function renderWeekOverview(){
  const el=document.getElementById('weekOverview'); if(!el) return;
  el.innerHTML=['senin','selasa','rabu','kamis','jumat'].map(d=>{
    const count=(SCHEDULE[d]||[]).length;
    return `<div class="overview-card ${count===0?'empty':''}"><div class="day">${DAY_NAMES[d]}</div><div class="count">${count}</div><div class="count-label">${count===0?'Tidak ada kelas':'Kelas'}</div></div>`;
  }).join('');
}

// ========== LINE 133-142 : initTabs ==========
function initTabs(){
  document.querySelectorAll('.day-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.day-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});
      tab.classList.add('active');tab.setAttribute('aria-selected','true');
      renderSchedule(tab.dataset.day);
    });
  });
}

// ========== LINE 144-165 : initSilabus ==========
function initSilabus(){
  const sidebar=document.getElementById('silabusSidebar'); if(!sidebar) return;
  if(typeof MATERI==='undefined'){sidebar.innerHTML='<div style="padding:24px;font-size:13px;color:var(--ts);text-align:center">Materi belum tersedia</div>';return;}
  const withSilabus=KRS.filter(c=>MATERI.find(m=>m.kode===c.kode));
  sidebar.innerHTML='<div class="silabus-sidebar-title">Daftar Mata Kuliah</div>'+
    withSilabus.map((c,i)=>`<button class="silabus-item ${i===0?'active':''}" data-kode="${c.kode}">
      <div class="silabus-item-num">${String(i+1).padStart(2,'0')}</div>
      <div class="silabus-item-info"><div class="silabus-item-name">${c.nama}</div><div class="silabus-item-code">${c.kode} • ${c.sks} SKS</div></div>
    </button>`).join('');
  sidebar.querySelectorAll('.silabus-item').forEach(btn=>{
    btn.addEventListener('click',()=>{
      sidebar.querySelectorAll('.silabus-item').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderSilabusMain(btn.dataset.kode);
    });
  });
  if(withSilabus.length) renderSilabusMain(withSilabus[0].kode);
}

// ========== LINE 167-192 : renderSilabusMain ==========
function renderSilabusMain(kode){
  const container=document.getElementById('silabusMain'); if(!container) return;
  if(typeof MATERI==='undefined') return;
  const materi=MATERI.find(m=>m.kode===kode);
  if(!materi){
    container.innerHTML='<div class="silabus-header"><h3>Belum tersedia</h3></div>';
    return;
  }
  const slugs={'TIF3221308':'logika','TIF3221104':'praktikum','TIF3221305':'kalkulus','TIF3221206':'kepemimpinan','TIF3221307':'pemvis','TIF1221202':'eap','TIF3221303':'algoritma','TIF1221201':'agama'};
  const slug=slugs[materi.kode]||materi.kode.toLowerCase();
  const rows=materi.pertemuan.map(p=>`
    <div class="silabus-row">
      <div class="silabus-row-head">
        <span class="num">${p.no}</span>
        <div class="content"><div class="materi-title">${p.judul}</div><div class="materi-desc">${p.desc||''}</div></div>
      </div>
    </div>`).join('');
  container.innerHTML=`
    <div class="silabus-header">
      <h3>${materi.nama}</h3>
      <div class="silabus-header-code">${materi.kode} • ${materi.sks} SKS • Kelas ${materi.kelas}</div>
    </div>
    <div class="silabus-body">
      <div class="silabus-table">${rows}</div>
      <div style="margin-top:16px;text-align:center"><a href="materi-${slug}.html" class="btn">${ICONS.bookOpen} Buka Materi Lengkap</a></div>
    </div>`;
}

// ========== LINE 194-234 : renderCourseList ==========
function renderCourseList(){
  const container=document.getElementById('courseList'); if(!container) return;
  container.innerHTML=KRS.map(c=>{
    const badge=c.nonSched?'<span class="tag-wajib">Non-Jadwal</span>':'';
    return `<div class="course-acc">
      <button class="course-acc-header" aria-expanded="false">
        <div class="course-acc-info">
          <div class="course-acc-name">${c.nama} ${badge}</div>
          <div class="course-acc-code">${c.kode} • ${c.sks} SKS</div>
          <div class="course-acc-meta">
            <span>${ICONS.cal} ${c.jadwal}</span>
            ${!c.nonSched?`<span>${ICONS.mapPin} ${c.ruang}</span>`:''}
          </div>
        </div>
        <div class="course-acc-right"><div class="course-acc-badge">${c.kelas}</div><div class="course-acc-chevron">${ICONS.chev}</div></div>
      </button>
      <div class="course-acc-body"><div class="course-acc-inner">
        <div class="acc-block"><h5>Dosen Pengampu</h5><p>${c.dosen}</p></div>
        <div class="acc-block"><h5>Pengembang RPS</h5><div class="acc-rps-note"><strong>${c.pengembangRPS}</strong></div></div>
        <div class="acc-block"><h5>Tentang</h5><p>${c.deskripsi}</p></div>
        <div class="acc-block"><h5>Capaian</h5><ul>${c.capaian.map(x=>`<li>${x}</li>`).join('')}</ul></div>
        <div class="acc-block"><h5>Referensi</h5><div class="acc-ref">${c.referensi.map(r=>`<div class="acc-ref-item"><span class="tag">${r.tag}</span><span>${r.text}</span></div>`).join('')}</div></div>
        ${c.bobot?`<div class="acc-block"><h5>Bobot</h5><div class="acc-tip">${c.bobot}</div></div>`:''}
        <div class="acc-block"><h5>Tips</h5><div class="acc-tip">${c.tips}</div></div>
      </div></div>
    </div>`;
  }).join('');
  container.querySelectorAll('.course-acc-header').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const parent=btn.closest('.course-acc');
      const isOpen=parent.classList.contains('open');
      container.querySelectorAll('.course-acc').forEach(a=>{a.classList.remove('open');a.querySelector('.course-acc-header').setAttribute('aria-expanded','false')});
      if(!isOpen){parent.classList.add('open');btn.setAttribute('aria-expanded','true')}
    });
  });
}

// ========== LINE 236-268 : renderPetaStudi ==========
function renderPetaStudi(){
  const tabs=document.getElementById('semesterTabs'); if(!tabs) return;
  const content=document.getElementById('semesterContent');
  tabs.innerHTML='';
  for(let i=1;i<=8;i++) tabs.innerHTML+=`<button class="sem-tab ${i===1?'active':''}" data-sem="${i}">Semester ${i}</button>`;
  content.innerHTML='';
  for(let i=1;i<=8;i++){
    const d=KURIKULUM[i];
    content.innerHTML+=`<div class="sem-content ${i===1?'active':''}" data-sem="${i}">
      <div class="sem-info">${ICONS.cal} <strong>Total: ${d.total}</strong></div>
      <div class="sem-list">${d.items.map(item=>{
        if(item.kode==='—') return `<div class="sem-item" style="background:var(--bg);border:none;padding:8px 16px"><span class="name" style="font-weight:700;color:var(--navy);font-size:12px;letter-spacing:.05em;text-transform:uppercase">${item.nama}</span></div>`;
        const cls=item.highlight?'highlight':(item.consent?'consent':'');
        return `<div class="sem-item ${cls}"><span class="code">${item.kode}</span><span class="name">${item.nama}</span><span class="sks-badge">${item.sks} SKS</span></div>`;
      }).join('')}</div>
    </div>`;
  }
  tabs.querySelectorAll('.sem-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      tabs.querySelectorAll('.sem-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      content.querySelectorAll('.sem-content').forEach(c=>c.classList.remove('active'));
      content.querySelector(`.sem-content[data-sem="${tab.dataset.sem}"]`).classList.add('active');
    });
  });
}

// ========== LINE 270-291 : initTodos ==========
function initTodos(){
  const input=document.getElementById('todoInput'); if(!input) return;
  const KEY='ums_dafina_todo_v4';
  let todos=storage(KEY,[]);
  const render=()=>{
    const list=document.getElementById('todoList');
    if(!todos.length){list.innerHTML='<div class="todo-empty">Belum ada tugas. Tambahkan yang pertama!</div>';return}
    list.innerHTML=todos.map((t,i)=>`<li class="todo-item ${t.done?'done':''}"><input type="checkbox" ${t.done?'checked':''} data-i="${i}"><label>${esc(t.text)}</label><button class="todo-del" data-i="${i}">${ICONS.trash}</button></li>`).join('');
    list.querySelectorAll('input[type=checkbox]').forEach(cb=>cb.addEventListener('change',e=>{todos[+e.target.dataset.i].done=e.target.checked;saveStorage(KEY,todos);render()}));
    list.querySelectorAll('.todo-del').forEach(b=>b.addEventListener('click',e=>{todos.splice(+e.currentTarget.dataset.i,1);saveStorage(KEY,todos);render()}));
  };
  document.getElementById('todoAdd').addEventListener('click',()=>{
    const v=input.value.trim(); if(!v) return;
    todos.push({text:v,done:false}); input.value=''; saveStorage(KEY,todos); render();
  });
  input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();document.getElementById('todoAdd').click()}});
  render();
}

// ========== LINE 293-322 : initPomodoro ==========
function initPomodoro(){
  const display=document.getElementById('pomoDisplay'); if(!display) return;
  let interval=null, remaining=25*60, running=false;
  const label=document.getElementById('pomoLabel'), start=document.getElementById('pomoStart');
  const upd=()=>{display.textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0')};
  document.querySelectorAll('.pomo-mode-btn').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.pomo-mode-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    remaining=+btn.dataset.min*60; upd();
    label.textContent={focus:'Waktu Fokus',short:'Istirahat Pendek',long:'Istirahat Panjang'}[btn.dataset.mode];
    if(running){clearInterval(interval);running=false;start.textContent='Mulai'}
  }));
  start.addEventListener('click',()=>{
    if(running){clearInterval(interval);running=false;start.textContent='Lanjut'}
    else{running=true;start.textContent='Jeda';
      interval=setInterval(()=>{
        remaining--;upd();
        if(remaining<=0){clearInterval(interval);running=false;start.textContent='Mulai';
          try{const ctx=new (window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator();o.frequency.value=800;o.connect(ctx.destination);o.start();setTimeout(()=>o.stop(),300)}catch(e){}}
      },1000)}
  });
  document.getElementById('pomoReset').addEventListener('click',()=>{
    clearInterval(interval);running=false;start.textContent='Mulai';
    remaining=+document.querySelector('.pomo-mode-btn.active').dataset.min*60;upd();
  });
  upd();
}

// ========== LINE 324-355 : initIPK ==========
function initIPK(){
  const container=document.getElementById('ipkCourses'); if(!container) return;
  const KEY='ums_dafina_ipk_v4';
  const grades=['','A','AB','A-','B+','B','BC','B-','C+','C','D','E'];
  const map={A:4,AB:3.5,'A-':3.7,'B+':3.3,B:3,BC:2.5,'B-':2.7,'C+':2.3,C:2,D:1,E:0};
  let data=storage(KEY,{});
  const gradeable=KRS.filter(c=>c.sks>0);
  container.innerHTML=gradeable.map(c=>`<div class="ipk-row"><div class="ipk-name">${c.nama} <span style="color:#98A2B3">(${c.sks} SKS)</span></div><select data-key="${c.kode}">${grades.map(g=>`<option value="${g}" ${data[c.kode]===g?'selected':''}>${g||'—'}</option>`).join('')}</select></div>`).join('');
  const compute=()=>{
    let sks=0,poin=0;
    gradeable.forEach(c=>{const g=data[c.kode];if(g&&map[g]!==undefined){sks+=c.sks;poin+=c.sks*map[g]}});
    document.getElementById('ipkTotalSKS').textContent=sks;
    document.getElementById('ipkValue').textContent=(sks>0?poin/sks:0).toFixed(2);
  };
  container.querySelectorAll('select').forEach(sel=>sel.addEventListener('change',e=>{
    const k=e.target.dataset.key;
    if(e.target.value) data[k]=e.target.value; else delete data[k];
    saveStorage(KEY,data); compute();
  }));
  compute();
}

// ========== LINE 357-368 : initNotes ==========
function initNotes(){
  const ta=document.getElementById('notesArea'); if(!ta) return;
  const KEY='ums_dafina_notes_v4';
  ta.value=storage(KEY,'');
  const st=document.getElementById('notesStatus');
  let timer;
  ta.addEventListener('input',()=>{
    st.textContent='Mengetik...';clearTimeout(timer);
    timer=setTimeout(()=>{saveStorage(KEY,ta.value);st.textContent='Tersimpan '+new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})},500);
  });
}

// ========== LINE 370-402 : initICSExport ==========
function initICSExport(){
  const btn=document.getElementById('exportICS'); if(!btn) return;
  btn.addEventListener('click',()=>{
    const dayMap={senin:0,selasa:1,rabu:2,kamis:3,jumat:4};
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Jadwal Kuliah UMS//ID','CALSCALE:GREGORIAN','METHOD:PUBLISH'];
    const base=new Date(2026,8,14);
    Object.keys(SCHEDULE).forEach(dk=>{
      const di=dayMap[dk];
      (SCHEDULE[dk]||[]).forEach(c=>{
        const r=getTimeRange(c.jamKe);
        const [sh,sm]=r.start.split('.').map(Number);
        const [eh,em]=r.end.split('.').map(Number);
        const date=new Date(base);date.setDate(base.getDate()+di);
        const ds=`${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}T${String(sh).padStart(2,'0')}${String(sm).padStart(2,'0')}00`;
        const de=`${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}T${String(eh).padStart(2,'0')}${String(em).padStart(2,'0')}00`;
        lines.push('BEGIN:VEVENT',`UID:${c.kode}-${dk}@jadwal`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').split('.')[0]}Z`,`DTSTART;TZID=Asia/Jakarta:${ds}`,`DTEND;TZID=Asia/Jakarta:${de}`,'RRULE:FREQ=WEEKLY;COUNT=16',`SUMMARY:${c.nama}`,`LOCATION:${c.ruang}`,`DESCRIPTION:Kode: ${c.kode}\\nDosen: ${c.dosen}\\nKelas: ${c.kelas}`,'END:VEVENT');
      });
    });
    lines.push('END:VCALENDAR');
    const blob=new Blob([lines.join('\r\n')],{type:'text/calendar;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='jadwal-kuliah-ums-dafina.ics';a.click();
    URL.revokeObjectURL(url);
  });
}

// ========== LINE 404-419 : initDashboard ==========
function initDashboard(){
  renderTodaySummary();
  renderSchedule('senin');
  renderWeekOverview();
  initSilabus();
  renderCourseList();
  renderPetaStudi();
  initTodos();
  initPomodoro();
  initIPK();
  initNotes();
  initICSExport();
  initTabs();
  setInterval(updateCountdown,15000);
  setInterval(updateCurrentClassHighlight,20000);
  setInterval(renderTodaySummary,180000);
}

// ========== LINE 421-448 : initMateriPortal ==========
function initMateriPortal(){
  const grid=document.getElementById('materiGrid'); if(!grid) return;
  if(typeof MATERI==='undefined'){grid.innerHTML='<p style="text-align:center;padding:48px;color:var(--ts)">Materi belum tersedia</p>';return}
  const KEY='ums_dafina_materi_v4';
  const progress=storage(KEY,{});
  const slugs={'TIF3221308':'logika','TIF3221104':'praktikum','TIF3221305':'kalkulus','TIF3221206':'kepemimpinan','TIF3221307':'pemvis','TIF1221202':'eap','TIF3221303':'algoritma','TIF1221201':'agama'};
  grid.innerHTML=MATERI.map((m,i)=>{
    const prog=progress[m.kode]||{};
    const done=m.pertemuan.filter(p=>prog[p.no]).length;
    const total=m.pertemuan.length;
    const pct=total>0?Math.round(done/total*100):0;
    const slug=slugs[m.kode]||m.kode.toLowerCase();
    return `<a href="materi-${slug}.html" class="materi-card" style="animation-delay:${i*60}ms">
      <div class="materi-card-icon">${String(i+1).padStart(2,'0')}</div>
      <div class="materi-card-body">
        <div class="materi-card-code">${m.kode}</div>
        <div class="materi-card-title">${m.nama}</div>
        <div class="materi-card-meta">
          <span>${ICONS.user} ${m.dosen.split(',')[0]}</span>
          <span>${ICONS.bookOpen} ${total} pertemuan</span>
        </div>
      </div>
      <div class="materi-card-progress">
        <div class="materi-card-progress-bar"><div class="materi-card-progress-fill" style="width:${pct}%"></div></div>
        <div class="materi-card-progress-text">${done}/${total}</div>
      </div>
      <div class="materi-card-cta">Buka materi ${ICONS.arrowR}</div>
    </a>`;
  }).join('');
}

// ============================================================
// 🆕 LINE 450-585 : initMateriDetail (YANG BARU - MANUAL TOGGLE)
// Ganti seluruh fungsi ini. Tidak ada auto-check lagi.
// ============================================================
function initMateriDetail(kode){
  if(typeof MATERI==='undefined'){document.querySelector('main').innerHTML='<div style="padding:48px;text-align:center"><p>Materi belum tersedia.</p><p style="margin-top:16px"><a href="materi.html" class="btn">Kembali</a></p></div>';return}
  const course=MATERI.find(m=>m.kode===kode);
  if(!course){
    document.querySelector('main').innerHTML='<div style="padding:48px;text-align:center"><p>Mata kuliah tidak ditemukan.</p><p style="margin-top:16px"><a href="materi.html" class="btn">Kembali ke daftar materi</a></p></div>';
    return;
  }
  const KEY='ums_dafina_materi_v4';
  const progress=storage(KEY,{});

  const title=document.getElementById('courseTitle'); if(title) title.textContent=course.nama;
  const meta=document.getElementById('courseMeta');
  if(meta) meta.innerHTML=`<span>${ICONS.user} ${course.dosen}</span><span>${ICONS.cal} ${course.sks} SKS • Kelas ${course.kelas}</span>`;
  document.title=`${course.nama} — Materi Kuliah`;

  // Banner rutin (ETP, dsb)
  if(course.rutin){
    const intro=document.querySelector('.page-intro');
    if(intro && !document.getElementById('rutinBanner')){
      intro.insertAdjacentHTML('beforeend', `
        <div class="rutin-banner" id="rutinBanner">
          <span class="rutin-badge">
            <span class="dot"></span>
            ${ICONS.clock} Program Rutin · Mingguan
          </span>
          <h3>${course.rutin.judul}</h3>
          <p class="rutin-sub">${course.rutin.detail}</p>
          <div class="rutin-meta">
            <div class="rutin-meta-item">${ICONS.cal}<span><strong>Jadwal:</strong> ${course.rutin.jadwal}</span></div>
            <div class="rutin-meta-item">${ICONS.clock}<span><strong>Mulai:</strong> ${course.rutin.mulai}</span></div>
            <div class="rutin-meta-item">${ICONS.user}<span><strong>Tutor:</strong> ${course.rutin.tutor}</span></div>
            <div class="rutin-meta-item">${ICONS.bookOpen}<span><strong>Dinilai:</strong> ${course.rutin.penilaian} (${course.rutin.bobot})</span></div>
          </div>
        </div>
      `);
    }
  }

  const nav=document.getElementById('materiNav');

  // 🆕 Render sidebar dengan toggle manual
  const renderSidebar=()=>{
    const prog=progress[course.kode]||{};
    nav.innerHTML='<div class="materi-nav-title">Daftar Pertemuan</div>'+
      course.pertemuan.map(p=>{
        const done=!!prog[p.no];
        return `
        <button class="pertemuan-item${done?' is-done':''}" data-no="${p.no}">
          <div class="pertemuan-item-num">${p.no}</div>
          <div class="pertemuan-item-body"><div class="pertemuan-item-title">${p.judul}</div></div>
          <span class="pertemuan-item-check${done?' checked':''}"
                data-toggle="${p.no}"
                role="checkbox"
                aria-checked="${done}"
                aria-label="Tandai pertemuan ${p.no} selesai"
                title="Klik untuk tandai selesai/batal">${done?'✓':''}</span>
        </button>`;
      }).join('');

    // Klik item → navigasi (kecuali klik centang)
    nav.querySelectorAll('.pertemuan-item').forEach(btn=>{
      btn.addEventListener('click',(e)=>{
        if(e.target.closest('.pertemuan-item-check')) return;
        location.hash='pertemuan-'+btn.dataset.no;
      });
    });

    // 🆕 Klik centang → toggle manual
    nav.querySelectorAll('.pertemuan-item-check').forEach(chk=>{
      chk.addEventListener('click',(e)=>{
        e.stopPropagation();
        const no=+chk.dataset.toggle;
        if(!progress[course.kode]) progress[course.kode]={};
        progress[course.kode][no]=!progress[course.kode][no];
        saveStorage(KEY,progress);
        const isDone=!!progress[course.kode][no];
        chk.classList.toggle('checked',isDone);
        chk.textContent=isDone?'✓':'';
        chk.setAttribute('aria-checked',isDone);
        chk.closest('.pertemuan-item').classList.toggle('is-done',isDone);
      });
    });
  };
  renderSidebar();

  // 🆕 Load konten pertemuan — TANPA auto-mark
  const loadPertemuan=(no)=>{
    const p=course.pertemuan.find(x=>x.no===no);
    if(!p){location.hash='pertemuan-'+course.pertemuan[0].no;return}

    nav.querySelectorAll('.pertemuan-item').forEach(el=>el.classList.toggle('active',+el.dataset.no===no));

    const main=document.getElementById('pertemuanContent');
    const prev=course.pertemuan.find(x=>x.no===no-1);
    const next=course.pertemuan.find(x=>x.no===no+1);
    const hasDetail=!!p.detail;

    main.innerHTML=`
      <div class="pertemuan-header">
        <span class="pertemuan-num">Pertemuan ${p.no}</span>
        <h1>${p.judul}</h1>
        <p class="pertemuan-desc">${p.desc||''}</p>
      </div>
      ${hasDetail?`<div class="pertemuan-body">${p.detail}</div>`:`
        <div class="pertemuan-body">
          <div class="empty-content">
            <p style="font-size:16px;color:var(--tp);font-weight:600;margin-bottom:8px">Materi lengkap belum diunggah</p>
            <p>Untuk sementara, baca materi ini langsung dari PDF asli di Google Drive.</p>
            <a href="${course.link}" target="_blank" rel="noopener" class="btn" style="margin-top:16px;display:inline-flex">${ICONS.extLink} Buka PDF di Drive</a>
          </div>
        </div>
      `}
      <div class="pertemuan-nav">
        <a class="pertemuan-nav-btn" href="${prev?'#pertemuan-'+prev.no:'#'}" ${!prev?'style="opacity:.4;pointer-events:none"':''}>
          ${ICONS.arrowL}<span><span class="label">Sebelumnya</span>${prev?'Pertemuan '+prev.no:'—'}</span>
        </a>
        <a class="pertemuan-nav-btn next" href="${next?'#pertemuan-'+next.no:'#'}" ${!next?'style="opacity:.4;pointer-events:none"':''}>
          <span><span class="label">Selanjutnya</span>${next?'Pertemuan '+next.no:'—'}</span>${ICONS.arrowR}
        </a>
      </div>`;
    window.scrollTo({top:0,behavior:'smooth'});
  };

  const handleHash=()=>{
    const h=location.hash.replace('#pertemuan-','');
    const no=parseInt(h)||course.pertemuan[0].no;
    loadPertemuan(no);
  };
  window.addEventListener('hashchange',handleHash);
  handleHash();

  const dl=document.getElementById('downloadPdf');
  if(dl) dl.href=course.link.replace('/view?usp=drivesdk','/export?format=pdf');
  const openBtn=document.getElementById('openDrive');
  if(openBtn) openBtn.href=course.link;
}

// ========== LINE 587-594 : INIT ==========
document.addEventListener('DOMContentLoaded',()=>{
  initHeader();
  initReveal();
  const page=document.body.dataset.page;
  if(page==='dashboard') initDashboard();
  else if(page==='materi-portal') initMateriPortal();
  else if(page==='materi-detail') initMateriDetail(document.body.dataset.mk);
});

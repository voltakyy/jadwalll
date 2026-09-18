// ============================================================
// POP-UP CATATAN — Firebase Firestore
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getFirestore, collection, query, where, getDocs,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBADLc9rU3jyz3Hie1XdkzjS5bpJbcgAEw",
  authDomain: "jadwal-kuliah-dafina.firebaseapp.com",
  projectId: "jadwal-kuliah-dafina",
  storageBucket: "jadwal-kuliah-dafina.firebasestorage.app",
  messagingSenderId: "495607918068",
  appId: "1:495607918068:web:344c2b5160cca4a0b7dda1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COL = 'popup_catatan';

const state = { kode:null, container:null, data:[], loading:false, ready:false };

function escHtml(s){
  return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function fmtTime(ts){
  if(!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const now = new Date();
  const diff = Math.floor((now-d)/1000);
  if(diff<60) return 'baru saja';
  if(diff<3600) return Math.floor(diff/60)+' menit lalu';
  if(diff<86400) return Math.floor(diff/3600)+' jam lalu';
  if(diff<604800) return Math.floor(diff/86400)+' hari lalu';
  return d.toLocaleDateString('id-ID',{day:'numeric',month:'short'});
}
function previewText(txt){
  if(!txt) return '';
  return String(txt).replace(/\s+/g,' ').trim();
}

// ============ RENDER ============
function renderSection(){
  const c = state.container;
  if(!c) return;

  if(state.loading){
    c.innerHTML = `
      <div class="popup-header"><h4>📌 Pop-up Catatan</h4></div>
      <div class="popup-loading">Memuat catatan...</div>`;
    return;
  }

  const pinned = state.data.filter(x=>x.pinned);
  const others = state.data.filter(x=>!x.pinned);
  const list = [...pinned, ...others];

  let grid = '';
  if(list.length){
    grid = `<div class="popup-grid">${list.map(cardHTML).join('')}</div>`;
  } else {
    grid = `<div class="popup-empty">Belum ada pop-up catatan.<br>Klik <strong>+ Tambah</strong> untuk mulai menulis.</div>`;
  }

  c.innerHTML = `
    <div class="popup-header">
      <h4>📌 Pop-up Catatan <span class="popup-count">${state.data.length}</span></h4>
      <button type="button" class="popup-add-btn" data-action="add">+ Tambah</button>
    </div>
    ${grid}`;

  c.querySelectorAll('[data-action="add"]').forEach(b=>b.addEventListener('click', ()=>openEditModal(null)));

  c.querySelectorAll('.popup-card').forEach(card=>{
    const id = card.dataset.id;
    const item = state.data.find(x=>x.id===id);
    if(!item) return;
    card.querySelector('[data-action="read"]').addEventListener('click', ()=>openReadModal(item));
    card.querySelector('[data-action="menu"]').addEventListener('click', (e)=>{
      e.stopPropagation();
      const menu = card.querySelector('[data-menu]');
      const wasOpen = menu.classList.contains('open');
      closeAllMenus();
      if(!wasOpen) menu.classList.add('open');
    });
    card.querySelectorAll('[data-menu] button').forEach(btn=>{
      btn.addEventListener('click', async (e)=>{
        e.stopPropagation();
        closeAllMenus();
        const act = btn.dataset.action;
        if(act==='pin') await togglePin(item);
        else if(act==='edit') openEditModal(item);
        else if(act==='dup') await duplicateItem(item);
        else if(act==='del') openDeleteModal(item);
      });
    });
  });
}

function cardHTML(item){
  const preview = previewText(item.konten);
  return `
    <div class="popup-card${item.pinned?' pinned':''}" data-id="${item.id}">
      <div class="popup-card-head">
        <h5 class="popup-card-title">${escHtml(item.judul)}</h5>
        <button type="button" class="popup-menu-btn" data-action="menu" aria-label="Menu">⋯</button>
      </div>
      <div class="popup-card-preview">${escHtml(preview)}</div>
      <div class="popup-card-footer">
        <button type="button" class="popup-readmore" data-action="read">Read more →</button>
        <span class="popup-card-time">${fmtTime(item.updated_at||item.created_at)}</span>
      </div>
      <div class="popup-menu" data-menu>
        <button type="button" data-action="pin">${item.pinned?'📍 Lepas semat':'📌 Sematkan'}</button>
        <button type="button" data-action="edit">✏️ Edit</button>
        <button type="button" data-action="dup">📋 Duplikat</button>
        <button type="button" data-action="del" class="danger">🗑️ Hapus</button>
      </div>
    </div>`;
}

function closeAllMenus(){
  document.querySelectorAll('.popup-menu.open').forEach(m=>m.classList.remove('open'));
}

// ============ MODAL ============
function ensureModalRoot(){
  let root = document.getElementById('popupModalRoot');
  if(!root){
    root = document.createElement('div');
    root.id = 'popupModalRoot';
    document.body.appendChild(root);
  }
  return root;
}
function closeModal(){
  const root = ensureModalRoot();
  root.innerHTML = '';
}

function openEditModal(item){
  const isEdit = !!item;
  const root = ensureModalRoot();
  root.innerHTML = `
    <div class="popup-modal open">
      <div class="popup-modal-box">
        <div class="popup-modal-header">
          <h3>${isEdit?'✏️ Edit Pop-up':'✨ Tambah Pop-up Baru'}</h3>
        </div>
        <div class="popup-modal-body">
          <div style="margin-bottom:14px">
            <label style="font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ts);display:block;margin-bottom:6px">Judul</label>
            <input type="text" class="popup-input" id="popupJudul" placeholder="Judul catatan..." maxlength="120" value="${isEdit?escHtml(item.judul):''}">
          </div>
          <div>
            <label style="font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ts);display:block;margin-bottom:6px">Isi Catatan</label>
            <textarea class="popup-textarea" id="popupKonten" placeholder="Tulis isi catatan lengkap di sini...">${isEdit?escHtml(item.konten):''}</textarea>
          </div>
        </div>
        <div class="popup-modal-footer">
          <button type="button" class="popup-btn-cancel" data-close>Batal</button>
          <button type="button" class="popup-btn-save" data-save>${isEdit?'Simpan Perubahan':'Simpan'}</button>
        </div>
      </div>
    </div>`;

  const modal = root.querySelector('.popup-modal');
  const inputJ = root.querySelector('#popupJudul');
  const inputK = root.querySelector('#popupKonten');
  inputJ.focus();

  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  root.querySelector('[data-close]').addEventListener('click', closeModal);
  root.querySelector('[data-save]').addEventListener('click', async ()=>{
    const judul = inputJ.value.trim() || 'Tanpa Judul';
    const konten = inputK.value.trim();
    if(!konten){ inputK.focus(); return; }
    const btn = root.querySelector('[data-save]');
    btn.disabled = true; btn.textContent = 'Menyimpan...';
    try{
      if(isEdit){
        await updateDoc(doc(db, COL, item.id), {
          judul, konten, updated_at: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, COL), {
          matkul_kode: state.kode,
          judul, konten,
          pinned: false,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp()
        });
      }
      closeModal();
      await loadData();
    }catch(err){
      console.error(err);
      alert('Gagal menyimpan: '+err.message);
      btn.disabled = false; btn.textContent = isEdit?'Simpan Perubahan':'Simpan';
    }
  });
}

function openReadModal(item){
  const root = ensureModalRoot();
  root.innerHTML = `
    <div class="popup-modal open">
      <div class="popup-modal-box">
        <div class="popup-modal-header">
          <h3>${escHtml(item.judul)}</h3>
          <p style="font-size:12px;color:var(--ts);margin-top:6px">${fmtTime(item.updated_at||item.created_at)}</p>
        </div>
        <div class="popup-modal-body">
          <div style="font-size:14px;color:var(--tp);line-height:1.75;white-space:pre-wrap">${escHtml(item.konten)}</div>
        </div>
        <div class="popup-modal-footer">
          <button type="button" class="popup-btn-edit" data-edit>✏️ Edit</button>
          <button type="button" class="popup-btn-save" data-close>Tutup</button>
        </div>
      </div>
    </div>`;
  const modal = root.querySelector('.popup-modal');
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  root.querySelector('[data-close]').addEventListener('click', closeModal);
  root.querySelector('[data-edit]').addEventListener('click', ()=>{ closeModal(); openEditModal(item); });
}

function openDeleteModal(item){
  const root = ensureModalRoot();
  root.innerHTML = `
    <div class="popup-modal open">
      <div class="popup-modal-box" style="max-width:420px">
        <div class="popup-modal-header">
          <h3>🗑️ Hapus Pop-up?</h3>
        </div>
        <div class="popup-modal-body">
          <p style="font-size:14px;color:var(--tp);line-height:1.6">Yakin mau hapus <strong>${escHtml(item.judul)}</strong>? Tindakan ini tidak bisa dibatalkan.</p>
        </div>
        <div class="popup-modal-footer">
          <button type="button" class="popup-btn-cancel" data-close>Batal</button>
          <button type="button" class="popup-btn-danger" data-del>Hapus</button>
        </div>
      </div>
    </div>`;
  const modal = root.querySelector('.popup-modal');
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  root.querySelector('[data-close]').addEventListener('click', closeModal);
  root.querySelector('[data-del]').addEventListener('click', async ()=>{
    const btn = root.querySelector('[data-del]');
    btn.disabled = true; btn.textContent = 'Menghapus...';
    try{
      await deleteDoc(doc(db, COL, item.id));
      closeModal();
      await loadData();
    }catch(err){
      console.error(err);
      alert('Gagal menghapus: '+err.message);
      btn.disabled = false; btn.textContent = 'Hapus';
    }
  });
}

// ============ CRUD ============
async function togglePin(item){
  try{
    await updateDoc(doc(db, COL, item.id), { pinned: !item.pinned });
    await loadData();
  }catch(err){ console.error(err); alert('Gagal: '+err.message); }
}
async function duplicateItem(item){
  try{
    await addDoc(collection(db, COL), {
      matkul_kode: item.matkul_kode,
      judul: item.judul + ' (copy)',
      konten: item.konten,
      pinned: false,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    await loadData();
  }catch(err){ console.error(err); alert('Gagal: '+err.message); }
}

async function loadData(){
  state.loading = true;
  renderSection();
  try{
    const q = query(collection(db, COL), where('matkul_kode','==',state.kode));
    const snap = await getDocs(q);
    const items = [];
    snap.forEach(d=>{
      const data = d.data();
      items.push({
        id: d.id,
        matkul_kode: data.matkul_kode,
        judul: data.judul || 'Tanpa Judul',
        konten: data.konten || '',
        pinned: !!data.pinned,
        created_at: data.created_at,
        updated_at: data.updated_at
      });
    });
    // sort client-side: pinned first, then latest update
    items.sort((a,b)=>{
      if(a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      const ta = a.updated_at && a.updated_at.toMillis ? a.updated_at.toMillis() : 0;
      const tb = b.updated_at && b.updated_at.toMillis ? b.updated_at.toMillis() : 0;
      return tb - ta;
    });
    state.data = items;
  }catch(err){
    console.error(err);
    state.data = [];
    state.error = err.message;
  }finally{
    state.loading = false;
    renderSection();
  }
}

// ============ PUBLIC API ============
function initPopupSection(kode, container){
  if(!container) return;
  state.kode = kode;
  state.container = container;
  state.data = [];
  renderSection();
  loadData();
}

window.PopupCatatan = { init: initPopupSection };

// notify listeners
window.dispatchEvent(new Event('popup-ready'));

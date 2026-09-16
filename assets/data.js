const ICONS = {
  clock:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  mapPin:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  cal:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>',
  arrowR:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  arrowL:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>',
  calOff:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="m2 2 20 20"/></svg>',
  extLink:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>',
  chev:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  trash:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  bookOpen:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
};

const SCHEDULE = {
  senin:[{jamKe:"7-9", nama:"Logika dan Himpunan", kode:"TIF3221308", kelas:"C", ruang:"G0301", sks:3, dosen:"Reinal Ariyuda, B.Eng., M.Eng."}],
  selasa:[{jamKe:"9-10", nama:"Praktikum Algoritma dan Pemrograman", kode:"TIF3221104", kelas:"D", ruang:"LABRPL", sks:1, dosen:"Khanun Roisatul Ummah, S.Tr.T., M.Tr.Kom."}],
  rabu:[{jamKe:"5-6", nama:"English for Academic Purpose", kode:"TIF3221202", kelas:"C", ruang:"G0301", sks:2, dosen:"Romadhani Wulandari, S.Pd., M.Pd."}],
  kamis:[{jamKe:"7-9", nama:"Pemrograman Visual", kode:"TIF3221307", kelas:"C", ruang:"G0304", sks:3, dosen:"Faris Atoll Haq, S.Tr.T., M.Kom."}],
  jumat:[
    {jamKe:"1-3", nama:"Algoritma dan Pemrograman", kode:"TIF3221303", kelas:"C", ruang:"G0301", sks:3, dosen:"Muhammad Syahriandi Adhantoro., S.Kom, M.Kom."},
    {jamKe:"5-6", nama:"Kepemimpinan dan Komunikasi Interpersonal", kode:"TIF3221206", kelas:"C", ruang:"G0301", sks:2, dosen:"Maryam, S.Kom., M.Eng."},
    {jamKe:"10-12", nama:"Kalkulus", kode:"TIF3221305", kelas:"C", ruang:"G0301", sks:3, dosen:"Muhammad Syahriandi Adhantoro., S.Kom, M.Kom."}
  ]
};

const KRS = [
  {kode:"TIF3221308", nama:"Logika dan Himpunan", kelas:"C", sks:3, jadwal:"Senin 12.30-15.00", ruang:"G0301", dosen:"Reinal Ariyuda, B.Eng., M.Eng.", pengembangRPS:"Dr.Eng. Yusuf Sulistyo Nugroho, S.T., M.Eng",
    deskripsi:"Mata kuliah dasar logika matematika dan himpunan untuk ilmu komputer.",
    capaian:["Menjelaskan teori informatika","Mengidentifikasi masalah aplikasi","Menjabarkan metode algoritma","Mengidentifikasi metode penyelesaian"],
    referensi:[{tag:"Utama",text:"Soesianto & Dwijono. (2010). Logika Matematika untuk Ilmu Komputer. Andi."}],
    tips:"Kuasai tablo semantik, CNF, dan DNF.", bobot:"UTS 25%, UAS 25%, Tugas 50%"},
  {kode:"TIF3221104", nama:"Praktikum Algoritma dan Pemrograman", kelas:"D", sks:1, jadwal:"Selasa 14.10-16.20", ruang:"LABRPL", dosen:"Khanun Roisatul Ummah, S.Tr.T., M.Tr.Kom.", pengembangRPS:"Dimas Aryo Anggoro, S.Kom., M.Sc.",
    deskripsi:"Praktikum dasar pemrograman menggunakan GvRng (Python).",
    capaian:["Menganalisis dan mendesain solusi proyek","Menganalisis desain siklus pengembangan"],
    referensi:[{tag:"Utama",text:"Thamrin et al. (2019). Algoritma dan Pemrograman. UMS Press"}],
    tips:"Kerjakan proyek akhir dengan serius.", bobot:"Portofolio: 30% + 40% + 30%"},
  {kode:"TIF3221202", nama:"English for Academic Purpose", kelas:"C", sks:2, jadwal:"Rabu 09.50-11.30", ruang:"G0301", dosen:"Romadhani Wulandari, S.Pd., M.Pd.", pengembangRPS:"Tim EAP UMS",
    deskripsi:"Bahasa Inggris akademik untuk membaca literatur, menulis paper, dan presentasi ilmiah.",
    capaian:["Membaca teks akademik","Menulis abstrak & laporan","Presentasi akademik"],
    referensi:[{tag:"Utama",text:"English for Computer Science Students"}],
    tips:"Kuasai bahasa Inggris teknis.", bobot:"Partisipasi, tugas, UTS, UAS"},
  {kode:"TIF3221307", nama:"Pemrograman Visual", kelas:"C", sks:3, jadwal:"Kamis 12.30-15.00", ruang:"G0304", dosen:"Faris Atoll Haq, S.Tr.T., M.Kom.", pengembangRPS:"Maryam, S.Kom., M.Eng.",
    deskripsi:"Pemrograman berbasis obyek menggunakan blok kode visual (Alice & Greenfoot).",
    capaian:["Menganalisis dan mendesain solusi proyek","Menyusun model analisis dan desain"],
    referensi:[{tag:"Utama",text:"Cay Horstmann. (2021). Core Java: Fundamentals."}],
    tips:"Project GAME ALICE 30% - kerjakan serius.", bobot:"Tugas 15% - UTS 15% - Project ALICE 30% - Project Team 20% - UAS 20%"},
  {kode:"TIF3221303", nama:"Algoritma dan Pemrograman", kelas:"C", sks:3, jadwal:"Jumat 06.30-09.00", ruang:"G0301", dosen:"Muhammad Syahriandi Adhantoro., S.Kom, M.Kom.", pengembangRPS:"Husni Thamrin, M.T., Ph.D",
    deskripsi:"Dasar-dasar pemrograman komputer dan analisis algoritma menggunakan Python.",
    capaian:["Menganalisis masalah komputasi","Menerangkan struktur kendali"],
    referensi:[{tag:"Utama",text:"Zarman, Wendi. (2020). Implementasi algoritma dalam bahasa Python."}],
    tips:"Fokus pada proyek akhir.", bobot:"Tugas 40%, UTS 30%, UAS 30%"},
  {kode:"TIF3221206", nama:"Kepemimpinan dan Komunikasi Interpersonal", kelas:"C", sks:2, jadwal:"Jumat 09.50-11.30", ruang:"G0301", dosen:"Maryam, S.Kom., M.Eng.", pengembangRPS:"Nurgiyatna, S.T., M.Sc., Ph.D",
    deskripsi:"Bekal kepemimpinan, manajemen tim, dan komunikasi interpersonal.",
    capaian:["Konsep dasar kepemimpinan","Konsep komunikasi interpersonal"],
    referensi:[{tag:"Utama",text:"RPS Kepemimpinan - Nurgiyatna, UMS"}],
    tips:"Manfaatkan diskusi untuk melatih public speaking.", bobot:"Tiap topik 6-10%, UTS, UAS 10%"},
  {kode:"TIF3221305", nama:"Kalkulus", kelas:"C", sks:3, jadwal:"Jumat 15.30-18.00", ruang:"G0301", dosen:"Muhammad Syahriandi Adhantoro., S.Kom, M.Kom.", pengembangRPS:"Dr. Endah Sudarmilah, S.T., M.Eng",
    deskripsi:"Pengetahuan matematika mendasari informatika.",
    capaian:["Menerapkan konsep bilangan","Limit","Turunan & integral"],
    referensi:[{tag:"Utama",text:"Stewart, J. (2020). Calculus: Concepts and Contexts."}],
    tips:"Konsisten latihan soal.", bobot:"Tiap topik 5-15%, UTS 15%, UAS 15%"}
];

const KURIKULUM = {
  1:{total:"17 SKS",items:[{kode:"TIF3221303",nama:"Algoritma dan Pemrograman",sks:3},{kode:"TIF3221104",nama:"Praktikum Algoritma dan Pemrograman",sks:1},{kode:"TIF3221305",nama:"Kalkulus",sks:3},{kode:"TIF3221308",nama:"Logika dan Himpunan",sks:3},{kode:"TIF3221307",nama:"Pemrograman Visual",sks:3},{kode:"TIF3221206",nama:"Kepemimpinan dan Komunikasi Interpersonal",sks:2},{kode:"TIF3221202",nama:"English for Academic Purpose",sks:2}]},
  2:{total:"21 SKS",items:[{kode:"TIF1221209",nama:"Ibadah dan Muamalah",sks:2},{kode:"TIF1221210",nama:"Standardized Test Preparation",sks:2},{kode:"TIF1221228",nama:"Bahasa Indonesia",sks:2},{kode:"TIF3221311",nama:"Sistem dan Teknologi Informasi",sks:3},{kode:"TIF3221312",nama:"Sistem Digital",sks:3},{kode:"TIF3221113",nama:"Praktikum Sistem Digital",sks:1},{kode:"TIF3221314",nama:"Matematika Diskret",sks:3},{kode:"TIF3221315",nama:"Aljabar Linier dan Matriks",sks:3},{kode:"TIF3221316",nama:"Sistem Basis Data",sks:3},{kode:"TIF3221117",nama:"Praktikum Sistem Basis Data",sks:1}]},
  3:{total:"21 SKS",items:[{kode:"TIF1221218",nama:"Islam dan IPTEKS",sks:2},{kode:"TIF1221265",nama:"Pancasila",sks:2},{kode:"TIF3221319",nama:"Sistem Operasi",sks:3},{kode:"TIF3221120",nama:"Praktikum Sistem Operasi",sks:1},{kode:"TIF3221321",nama:"Metode Numerik",sks:3},{kode:"TIF3221322",nama:"Pemrograman Berorientasi Obyek",sks:3},{kode:"TIF3221123",nama:"Praktikum PBO",sks:1},{kode:"TIF3221324",nama:"Teori Bahasa dan Automata",sks:3},{kode:"TIF3221325",nama:"Komunikasi Data",sks:3}]},
  4:{total:"21 SKS",items:[{kode:"TIF1221226",nama:"Kemuhammadiyahan",sks:2},{kode:"TIF3221328",nama:"Algoritma dan Struktur Data",sks:3},{kode:"TIF3221129",nama:"Praktikum Algoritma dan Struktur Data",sks:1},{kode:"TIF3221330",nama:"Pemrograman WEB",sks:3},{kode:"TIF3221131",nama:"Praktikum Pemrograman WEB",sks:1},{kode:"TIF3221332",nama:"Jaringan Komputer",sks:3},{kode:"TIF3221133",nama:"Praktikum Jaringan Komputer",sks:1},{kode:"TIF3221334",nama:"Rekayasa Perangkat Lunak",sks:3},{kode:"TIF3221235",nama:"Organisasi dan Arsitektur Komputer",sks:2},{kode:"TIF3221251",nama:"Kewarganegaraan",sks:2}]},
  5:{total:"11 SKS Wajib + 10 SKS Konsentrasi",items:[{kode:"TIF3221336",nama:"Pemrograman Web Berbasis Framework",sks:3},{kode:"TIF3221237",nama:"Infrastruktur dan Platform Sains Data",sks:2},{kode:"TIF3221338",nama:"Probabilitas dan Statistik",sks:3},{kode:"TIF3221339",nama:"Metodologi Penelitian dan Publikasi Ilmiah",sks:3,highlight:true},{kode:"-",nama:"- Konsentrasi RPL -",sks:0,consent:true},{kode:"TIF3221340",nama:"Manajemen Proyek Perangkat Lunak",sks:3,consent:true},{kode:"TIF3221341",nama:"Data Warehousing dan Data Mining",sks:3,consent:true},{kode:"-",nama:"- Konsentrasi SJ -",sks:0,consent:true},{kode:"TIF3221343",nama:"Administrasi Jaringan Komputer",sks:3,consent:true},{kode:"TIF3221344",nama:"Cloud Computing",sks:3,consent:true},{kode:"-",nama:"- Konsentrasi SIC -",sks:0,consent:true},{kode:"TIF3221347",nama:"Kecerdasan Buatan / AI",sks:3,consent:true}]},
  6:{total:"13 SKS Wajib + Konsentrasi",items:[{kode:"TIF3221270",nama:"Praktek Kerja Nyata",sks:2},{kode:"TIF3221352",nama:"Pemrograman Perangkat Mobile",sks:3},{kode:"TIF3221353",nama:"Sistem Multimedia",sks:3},{kode:"TIF3221354",nama:"Capstone Project",sks:3,highlight:true}]},
  7:{total:"17 SKS",items:[{kode:"TIF2221266",nama:"Informatika Sosial",sks:2},{kode:"TIF3221367",nama:"Interaksi Manusia dan Komputer",sks:3},{kode:"TIF3221268",nama:"Etika & Hukum Profesi",sks:2},{kode:"TIF3221269",nama:"Technopreneurship",sks:2},{kode:"TIF1221250",nama:"Life Skill",sks:2},{kode:"TIF32213XX",nama:"MK Pilihan 1",sks:3},{kode:"TIF32213XX",nama:"MK Pilihan 2",sks:3}]},
  8:{total:"6 SKS",items:[{kode:"TIF3221371",nama:"Skripsi",sks:6,highlight:true}]}
};

const DAY_NAMES = {senin:'SENIN',selasa:'SELASA',rabu:'RABU',kamis:'KAMIS',jumat:'JUMAT'};
const DAY_KEYS = ['minggu','senin','selasa','rabu','kamis','jumat','sabtu'];
const MONTH_NAMES = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

function getTimeRange(jamKe){
  const p = jamKe.split('-').map(s=>parseInt(s.trim()));
  const s = p[0], e = p[1];
  const tMap={1:"06.30",2:"07.20",3:"08.10",4:"09.00",5:"09.50",6:"10.40",7:"12.30",8:"13.20",9:"14.10",10:"15.30",11:"16.20",12:"17.10",13:"18.30",14:"19.20",15:"20.10"};
  const eMap={1:"07.20",2:"08.10",3:"09.00",4:"09.50",5:"10.40",6:"11.30",7:"13.20",8:"14.10",9:"15.00",10:"16.20",11:"17.10",12:"18.00",13:"19.20",14:"20.10",15:"21.00"};
  return {start:tMap[s]||"-", end:eMap[e]||"-"};
}
function timeToMinutes(t){const parts=t.split('.').map(Number);return parts[0]*60+parts[1]}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function storage(key, def){try{const v=localStorage.getItem(key);return v?JSON.parse(v):def}catch(e){return def}}
function saveStorage(key, val){try{localStorage.setItem(key,JSON.stringify(val))}catch(e){}}

function findNextClass(){
  const now=new Date();
  const nowMin=now.getHours()*60+now.getMinutes();
  const todayKey=DAY_KEYS[now.getDay()];
  const todayClasses=SCHEDULE[todayKey]||[];
  for(let i=0;i<todayClasses.length;i++){
    const c=todayClasses[i];
    const r=getTimeRange(c.jamKe);
    const sM=timeToMinutes(r.start),eM=timeToMinutes(r.end);
    if(nowMin>=sM&&nowMin<eM) return {cls:c,dayOffset:0,startMin:sM,endMin:eM,ongoing:true};
  }
  for(let i=0;i<todayClasses.length;i++){
    const c=todayClasses[i];
    const r=getTimeRange(c.jamKe);
    const sM=timeToMinutes(r.start);
    if(sM>nowMin) return {cls:c,dayOffset:0,startMin:sM,ongoing:false};
  }
  for(let d=1;d<=7;d++){
    const key=DAY_KEYS[(now.getDay()+d)%7];
    const list=SCHEDULE[key]||[];
    if(list.length>0){
      const c=list[0];
      const r=getTimeRange(c.jamKe);
      return {cls:c,dayOffset:d,startMin:timeToMinutes(r.start),ongoing:false};
    }
  }
  return null;
}
function formatCountdown(info){
  if(!info||info.ongoing) return null;
  const now=new Date();
  const nowMin=now.getHours()*60+now.getMinutes();
  const diff=info.dayOffset*1440+info.startMin-nowMin;
  if(diff<=0) return null;
  const d=Math.floor(diff/1440),h=Math.floor((diff%1440)/60),m=diff%60;
  if(d>0) return d+' hari '+h+'j '+m+'m';
  return String(h).padStart(2,'0')+'j '+String(m).padStart(2,'0')+'m';
}
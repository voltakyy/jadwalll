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
  rabu:[{jamKe:"5-6", nama:"English for Academic Purpose", kode:"TIF1221202", kelas:"C", ruang:"G0301", sks:2, dosen:"Romadhani Wulandari, S.Pd., M.Pd."}],
  kamis:[{jamKe:"7-9", nama:"Pemrograman Visual", kode:"TIF3221307", kelas:"C", ruang:"G0304", sks:3, dosen:"Faris Atoll Haq, S.Tr.T., M.Kom."}],
  jumat:[
    {jamKe:"1-3", nama:"Algoritma dan Pemrograman", kode:"TIF3221303", kelas:"C", ruang:"G0301", sks:3, dosen:"Muhammad Syahriandi Adhantoro., S.Kom, M.Kom."},
    {jamKe:"5-6", nama:"Kepemimpinan dan Komunikasi Interpersonal", kode:"TIF3221206", kelas:"C", ruang:"G0301", sks:2, dosen:"Maryam, S.Kom., M.Eng."},
    {jamKe:"10-12", nama:"Kalkulus", kode:"TIF3221305", kelas:"C", ruang:"G0301", sks:3, dosen:"Muhammad Syahriandi Adhantoro., S.Kom, M.Kom."}
  ]
};

const KRS = [
  {kode:"TIF1221201", nama:"Agama", kelas:"A", sks:2, jadwal:"Tidak dijadwalkan", ruang:"-", dosen:"Tim Pengampu UMS", nonSched:true, pengembangRPS:"Tim Pengampu MK Agama UMS",
    deskripsi:"Mata kuliah pengembangan kepribadian yang membentuk karakter religius, etika, dan moral mahasiswa. Silabus resmi akan diumumkan oleh dosen pengampu.",
    capaian:["Memahami nilai-nilai keagamaan","Membentuk akhlak mulia","Menganalisis isu kontemporer dari perspektif agama"],
    referensi:[{tag:"Buku",text:"Pendidikan Agama Islam untuk Perguruan Tinggi"}],
    tips:"Silabus dan jadwal dari dosen pengampu belum dirilis.", bobot:"Partisipasi, tugas, UTS, UAS"},
  {kode:"TIF3221303", nama:"Algoritma dan Pemrograman", kelas:"C", sks:3, jadwal:"Jumat 06.30-09.00", ruang:"G0301", dosen:"Muhammad Syahriandi Adhantoro., S.Kom, M.Kom.", pengembangRPS:"Husni Thamrin, M.T., Ph.D",
    deskripsi:"Dasar-dasar pemrograman komputer dan analisis algoritma menggunakan Python.",
    capaian:["Menganalisis masalah komputasi","Menerangkan unsur program","Menerangkan struktur kendali","Menerapkan modularisasi"],
    referensi:[{tag:"Utama",text:"Zarman, Wendi. (2020). Implementasi algoritma dalam bahasa Python. Informatika"}],
    tips:"Fokus pada proyek akhir yang mengakses jaringan/web.", bobot:"Tugas 40%, UTS 30%, UAS 30%"},
  {kode:"TIF1221202", nama:"English for Academic Purpose", kelas:"C", sks:2, jadwal:"Rabu 09.50-11.30", ruang:"G0301", dosen:"Romadhani Wulandari, S.Pd., M.Pd.", pengembangRPS:"Tim EAP UMS",
    deskripsi:"Bahasa Inggris akademik terintegrasi dengan ETP (English Tutorial Program).",
    kodeNote:"Kode yang benar adalah TIF1221202 (sesuai jadwal STAR UMS). KRS memuat typo TIF3221202.",
    capaian:["Listening 25%","Grammar 10%","Reading 20%","Writing 15%","Speaking/ETP 30%"],
    referensi:[{tag:"Utama",text:"English for Computer Science Students"}],
    tips:"Wajib ikut ETP setiap Sabtu 08.20-09.50 WIB.", bobot:"Attendance 5% - Midterm 30% - Final 35% - ETP 30%"},
  {kode:"TIF3221305", nama:"Kalkulus", kelas:"C", sks:3, jadwal:"Jumat 15.30-18.00", ruang:"G0301", dosen:"Muhammad Syahriandi Adhantoro., S.Kom, M.Kom.", pengembangRPS:"Dr. Endah Sudarmilah, S.T., M.Eng",
    deskripsi:"Pengetahuan matematika mendasari informatika.",
    capaian:["Menerapkan konsep bilangan","Trigonometri","Fungsi bilangan","Limit","Turunan & integral"],
    referensi:[{tag:"Utama",text:"Stewart, J. (2020). Calculus: Concepts and Contexts."}],
    tips:"Konsisten latihan soal.", bobot:"Tiap topik 5-15%, UTS 15%, UAS 15%"},
  {kode:"TIF3221206", nama:"Kepemimpinan dan Komunikasi Interpersonal", kelas:"C", sks:2, jadwal:"Jumat 09.50-11.30", ruang:"G0301", dosen:"Maryam, S.Kom., M.Eng.", pengembangRPS:"Nurgiyatna, S.T., M.Sc., Ph.D",
    deskripsi:"Bekal kepemimpinan, manajemen tim, dan komunikasi interpersonal.",
    capaian:["Konsep dasar kepemimpinan","Konsep komunikasi interpersonal"],
    referensi:[{tag:"Utama",text:"RPS Kepemimpinan - Nurgiyatna, UMS"}],
    tips:"Manfaatkan diskusi untuk melatih public speaking.", bobot:"Tiap topik 6-10%, UTS, UAS 10%"},
  {kode:"TIF3221308", nama:"Logika dan Himpunan", kelas:"C", sks:3, jadwal:"Senin 12.30-15.00", ruang:"G0301", dosen:"Reinal Ariyuda, B.Eng., M.Eng.", pengembangRPS:"Dr.Eng. Yusuf Sulistyo Nugroho, S.T., M.Eng",
    deskripsi:"Di akhir pembelajaran MK Logika dan Himpunan, mahasiswa diharapkan mampu menjelaskan dan menerapkan dasar-dasar logika, tabel kebenaran, proposisi majemuk, tautologi, ekuivalensi logis, bentuk normal, pembuktian logika, dan analisis validitas argumen, serta menjelaskan istilah dan simbol himpunan, menerapkan diagram Venn, relasi himpunan, operasi himpunan, dan relasi. Mata kuliah ini diselenggarakan setiap pekan sesuai jadwal kelas masing-masing.",
    capaian:[
      "Menerapkan teknik penyederhanaan, strategi pembalikan, tablo semantik, bentuk normal, dan resolusi untuk memverifikasi konsistensi serta validitas argumen logis, sehingga dapat digunakan sebagai dasar pengembangan algoritma dan sistem cerdas pada teknologi multi-platform.",
      "Menjelaskan konsep dasar himpunan, menggambarkan representasi menggunakan diagram Venn, serta menerapkan relasi dan operasi himpunan untuk memodelkan dan menyelesaikan permasalahan yang berkaitan dengan pengelolaan data pada aplikasi teknologi multi-platform.",
      "Menjelaskan konsep dasar logika matematika dan logika proposisional, termasuk argumen, validitas, proposisi, serta pemberian nilai kebenaran, untuk mendukung analisis dan perancangan solusi pada aplikasi teknologi multi-platform.",
      "Menyusun dan menganalisis tabel kebenaran, proposisi majemuk, tautologi, serta ekuivalensi logis untuk mengevaluasi validitas argumen dan menyederhanakan ekspresi logika, sebagai dasar dalam perancangan algoritma dan implementasi teknologi multi-platform."
    ],
    referensi:[{tag:"Utama",text:"Soesianto & Dwijono. (2010). Logika Matematika untuk Ilmu Komputer. Andi."},{tag:"Pendukung",text:"Jong Jek Siang. (2015). Logika Matematika: Soal dan Penyelesaian. Andi."}],
    tips:"Kuasai tablo semantik, CNF, dan DNF.", bobot:"Presensi 10% • Tugas & Kuis 40% • UTS 25% • UAS 25%"},
  {kode:"TIF3221307", nama:"Pemrograman Visual", kelas:"C", sks:3, jadwal:"Kamis 12.30-15.00", ruang:"G0304", dosen:"Faris Atoll Haq, S.Tr.T., M.Kom.", pengembangRPS:"Maryam, S.Kom., M.Eng.",
    deskripsi:"Pemrograman berbasis obyek menggunakan blok kode visual (Alice & Greenfoot).",
    capaian:["Menganalisis dan mendesain solusi proyek","Menyusun model analisis dan desain"],
    referensi:[{tag:"Utama",text:"Cay Horstmann. (2021). Core Java: Fundamentals."}],
    tips:"Project GAME ALICE 30% - kerjakan serius.", bobot:"Tugas 15% - UTS 15% - Project ALICE 30% - Project Team 20% - UAS 20%"},
  {kode:"TIF3221104", nama:"Praktikum Algoritma dan Pemrograman", kelas:"D", sks:1, jadwal:"Selasa 14.10-16.20", ruang:"LABRPL", dosen:"Khanun Roisatul Ummah, S.Tr.T., M.Tr.Kom.", pengembangRPS:"Dimas Aryo Anggoro, S.Kom., M.Sc.",
    deskripsi:"Praktikum dasar pemrograman menggunakan GvRng (Python).",
    capaian:["Menganalisis dan mendesain solusi proyek","Menganalisis desain siklus pengembangan"],
    referensi:[{tag:"Utama",text:"Thamrin et al. (2019). Algoritma dan Pemrograman. UMS Press"}],
    tips:"Kerjakan proyek akhir dengan serius.", bobot:"Portofolio: 30% + 40% + 30%"},
  {kode:"MKCOT0102", nama:"Test TOEP Reguler", kelas:"A", sks:0, jadwal:"Tidak dijadwalkan", ruang:"-", dosen:"-", nonSched:true, pengembangRPS:"LPBK UMS",
    deskripsi:"Tes kemampuan bahasa Inggris standar untuk mahasiswa baru.",
    capaian:["Mengukur kemampuan listening, structure, reading"],
    referensi:[{tag:"Buku",text:"Longman Preparation Course for TOEP"}],
    tips:"Skor di atas 500 membantu untuk beasiswa.", bobot:"Skor (bukan bagian IPK)"},
  {kode:"MKCOT0202", nama:"Test TOEP Remidi", kelas:"A", sks:0, jadwal:"Tidak dijadwalkan", ruang:"-", dosen:"-", nonSched:true, pengembangRPS:"LPBK UMS",
    deskripsi:"Tes TOEP ulang bagi mahasiswa baru yang belum memenuhi skor minimum.",
    capaian:["Memperbaiki skor TOEP"],
    referensi:[{tag:"Buku",text:"TOEP Preparation Book"}],
    tips:"Fokus pada kelemahan skor sebelumnya.", bobot:"Skor (bukan bagian IPK)"}
];

const KURIKULUM = {
  1:{total:"19 SKS",items:[
    {kode:"TIF1221201",nama:"Agama",sks:2},
    {kode:"TIF3221303",nama:"Algoritma dan Pemrograman",sks:3},
    {kode:"TIF1221202",nama:"English for Academic Purpose",sks:2},
    {kode:"TIF3221305",nama:"Kalkulus",sks:3},
    {kode:"TIF3221206",nama:"Kepemimpinan dan Komunikasi Interpersonal",sks:2},
    {kode:"TIF3221308",nama:"Logika dan Himpunan",sks:3},
    {kode:"TIF3221307",nama:"Pemrograman Visual",sks:3},
    {kode:"TIF3221104",nama:"Praktikum Algoritma dan Pemrograman",sks:1}
  ]},
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

const MATERI = [
  {kode:"TIF1221201", nama:"Agama", dosen:"Tim Pengampu UMS", sks:2, kelas:"A", placeholder:true,
    driveId:"", link:"#",
    deskripsi:"Mata kuliah pengembangan kepribadian yang membentuk karakter religius, etika, dan moral mahasiswa. Silabus resmi akan diumumkan oleh dosen pengampu.",
    capaian:[
      {judul:"Nilai Keagamaan", desc:"Memahami dan menginternalisasi nilai-nilai keagamaan dalam kehidupan sehari-hari."},
      {judul:"Akhlak Mulia", desc:"Membentuk akhlak mulia sebagai landasan karakter profesional."},
      {judul:"Isu Kontemporer", desc:"Menganalisis isu kontemporer dari perspektif agama."}
    ],
    pertemuan:[]
  },
  {kode:"TIF3221303", nama:"Algoritma dan Pemrograman", dosen:"Muhammad Syahriandi Adhantoro., S.Kom, M.Kom.", sks:3, kelas:"C",
    driveId:"1DDCo_tBclIjpki0GYXxVkymLSYf1hJIW", link:"https://drive.google.com/file/d/1DDCo_tBclIjpki0GYXxVkymLSYf1hJIW/view?usp=drivesdk",
    pertemuan:[
      {no:1, judul:"Permasalahan komputasional, algoritma, dan flowchart", desc:"Pengantar cara berpikir komputasional dan representasi solusi."},
      {no:2, judul:"Perintah dasar, tipe data primitif, dan operasi", desc:"Variabel, tipe data, operator aritmatika, perbandingan, string, boolean."},
      {no:3, judul:"Perulangan, percabangan, dan perulangan kondisional", desc:"Struktur kendali program."},
      {no:4, judul:"Fungsi, class, akses berkas, dan modul", desc:"Prinsip modularisasi dan pengelolaan file."},
      {no:5, judul:"Algoritma searching dan sorting sederhana", desc:"Sequential search, binary search, bubble sort, selection sort."},
      {no:6, judul:"Kinerja algoritma dan kompleksitas", desc:"Analisis efisiensi algoritma."},
      {no:7, judul:"Akses jaringan, web, atau aplikasi desktop", desc:"Proyek akhir."}
    ]
  },
  {kode:"TIF1221202", nama:"English for Academic Purpose", dosen:"Romadhani Wulandari, S.Pd., M.Pd.", sks:2, kelas:"C",
    driveId:"19OGcHUuEgTl46OBFU3qdX9MPsBwO8S-k", link:"https://drive.google.com/file/d/19OGcHUuEgTl46OBFU3qdX9MPsBwO8S-k/view?usp=drivesdk",
    rutin:{
      judul:"ETP — English Tutorial Program",
      jadwal:"Setiap Sabtu, 08.20 – 09.50 WIB",
      mulai:"19 September 2026",
      tutor:"Kakak tingkat semester 3/5",
      penilaian:"Speaking",
      bobot:"30% dari nilai tugas EAP & SETP",
      detail:"Program rutin mingguan wajib untuk mahasiswa semester 1 dan 2. Bertujuan melatih kemampuan speaking dan menulis sederhana dalam bahasa Inggris. Info tutor dan jadwal lengkap di IG dan web LAMB UMS."
    },
    pertemuan:[
      {no:1, judul:"Introduction & Course Contract", desc:"Pengenalan EAP, kontrak kuliah, dan overview assessment points."},
      {no:2, judul:"Listening Comprehension Fundamentals", desc:"Dasar-dasar listening akademik — top-down & bottom-up strategies."},
      {no:3, judul:"The Basic Parts of Speech & Sentence Components", desc:"Noun, verb, adjective, adverb, pronoun, preposition."},
      {no:4, judul:"Simple, Compound, and Complex Sentences", desc:"Coordinating & subordinating conjunctions."},
      {no:5, judul:"Determining the Main Idea of a Passage", desc:"Menentukan ide pokok bacaan 300-500 kata."},
      {no:6, judul:"Topic Sentence & Detail Information", desc:"Mengembangkan topik kalimat dan detail paragraf."},
      {no:7, judul:"Listening Practice Session", desc:"Latihan listening untuk persiapan UTS."},
      {no:8, judul:"UTS / Midterm Test", desc:"Ujian Tengah Semester."},
      {no:9, judul:"Writing Basics: Paragraph Structure", desc:"Menulis paragraf akademik."},
      {no:10, judul:"Writing: Essay Structure", desc:"Struktur esai — introduction, body, conclusion."},
      {no:11, judul:"Present, Past, and Future Tenses", desc:"Tenses dalam konteks akademik."},
      {no:12, judul:"Identifying References & Contextual Clues", desc:"Identifikasi referensi dalam teks."},
      {no:13, judul:"Listening Comprehension Practice", desc:"Latihan listening untuk UAS."},
      {no:14, judul:"Review Materi & Persiapan UAS", desc:"Pengulangan materi 1-13."},
      {no:15, judul:"UAS / Final Test", desc:"Ujian Akhir Semester."}
    ]
  },
  {kode:"TIF3221305", nama:"Kalkulus", dosen:"Muhammad Syahriandi Adhantoro., S.Kom, M.Kom.", sks:3, kelas:"C",
    driveId:"1_W7jLMNmrvJsQqg71nh8ZtFsm8hr_3OW", link:"https://drive.google.com/file/d/1_W7jLMNmrvJsQqg71nh8ZtFsm8hr_3OW/view?usp=drivesdk",
    pertemuan:[
      {no:1, judul:"Bilangan dan representasinya", desc:"Sistem bilangan dan notasi matematis."},
      {no:2, judul:"Bilangan trigonometri", desc:"Fungsi trigonometri dan aplikasinya."},
      {no:3, judul:"Fungsi bilangan", desc:"Konsep fungsi dan grafiknya."},
      {no:4, judul:"Konsep limit dan aturannya", desc:"Limit fungsi dan teorema limit."},
      {no:5, judul:"Limit berhingga dan tak berhingga", desc:"Perilaku fungsi di titik kritis."},
      {no:6, judul:"Kontinyuitas fungsi", desc:"Kekontinuan dan jenis diskontinu."},
      {no:7, judul:"Konsep turunan dan aturannya", desc:"Diferensiasi dasar."},
      {no:8, judul:"Turunan trigonometri, aturan rantai, turunan tingkat tinggi", desc:"Teknik diferensiasi lanjutan."},
      {no:9, judul:"Aplikasi penggunaan turunan", desc:"Optimasi dan analisis laju perubahan."},
      {no:10, judul:"Konsep integral dan aturannya", desc:"Integrasi dasar."},
      {no:11, judul:"Integral trigonometri, integral tertentu, integral tak hingga", desc:"Teknik integrasi."},
      {no:12, judul:"Aplikasi penggunaan integral", desc:"Luas, volume, dan aplikasi lainnya."}
    ]
  },
  {kode:"TIF3221206", nama:"Kepemimpinan dan Komunikasi Interpersonal", dosen:"Maryam, S.Kom., M.Eng.", sks:2, kelas:"C",
    driveId:"1OWklYAtehc46BRc_f8VBSXcniDft37rl", link:"https://drive.google.com/file/d/1OWklYAtehc46BRc_f8VBSXcniDft37rl/view?usp=drivesdk",
    pertemuan:[
      {no:1, judul:"Konsep dasar kepemimpinan", desc:"Pengertian, peran, dan tugas kepemimpinan."},
      {no:2, judul:"Aqidah dan Kepemimpinan", desc:"Kaitan aqidah dengan kepemimpinan."},
      {no:3, judul:"Akhlaq kepemimpinan", desc:"Etika dan akhlak dalam kepemimpinan."},
      {no:4, judul:"Tantangan Kepemimpinan", desc:"Permasalahan yang dihadapi pemimpin."},
      {no:5, judul:"Skill/Kecakapan Kepemimpinan", desc:"Keterampilan dasar seorang pemimpin."},
      {no:6, judul:"Cara meningkatkan skill kepemimpinan", desc:"Strategi pengembangan diri."},
      {no:7, judul:"Konsep dasar komunikasi", desc:"Pengantar ilmu komunikasi."},
      {no:8, judul:"Karakter komunikasi interpersonal", desc:"Ciri khas komunikasi antar pribadi."},
      {no:9, judul:"Tantangan/hambatan komunikasi interpersonal", desc:"Hambatan dan solusinya."},
      {no:10, judul:"Skill komunikasi interpersonal", desc:"Keterampilan komunikasi efektif."},
      {no:11, judul:"Cara meningkatkan skill komunikasi interpersonal", desc:"Latihan dan pengembangan."},
      {no:12, judul:"Implementasi aqidah dan akhlaq dalam komunikasi", desc:"Penerapan nilai keislaman."},
      {no:13, judul:"Pentingnya komunikasi interpersonal dalam kepemimpinan", desc:"Peran komunikasi bagi pemimpin."}
    ]
  },
  {kode:"TIF3221308", nama:"Logika dan Himpunan", dosen:"Reinal Ariyuda, B.Eng., M.Eng.", sks:3, kelas:"C",
    driveId:"1PA2EuAmK1yo7AD-EQxved5ALjk9pJEz-", link:"https://drive.google.com/file/d/1PA2EuAmK1yo7AD-EQxved5ALjk9pJEz-/view?usp=drivesdk",
    deskripsi:"Di akhir pembelajaran MK Logika dan Himpunan, mahasiswa diharapkan mampu menjelaskan dan menerapkan dasar-dasar logika, tabel kebenaran, proposisi majemuk, tautologi, ekuivalensi logis, bentuk normal, pembuktian logika, dan analisis validitas argumen, serta menjelaskan istilah dan simbol himpunan, menerapkan diagram Venn, relasi himpunan, operasi himpunan, dan relasi.",
    capaian:[
      {judul:"Teknik Verifikasi Logika", desc:"Menerapkan teknik penyederhanaan, strategi pembalikan, tablo semantik, bentuk normal, dan resolusi untuk memverifikasi konsistensi serta validitas argumen logis — sebagai dasar pengembangan algoritma dan sistem cerdas pada teknologi multi-platform."},
      {judul:"Konsep Himpunan & Diagram Venn", desc:"Menjelaskan konsep dasar himpunan, menggambarkan representasi menggunakan diagram Venn, serta menerapkan relasi dan operasi himpunan untuk memodelkan dan menyelesaikan permasalahan pengelolaan data."},
      {judul:"Logika Matematika & Proposisional", desc:"Menjelaskan konsep dasar logika matematika dan logika proposisional, termasuk argumen, validitas, proposisi, serta pemberian nilai kebenaran untuk mendukung analisis dan perancangan solusi."},
      {judul:"Tabel Kebenaran & Analisis Validitas", desc:"Menyusun dan menganalisis tabel kebenaran, proposisi majemuk, tautologi, serta ekuivalensi logis untuk mengevaluasi validitas argumen dan menyederhanakan ekspresi logika."}
    ],
    moda:"Offline 75% · Online 25% (Zoom / Google Meet). LMS: Spada UMS",
    kehadiran:"Minimal 75% — maksimal 4x tidak hadir. Toleransi keterlambatan 10 menit.",
    prasyarat:"Tidak ada",
    bobotDetail:[
      {komponen:"Presensi", bobot:"10%"},
      {komponen:"Tugas-tugas & Kuis", bobot:"40%", highlight:true},
      {komponen:"UTS", bobot:"25%"},
      {komponen:"UAS", bobot:"25%"}
    ],
    skalaNilai:[
      {grade:"A", range:"≥ 80", kategori:"a"},
      {grade:"AB", range:"70-79", kategori:"a"},
      {grade:"B", range:"65-69", kategori:"b"},
      {grade:"BC", range:"60-64", kategori:"b"},
      {grade:"C", range:"50-59", kategori:"c"},
      {grade:"D", range:"35-49", kategori:"d"},
      {grade:"E", range:"< 35", kategori:"e"}
    ],
    pertemuan:[
      {no:1, judul:"Pengenalan Logika Matematika", desc:"Pendahuluan logika, argumen, validitas, logika klasik, logika modern, dan logika banyak nilai.",
        detail:`
          <div class="detail-note warm"><strong>Pertemuan 1</strong> · Logika dan Himpunan · Dosen: Reinal Ariyuda · Senin, 14 September 2026</div>
          <div class="detail-section"><h6>📋 Moda & Mekanisme Belajar</h6>
            <p><strong>Offline 75%</strong> · <strong>Online 25%</strong> (via Zoom / Google Meet). LMS resmi: <strong>Spada UMS</strong>.</p>
            <ul><li>Kehadiran minimal 75% — maksimal 4x tidak hadir</li><li>Toleransi keterlambatan: 10 menit</li></ul></div>
          <div class="detail-section"><h6>📊 Evaluasi Perkuliahan</h6>
            <div class="eval-table">
              <div class="eval-row"><span class="komponen">Presensi</span><span class="bobot">10%</span></div>
              <div class="eval-row highlight"><span class="komponen">Tugas-tugas & Kuis</span><span class="bobot">40%</span></div>
              <div class="eval-row"><span class="komponen">UTS</span><span class="bobot">25%</span></div>
              <div class="eval-row"><span class="komponen">UAS</span><span class="bobot">25%</span></div>
            </div>
            <h6 style="margin-top:16px">Skala Nilai</h6>
            <div class="skala-grid">
              <div class="skala-item a"><span class="grade">A</span><span class="range">≥ 80</span></div>
              <div class="skala-item a"><span class="grade">AB</span><span class="range">70-79</span></div>
              <div class="skala-item b"><span class="grade">B</span><span class="range">65-69</span></div>
              <div class="skala-item b"><span class="grade">BC</span><span class="range">60-64</span></div>
              <div class="skala-item c"><span class="grade">C</span><span class="range">50-59</span></div>
              <div class="skala-item d"><span class="grade">D</span><span class="range">35-49</span></div>
              <div class="skala-item e"><span class="grade">E</span><span class="range">&lt; 35</span></div>
            </div></div>
          <div class="detail-section"><h6>1. Apa itu Logika?</h6>
            <p>Logika (<em>logic</em>) berasal dari kata Yunani <strong>"logos"</strong>. Ilmu tentang metode penalaran yang berhubungan dengan pembuktian validitas suatu argumen.</p>
            <p><strong>Pernyataan</strong> adalah kalimat yang memiliki arti dan dapat bernilai <strong>benar</strong> atau <strong>salah</strong>.</p>
            <div class="detail-example"><span class="label">Contoh</span><p>✅ Ibukota negara Indonesia adalah Jakarta.</p><p>✅ Presiden Indonesia adalah Mulyo Notonegoro.</p></div></div>
          <div class="detail-section"><h6>2. Penalaran Deduktif</h6>
            <p>Logika berhubungan dengan <strong>penalaran deduktif</strong> — mengambil <strong>kesimpulan (K)</strong> dari <strong>premis (P)</strong>.</p>
            <div class="detail-example"><span class="label">Contoh</span><p>P1: Semua yang pergi kuliah memakai baju.</p><p>P2: Joko pergi kuliah.</p><p><strong>K: Joko memakai baju.</strong></p></div></div>
          <div class="detail-section"><h6>3. Peranan Logika</h6>
            <ul><li><strong>Matematika</strong> — Komputasi, Matematika Diskret, Aljabar Linier</li><li><strong>Elektronika</strong> — Rangkaian Digital</li><li><strong>Informatika</strong> — Membuat & menguji program</li><li><strong>AI</strong> — Expert Systems, Logic Programming, Soft Computing</li></ul></div>
          <div class="detail-section"><h6>4. Argumen</h6>
            <p>Usaha mencari kebenaran pernyataan berupa <strong>kesimpulan</strong> berdasarkan kebenaran <strong>premis-premis</strong>.</p>
            <div class="detail-example"><span class="label">Contoh 1 — Logis</span><p>P1: Semua mahasiswa pandai.</p><p>P2: Fafa adalah mahasiswa.</p><p><strong>K: Fafa pandai.</strong></p></div>
            <div class="detail-example"><span class="label">Contoh 2 — Perdebatan</span><p>P1: Semua manusia bermata empat.</p><p>P2: Fuji seorang manusia.</p><p><strong>K: Fuji bermata empat.</strong></p></div></div>
          <div class="detail-section"><h6>5. Validitas Argumen</h6>
            <p><span class="detail-tag green">Argumen Valid — Premis Salah</span> Tetap valid karena kesimpulan mengikuti premis. Disebut <strong>tautologi</strong>.</p>
            <div class="detail-example"><span class="label">Contoh 3</span><p>P1: Semua mamalia berkaki empat.</p><p>P2: Semua manusia adalah mamalia.</p><p><strong>K: Semua manusia berkaki empat.</strong></p></div>
            <p><span class="detail-tag red">Argumen Tidak Valid — Kesimpulan Benar</span></p>
            <div class="detail-example"><span class="label">Contoh 4</span><p>P1: Ada makhluk berkaki dua.</p><p>P2: Semua manusia adalah makhluk hidup.</p><p><strong>K: Semua manusia berkaki dua.</strong></p></div>
            <div class="detail-note"><strong>Kesimpulan:</strong> Logika mempermasalahkan <em>bentuk</em> argumen, bukan <em>isi</em>.</div></div>
          <div class="detail-section"><h6>6. Argumen Sound</h6>
            <p>Argumen disebut <strong>sound</strong> jika <strong>(1) valid</strong> dan <strong>(2) semua premisnya benar</strong>.</p>
            <div class="detail-example"><span class="label">Contoh 5 — Sound</span><p>P1: Semua karyawan mendapat THR.</p><p>P2: Siti adalah karyawan.</p><p><strong>K: Siti mendapat THR.</strong></p></div>
            <div class="detail-example"><span class="label">Contoh 7 — Valid tapi Tidak Sound</span><p>P1: Semua binatang dapat terbang.</p><p>P2: Gajah adalah binatang.</p><p><strong>K: Gajah dapat terbang.</strong></p></div></div>
          <div class="detail-section"><h6>7. Logika Klasik (Aristoteles)</h6>
            <p>Silogisme. Elemen: <em>term of syllogism</em>.</p>
            <ul><li><strong>Semua A adalah B</strong> (Universal Positif)</li><li><strong>Tidak ada A yang B</strong> (Universal Negatif)</li><li><strong>Beberapa A adalah B</strong> (Partikular Positif)</li><li><strong>Beberapa A bukan B</strong> (Partikular Negatif)</li></ul></div>
          <div class="detail-section"><h6>8. Logika Modern</h6>
            <p>De Morgan, Boole, Frege, Russell, Whitehead. Operator: <strong>AND, OR, IF...THEN..., IF AND ONLY IF</strong>.</p>
            <p><strong>Bivalent Logic:</strong> Benar (1) atau Salah (0). Landasan <strong>Aljabar Boolean</strong>.</p>
            <div class="detail-example"><span class="label">FPE</span><p>P = Hujan turun, Q = Jalanan basah → <strong>(P → Q)</strong></p></div></div>
          <div class="detail-section"><h6>9. Logika Banyak Nilai & Fuzzy</h6>
            <p><span class="detail-tag teal">Many-Valued</span> Jan Lukasiewicz (1920) — nilai ketiga: <strong>Netral</strong>.</p>
            <p><span class="detail-tag teal">Fuzzy</span> Lotfi A. Zadeh (1973) — <strong>Himpunan Fuzzy</strong>.</p>
            <div class="detail-example"><span class="label">Klasik vs Fuzzy</span><p><strong>Klasik:</strong> Air 37°C = "Panas = 0".</p><p><strong>Fuzzy:</strong> "Panas" 0.8, "Dingin" 0.2.</p></div></div>
          <div class="detail-note"><strong>Next:</strong> Pertemuan 2 — Pengantar Logika Proposisional</div>
        `},
      {no:2, judul:"Pengantar Logika Proposisional", desc:"Konsep proposisi, argumen, pemberian nilai kebenaran, dan operasi dasar logika."},
      {no:3, judul:"Tabel Kebenaran", desc:"Konstruksi tabel kebenaran untuk berbagai operator logika."},
      {no:4, judul:"Proposisi Majemuk", desc:"Ekspresi logika kompleks, skema, analisis, dan aturan pengurutan."},
      {no:5, judul:"Tautologi", desc:"Identifikasi tautologi, kontradiksi, dan contingent."},
      {no:6, judul:"Ekuivalensi Logis", desc:"Hukum-hukum logika: komutatif, asosiatif, distributif."},
      {no:7, judul:"Penyederhanaan", desc:"Operasi penyederhanaan ekspresi logika."},
      {no:8, judul:"Strategi Pembalikan", desc:"Konsistensi, operasi sistem pembalikan, model & counter model."},
      {no:9, judul:"Tablo Semantik", desc:"Aturan tablo dan penerapannya pada argumen."},
      {no:10, judul:"Bentuk Normal", desc:"CNF, DNF, klausa, dan konversi antar bentuk."},
      {no:11, judul:"Resolusi", desc:"Metode resolusi untuk validitas argumen."},
      {no:12, judul:"Himpunan dan Diagram Venn", desc:"Keanggotaan, kardinalitas, himpunan kuasa."},
      {no:13, judul:"Relasi dan Operasi Himpunan", desc:"Interseksi, union, selisih, komplemen."},
      {no:14, judul:"Review Materi", desc:"Pengulangan materi pertemuan 1-13."}
    ]
  },
  {kode:"TIF3221307", nama:"Pemrograman Visual", dosen:"Faris Atoll Haq, S.Tr.T., M.Kom.", sks:3, kelas:"C",
    driveId:"1UdI73LC32DAAF4U_9zIsyeoG_3I0AMW6", link:"https://drive.google.com/file/d/1UdI73LC32DAAF4U_9zIsyeoG_3I0AMW6/view?usp=drivesdk",
    pertemuan:[
      {no:1, judul:"Pemrograman Visual vs Pemrograman Tekstual", desc:"Perbandingan paradigma pemrograman."},
      {no:2, judul:"Pengenalan Alice 3", desc:"Pengenalan & instalasi Alice 3."},
      {no:3, judul:"Class dan Object", desc:"Menambahkan class, object, procedure & argument."},
      {no:4, judul:"Struktur Kendali & Fungsi", desc:"Struktur kendali, fungsi, operasi aritmatik."},
      {no:5, judul:"Pemahaman Dasar OOP", desc:"Konsep dasar pemrograman berbasis obyek."},
      {no:6, judul:"Perancangan Animasi/Game", desc:"Skenario dan story board."},
      {no:7, judul:"Pengenalan Greenfoot", desc:"IDE pemrograman visual berbasis Java."},
      {no:8, judul:"Pembuatan Class & Object Greenfoot", desc:"Implementasi OOP di Greenfoot."},
      {no:9, judul:"Variabel Global dan Lokal", desc:"Scope variabel dalam program."},
      {no:10, judul:"Data Array dan Perulangan", desc:"Struktur data array dan kontrol perulangan."},
      {no:11, judul:"Sound & Keyboard Control", desc:"Sound animation dan keyboard control."},
      {no:12, judul:"Pengembangan Game Lanjutan", desc:"Proyek game berbasis Greenfoot."},
      {no:13, judul:"Testing Game", desc:"Testing dan debugging program game."},
      {no:14, judul:"Presentasi Proyek Akhir", desc:"Demo proyek animasi/game akhir."}
    ]
  },
  {kode:"TIF3221104", nama:"Praktikum Algoritma dan Pemrograman", dosen:"Khanun Roisatul Ummah, S.Tr.T., M.Tr.Kom.", sks:1, kelas:"D",
    driveId:"1ODA-KQfClk5sKRBUwAZShg2N6Y0pJbWg", link:"https://drive.google.com/file/d/1ODA-KQfClk5sKRBUwAZShg2N6Y0pJbWg/view?usp=drivesdk",
    pertemuan:[
      {no:1, judul:"Instalasi software GvRng", desc:"Persiapan lingkungan praktikum."},
      {no:2, judul:"Instruksi dasar di GvRng", desc:"Perintah dasar dan struktur program."},
      {no:3, judul:"Instruksi pembuatan fungsi", desc:"Modularisasi dan reuse kode."},
      {no:4, judul:"Instruksi kendali: perulangan dan pengambilan keputusan", desc:"Kontrol alur program."},
      {no:5, judul:"Instruksi perulangan kondisional", desc:"Perulangan dengan kondisi berhenti."},
      {no:6, judul:"Data dan operator", desc:"Manipulasi data dalam praktikum."},
      {no:7, judul:"Mengolah data pada berkas", desc:"File I/O dasar."},
      {no:8, judul:"Komunikasi jaringan, GUI, dan Web Service", desc:"Proyek akhir terintegrasi."}
    ]
  }
];

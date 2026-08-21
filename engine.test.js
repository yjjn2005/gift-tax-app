const SEED = {
  version: 1,
  base: '2016-08-03',
  donees: ['유재진','김희연','유해인','유지원','유태현','남유준'],
  people: {
    '유재진': { birth:'', spouse:'김희연', marry:'' },
    '김희연': { birth:'', spouse:'유재진', marry:'' },
    '유해인': { birth:'', spouse:'',       marry:'2024-11-02' },
    '유지원': { birth:'', spouse:'',       marry:'' },
    '유태현': { birth:'', spouse:'',       marry:'2026-10-07' },
    '남유준': { birth:'2026-01-01', spouse:'', marry:'' },   /* 2026년생 · 미성년 — 정확한 일자 확인 필요 */
    '유창노': { birth:'', spouse:'',       marry:'' },
    '김세화': { birth:'', spouse:'',       marry:'' },
    '유태로': { birth:'', spouse:'',       marry:'' }
  },
  rel: {
    '유재진>김희연':{r:'spouse',skip:0}, '유재진>유창노':{r:'asc',skip:0}, '유재진>유태로':{r:'rel',skip:0},
    '김희연>유재진':{r:'spouse',skip:0}, '김희연>유창노':{r:'asc',skip:0},
    '유해인>유창노':{r:'asc',skip:1}, '유해인>유재진':{r:'asc',skip:0}, '유해인>김희연':{r:'asc',skip:0}, '유해인>김세화':{r:'rel',skip:0},
    '유지원>유창노':{r:'asc',skip:1}, '유지원>유재진':{r:'asc',skip:0}, '유지원>김희연':{r:'asc',skip:0}, '유지원>김세화':{r:'rel',skip:0},
    '유태현>유창노':{r:'asc',skip:1}, '유태현>유재진':{r:'asc',skip:0}, '유태현>김희연':{r:'asc',skip:0}, '유태현>김세화':{r:'rel',skip:0},
    '남유준>유재진':{r:'asc',skip:1}, '남유준>김희연':{r:'asc',skip:1}, '남유준>유해인':{r:'asc',skip:0}
  },
  gifts: [
    /* 유재진 */
    {id:'s01',kind:'gift',donee:'유재진',donor:'김희연',date:'2014-07-01',amount:350000000,tax:0,type:'부부간 아파트지분',note:'50%지분 / 합산 제외 처리(공동명의 취득분)',wed:0,filed:1,nosum:1},
    {id:'s02',kind:'gift',donee:'유재진',donor:'유창노',date:'2017-05-25',amount:445811775,tax:64320990,type:'토지증여',note:'월산20-5 / 19-9 / 19-12',wed:0,filed:1},
    {id:'s03',kind:'gift',donee:'유재진',donor:'유창노',date:'2020-10-13',amount:56080000,tax:10879520,type:'토지증여',note:'월산리20-13',wed:0,filed:1},
    {id:'s04',kind:'gift',donee:'유재진',donor:'김희연',date:'2022-08-12',amount:94617840,tax:0,type:'주식증여(부부간)',note:'애플·MSFT·구글·소프트뱅크 / 양도세 이월과세 1년',wed:0,filed:1},
    {id:'s05',kind:'gift',donee:'유재진',donor:'유태로',date:'2022-09-13',amount:1000000000,tax:229890000,type:'주식증여',note:'당일종가 기준',wed:0,filed:1},
    {id:'s06',kind:'gift',donee:'유재진',donor:'김희연',date:'2022-09-21',amount:332865000,tax:0,type:'토지증여(부부간)',note:'월산리556 / 양도세 이월과세 10년(2023.01.01~)',wed:0,filed:1},
    {id:'s07',kind:'loan',donee:'유재진',donor:'유창노',date:'2026-05-01',amount:50000000,tax:0,type:'금전소비대차(차용증)',note:'일자 미정(2026.05) · 무이자시 인정이자 약 230만원 — 비과세기준 1천만원 이내 추정 · 차용증 권장',wed:0,filed:1},
    /* 김희연 */
    {id:'s08',kind:'gift',donee:'김희연',donor:'유창노',date:'2017-05-25',amount:445811775,tax:64320990,type:'토지증여',note:'월산20-5 / 19-9 / 19-12',wed:0,filed:1},
    {id:'s09',kind:'gift',donee:'김희연',donor:'유재진',date:'2018-07-31',amount:70000000,tax:0,type:'현금증여(부부간)',note:'',wed:0,filed:1},
    {id:'s10',kind:'gift',donee:'김희연',donor:'유창노',date:'2020-10-13',amount:56080000,tax:10879520,type:'토지증여',note:'월산리20-13',wed:0,filed:1},
    {id:'s11',kind:'gift',donee:'김희연',donor:'유재진',date:'2021-10-28',amount:137000000,tax:0,type:'주식증여(부부간)',note:'',wed:0,filed:1},
    {id:'s12',kind:'gift',donee:'김희연',donor:'유재진',date:'2024-08-12',amount:65534480,tax:0,type:'주식증여(부부간)',note:'엔비디아 440주 / 양도세 이월과세 1년(2025.01.01~)',wed:0,filed:1},
    /* 유해인 */
    {id:'s13',kind:'gift',donee:'유해인',donor:'유창노',date:'2017-05-25',amount:267487065,tax:40498370,type:'토지증여',note:'월산20-5 / 19-9 / 19-12',wed:0,filed:1},
    {id:'s14',kind:'gift',donee:'유해인',donor:'김세화',date:'2017-06-01',amount:10000000,tax:0,type:'현금증여(친족)',note:'',wed:0,filed:1},
    {id:'s15',kind:'gift',donee:'유해인',donor:'유재진',date:'2017-07-30',amount:40000000,tax:3800000,type:'현금증여',note:'',wed:0,filed:1},
    {id:'s16',kind:'gift',donee:'유해인',donor:'유창노',date:'2018-07-31',amount:128980400,tax:38666403,type:'토지증여',note:'월산리20-13 / 신고세액은 연부연납 가산금 포함 실납부액',wed:0,filed:1},
    {id:'s17',kind:'gift',donee:'유해인',donor:'김희연',date:'2024-11-02',amount:100000000,tax:0,type:'결혼증여',note:'비과세(혼인증여재산공제)',wed:1,filed:1},
    /* 유지원 */
    {id:'s18',kind:'gift',donee:'유지원',donor:'유창노',date:'2017-05-25',amount:267487065,tax:40498370,type:'토지증여',note:'월산20-5 / 19-9 / 19-12',wed:0,filed:1},
    {id:'s19',kind:'gift',donee:'유지원',donor:'김세화',date:'2017-06-01',amount:10000000,tax:0,type:'현금증여(친족)',note:'',wed:0,filed:1},
    {id:'s20',kind:'gift',donee:'유지원',donor:'유재진',date:'2018-07-31',amount:40000000,tax:3800000,type:'현금증여',note:'',wed:0,filed:1},
    {id:'s21',kind:'gift',donee:'유지원',donor:'유창노',date:'2020-11-02',amount:128980400,tax:38666403,type:'토지증여',note:'월산리20-13 / 신고세액은 연부연납 가산금 포함 실납부액',wed:0,filed:1},
    /* 유태현 */
    {id:'s22',kind:'gift',donee:'유태현',donor:'유창노',date:'2017-05-25',amount:356649420,tax:69311820,type:'토지증여',note:'월산20-5 / 19-9 / 19-12 / 유재진수증 완납',wed:0,filed:1},
    {id:'s23',kind:'gift',donee:'유태현',donor:'김세화',date:'2017-06-01',amount:10000000,tax:0,type:'현금증여(친족)',note:'',wed:0,filed:1},
    {id:'s24',kind:'gift',donee:'유태현',donor:'유재진',date:'2018-07-31',amount:70000000,tax:6650000,type:'현금증여',note:'유재진수증 완납',wed:0,filed:1},
    {id:'s25',kind:'gift',donee:'유태현',donor:'유창노',date:'2020-11-02',amount:130105600,tax:39706360,type:'토지증여',note:'월산리20-13 / 연부연납 완납 · 신고세액은 가산금 포함 실납부액',wed:0,filed:1},
    {id:'s26',kind:'loan',donee:'유태현',donor:'유창노',date:'2026-05-13',amount:50000000,tax:0,type:'금전소비대차(차용증)',note:'차용증 작성 권장',wed:0,filed:1},
    {id:'s27',kind:'gift',donee:'유태현',donor:'유재진',date:'2026-10-07',amount:100000000,tax:0,type:'결혼증여',note:'비과세(혼인증여재산공제 한도 내 추정)',wed:1,filed:0},
    {id:'s28',kind:'loan',donee:'유태현',donor:'유재진',date:'2026-10-07',amount:200000000,tax:0,type:'금전소비대차(차용증)',note:'차용증·적정이자율 검토 권장',wed:0,filed:0},
    /* 남유준 */
    {id:'s29',kind:'gift',donee:'남유준',donor:'유재진',date:'2026-02-28',amount:6000000,tax:0,type:'현금증여',note:'신규 등록(2026.08) · 증여재산공제 한도 확인 권장',wed:0,filed:0}
  ]
};

/* ══════════════════════════════════════════════════════════
   2. 유틸
   ══════════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const cm = n => (Math.round(n||0)).toLocaleString('ko-KR');
const won = n => cm(n) + '원';
const RELNAME = { spouse:'배우자', asc:'직계존속', desc:'직계비속', rel:'기타친족', other:'타인' };

function korMoney(n){
  n = Math.round(n||0);
  if(!n) return '0원';
  const sign = n<0 ? '-' : ''; n = Math.abs(n);
  const eok = Math.floor(n/100000000), man = Math.floor((n%100000000)/10000), rest = n%10000;
  let s = '';
  if(eok) s += eok + '억 ';
  if(man) s += cm(man) + '만 ';
  if(rest || !s) s += cm(rest);
  return sign + s.trim() + '원';
}
function todayISO(){ const d=new Date(); return iso(new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()))); }
function iso(d){ return d.toISOString().slice(0,10); }
function parseD(s){ const [y,m,d]=String(s||'').split('-').map(Number); return {y,m,d}; }
function mkD(y,m,d){
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return iso(new Date(Date.UTC(y, m-1, Math.min(d,last))));
}
function addYears(ds,n){ const p=parseD(ds); if(!p.y) return ds; return mkD(p.y+n,p.m,p.d); }
function addDays(ds,n){ const p=parseD(ds); if(!p.y) return ds; const dt=new Date(Date.UTC(p.y,p.m-1,p.d)); dt.setUTCDate(dt.getUTCDate()+n); return iso(dt); }
function fmtD(ds){ return ds ? ds.replace(/-/g,'.') : '-'; }
function toast(msg, err){
  const t=$('toast'); t.querySelector('.t').textContent=msg;
  t.className = 'on' + (err?' err':''); clearTimeout(t._h);
  t._h=setTimeout(()=>t.className='',2400);
}
function moneyInput(el){
  el.addEventListener('input',()=>{
    const p=el.selectionStart, len=el.value.length;
    const raw=el.value.replace(/[^0-9]/g,'');
    el.value = raw ? Number(raw).toLocaleString('ko-KR') : '';
    const d=el.value.length-len; try{ el.setSelectionRange(Math.max(0,p+d),Math.max(0,p+d)); }catch(e){}
  });
}
const getMoney = el => Number(String(el.value||'').replace(/[^0-9]/g,'')) || 0;
const setMoney = (el,v) => { el.value = v ? Number(v).toLocaleString('ko-KR') : ''; };

/* ══════════════════════════════════════════════════════════
   3. 상태
   ══════════════════════════════════════════════════════════ */
let DB = load();
let curDonee = DB.donees[0] || '';
let editId = null, editPerson = null;

function load(){
  try{
    const raw = localStorage.getItem('giftDB');
    if(raw){ const d=JSON.parse(raw); if(d && d.gifts) return d; }
  }catch(e){}
  return JSON.parse(JSON.stringify(SEED));
}
function save(silent){
  DB.updatedAt = new Date().toISOString();
  localStorage.setItem('giftDB', JSON.stringify(DB));
  if($('sAuto') && $('sAuto').checked && localStorage.getItem('giftCode')) pushSync(true);
  if(!silent) renderAll();
}

/* ══════════════════════════════════════════════════════════
   4. 세액 엔진  ★검증 완료★
   ══════════════════════════════════════════════════════════ */
const BRACKETS = [
  { lim: 100000000,  rate:0.10, ded:0 },
  { lim: 500000000,  rate:0.20, ded:10000000 },
  { lim: 1000000000, rate:0.30, ded:60000000 },
  { lim: 3000000000, rate:0.40, ded:160000000 },
  { lim: Infinity,   rate:0.50, ded:460000000 }
];
function grossTax(base){
  if(base <= 0) return 0;
  for(const b of BRACKETS) if(base <= b.lim) return base*b.rate - b.ded;
  return 0;
}
function bracketOf(base){
  if(base<=0) return null;
  for(const b of BRACKETS) if(base<=b.lim) return b;
  return null;
}
/* 신고세액공제율 (연도별) */
function filingRate(date){
  const y = Number(String(date).slice(0,4));
  if(y <= 2016) return 0.10;
  if(y === 2017) return 0.07;
  if(y === 2018) return 0.05;
  return 0.03;
}
const floor10 = x => Math.floor(Math.max(0,x)/10)*10;

function relOf(donee, donor){
  return DB.rel[donee+'>'+donor] || { r:'other', skip:0 };
}
/* 미성년 판정: 증여일 기준 만 19세 미만 */
function isMinor(name, date){
  const b = (DB.people[name]||{}).birth;
  if(!b) return false;
  return date < addYears(b, 19);
}
/* 동일인 합산 그룹: 증여자 + (직계존속인 경우) 그 배우자 */
function aggGroup(donee, donor){
  const g = [donor];
  if(relOf(donee,donor).r === 'asc'){
    const sp = (DB.people[donor]||{}).spouse;
    if(sp && sp !== donor && !g.includes(sp)) g.push(sp);
  }
  return g;
}
function deductLimit(r, donee, date){
  if(r === 'spouse') return 600000000;
  if(r === 'asc')    return isMinor(donee,date) ? 20000000 : 50000000;
  if(r === 'desc')   return 50000000;
  if(r === 'rel')    return 10000000;
  return 0;
}
/* 어떤 건에 실제 적용된 혼인·출산공제액 (평생 1억, 날짜순 선착) */
function wedApplied(g){
  if(!g.wed) return 0;
  const list = DB.gifts.filter(x=>x.kind==='gift' && x.donee===g.donee && x.wed)
                       .sort((a,b)=> a.date<b.date?-1:(a.date>b.date?1:(a.id<b.id?-1:1)));
  let used = 0;
  for(const x of list){
    const a = Math.min(x.amount, Math.max(0, 100000000-used));
    if(x.id === g.id) return a;
    used += a;
  }
  return 0;
}
function wedUsedBefore(donee, date, excludeId){
  const list = DB.gifts.filter(x=>x.kind==='gift' && x.donee===donee && x.wed && x.id!==excludeId && x.date < date)
                       .sort((a,b)=> a.date<b.date?-1:1);
  let used = 0;
  for(const x of list) used += Math.min(x.amount, Math.max(0,100000000-used));
  return Math.min(used, 100000000);
}

/**
 * 증여세 계산
 * @param {object} i {donee, donor, date, amount, wed, skip, excludeId}
 */
function computeTax(i){
  const donee=i.donee, donor=i.donor, date=i.date;
  const amount = Math.max(0, Math.round(i.amount||0));
  const rinfo = relOf(donee,donor);
  const r = rinfo.r;
  const skip = (i.skip==null) ? !!rinfo.skip : !!i.skip;
  const out = {
    donee, donor, date, amount, rel:r, relName:RELNAME[r], skip,
    minor:isMinor(donee,date), priors:[], priorSum:0, aggregated:false,
    taxableValue:amount, limit:0, generalDeduct:0, wedDeduct:0, base:0,
    gross:0, surcharge:0, preCredit:0, filingRate:filingRate(date), filingCredit:0,
    payable:0, effRate:0, bracket:null, notes:[]
  };
  if(!donee || !donor || !date) { out.notes.push('수증자 · 증여자 · 일자를 모두 선택하세요.'); return out; }

  /* 10년 창 판정 — 각 증여건 기준으로 +10년을 계산해 비교한다.
     기준일에서 -10년을 빼는 방식은 윤년(2036-02-29 → 2026-02-28)에 하루가 새어 들어온다. */
  const inWin = DB.gifts.filter(g =>
    g.kind==='gift' && !g.nosum && g.donee===donee && g.id!==i.excludeId &&
    g.date < date && date <= addYears(g.date, 10));

  /* ① 10년 합산 (동일인 그룹) */
  const group = aggGroup(donee,donor);
  out.group = group;
  const priors = inWin.filter(g=>group.includes(g.donor)).sort((a,b)=>a.date<b.date?-1:1);
  out.priors = priors;
  out.priorSum = priors.reduce((s,g)=>s+g.amount,0);
  out.aggregated = out.priorSum >= 10000000;   // 1천만원 미만은 가산하지 않음
  const addBack = out.aggregated ? out.priorSum : 0;
  out.taxableValue = amount + addBack;

  /* ② 혼인 · 출산 증여재산공제 (평생 1억, 직계존속 한정) */
  const wedUsed = wedUsedBefore(donee, date, i.excludeId);
  out.wedUsed = wedUsed;
  const wedAvail = (i.wed && r==='asc') ? Math.max(0, 100000000 - wedUsed) : 0;
  const wedMine = Math.min(wedAvail, amount);
  const wedPriors = out.aggregated ? priors.reduce((s,g)=>s+wedApplied(g),0) : 0;
  out.wedDeduct = wedMine + wedPriors;
  out.wedMine = wedMine;
  out.wedAvail = wedAvail;

  /* ③ 일반 증여재산공제 — 관계 그룹별 10년 한도를 날짜순으로 배분 */
  const limit = deductLimit(r, donee, date);
  out.limit = limit;
  const sameRel = inWin.filter(g=>relOf(donee,g.donor).r === r)
                       .sort((a,b)=> a.date<b.date?-1:(a.date>b.date?1:(a.id<b.id?-1:1)));
  let pool = limit, allocPriors = 0, usedByOthers = 0;
  for(const g of sameRel){
    const net = Math.max(0, g.amount - wedApplied(g));
    const a = Math.min(pool, net);
    pool -= a;
    if(group.includes(g.donor)){ if(out.aggregated) allocPriors += a; }
    else usedByOthers += a;
  }
  const myNet = Math.max(0, amount - wedMine);
  const allocMine = Math.min(pool, myNet);
  pool -= allocMine;
  out.generalDeduct = allocPriors + allocMine;
  out.allocMine = allocMine;
  out.allocPriors = allocPriors;
  out.usedByOthers = usedByOthers;
  out.remainLimit = Math.max(0, pool);

  /* ④ 과세표준 */
  out.base = Math.max(0, out.taxableValue - out.generalDeduct - out.wedDeduct);
  out.taxed = out.base >= 500000;                          // 과세표준 50만원 미만 부과 제외
  out.bracket = bracketOf(out.base);
  out.gross = out.taxed ? grossTax(out.base) : 0;

  /* ⑤ 세대생략 할증 */
  const surRate = skip ? ((out.minor && out.taxableValue > 2000000000) ? 0.40 : 0.30) : 0;
  out.surRate = surRate;
  out.surcharge = out.gross * surRate;

  /* ⑥ 기납부세액공제 */
  if(out.aggregated){
    const pBase = Math.max(0, out.priorSum - allocPriors - wedPriors);
    const pGross = pBase >= 500000 ? grossTax(pBase) : 0;
    const pSur = pGross * surRate;
    let credit = pGross + pSur;
    const cap = out.base > 0 ? (out.gross + out.surcharge) * (Math.min(pBase, out.base)/out.base) : 0;
    out.priorBase = pBase; out.priorGross = pGross;
    out.preCredit = Math.min(credit, cap);
  }

  /* ⑦ 신고세액공제 · 납부세액 */
  const before = Math.max(0, out.gross + out.surcharge - out.preCredit);
  out.beforeFiling = before;
  out.filingCredit = before * out.filingRate;
  out.payable = floor10(before - out.filingCredit);
  out.effRate = amount>0 ? out.payable/amount : 0;
  return out;
}

/* ── 역산 ① : 세금 0원이 되는 최대 금액 ──
   safe : 이번 증여로 과세표준이 전혀 늘지 않는 최대액 (종전 증여분 과세표준은 기납부세액공제로 상쇄)
   max  : 납부세액이 0원으로 계산되는 이론상 최대액 (과세표준 50만원 미만 부과제외 · 10원 절사 반영) */
function maxTaxFree(i){
  const at = amt => computeTax(Object.assign({}, i, { amount: amt }));
  const floorBase = at(0).base;                       // 이번 증여가 0원일 때의 과세표준
  const okBase = amt => at(amt).base <= floorBase;
  const okPay  = amt => at(amt).payable === 0;
  function bs(pred){
    if(!pred(0)) return 0;
    let lo = 0, hi = 1000000, guard = 0;
    while(pred(hi) && hi < 1e13 && guard++ < 60) hi *= 2;
    if(pred(hi)) return hi;
    while(hi - lo > 1){ const mid = Math.floor((lo+hi)/2); if(pred(mid)) lo = mid; else hi = mid; }
    return lo;
  }
  const safe = bs(okBase);
  return { safe, max: Math.max(safe, bs(okPay)) };
}

/* ── 역산 ② : 해당 금액이 세금 0원이 되는 가장 빠른 날짜 ── */
function earliestZeroDate(i){
  const from = i.from || todayISO();
  const set = new Set([from]);
  DB.gifts.filter(g=>g.kind==='gift' && !g.nosum && g.donee===i.donee).forEach(g=>{
    set.add(addDays(addYears(g.date,10),1));   // 10년 창을 벗어나는 첫날
  });
  const b = (DB.people[i.donee]||{}).birth;
  if(b) set.add(addYears(b,19));               // 성년 도래 (공제 2천만 → 5천만)
  const cands = [...set].filter(d=>d>=from && d<=addYears(from,40)).sort();
  const trail = [];
  for(const d of cands){
    const r = computeTax(Object.assign({},i,{date:d}));
    trail.push({date:d, payable:r.payable, detail:r});
    if(r.payable === 0) return { found:true, date:d, detail:r, trail };
  }
  return { found:false, trail, cands };
}


module.exports={computeTax,maxTaxFree,earliestZeroDate,DB,SEED,relOf,deductLimit,grossTax,addYears,addDays,todayISO};

global.localStorage = { _d:{}, getItem(k){return this._d[k]||null}, setItem(k,v){this._d[k]=v}, removeItem(k){delete this._d[k]} };
global.document = { getElementById:()=>null };
global.$ = ()=>null;
const E = require('./engine.test.js');
const { computeTax, maxTaxFree, earliestZeroDate, DB } = E;

const cm = n => Math.round(n).toLocaleString('en-US');
let pass=0, fail=0;
function check(label, got, want, tol){
  tol = tol||0;
  const ok = Math.abs(got-want) <= tol;
  (ok?pass++:fail++);
  console.log((ok?'  PASS ':'  FAIL ') + label.padEnd(46) + ' 계산 ' + cm(got).padStart(13) + ' / 신고 ' + cm(want).padStart(13) + (ok?'':'   차이 '+cm(got-want)));
}

console.log('\n=== 엑셀 실제 신고세액 vs 엔진 재계산 (전체 증여 29건) ===\n');
const gifts = DB.gifts.filter(g=>g.kind==='gift').sort((a,b)=> a.donee<b.donee?-1:(a.donee>b.donee?1:(a.date<b.date?-1:1)));
let cur='';
for(const g of gifts){
  if(g.donee!==cur){ cur=g.donee; console.log('[' + cur + ']'); }
  const r = computeTax({donee:g.donee,donor:g.donor,date:g.date,amount:g.amount,wed:!!g.wed,excludeId:g.id});
  check(g.date+' '+g.donor+' '+cm(g.amount), r.payable, g.tax, 0);
}
console.log('\n  → 일치 ' + pass + '건 / 불일치 ' + fail + '건\n');

console.log('=== 역산 ① : 오늘(2026-08-21) 기준 세금 0원 최대 금액 ===\n');
const today='2026-08-21';
for(const [donee,donor,wed] of [['유태현','유재진',false],['유태현','유재진',true],['유지원','유재진',false],['유해인','유재진',false],['남유준','유재진',false],['김희연','유재진',false],['유재진','김희연',false]]){
  const m = maxTaxFree({donee,donor,date:today,wed});
  const over = computeTax({donee,donor,date:today,amount:m.safe+10000000,wed});
  console.log('  '+donor+' → '+donee+(wed?' (혼인공제)':'').padEnd(10)+'  무세한도 '+cm(m.safe).padStart(12)+'원   +1천만시 세금 '+cm(over.payable).padStart(11)+'원');
}

console.log('\n=== 역산 ② : 금액별 세금 0원이 되는 날짜 ===\n');
for(const [donee,donor,amt] of [['유지원','유재진',50000000],['유해인','유재진',50000000],['유태현','유재진',150000000],['유재진','유창노',50000000],['김희연','유재진',600000000]]){
  const r = earliestZeroDate({donee,donor,amount:amt,from:today,wed:false});
  const now = computeTax({donee,donor,date:today,amount:amt});
  console.log('  '+donor+' → '+donee+' '+cm(amt).padStart(12)+'원  오늘세금 '+cm(now.payable).padStart(11)+'원  →  0원 되는 날 '+(r.found?r.date:'없음(한도초과)'));
}
process.exit(fail>3?1:0);

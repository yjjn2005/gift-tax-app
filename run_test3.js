global.localStorage={_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v}};
global.document={getElementById:()=>null}; global.$=()=>null;
const {computeTax,maxTaxFree,earliestZeroDate,deductLimit,DB}=require('./engine.test.js');
const cm=n=>Math.round(n).toLocaleString('en-US');
const T='2026-08-21';

console.log('\n=== 남유준 미성년 반영 결과 ===\n');
console.log('  생년월일          : ' + DB.people['남유준'].birth + ' (잠정)');
console.log('  직계존속 공제한도 : ' + cm(deductLimit('asc','남유준',T)) + '원  (성년이었다면 50,000,000원)');
const g=DB.gifts.find(x=>x.id==='s29');
const r=computeTax({donee:'남유준',donor:'유재진',date:g.date,amount:g.amount,excludeId:g.id});
console.log('  2026-02-28 기존 6,000,000원 증여세 : ' + cm(r.payable) + '원 (신고 0원) ' + (r.payable===0?'✓ 변화 없음':'✗'));

console.log('\n=== 무세 한도 변화 (유재진 → 남유준, 오늘 기준) ===\n');
const m=maxTaxFree({donee:'남유준',donor:'유재진',date:T,wed:false});
console.log('  무세 최대 금액 : ' + cm(m.safe) + '원   (미성년 반영 전에는 44,000,000원이었음)');
for(const amt of [14000000,20000000,50000000,100000000]){
  const x=computeTax({donee:'남유준',donor:'유재진',date:T,amount:amt});
  console.log('    ' + cm(amt).padStart(11) + '원 증여 시 세금 ' + cm(x.payable).padStart(10) + '원' + (x.surcharge?'  (세대생략 할증 '+cm(x.surcharge)+'원 포함)':''));
}

console.log('\n=== 무세 증여 분기점 (남유준) ===\n');
const set=new Set([T]);
DB.gifts.filter(x=>x.kind==='gift'&&!x.nosum&&x.donee==='남유준').forEach(x=>{
  const d=new Date(Date.UTC(+x.date.slice(0,4)+10,+x.date.slice(5,7)-1,+x.date.slice(8,10)));
  d.setUTCDate(d.getUTCDate()+1); set.add(d.toISOString().slice(0,10));
});
set.add('2045-01-01');
[...set].sort().forEach(d=>{
  const c=maxTaxFree({donee:'남유준',donor:'유재진',date:d,wed:false});
  console.log('  ' + d + '  무세 한도 ' + cm(c.safe).padStart(12) + '원   ' + (d==='2045-01-01'?'← 성년 도래, 한도 5천만으로 상향':''));
});

console.log('\n=== 5천만원을 무세로 주려면? ===\n');
const e=earliestZeroDate({donee:'남유준',donor:'유재진',amount:50000000,from:T,wed:false});
console.log('  ' + (e.found ? '→ ' + e.date : '→ 25년 내 불가 (미성년 한도 2천만 초과)'));

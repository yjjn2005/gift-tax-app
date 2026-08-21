/* 일반 증여세 · 상속세 계산기 검증
   index.html 의 계산 로직을 그대로 옮겨와(입력값만 인자로 대체) 표준 사례와 대조한다. */
const BRACKETS = [
  { lim: 100000000,  rate:0.10, ded:0 },
  { lim: 500000000,  rate:0.20, ded:10000000 },
  { lim: 1000000000, rate:0.30, ded:60000000 },
  { lim: 3000000000, rate:0.40, ded:160000000 },
  { lim: Infinity,   rate:0.50, ded:460000000 }
];
const grossTax = b => { if(b<=0) return 0; for(const x of BRACKETS) if(b<=x.lim) return b*x.rate-x.ded; return 0; };
const floor10 = x => Math.floor(Math.max(0,x)/10)*10;
const filingRate = d => { const y=+String(d).slice(0,4); return y<=2016?0.10:y===2017?0.07:y===2018?0.05:0.03; };
const cm = n => Math.round(n).toLocaleString('en-US');

/* ── 일반 증여세 (index.html calcGiftG 와 동일) ── */
function giftG(i){
  const {date='2026-08-21', rel='asc', amt=0, debt=0, fee=0, prior=0, ptaxIn=0,
         wedIn=0, minor=false, skip=false} = i;
  const net = Math.max(0, amt-debt);
  const limit = rel==='spouse'?600000000 : rel==='asc'?(minor?20000000:50000000)
              : rel==='desc'?50000000 : rel==='rel'?10000000 : 0;
  const aggregated = prior >= 10000000;
  const taxableValue = net + (aggregated?prior:0);
  const wed = rel==='asc' ? Math.min(Math.min(wedIn,100000000), net) : 0;
  const generalDeduct = Math.min(Math.max(0, taxableValue-wed), limit);
  const base = Math.max(0, taxableValue - generalDeduct - wed - fee);
  const gross = base>=500000 ? grossTax(base) : 0;
  const surRate = skip ? ((minor && taxableValue>2000000000)?0.40:0.30) : 0;
  const surcharge = gross*surRate;
  let preCredit=0;
  if(aggregated){
    const priorBase = Math.max(0, prior - Math.min(prior, limit));
    let priorGross = (priorBase>=500000?grossTax(priorBase):0) * (1+surRate);
    const cap = base>0 ? (gross+surcharge)*(Math.min(priorBase,base)/base) : 0;
    preCredit = Math.min(ptaxIn||priorGross, cap);
  }
  const before = Math.max(0, gross+surcharge-preCredit);
  const payable = floor10(before - before*filingRate(date));
  return {base, gross, surcharge, preCredit, payable};
}

/* ── 상속세 (index.html calcInh 와 동일) ── */
function inh(i){
  const {date='2026-08-21', estate=0, fin=0, findebt=0, house=0, pub=0, debt=0,
         fun=0, fun2=0, fee=0, pre=0, preBase=0, preTax=0, preBaseSp=0,
         hasSp=true, kids=0, spGet=0, minorY=0, elder=0, disY=0, skip=false} = i;
  const funA = Math.min(Math.max(fun,5000000),10000000);
  const funB = Math.min(fun2,5000000);
  const funeral = funA + funB;
  const TV = Math.max(0, estate-pub-debt-funeral) + pre;
  const personal = 200000000 + kids*50000000 + minorY*10000000 + elder*50000000 + disY*10000000;
  const spouseOnly = hasSp && kids===0;
  const baseDeduct = spouseOnly ? personal : Math.max(personal, 500000000);
  let spD=0, spLimit=0, spShare=0;
  if(hasSp){
    spShare = 1.5/(1.5+kids);
    spLimit = Math.floor(Math.min(Math.max(0,(estate-pub-debt+preBase)*spShare - preBaseSp), 3000000000));
    spD = Math.floor(Math.max(500000000, Math.min(spGet, spLimit)));
  }
  const netFin = Math.max(0, fin-findebt);
  const finD = netFin===0?0 : netFin<=20000000?netFin : Math.floor(Math.min(Math.max(netFin*0.2,20000000),200000000));
  const houseD = Math.min(house,600000000);
  const totalD = baseDeduct+spD+finD+houseD;
  const applied = Math.min(totalD, Math.max(0, TV-preBase));
  const base = Math.max(0, TV-applied-fee);
  const gross = base>=500000 ? grossTax(base) : 0;
  const surcharge = gross*(skip?0.30:0);
  const giftCap = base>0 ? (gross+surcharge)*(Math.min(preBase,base)/base) : 0;
  const giftCredit = Math.min(preTax, giftCap);
  const before = Math.max(0, gross+surcharge-giftCredit);
  const payable = floor10(before - before*filingRate(date));
  return {TV, baseDeduct, spD, spLimit, finD, houseD, applied, base, gross, payable};
}

let pass=0, fail=0;
function eq(label, got, want){
  const ok = got===want; ok?pass++:fail++;
  console.log('  '+(ok?'PASS':'FAIL')+'  '+label.padEnd(52)+cm(got).padStart(15)+(ok?'':'   기대 '+cm(want)));
}

console.log('\n════ 일반 증여세 계산기 ════\n');
console.log('[표준 사례 — 공제만 적용]');
eq('부모→성년자녀 5,000만원 (공제 5천만)',      giftG({rel:'asc',amt:50000000}).payable, 0);
eq('부모→성년자녀 1억원',                        giftG({rel:'asc',amt:100000000}).payable, 4850000);
eq('부모→미성년자녀 2,000만원 (공제 2천만)',     giftG({rel:'asc',amt:20000000,minor:true}).payable, 0);
eq('배우자간 6억원 (공제 6억)',                  giftG({rel:'spouse',amt:600000000}).payable, 0);
eq('배우자간 10억원 (과세표준 4억 · 20%)',        giftG({rel:'spouse',amt:1000000000}).payable, 67900000);
eq('형제간 1억원 (기타친족 공제 1천만)',         giftG({rel:'rel',amt:100000000}).payable, 8730000);
eq('타인 1억원 (공제 없음)',                     giftG({rel:'other',amt:100000000}).payable, 9700000);
console.log('\n[혼인·출산 증여재산공제]');
eq('부모→자녀 1.5억 + 혼인공제 1억',             giftG({rel:'asc',amt:150000000,wedIn:100000000}).payable, 0);
eq('부모→자녀 2억 + 혼인공제 1억',               giftG({rel:'asc',amt:200000000,wedIn:100000000}).payable, 4850000);
console.log('\n[세대생략 할증 30%]');
eq('조부모→성년손자 1억 (할증 30%)',             giftG({rel:'asc',amt:100000000,skip:true}).payable, 6305000);
console.log('\n[10년 합산 + 기납부세액공제]');
eq('부모→자녀 1억 (10년내 기증여 1억 있음)',     giftG({rel:'asc',amt:100000000,prior:100000000}).payable, 14550000);
eq('  └ 위 기증여 1억 단독 세액',                giftG({rel:'asc',amt:100000000}).payable, 4850000);
eq('부모→자녀 5천만 (기증여 500만 — 가산제외)',  giftG({rel:'asc',amt:50000000,prior:5000000}).payable, 0);

console.log('\n════ 상속세 계산기 ════\n');
console.log('[일괄공제 5억 + 배우자 최소공제 5억 = 10억]');
eq('배우자+자녀2, 상속재산 10억 → 0원',          inh({estate:1000000000,hasSp:true,kids:2}).payable, 0);
eq('배우자+자녀2, 상속재산 10.5억 (공제 10억 초과분 과세)', inh({estate:1050000000,hasSp:true,kids:2}).payable, 4365000);
{
  const r = inh({estate:1500000000,hasSp:true,kids:2});
  console.log('  상속 15억 · 배우자+자녀2  과세가액 '+cm(r.TV)+'  공제 '+cm(r.applied)+'  과세표준 '+cm(r.base)+'  납부 '+cm(r.payable));
  eq('  └ 공제 합계 10억 확인',                  r.applied, 1000000000);
  eq('  └ 과세표준 4.95억 (장례비 500만 차감)',   r.base, 495000000);
}
console.log('\n[배우자 없음 — 일괄공제 5억만]');
eq('자녀2만, 상속재산 5억 → 0원',                inh({estate:500000000,hasSp:false,kids:2}).payable, 0);
{
  const r = inh({estate:1000000000,hasSp:false,kids:2});
  console.log('  상속 10억 · 자녀2만       과세가액 '+cm(r.TV)+'  공제 '+cm(r.applied)+'  과세표준 '+cm(r.base)+'  납부 '+cm(r.payable));
}
console.log('\n[배우자 단독상속 — 일괄공제 불가, 기초 2억 + 배우자공제]');
{
  const r = inh({estate:1000000000,hasSp:true,kids:0,spGet:1000000000});
  console.log('  상속 10억 · 배우자 단독   기초공제 '+cm(r.baseDeduct)+'  배우자공제 '+cm(r.spD)+'(한도 '+cm(r.spLimit)+')  공제계 '+cm(r.applied)+'  납부 '+cm(r.payable));
  eq('  └ 일괄공제 미적용 (기초 2억)',            r.baseDeduct, 200000000);
  eq('  └ 배우자공제 = 전액 (법정상속분 100%)',   r.spD, 1000000000);
}
console.log('\n[금융재산상속공제]');
eq('순금융재산 1,500만 → 전액 공제',             inh({estate:1000000000,fin:15000000,hasSp:true,kids:2}).finD, 15000000);
eq('순금융재산 1억 → 2,000만 공제',              inh({estate:1000000000,fin:100000000,hasSp:true,kids:2}).finD, 20000000);
eq('순금융재산 5억 → 1억 공제 (20%)',            inh({estate:1000000000,fin:500000000,hasSp:true,kids:2}).finD, 100000000);
eq('순금융재산 20억 → 2억 공제 (한도)',          inh({estate:3000000000,fin:2000000000,hasSp:true,kids:2}).finD, 200000000);
console.log('\n[배우자상속공제 한도 — 법정상속분]');
{
  const r = inh({estate:3000000000,hasSp:true,kids:2,spGet:3000000000});
  const share = 1.5/3.5;
  console.log('  상속 30억 · 배우자+자녀2  법정상속분 '+(share*100).toFixed(1)+'%  한도 '+cm(r.spLimit)+'  실제공제 '+cm(r.spD));
  eq('  └ 한도 = 30억 × 3/7 (원 단위 절사)',      r.spLimit, Math.floor(3000000000*share));
}
eq('배우자공제 30억 상한',                       inh({estate:20000000000,hasSp:true,kids:1,spGet:20000000000}).spD, 3000000000);
console.log('\n[동거주택상속공제 6억 한도]');
eq('주택 8억 → 6억 공제',                        inh({estate:2000000000,house:800000000,hasSp:false,kids:1}).houseD, 600000000);
console.log('\n[상속공제 종합한도 §24 — 사전증여가 공제를 제한]');
{
  const a = inh({estate:1000000000,hasSp:true,kids:2});
  const b = inh({estate:1000000000,hasSp:true,kids:2,pre:500000000,preBase:450000000,preTax:80000000});
  console.log('  사전증여 없음        공제 '+cm(a.applied)+'  과세표준 '+cm(a.base)+'  납부 '+cm(a.payable));
  console.log('  사전증여 5억 가산    공제 '+cm(b.applied)+'  과세표준 '+cm(b.base)+'  납부 '+cm(b.payable));
  eq('  └ 종합한도로 공제 제한 확인',             b.applied, Math.min(1000000000, b.TV-450000000));
}
console.log('\n[세율 구간 — 상속세]');
for(const [tv,label] of [[1500000000,'과세표준 5억'],[2000000000,'과세표준 10억'],[4000000000,'과세표준 30억']]){
  const r = inh({estate:tv+5000000,hasSp:true,kids:2});
  console.log('  '+label.padEnd(14)+' 과세표준 '+cm(r.base).padStart(14)+'  산출세액 '+cm(r.gross).padStart(14)+'  납부 '+cm(r.payable).padStart(14));
}

console.log('\n→ 일치 '+pass+'건 / 불일치 '+fail+'건\n');
process.exit(fail ? 1 : 0);

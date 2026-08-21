global.localStorage={_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v}};
global.document={getElementById:()=>null}; global.$=()=>null;
const E=require('./engine.test.js'); const {computeTax,maxTaxFree,DB}=E;
const cm=n=>Math.round(n).toLocaleString('en-US');

console.log('\n=== 유태현 미성년 가설 검증 (생년월일 입력 시 신고액 재현 여부) ===\n');
for(const b of ['1999-03-15','2000-01-01','1998-12-01']){
  DB.people['유태현'].birth=b;
  const g=DB.gifts.find(x=>x.id==='s22');
  const r=computeTax({donee:'유태현',donor:'유창노',date:g.date,amount:g.amount,excludeId:g.id});
  const g2=DB.gifts.find(x=>x.id==='s24');
  const r2=computeTax({donee:'유태현',donor:'유재진',date:g2.date,amount:g2.amount,excludeId:g2.id});
  console.log('  생년월일 '+b+'  2017건 '+cm(r.payable).padStart(12)+' (신고 69,311,820) '+(r.payable===69311820?'✓':'✗')
    +'   2018건 '+cm(r2.payable).padStart(10)+' (신고 6,650,000) '+(r2.payable===6650000?'✓':'✗'));
}
DB.people['유태현'].birth='';

console.log('\n=== 혼인공제 활용 시나리오 (유재진 → 유태현, 오늘 2026-08-21) ===\n');
for(const amt of [50000000,100000000,150000000,200000000]){
  const a=computeTax({donee:'유태현',donor:'유재진',date:'2026-08-21',amount:amt,wed:false});
  const b=computeTax({donee:'유태현',donor:'유재진',date:'2026-08-21',amount:amt,wed:true});
  console.log('  '+cm(amt).padStart(12)+'원   혼인공제 미적용 '+cm(a.payable).padStart(11)+'원   혼인공제 적용 '+cm(b.payable).padStart(11)+'원');
}

console.log('\n=== 경계값 · 세율구간 검증 (공제 없는 순수 산출세액) ===\n');
DB.rel['테스트>타인']={r:'other',skip:0}; DB.people['타인']={}; DB.donees.push('테스트'); DB.people['테스트']={};
for(const amt of [100000000,500000000,1000000000,3000000000,5000000000]){
  const r=computeTax({donee:'테스트',donor:'타인',date:'2026-08-21',amount:amt});
  console.log('  과세표준 '+cm(amt).padStart(15)+'  산출세액 '+cm(r.gross).padStart(15)+'  납부세액 '+cm(r.payable).padStart(15)+'  (세율 '+(r.bracket.rate*100)+'%)');
}
console.log('\n=== 무세한도 + 1원 초과 시 과세 전환 확인 ===\n');
for(const [d,o] of [['남유준','유재진'],['김희연','유재진'],['유재진','김희연']]){
  const m=maxTaxFree({donee:d,donor:o,date:'2026-08-21',wed:false});
  const at=x=>computeTax({donee:d,donor:o,date:'2026-08-21',amount:x});
  console.log('  '+o+'→'+d+'  한도 '+cm(m.safe).padStart(12)+'  한도시 '+cm(at(m.safe).payable)+'원  한도+100만 '+cm(at(m.safe+1000000).payable).padStart(9)+'원');
}

console.log('\n=== 10년 합산 창 경계 · 윤년 회귀 테스트 ===\n');
{
  const {addYears}=require('./engine.test.js');
  DB.people['경계']={birth:''}; DB.donees.push('경계'); DB.people['부']={spouse:''};
  DB.rel['경계>부']={r:'asc',skip:0};
  const cases=[['2026-02-28','윤년 아닌 해 2월 말'],['2016-02-29','윤년 2월 29일'],['2020-10-13','평일']];
  let ok=true;
  for(const [gd,label] of cases){
    DB.gifts=DB.gifts.filter(g=>g.id!=='B1');
    DB.gifts.push({id:'B1',kind:'gift',donee:'경계',donor:'부',date:gd,amount:50000000,tax:0,type:'',note:'',wed:0,filed:0});
    const last=addYears(gd,10), after=(()=>{const d=new Date(last+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+1);return d.toISOString().slice(0,10)})();
    const inWin =computeTax({donee:'경계',donor:'부',date:last, amount:10000000}).priorSum;
    const outWin=computeTax({donee:'경계',donor:'부',date:after,amount:10000000}).priorSum;
    const pass = inWin===50000000 && outWin===0;
    ok = ok && pass;
    console.log('  '+(pass?'PASS':'FAIL')+'  증여 '+gd+' ('+label+')   10년째 '+last+' 합산 '+inWin.toLocaleString('en-US')
      +'  /  다음날 '+after+' 합산 '+outWin.toLocaleString('en-US'));
  }
  DB.gifts=DB.gifts.filter(g=>g.id!=='B1');
  console.log('\n  → 경계 판정 ' + (ok?'전부 정상 ✓':'문제 있음 ✗'));
}

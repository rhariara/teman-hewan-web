import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Volume2, VolumeX, Mic, MicOff, RotateCcw, ArrowRight, Sparkles, Heart, Play, Info } from 'lucide-react';
import './style.css';

const ANIMALS = [
  { id:'sapi', name:'Sapi', emoji:'🐮', line:'Lihat, teman kecil! Ini sapi. Sapi punya badan besar dan suka makan rumput.', sound:'Moooo!', color:'#f5e8d7', hint:'Sapi', variants:['sapi','sapy','sapii'], habitat:'meadow' },
  { id:'kucing', name:'Kucing', emoji:'🐱', line:'Hai, kucing! Kucing punya kumis dan telinga kecil. Yuk, dengarkan!', sound:'Meong, meong!', color:'#f8dfb9', hint:'Kucing', variants:['kucing','ucing','kujing','kucingg'], habitat:'garden' },
  { id:'anjing', name:'Anjing', emoji:'🐶', line:'Ini anjing yang ramah! Anjing suka mengibaskan ekornya.', sound:'Guk guk!', color:'#f3d5ad', hint:'Anjing', variants:['anjing','anjingg','anjin','jings'], habitat:'garden' },
  { id:'bebek', name:'Bebek', emoji:'🦆', line:'Kwek kwek! Ini bebek. Bebek punya paruh lebar dan suka air.', sound:'Kwek kwek!', color:'#f6e7a9', hint:'Bebek', variants:['bebek','bebek','bebekkk'], habitat:'pond' },
  { id:'ayam', name:'Ayam', emoji:'🐔', line:'Kukuruyuk! Ini ayam. Ayam punya jengger di atas kepalanya.', sound:'Kukuruyuk!', color:'#f6d7bb', hint:'Ayam', variants:['ayam','ayamm','ayam'], habitat:'farm' },
  { id:'harimau', name:'Harimau', emoji:'🐯', line:'Wah, harimau! Bulunya oranye dengan garis-garis hitam. Kita dengar suaranya, ya.', sound:'Rawrr…', color:'#f8d3a0', hint:'Harimau', variants:['harimau','rimau','harimaw','harimauu'], habitat:'jungle' },
  { id:'kelinci', name:'Kelinci', emoji:'🐰', line:'Halo, kelinci! Lihat telinganya yang panjang. Kelinci suka melompat.', sound:'Hop hop!', color:'#f0e5db', hint:'Kelinci', variants:['kelinci','linci','kelincii','kelin ci'], habitat:'meadow' },
  { id:'gajah', name:'Gajah', emoji:'🐘', line:'Ini gajah yang besar dan lembut. Gajah punya belalai yang panjang.', sound:'Prrruuuh!', color:'#d7e0e6', hint:'Gajah', variants:['gajah','gaja','gaj ah','gajahh'], habitat:'jungle' },
  { id:'ikan', name:'Ikan', emoji:'🐠', line:'Lihat ikan berenang di air. Ikan punya sirip dan ekor untuk bergerak.', sound:'Byur… blub blub!', color:'#ccecf0', hint:'Ikan', variants:['ikan','ikan','ikan'], habitat:'ocean' },
  { id:'burung', name:'Burung', emoji:'🐦', line:'Cuit cuit! Ini burung. Burung punya sayap untuk terbang.', sound:'Cuit cuit!', color:'#d8e8ce', hint:'Burung', variants:['burung','burun','burungg','burung'], habitat:'garden' }
];

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
const normalize = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]/g,'').trim();

function AnimalArt({ animal, happy=false }) {
  // Custom, softly layered vector character treatment; no emoji glyphs used for the main character.
  const common = <><ellipse cx="160" cy="282" rx="91" ry="16" fill="#56796a" opacity=".16"/><ellipse cx="160" cy="272" rx="80" ry="10" fill="#fff" opacity=".15"/></>;
  const eyes = (x1=137,x2=183,y=122) => <g><ellipse cx={x1} cy={y} rx="8" ry="11" fill="#263d39"/><ellipse cx={x2} cy={y} rx="8" ry="11" fill="#263d39"/><circle cx={x1+2} cy={y-4} r="3" fill="white"/><circle cx={x2+2} cy={y-4} r="3" fill="white"/><ellipse cx={x1-15} cy={y+19} rx="11" ry="6" fill="#ed9e92" opacity=".55"/><ellipse cx={x2+15} cy={y+19} rx="11" ry="6" fill="#ed9e92" opacity=".55"/></g>;
  const smile = <path d={happy ? "M145 151 Q160 170 176 151" : "M148 151 Q160 163 172 151"} fill="none" stroke="#654b43" strokeWidth="3.5" strokeLinecap="round"/>;
  let art;
  switch(animal.id) {
    case 'sapi': art=<><path d="M103 111 Q71 91 77 70 Q101 76 119 98" fill="#f8f0e5" stroke="#bcae9d" strokeWidth="3"/><path d="M217 111 Q249 91 243 70 Q219 76 201 98" fill="#f8f0e5" stroke="#bcae9d" strokeWidth="3"/><ellipse cx="160" cy="169" rx="79" ry="91" fill="#f9f5eb"/><path d="M116 111 Q128 92 144 113 L138 139 Q122 148 112 132Z M184 170 Q208 150 224 172 L219 204 Q199 217 185 198Z" fill="#66554c"/><ellipse cx="160" cy="195" rx="44" ry="30" fill="#efb9ae"/>{eyes(139,181,145)}<ellipse cx="148" cy="195" rx="3" ry="4" fill="#805d57"/><ellipse cx="172" cy="195" rx="3" ry="4" fill="#805d57"/>{smile}<path d="M129 242 L127 260 M190 242 L193 260" stroke="#f9f5eb" strokeWidth="20" strokeLinecap="round"/></>; break;
    case 'kucing': art=<><path d="M101 124 L95 56 Q96 47 105 56 L145 94 M179 94 L218 55 Q228 48 228 60 L220 126" fill="#edb77f" stroke="#bd845d" strokeWidth="3"/><path d="M111 105 L106 73 L132 99 M190 99 L217 72 L211 108" fill="#eaa4a1"/><ellipse cx="160" cy="169" rx="73" ry="79" fill="#f4c58d"/>{eyes(137,183,151)}<path d="M153 169 Q160 162 167 169 L160 177Z" fill="#a96c70"/><path d="M160 177 Q153 187 145 181 M160 177 Q168 187 176 181" fill="none" stroke="#805d57" strokeWidth="3" strokeLinecap="round"/><path d="M104 173 L140 177 M105 188 L140 184 M180 177 L216 173 M180 184 L215 189" stroke="#b47d53" strokeWidth="2.5" strokeLinecap="round"/><path d="M123 245 Q160 267 197 245" fill="none" stroke="#f4c58d" strokeWidth="18" strokeLinecap="round"/></>; break;
    case 'anjing': art=<><path d="M112 104 Q76 88 82 143 Q85 170 119 165" fill="#b8794d"/><path d="M208 104 Q244 88 238 143 Q235 170 201 165" fill="#b8794d"/><ellipse cx="160" cy="166" rx="72" ry="81" fill="#e6b980"/><ellipse cx="160" cy="189" rx="42" ry="31" fill="#f8e7d0"/>{eyes(137,183,148)}<ellipse cx="160" cy="177" rx="10" ry="8" fill="#453a36"/>{smile}<path d="M132 245 Q160 260 188 245" stroke="#e6b980" strokeWidth="19" strokeLinecap="round" fill="none"/></>; break;
    case 'bebek': art=<><ellipse cx="160" cy="180" rx="70" ry="83" fill="#f5d85e"/><path d="M139 175 Q161 159 183 175 Q163 198 139 175" fill="#ed9a45"/>{eyes(140,180,139)}<path d="M110 224 Q82 211 99 193 Q122 199 131 220" fill="#e8bd45"/><path d="M191 224 Q219 211 202 193 Q179 199 170 220" fill="#e8bd45"/><path d="M134 250 Q160 242 186 250 L197 262 L124 262Z" fill="#ed9a45"/>{smile}</>; break;
    case 'ayam': art=<><path d="M126 102 Q115 69 138 81 Q148 57 161 82 Q184 58 191 92 L185 111" fill="#dc6c5e"/><ellipse cx="160" cy="171" rx="73" ry="82" fill="#fff2d9"/><path d="M104 173 Q74 151 95 207 Q119 218 135 192" fill="#e6d2b3"/>{eyes(137,183,148)}<path d="M145 168 L175 168 L160 187Z" fill="#ed9b43"/>{smile}<path d="M134 247 L131 260 M184 247 L187 260" stroke="#e6a044" strokeWidth="7" strokeLinecap="round"/></>; break;
    case 'harimau': art=<><ellipse cx="160" cy="169" rx="75" ry="84" fill="#f2a34e"/><path d="M104 115 L126 131 L109 145 M208 111 L190 132 L210 147 M98 164 L124 170 L105 187 M221 164 L196 171 L216 187 M124 215 L141 208 L132 231 M197 215 L180 208 L190 231" fill="#493d35"/>{eyes(137,183,148)}<ellipse cx="160" cy="180" rx="14" ry="10" fill="#f7e5cb"/>{smile}<path d="M118 247 Q160 261 202 247" fill="none" stroke="#f2a34e" strokeWidth="19" strokeLinecap="round"/></>; break;
    case 'kelinci': art=<><ellipse cx="132" cy="77" rx="21" ry="61" transform="rotate(-9 132 77)" fill="#f7f0e8" stroke="#d8c9bf" strokeWidth="3"/><ellipse cx="188" cy="76" rx="21" ry="61" transform="rotate(9 188 76)" fill="#f7f0e8" stroke="#d8c9bf" strokeWidth="3"/><ellipse cx="132" cy="77" rx="9" ry="43" transform="rotate(-9 132 77)" fill="#e9b8b8"/><ellipse cx="188" cy="76" rx="9" ry="43" transform="rotate(9 188 76)" fill="#e9b8b8"/><ellipse cx="160" cy="173" rx="69" ry="76" fill="#fff9f0"/>{eyes(137,183,151)}<ellipse cx="160" cy="173" rx="7" ry="6" fill="#d58f9a"/>{smile}<circle cx="217" cy="232" r="19" fill="#fff9f0"/></>; break;
    case 'gajah': art=<><ellipse cx="160" cy="171" rx="72" ry="82" fill="#aebfc7"/><ellipse cx="103" cy="174" rx="32" ry="47" fill="#c8d4d9"/><ellipse cx="217" cy="174" rx="32" ry="47" fill="#c8d4d9"/><path d="M150 174 Q143 216 157 229 Q174 234 179 215 L171 179" fill="#aebfc7" stroke="#8fa5ae" strokeWidth="4" strokeLinecap="round"/>{eyes(137,183,145)}<path d="M145 157 Q160 166 175 157" fill="none" stroke="#8fa5ae" strokeWidth="3" strokeLinecap="round"/><path d="M137 248 L135 260 M183 248 L185 260" stroke="#aebfc7" strokeWidth="19" strokeLinecap="round"/></>; break;
    case 'ikan': art=<><path d="M203 166 L253 126 Q267 168 253 207Z" fill="#f28b67" stroke="#df775b" strokeWidth="3"/><ellipse cx="154" cy="170" rx="76" ry="56" fill="#f6a27c"/><path d="M143 119 L173 87 L191 126 M143 219 L173 248 L191 214" fill="#f6c08b"/><path d="M102 151 Q135 135 161 152 M102 176 Q135 160 161 177 M111 197 Q135 184 156 197" fill="none" stroke="#e77f62" strokeWidth="5" strokeLinecap="round"/><ellipse cx="126" cy="157" rx="10" ry="12" fill="white"/><ellipse cx="129" cy="159" rx="5" ry="7" fill="#263d39"/><circle cx="131" cy="156" r="2" fill="white"/><path d="M151 181 Q163 193 174 181" fill="none" stroke="#9d5c4b" strokeWidth="3" strokeLinecap="round"/><circle cx="185" cy="152" r="3" fill="#fff" opacity=".8"/></>; break;
    default: art=<><ellipse cx="160" cy="171" rx="69" ry="75" fill="#8dc7d9"/><path d="M110 140 Q70 105 81 174 L111 190 M210 140 Q250 105 239 174 L209 190" fill="#8dc7d9" stroke="#69a9bf" strokeWidth="3"/><path d="M142 99 Q129 75 146 68 Q165 69 160 93 Q182 66 195 82 Q200 99 176 109" fill="#e8a65d"/>{eyes(137,183,149)}{smile}<path d="M132 241 L119 263 L143 251 M186 241 L200 263 L177 251" fill="#8dc7d9"/></>;
  }
  return <svg className={`animal-art ${happy?'happy':''}`} viewBox="0 0 320 300" role="img" aria-label={`Ilustrasi ${animal.name}`}>
    <defs><radialGradient id={`shine-${animal.id}`} cx="32%" cy="22%" r="80%"><stop offset="0%" stopColor="#fff" stopOpacity=".48"/><stop offset="100%" stopColor="#fff" stopOpacity="0"/></radialGradient></defs>
    {common}<g className="character">{art}<ellipse cx="132" cy="93" rx="28" ry="14" fill={`url(#shine-${animal.id})`} opacity=".7"/></g>
    {happy && <g className="sparkles" fill="#f4b94e"><path d="M64 111 l5 12 12 5 -12 5 -5 12 -5 -12 -12 -5 12 -5z"/><path d="M246 145 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4z"/></g>}
  </svg>;
}

function App(){
  const [order,setOrder] = useState(()=>shuffle(ANIMALS));
  const [index,setIndex] = useState(-1);
  const [stage,setStage] = useState('welcome');
  const [listening,setListening] = useState(false);
  const [recognized,setRecognized] = useState('');
  const [happy,setHappy] = useState(false);
  const [mutedVoice,setMutedVoice] = useState(false);
  const [mutedFx,setMutedFx] = useState(false);
  const [showAudioNote,setShowAudioNote] = useState(false);
  const recognition = useRef(null);
  const speechSupported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  const current = index >= 0 ? order[index] : null;

  const speak = useCallback((text, rate=0.88) => {
    if(mutedVoice || !('speechSynthesis' in window)) return Promise.resolve();
    window.speechSynthesis.cancel();
    return new Promise(resolve=>{
      const u = new SpeechSynthesisUtterance(text);
      u.lang='id-ID'; u.rate=rate; u.pitch=1.08; u.volume=.95;
      const voices=window.speechSynthesis.getVoices();
      const idVoice=voices.find(v=>/id-ID|Indonesian/i.test(v.lang+' '+v.name));
      if(idVoice) u.voice=idVoice;
      u.onend=resolve; u.onerror=resolve;
      window.speechSynthesis.speak(u);
      setTimeout(resolve, Math.max(2500, text.length*95));
    });
  },[mutedVoice]);

  const fx = useCallback((kind='pop')=>{
    if(mutedFx) return;
    try {
      const ctx=new (window.AudioContext||window.webkitAudioContext)();
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type='sine'; o.frequency.value=kind==='yay'?660:kind==='tap'?440:520;
      g.gain.setValueAtTime(.0001,ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.08,ctx.currentTime+.03);
      g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.22);
      o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.23);
      o.onended=()=>ctx.close();
    }catch(e){}
  },[mutedFx]);

  const start = () => { window.speechSynthesis?.cancel(); setOrder(shuffle(ANIMALS)); setIndex(0); setStage('intro'); setHappy(false); };
  const intro = useCallback(async animal=>{
    setStage('intro'); setHappy(false);
    await speak(`Hai, teman kecil! ${animal.line} Ini ${animal.name}! ${animal.name}!`);
    if(animal.id==='sapi') await speak('Mooo!',.9);
    else if(animal.id==='kucing') await speak('Meong meong!',.9);
    else if(animal.id==='anjing') await speak('Guk guk!',.9);
    else if(animal.id==='bebek') await speak('Kwek kwek!',.9);
    else if(animal.id==='ayam') await speak('Kukuruyuk!',.9);
    else if(animal.id==='harimau') await speak('Rawrr…',.9);
    else if(animal.id==='kelinci') await speak('Hop hop!',.9);
    else if(animal.id==='gajah') await speak('Prrruuuh!',.9);
    else if(animal.id==='ikan') await speak('Byur… blub blub!',.9);
    else await speak('Cuit cuit!',.9);
  },[speak]);

  useEffect(()=>{ if(stage==='intro' && current) intro(current); },[index,stage]); // eslint-disable-line
  const ask = async()=>{setStage('ask'); setRecognized(''); await speak(`Kalau ini namanya apa, ya? Coba bilang… ${current.name}!`);};
  const celebrate = async()=>{setStage('celebrate');setListening(false);setHappy(true);window.speechSynthesis?.cancel();fx('yay');await speak(`Wah, pintar! Iyaaa, ${current.name}! Yuk, kita lanjut!`);};
  const retry = async()=>{setListening(false);setStage('retry');await speak(`Yuk, coba sekali lagi, ya. ${current.name}.`);};
  const listen = ()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){setShowAudioNote(true);return;}
    try{
      window.speechSynthesis?.cancel();
      const r=new SR(); recognition.current=r;r.lang='id-ID';r.interimResults=true;r.maxAlternatives=4;
      setListening(true);setRecognized('');
      r.onresult=e=>{
        let transcript='';
        for(let i=e.resultIndex;i<e.results.length;i++){transcript += ' '+e.results[i][0].transcript;}
        setRecognized(transcript.trim());
        if(e.results[e.results.length-1].isFinal){
          setListening(false);
          const heard=normalize(transcript), target=normalize(current.name);
          const aliases=current.variants.map(normalize);
          if(heard.includes(target)||aliases.some(a=>a && (heard.includes(a)||a.includes(heard)))) celebrate();
          else retry();
        }
      };
      r.onerror=()=>{setListening(false);retry();};
      r.onend=()=>setListening(false);
      r.start();
    }catch(e){setListening(false);retry();}
  };
  useEffect(()=>()=>{window.speechSynthesis?.cancel();recognition.current?.abort?.();},[]);
  const next=()=>{window.speechSynthesis?.cancel(); if(index===9){setStage('complete');setHappy(false);}else{setIndex(i=>i+1);setStage('intro');setHappy(false);} };
  const repeat=()=>{if(stage==='intro') intro(current);else if(stage==='ask'||stage==='retry') ask();else speak(`Ini ${current.name}. ${current.name}!`);};
  const chooseAnswer=async()=>{setStage('tapAnswer');await speak('Coba kita lihat bersama, ya!');};
  const showAnswer=async()=>{setStage('celebrate');setHappy(true);await speak(`Ini ${current.name}! ${current.name}! Hebat sudah mencoba!`);};
  const stageLabel = stage==='intro'?'Kenalan dulu':stage==='ask'?'Ayo bilang':stage==='retry'?'Coba lagi, yuk!':stage==='celebrate'?'Hebat sekali!':'Ayo bicara!';
  const backdrop = current?.habitat==='ocean'?'ocean':current?.habitat==='farm'?'farm':current?.habitat==='jungle'?'jungle':'meadow';

  return <main className={`app ${backdrop}`}>
    <div className="sky"><span className="cloud c1"/><span className="cloud c2"/><span className="cloud c3"/><span className="sun"/></div>
    <div className="hills"><div className="hill h1"/><div className="hill h2"/><div className="hill h3"/></div>
    <header className="topbar">
      <div className="brand"><div className="brand-icon">♡</div><div><b>teman hewan</b><small>teman kecil, suara besar</small></div></div>
      <div className="top-actions">
        <button className="round-btn" onClick={()=>setMutedVoice(v=>!v)} aria-label={mutedVoice?'Nyalakan narasi':'Matikan narasi'}>{mutedVoice?<VolumeX/>:<Volume2/>}</button>
        <button className={`round-btn ${mutedFx?'is-muted':''}`} onClick={()=>setMutedFx(v=>!v)} aria-label={mutedFx?'Nyalakan efek':'Matikan efek'}>{mutedFx?<MicOff/>:<Sparkles/>}</button>
        <button className="round-btn info-btn" onClick={()=>setShowAudioNote(v=>!v)} aria-label="Informasi audio"><Info/></button>
      </div>
    </header>

    {showAudioNote && <aside className="audio-note"><b>Catatan untuk orang tua</b><p>Narasi saat ini memakai suara bawaan browser (bukan rekaman AI final). Efek tombol berupa nada sederhana, bukan rekaman suara hewan autentik. Pengenalan suara bergantung pada dukungan browser; suara anak tidak disimpan.</p><button onClick={()=>setShowAudioNote(false)}>Mengerti</button></aside>}

    {stage==='welcome' && <section className="welcome panel">
      <div className="eyebrow"><Sparkles size={15}/> WAKTUNYA BERMAIN & BICARA</div>
      <h1>Yuk, kenalan<br/>sama <span>teman hewan!</span></h1>
      <p>Dengar suaranya, lihat geraknya, lalu coba sebut namanya bersama Kakak.</p>
      <div className="welcome-art"><div className="bubble b1">Halo!</div><div className="bubble b2">Cuit cuit!</div><div className="mini-animal ma1">🐰</div><div className="mini-animal ma2">🐮</div><div className="mini-animal ma3">🐥</div><div className="flower f1">✿</div><div className="flower f2">✿</div></div>
      <button className="primary start-btn" onClick={()=>{fx('tap');start();}}>Ayo mulai! <ArrowRight size={21}/></button>
      <div className="welcome-foot"><Heart size={15} fill="currentColor"/> Tidak perlu buru-buru. Kita belajar bersama.</div>
    </section>}

    {current && stage!=='welcome' && stage!=='complete' && <section className="game">
      <div className="progress-wrap"><div className="progress-meta"><span>Petualangan kita</span><b>Hewan {index+1} <i>dari</i> 10</b></div><div className="progress-track">{order.map((a,i)=><span key={a.id} className={i<=index?'filled':''}/>)}</div></div>
      <div className="scene-card">
        <div className="scene-label"><span className="tiny-dot"/>{stageLabel}</div>
        <div className="character-stage">
          <div className="decor leaf l1">✦</div><div className="decor leaf l2">✿</div><div className="decor leaf l3">✦</div>
          <div className="animal-wrap">   {current.id === 'sapi' ? (     <img       src="/animals/sapi.png"       alt="Sapi"       className="animal-art"     />   ) : (     <AnimalArt animal={current} happy={happy} />   )} </div>
          <div className="ground-shadow"/>
          <div className="name-pill">{(stage==='intro'||stage==='celebrate'||stage==='tapAnswer')?current.name:'Siapa namanya?'}</div>
        </div>
        <div className="interaction">
          {stage==='intro' && <><h2>Halo, {current.name}!</h2><p>Dengarkan dan lihat baik-baik, ya.</p><button className="primary" onClick={ask}>Ayo coba bilang <ArrowRight size={20}/></button></>}
          {(stage==='ask'||stage==='retry') && <><h2>{stage==='retry'?'Tidak apa-apa, yuk coba!':'Kalau ini namanya apa, ya?'}</h2><p>Kakak bantu, ya. Bilang: <strong>{current.name}!</strong></p><div className="action-row"><button className={`mic-btn ${listening?'listening':''}`} onClick={listen} disabled={listening}><Mic size={27}/><span>{listening?'Kakak mendengarkan…':'Tekan untuk bicara'}</span></button><button className="listen-again" onClick={repeat} aria-label="Ulangi instruksi"><RotateCcw/></button></div>{recognized&&<div className="heard">Kakak dengar: “{recognized}”</div>}<button className="soft-btn" onClick={chooseAnswer}>Aku mau dibantu <Heart size={17}/></button>{!speechSupported&&<small className="support-note">Mikrofon belum tersedia di browser ini. Kamu tetap bisa bermain.</small>}</>}
          {stage==='tapAnswer' && <><h2>Ini namanya {current.name}!</h2><p>Yuk, kita bilang bersama-sama.</p><button className="primary" onClick={showAnswer}>Aku sudah mencoba <Heart size={18}/></button><button className="soft-btn" onClick={repeat}>Dengar lagi <RotateCcw size={17}/></button></>}
          {stage==='celebrate' && <><div className="celebrate-badge"><Sparkles size={19}/> Hebat sekali!</div><h2>Pintar mencoba!</h2><p>Kita baru saja belajar tentang <strong>{current.name.toLowerCase()}</strong>.</p><button className="primary" onClick={next}>{index===9?'Selesai bermain':'Kenalan lagi'} <ArrowRight size={20}/></button></>}
        </div>
      </div>
      <div className="bottom-hint"><span>🌱</span> Setiap suara adalah usaha yang hebat.</div>
    </section>}

    {stage==='complete' && <section className="complete panel"><div className="confetti">✦　✿　✦　✧　✿</div><div className="complete-heart">♡</div><div className="eyebrow">PETUALANGAN SELESAI</div><h1>Wah, hebat<br/><span>sekali!</span></h1><p>Kita sudah kenalan dengan sepuluh teman hewan. Terima kasih sudah mau mencoba bicara bersama Kakak!</p><div className="completion-friends">{order.map(a=><span key={a.id}>{a.emoji}</span>)}</div><button className="primary start-btn" onClick={start}><RotateCcw size={19}/> Main lagi, yuk!</button><div className="welcome-foot"><Heart size={15} fill="currentColor"/> Setiap anak belajar dengan caranya sendiri.</div></section>}

    <footer><span>dibuat dengan <Heart size={12} fill="currentColor"/> untuk teman kecil</span><span>belajar pelan-pelan, dengan gembira</span></footer>
  </main>
}
createRoot(document.getElementById('root')).render(<App/>);

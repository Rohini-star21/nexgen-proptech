import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import Lenis from 'lenis';
import CFG from './config.js';
gsap.registerPlugin(ScrollTrigger);
const U='/img/';
const FB=['photo-1486406146926-c627a92ad1ab','photo-1497366754035-f200968a6e72','photo-1586528116311-ad8dd3c8310d','photo-1519501025264-65ba15a82390'].map(i=>`https://images.unsplash.com/${i}?auto=format&fit=crop&w=1400&q=80`);
const Img=({src,fb,i,...p})=><img src={src} alt="" loading="lazy" onError={fb?e=>{e.currentTarget.onerror=null;e.currentTarget.src=fb}:undefined} {...p}/>;

const NAV=[['Home','#/'],['About','#/about'],['Projects','#/projects'],['Contact','#/contact']];
const HERO=[
 {t:'Accelerate Your Real Estate Returns'},
 {t:'Invest in pre-leased commercial assets and curated real-estate portfolios that deliver predictable monthly cashflow and long-term wealth appreciation.',b:'Explore Project'},
 {t:'Our data-driven platform simplifies every step so you can grow passive income today.',b:'Read More'}];
const INSIGHTS=['Pre-leased Grade-A Office Analytics','Rental Yield & IRR Forecasts','Tenant Credit-Risk Scoring','Micro-Market Vacancy Heat-Maps','Exit Liquidity & Capitalisation Rate Trends','Fractional Ownership Case Studies','Whitepapers on REIT vs. Direct CRE','Regulatory & Tax Optimization Guides'];
const TOOLS=[
 ['Curated Asset Marketplace','Vetted pre-leased offices, warehouses and retail assets with detailed due-diligence reports and 3D virtual tours.','Curated-Market.webp'],
 ['AI-Powered Underwriting','Machine-learning models analyse tenant credit, lease terms and macro data to forecast cashflows and downside risk.','AI-Powered-light.webp'],
 ['Fractional Ownership','Start investing with ₹25 lakh and co-own marquee properties while earning proportionate rent and capital gains.','Fractional.webp'],
 ['Transparent Dashboards','Track rental receipts, occupancy rates and IRR in real time across your entire portfolio on web or mobile.','Transparent-Dashboards.webp'],
 ['Zero-Management Hassle','Our asset managers handle leasing, maintenance and compliance so you enjoy truly passive income.','ZeroHastle-dark.webp'],
 ['Swift Exit Liquidity','Resell your fractions on our secondary market or opt for asset buy-back after lock-in—exit when you decide.','Swift-Exit-Liquidity.webp']];
const FAQ=[
 ['What is the minimum investment amount?','You can begin fractional ownership in pre-leased Grade-A properties with as little as $30,000, enabling diversification across multiple assets without large capital outlays.'],
 ['How are rental yields distributed?','Monthly rentals flow directly from the tenant to an escrow account managed by an independent trustee. After statutory deductions, your pro-rata share is credited to your registered bank account on the 7th of every month.'],
 ['What happens if a tenant vacates?','Our asset-management team activates a 90-day re-leasing playbook—market analysis, broker outreach, fit-out subsidies and digital marketing—to secure a new tenant. Historical data shows average re-leasing within 75 days, and a reserve fund covers any interim income shortfall.'],
 ['Are these investments regulated?','Yes. Every special-purpose vehicle (SPV) is incorporated under Indian LLP regulations, filings are made with the Registrar of Companies, and trustees are registered with SEBI. Additionally, all investment documents are executed on non-judicial stamp paper and stored in a blockchain-backed vault for tamper-proof record keeping.'],
 ['How is my ownership legally secured?','Your fractional ownership is recorded in the LLP agreement and reflected in the MCA (Ministry of Corporate Affairs) filings. A tri-party deed among the LLP, trustee and you ensures enforceable rights to rental income, capital appreciation and exit proceeds.'],
 ['What are the exit options and timelines?','After a 12-month lock-in, you may:\n- List your fraction on our secondary market for peer-to-peer sale, typically transacted within 5–10 business days.\n- Opt for our buy-back window held every quarter at a NAV-based price discovered by an independent valuer.\n- Hold until asset divestment (target 5–7 years) and receive proportional sale proceeds.'],
 ['How are taxes handled on rental income and capital gains?','-Rental income is distributed after withholding tax under applicable DTAA provisions. Capital gains on exit are classified as short-term or long-term based on holding period; we provide a detailed Form 64 and CA-certified statement every March to simplify your tax filing.']];
const SOC=[['Facebook','https://www.facebook.com/','f'],['Dribbble','https://dribbble.com/','Dr'],['Instagram','https://www.instagram.com/','Ig'],['LinkedIn','https://www.linkedin.com/','in']];

function useTheme(){
  const [t,setT]=useState(()=>{let s=null;try{s=localStorage.getItem('nx-theme')}catch(e){}return s||'dark'});
  useEffect(()=>{document.documentElement.dataset.theme=t;try{localStorage.setItem('nx-theme',t)}catch(e){}},[t]);
  return [t,()=>setT(x=>x==='dark'?'light':'dark')];
}
const Logo=()=><a className="logo" href="#top" aria-label="NexGen Proptech home"><svg viewBox="0 0 150 46"><text x="0" y="28" textLength="150" lengthAdjust="spacingAndGlyphs" className="lg1">NEXGEN</text><rect y="32" width="150" height="14" rx="2" fill="var(--bl)"/><text x="75" y="42.3" textAnchor="middle" className="lg2">PROPTECH</text></svg></a>;
const Cursor=()=>{const r=useRef();useEffect(()=>{if(matchMedia('(pointer:coarse),(prefers-reduced-motion:reduce)').matches)return;const xt=gsap.quickTo(r.current,'x',{duration:.3}),yt=gsap.quickTo(r.current,'y',{duration:.3});const m=e=>{xt(e.clientX);yt(e.clientY);r.current.classList.toggle('big',!!e.target.closest('a,button'))};addEventListener('mousemove',m);return()=>removeEventListener('mousemove',m)},[]);return <div className="cur" ref={r}/>};
const goto=h=>{const L=window.__lenis;
  if(h==='#top'){L?L.scrollTo(0):scrollTo({top:0,behavior:'smooth'});return}
  if(h.startsWith('#/')){if(location.hash===h||(h==='#/'&&(location.hash===''||location.hash==='#'))){L?L.scrollTo(0):scrollTo({top:0,behavior:'smooth'})}else location.hash=h;return}
  const to=()=>{const el=document.getElementById(h.slice(1));if(el)L?L.scrollTo(el,{offset:-76}):el.scrollIntoView({behavior:'smooth'});return !!el};
  if(!to()){location.hash='#/';setTimeout(to,450)}};
const A=({href,children,...p})=><a href={href} onClick={e=>{if(href&&href.length>1&&href[0]==='#'){e.preventDefault();goto(href)}}} {...p}>{children}</a>;
const Btn=({href='#/contact',children,ghost})=><A className={'btn'+(ghost?' ghost':'')} href={href}><i>↗</i><span>{children}</span></A>;

function Header({theme,toggle,route}){
  const cur=h=>h===(route==='home'?'#/':'#/'+route);
  const [open,setOpen]=useState(false),[q,setQ]=useState(false),[sc,setSc]=useState(false);
  useEffect(()=>{const f=()=>setSc(scrollY>40);f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
  return <header className={'nb'+(sc?' sm':'')}>
    <A className="nb-logo" href="#/" aria-label="NexGen Proptech home"><img src={U+'logo.png'} alt="NexGen Proptech"/></A>
    <nav className="nb-nav" aria-label="Main">{NAV.map(([l,h])=><A key={l} href={h} className={cur(h)?'is-cur':''} aria-current={cur(h)?'page':undefined}><span data-t={l}>{l}</span></A>)}</nav>
    <span className="nb-div" aria-hidden="true"/>
    <div className="nb-act">
      <form className={'nb-s'+(q?' on':'')} onSubmit={e=>e.preventDefault()}><input type="search" name="s" aria-label="Search" tabIndex={q?0:-1}/></form>
      <button className="nb-ic" aria-label="Search" onClick={()=>setQ(!q)}><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/></svg></button>
      <button className="nb-ic mode-btn" aria-label={'Switch to '+(theme==='dark'?'light':'dark')+' theme'} onClick={toggle}>{theme==='dark'
      ?<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/></svg>
      :<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>}</button>
      
      <button className="nb-ic nb-burger" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}><svg viewBox="0 0 24 24"><path d={open?'M5 5l14 14M19 5 5 19':'M4 8h16M4 16h16'}/></svg></button>
    </div>
    <i className="nb-line"/>
    <div className={'nb-drawer'+(open?' on':'')}><img className="dlogo" src={U+'logo.png'} alt="NexGen Proptech"/>{NAV.map(([l,h],k)=><A key={l} href={h} style={{'--i':k}} onClick={()=>setOpen(false)}><em>{k+1}</em>{l}</A>)}</div>
  </header>;
}

const P=(id,w,h)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=95&w=${w}&h=${h}`;
const POOL=['1780632778329-2b965030cedb','1780563892673-20dbaf1ead84','1773665231158-d80e8a86f44d','1761937841713-6b43e3f50efa','1743586418842-742b3e80c9eb','1698490275678-518f3b591f0c','1690811035354-1c16419c925b','1760426392296-9abd7fc8cab0','1753241515120-d6e6a8db218a','1726866492047-7f9516558c6e'];
const FBK=['hero-1','hero-2','hero-3','side-1','side-2','side-3','side-4','hero-1','hero-2','hero-3'];
const Ph=({k,w=1200,h=900,...p})=><Img src={P(POOL[k],w,h)} fb={U+FBK[k]+'.webp'} {...p}/>;
const HIMG=[['1780632778329-2b965030cedb','hero-1'],['1780563892673-20dbaf1ead84','hero-2'],['1773665231158-d80e8a86f44d','hero-3']];
const SIDE=[['1761937841713-6b43e3f50efa','side-1'],['1743586418842-742b3e80c9eb','side-2'],['1698490275678-518f3b591f0c','side-3'],['1690811035354-1c16419c925b','side-4']];
function Hero(){
  const ref=useRef();const [i,setI]=useState(0);
  useEffect(()=>{const id=setTimeout(()=>setI(x=>(x+1)%3),6000);return()=>clearTimeout(id)},[i]);
  useEffect(()=>{
    const c=gsap.context(()=>{
      const mm=gsap.matchMedia();
      const common=tl=>tl.to('.hero-card img',{scale:1.1,ease:'none',duration:1},0).to('.hero-copy,.dots,.cue',{opacity:0,y:-30,duration:.45},0).to('.rotate-hero',{opacity:0,duration:.45},0);
      mm.add('(min-width: 901px)',()=>{const tl=gsap.timeline({scrollTrigger:{trigger:ref.current,start:'top top',end:'+=170%',scrub:true,pin:true}});
        common(tl).to('.hero-card',{clipPath:'inset(14% 31% 14% 31% round 32px)',ease:'none',duration:1},0).fromTo('.sd.l',{xPercent:-130},{xPercent:0,ease:'power2.out',duration:1},.4).fromTo('.sd.r',{xPercent:130},{xPercent:0,ease:'power2.out',duration:1},.4)});
      mm.add('(max-width: 900px)',()=>{const tl=gsap.timeline({scrollTrigger:{trigger:ref.current,start:'top top',end:'+=100%',scrub:true,pin:true}});
        common(tl).to('.hero-card',{clipPath:'inset(18% 7% 12% 7% round 28px)',ease:'none',duration:1},0)});
    },ref);
    const mm=e=>{ref.current&&(ref.current.style.setProperty('--mx',e.clientX+'px'),ref.current.style.setProperty('--my',e.clientY+'px'));const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;gsap.utils.toArray('.px').forEach(el=>gsap.to(el,{x:x*-el.dataset.d,y:y*-el.dataset.d,duration:.8,ease:'power3.out',overwrite:'auto'}))};
    addEventListener('mousemove',mm);return()=>{c.revert();removeEventListener('mousemove',mm)};
  },[]);
  const s=HERO[i];
  return <section className="hero" id="top" ref={ref}>
    <div className="sd l">{SIDE.slice(0,2).map(([id,f],k)=><div className="sp px" data-d={26+k*18} key={id}><Img src={P(id,1000,1400)} fb={U+f+'.webp'}/></div>)}</div>
    <div className="sd r">{SIDE.slice(2).map(([id,f],k)=><div className="sp px" data-d={40-k*16} key={id}><Img src={P(id,1000,1400)} fb={U+f+'.webp'}/></div>)}</div>
    <div className="hero-card">{HIMG.map(([id,f],k)=><Img key={id} loading="eager" className={k===i?'on':''} src={P(id,2400,1500)} fb={U+f+'.webp'}/>)}</div>
    <h1 className="rotate-hero">NexGen Proptech</h1>
    <div className="hero-copy" key={i}><h6>{s.t.split(' ').map((w,k)=><span className="w" key={k} style={{'--d':k*.035+'s'}}>{w} </span>)}</h6>{s.b&&<Btn href="#opportunities">{s.b}</Btn>}</div>
    <div className="dots">{HERO.map((_,k)=><button key={k} aria-label={'Slide '+(k+1)} className={k===i?'on':''} onClick={()=>setI(k)}><i/></button>)}</div>
    <div className="spot"/><div className="cue" aria-hidden="true"><i/></div>
  </section>;
}

const Mask=({k,shape='sh-round',w=900,h=900,className=''})=><div className={'mask '+shape+' '+className}><Ph k={k} w={w} h={h}/></div>;
const Rich=({t})=>t.split(/(\d[\d,]*)/).map((x,n)=>/^\d/.test(x)?<b className="cnt" data-v={x} key={n}>{x}</b>:x);

function Opportunities(){
  const ref=useRef();
  useEffect(()=>{const c=gsap.context(()=>{
    const st=(a,b)=>({trigger:'.dome-sec',start:a,end:b,scrub:true});
    gsap.fromTo('.dome-sec',{'--ry':'26vw'},{'--ry':'3vw',ease:'none',scrollTrigger:st('top 100%','top 6%')});
    gsap.fromTo('.arc',{opacity:1},{opacity:0,ease:'none',scrollTrigger:st('top 55%','top 15%')});
    gsap.fromTo('.big-image',{y:60},{y:0,ease:'none',scrollTrigger:{trigger:'.imgs2',start:'top 95%',end:'top 35%',scrub:1}});
    gsap.fromTo('.small-image',{y:140},{y:-30,ease:'none',scrollTrigger:{trigger:'.imgs2',start:'top 95%',end:'bottom 40%',scrub:1}});
  },ref);return()=>c.revert()},[]);
  return <section className="dome-sec" id="opportunities" ref={ref}>
    <svg className="arc" viewBox="0 0 1440 260" aria-hidden="true"><path id="arcp" d="M0,320 Q720,-180 1440,320" fill="none"/><text><textPath href="#arcp" startOffset="50%" textAnchor="middle">Curated Properties</textPath></text></svg>
    <div className="dome-fx" aria-hidden="true"><i className="ping p1"/><i className="ping p2"/><i className="ping p3"/><i className="dorb o1"/><i className="dorb o2"/></div>
    <div className="wrap split mid">
      <div><h2>Explore Live Investment Opportunities</h2><p className="lead">Browse pre-leased commercial assets, view AI-driven yield forecasts and reserve your fraction in minutes. All listings include virtual tours, legal reports and transparent pricing.</p>
        <Btn href="#/projects">Explore Projects</Btn></div>
      <div className="imgs2"><Mask className="big-image" shape="sh-arch" k={7} w={1000} h={1300}/><Mask className="small-image" shape="sh-circle" k={8} w={600} h={600}/><span className="big-n">1</span></div>
    </div></section>;
}

function About(){
  const ref=useRef();
  useEffect(()=>{const c=gsap.context(()=>{
    gsap.fromTo('.about-ring',{scale:.35,opacity:0},{scale:1.1,opacity:1,ease:'none',scrollTrigger:{trigger:ref.current,start:'top 90%',end:'bottom 30%',scrub:true}});
    gsap.fromTo('.ab-line',{yPercent:110},{yPercent:0,stagger:.15,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.ab-h',start:'top 85%'}});
  },ref);return()=>c.revert()},[]);
  return <section className="sec about" id="about" ref={ref}><div className="about-ring" aria-hidden="true"/><div className="wrap">
    <p className="kick">About Us</p><h2 className="xl ab-h"><span className="ln2"><span className="ab-line">Your End-to-End</span></span><span className="ln2"><span className="ab-line">PropTech Investment Partner</span></span></h2>
    <div className="two"><p><Rich t="We combine deep asset expertise with cutting-edge technology to unlock institutional-grade commercial real-estate opportunities for every investor. Our AI-powered underwriting engine, 24/7 asset monitoring and fractional ownership model deliver transparency, liquidity and superior risk-adjusted returns."/></p>
    <p>Backed by SEBI-registered trustees and an independent escrow mechanism, every rupee you deploy is ring-fenced and auditable in real time. From acquisition to exit, our ISO-certified processes, quarterly investor calls and on-demand capital-market insights keep you informed, empowered and in control of your commercial real-estate portfolio.</p></div></div></section>;
}

function Insights(){
  const tilt=e=>{const b=e.currentTarget.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;e.currentTarget.style.setProperty('--tx',(-y*8)+'deg');e.currentTarget.style.setProperty('--ty',(x*8)+'deg')};
  const rst=e=>{e.currentTarget.style.setProperty('--tx','0deg');e.currentTarget.style.setProperty('--ty','0deg')};
  return <section className="sec alt"><div className="wrap split mid">
    <div><h2>Data-Driven Insights for Smarter Real-Estate Decisions</h2><p className="chip">Insights</p>
    <p className="lead">Stay ahead of market cycles with weekly CRE trend reports, rental yield heat-maps and cap-rate forecasts. Our research covers micro-market supply, tenant credit scores and exit liquidity so you invest only in high-performing assets.</p>
    <ul className="list">{INSIGHTS.map(x=><li key={x}>{x}</li>)}</ul></div>
    <div className="shot" onMouseMove={tilt} onMouseLeave={rst}><div className="shot-in"><Ph k={5} w={1000} h={1250}/><Ph k={4} w={1000} h={1250}/></div></div></div></section>;
}

function Tools(){
  const [a,setA]=useState(0);const ks=[8,3,6,1,2,0];
  return <section className="sec"><div className="wrap">
    <div className="head"><h2>Powerful CRE Investment Tools at Your Fingertips</h2><Btn href="#/contact">Contact us</Btn></div>
    <div className="tools2">
      <ul className="tlist" role="tablist" aria-label="Investment tools">{TOOLS.map((t,k)=><li key={t[0]}><button role="tab" aria-selected={a===k} className={a===k?'on':''} onClick={()=>setA(k)} onMouseEnter={()=>setA(k)} onFocus={()=>setA(k)}><span>{String(k+1).padStart(2,'0')}</span>{t[0]}<i/></button></li>)}</ul>
      <div className="tview">{TOOLS.map((t,k)=><article key={t[0]} className={'tpanel'+(a===k?' on':'')} aria-hidden={a!==k}><div className="timg"><Ph k={ks[k]} w={1000} h={720}/></div><h3>{t[0]}</h3><p>{t[1]}</p></article>)}</div>
    </div></div></section>;
}

function Process(){
  const ref=useRef();const steps=['Browse curated listings','Analyse AI reports','Invest online in minutes','Monitor returns 24/7.'];
  useEffect(()=>{const c=gsap.context(()=>{
    gsap.fromTo('.band',{clipPath:'circle(8% at 50% 0%)'},{clipPath:'circle(150% at 50% 0%)',ease:'none',scrollTrigger:{trigger:'.band',start:'top 95%',end:'top 20%',scrub:true}});
    gsap.fromTo('.pline i',{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:'.psteps',start:'top 80%',end:'bottom 45%',scrub:true}});
    gsap.fromTo('.pstep',{opacity:.25,y:20},{opacity:1,y:0,stagger:.25,ease:'none',scrollTrigger:{trigger:'.psteps',start:'top 80%',end:'bottom 45%',scrub:true}});
  },ref);return()=>c.revert()},[]);
  return <section className="band" ref={ref}><div className="wrap center">
    <p className="kick">Simple Plans, Powerful Execution</p><h2 className="xl">Inside Our 4-Step Investment Process <span>—</span><br/>Your Vision, Our Expertise</h2>
    <div className="psteps"><div className="pline" aria-hidden="true"><i/></div>{steps.map((x,k)=><p className="pstep" key={x}>{k>0&&<span aria-hidden="true">→ </span>}{x}</p>)}</div>
    <p className="lead">Transparent, secure and entirely digital.</p><Btn href="#opportunities">Explore More</Btn></div></section>;
}

const HL=/(\$\d[\d,]*|\d+-month|\d+-day|\d+ days|\d+(?:st|nd|rd|th)|\d+–\d+ (?:business days|years))/;
const H=t=>t.split(HL).map((x,n)=>n%2?<mark className="hl2" key={n}>{x}</mark>:x);
const Ans=({a})=>{const out=[];let li=[];const flush=()=>{if(li.length){out.push(<ul key={'u'+out.length}>{li.map((x,n)=><li key={n}>{H(x)}</li>)}</ul>);li=[]}};
  a.split('\n').forEach((l,n)=>{if(/^-/.test(l))li.push(l.replace(/^-\s*/,''));else{flush();out.push(l.startsWith('After a 12-month')?<h6 key={n}>{l}</h6>:<p key={n}>{H(l)}</p>)}});flush();return out;};

function Faq(){
  const [o,setO]=useState(0);const go=d=>setO(x=>(x+d+FAQ.length)%FAQ.length);
  const Av=({c})=><span className={'fc-av '+(c||'')}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V9l8-6 8 6v12M9 21v-6h6v6"/></svg></span>;
  return <section className="sec"><div className="wrap fc">
    <p className="vlabel fc-label">FREQUENTLY ASKED QUESTIONS</p>
    <ul className="fc-list">{FAQ.map(([q],k)=><li key={q}><button className={o===k?'on':''} aria-pressed={o===k} onClick={()=>setO(k)} onMouseEnter={()=>setO(k)} onFocus={()=>setO(k)}><span>{String(k+1).padStart(2,'0')}</span><em>{q}</em><i/></button></li>)}</ul>
    <div className="fc-chat">
      <div className="fc-bar"><Av/><i className="fc-on" aria-hidden="true"/></div>
      <div className="fc-body">{FAQ.map(([q,a],k)=><div className={'fc-pair'+(o===k?' on':'')} key={q} aria-hidden={o!==k}>
        <div className="fc-q">{q}</div>
        <div className="fc-a"><Av c="sm"/><div className="fc-typing" aria-hidden="true"><i/><i/><i/></div><div className="fc-bub" aria-live={o===k?'polite':'off'}><Ans a={a}/></div></div></div>)}</div>
      <div className="fc-nav"><span className="tl2-dots" aria-hidden="true">{FAQ.map((_,k)=><i key={k} className={k===o?'on':''}/>)}</span>
        <button aria-label="Previous question" onClick={()=>go(-1)}><svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>
        <button aria-label="Next question" onClick={()=>go(1)}><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>
    </div></div></section>;
}

function NextGen(){return <section className="sec alt"><div className="wrap split mid">
  <div><h2>Built for Next-Generation</h2><p className="chip">Real-Estate Investors</p>
  <p className="lead">We combine deep asset expertise with cutting-edge technology to unlock institutional-grade commercial real-estate opportunities for every investor.</p>
  <p className="lead">Our AI-powered underwriting engine, transparent reporting and fractional ownership model deliver superior risk-adjusted returns from day one.</p><Btn href="#/contact">For More Details</Btn></div>
  <div className="orbit"><Mask k={2} shape="sh-circle" w={900} h={900}/><i className="orb r1"/><i className="orb r2"/><i className="odot d1"/><i className="odot d2"/></div></div></section>;}

const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function useSend(kind){
  const [st,setSt]=useState('idle');
  const send=async data=>{setSt('sending');
    try{
      if(CFG.endpoint&&(CFG.accessKey||!/web3forms/.test(CFG.endpoint))){
        const r=await fetch(CFG.endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({...(CFG.accessKey?{access_key:CFG.accessKey}:{}),subject:kind==='news'?'New newsletter subscriber':'New message from NexGen website',...data})});
        if(!r.ok)throw new Error('send');
      }else{
        const body=Object.entries(data).map(([k,v])=>k+': '+v).join('\n');
        location.href='mailto:'+CFG.to+'?subject='+encodeURIComponent(kind==='news'?'Newsletter subscription':'Website enquiry')+'&body='+encodeURIComponent(body);
      }
      setSt('sent');
    }catch(e){setSt('error')}};
  return [st,send,()=>setSt('idle')];
}
const Ic=()=><><svg className="ic-sp" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9"/></svg><svg className="ic-ok" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg><svg className="ic-er" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></>;

function Newsletter(){
  const [em,setEm]=useState(''),[tc,setTc]=useState(false),[st,send,reset]=useSend('news');const ok=EMAIL.test(em);
  useEffect(()=>{if(st!=='sent')return;const a=setTimeout(()=>{setEm('');setTc(false)},2600),b=setTimeout(reset,4200);return()=>{clearTimeout(a);clearTimeout(b)}},[st]);
  return <section className="sec news" id="contact"><div className="nglow" aria-hidden="true"/><div className="wrap center">
  <p className="kick">Newsletter</p><h2 className="xl">Get Exclusive CRE <span className="hl">Investment </span>Opportunities First</h2>
  <p className="lead"><Rich t="Join 10,000+ investors who receive early-bird access to high-yield properties,"/><br/> market insights and invite-only webinars. One-click unsubscribe at any time.</p>
  <p className="sub">Subscribe to our newsletter to get the latest news.</p>
  <form noValidate className={'nl'+(tc&&!ok?' bad':'')+(ok?' good':'')} onSubmit={async e=>{e.preventDefault();setTc(true);if(ok)await send({email:em})}}>
    <input type="email" name="email-479" placeholder="Your Email Address" aria-label="Your Email Address" value={em} onChange={e=>{setEm(e.target.value);if(st!=='idle')reset()}} onBlur={()=>em&&setTc(true)}/>
    <button className={'cta-sm nl-btn '+st} type="submit" disabled={st==='sending'}><i className="bi" aria-hidden="true">↗</i><span className="cf-lbl">Subscribe</span><Ic/></button></form>
  <span className="sr" role="status" aria-live="polite">{st==='sent'?'Subscribed':st==='error'?'Something went wrong, please try again':''}</span></div></section>;}

const IC={
 Facebook:<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/>,
 Dribbble:<g fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M5 7c5 1 9 3 14 1M8 20c1-6 4-10 9-12M3 11c6 0 11 2 14 8"/></g>,
 Instagram:<g fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".6"/></g>,
 LinkedIn:<path d="M4 9h4v11H4zM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v2c1-2 3-2.5 5-2 2 .5 2 3 2 5v6h-4v-5c0-2-1-3-2.5-3S14 14 14 16v4h-4z"/>};
function Footer(){
  const [p,setP]=useState(0);
  useEffect(()=>{const f=()=>{const h=document.documentElement.scrollHeight-innerHeight;setP(h?scrollY/h:0)};addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
  const mag=e=>{const b=e.currentTarget.getBoundingClientRect();gsap.to(e.currentTarget,{x:(e.clientX-b.left-b.width/2)*.35,y:(e.clientY-b.top-b.height/2)*.35,duration:.3})};
  const unm=e=>gsap.to(e.currentTarget,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'});
  return <footer className="ftr3"><div className="wrap">
    <h2 className="ft-tag">NexGen PropTech Unlocking institutional-grade real estate through AI, transparency, and fractional ownership.</h2>
    <div className="ft-row">
      <div className="ft-blk"><h4 className="vl">CONTACT</h4><div className="ft-info"><p>Singapore</p><p><a href="mailto:contact@nexgenproptech.com">contact@nexgenproptech.com</a></p>
        <div className="soc"><span>Socials:</span>{SOC.map(([n,h])=><a key={n} href={h} aria-label={n} onMouseMove={mag} onMouseLeave={unm}><svg viewBox="0 0 24 24" fill="currentColor">{IC[n]}</svg></a>)}</div></div></div>
      <div className="ft-blk"><h4 className="vl">KEY LINKS</h4><ul className="ft-links">{[['Home','#/'],['About','#/about'],['Contact','#/contact'],['Projects','#/projects'],['Terms of Service','#'],['Privacy Policy','#']].map(([l,h])=><li key={l}><A href={h}>{l}</A></li>)}</ul></div>
      <A className="top2" href="#top" aria-label="To top" title="To top"><span className="tring"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" className="trk"/><circle cx="24" cy="24" r="21" className="bar" style={{strokeDashoffset:132*(1-p)}}/></svg><svg className="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span></A>
    </div>
    <div className="ft-bar"><p className="ft-copy">© Copyright NexGen Proptech. All rights reserved.</p><p className="ft-pw">Powered by <a href="https://pulsedigimedia.com/" target="_blank" rel="noopener noreferrer">pulsedigimedia.com</a></p></div></div></footer>;}

/* ===== inner pages: About / Projects / Contact ===== */
const PX=(id,w,h)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
const MaskP=({id,fb,shape='sh-round',w=900,h=900,className=''})=><div className={'mask '+shape+' '+className}><Img src={PX(id,w,h)} fb={U+fb+'.webp'}/></div>;
const VALUES=[['Radical Transparency','We disclose every lease, valuation model and cash-flow forecast in real time so investors evaluate risks and rewards with complete clarity.'],['Data Mastery','Our AI ingests millions of global data points daily, pricing risk precisely and uncovering opportunities that consistently outperform traditional benchmarks.'],['Investor First','We disclose every lease, valuation model and cash-flow forecast in real time so investors evaluate risks and rewards with complete clarity.'],['Global Reach','We curate pre-leased assets across gateway cities worldwide, providing currency diversification and stable cash-flows resilient to regional market volatility.'],['Sustainable Growth','Every asset undergoes rigorous ESG scoring, ensuring green-certified buildings deliver higher rental escalations and future-proof capital appreciation for investors.'],['Continuous Innovation','Quarterly platform enhancements introduce faster onboarding, deeper analytics and seamless exits, keeping investors ahead in an evolving market landscape.']];
const EDGE=['Curated pre-leased Grade-A assets with average 9% entry cap rates','AI-powered underwriting reducing due-diligence time by 70%','Fractional ownership starting at $30k, enabling true diversification','Secondary marketplace providing liquidity within 5–10 business days','Regulated structure with SEBI-registered trustees and independent escrow'];
const PIPE=[['Grade-A Offices','Prime CBD towers with 7–9 yr leases to Fortune 500 tenants.'],['Logistics Parks','E-commerce-driven warehouses near expressways offering 8% cap rates.'],['Mixed-Use Assets','Office-plus-retail hubs in growth corridors for diversified cash-flows.']];
const EXPECT=['Live IRR & cash-flow calculators for every asset','360° virtual site tours and drone walkthroughs','Third-party legal, technical and ESG due-diligence summaries','Fractional ownership with same-day digital agreements','Secondary-market liquidity window accessible from day one'];
const Checks=({items,cls=''})=><ul className={'checks '+cls}>{items.map((x,k)=><li key={x} style={{'--i':k}}><span className="tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span><Rich t={x}/></span></li>)}</ul>;

const tilt=e=>{const b=e.currentTarget.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;e.currentTarget.style.setProperty('--tx',(-y*8)+'deg');e.currentTarget.style.setProperty('--ty',(x*8)+'deg')};
const rst=e=>{e.currentTarget.style.setProperty('--tx','0deg');e.currentTarget.style.setProperty('--ty','0deg')};
const BgSec=({k,px,fb,className='',children})=><section className={'bgsec '+className}><div className="bgsec-img" aria-hidden="true"><Img src={px?PX(px,1800,1100):P(POOL[k],1800,1100)} fb={U+fb+'.webp'} loading="eager"/></div><div className="bgsec-ov"/><div className="wrap bgsec-in">{children}</div></section>;
const VICON=['M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z','M4 20V10M10 20V4M16 20v-8M22 20H2','M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0','M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18','M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19l8-8','M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z'];
const spot=e=>{const b=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',e.clientX-b.left+'px');e.currentTarget.style.setProperty('--my',e.clientY-b.top+'px')};

function AboutPage(){
  const [tab,setTab]=useState(0);
  return <>
    <section className="sec apt"><div className="wrap split mid">
      <div><h2 className="h-md">Democratising Elite Real-Estate Investing</h2>
        <div className="tabs fill seg" role="tablist" aria-label="About sections" style={{'--i':tab}} onKeyDown={e=>{if(e.key==='ArrowRight')setTab(1);if(e.key==='ArrowLeft')setTab(0)}}><i className="seg-pill" aria-hidden="true"/>{['Who We Are','The Story Behind NexGen'].map((t,k)=><button key={t} role="tab" aria-selected={tab===k} tabIndex={tab===k?0:-1} className={tab===k?'on':''} onClick={()=>setTab(k)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={k?'M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z':'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-3.5 3.6-6 8-6s8 2.5 8 6'}/></svg><span>{t}</span></button>)}</div>
        <div className="tabbody">
          <div className={'tp'+(tab===0?' on':'')}><p>We exist to level the playing field, giving every accredited and retail investor friction-free access to institutional-grade commercial properties that generate resilient cash-flow and long-term capital appreciation.</p></div>
          <div className={'tp'+(tab===1?' on':'')}><h4 className="sub-h">From Vision to Venture</h4><p>Founded in 2023 by veterans of Blackstone, JLL and Silicon Valley fintech, NexGen was born from a single frustration: exceptional real-estate opportunities were locked behind million-dollar gates and opaque relationships. We merged decades of asset-management rigor with AI-driven underwriting to tear down those gates.</p><p>Today our platform hosts tens of millions in assets under management, serves investors across five continents and has delivered an average IRR of 11.4%—all while maintaining zero defaults and 100% on-time distributions.</p></div></div>
        <Btn href="#/contact">Contact Us</Btn></div>
      <div className="shot" onMouseMove={tilt} onMouseLeave={rst}><div className="shot-in"><Img src={PX(1181396,1000,1250)} fb={U+'side-1.webp'}/><Img src={PX(1181406,1000,1250)} fb={U+'side-2.webp'}/></div></div>
    </div></section>
    <BgSec px={1181435} fb="hero-1" className="gp"><div className="gp-in"><h2 className="h-md">Guiding Principles for Trust & Growth</h2><p className="lead">Integrity, innovation and relentless investor focus steer every decision at NexGen PropTech, embedding transparency, accountability and ethical governance into daily operations, nurturing sustainable growth, building resilient portfolios, cultivating long-term global partnerships, and ensuring each stakeholder thrives in an ever-evolving commercial real-estate landscape.</p></div><span className="big-n" aria-hidden="true">1</span></BgSec>
    <section className="sec"><div className="wrap"><p className="kick vkick">Our Core Values</p>
      <div className="pcards">{VALUES.map(([t,d],k)=><article className="pcard" key={t} onMouseMove={spot}><span className="pico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={VICON[k]}/></svg></span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
    <BgSec px={1181406} fb="hero-3" className="why"><div className="split mid">
      <div><p className="kick">Why Investors Choose Us</p><h2 className="h-md">Competitive Edge<br/>That Delivers Alpha</h2><p className="lead">We combine rigorous underwriting, transparent data and seamless technology to unlock superior risk-adjusted returns and sustained wealth creation for every discerning real-estate investor worldwide.</p></div>
      <Checks items={EDGE}/></div></BgSec>
  </>;
}

function ProjectsPage(){
  const ref=useRef();
  useEffect(()=>{const c=gsap.context(()=>{
    gsap.fromTo('.pband',{clipPath:'circle(8% at 50% 0%)'},{clipPath:'circle(150% at 50% 0%)',ease:'none',scrollTrigger:{trigger:'.pband',start:'top 95%',end:'top 20%',scrub:true}});
  },ref);return()=>c.revert()},[]);
  const D=['M6 21V4h8v17M14 9h4v12M3 21h18M9 8h2M9 12h2M9 16h2','M3 21V9l9-5 9 5v12M7 21v-7h10v7M7 17h10','M4 21V8h7v13M11 21V3h9v18M7 12h1M7 16h1M14 7h2M14 11h2M14 15h2M2 21h20'];
  return <div ref={ref}>
    <BgSec k={9} fb="hero-2" className="ptop2"><div className="pt-in"><h2 className="h-md">Curated CRE Opportunities Landing Soon</h2><p className="chip">Future-Ready Deal Pipeline</p><p className="lead">Our data science team and on-ground acquisition partners are underwriting Grade-A offices, logistics parks and mixed-use assets across key metros. First listings go live next quarter.</p></div></BgSec>
    <section className="sec alt"><div className="wrap"><div className="pcards">{PIPE.map(([t,d],k)=><article className="pcard" key={t} onMouseMove={spot}><span className="pico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={D[k]}/></svg></span><h3>{t}</h3><p><Rich t={d}/></p></article>)}</div></div></section>
    <section className="sec"><div className="wrap split mid">
      <div><p className="kick">What to Expect</p><h2 className="h-md">Pre-Leased Excellence,<br/>Delivered Transparently</h2><p className="lead"><Rich t="Each upcoming project will feature detailed OM packages, AI-powered yield forecasts, virtual tours and independent valuation reports. Investors can reserve fractions starting at $30k."/></p></div>
      <Checks items={EXPECT}/></div></section>
    <BgSec k={7} fb="hero-3" className="pband cta"><p className="kick">Stay Updated</p><h2 className="h-md">Join the priority waitlist; receive instant alerts<br/>the moment our next pre-leased asset is published.</h2><Btn href="#/contact">For More Details</Btn></BgSec>
  </div>;
}

function Field({id,name,label,type='text',area,value,onChange,onBlur,bad,good}){
  const P2=area?'textarea':'input';
  return <div className={'cf'+(value?' fill':'')+(bad?' bad':'')+(good?' good':'')}><P2 id={id} name={name} type={area?undefined:type} rows={area?6:undefined} value={value} onChange={onChange} onBlur={onBlur} aria-invalid={bad?'true':'false'} aria-required="true"/><label htmlFor={id}>{label}</label><i className="cf-ic" aria-hidden="true"/></div>;
}
function ContactPage(){
  const [v,setV]=useState({name:'',email:'',message:''}),[t,setT]=useState({}),[st,send,reset]=useSend('contact');
  const ok={name:v.name.trim().length>=2,email:EMAIL.test(v.email),message:v.message.trim().length>=10};
  useEffect(()=>{if(st!=='sent')return;const a=setTimeout(()=>{setV({name:'',email:'',message:''});setT({})},2600),b=setTimeout(reset,4200);return()=>{clearTimeout(a);clearTimeout(b)}},[st]);
  const on=k=>e=>{const val=e.target.value;setV(o=>({...o,[k]:val}));if(st!=='idle')reset()};
  const bl=k=>()=>v[k]&&setT(o=>({...o,[k]:true}));
  const sub=async e=>{e.preventDefault();setT({name:1,email:1,message:1});if(ok.name&&ok.email&&ok.message)await send({name:v.name,email:v.email,message:v.message})};
  const fl=k=>({value:v[k],onChange:on(k),onBlur:bl(k),bad:!!t[k]&&!ok[k],good:ok[k]});
  return <section className="ct">
    <div className="ct-bg" aria-hidden="true"><i className="l"/><i className="r"/></div>
    <h1 className="ct-title" aria-label="CONTACT"><span className="a" aria-hidden="true">CON</span><span className="b" aria-hidden="true">TACT</span></h1>
    <div className="wrap ct-grid">
      <form className="ct-card" noValidate onSubmit={sub} aria-label="Contact form">
        <Field id="c-name" name="text-216" label="Full Name" {...fl('name')}/>
        <Field id="c-email" name="email-826" label="Email" type="email" {...fl('email')}/>
        <Field id="c-msg" name="textarea-353" label="Message" area {...fl('message')}/>
        <button className={'cf-btn '+st} type="submit" disabled={st==='sending'}><i className="bi" aria-hidden="true">↗</i><span className="cf-lbl">Send a message</span><Ic/></button>
        <span className="sr" role="status" aria-live="polite">{st==='sent'?'Message sent':st==='error'?'Something went wrong, please try again':''}</span></form>
      <aside className="cinfo ct-dark" onMouseMove={spot}><h3 className="ci-h">Get Consultation</h3><p className="lead">Reach our investment specialists for tailored guidance, platform demos or partnership opportunities. We respond within one business day, ensuring swift, expert assistance.</p>
        <a className="crow" href="mailto:contact@nexgenproptech.com"><span className="cico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3zM3 7l9 7 9-7"/></svg></span><span>contact@nexgenproptech.com</span></a>
        <div className="crow"><span className="cico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg></span><span>Singapore</span></div></aside>
    </div></section>;
}

export default function App(){
  const [theme,toggle]=useTheme();
  const parse=()=>{const h=location.hash;return h.startsWith('#/about')?'about':h.startsWith('#/projects')?'projects':h.startsWith('#/contact')?'contact':'home'};
  const [route,setRoute]=useState(parse);
  useEffect(()=>{const T={home:'Home',about:'About',projects:'Projects',contact:'Contact'};document.title=T[route]+' - NexGen Proptech'},[route]);
  useEffect(()=>{const f=()=>{setRoute(parse());window.__lenis?window.__lenis.scrollTo(0,{immediate:true}):scrollTo(0,0);setTimeout(()=>ScrollTrigger.refresh(),200)};addEventListener('hashchange',f);return()=>removeEventListener('hashchange',f)},[]);
  useEffect(()=>{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const l=new Lenis({duration:1.1});window.__lenis=l;l.on('scroll',ScrollTrigger.update);
    const f=t=>l.raf(t*1000);gsap.ticker.add(f);gsap.ticker.lagSmoothing(0);
    return()=>{gsap.ticker.remove(f);l.destroy();window.__lenis=null};
  },[]);
  useEffect(()=>{const c=gsap.context(()=>{
    gsap.to('.pbar',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});
    gsap.utils.toArray('.mask').forEach(m=>{
      gsap.fromTo(m.querySelector('img'),{yPercent:-8,scale:1.2},{yPercent:8,ease:'none',scrollTrigger:{trigger:m,start:'top bottom',end:'bottom top',scrub:true}});
      gsap.fromTo(m,{clipPath:'circle(0% at 50% 50%)'},{clipPath:'circle(75% at 50% 50%)',ease:'none',scrollTrigger:{trigger:m,start:'top 92%',end:'top 50%',scrub:true}});
    });
    gsap.utils.toArray('.bgsec-img img').forEach(m=>gsap.fromTo(m,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:m.closest('.bgsec'),start:'top bottom',end:'bottom top',scrub:true}}));
    gsap.utils.toArray('.cnt').forEach(el=>{const raw=el.dataset.v,n=parseFloat(raw.replace(/,/g,'')),cm=raw.includes(',');
      ScrollTrigger.create({trigger:el,start:'top 92%',once:true,onEnter:()=>{const o={v:0};gsap.to(o,{v:n,duration:1.6,ease:'power2.out',onUpdate:()=>{const x=Math.round(o.v);el.textContent=cm?x.toLocaleString('en-US'):x}})}})});
    const rf=()=>ScrollTrigger.refresh();addEventListener('load',rf);return()=>removeEventListener('load',rf);
  });return()=>c.revert()},[route]);
  return <><i className="pbar"/><Cursor/><Header theme={theme} toggle={toggle} route={route}/><main key={route}>{route==='home'&&<><Hero/><Opportunities/><About/><Insights/><Tools/><Process/><Faq/><NextGen/><Newsletter/></>}{route==='about'&&<AboutPage/>}{route==='projects'&&<ProjectsPage/>}{route==='contact'&&<ContactPage/>}</main><Footer/></>;
}

import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  :root{--cream:#f6f1e9;--forest:#1b3a2c;--forest2:#2a5c42;--amber:#c4813a;--amber2:#e09a4f;--sage:#6b9278;--sage-light:#a8c5ad;--text:#2a2318;--muted:#7a7060;--card:#fdfaf5;--border:#e4ddd0;--sh:0 4px 18px rgba(27,58,44,0.08);}
  body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--text);}
  .db{height:100vh;display:flex;flex-direction:column;overflow:hidden;}
  .hdr{background:var(--forest);padding:13px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
  .hbrand{display:flex;align-items:center;gap:11px;}
  .hlogo{width:37px;height:37px;background:linear-gradient(135deg,var(--amber),var(--amber2));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:19px;box-shadow:0 3px 8px rgba(196,129,58,0.4);}
  .htitle{font-family:'Playfair Display',serif;color:var(--cream);font-size:18px;font-weight:700;}
  .hsub{color:var(--sage-light);font-size:9.5px;font-weight:300;margin-top:1px;letter-spacing:0.6px;}
  .huser{color:var(--sage-light);font-size:11px;text-align:right;}
  .huser strong{color:var(--cream);font-size:12px;display:block;}
  .layout{display:flex;flex:1;overflow:hidden;}
  .sidebar{width:185px;background:var(--forest);flex-shrink:0;overflow-y:auto;border-right:1px solid rgba(255,255,255,0.07);}
  .sitem{padding:10px 15px;color:var(--sage-light);font-size:12.5px;cursor:pointer;border-left:3px solid transparent;transition:all 0.18s;display:flex;align-items:center;gap:8px;user-select:none;}
  .sitem:hover{color:var(--cream);background:rgba(255,255,255,0.05);}
  .sitem.on{color:var(--amber2);border-left-color:var(--amber2);background:rgba(255,255,255,0.07);}
  .sfoot{padding:14px 15px;border-top:1px solid rgba(255,255,255,0.08);margin-top:8px;color:var(--sage-light);font-size:10.5px;line-height:1.6;}
  .main{flex:1;overflow-y:auto;background:var(--cream);}
  .pg{padding:20px;max-width:940px;}
  @media(max-width:660px){.layout{flex-direction:column;}.sidebar{width:100%;display:flex;overflow-x:auto;overflow-y:hidden;}.sitem{padding:9px 11px;border-left:none;border-bottom:2.5px solid transparent;white-space:nowrap;font-size:11px;}.sitem.on{border-bottom-color:var(--amber2);border-left:none;background:rgba(255,255,255,0.07);}.sfoot{display:none;}.pg{padding:13px;}}
  .ttl{font-family:'Playfair Display',serif;font-size:22px;color:var(--forest);margin-bottom:3px;}
  .sub{color:var(--muted);font-size:13px;margin-bottom:17px;line-height:1.6;}
  .ctitle{font-family:'Playfair Display',serif;font-size:15.5px;color:var(--forest);margin-bottom:8px;}
  .lbl{font-size:11px;font-weight:600;color:var(--forest);margin-bottom:4px;display:block;text-transform:uppercase;letter-spacing:0.5px;}
  .card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:17px;box-shadow:var(--sh);}
  .mb{margin-bottom:11px;}
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:15px;}
  .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:11px;}
  @media(max-width:660px){.g2,.g3,.g4{grid-template-columns:1fr;}}
  .btn{padding:8px 15px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:500;font-size:12.5px;cursor:pointer;border:none;transition:all 0.18s;}
  .bf{background:var(--forest);color:var(--cream);}
  .bf:hover{background:var(--forest2);}
  .bf:disabled{opacity:0.4;cursor:not-allowed;}
  .ba{background:var(--amber);color:white;}
  .ba:hover:not(:disabled){background:#b5712f;}
  .ba:disabled{opacity:0.4;cursor:not-allowed;}
  .bo{background:transparent;color:var(--forest);border:1.5px solid var(--border);}
  .bo:hover{background:var(--forest);color:var(--cream);}
  .bsm{padding:5px 10px;font-size:11px;border-radius:7px;}
  .bfull{width:100%;}
  select,textarea,input[type=text]{font-family:'DM Sans',sans-serif;font-size:12.5px;border:1.5px solid var(--border);border-radius:8px;padding:8px 11px;background:white;color:var(--text);width:100%;outline:none;transition:border-color 0.2s;}
  select:focus,textarea:focus,input[type=text]:focus{border-color:var(--sage);}
  textarea{resize:vertical;line-height:1.65;}
  .tag{display:inline-block;padding:2px 8px;border-radius:20px;font-size:10.5px;font-weight:500;margin:2px;}
  .tg{background:#e8f5e9;color:#2e7d32;}.ty{background:#fff8e1;color:#8d5a00;}.tr{background:#fce4ec;color:#c62828;}.tb{background:#e3f2fd;color:#1565c0;}.tp{background:#f3e5f5;color:#6a1b9a;}
  .airesp{background:#f0f5f1;border:1px solid var(--sage-light);border-radius:9px;padding:13px;font-size:12.5px;line-height:1.75;white-space:pre-wrap;margin-top:11px;}
  .ld::after{content:'...';animation:ldots 1.2s infinite;}
  @keyframes ldots{0%,20%{content:'.'}40%{content:'..'}60%,100%{content:'...'}}
  hr{border:none;border-top:1px solid var(--border);margin:15px 0;}
  .pcard{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:13px 15px;display:flex;align-items:center;gap:11px;text-decoration:none;transition:all 0.2s;}
  .pcard:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(27,58,44,0.12);border-color:var(--sage);}
  .picon{width:35px;height:35px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
  .cgrid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:13px;}
  .cdow{text-align:center;font-size:10px;font-weight:600;color:var(--muted);padding:4px 0;text-transform:uppercase;letter-spacing:0.4px;}
  .cday{min-height:44px;background:white;border:1.5px solid var(--border);border-radius:7px;padding:5px;cursor:pointer;transition:all 0.15s;display:flex;flex-direction:column;align-items:flex-start;}
  .cday:hover{border-color:var(--sage);background:#f5faf6;}
  .cday.ctoday{border-color:var(--amber);background:#fff8f0;}
  .cday.csel{border-color:var(--forest);background:#e8f0eb;box-shadow:inset 0 0 0 1px var(--forest);}
  .cday.cempty{background:transparent;border-color:transparent;cursor:default;}
  .cnum{font-weight:600;font-size:12px;}
  .cdot{width:5px;height:5px;border-radius:50%;background:var(--amber);margin-top:3px;}
  .anet{border-left:3px solid var(--amber);padding-left:13px;margin-bottom:16px;}
  .wo{margin-top:8px;padding:8px 11px;background:#fff8e1;border-radius:7px;font-size:11.5px;color:#5d4037;line-height:1.55;}
  .warn{background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:10px 13px;font-size:12px;color:#856404;margin-bottom:13px;line-height:1.55;}
  .disc{background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:11px;font-size:12px;line-height:1.65;color:#5d4037;}
  .titem{display:flex;gap:10px;margin-bottom:12px;}
  .tdot{width:9px;height:9px;border-radius:50%;background:var(--amber);flex-shrink:0;margin-top:4px;}
  .scard{padding:13px;background:#f0f5f1;border-radius:9px;border:1px solid var(--sage-light);}
  .snum{width:23px;height:23px;background:var(--forest);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;margin-bottom:7px;}
  .statcard{background:var(--card);border:1px solid var(--border);border-radius:11px;padding:14px;text-align:center;box-shadow:var(--sh);}
  .statnum{font-family:'Playfair Display',serif;font-size:24px;color:var(--forest);margin-bottom:3px;}
  .statlbl{font-size:11px;color:var(--muted);}
  .between{display:flex;justify-content:space-between;align-items:center;}
  .prodcard{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:13px;}
  .row{display:flex;gap:7px;align-items:center;flex-wrap:wrap;}
`;

const SYS = `You are the Mockingbird Collective marketing assistant for Cherrell Carson, an ethical digital marketer.

NON-NEGOTIABLE ETHICAL RULES:
- Never create fake urgency ("only 3 left!", "limited time!")
- Never make inflated income or results claims  
- Always include FTC disclosure language when promoting products
- Always give honest pros AND cons — no one-sided cheerleading
- Set realistic expectations — meaningful affiliate results take 3–6 months
- Only recommend products that pass genuine vetting

BRAND: Mockingbird Collective. Voice: warm, genuine, trustworthy — like a knowledgeable best friend, not a pushy marketer.
PLATFORMS: Instagram @cherrellcarson, Pinterest rellmomma, TikTok @mockingbirdcollective (brand) & @rell.rica (personal), Facebook, Threads @cherrellcarson.
AFFILIATE NETWORKS: Amazon Associates (24hr cookie, 1–4%), Mavely (social-first, instant payouts), Benable (list-based, Pinterest-friendly).
CONTENT PILLARS: Education/Tips, Product Recommendations, Personal Story, Behind the Scenes, Lifestyle, Trending/Seasonal.

Be direct and realistic. No cheerleading. Name risks and downsides clearly.`;

async function callAI(prompt) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYS,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const d = await r.json();
  return d.content?.map(b => b.text || "").join("") || "No response. Please try again.";
}

const PLATFORMS = [
  { name: "Instagram", handle: "@cherrellcarson", url: "https://www.instagram.com/cherrellcarson/", icon: "📸", bg: "#fce4ec", badge: "Personal Brand", bc: "#fce4ec", bt: "#c62828" },
  { name: "Pinterest", handle: "rellmomma", url: "https://www.pinterest.com/rellmomma/", icon: "📌", bg: "#fdecea", badge: "🔥 Top Priority", bc: "#fff3e0", bt: "#e65100" },
  { name: "TikTok", handle: "@mockingbirdcollective", url: "https://www.tiktok.com/@mockingbirdcollective", icon: "🎵", bg: "#f5f5f5", badge: "Brand Account", bc: "#e8f5e9", bt: "#2e7d32" },
  { name: "TikTok", handle: "@rell.rica", url: "https://www.tiktok.com/@rell.rica", icon: "🎵", bg: "#f0f0f0", badge: "Personal", bc: "#f0f0f0", bt: "#555" },
  { name: "Facebook", handle: "cherrell.carson", url: "https://www.facebook.com/cherrell.carson", icon: "👤", bg: "#e3f2fd", badge: "Personal", bc: "#e3f2fd", bt: "#1565c0" },
  { name: "Threads", handle: "@cherrellcarson", url: "https://www.threads.com/@cherrellcarson", icon: "🧵", bg: "#ede7f6", badge: "New Platform", bc: "#ede7f6", bt: "#4527a0" },
];

const TABS = [
  { id: "overview",  label: "Overview",        icon: "🏠" },
  { id: "brand",     label: "Brand & Niche",    icon: "🎨" },
  { id: "calendar",  label: "Content Calendar", icon: "📅" },
  { id: "studio",    label: "Content Studio",   icon: "✍️" },
  { id: "products",  label: "My Products",      icon: "📦" },
  { id: "social",    label: "Social Hub",       icon: "📱" },
  { id: "affiliate", label: "Affiliate Hub",    icon: "💰" },
  { id: "email",     label: "Email Hub",        icon: "📧" },
  { id: "setup",     label: "Setup Guide",      icon: "📋" },
];

const DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function App() {
  const [tab, setTab] = useState("overview");
  const [brandQ, setBrandQ] = useState(""); const [brandR, setBrandR] = useState(""); const [brandL, setBrandL] = useState(false);
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth(), today = now.getDate();
  const monthName = now.toLocaleString("default", { month: "long" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calDays = [];
  for (let i = 0; i < firstDay; i++) calDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calDays.push(d);
  const [selDay, setSelDay] = useState(null);
  const [calPlatform, setCalPlatform] = useState("Instagram");
  const [calType, setCalType] = useState("caption");
  const [calTopic, setCalTopic] = useState("");
  const [calSlots, setCalSlots] = useState({});
  const [calR, setCalR] = useState(""); const [calL, setCalL] = useState(false);
  const [cPlatform, setCPlatform] = useState("Instagram (@cherrellcarson)");
  const [cPillar, setCPillar] = useState("Education / Tips");
  const [cStyle, setCStyle] = useState("a personal photo of me (Rellby)");
  const [cTopic, setCTopic] = useState(""); const [cProduct, setCProduct] = useState("");
  const [cResult, setCResult] = useState(""); const [cLoading, setCLoading] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: "Amazon Organization Bins", network: "Amazon", category: "Home & Organization", status: "Active", notes: "Great converter for home content" },
    { id: 2, name: "Example Product", network: "Mavely", category: "Beauty", status: "Vet Pending", notes: "" },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newProd, setNewProd] = useState({ name: "", network: "Amazon", category: "", notes: "" });
  const [vetQ, setVetQ] = useState(""); const [vetR, setVetR] = useState(""); const [vetL, setVetL] = useState(false);
  const [analyzeIn, setAnalyzeIn] = useState(""); const [analyzeR, setAnalyzeR] = useState(""); const [analyzeL, setAnalyzeL] = useState(false);
  const [aQ, setAQ] = useState(""); const [aR, setAR] = useState(""); const [aL, setAL] = useState(false);
  const [eType, setEType] = useState("welcome"); const [eTopic, setETopic] = useState(""); const [eR, setER] = useState(""); const [eL, setEL] = useState(false);

  const run = async (prompt, setR, setL) => {
    setL(true); setR("");
    try { setR(await callAI(prompt)); } catch { setR("Error connecting. Please try again."); }
    setL(false);
  };
  const copy = t => navigator.clipboard?.writeText(t);
  const addProduct = () => {
    if (!newProd.name) return;
    setProducts(p => [...p, { ...newProd, id: Date.now(), status: "Vet Pending" }]);
    setNewProd({ name: "", network: "Amazon", category: "", notes: "" });
    setShowAdd(false);
  };

  return (
    <div className="db">
      <style>{css}</style>
      <div className="hdr">
        <div className="hbrand">
          <div className="hlogo">🐦</div>
          <div><div className="htitle">Mockingbird Collective</div><div className="hsub">ETHICAL DIGITAL MARKETING DASHBOARD</div></div>
        </div>
        <div className="huser"><strong>Cherrell Carson</strong>Walterboro, SC</div>
      </div>
      <div className="layout">
        <div className="sidebar">
          {TABS.map(t=>(
            <div key={t.id} className={`sitem${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>
              <span style={{fontSize:13,flexShrink:0}}>{t.icon}</span>{t.label}
            </div>
          ))}
          <div className="sfoot">Mockingbird Collective<br/><span style={{opacity:.6}}>v2.0 · All 9 tabs active</span></div>
        </div>
        <div className="main">
          <div className="pg">

            {tab==="overview"&&(
              <div>
                <div className="ttl">Good to see you, Cherrell 🐦</div>
                <div className="sub">Your Mockingbird Collective command center — everything in one place.</div>
                <div className="g4" style={{marginBottom:16}}>
                  {[{v:"6",l:"Active Platforms",n:"All linked"},{v:"3",l:"Affiliate Networks",n:"Amazon · Mavely · Benable"},{v:"9",l:"Dashboard Tabs",n:"All features active"},{v:"3–6",l:"Months to Results",n:"Realistic timeline"}].map((s,i)=>(
                    <div key={i} className="statcard"><div className="statnum">{s.v}</div><div className="statlbl" style={{fontWeight:600,color:"var(--forest)",marginBottom:2}}>{s.l}</div><div className="statlbl">{s.n}</div></div>
                  ))}
                </div>
                <div className="g2" style={{marginBottom:15}}>
                  <div className="card">
                    <div className="ctitle">⚡ Quick Actions</div>
                    {[{label:"Write content for today",t:"studio",icon:"✍️"},{label:"Plan this week's calendar",t:"calendar",icon:"📅"},{label:"Add & vet a product",t:"products",icon:"📦"},{label:"Write an email",t:"email",icon:"📧"},{label:"Ask your brand advisor",t:"brand",icon:"🎨"},{label:"Analyze your accounts",t:"social",icon:"📱"}].map((a,i)=>(
                      <div key={i} onClick={()=>setTab(a.t)} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 0",borderBottom:"1px solid var(--border)",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.color="var(--forest2)"} onMouseLeave={e=>e.currentTarget.style.color="var(--text)"}>
                        <span style={{fontSize:14}}>{a.icon}</span><span style={{fontSize:13}}>{a.label}</span><span style={{marginLeft:"auto",color:"var(--muted)",fontSize:11}}>→</span>
                      </div>
                    ))}
                  </div>
                  <div className="card">
                    <div className="ctitle">📌 Pinterest Priority Reminder</div>
                    <p style={{fontSize:12.5,color:"var(--muted)",lineHeight:1.7,marginBottom:10}}>Pinterest is your highest long-term ROI platform. A pin today can drive traffic for <strong>months or years</strong> — unlike every other platform you're on.</p>
                    {["Pin 5–10 times daily","Vertical images only (2:3 ratio)","Keyword-rich descriptions","One board per niche","Direct affiliate links allowed"].map((t,i)=>(
                      <div key={i} style={{display:"flex",gap:7,fontSize:12.5,padding:"5px 0"}}><span style={{color:"var(--amber)"}}>→</span>{t}</div>
                    ))}
                    <button className="btn bf" style={{marginTop:12}} onClick={()=>setTab("social")}>Open Social Hub</button>
                  </div>
                </div>
                <div className="card">
                  <div className="ctitle">⏱️ Honest Milestone Timeline</div>
                  <div className="g3" style={{marginTop:12}}>
                    {[{phase:"Month 1",status:"Foundation",desc:"Set up tools, post consistently, build Pinterest boards, write your first email sequence."},{phase:"Month 2–3",status:"Building",desc:"Find your content rhythm, test what resonates, first affiliate link clicks appear."},{phase:"Month 4–6",status:"Results",desc:"First meaningful commissions. Things compound from here if you've been consistent."}].map((p,i)=>(
                      <div key={i} style={{padding:12,background:"#f0f5f1",borderRadius:9,border:"1px solid var(--sage-light)"}}>
                        <div style={{fontWeight:600,fontSize:12.5,color:"var(--forest)",marginBottom:4}}>{p.phase}</div>
                        <span className="tag tg" style={{marginBottom:7,display:"inline-block"}}>{p.status}</span>
                        <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.65}}>{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab==="brand"&&(
              <div>
                <div className="ttl">Brand & Niche</div>
                <div className="sub">Your brand identity, content pillars, and an AI advisor for honest positioning guidance.</div>
                <div className="g2" style={{marginBottom:15}}>
                  <div className="card">
                    <div className="ctitle">🎨 Brand Identity</div>
                    {[["Brand Name","Mockingbird Collective"],["Your Name","Cherrell Carson"],["Mission","Ethical, trust-based affiliate recommendations"],["Brand Voice","Warm, genuine — like a trusted friend"],["Core Value","Honesty over quick commissions"],["Networks","Amazon · Mavely · Benable"],["Primary Platform","Pinterest (evergreen, compounds)"]].map(([l,v],i)=>(
                      <div key={i} style={{display:"flex",gap:9,padding:"7px 0",borderBottom:"1px solid var(--border)"}}>
                        <div style={{fontSize:11.5,color:"var(--muted)",width:120,flexShrink:0}}>{l}</div>
                        <div style={{fontSize:12.5,fontWeight:500,color:"var(--forest)"}}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="card">
                    <div className="ctitle">📌 Your 6 Content Pillars</div>
                    <p style={{fontSize:12.5,color:"var(--muted)",marginBottom:11,lineHeight:1.65}}>Rotate through these so your content serves different audience needs.</p>
                    {[{p:"Education / Tips",d:"How-to, tutorials, practical advice",tag:"tg"},{p:"Product Recommendations",d:"Honest reviews and affiliate picks",tag:"tb"},{p:"Personal Story",d:"Your journey, wins, setbacks — trust builder",tag:"tp"},{p:"Behind the Scenes",d:"Process, workspace, day-in-the-life",tag:"ty"},{p:"Lifestyle",d:"Shows your aesthetic and values",tag:"tg"},{p:"Trending / Seasonal",d:"Timely content tied to trends",tag:"ty"}].map((item,i)=>(
                      <div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:"1px solid var(--border)",alignItems:"flex-start"}}>
                        <span className={`tag ${item.tag}`} style={{flexShrink:0,marginTop:1,whiteSpace:"nowrap"}}>{item.p}</span>
                        <div style={{fontSize:11.5,color:"var(--muted)",lineHeight:1.55}}>{item.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <div className="ctitle">🤖 Brand Advisor AI</div>
                  <p style={{fontSize:12.5,color:"var(--muted)",marginBottom:11,lineHeight:1.65}}>Ask anything about brand positioning, niche strategy, or differentiating Mockingbird Collective. Direct, realistic answers only.</p>
                  <textarea value={brandQ} onChange={e=>setBrandQ(e.target.value)} rows={4} style={{marginBottom:10}} placeholder="e.g. What niche should I focus on first? How do I stand out? Which pillar should I start with?..."/>
                  <button className="btn bf bfull" disabled={!brandQ||brandL} onClick={()=>run(`Brand strategy question for Mockingbird Collective: ${brandQ}. Give direct, actionable advice. Be honest about what will and won't work.`,setBrandR,setBrandL)}>
                    {brandL?<span className="ld">Advising</span>:"🎨 Get Brand Advice"}
                  </button>
                  {brandR&&<div className="airesp">{brandR}</div>}
                </div>
              </div>
            )}

            {tab==="calendar"&&(
              <div>
                <div className="ttl">Content Calendar</div>
                <div className="sub">Plan your content by the month. Click any date to generate a caption for that slot with AI.</div>
                <div className="card" style={{marginBottom:15}}>
                  <div className="between" style={{marginBottom:12}}>
                    <div className="ctitle" style={{margin:0}}>{monthName} {year}</div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      <span className="tag ty">= Today</span><span className="tag tg">● = Saved</span><span className="tag tb">Click to write</span>
                    </div>
                  </div>
                  <div className="cgrid">{DOW.map(d=><div key={d} className="cdow">{d}</div>)}</div>
                  <div className="cgrid">
                    {calDays.map((day,i)=>(
                      <div key={i} className={`cday${day===null?" cempty":""}${day===today?" ctoday":""}${day===selDay?" csel":""}`}
                        onClick={()=>{if(day){setSelDay(day);setCalR(calSlots[day]||"");setCalTopic("");}}}>
                        {day&&<span className="cnum">{day}</span>}
                        {day&&calSlots[day]&&<div className="cdot"/>}
                      </div>
                    ))}
                  </div>
                </div>
                {selDay?(
                  <div className="card">
                    <div className="ctitle">✍️ Write Content for {monthName} {selDay}</div>
                    <div className="g2" style={{marginBottom:11}}>
                      <div><label className="lbl">Platform</label>
                        <select value={calPlatform} onChange={e=>setCalPlatform(e.target.value)}>
                          <option>Instagram</option><option>Pinterest</option><option>TikTok (Brand)</option><option>TikTok (Personal)</option><option>Facebook</option><option>Threads</option>
                        </select>
                      </div>
                      <div><label className="lbl">Content Type</label>
                        <select value={calType} onChange={e=>setCalType(e.target.value)}>
                          <option value="caption">Caption</option><option value="pin description">Pin Description</option><option value="video hook">Video Hook</option><option value="story sequence">Story Sequence</option>
                        </select>
                      </div>
                    </div>
                    <div style={{marginBottom:12}}>
                      <label className="lbl">Topic for {monthName} {selDay}</label>
                      <input type="text" value={calTopic} onChange={e=>setCalTopic(e.target.value)} placeholder="e.g. home organization tips, product recommendation, personal story..."/>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button className="btn bf" disabled={!calTopic||calL}
                        onClick={()=>run(`Write a ${calType} for ${calPlatform} scheduled for ${monthName} ${selDay}. Topic: ${calTopic}. Follow ethical guidelines. Include FTC disclosure if promoting a product. Warm, authentic tone.`,
                          (r)=>{setCalR(r);setCalSlots(prev=>({...prev,[selDay]:r}));},calL?()=>{}:setCalL)}>
                        {calL?<span className="ld">Writing</span>:"✨ AI Write Caption"}
                      </button>
                      {calSlots[selDay]&&<button className="btn bo bsm" onClick={()=>setCalR(calSlots[selDay])}>View Saved</button>}
                    </div>
                    {calL&&<div style={{color:"var(--sage)",fontSize:12.5,marginTop:9}} className="ld">Writing your content</div>}
                    {calR&&(
                      <div>
                        <div className="airesp">{calR}</div>
                        <div style={{marginTop:8,display:"flex",gap:7,justifyContent:"flex-end"}}>
                          <button className="btn bo bsm" onClick={()=>copy(calR)}>Copy</button>
                          <button className="btn ba bsm" onClick={()=>setTab("studio")}>Refine in Studio</button>
                        </div>
                      </div>
                    )}
                  </div>
                ):(
                  <div className="card" style={{textAlign:"center",padding:26}}>
                    <div style={{fontSize:28,marginBottom:7}}>📅</div>
                    <div style={{fontSize:13,color:"var(--muted)"}}>Click any date above to write AI content for that slot.<br/>Saved captions show as orange dots.</div>
                  </div>
                )}
              </div>
            )}

            {tab==="studio"&&(
              <div>
                <div className="ttl">Content Studio</div>
                <div className="sub">AI-generated content with your brand voice and ethical guardrails built in. No fake urgency. Ever.</div>
                <div className="g2">
                  <div className="card">
                    <div className="ctitle">✨ Generate Content</div>
                    <div className="mb"><label className="lbl">Platform</label>
                      <select value={cPlatform} onChange={e=>setCPlatform(e.target.value)}>
                        <option>Instagram (@cherrellcarson)</option><option>Pinterest (rellmomma)</option>
                        <option>TikTok (@mockingbirdcollective)</option><option>TikTok (@rell.rica)</option>
                        <option>Facebook</option><option>Threads (@cherrellcarson)</option>
                      </select>
                    </div>
                    <div className="mb"><label className="lbl">Content Pillar</label>
                      <select value={cPillar} onChange={e=>setCPillar(e.target.value)}>
                        <option>Education / Tips</option><option>Product Recommendation</option>
                        <option>Personal Story</option><option>Behind the Scenes</option>
                        <option>Lifestyle</option><option>Trending / Seasonal</option>
                      </select>
                    </div>
                    <div className="mb"><label className="lbl">Visual Style (Rellby)</label>
                      <select value={cStyle} onChange={e=>setCStyle(e.target.value)}>
                        <option value="a personal photo of me (Rellby)">📸 Personal Photo of Me (Rellby)</option>
                        <option value="a product flat lay">📦 Product Flat Lay</option>
                        <option value="a lifestyle/aesthetic shot">🌿 Lifestyle / Aesthetic Shot</option>
                        <option value="a text-based graphic">📱 Text-Based Graphic</option>
                        <option value="a video or reel">🎬 Video / Reel</option>
                      </select>
                    </div>
                    <div className="mb"><label className="lbl">Topic or Theme</label>
                      <input type="text" value={cTopic} onChange={e=>setCTopic(e.target.value)} placeholder="e.g. cozy home organization, budget skincare tips..."/>
                    </div>
                    <div style={{marginBottom:15}}><label className="lbl">Product Being Promoted (optional)</label>
                      <input type="text" value={cProduct} onChange={e=>setCProduct(e.target.value)} placeholder="e.g. Amazon storage bins, Mavely brand..."/>
                    </div>
                    <button className="btn bf bfull" disabled={!cTopic||cLoading}
                      onClick={()=>run(`Write content for Mockingbird Collective. Platform: ${cPlatform}. Pillar: ${cPillar}. Visual style: ${cStyle}. Topic: ${cTopic}. ${cProduct?`Product: ${cProduct}.`:""} Follow ethical guidelines. Include FTC disclosure if promoting a product. Be warm, authentic, relatable. Add relevant hashtags at the end.`,setCResult,setCLoading)}>
                      {cLoading?<span className="ld">Generating</span>:"✨ Generate Content"}
                    </button>
                  </div>
                  <div className="card" style={{minHeight:300}}>
                    <div className="between" style={{marginBottom:8}}>
                      <div className="ctitle" style={{margin:0}}>Generated Content</div>
                      {cResult&&<button className="btn bo bsm" onClick={()=>copy(cResult)}>Copy</button>}
                    </div>
                    {!cResult&&!cLoading&&<p style={{color:"var(--muted)",fontSize:12.5,lineHeight:1.7}}>Your content appears here. FTC disclosure is automatically included when promoting products.</p>}
                    {cLoading&&<div style={{color:"var(--sage)",fontSize:12.5,marginTop:11}} className="ld">Creating your content</div>}
                    {cResult&&<div className="airesp">{cResult}</div>}
                  </div>
                </div>
              </div>
            )}

            {tab==="products"&&(
              <div>
                <div className="ttl">My Products</div>
                <div className="sub">Track everything you're promoting or considering. Vet before you post — your reputation depends on it.</div>
                <div className="g2">
                  <div>
                    <div className="between" style={{marginBottom:11}}>
                      <div style={{fontSize:13,fontWeight:600,color:"var(--forest)"}}>Product List ({products.length})</div>
                      <button className="btn ba bsm" onClick={()=>setShowAdd(!showAdd)}>{showAdd?"Cancel":"+ Add Product"}</button>
                    </div>
                    {showAdd&&(
                      <div className="card" style={{marginBottom:12}}>
                        <div className="ctitle">Add New Product</div>
                        <div className="mb"><label className="lbl">Product Name</label><input type="text" value={newProd.name} onChange={e=>setNewProd({...newProd,name:e.target.value})} placeholder="Product name..."/></div>
                        <div className="mb"><label className="lbl">Network</label>
                          <select value={newProd.network} onChange={e=>setNewProd({...newProd,network:e.target.value})}>
                            <option>Amazon</option><option>Mavely</option><option>Benable</option><option>Other</option>
                          </select>
                        </div>
                        <div className="mb"><label className="lbl">Category</label><input type="text" value={newProd.category} onChange={e=>setNewProd({...newProd,category:e.target.value})} placeholder="e.g. Home, Beauty, Fashion..."/></div>
                        <div style={{marginBottom:12}}><label className="lbl">Notes</label><textarea value={newProd.notes} onChange={e=>setNewProd({...newProd,notes:e.target.value})} rows={2} placeholder="Personal notes..."/></div>
                        <button className="btn bf" disabled={!newProd.name} onClick={addProduct}>Add to List</button>
                      </div>
                    )}
                    <div style={{display:"flex",flexDirection:"column",gap:9}}>
                      {products.map(p=>(
                        <div key={p.id} className="prodcard">
                          <div className="between" style={{marginBottom:6}}>
                            <div style={{fontWeight:600,fontSize:13,color:"var(--forest)"}}>{p.name}</div>
                            <button className="btn bo bsm" onClick={()=>setProducts(prev=>prev.filter(x=>x.id!==p.id))} style={{color:"#c62828",fontSize:11}}>Remove</button>
                          </div>
                          <div className="row" style={{marginBottom:7}}>
                            <span className="tag tb">{p.network}</span>
                            {p.category&&<span className="tag ty">{p.category}</span>}
                            <span className={`tag ${p.status==="Active"?"tg":"tr"}`}>{p.status}</span>
                          </div>
                          {p.notes&&<div style={{fontSize:11.5,color:"var(--muted)",marginBottom:8}}>{p.notes}</div>}
                          <button className="btn ba bsm" onClick={()=>setVetQ(`Product: ${p.name}. Network: ${p.network}. Category: ${p.category}. ${p.notes}`)}>🔍 Vet This Product</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card" style={{minHeight:300}}>
                    <div className="ctitle">🔍 Product Vetting Tool</div>
                    <p style={{fontSize:12.5,color:"var(--muted)",marginBottom:11,lineHeight:1.65}}>Describe any product for an honest assessment. Click "Vet This Product" on a card to auto-fill, or type manually.</p>
                    <textarea value={vetQ} onChange={e=>setVetQ(e.target.value)} rows={4} style={{marginBottom:11}} placeholder="Describe the product — price, brand, claims made, your experience, where you'd promote it..."/>
                    <button className="btn ba bfull" disabled={!vetQ||vetL}
                      onClick={()=>run(`Vet this product for honest promotion: ${vetQ}. Is it worth recommending? Real pros and cons? Red flags? What should Cherrell know before promoting? Be direct.`,setVetR,setVetL)}>
                      {vetL?<span className="ld">Vetting</span>:"🔍 Vet This Product"}
                    </button>
                    {vetL&&<div style={{color:"var(--sage)",fontSize:12.5,marginTop:9}} className="ld">Analyzing product</div>}
                    {vetR&&<div className="airesp">{vetR}</div>}
                  </div>
                </div>
              </div>
            )}

            {tab==="social"&&(
              <div>
                <div className="ttl">Social Hub</div>
                <div className="sub">All your accounts — plus an honest AI account analyzer to guide your growth strategy.</div>
                <div className="g2" style={{marginBottom:16}}>
                  {PLATFORMS.map((p,i)=>(
                    <a key={i} className="pcard" href={p.url} target="_blank" rel="noopener noreferrer">
                      <div className="picon" style={{background:p.bg}}>{p.icon}</div>
                      <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:"var(--forest)"}}>{p.name}</div><div style={{fontSize:11.5,color:"var(--muted)",marginTop:1}}>{p.handle}</div></div>
                      <span className="tag" style={{background:p.bc,color:p.bt}}>{p.badge}</span>
                    </a>
                  ))}
                </div>
                <div className="card" style={{marginBottom:15}}>
                  <div className="ctitle">🔬 Account Analyzer</div>
                  <p style={{fontSize:12.5,color:"var(--muted)",marginBottom:11,lineHeight:1.65}}>Paste your handles or describe your current situation across platforms. Get an honest audit — what's working, what isn't, where to focus first.</p>
                  <textarea value={analyzeIn} onChange={e=>setAnalyzeIn(e.target.value)} rows={4} style={{marginBottom:11}}
                    placeholder="e.g. Instagram @cherrellcarson — posting 2x/week, low reach. TikTok @mockingbirdcollective — just started, 0 followers. Pinterest rellmomma — 12 boards, limited activity..."/>
                  <button className="btn bf bfull" disabled={!analyzeIn||analyzeL}
                    onClick={()=>run(`Analyze these Mockingbird Collective accounts for Cherrell Carson: ${analyzeIn}. Give an honest audit — what's working, what isn't, where to prioritize. Be specific, realistic, direct. No empty encouragement.`,setAnalyzeR,setAnalyzeL)}>
                    {analyzeL?<span className="ld">Analyzing</span>:"🔬 Analyze My Accounts"}
                  </button>
                  {analyzeL&&<div style={{color:"var(--sage)",fontSize:12.5,marginTop:9}} className="ld">Running honest audit</div>}
                  {analyzeR&&<div><div className="airesp">{analyzeR}</div><div style={{marginTop:8,display:"flex",justifyContent:"flex-end"}}><button className="btn bo bsm" onClick={()=>copy(analyzeR)}>Copy</button></div></div>}
                </div>
                <div className="card">
                  <div className="ctitle">📊 Platform Strategy Reference</div>
                  <div className="g3" style={{marginTop:11}}>
                    {[{p:"Pinterest",t:"Pin 5–10x daily. Vertical images. Keyword descriptions. Highest long-term affiliate ROI."},{p:"Instagram",t:"Reels for reach. Stories for daily engagement. Link in bio for affiliate traffic."},{p:"TikTok Brand",t:"@mockingbirdcollective for product reviews, brand voice, monetized content."},{p:"TikTok Personal",t:"@rell.rica for authentic moments and personal story."},{p:"Facebook",t:"Community groups. Longer posts. Strong for repeat, engaged buyers."},{p:"Threads",t:"Short tips and thoughts. Builds authority with low time investment."}].map((item,i)=>(
                      <div key={i} style={{padding:11,background:"#f7f3ed",borderRadius:8,border:"1px solid var(--border)"}}>
                        <div style={{fontWeight:600,fontSize:12.5,color:"var(--forest)",marginBottom:5}}>{item.p}</div>
                        <div style={{fontSize:11.5,color:"var(--muted)",lineHeight:1.65}}>{item.t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab==="affiliate"&&(
              <div>
                <div className="ttl">Affiliate Hub</div>
                <div className="sub">Your three networks — honest assessments plus an advisor for strategy questions.</div>
                <div className="card" style={{marginBottom:15}}>
                  {[{name:"Amazon Associates",tags:[["tg","Massive catalog"],["tg","High buyer trust"],["ty","24-hour cookie only"],["ty","1–4% commissions"]],desc:"Best for high-volume, impulse-buy products. Amazon's trust converts well, but the 24-hour cookie means you only get credit if someone buys quickly. Stack with buying-intent content — roundups and 'best of' lists.",wo:"Amazon changes commission rates with almost no notice. Don't build your entire strategy around it."},{name:"Mavely",tags:[["tg","Social-first design"],["tg","Instant payouts"],["tg","Thousands of brands"],["ty","Brand availability varies"]],desc:"Designed for social media creators. Smooth mobile experience is ideal for Instagram and TikTok. Instant payout is genuinely one of the best features in the industry.",wo:"Not every brand will be in their catalog. Always check before creating content around a specific product."},{name:"Benable",tags:[["tg","List-based format"],["tg","Pinterest-friendly"],["tg","Trust-based by design"],["ty","Smaller catalog"]],desc:"Benable's curated list format fits naturally with your honest brand. Pairs extremely well with Pinterest — lists drive clicks over months. Best for thoughtful recommendation content.",wo:"Smaller catalog means gaps. Use alongside other networks, not as a standalone."}].map((n,i)=>(
                    <div key={i} className="anet">
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:"var(--forest)",marginBottom:6}}>{n.name}</div>
                      <div style={{marginBottom:7}}>{n.tags.map(([cls,label],j)=><span key={j} className={`tag ${cls}`}>{label}</span>)}</div>
                      <p style={{fontSize:12.5,color:"var(--muted)",lineHeight:1.7}}>{n.desc}</p>
                      <div className="wo">⚠️ <strong>Watch out:</strong> {n.wo}</div>
                    </div>
                  ))}
                </div>
                <div className="g2">
                  <div className="card">
                    <div className="ctitle">🤖 Honest Marketing Advisor</div>
                    <p style={{fontSize:12.5,color:"var(--muted)",marginBottom:11,lineHeight:1.65}}>Ask anything about affiliate strategy, FTC disclosures, or whether something is ethical. Direct answers only.</p>
                    <textarea value={aQ} onChange={e=>setAQ(e.target.value)} rows={3} style={{marginBottom:10}} placeholder="e.g. Which network first? How do I disclose on TikTok? Is it okay to promote something I haven't tried?..."/>
                    <button className="btn bf bfull" disabled={!aQ||aL} onClick={()=>run(`Affiliate question from Cherrell: ${aQ}. Direct, honest advice. Name all risks clearly.`,setAR,setAL)}>
                      {aL?<span className="ld">Thinking</span>:"🎯 Get Honest Advice"}
                    </button>
                    {aR&&<div className="airesp">{aR}</div>}
                  </div>
                  <div className="card">
                    <div className="ctitle">📋 FTC Disclosure Templates</div>
                    {[{p:"Instagram & Facebook",t:'Use #ad or #sponsored at the START — not buried. Or: "This post contains affiliate links. I earn a small commission at no extra cost to you."'},{p:"TikTok",t:"Say the disclosure OUT LOUD in the first few seconds AND use the paid partnership label in-app."},{p:"Pinterest",t:'"Affiliate link — I may earn a commission from purchases through this link." — in every pin description.'},{p:"Email",t:'"Some links are affiliate links. I only recommend products I genuinely believe in." — at the top of every email.'}].map((d,i)=>(
                      <div key={i} className="disc" style={{marginBottom:7}}>
                        <div style={{fontWeight:600,marginBottom:4,color:"var(--forest)"}}>{d.p}</div>{d.t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab==="email"&&(
              <div>
                <div className="ttl">Email Hub</div>
                <div className="sub">Build your list and write emails people actually want to read. No spam tactics. No fake urgency.</div>
                <div className="g2">
                  <div>
                    <div className="card" style={{marginBottom:14}}>
                      <div className="ctitle">✉️ AI Email Writer</div>
                      <div className="mb"><label className="lbl">Email Type</label>
                        <select value={eType} onChange={e=>setEType(e.target.value)}>
                          <option value="welcome">Welcome Email</option><option value="newsletter">Regular Newsletter</option>
                          <option value="product recommendation">Product Recommendation</option><option value="weekly favorites roundup">Weekly Favorites Roundup</option>
                          <option value="personal story + recommendation">Personal Story + Recommendation</option><option value="re-engagement">Re-engagement Email</option>
                        </select>
                      </div>
                      <div style={{marginBottom:14}}><label className="lbl">What's this email about?</label>
                        <textarea value={eTopic} onChange={e=>setETopic(e.target.value)} rows={5} placeholder="e.g. Welcoming new subscribers, my honest review of [product], my top 5 home finds this week..."/>
                      </div>
                      <button className="btn bf bfull" disabled={!eTopic||eL}
                        onClick={()=>run(`Write a ${eType} email for Mockingbird Collective. Topic: ${eTopic}. Include a subject line. Be warm, genuine, honest. No fake urgency. Include FTC disclosure if promoting products.`,setER,setEL)}>
                        {eL?<span className="ld">Writing</span>:"✉️ Write Email"}
                      </button>
                    </div>
                    <div className="card">
                      <div className="ctitle">🔧 Email Setup Checklist</div>
                      {[{i:"Create Formspree account",n:"Free embeddable forms — formspree.io"},{i:"Create Mailchimp account",n:"Free to 500 contacts — mailchimp.com"},{i:"Write your welcome email",n:"First email new subscribers receive"},{i:"Embed signup form",n:"In your link-in-bio page"},{i:"Set a weekly send day",n:"Consistency builds trust"},{i:"Enable double opt-in",n:"Better deliverability, more engaged list"}].map((c,i)=>(
                        <div key={i} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:"1px solid var(--border)",alignItems:"flex-start"}}>
                          <span style={{fontSize:13,color:"var(--muted)",marginTop:1}}>□</span>
                          <div><div style={{fontSize:12.5,fontWeight:500,color:"var(--forest)"}}>{c.i}</div><div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>{c.n}</div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card" style={{minHeight:380}}>
                    <div className="between" style={{marginBottom:8}}>
                      <div className="ctitle" style={{margin:0}}>Generated Email</div>
                      {eR&&<button className="btn bo bsm" onClick={()=>copy(eR)}>Copy</button>}
                    </div>
                    {!eR&&!eL&&<p style={{color:"var(--muted)",fontSize:12.5,lineHeight:1.7}}>Your complete email draft — including subject line and FTC disclosure when relevant — will appear here.</p>}
                    {eL&&<div style={{color:"var(--sage)",fontSize:12.5,marginTop:11}} className="ld">Writing your email</div>}
                    {eR&&<div className="airesp">{eR}</div>}
                  </div>
                </div>
              </div>
            )}

            {tab==="setup"&&(
              <div>
                <div className="ttl">Setup Guide</div>
                <div className="sub">Your realistic roadmap. Free tools first. No shortcuts that compromise the brand you're building.</div>
                <div className="warn">⏱️ <strong>Honest reminder:</strong> Meaningful affiliate income typically takes 3–6 months of consistent effort. Anyone promising faster results without large paid ad spend is misleading you. Build it right — it compounds.</div>
                <div className="g2" style={{marginBottom:15}}>
                  <div className="card">
                    <div className="ctitle">🔧 Free Tool Stack</div>
                    {[{t:"Buffer",u:"Social media scheduling",url:"https://buffer.com",a:"Set up"},{t:"Formspree",u:"Email signup forms",url:"https://formspree.io",a:"Set up"},{t:"Mailchimp",u:"Email campaigns (free to 500)",url:"https://mailchimp.com",a:"Set up"},{t:"Vercel",u:"Deploy this dashboard free",url:"https://vercel.com",a:"Deploy"},{t:"GitHub",u:"Store dashboard code",url:"https://github.com",a:"Create account"},{t:"Canva",u:"Graphics & content creation",url:"https://canva.com",a:"Use free tier"},{t:"Pinterest Business",u:"Analytics & pin scheduling",url:"https://business.pinterest.com",a:"Switch account"}].map((item,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                        <div><div style={{fontWeight:600,fontSize:12.5,color:"var(--forest)"}}>{item.t}</div><div style={{fontSize:11,color:"var(--muted)",marginTop:1}}>{item.u}</div></div>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}><span className="tag tb" style={{cursor:"pointer"}}>{item.a} →</span></a>
                      </div>
                    ))}
                  </div>
                  <div className="card">
                    <div className="ctitle">📅 Realistic Growth Timeline</div>
                    {[{m:"Month 1",title:"Foundation",tasks:["Set up all tools","Build brand visuals in Canva","Post 3–5x/week on each platform","Build 10+ Pinterest boards","Write welcome email sequence"]},{m:"Month 2–3",title:"Consistency",tasks:["Sustainable posting rhythm","Test content, find what resonates","Grow email list actively","Add affiliate links to evergreen content","Track click data, adjust"]},{m:"Month 3–4",title:"Refinement",tasks:["Double down on what works","Retire low performers","Expand Pinterest aggressively","First real commissions likely here"]},{m:"Month 5–6",title:"Results",tasks:["Consistent traffic patterns","Reliable affiliate income","Email list actively converting"]}].map((phase,i)=>(
                      <div key={i} className="titem">
                        <div className="tdot"/>
                        <div style={{flex:1}}><div style={{fontWeight:600,color:"var(--forest)",fontSize:12.5}}>{phase.m} — {phase.title}</div>
                          <ul style={{marginTop:4,paddingLeft:12}}>{phase.tasks.map((t,j)=><li key={j} style={{fontSize:11.5,color:"var(--muted)",lineHeight:1.8}}>{t}</li>)}</ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <div className="ctitle">🚀 Deploy to Vercel — Step by Step for Chromebook</div>
                  <p style={{fontSize:12.5,color:"var(--muted)",marginBottom:13,lineHeight:1.65}}>Do this once and access your dashboard from any device, free, forever. No technical knowledge needed — all done in your browser.</p>
                  <div className="g3">
                    {[{s:"1",title:"GitHub — Create Account",body:"Go to github.com and create a free account. Use your email and pick any username."},{s:"2",title:"GitHub — Upload Your Files",body:"New repository → name it mockingbird-dashboard → set to Public → Create. Then upload all 4 files Claude gave you, putting App.jsx and main.jsx inside a folder named src."},{s:"3",title:"Vercel — Deploy",body:"Go to vercel.com → Continue with GitHub → Import mockingbird-dashboard → Deploy. Your live URL is ready in about 2 minutes. Bookmark it."}].map((s,i)=>(
                      <div key={i} className="scard">
                        <div className="snum">{s.s}</div>
                        <div style={{fontWeight:600,color:"var(--forest)",marginBottom:5,fontSize:12.5}}>{s.title}</div>
                        <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.65}}>{s.body}</div>
                      </div>
                    ))}
                  </div>
                  <div className="warn" style={{marginTop:13,marginBottom:0}}>
                    📱 <strong>Android right now:</strong> Open this Claude conversation in Chrome on your phone → tap the three-dot menu → "Add to Home Screen." All 9 tabs and AI tools work from your mobile browser immediately.
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

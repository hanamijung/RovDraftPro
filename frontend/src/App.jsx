import { useState, useEffect } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const DEFAULT_HEROES = [
  { id:1,  name:"Airi",         role:["Assassin"],          tier:"S",  emoji:"⚔️",  color:"#e879f9" },
  { id:2,  name:"Alice",        role:["Mage"],              tier:"A",  emoji:"🔮",  color:"#818cf8" },
  { id:3,  name:"Arthur",       role:["Tank"],              tier:"B",  emoji:"🛡️",  color:"#fbbf24" },
  { id:4,  name:"Astrid",       role:["Warrior"],           tier:"A",  emoji:"🗡️",  color:"#f472b6" },
  { id:5,  name:"Batman",       role:["Assassin"],          tier:"S",  emoji:"🦇",  color:"#6366f1" },
  { id:6,  name:"Butterfly",    role:["Assassin"],          tier:"S+", emoji:"🦋",  color:"#34d399" },
  { id:7,  name:"Capheny",      role:["Marksman"],          tier:"A",  emoji:"🤖",  color:"#60a5fa" },
  { id:8,  name:"Chaugnar",     role:["Support","Tank"],    tier:"B",  emoji:"🐘",  color:"#9ca3af" },
  { id:9,  name:"Dirak",        role:["Mage"],              tier:"A",  emoji:"🌀",  color:"#7c3aed" },
  { id:10, name:"D'Arcy",       role:["Mage"],              tier:"S",  emoji:"🔥",  color:"#fb923c" },
  { id:11, name:"Elsu",         role:["Marksman"],          tier:"S",  emoji:"🏹",  color:"#10b981" },
  { id:12, name:"Enzo",         role:["Tank"],              tier:"A",  emoji:"💎",  color:"#f43f5e" },
  { id:13, name:"Errol",        role:["Support"],           tier:"B",  emoji:"🐦",  color:"#a78bfa" },
  { id:14, name:"Esmeralda",    role:["Mage","Tank"],       tier:"A",  emoji:"💧",  color:"#2dd4bf" },
  { id:15, name:"Evelynn",      role:["Assassin"],          tier:"A",  emoji:"🌸",  color:"#c084fc" },
  { id:16, name:"Florentino",   role:["Warrior"],           tier:"S+", emoji:"👑",  color:"#fbbf24" },
  { id:17, name:"Grakk",        role:["Tank"],              tier:"A",  emoji:"🦖",  color:"#4ade80" },
  { id:18, name:"Hayate",       role:["Assassin"],          tier:"B",  emoji:"💨",  color:"#38bdf8" },
  { id:19, name:"Ignis",        role:["Mage"],              tier:"B",  emoji:"🔥",  color:"#ef4444" },
  { id:20, name:"Ilumia",       role:["Mage"],              tier:"A",  emoji:"⭐",  color:"#fde68a" },
  { id:21, name:"Jinnar",       role:["Mage"],              tier:"S",  emoji:"⚡",  color:"#7dd3fc" },
  { id:22, name:"Joker",        role:["Assassin"],          tier:"S",  emoji:"🃏",  color:"#a3e635" },
  { id:23, name:"Krixi",        role:["Mage"],              tier:"B",  emoji:"🧚",  color:"#f0abfc" },
  { id:24, name:"Kufra",        role:["Tank"],              tier:"S",  emoji:"⛓️",  color:"#6b7280" },
  { id:25, name:"Laville",      role:["Marksman"],          tier:"S",  emoji:"🔫",  color:"#93c5fd" },
  { id:26, name:"Lauriel",      role:["Mage"],              tier:"A",  emoji:"🌙",  color:"#d8b4fe" },
  { id:27, name:"Lindis",       role:["Marksman"],          tier:"A",  emoji:"🦊",  color:"#86efac" },
  { id:28, name:"Lu Bu",        role:["Warrior"],           tier:"S+", emoji:"🐉",  color:"#dc2626" },
  { id:29, name:"Maloch",       role:["Tank","Warrior"],    tier:"A",  emoji:"👹",  color:"#16a34a" },
  { id:30, name:"Mganga",       role:["Mage","Support"],    tier:"B",  emoji:"🧙",  color:"#65a30d" },
  { id:31, name:"Mina",         role:["Support"],           tier:"S",  emoji:"🌟",  color:"#fb7185" },
  { id:32, name:"Momo",         role:["Mage"],              tier:"B",  emoji:"🐼",  color:"#d1d5db" },
  { id:33, name:"Nakroth",      role:["Assassin"],          tier:"S",  emoji:"😈",  color:"#f87171" },
  { id:34, name:"Natalya",      role:["Mage"],              tier:"A",  emoji:"🌩️", color:"#818cf8" },
  { id:35, name:"Omega",        role:["Tank"],              tier:"B",  emoji:"🤖",  color:"#64748b" },
  { id:36, name:"Ormarr",       role:["Tank"],              tier:"A",  emoji:"🦍",  color:"#854d0e" },
  { id:37, name:"Peura",        role:["Support"],           tier:"A",  emoji:"🦌",  color:"#a3e635" },
  { id:38, name:"Raz",          role:["Warrior"],           tier:"S",  emoji:"🌋",  color:"#f97316" },
  { id:39, name:"Riktor",       role:["Tank"],              tier:"B",  emoji:"⚙️",  color:"#94a3b8" },
  { id:40, name:"Ryoma",        role:["Warrior"],           tier:"S",  emoji:"⚔️",  color:"#0ea5e9" },
  { id:41, name:"Skud",         role:["Warrior"],           tier:"B",  emoji:"🐗",  color:"#78716c" },
  { id:42, name:"Slimz",        role:["Assassin"],          tier:"A",  emoji:"🐊",  color:"#22d3ee" },
  { id:43, name:"Taara",        role:["Warrior"],           tier:"A",  emoji:"🪓",  color:"#f59e0b" },
  { id:44, name:"Tel'Annas",    role:["Marksman"],          tier:"S",  emoji:"🍃",  color:"#a3e635" },
  { id:45, name:"Thane",        role:["Tank"],              tier:"S",  emoji:"🧊",  color:"#60a5fa" },
  { id:46, name:"Tulen",        role:["Mage"],              tier:"S+", emoji:"⚡",  color:"#fcd34d" },
  { id:47, name:"Valhein",      role:["Marksman"],          tier:"A",  emoji:"🎯",  color:"#fb923c" },
  { id:48, name:"Violet",       role:["Marksman"],          tier:"S",  emoji:"💜",  color:"#c084fc" },
  { id:49, name:"Wiro",         role:["Warrior"],           tier:"B",  emoji:"🌊",  color:"#67e8f9" },
  { id:50, name:"Wonder Woman", role:["Warrior","Tank"],    tier:"A",  emoji:"🦅",  color:"#fde047" },
  { id:51, name:"Xeniel",       role:["Support","Tank"],    tier:"A",  emoji:"🕊️",  color:"#e0f2fe" },
  { id:52, name:"Yorn",         role:["Marksman"],          tier:"A",  emoji:"🍃",  color:"#4ade80" },
  { id:53, name:"Zata",         role:["Assassin"],          tier:"B",  emoji:"🦞",  color:"#38bdf8" },
  { id:54, name:"Zephys",       role:["Assassin"],          tier:"S",  emoji:"💀",  color:"#475569" },
  { id:55, name:"Zill",         role:["Mage"],              tier:"A",  emoji:"🌩️", color:"#818cf8" },
  { id:56, name:"Zip",          role:["Support"],           tier:"S",  emoji:"🦒",  color:"#fb923c" },
  { id:57, name:"Aleister",     role:["Support","Mage"],    tier:"A",  emoji:"🧟",  color:"#a78bfa" },
  { id:58, name:"Annette",      role:["Support"],           tier:"B",  emoji:"🎀",  color:"#f9a8d4" },
  { id:59, name:"Baldum",       role:["Tank"],              tier:"A",  emoji:"🐂",  color:"#92400e" },
  { id:60, name:"Keera",        role:["Assassin"],          tier:"S+", emoji:"🐍",  color:"#84cc16" },
];

const TIERS = ["S+","S","A","B","C","D"];
const ROLES = ["Tank","Warrior","Assassin","Mage","Marksman","Support"];
const TIER_COLORS = { "S+":"#f97316","S":"#eab308","A":"#22c55e","B":"#3b82f6","C":"#8b5cf6","D":"#6b7280" };
const ROLE_COLORS = { Tank:"#60a5fa",Warrior:"#f97316",Assassin:"#a78bfa",Mage:"#818cf8",Marksman:"#34d399",Support:"#f472b6" };

// ─── DRAFT ORDERS ─────────────────────────────────────────────────────────────
const RANKED_ORDER = [
  {phase:"ban",team:"blue",slot:0},{phase:"ban",team:"red",slot:0},
  {phase:"ban",team:"blue",slot:1},{phase:"ban",team:"red",slot:1},
  {phase:"ban",team:"blue",slot:2},{phase:"ban",team:"red",slot:2},
  {phase:"pick",team:"blue",slot:0},
  {phase:"pick",team:"red",slot:0},{phase:"pick",team:"red",slot:1},
  {phase:"pick",team:"blue",slot:1},{phase:"pick",team:"blue",slot:2},
  {phase:"pick",team:"red",slot:2},{phase:"pick",team:"red",slot:3},
  {phase:"pick",team:"blue",slot:3},{phase:"pick",team:"blue",slot:4},
  {phase:"pick",team:"red",slot:4},
];
const TOURNAMENT_ORDER = [
  {phase:"ban",team:"blue",slot:0},{phase:"ban",team:"red",slot:0},
  {phase:"ban",team:"blue",slot:1},{phase:"ban",team:"red",slot:1},
  {phase:"pick",team:"blue",slot:0},
  {phase:"pick",team:"red",slot:0},{phase:"pick",team:"red",slot:1},
  {phase:"pick",team:"blue",slot:1},{phase:"pick",team:"blue",slot:2},
  {phase:"pick",team:"red",slot:2},
  {phase:"ban",team:"red",slot:2},{phase:"ban",team:"blue",slot:2},
  {phase:"ban",team:"red",slot:3},{phase:"ban",team:"blue",slot:3},
  {phase:"pick",team:"red",slot:3},
  {phase:"pick",team:"blue",slot:3},{phase:"pick",team:"blue",slot:4},
  {phase:"pick",team:"red",slot:4},
];

// ─── API ──────────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
function normalizeHero(h) {
  return { ...h, id: h._id||h.id, img: h.imgUrl ? `${API_BASE}${h.imgUrl}` : (h.img||"") };
}

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg:        "#060914",
  bgCard:    "#0d1525",
  bgHover:   "#111d33",
  border:    "#1e2a40",
  borderHi:  "#2a3d58",
  gold:      "#C9A84C",
  goldDim:   "#8a6e2e",
  blue:      "#3B82F6",
  red:       "#EF4444",
  text:      "#E2E8F0",
  textDim:   "#64748B",
  textMuted: "#334155",
};

const S = {
  card: { background:C.bgCard, borderRadius:12, border:`1px solid ${C.border}` },
  goldText: { color:C.gold, fontWeight:600 },
  label: { fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.textDim, fontWeight:500 },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getTierVal(t) { return {"S+":10,"S":8,"A":6,"B":4,"C":2,"D":1}[t]||4; }
function getAvgScore(arr) {
  if (!arr.length) return 0;
  return Math.round(arr.reduce((s,h)=>s+getTierVal(h.tier),0)/arr.length*10)/10;
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${C.bg};color:${C.text};font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;}
  ::-webkit-scrollbar{width:4px;height:4px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
  @keyframes glow{0%,100%{box-shadow:0 0 8px 1px ${C.gold}44}50%{box-shadow:0 0 16px 3px ${C.gold}77}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
  .active-slot{animation:glow 1.4s ease-in-out infinite;}
  .fade-in{animation:fadeIn .2s ease forwards;}
  input[type=text],input[type=color]{font-family:'Inter',sans-serif;}
  select{font-family:'Inter',sans-serif;}
`;

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("draft");
  const [heroes, setHeroes] = useState(DEFAULT_HEROES);
  const [loading, setLoading] = useState(true);
  const [adminTab, setAdminTab] = useState("heroes");

  useEffect(() => {
    fetch(`${API_BASE}/api/heroes`)
      .then(r=>r.json())
      .then(d=>{ if(d?.length) setHeroes(d.map(normalizeHero)); })
      .catch(()=>{})
      .finally(()=>setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16, fontFamily:"Inter,sans-serif" }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ fontSize:40 }}>⚔️</div>
      <div style={{ color:C.gold, letterSpacing:"0.2em", fontSize:13, fontFamily:"Rajdhani,sans-serif" }}>LOADING...</div>
    </div>
  );

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ background:C.bg, minHeight:"100vh", color:C.text }}>
        <Nav page={page} setPage={setPage} />
        {page==="draft" && <DraftPage heroes={heroes} />}
        {page==="admin" && <AdminPage heroes={heroes} setHeroes={setHeroes} adminTab={adminTab} setAdminTab={setAdminTab} />}
      </div>
    </>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", height:56, borderBottom:`1px solid ${C.border}`, background:"#04060e", position:"sticky", top:0, zIndex:100 }}>
      <div style={{ fontFamily:"Rajdhani,sans-serif", fontSize:20, fontWeight:700, color:C.gold, letterSpacing:"0.15em", display:"flex", alignItems:"center", gap:8 }}>
        <span>⚔</span> ROV DRAFT PRO
      </div>
      <div style={{ display:"flex", gap:4 }}>
        {[["draft","🎮 Draft"],["admin","⚙ Admin"]].map(([k,l])=>(
          <button key={k} onClick={()=>setPage(k)} style={{ background:page===k?`${C.gold}15`:"transparent", color:page===k?C.gold:C.textDim, border:`1px solid ${page===k?C.goldDim+"66":"transparent"}`, borderRadius:8, padding:"6px 18px", cursor:"pointer", fontSize:13, fontWeight:page===k?600:400, fontFamily:"Inter,sans-serif", transition:"all .15s" }}>{l}</button>
        ))}
      </div>
    </div>
  );
}

// ─── DRAFT PAGE ───────────────────────────────────────────────────────────────
function DraftPage({ heroes }) {
  const [screen, setScreen] = useState("mode");
  const [mode, setMode] = useState(null);
  const [bo, setBo] = useState(3);
  const [mySide, setMySide] = useState("blue");
  const [myName, setMyName] = useState("ทีมเรา");
  const [enemyName, setEnemyName] = useState("ทีมศัตรู");
  const [game, setGame] = useState(1);
  const [draft, setDraft] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  // BO: track hero ids our team (mySide) already picked across games
  const [boLockedIds, setBoLockedIds] = useState(new Set());

  function initDraft(order, side, myN, enemyN) {
    const bansPerTeam = Math.max(...order.filter(o=>o.phase==="ban").map(o=>o.slot)) + 1;
    setDraft({
      order, step:0,
      blueBans:  Array(bansPerTeam).fill(null),
      redBans:   Array(bansPerTeam).fill(null),
      bluePicks: Array(5).fill(null),
      redPicks:  Array(5).fill(null),
      blueLabel: side==="blue"?(myN||"ทีมเรา"):(enemyN||"ทีมศัตรู"),
      redLabel:  side==="blue"?(enemyN||"ทีมศัตรู"):(myN||"ทีมเรา"),
      mySide: side,
    });
    setShowAnalysis(false);
  }

  function start() {
    setBoLockedIds(new Set());
    initDraft(mode==="ranked"?RANKED_ORDER:TOURNAMENT_ORDER, mySide, myName, enemyName);
    setScreen("draft");
  }

  function nextGame() {
    // Lock heroes our team picked this game before moving on
    if (draft) {
      const myPicks = (draft.mySide==="blue" ? draft.bluePicks : draft.redPicks).filter(Boolean);
      setBoLockedIds(prev => new Set([...prev, ...myPicks.map(h=>h.id)]));
    }
    const ns = mySide==="blue"?"red":"blue";
    setMySide(ns); setGame(g=>g+1);
    initDraft(TOURNAMENT_ORDER, ns, myName, enemyName);
  }

  // MODE SELECT
  if (screen==="mode") return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"calc(100vh - 56px)", gap:32, padding:24 }}>
      <div style={{ fontFamily:"Rajdhani,sans-serif", fontSize:28, fontWeight:700, color:C.gold, letterSpacing:"0.2em" }}>SELECT MODE</div>
      <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
        <ModeCard icon="🏆" title="Tournament" sub="Ban 2→Pick→Ban 2→Pick · BO Series" color="#f97316" onClick={()=>{ setMode("tournament"); setScreen("bo"); }} />
        <ModeCard icon="⚡" title="Ranked"     sub="แบนฝั่งละ 3 · 1 เกม"              color="#3b82f6" onClick={()=>{ setMode("ranked");     setScreen("side"); }} />
      </div>
    </div>
  );

  // BO SELECT
  if (screen==="bo") return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"calc(100vh - 56px)", gap:24, padding:24 }}>
      <BackBtn onClick={()=>setScreen("mode")} />
      <div style={{ fontFamily:"Rajdhani,sans-serif", fontSize:26, fontWeight:700, color:C.gold, letterSpacing:"0.2em" }}>BEST OF</div>
      <div style={{ display:"flex", gap:12 }}>
        {[3,5,7].map(b=>(
          <button key={b} onClick={()=>{ setBo(b); setScreen("side"); }} style={{ background:C.bgCard, color:C.text, border:`2px solid ${C.border}`, borderRadius:12, padding:"20px 40px", fontSize:32, fontWeight:700, cursor:"pointer", fontFamily:"Rajdhani,sans-serif", transition:"all .15s" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.gold; e.currentTarget.style.color=C.gold; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.text; }}>
            BO{b}
          </button>
        ))}
      </div>
    </div>
  );

  // SIDE SELECT
  if (screen==="side") return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"calc(100vh - 56px)", gap:24, padding:24 }}>
      <BackBtn onClick={()=>setScreen(mode==="tournament"?"bo":"mode")} />
      <div style={{ fontFamily:"Rajdhani,sans-serif", fontSize:24, fontWeight:700, color:C.gold, letterSpacing:"0.15em" }}>เลือกฝั่งทีมเรา</div>
      <div style={{ display:"flex", gap:12 }}>
        <SideCard icon="🔵" title="First Pick" sub="Ban & Pick ก่อน" color={C.blue}  active={mySide==="blue"} onClick={()=>setMySide("blue")} />
        <SideCard icon="🔴" title="Second Pick" sub="Ban & Pick หลัง" color={C.red}  active={mySide==="red"}  onClick={()=>setMySide("red")} />
      </div>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
        <LabelInput label="ชื่อทีมเรา" value={myName} color={mySide==="blue"?C.blue:C.red} onChange={e=>setMyName(e.target.value)} />
        <LabelInput label="ชื่อทีมศัตรู" value={enemyName} color={mySide==="blue"?C.red:C.blue} onChange={e=>setEnemyName(e.target.value)} />
      </div>
      <button onClick={start} style={{ background:C.gold, color:"#000", border:"none", borderRadius:10, padding:"14px 48px", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"Rajdhani,sans-serif", letterSpacing:"0.1em" }}>▶ เริ่ม Draft</button>
      <div style={{ fontSize:11, color:C.textDim }}>{mode==="tournament"?`BO${bo} · `:""}{myName} = <span style={{ color:mySide==="blue"?C.blue:C.red }}>{mySide==="blue"?"First Pick":"Second Pick"}</span></div>
    </div>
  );

  // DRAFT SCREEN
  return (
    <div style={{ padding:"12px 16px", maxWidth:900, margin:"0 auto" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, flexWrap:"wrap" }}>
        <BackBtn onClick={()=>{ setScreen("mode"); setDraft(null); setGame(1); }} label="ออก" />
        <div style={{ fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:15, color:C.gold, letterSpacing:"0.1em" }}>
          {mode==="ranked"?"⚡ RANKED":`🏆 TOURNAMENT BO${bo}`}
          {mode==="tournament" && <span style={{ color:C.textDim }}> · เกมที่ {game}/{bo}</span>}
        </div>
        <div style={{ marginLeft:4, fontSize:11, background:`${mySide==="blue"?C.blue:C.red}22`, color:mySide==="blue"?C.blue:C.red, border:`1px solid ${mySide==="blue"?C.blue:C.red}44`, borderRadius:5, padding:"2px 8px" }}>
          {myName} = {mySide==="blue"?"First 🔵":"Second 🔴"}
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
          {mode==="tournament" && draft?.step>=draft?.order?.length && game<bo && (
            <button onClick={nextGame} style={{ background:`${C.gold}20`, color:C.gold, border:`1px solid ${C.goldDim}`, borderRadius:7, padding:"5px 14px", cursor:"pointer", fontSize:12 }}>สลับฝั่ง →</button>
          )}
          {draft?.step>=draft?.order?.length && (
            <button onClick={()=>setShowAnalysis(a=>!a)} style={{ background:showAnalysis?"#22c55e22":"transparent", color:showAnalysis?"#22c55e":C.textDim, border:`1px solid ${showAnalysis?"#22c55e44":C.border}`, borderRadius:7, padding:"5px 14px", cursor:"pointer", fontSize:12 }}>📊 วิเคราะห์</button>
          )}
          <button onClick={()=>{ initDraft(mode==="ranked"?RANKED_ORDER:TOURNAMENT_ORDER,mySide,myName,enemyName); }} style={{ background:"transparent", color:"#ef4444", border:`1px solid #ef444433`, borderRadius:7, padding:"5px 12px", cursor:"pointer", fontSize:12 }}>↺ Reset</button>
        </div>
      </div>

      {draft && <DraftBoard draft={draft} setDraft={setDraft} heroes={heroes} boLockedIds={mode==="tournament"?boLockedIds:new Set()} />}
      {showAnalysis && draft && <DraftAnalysis draft={draft} heroes={heroes} />}
    </div>
  );
}

function ModeCard({ icon, title, sub, color, onClick }) {
  return (
    <div onClick={onClick} style={{ ...S.card, padding:"28px 36px", cursor:"pointer", textAlign:"center", minWidth:180, transition:"all .15s" }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor=color+"88"; e.currentTarget.style.background=color+"11"; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.bgCard; }}>
      <div style={{ fontSize:36, marginBottom:8 }}>{icon}</div>
      <div style={{ fontFamily:"Rajdhani,sans-serif", fontSize:18, fontWeight:700, color:C.text }}>{title}</div>
      <div style={{ fontSize:11, color:C.textDim, marginTop:4 }}>{sub}</div>
    </div>
  );
}
function SideCard({ icon, title, sub, color, active, onClick }) {
  return (
    <div onClick={onClick} style={{ ...S.card, padding:"20px 32px", cursor:"pointer", textAlign:"center", minWidth:150, borderColor:active?color:C.border, background:active?color+"18":C.bgCard, transition:"all .15s" }}>
      <div style={{ fontSize:32 }}>{icon}</div>
      <div style={{ fontFamily:"Rajdhani,sans-serif", fontSize:16, fontWeight:700, color:active?color:C.text, marginTop:6 }}>{title}</div>
      <div style={{ fontSize:11, color:C.textDim, marginTop:2 }}>{sub}</div>
      {active && <div style={{ fontSize:11, color, marginTop:6, fontWeight:600 }}>✓ เลือกแล้ว</div>}
    </div>
  );
}
function LabelInput({ label, value, color, onChange }) {
  return (
    <div>
      <div style={{ ...S.label, color, marginBottom:4 }}>{label}</div>
      <input value={value} onChange={onChange} style={{ background:C.bgCard, border:`1px solid ${color}44`, borderRadius:8, padding:"8px 12px", color:C.text, fontSize:13, width:160, outline:"none", fontFamily:"Inter,sans-serif" }} />
    </div>
  );
}
function BackBtn({ onClick, label="← กลับ" }) {
  return (
    <button onClick={onClick} style={{ background:"transparent", color:C.textDim, border:`1px solid ${C.border}`, borderRadius:7, padding:"5px 14px", cursor:"pointer", fontSize:12, fontFamily:"Inter,sans-serif" }}>{label}</button>
  );
}

// ─── PHASE BAR ────────────────────────────────────────────────────────────────
function PhaseBar({ order, step }) {
  const phases = [];
  let cur = null;
  order.forEach((o,i) => {
    if (!cur || cur.phase!==o.phase) { cur={phase:o.phase,start:i,end:i,num:phases.length+1}; phases.push(cur); }
    else cur.end=i;
  });
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginBottom:10 }}>
      {phases.map((p,i)=>{
        const active=step>=p.start&&step<=p.end;
        const done=step>p.end;
        const isBan=p.phase==="ban";
        const col=isBan?"#ef4444":C.gold;
        return (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
            {i>0&&<div style={{ width:20, height:1, background:done?col+"44":C.border }} />}
            <div style={{ fontSize:10, fontWeight:active?700:400, padding:"3px 12px", borderRadius:20, background:active?col+"22":done?col+"11":"transparent", color:active?col:done?col+"88":C.textDim, border:`1px solid ${active?col:done?col+"33":C.border}`, letterSpacing:"0.05em", fontFamily:"Rajdhani,sans-serif", transition:"all .2s" }}>
              {done && "✓ "}{active && !done && "▶ "}{isBan?"BAN":"PICK"} {Math.ceil(p.num/2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ROLE FILTER BAR ──────────────────────────────────────────────────────────
const ROLE_SVG = {
  All: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  Tank: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6L12 2zm0 2.18l6 3V12c0 4.12-2.72 7.97-6 9.28C8.72 19.97 6 16.12 6 12V7.18l6-3z"/>
    </svg>
  ),
  Warrior: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M6.5 3.5L3 7l4 4-2 2 1.5 1.5 2-2 1 1-1 4.5L12 21l2.5-3-1-4.5 1-1 2 2L18 13l-2-2 4-4-3.5-3.5-4 4-1-1V4h-2v2.5l-1 1-4-4z"/>
    </svg>
  ),
  Assassin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M20 4l-4 4 1 5-8 8-1-1 1-1-4-4-1 1-1-1 8-8 5 1 4-4zM9 15l-2 2 1 1 2-2-1-1zm3-3l-2 2 1 1 2-2-1-1z"/>
    </svg>
  ),
  Mage: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      <path d="M12 2l1.5 4h4l-3.25 2.36 1.25 3.86L12 9.9l-3.5 2.32 1.25-3.86L6.5 6h4z"/>
    </svg>
  ),
  Marksman: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      <path d="M11 1h2v4h-2zm0 18h2v4h-2zM1 11h4v2H1zm18 0h4v2h-4z"/>
    </svg>
  ),
  Support: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
};

function RoleFilterBar({ active, onChange }) {
  const tabs = ["All", ...ROLES];
  return (
    <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:4, marginBottom:8, scrollbarWidth:"none" }}>
      {tabs.map(r=>{
        const isActive = active===r;
        const col = r==="All" ? C.gold : (ROLE_COLORS[r]||C.textDim);
        return (
          <button key={r} onClick={()=>onChange(r===active&&r!=="All"?"All":r)} title={r}
            style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", gap:5, background:isActive?`${col}22`:C.bgCard, color:isActive?col:C.textDim, border:`1.5px solid ${isActive?col+"99":C.border}`, borderRadius:isActive?20:10, padding: r==="All"?"6px 14px":"7px 10px", cursor:"pointer", fontWeight:isActive?700:400, transition:"all .15s", minWidth: r==="All"?60:40 }}>
            {ROLE_SVG[r]}
            {r==="All" && <span style={{ fontSize:12, letterSpacing:"0.05em", fontFamily:"Rajdhani,sans-serif" }}>All</span>}
          </button>
        );
      })}
    </div>
  );
}

// ─── DRAFT BOARD ──────────────────────────────────────────────────────────────
function DraftBoard({ draft, setDraft, heroes, boLockedIds=new Set() }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const { order, step, blueBans, redBans, bluePicks, redPicks } = draft;
  const isDone = step >= order.length;
  const cur = !isDone ? order[step] : null;

  const usedIds = new Set([...blueBans,...redBans,...bluePicks,...redPicks].filter(Boolean).map(h=>h.id));
  const bannedIds = new Set([...blueBans,...redBans].filter(Boolean).map(h=>h.id));

  function pick(hero) {
    if (isDone||usedIds.has(hero.id)) return;
    setDraft(prev=>{
      const c=prev.order[prev.step];
      const next={...prev};
      if (c.phase==="ban") {
        if (c.team==="blue") { next.blueBans=[...prev.blueBans]; next.blueBans[c.slot]=hero; }
        else { next.redBans=[...prev.redBans]; next.redBans[c.slot]=hero; }
      } else {
        if (c.team==="blue") { next.bluePicks=[...prev.bluePicks]; next.bluePicks[c.slot]=hero; }
        else { next.redPicks=[...prev.redPicks]; next.redPicks[c.slot]=hero; }
      }
      return { ...next, step:prev.step+1 };
    });
  }

  function undo() {
    if (step<=0) return;
    setDraft(prev=>{
      const s=prev.step-1; const c=prev.order[s];
      const next={...prev,step:s};
      if (c.phase==="ban") {
        if (c.team==="blue") { next.blueBans=[...prev.blueBans]; next.blueBans[c.slot]=null; }
        else { next.redBans=[...prev.redBans]; next.redBans[c.slot]=null; }
      } else {
        if (c.team==="blue") { next.bluePicks=[...prev.bluePicks]; next.bluePicks[c.slot]=null; }
        else { next.redPicks=[...prev.redPicks]; next.redPicks[c.slot]=null; }
      }
      return next;
    });
  }

  const filtered = heroes.filter(h=>{
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter==="All" || (h.role||[]).includes(roleFilter);
    return matchSearch && matchRole;
  });

  return (
    <div>
      <PhaseBar order={order} step={step} />

      {/* Turn indicator */}
      <div style={{ textAlign:"center", marginBottom:10, minHeight:24, fontSize:13 }}>
        {isDone ? (
          <span style={{ color:C.gold, fontWeight:600, fontFamily:"Rajdhani,sans-serif", letterSpacing:"0.1em" }}>✓ DRAFT COMPLETE</span>
        ) : (
          <span>
            {cur.phase==="ban"
              ? <span style={{ color:"#ef4444", fontFamily:"Rajdhani,sans-serif", fontWeight:600 }}>🚫 BAN</span>
              : <span style={{ color:C.gold, fontFamily:"Rajdhani,sans-serif", fontWeight:600 }}>✅ PICK</span>}
            {" — "}
            <span style={{ color:cur.team==="blue"?C.blue:C.red, fontWeight:600, fontFamily:"Rajdhani,sans-serif" }}>
              {cur.team==="blue"?(draft.blueLabel||"BLUE"):(draft.redLabel||"RED")}
            </span>
            <span style={{ color:C.textDim }}> สล็อต {cur.slot+1}</span>
          </span>
        )}
      </div>

      {/* Ban rows */}
      <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-end", gap:12, marginBottom:10 }}>
        <TeamBanRow bans={blueBans} team="blue" label={draft.blueLabel||"BLUE"} cur={cur} isDone={isDone} />
        <div style={{ ...S.label, paddingBottom:6 }}>BAN</div>
        <TeamBanRow bans={redBans}  team="red"  label={draft.redLabel||"RED"}   cur={cur} isDone={isDone} />
      </div>

      {/* Pick rows */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
            <span style={{ color:C.blue, fontSize:12, fontWeight:600, fontFamily:"Rajdhani,sans-serif", letterSpacing:"0.1em" }}>{draft.blueLabel||"BLUE TEAM"}</span>
            <span style={{ color:C.textDim, fontSize:11 }}>PWR <span style={{ color:C.blue }}>{getAvgScore(bluePicks.filter(Boolean))}</span></span>
          </div>
          <div style={{ display:"flex", gap:4 }}>
            {bluePicks.map((h,i)=>(
              <PickSlot key={i} hero={h} team="blue" isActive={!isDone&&cur?.phase==="pick"&&cur?.team==="blue"&&cur?.slot===i} />
            ))}
          </div>
        </div>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
            <span style={{ color:C.red, fontSize:12, fontWeight:600, fontFamily:"Rajdhani,sans-serif", letterSpacing:"0.1em" }}>{draft.redLabel||"RED TEAM"}</span>
            <span style={{ color:C.textDim, fontSize:11 }}>PWR <span style={{ color:C.red }}>{getAvgScore(redPicks.filter(Boolean))}</span></span>
          </div>
          <div style={{ display:"flex", gap:4 }}>
            {redPicks.map((h,i)=>(
              <PickSlot key={i} hero={h} team="red" isActive={!isDone&&cur?.phase==="pick"&&cur?.team==="red"&&cur?.slot===i} />
            ))}
          </div>
        </div>
      </div>

      {/* Suggestion */}
      {!isDone && <SuggestionPanel draft={draft} heroes={heroes} cur={cur} usedIds={usedIds} bannedIds={bannedIds} />}

      {/* Role Filter + Search + Undo */}
      <RoleFilterBar active={roleFilter} onChange={setRoleFilter} />
      <div style={{ display:"flex", gap:8, marginBottom:8 }}>
        <div style={{ flex:1, position:"relative" }}>
          <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:C.textDim, fontSize:14 }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="SEARCH HERO..." style={{ width:"100%", background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px 9px 30px", color:C.text, fontSize:13, outline:"none", fontFamily:"Inter,sans-serif" }} />
        </div>
        <button onClick={undo} disabled={step<=0} style={{ background:step>0?"#ef444418":"transparent", color:step>0?"#ef4444":C.textMuted, border:`1px solid ${step>0?"#ef444433":C.border}`, borderRadius:8, padding:"8px 16px", cursor:step>0?"pointer":"default", fontSize:13, fontFamily:"Inter,sans-serif" }}>↩ Undo</button>
      </div>

      {/* BO Locked notice */}
      {boLockedIds.size > 0 && (
        <div style={{ fontSize:10, color:C.textDim, marginBottom:6, padding:"4px 8px", background:"#f9731618", border:"1px solid #f9731633", borderRadius:6 }}>
          🔒 ตัวที่ทีมเราเลือกในเกมก่อนแล้ว ({boLockedIds.size} ตัว) จะถูกล็อคไม่ให้เลือกซ้ำ
        </div>
      )}

      {/* Hero Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(60px,1fr))", gap:5, maxHeight:300, overflowY:"auto" }}>
        {filtered.map(h=>{
          const isUsed    = usedIds.has(h.id);
          const isBanned  = bannedIds.has(h.id);
          const isBoLocked = boLockedIds.has(h.id);
          const isBlocked = isUsed || isBoLocked;
          const hasBlue   = bluePicks.some(p=>p?.id===h.id);
          const hasRed    = redPicks.some(p=>p?.id===h.id);
          return (
            <div key={h.id} onClick={()=>(!isBlocked)&&pick(h)} style={{ borderRadius:8, overflow:"hidden", aspectRatio:"1", background:isBlocked?`${h.color}08`:`${h.color}18`, border:`2px solid ${isBlocked?(isBoLocked?"#f9731644":isBanned?"#ef444444":hasBlue?C.blue+"66":C.red+"66"):"transparent"}`, opacity:isBlocked?.3:1, cursor:isBlocked?"default":"pointer", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .1s, border-color .1s" }}
              onMouseEnter={e=>{ if(!isBlocked) e.currentTarget.style.transform="scale(1.07)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; }}>
              {h.img
                ? <img src={h.img} alt={h.name} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
                : <div style={{ fontSize:22 }}>{h.emoji}</div>
              }
              <div style={{ position:"absolute", bottom:0, left:0, right:0, fontSize:7, textAlign:"center", background:"linear-gradient(transparent,#000c)", padding:"4px 2px 3px", color:"#eee", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{h.name}</div>
              {isBanned && <div style={{ position:"absolute", inset:0, background:"#0009", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:18, color:"#ef4444" }}>✕</span></div>}
              {isBoLocked && !isUsed && <div style={{ position:"absolute", inset:0, background:"#f9731618", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:18 }}>🔒</span></div>}
              <div style={{ position:"absolute", top:2, right:2, fontSize:7, background:TIER_COLORS[h.tier]+"dd", color:"#000", borderRadius:3, padding:"0 3px", fontWeight:800 }}>{h.tier}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeamBanRow({ bans, team, label, cur, isDone }) {
  const color = team==="blue"?C.blue:C.red;
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{ ...S.label, color, marginBottom:4 }}>{label}</div>
      <div style={{ display:"flex", gap:4 }}>
        {bans.map((h,i)=>{
          const isActive=!isDone&&cur?.phase==="ban"&&cur?.team===team&&cur?.slot===i;
          return (
            <div key={i} className={isActive?"active-slot":""} style={{ width:40, height:40, borderRadius:7, border:`2px solid ${isActive?C.gold:color+"44"}`, background:isActive?`${C.gold}0a`:C.bgCard, overflow:"hidden", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              {h ? (
                <>
                  {h.img ? <img src={h.img} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"grayscale(0.4)" }} /> : <div style={{ fontSize:18, filter:"grayscale(.5)" }}>{h.emoji}</div>}
                  <div style={{ position:"absolute", inset:0, background:"#0007", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:16, color:"#ef4444", fontWeight:700 }}>✕</span></div>
                </>
              ) : (
                <span style={{ fontSize:10, color:C.textMuted }}>{i+1}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PickSlot({ hero, team, isActive }) {
  const color = team==="blue"?C.blue:C.red;
  return (
    <div className={isActive?"active-slot":""} style={{ flex:1, minWidth:0, height:68, borderRadius:9, border:`2px solid ${isActive?C.gold:color+"55"}`, background:hero?`${hero.color}15`:C.bgCard, position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      {hero ? (
        <>
          {hero.img ? <img src={hero.img} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} /> : <div style={{ fontSize:26 }}>{hero.emoji}</div>}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, fontSize:7, textAlign:"center", background:"linear-gradient(transparent,#000d)", padding:"6px 2px 3px", color:"#eee", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{hero.name}</div>
          <div style={{ position:"absolute", top:2, right:2, fontSize:7, background:TIER_COLORS[hero.tier]+"dd", color:"#000", borderRadius:3, padding:"0 3px", fontWeight:800 }}>{hero.tier}</div>
        </>
      ) : (
        <span style={{ color:C.textMuted, fontSize:16 }}>?</span>
      )}
    </div>
  );
}

// ─── SUGGESTION PANEL ─────────────────────────────────────────────────────────
function SuggestionPanel({ draft, heroes, cur, usedIds, bannedIds }) {
  const myTeam = cur.team;
  const myPicks    = (myTeam==="blue"?draft.bluePicks:draft.redPicks).filter(Boolean);
  const enemyPicks = (myTeam==="blue"?draft.redPicks:draft.bluePicks).filter(Boolean);
  const available  = heroes.filter(h=>!usedIds.has(h.id));
  const isBan = cur.phase==="ban";
  const color = myTeam==="blue"?C.blue:C.red;
  const label = myTeam==="blue"?(draft.blueLabel||"BLUE"):(draft.redLabel||"RED");

  const myRoles = new Set(myPicks.flatMap(h=>h.role));
  const missingRoles = ROLES.filter(r=>!myRoles.has(r)).slice(0,3);

  function score(h) {
    let s = getTierVal(h.tier);
    if (isBan) {
      if (h.tier==="S+") s+=4; if (h.tier==="S") s+=2;
      const countersUs = myPicks.filter(p=>(h.counters||[]).includes(p.id)).length;
      s += countersUs*3;
    } else {
      if (h.role.some(r=>missingRoles.includes(r))) s+=3;
      const countersEnemy = enemyPicks.filter(e=>(h.counters||[]).includes(e.id)).length;
      s += countersEnemy*2;
      const syn = myPicks.filter(p=>(h.synergy||[]).includes(p.id)||(p.synergy||[]).includes(h.id)).length;
      s += syn*1.5;
    }
    return s;
  }

  function getReason(h) {
    if (isBan) {
      const cnt = myPicks.filter(p=>(h.counters||[]).includes(p.id));
      if (cnt.length) return `Counter ${cnt.map(p=>p.name).join(", ")}`;
      return `${h.tier} Tier — ตัว Priority`;
    }
    if (enemyPicks.some(e=>(h.counters||[]).includes(e.id))) return `Counter ศัตรู`;
    if (h.role.some(r=>missingRoles.includes(r))) return `เติม ${h.role.filter(r=>missingRoles.includes(r)).join("/")}`;
    const syn = myPicks.filter(p=>(h.synergy||[]).includes(p.id)||(p.synergy||[]).includes(h.id));
    if (syn.length) return `Synergy กับ ${syn.map(p=>p.name).join(", ")}`;
    return `${h.tier} Tier — Strong pick`;
  }

  const suggestions = available.map(h=>({ h, s:score(h), r:getReason(h) })).sort((a,b)=>b.s-a.s).slice(0,5);

  const hints = [];
  if (!isBan) {
    if (!myRoles.has("Tank")&&myPicks.length>=2) hints.push({ t:"ขาด Tank", c:"#f97316" });
    if (!myRoles.has("Marksman")&&!myRoles.has("Mage")&&myPicks.length>=2) hints.push({ t:"ขาด Carry", c:"#eab308" });
    if (!myRoles.has("Support")&&myPicks.length>=3) hints.push({ t:"ขาด Support", c:"#f472b6" });
    if (enemyPicks.some(e=>e.role.includes("Assassin"))&&!myRoles.has("Tank")) hints.push({ t:"ศัตรูมี Assassin", c:"#ef4444" });
  }

  return (
    <div className="fade-in" style={{ ...S.card, padding:"10px 12px", marginBottom:10, borderColor:`${color}33` }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, flexWrap:"wrap" }}>
        <div style={{ width:3, height:14, background:color, borderRadius:2 }} />
        <span style={{ fontSize:11, fontWeight:600, color, fontFamily:"Rajdhani,sans-serif", letterSpacing:"0.08em" }}>
          {isBan?"🚫 แนะนำ BAN":"✅ แนะนำ PICK"} — {label}
        </span>
        {hints.map((hint,i)=>(
          <span key={i} style={{ fontSize:9, background:`${hint.c}18`, color:hint.c, border:`1px solid ${hint.c}44`, borderRadius:5, padding:"1px 7px", fontWeight:500 }}>⚠ {hint.t}</span>
        ))}
      </div>
      <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:2 }}>
        {suggestions.map(({ h, r },i)=>(
          <div key={h.id} style={{ flexShrink:0, width:88, background:`${h.color}12`, border:`1px solid ${i===0?color:h.color+"44"}`, borderRadius:9, padding:"8px 7px", position:"relative" }}>
            {i===0 && <div style={{ position:"absolute", top:-1, left:7, fontSize:8, background:color, color:"#000", borderRadius:"0 0 4px 4px", padding:"0 5px", fontWeight:700, fontFamily:"Rajdhani,sans-serif" }}>TOP</div>}
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ fontSize:8, background:TIER_COLORS[h.tier]+"33", color:TIER_COLORS[h.tier], borderRadius:3, padding:"0 4px", fontWeight:700 }}>{h.tier}</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              {h.img ? <img src={h.img} style={{ width:28, height:28, borderRadius:5, objectFit:"cover", flexShrink:0 }} /> : <div style={{ width:28, height:28, background:`${h.color}22`, borderRadius:5, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>{h.emoji}</div>}
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:10, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{h.name}</div>
                <div style={{ fontSize:8, color:C.textDim }}>{h.role[0]}</div>
              </div>
            </div>
            <div style={{ fontSize:8, color:C.textDim, marginTop:4, lineHeight:1.3 }}>{r}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DRAFT ANALYSIS ───────────────────────────────────────────────────────────
function DraftAnalysis({ draft, heroes }) {
  const { bluePicks, redPicks, blueBans, redBans } = draft;

  function analyze(picks, bans, label, color) {
    const valid = picks.filter(Boolean);
    if (!valid.length) return null;
    const roles = {};
    valid.forEach(h=>h.role.forEach(r=>{ roles[r]=(roles[r]||0)+1; }));
    const avg = getAvgScore(valid);
    const strengths=[], weaknesses=[];
    if (valid.some(h=>h.role.includes("Tank"))) strengths.push("มีตัวรับ");
    else weaknesses.push("ขาด Tank");
    if (valid.some(h=>h.role.includes("Marksman")||h.role.includes("Mage"))) strengths.push("มี Carry");
    else weaknesses.push("ขาด Carry");
    if (valid.some(h=>h.role.includes("Support"))) strengths.push("มี Support");
    else weaknesses.push("ขาด Support");
    const highBans = bans.filter(Boolean).filter(h=>h.tier==="S+"||h.tier==="S").length;
    return { label, color, valid, bans:bans.filter(Boolean), roles, avg, strengths, weaknesses, highBans };
  }

  const blueA = analyze(bluePicks, blueBans, draft.blueLabel||"Blue", C.blue);
  const redA  = analyze(redPicks,  redBans,  draft.redLabel||"Red",   C.red);

  const diff = (blueA?.avg||0)-(redA?.avg||0);
  const favor = Math.abs(diff)<0.5 ? { t:"⚖️ สมดุล", c:C.gold } : diff>0 ? { t:`${blueA.label} เป็นต่อ`, c:C.blue } : { t:`${redA.label} เป็นต่อ`, c:C.red };

  return (
    <div style={{ ...S.card, padding:14, marginTop:10 }}>
      <div style={{ fontFamily:"Rajdhani,sans-serif", fontSize:16, fontWeight:700, color:C.gold, letterSpacing:"0.1em", marginBottom:12 }}>📊 วิเคราะห์ DRAFT</div>
      <div style={{ textAlign:"center", marginBottom:12, padding:"8px", background:`${favor.c}15`, borderRadius:8, border:`1px solid ${favor.c}33` }}>
        <span style={{ color:favor.c, fontWeight:600, fontFamily:"Rajdhani,sans-serif" }}>{favor.t}</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[blueA,redA].map((a,i)=>a&&(
          <div key={i} style={{ background:"#0a1120", borderRadius:8, padding:10, border:`1px solid ${a.color}22` }}>
            <div style={{ color:a.color, fontWeight:600, fontSize:13, marginBottom:4, fontFamily:"Rajdhani,sans-serif" }}>{a.label}</div>
            <div style={{ fontSize:11, color:C.textDim, marginBottom:6 }}>Score: <span style={{ color:C.text }}>{a.avg}</span></div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:3, marginBottom:6 }}>
              {Object.entries(a.roles).map(([r,c])=>(
                <span key={r} style={{ fontSize:9, background:`${ROLE_COLORS[r]||"#aaa"}18`, color:ROLE_COLORS[r]||"#aaa", borderRadius:4, padding:"1px 5px" }}>{r}×{c}</span>
              ))}
            </div>
            {a.strengths.map((s,j)=><div key={j} style={{ fontSize:10, color:"#4ade80" }}>✓ {s}</div>)}
            {a.weaknesses.map((s,j)=><div key={j} style={{ fontSize:10, color:"#f87171" }}>⚠ {s}</div>)}
            {a.highBans>0&&<div style={{ fontSize:10, color:C.gold, marginTop:4 }}>⭐ แบน S/S+ {a.highBans} ตัว</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
function AdminPage({ heroes, setHeroes, adminTab, setAdminTab }) {
  return (
    <div style={{ padding:"16px", maxWidth:900, margin:"0 auto" }}>
      <div style={{ display:"flex", gap:6, marginBottom:16, borderBottom:`1px solid ${C.border}`, paddingBottom:12 }}>
        {[["heroes","🦸 ฮีโร่"],["tier","📊 Tier List"],["relations","🔗 Counter/Synergy"]].map(([t,l])=>(
          <button key={t} onClick={()=>setAdminTab(t)} style={{ background:adminTab===t?`${C.gold}15`:"transparent", color:adminTab===t?C.gold:C.textDim, border:`1px solid ${adminTab===t?C.goldDim+"55":"transparent"}`, borderRadius:8, padding:"7px 18px", cursor:"pointer", fontSize:13, fontWeight:adminTab===t?600:400, fontFamily:"Rajdhani,sans-serif", letterSpacing:"0.08em" }}>{l}</button>
        ))}
      </div>
      {adminTab==="heroes"    && <AdminHeroes    heroes={heroes} setHeroes={setHeroes} />}
      {adminTab==="tier"      && <AdminTier      heroes={heroes} setHeroes={setHeroes} />}
      {adminTab==="relations" && <AdminRelations heroes={heroes} setHeroes={setHeroes} />}
    </div>
  );
}

// ─── ADMIN HEROES ─────────────────────────────────────────────────────────────
const EMPTY = { name:"", role:[], tier:"A", emoji:"⚔️", color:"#60a5fa", img:"", imgFile:null };

function AdminHeroes({ heroes, setHeroes }) {
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState({ t:"", ok:true });
  const [drag, setDrag] = useState(false);

  function flash(t,ok=true) { setMsg({t,ok}); setTimeout(()=>setMsg({t:"",ok:true}),2500); }

  function onFile(file) {
    if (!file?.type.startsWith("image/")) return;
    const r=new FileReader();
    r.onload=e=>setForm(f=>({...f,img:e.target.result,imgFile:file}));
    r.readAsDataURL(file);
  }

  function save() {
    if (!form.name.trim()) { flash("⚠️ ใส่ชื่อก่อน",false); return; }
    if (!form.role.length)  { flash("⚠️ เลือก Role ก่อน",false); return; }
    if (editId) {
      setHeroes(p=>p.map(h=>h.id===editId?{...h,...form,imgFile:undefined}:h));
      flash("✅ แก้ไขแล้ว");
    } else {
      const id=Math.max(0,...heroes.map(h=>h.id))+1;
      setHeroes(p=>[...p,{...form,id,imgFile:undefined,counters:[],counteredBy:[],synergy:[]}]);
      flash("✅ เพิ่มแล้ว");
    }
    setForm(EMPTY); setEditId(null);
  }

  function del(h) {
    if (!window.confirm(`ลบ ${h.name}?`)) return;
    setHeroes(p=>p.filter(x=>x.id!==h.id)); flash("🗑️ ลบแล้ว");
  }

  function edit(h) {
    setEditId(h.id);
    setForm({name:h.name,role:h.role||[],tier:h.tier||"A",emoji:h.emoji||"⚔️",color:h.color||"#60a5fa",img:h.img||"",imgFile:null});
    window.scrollTo({top:0,behavior:"smooth"});
  }

  const filtered = heroes.filter(h=>h.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {/* Form */}
      <div style={{ ...S.card, padding:16, marginBottom:16, borderColor:editId?`${C.gold}44`:C.border }}>
        <div style={{ fontFamily:"Rajdhani,sans-serif", fontSize:14, fontWeight:700, color:C.gold, letterSpacing:"0.1em", marginBottom:12 }}>
          {editId?"✏️ แก้ไขฮีโร่":"➕ เพิ่มฮีโร่ใหม่"}
        </div>
        <div style={{ display:"flex", gap:14, flexWrap:"wrap", alignItems:"flex-start" }}>
          {/* Image drop */}
          <div>
            <div style={{ ...S.label, marginBottom:6 }}>รูปภาพ</div>
            <div onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);onFile(e.dataTransfer.files[0]);}} onClick={()=>document.getElementById("himg").click()}
              style={{ width:88, height:88, borderRadius:10, border:`2px dashed ${drag?C.gold:C.border}`, background:drag?`${C.gold}08`:C.bgCard, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", overflow:"hidden", transition:"all .15s" }}>
              {form.img ? <img src={form.img} style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : <><div style={{ fontSize:26, marginBottom:4 }}>📷</div><div style={{ fontSize:9, color:C.textDim, textAlign:"center" }}>คลิก / ลาก</div></>}
            </div>
            <input id="himg" type="file" accept="image/*" onChange={e=>onFile(e.target.files[0])} style={{ display:"none" }} />
            {form.img && <button onClick={()=>setForm(f=>({...f,img:"",imgFile:null}))} style={{ marginTop:4, background:"transparent", color:"#ef4444", border:"none", cursor:"pointer", fontSize:10 }}>✕ ลบรูป</button>}
          </div>

          <div style={{ flex:1, minWidth:240 }}>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
              <div style={{ flex:1, minWidth:130 }}>
                <div style={{ ...S.label, marginBottom:4 }}>ชื่อฮีโร่ *</div>
                <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="เช่น Nakroth" style={{ width:"100%", background:"#0a1120", border:`1px solid ${C.border}`, borderRadius:7, padding:"7px 10px", color:C.text, fontSize:13, outline:"none" }} />
              </div>
              <div>
                <div style={{ ...S.label, marginBottom:4 }}>Emoji</div>
                <input value={form.emoji} onChange={e=>setForm(f=>({...f,emoji:e.target.value}))} style={{ width:50, background:"#0a1120", border:`1px solid ${C.border}`, borderRadius:7, padding:"7px", color:C.text, fontSize:18, textAlign:"center", outline:"none" }} />
              </div>
              <div>
                <div style={{ ...S.label, marginBottom:4 }}>สี</div>
                <input type="color" value={form.color} onChange={e=>setForm(f=>({...f,color:e.target.value}))} style={{ width:42, height:34, borderRadius:7, border:`1px solid ${C.border}`, cursor:"pointer", padding:2, background:"none" }} />
              </div>
              <div>
                <div style={{ ...S.label, marginBottom:4 }}>Tier</div>
                <select value={form.tier} onChange={e=>setForm(f=>({...f,tier:e.target.value}))} style={{ background:"#0a1120", border:`1px solid ${C.border}`, borderRadius:7, padding:"7px 10px", color:TIER_COLORS[form.tier], fontSize:13, fontWeight:700, outline:"none" }}>
                  {TIERS.map(t=><option key={t} value={t} style={{color:TIER_COLORS[t]}}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <div style={{ ...S.label, marginBottom:6 }}>Role *</div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                {ROLES.map(r=>{
                  const on=form.role.includes(r); const c=ROLE_COLORS[r]||"#aaa";
                  return <button key={r} onClick={()=>setForm(f=>({...f,role:on?f.role.filter(x=>x!==r):[...f.role,r]}))} style={{ background:on?`${c}22`:"#0a1120", color:on?c:C.textDim, border:`1px solid ${on?`${c}66`:C.border}`, borderRadius:6, padding:"5px 12px", cursor:"pointer", fontSize:12, fontWeight:on?600:400 }}>{r}</button>;
                })}
              </div>
            </div>
          </div>
        </div>

        {form.name&&(
          <div style={{ marginTop:10, padding:"8px 10px", background:"#0a1120", borderRadius:8, display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ fontSize:9, color:C.textDim }}>Preview</div>
            {form.img?<img src={form.img} style={{ width:32,height:32,borderRadius:5,objectFit:"cover" }}/>:<div style={{ width:32,height:32,background:`${form.color}22`,borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{form.emoji}</div>}
            <span style={{ fontSize:13, fontWeight:600 }}>{form.name}</span>
            <span style={{ fontSize:10, background:TIER_COLORS[form.tier]+"33", color:TIER_COLORS[form.tier], borderRadius:4, padding:"0 5px", fontWeight:700 }}>{form.tier}</span>
            {form.role.map(r=><span key={r} style={{ fontSize:9, background:`${ROLE_COLORS[r]||"#aaa"}18`, color:ROLE_COLORS[r]||"#aaa", borderRadius:4, padding:"1px 5px" }}>{r}</span>)}
          </div>
        )}

        {msg.t&&<div style={{ marginTop:8, fontSize:12, color:msg.ok?"#22c55e":"#f87171" }}>{msg.t}</div>}
        <div style={{ display:"flex", gap:8, marginTop:10 }}>
          <button onClick={save} style={{ background:C.gold, color:"#000", border:"none", borderRadius:8, padding:"8px 24px", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"Rajdhani,sans-serif", letterSpacing:"0.08em" }}>{editId?"💾 บันทึก":"➕ เพิ่ม"}</button>
          {editId&&<button onClick={()=>{setEditId(null);setForm(EMPTY);}} style={{ background:"transparent", color:C.textDim, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 16px", cursor:"pointer", fontSize:13 }}>ยกเลิก</button>}
        </div>
      </div>

      {/* List */}
      <div style={{ display:"flex", gap:8, marginBottom:10 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ค้นหา..." style={{ flex:1, background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 12px", color:C.text, fontSize:13, outline:"none" }} />
        <span style={{ ...S.label, display:"flex", alignItems:"center" }}>{filtered.length} ตัว</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:8 }}>
        {filtered.map(h=>(
          <div key={h.id} style={{ ...S.card, padding:"10px 12px", display:"flex", alignItems:"center", gap:10, borderColor:editId===h.id?`${C.gold}55`:C.border }}>
            {h.img?<img src={h.img} style={{ width:46,height:46,borderRadius:8,objectFit:"cover",flexShrink:0,border:`1px solid ${h.color}44` }}/>:<div style={{ width:46,height:46,borderRadius:8,background:`${h.color}22`,border:`1px solid ${h.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0 }}>{h.emoji}</div>}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{h.name}</div>
              <div style={{ fontSize:10, color:C.textDim }}>{(h.role||[]).join(", ")}</div>
              <span style={{ fontSize:10, background:TIER_COLORS[h.tier]+"33", color:TIER_COLORS[h.tier], borderRadius:4, padding:"0 5px", fontWeight:700 }}>{h.tier}</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:4, flexShrink:0 }}>
              <button onClick={()=>edit(h)} style={{ background:"#3b82f618", color:C.blue, border:`1px solid ${C.blue}33`, borderRadius:5, padding:"3px 10px", cursor:"pointer", fontSize:11 }}>✏️</button>
              <button onClick={()=>del(h)}  style={{ background:"#ef444418", color:"#ef4444", border:"1px solid #ef444433", borderRadius:5, padding:"3px 10px", cursor:"pointer", fontSize:11 }}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN TIER ───────────────────────────────────────────────────────────────
function AdminTier({ heroes, setHeroes }) {
  const [dragging, setDragging] = useState(null);
  const byTier = TIERS.reduce((a,t)=>({ ...a, [t]:heroes.filter(h=>h.tier===t) }), {});

  function moveTier(id, tier) { setHeroes(p=>p.map(h=>h.id===id?{...h,tier}:h)); }

  return (
    <div>
      <div style={{ fontSize:11, color:C.textDim, marginBottom:12 }}>Drag & Drop ฮีโร่ระหว่าง Tier หรือกดปุ่ม Tier เพื่อย้าย</div>
      {TIERS.map(tier=>(
        <div key={tier} style={{ display:"flex", marginBottom:6, borderRadius:8, overflow:"hidden", border:`1px solid ${C.border}` }}>
          <div style={{ width:48, background:TIER_COLORS[tier]+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, color:TIER_COLORS[tier], flexShrink:0, fontFamily:"Rajdhani,sans-serif" }}>{tier}</div>
          <div style={{ flex:1, background:C.bgCard, display:"flex", flexWrap:"wrap", gap:5, padding:"8px 10px", minHeight:52 }}
            onDragOver={e=>e.preventDefault()} onDrop={e=>{ if(dragging) moveTier(dragging,tier); setDragging(null); }}>
            {byTier[tier].map(h=>(
              <div key={h.id} draggable onDragStart={()=>setDragging(h.id)} onDragEnd={()=>setDragging(null)}
                style={{ display:"flex", alignItems:"center", gap:4, background:`${h.color}18`, border:`1px solid ${h.color}44`, borderRadius:7, padding:"4px 8px", cursor:"grab" }}>
                {h.img?<img src={h.img} style={{ width:20,height:20,borderRadius:3,objectFit:"cover" }}/>:<span style={{ fontSize:14 }}>{h.emoji}</span>}
                <span style={{ fontSize:11, color:C.text }}>{h.name}</span>
                <div style={{ display:"flex", flexDirection:"column", gap:1, marginLeft:2 }}>
                  {TIERS.filter(t=>t!==tier).map(t=>(
                    <button key={t} onClick={()=>moveTier(h.id,t)} style={{ background:"transparent", color:TIER_COLORS[t], border:"none", cursor:"pointer", fontSize:8, padding:0, lineHeight:1.2 }}>{t}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ADMIN RELATIONS ──────────────────────────────────────────────────────────
function AdminRelations({ heroes, setHeroes }) {
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState("counters");
  const [search, setSearch] = useState("");
  const hero = sel ? heroes.find(h=>h.id===sel) : null;

  function toggle(type, tid) {
    setHeroes(p=>p.map(h=>{
      if (h.id!==sel) return h;
      const arr=h[type]||[];
      return { ...h, [type]:arr.includes(tid)?arr.filter(x=>x!==tid):[...arr,tid] };
    }));
  }

  const TAB_META = {
    counters:    { label:"🗡️ Counter",      color:"#f97316" },
    counteredBy: { label:"🛡️ Countered By", color:"#ef4444" },
    synergy:     { label:"💫 Synergy",       color:"#22c55e" },
  };

  return (
    <div style={{ display:"flex", gap:12 }}>
      {/* Hero list */}
      <div style={{ width:190, flexShrink:0 }}>
        <div style={{ ...S.label, marginBottom:6 }}>เลือกฮีโร่</div>
        <div style={{ maxHeight:600, overflowY:"auto" }}>
          {heroes.map(h=>(
            <div key={h.id} onClick={()=>{ setSel(h.id); setSearch(""); }} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 8px", borderRadius:7, cursor:"pointer", background:sel===h.id?`${C.gold}15`:"transparent", border:`1px solid ${sel===h.id?C.goldDim+"66":"transparent"}`, marginBottom:3, transition:"all .1s" }}>
              {h.img?<img src={h.img} style={{ width:28,height:28,borderRadius:5,objectFit:"cover",flexShrink:0 }}/>:<div style={{ width:28,height:28,borderRadius:5,background:`${h.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0 }}>{h.emoji}</div>}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, color:sel===h.id?C.gold:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{h.name}</div>
                <div style={{ fontSize:9, color:C.textDim }}>{(h.role||[]).join(", ")}</div>
              </div>
              <span style={{ fontSize:9, color:TIER_COLORS[h.tier], fontWeight:700 }}>{h.tier}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Relations panel */}
      <div style={{ flex:1 }}>
        {!hero ? (
          <div style={{ color:C.textDim, fontSize:13, padding:24, textAlign:"center" }}>← เลือกฮีโร่ทางซ้าย</div>
        ) : (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, padding:"10px 12px", ...S.card }}>
              {hero.img?<img src={hero.img} style={{ width:40,height:40,borderRadius:7,objectFit:"cover" }}/>:<div style={{ width:40,height:40,borderRadius:7,background:`${hero.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24 }}>{hero.emoji}</div>}
              <div>
                <div style={{ fontSize:15, fontWeight:600, fontFamily:"Rajdhani,sans-serif" }}>{hero.name}</div>
                <div style={{ fontSize:11, color:C.textDim }}>{(hero.role||[]).join(", ")} · <span style={{ color:TIER_COLORS[hero.tier] }}>{hero.tier}</span></div>
              </div>
            </div>

            <div style={{ display:"flex", gap:6, marginBottom:10 }}>
              {Object.entries(TAB_META).map(([t,m])=>(
                <button key={t} onClick={()=>setTab(t)} style={{ background:tab===t?`${m.color}18`:"transparent", color:tab===t?m.color:C.textDim, border:`1px solid ${tab===t?m.color+"44":C.border}`, borderRadius:7, padding:"5px 12px", cursor:"pointer", fontSize:12, fontWeight:tab===t?600:400 }}>{m.label} <span style={{ fontSize:10, opacity:.7 }}>({(hero[t]||[]).length})</span></button>
              ))}
            </div>

            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ค้นหาเพื่อเพิ่ม/ลบ..." style={{ width:"100%", background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:8, padding:"7px 10px", color:C.text, fontSize:12, outline:"none", marginBottom:8 }} />

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:5, maxHeight:350, overflowY:"auto" }}>
              {heroes.filter(h=>h.id!==sel&&h.name.toLowerCase().includes(search.toLowerCase())).map(h=>{
                const on=(hero[tab]||[]).includes(h.id);
                const col=TAB_META[tab].color;
                return (
                  <div key={h.id} onClick={()=>toggle(tab,h.id)} style={{ display:"flex", alignItems:"center", gap:6, background:on?`${col}15`:C.bgCard, border:`1px solid ${on?`${col}44`:C.border}`, borderRadius:7, padding:"6px 8px", cursor:"pointer", transition:"all .1s" }}>
                    {h.img?<img src={h.img} style={{ width:28,height:28,borderRadius:5,objectFit:"cover",flexShrink:0 }}/>:<div style={{ width:28,height:28,borderRadius:5,background:`${h.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0 }}>{h.emoji}</div>}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:11, color:on?col:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{h.name}</div>
                      <div style={{ fontSize:8, color:C.textDim }}>{h.tier}</div>
                    </div>
                    {on&&<span style={{ color:col, fontSize:12, flexShrink:0 }}>✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

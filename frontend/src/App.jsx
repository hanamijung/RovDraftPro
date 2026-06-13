import { useState, useEffect, useCallback } from "react";

// ==================== DEFAULT DATA ====================
const DEFAULT_HEROES = [
  { id: 1, name: "Airi", role: ["Assassin"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "⚔️", color: "#e879f9" },
  { id: 2, name: "Alice", role: ["Mage"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🔮", color: "#818cf8" },
  { id: 3, name: "Arthur", role: ["Tank"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🛡️", color: "#fbbf24" },
  { id: 4, name: "Astrid", role: ["Warrior"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🗡️", color: "#f472b6" },
  { id: 5, name: "Batman", role: ["Assassin"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "🦇", color: "#6366f1" },
  { id: 6, name: "Butterfly", role: ["Assassin"], tier: "S+", counters: [], counteredBy: [], synergy: [], emoji: "🦋", color: "#34d399" },
  { id: 7, name: "Capheny", role: ["Marksman"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🤖", color: "#60a5fa" },
  { id: 8, name: "Chaugnar", role: ["Support","Tank"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🐘", color: "#9ca3af" },
  { id: 9, name: "Dirak", role: ["Mage"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🌀", color: "#7c3aed" },
  { id: 10, name: "D'Arcy", role: ["Mage"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "🔥", color: "#fb923c" },
  { id: 11, name: "Elsu", role: ["Marksman"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "🏹", color: "#10b981" },
  { id: 12, name: "Enzo", role: ["Tank"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "💎", color: "#f43f5e" },
  { id: 13, name: "Errol", role: ["Support"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🐦", color: "#a78bfa" },
  { id: 14, name: "Esmeralda", role: ["Mage","Tank"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "💧", color: "#2dd4bf" },
  { id: 15, name: "Evelynn", role: ["Assassin"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🌸", color: "#c084fc" },
  { id: 16, name: "Florentino", role: ["Warrior"], tier: "S+", counters: [], counteredBy: [], synergy: [], emoji: "👑", color: "#fbbf24" },
  { id: 17, name: "Grakk", role: ["Tank"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🦖", color: "#4ade80" },
  { id: 18, name: "Hayate", role: ["Assassin"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "💨", color: "#38bdf8" },
  { id: 19, name: "Ignis", role: ["Mage"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🔥", color: "#ef4444" },
  { id: 20, name: "Ilumia", role: ["Mage"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "⭐", color: "#fde68a" },
  { id: 21, name: "Jinnar", role: ["Mage"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "⚡", color: "#7dd3fc" },
  { id: 22, name: "Joker", role: ["Assassin"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "🃏", color: "#a3e635" },
  { id: 23, name: "Krixi", role: ["Mage"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🧚", color: "#f0abfc" },
  { id: 24, name: "Kufra", role: ["Tank"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "⛓️", color: "#6b7280" },
  { id: 25, name: "Laville", role: ["Marksman"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "🔫", color: "#93c5fd" },
  { id: 26, name: "Lauriel", role: ["Mage"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🌙", color: "#d8b4fe" },
  { id: 27, name: "Lindis", role: ["Marksman"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🦊", color: "#86efac" },
  { id: 28, name: "Lu Bu", role: ["Warrior"], tier: "S+", counters: [], counteredBy: [], synergy: [], emoji: "🐉", color: "#dc2626" },
  { id: 29, name: "Maloch", role: ["Tank","Warrior"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "👹", color: "#16a34a" },
  { id: 30, name: "Mganga", role: ["Mage","Support"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🧙", color: "#65a30d" },
  { id: 31, name: "Mina", role: ["Support"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "🌟", color: "#fb7185" },
  { id: 32, name: "Momo", role: ["Mage"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🐼", color: "#d1d5db" },
  { id: 33, name: "Nakroth", role: ["Assassin"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "😈", color: "#f87171" },
  { id: 34, name: "Natalya", role: ["Mage"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🌩️", color: "#818cf8" },
  { id: 35, name: "Omega", role: ["Tank"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🤖", color: "#64748b" },
  { id: 36, name: "Ormarr", role: ["Tank"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🦍", color: "#854d0e" },
  { id: 37, name: "Peura", role: ["Support"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🦌", color: "#a3e635" },
  { id: 38, name: "Raz", role: ["Warrior"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "🌋", color: "#f97316" },
  { id: 39, name: "Riktor", role: ["Tank"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "⚙️", color: "#94a3b8" },
  { id: 40, name: "Ryoma", role: ["Warrior"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "⚔️", color: "#0ea5e9" },
  { id: 41, name: "Skud", role: ["Warrior"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🐗", color: "#78716c" },
  { id: 42, name: "Slimz", role: ["Assassin"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🐊", color: "#22d3ee" },
  { id: 43, name: "Taara", role: ["Warrior"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🪓", color: "#f59e0b" },
  { id: 44, name: "Tel'Annas", role: ["Marksman"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "🍃", color: "#a3e635" },
  { id: 45, name: "Thane", role: ["Tank"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "🧊", color: "#60a5fa" },
  { id: 46, name: "Tulen", role: ["Mage"], tier: "S+", counters: [], counteredBy: [], synergy: [], emoji: "⚡", color: "#fcd34d" },
  { id: 47, name: "Valhein", role: ["Marksman"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🎯", color: "#fb923c" },
  { id: 48, name: "Violet", role: ["Marksman"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "💜", color: "#c084fc" },
  { id: 49, name: "Wiro", role: ["Warrior"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🌊", color: "#67e8f9" },
  { id: 50, name: "Wonder Woman", role: ["Warrior","Tank"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🦅", color: "#fde047" },
  { id: 51, name: "Xeniel", role: ["Support","Tank"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🕊️", color: "#e0f2fe" },
  { id: 52, name: "Yorn", role: ["Marksman"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🍃", color: "#4ade80" },
  { id: 53, name: "Zata", role: ["Assassin"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🦞", color: "#38bdf8" },
  { id: 54, name: "Zephys", role: ["Assassin"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "💀", color: "#475569" },
  { id: 55, name: "Zill", role: ["Mage"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🌩️", color: "#818cf8" },
  { id: 56, name: "Zip", role: ["Support"], tier: "S", counters: [], counteredBy: [], synergy: [], emoji: "🦒", color: "#fb923c" },
  { id: 57, name: "Aleister", role: ["Support","Mage"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🧟", color: "#a78bfa" },
  { id: 58, name: "Annette", role: ["Support"], tier: "B", counters: [], counteredBy: [], synergy: [], emoji: "🎀", color: "#f9a8d4" },
  { id: 59, name: "Baldum", role: ["Tank"], tier: "A", counters: [], counteredBy: [], synergy: [], emoji: "🐂", color: "#92400e" },
  { id: 60, name: "Keera", role: ["Assassin"], tier: "S+", counters: [], counteredBy: [], synergy: [], emoji: "🐍", color: "#84cc16" },
];

const TIERS = ["S+","S","A","B","C","D"];
const ROLES = ["Tank","Warrior","Assassin","Mage","Marksman","Support"];
const TIER_COLORS = { "S+":"#f97316","S":"#eab308","A":"#22c55e","B":"#3b82f6","C":"#8b5cf6","D":"#6b7280" };

// ─────────────────────────────────────────────
// RANKED  (ban 3 each)
// ─────────────────────────────────────────────
const RANKED_ORDER = [
  {phase:'ban', team:'blue', slot:0}, {phase:'ban', team:'red',  slot:0},
  {phase:'ban', team:'blue', slot:1}, {phase:'ban', team:'red',  slot:1},
  {phase:'ban', team:'blue', slot:2}, {phase:'ban', team:'red',  slot:2},
  {phase:'pick', team:'blue', slot:0},
  {phase:'pick', team:'red',  slot:0}, {phase:'pick', team:'red',  slot:1},
  {phase:'pick', team:'blue', slot:1}, {phase:'pick', team:'blue', slot:2},
  {phase:'pick', team:'red',  slot:2}, {phase:'pick', team:'red',  slot:3},
  {phase:'pick', team:'blue', slot:3}, {phase:'pick', team:'blue', slot:4},
  {phase:'pick', team:'red',  slot:4},
];

// ─────────────────────────────────────────────
// TOURNAMENT  (ROV APL real format)
//
// Ban Phase 1  : B → R → B → R
// Pick Phase 1 : B(1) → R(1) → R(2) → B(2) → B(3) → R(3)  ← เบลอสลับ
//   wait — user confirmed:
//   Pick Phase 1 : Blue1 → Red2 → Blue2 → Red1
//   meaning Blue picks slot0, Red picks slot1, Blue picks slot1, Red picks slot0?
//   Re-read: "Blue 1 -> Red 2 -> Blue 2 -> Red 1"
//   = Blue slot0, Red slot1+slot0 two in a row? No.
//   User means: position labels (1st pick of that team, 2nd pick of that team)
//   Blue1 = blue slot0, Red2 = red slot1, Blue2 = blue slot1, Red1 = red slot0
//   → B0 → R1 → B1 → R0  ... then continue:
//   Actually standard ROV Pick1 is: B→RR→BB→R = B0,R0,R1,B1,B2,R2
//   User wrote "Blue 1 -> Red 2 -> Blue 2 -> Red 1" as shorthand for first 4 steps
//   meaning Blue goes 1st, Red gets 2 back-to-back, Blue gets 2, Red gets 1 last
//   = B0 → R0 R1 → B1 B2 → R2  (standard 1-2-2-1 snake)
//
// Pick Phase 2 : "Red 1 -> Blue 2 -> Red 1"
//   = R3 → B3 B4 → R4  (1-2-1 snake, Red starts)
//
// Ban Phase 2  : R → B → R → B  (Red starts)
// ─────────────────────────────────────────────
const TOURNAMENT_ORDER_FIXED = [
  // ── Ban Phase 1: B R B R ──
  {phase:'ban', team:'blue', slot:0},
  {phase:'ban', team:'red',  slot:0},
  {phase:'ban', team:'blue', slot:1},
  {phase:'ban', team:'red',  slot:1},

  // ── Pick Phase 1: B → RR → BB → R  (1-2-2-1) ──
  {phase:'pick', team:'blue', slot:0},
  {phase:'pick', team:'red',  slot:0},
  {phase:'pick', team:'red',  slot:1},
  {phase:'pick', team:'blue', slot:1},
  {phase:'pick', team:'blue', slot:2},
  {phase:'pick', team:'red',  slot:2},

  // ── Ban Phase 2: R B R B ──
  {phase:'ban', team:'red',  slot:2},
  {phase:'ban', team:'blue', slot:2},
  {phase:'ban', team:'red',  slot:3},
  {phase:'ban', team:'blue', slot:3},

  // ── Pick Phase 2: R → BB → R  (1-2-1) ──
  {phase:'pick', team:'red',  slot:3},
  {phase:'pick', team:'blue', slot:3},
  {phase:'pick', team:'blue', slot:4},
  {phase:'pick', team:'red',  slot:4},
];

// ==================== API CONFIG ====================
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

// normalize hero from MongoDB (_id → id, imgUrl → img path)
function normalizeHero(h) {
  return {
    ...h,
    id: h._id || h.id,
    img: h.imgUrl ? `${API_BASE}${h.imgUrl}` : (h.img || ""),
  };
}

async function apiFetch(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

// ==================== MAIN APP ====================
export default function App() {
  const [page, setPage] = useState("draft");
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [adminTab, setAdminTab] = useState("heroes");

  // ── Load heroes from API on mount ──
  useEffect(() => {
    fetchHeroes();
  }, []);

  async function fetchHeroes() {
    setLoading(true);
    setApiError("");
    try {
      const data = await apiFetch("/api/heroes");
      setHeroes(data.map(normalizeHero));
    } catch (err) {
      setApiError("❌ เชื่อมต่อ Server ไม่ได้: " + err.message);
      // Fallback to default heroes so the app still works offline
      setHeroes(DEFAULT_HEROES);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div style={{ background:"#0a0e1a", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:12 }}>
      <div style={{ fontSize:32 }}>⚔️</div>
      <div style={{ color:"#c8a84b", fontSize:14, letterSpacing:2 }}>กำลังโหลดข้อมูล...</div>
    </div>
  );

  return (
    <div style={{ background: "#0a0e1a", minHeight: "100vh", color: "#fff", fontFamily: "'Segoe UI',sans-serif" }}>
      {/* NAV */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 20px", borderBottom:"1px solid #1e2a3a", background:"#060911" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:20, color:"#c8a84b", fontWeight:700, letterSpacing:2 }}>⚔️ ROV DRAFT PRO</span>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {apiError && <span style={{ fontSize:10, color:"#f87171", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }} title={apiError}>⚠️ Offline mode</span>}
          <NavBtn active={page==="draft"} onClick={()=>setPage("draft")}>🎮 Draft</NavBtn>
          <NavBtn active={page==="admin"} onClick={()=>setPage("admin")}>⚙️ Admin</NavBtn>
        </div>
      </div>

      {page === "draft" && <DraftPage heroes={heroes} />}
      {page === "admin" && <AdminPage heroes={heroes} setHeroes={setHeroes} fetchHeroes={fetchHeroes} adminTab={adminTab} setAdminTab={setAdminTab} apiBase={API_BASE} />}
    </div>
  );
}

function NavBtn({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: active ? "#c8a84b22" : "transparent",
      color: active ? "#c8a84b" : "#888",
      border: `1px solid ${active ? "#c8a84b55" : "#2a3040"}`,
      borderRadius: 6, padding: "6px 16px", cursor: "pointer", fontSize: 13, fontWeight: active ? 600 : 400
    }}>{children}</button>
  );
}

// ==================== DRAFT PAGE ====================
// Setup flow: mode → (bo) → side → teamNames → draft
function DraftPage({ heroes }) {
  const [screen, setScreen] = useState("mode"); // mode | bo | side | draft
  const [mode, setMode] = useState(null);
  const [bo, setBo] = useState(3);
  const [mySide, setMySide] = useState("blue"); // "blue"=First Pick, "red"=Second Pick
  const [myName, setMyName] = useState("ทีมเรา");
  const [enemyName, setEnemyName] = useState("ทีมศัตรู");
  const [game, setGame] = useState(1);
  const [draftState, setDraftState] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // blue = First Pick (picks first), red = Second Pick
  function initDraft(order, side, myN, enemyN) {
    const banCount = order.filter(o => o.phase === "ban").length / 2;
    // "blue" slot in order = First Pick side = mySide
    const blueLabel = side === "blue" ? (myN||"ทีมเรา") : (enemyN||"ทีมศัตรู");
    const redLabel  = side === "blue" ? (enemyN||"ทีมศัตรู") : (myN||"ทีมเรา");
    setDraftState({
      order, step:0,
      blueBans:  Array(banCount).fill(null),
      redBans:   Array(banCount).fill(null),
      bluePicks: Array(5).fill(null),
      redPicks:  Array(5).fill(null),
      blueLabel, redLabel,
      mySide: side,  // which slot key is "our team"
    });
  }

  function startDraft() {
    const order = mode === "ranked" ? RANKED_ORDER : TOURNAMENT_ORDER_FIXED;
    initDraft(order, mySide, myName, enemyName);
    setScreen("draft");
    setShowAnalysis(false);
  }

  function nextGame() {
    const order = TOURNAMENT_ORDER_FIXED;
    // sides swap each game
    const nextSide = mySide === "blue" ? "red" : "blue";
    setMySide(nextSide);
    setGame(g => g+1);
    initDraft(order, nextSide, myName, enemyName);
    setShowAnalysis(false);
  }

  // ── SCREEN: mode ──
  if (screen === "mode") return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"80vh", gap:24 }}>
      <div style={{ fontSize:28, fontWeight:700, color:"#c8a84b", letterSpacing:3 }}>SELECT MODE</div>
      <div style={{ display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center" }}>
        <ModeCard icon="🏆" title="Tournament" desc="Ban2 → Pick3 → Ban1 → Pick2" onClick={()=>{ setMode("tournament"); setScreen("bo"); }} color="#f97316" />
        <ModeCard icon="⚡" title="Ranked" desc="แบนฝั่งละ 3 ตัว · 1 เกม" onClick={()=>{ setMode("ranked"); setScreen("side"); }} color="#3b82f6" />
      </div>
    </div>
  );

  // ── SCREEN: bo ──
  if (screen === "bo") return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"80vh", gap:24 }}>
      <StepBack onClick={()=>setScreen("mode")} />
      <div style={{ fontSize:22, fontWeight:700, color:"#c8a84b" }}>🏆 BEST OF</div>
      <div style={{ display:"flex", gap:16 }}>
        {[3,5,7].map(b=>(
          <button key={b} onClick={()=>{ setBo(b); setScreen("side"); }} style={{ background:"#1e2435", color:"#fff", border:"2px solid #c8a84b55", borderRadius:12, padding:"20px 36px", fontSize:28, fontWeight:700, cursor:"pointer" }}>BO{b}</button>
        ))}
      </div>
    </div>
  );

  // ── SCREEN: side ──
  if (screen === "side") return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"80vh", gap:20 }}>
      <StepBack onClick={()=>setScreen(mode==="tournament"?"bo":"mode")} />
      <div style={{ fontSize:22, fontWeight:700, color:"#c8a84b" }}>เลือกฝั่งของทีมเรา</div>
      <div style={{ display:"flex", gap:16 }}>
        <SideCard
          icon="🔵" title="First Pick" sub="บานและ Pick ก่อน"
          active={mySide==="blue"} color="#4a9eff"
          onClick={()=>setMySide("blue")}
        />
        <SideCard
          icon="🔴" title="Second Pick" sub="บานและ Pick หลัง"
          active={mySide==="red"} color="#ff5555"
          onClick={()=>setMySide("red")}
        />
      </div>
      {/* Team name inputs */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", marginTop:8 }}>
        <div>
          <div style={{ fontSize:11, color: mySide==="blue"?"#4a9eff":"#ff5555", marginBottom:4 }}>ชื่อทีมเรา</div>
          <input value={myName} onChange={e=>setMyName(e.target.value)} placeholder="ทีมเรา" style={{ background:"#111827", border:`1px solid ${mySide==="blue"?"#4a9eff55":"#ff555555"}`, borderRadius:7, padding:"8px 12px", color:"#fff", fontSize:13, outline:"none", width:160 }} />
        </div>
        <div>
          <div style={{ fontSize:11, color: mySide==="blue"?"#ff5555":"#4a9eff", marginBottom:4 }}>ชื่อทีมศัตรู</div>
          <input value={enemyName} onChange={e=>setEnemyName(e.target.value)} placeholder="ทีมศัตรู" style={{ background:"#111827", border:`1px solid ${mySide==="blue"?"#ff555555":"#4a9eff55"}`, borderRadius:7, padding:"8px 12px", color:"#fff", fontSize:13, outline:"none", width:160 }} />
        </div>
      </div>
      <button onClick={startDraft} style={{ background:"#c8a84b", color:"#000", border:"none", borderRadius:10, padding:"12px 40px", fontSize:16, fontWeight:700, cursor:"pointer", marginTop:8 }}>
        ▶ เริ่ม Draft
      </button>
      {/* Summary */}
      <div style={{ fontSize:11, color:"#555", textAlign:"center" }}>
        {mode==="tournament"?`BO${bo} · `:"Ranked · "}
        ทีมเรา ({myName}) = <span style={{ color:mySide==="blue"?"#4a9eff":"#ff5555" }}>{mySide==="blue"?"First Pick 🔵":"Second Pick 🔴"}</span>
      </div>
    </div>
  );

  // ── SCREEN: draft ──
  return (
    <div style={{ padding:"12px 16px" }}>
      {/* Header bar */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
        <button onClick={()=>{ setScreen("mode"); setDraftState(null); setGame(1); }} style={{ background:"transparent", color:"#888", border:"1px solid #333", borderRadius:6, padding:"4px 12px", cursor:"pointer", fontSize:12 }}>← ออก</button>
        <span style={{ color:"#c8a84b", fontWeight:600, fontSize:14 }}>
          {mode === "ranked" ? "⚡ RANKED" : `🏆 TOURNAMENT BO${bo}`}
          {mode === "tournament" && ` · เกมที่ ${game}/${bo}`}
        </span>
        <span style={{ fontSize:10, color: mySide==="blue"?"#4a9eff":"#ff5555", background: mySide==="blue"?"#4a9eff22":"#ff555522", border:`1px solid ${mySide==="blue"?"#4a9eff44":"#ff555544"}`, borderRadius:4, padding:"2px 8px" }}>
          {myName} = {mySide==="blue"?"First Pick 🔵":"Second Pick 🔴"}
        </span>
        {mode === "tournament" && draftState?.step >= draftState?.order?.length && (
          <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
            {game < bo && <button onClick={nextGame} style={{ background:"#c8a84b22", color:"#c8a84b", border:"1px solid #c8a84b55", borderRadius:6, padding:"4px 16px", cursor:"pointer", fontSize:12 }}>เกมถัดไป (สลับฝั่ง) →</button>}
            <button onClick={()=>{ setGame(1); setScreen("mode"); setDraftState(null); }} style={{ background:"transparent", color:"#f87171", border:"1px solid #f8717155", borderRadius:6, padding:"4px 12px", cursor:"pointer", fontSize:12 }}>จบ BO</button>
          </div>
        )}
        <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
          {draftState?.step >= draftState?.order?.length && (
            <button onClick={()=>setShowAnalysis(a=>!a)} style={{ background: showAnalysis?"#22c55e22":"#1e2435", color: showAnalysis?"#22c55e":"#aaa", border:`1px solid ${showAnalysis?"#22c55e55":"#333"}`, borderRadius:6, padding:"4px 14px", cursor:"pointer", fontSize:12 }}>
              📊 {showAnalysis?"ซ่อน":"วิเคราะห์"}
            </button>
          )}
          <button onClick={()=>{ initDraft(mode==="ranked"?RANKED_ORDER:TOURNAMENT_ORDER_FIXED, mySide, myName, enemyName); setShowAnalysis(false); }} style={{ background:"#1e2435", color:"#f87171", border:"1px solid #f8717155", borderRadius:6, padding:"4px 12px", cursor:"pointer", fontSize:12 }}>🔄 Reset</button>
        </div>
      </div>

      {draftState && (
        <>
          <DraftBoard draftState={draftState} setDraftState={setDraftState} heroes={heroes} mode={mode} />
          {showAnalysis && <DraftAnalysis draftState={draftState} heroes={heroes} />}
        </>
      )}
    </div>
  );
}

function ModeCard({ icon, title, desc, onClick, color }) {
  return (
    <div onClick={onClick} style={{
      background:"#111827", border:`2px solid ${color}44`, borderRadius:16,
      padding:"32px 40px", cursor:"pointer", textAlign:"center", transition:"all 0.15s",
      minWidth:180
    }}
    onMouseEnter={e=>{ e.currentTarget.style.borderColor=color; e.currentTarget.style.background="#1e2435"; }}
    onMouseLeave={e=>{ e.currentTarget.style.borderColor=`${color}44`; e.currentTarget.style.background="#111827"; }}>
      <div style={{ fontSize:40 }}>{icon}</div>
      <div style={{ fontSize:18, fontWeight:700, color:"#fff", marginTop:8 }}>{title}</div>
      <div style={{ fontSize:12, color:"#888", marginTop:4 }}>{desc}</div>
    </div>
  );
}

function SideCard({ icon, title, sub, active, color, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: active ? `${color}22` : "#111827",
      border: `2px solid ${active ? color : color+"33"}`,
      borderRadius:14, padding:"24px 36px", cursor:"pointer", textAlign:"center", transition:"all 0.15s", minWidth:150
    }}>
      <div style={{ fontSize:36 }}>{icon}</div>
      <div style={{ fontSize:16, fontWeight:700, color: active ? color : "#ccc", marginTop:8 }}>{title}</div>
      <div style={{ fontSize:11, color:"#666", marginTop:4 }}>{sub}</div>
      {active && <div style={{ marginTop:8, fontSize:11, color, fontWeight:600 }}>✓ เลือกแล้ว</div>}
    </div>
  );
}

function StepBack({ onClick }) {
  return (
    <button onClick={onClick} style={{ position:"absolute", top:70, left:16, background:"transparent", color:"#666", border:"1px solid #333", borderRadius:6, padding:"5px 14px", cursor:"pointer", fontSize:12 }}>← กลับ</button>
  );
}


function DraftBoard({ draftState, setDraftState, heroes, mode }) {
  const [search, setSearch] = useState("");
  const { order, step, blueBans, redBans, bluePicks, redPicks } = draftState;
  const isDone = step >= order.length;

  const usedIds = new Set([
    ...blueBans.filter(Boolean).map(h=>h.id),
    ...redBans.filter(Boolean).map(h=>h.id),
    ...bluePicks.filter(Boolean).map(h=>h.id),
    ...redPicks.filter(Boolean).map(h=>h.id),
  ]);
  const bannedIds = new Set([
    ...blueBans.filter(Boolean).map(h=>h.id),
    ...redBans.filter(Boolean).map(h=>h.id),
  ]);

  function pickHero(hero) {
    if (isDone || usedIds.has(hero.id)) return;
    const cur = order[step];
    setDraftState(prev => {
      const next = { ...prev };
      if (cur.phase === "ban") {
        if (cur.team === "blue") { next.blueBans = [...prev.blueBans]; next.blueBans[cur.slot] = hero; }
        else { next.redBans = [...prev.redBans]; next.redBans[cur.slot] = hero; }
      } else {
        if (cur.team === "blue") { next.bluePicks = [...prev.bluePicks]; next.bluePicks[cur.slot] = hero; }
        else { next.redPicks = [...prev.redPicks]; next.redPicks[cur.slot] = hero; }
      }
      return { ...next, step: prev.step + 1 };
    });
  }

  function undo() {
    if (step <= 0) return;
    setDraftState(prev => {
      const s = prev.step - 1;
      const cur = prev.order[s];
      const next = { ...prev, step: s };
      if (cur.phase === "ban") {
        if (cur.team === "blue") { next.blueBans = [...prev.blueBans]; next.blueBans[cur.slot] = null; }
        else { next.redBans = [...prev.redBans]; next.redBans[cur.slot] = null; }
      } else {
        if (cur.team === "blue") { next.bluePicks = [...prev.bluePicks]; next.bluePicks[cur.slot] = null; }
        else { next.redPicks = [...prev.redPicks]; next.redPicks[cur.slot] = null; }
      }
      return next;
    });
  }

  const cur = !isDone ? order[step] : null;
  const blueScore = getBanScore(bluePicks.filter(Boolean), heroes);
  const redScore = getBanScore(redPicks.filter(Boolean), heroes);

  const filteredHeroes = heroes.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {/* Phase progress bar */}
      <DraftPhaseBar order={order} step={step} />

      {/* Turn indicator */}
      <div style={{ textAlign:"center", fontSize:13, marginBottom:8, minHeight:22 }}>
        {isDone ? (
          <span style={{ color:"#c8a84b", fontWeight:600 }}>✓ Draft เสร็จสิ้น!</span>
        ) : (
          <span>
            {cur.phase === "ban" ? <span style={{ color:"#f87171" }}>🚫 BAN</span> : <span style={{ color:"#c8a84b" }}>✅ PICK</span>}
            {" — "}
            <span style={{ color: cur.team==="blue"?"#4a9eff":"#ff5555", fontWeight:600 }}>
              {cur.team === "blue" ? (draftState.blueLabel||"BLUE TEAM") : (draftState.redLabel||"RED TEAM")}
            </span>
            {" สล็อต "}{cur.slot+1}
            {" "}
            <span style={{ fontSize:10, color:"#555", background:"#1e2a3a", borderRadius:4, padding:"1px 6px" }}>
              {getDraftPhaseLabel(order, step)}
            </span>
          </span>
        )}
      </div>

      {/* Ban rows */}
      <div style={{ display:"flex", justifyContent:"center", gap:16, marginBottom:10 }}>
        <TeamBans bans={blueBans} team="blue" label={draftState.blueLabel||"BLUE"} cur={cur} isDone={isDone} />
        <div style={{ display:"flex", alignItems:"center", fontSize:11, color:"#555" }}>BAN</div>
        <TeamBans bans={redBans} team="red" label={draftState.redLabel||"RED"} cur={cur} isDone={isDone} />
      </div>

      {/* Pick rows */}
      <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:12 }}>
        <div style={{ flex:1, maxWidth:340 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
            <span style={{ color:"#4a9eff", fontSize:11, fontWeight:600, letterSpacing:1 }}>{draftState.blueLabel||"BLUE TEAM"}</span>
            <span style={{ color:"#4a9eff", fontSize:11 }}>Power: <b>{blueScore}</b></span>
          </div>
          <div style={{ display:"flex", gap:5 }}>
            {bluePicks.map((h,i) => {
              const isActive = cur && cur.phase==="pick" && cur.team==="blue" && cur.slot===i;
              return <PickSlot key={i} hero={h} team="blue" isActive={isActive} />;
            })}
          </div>
        </div>
        <div style={{ width:2, background:"#1e2a3a", margin:"0 4px" }} />
        <div style={{ flex:1, maxWidth:340 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
            <span style={{ color:"#ff5555", fontSize:11, fontWeight:600, letterSpacing:1 }}>{draftState.redLabel||"RED TEAM"}</span>
            <span style={{ color:"#ff5555", fontSize:11 }}>Power: <b>{redScore}</b></span>
          </div>
          <div style={{ display:"flex", gap:5 }}>
            {redPicks.map((h,i) => {
              const isActive = cur && cur.phase==="pick" && cur.team==="red" && cur.slot===i;
              return <PickSlot key={i} hero={h} team="red" isActive={isActive} />;
            })}
          </div>
        </div>
      </div>

      {/* Real-time Suggestion Panel */}
      {!isDone && <RealtimeSuggestion draftState={draftState} heroes={heroes} cur={cur} usedIds={usedIds} bannedIds={bannedIds} />}

      {/* Controls */}
      <div style={{ display:"flex", gap:8, marginBottom:8 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 SEARCH HERO..." style={{ flex:1, background:"#111827", border:"1px solid #2a3040", borderRadius:7, padding:"8px 12px", color:"#ccc", fontSize:13, outline:"none" }} />
        <button onClick={undo} disabled={step<=0} style={{ background:"#1e2435", color:step>0?"#f87171":"#444", border:`1px solid ${step>0?"#f8717144":"#222"}`, borderRadius:7, padding:"8px 14px", cursor:step>0?"pointer":"default", fontSize:13 }}>↩ Undo</button>
      </div>

      {/* Hero Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(58px,1fr))", gap:5, maxHeight:320, overflowY:"auto" }}>
        {filteredHeroes.map(hero => {
          const isUsed = usedIds.has(hero.id);
          const isBanned = bannedIds.has(hero.id);
          const blueHas = bluePicks.some(h=>h?.id===hero.id);
          const redHas = redPicks.some(h=>h?.id===hero.id);
          return (
            <div key={hero.id} onClick={()=>pickHero(hero)}
              style={{ borderRadius:8, overflow:"hidden", aspectRatio:"1", background:`${hero.color}22`, border:`2px solid ${isUsed?(isBanned?"#f8717166":blueHas?"#4a9eff66":"#ff555566"):"transparent"}`, opacity:isUsed?0.35:1, cursor:isUsed?"default":"pointer", position:"relative", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", transition:"transform 0.1s, border-color 0.1s" }}
              onMouseEnter={e=>{ if(!isUsed) e.currentTarget.style.transform="scale(1.06)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; }}>
              {hero.img
                ? <img src={hero.img} alt={hero.name} style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0 }} />
                : <div style={{ fontSize:22 }}>{hero.emoji}</div>
              }
              <div style={{ position:"absolute", bottom:0, left:0, right:0, fontSize:7, textAlign:"center", background:"#000b", padding:"2px 2px 3px", color:"#eee", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{hero.name}</div>
              {isBanned && <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"#0006" }}><span style={{ fontSize:20, color:"#f87171", fontWeight:700 }}>✕</span></div>}
              <div style={{ position:"absolute", top:2, right:2, fontSize:7, background: TIER_COLORS[hero.tier]+"cc", color:"#000", borderRadius:3, padding:"0 3px", fontWeight:800 }}>{hero.tier}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeamBans({ bans, team, label, cur, isDone }) {
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{ fontSize:9, color: team==="blue"?"#4a9eff":"#ff5555", letterSpacing:1, marginBottom:3 }}>{label}</div>
      <div style={{ display:"flex", gap:4 }}>
        {bans.map((h,i) => {
          const isActive = !isDone && cur?.phase==="ban" && cur?.team===team && cur?.slot===i;
          return (
            <div key={i} style={{ width:38, height:38, borderRadius:6, border:`2px solid ${isActive?"#c8a84b":team==="blue"?"#1a5fa855":"#a81a1a55"}`, background:"#111827", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", boxShadow:isActive?"0 0 0 2px #c8a84b44":undefined }}>
              {h ? (
                <>
                  {h.img
                    ? <img src={h.img} alt={h.name} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"grayscale(0.5)" }} />
                    : <div style={{ fontSize:18, filter:"grayscale(0.6)" }}>{h.emoji}</div>
                  }
                  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"#0005" }}>
                    <span style={{ fontSize:16, color:"#f87171", fontWeight:700 }}>✕</span>
                  </div>
                </>
              ) : (
                <span style={{ fontSize:9, color:"#444" }}>{i+1}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PickSlot({ hero, team, isActive }) {
  return (
    <div style={{ flex:1, minWidth:0, height:64, borderRadius:8, border:`2px solid ${isActive?"#c8a84b":team==="blue"?"#1a5fa877":"#a81a1a77"}`, background: hero?`${hero.color}22`:"#111827", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", boxShadow:isActive?"0 0 0 3px #c8a84b55":"none" }}>
      {hero ? (
        <>
          {hero.img
            ? <img src={hero.img} alt={hero.name} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
            : <div style={{ fontSize:24 }}>{hero.emoji}</div>
          }
          <div style={{ position:"absolute", bottom:0, left:0, right:0, fontSize:7, color:"#eee", textAlign:"center", background:"#000b", padding:"2px 2px 3px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{hero.name}</div>
          <div style={{ position:"absolute", top:2, right:2, fontSize:7, background:TIER_COLORS[hero.tier]+"cc", color:"#000", borderRadius:3, padding:"0 3px", fontWeight:800 }}>{hero.tier}</div>
        </>
      ) : (
        <span style={{ fontSize:10, color:"#333" }}>?</span>
      )}
    </div>
  );
}

function getDraftPhaseLabel(order, step) {
  // Detect phase transitions: count ban→pick or pick→ban switches
  let phase = 1;
  let prevPhase = order[0]?.phase;
  for (let i = 1; i <= step && i < order.length; i++) {
    if (order[i].phase !== prevPhase) { phase++; prevPhase = order[i].phase; }
  }
  const curPhase = order[step]?.phase;
  if (curPhase === "ban") return `Ban Phase ${Math.ceil(phase/2)}`;
  return `Pick Phase ${Math.ceil(phase/2)}`;
}

// Phase progress bar showing Ban1 → Pick1 → Ban2 → Pick2
function DraftPhaseBar({ order, step }) {
  // Build phases list
  const phases = [];
  let cur = null;
  order.forEach((o, i) => {
    const label = o.phase === "ban" ? "Ban" : "Pick";
    if (!cur || cur.phase !== o.phase) {
      cur = { phase: o.phase, label, start: i, end: i };
      phases.push(cur);
    } else {
      cur.end = i;
    }
  });

  return (
    <div style={{ display:"flex", alignItems:"center", gap:2, marginBottom:8, justifyContent:"center" }}>
      {phases.map((p, i) => {
        const isActive = step >= p.start && step <= p.end;
        const isDone = step > p.end;
        const color = p.phase === "ban" ? "#f87171" : "#c8a84b";
        return (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:2 }}>
            {i > 0 && <div style={{ width:16, height:1, background:"#2a3040" }} />}
            <div style={{
              fontSize:9, padding:"2px 8px", borderRadius:10,
              background: isDone ? `${color}22` : isActive ? `${color}33` : "#111827",
              color: isDone ? `${color}88` : isActive ? color : "#444",
              border: `1px solid ${isActive ? color : isDone ? `${color}44` : "#2a3040"}`,
              fontWeight: isActive ? 700 : 400,
              letterSpacing: 0.5,
            }}>
              {isDone ? "✓ " : isActive ? "▶ " : ""}{p.label} {Math.ceil((i+1)/2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}


function getBanScore(picks, allHeroes) {
  if (!picks.length) return 0;
  const val = { "S+":10,"S":8,"A":6,"B":4,"C":2,"D":1 };
  return Math.round(picks.reduce((sum,h)=>sum+(val[h.tier]||4),0) / picks.length * 10) / 10;
}

// ==================== REAL-TIME SUGGESTION ====================
function RealtimeSuggestion({ draftState, heroes, cur, usedIds, bannedIds }) {
  const { bluePicks, redPicks, blueBans, redBans } = draftState;
  if (!cur) return null;

  const myTeam = cur.team;
  const myPicks = (myTeam === "blue" ? bluePicks : redPicks).filter(Boolean);
  const enemyPicks = (myTeam === "blue" ? redPicks : bluePicks).filter(Boolean);
  const myBans = (myTeam === "blue" ? blueBans : redBans).filter(Boolean);

  const available = heroes.filter(h => !usedIds.has(h.id));
  const TIER_VAL = { "S+":10,"S":8,"A":6,"B":4,"C":2,"D":1 };

  // Roles present
  const myRoles = new Set(myPicks.flatMap(h=>h.role));
  const missingRoles = ["Tank","Marksman","Support","Mage","Assassin","Warrior"].filter(r=>!myRoles.has(r));
  const urgentRoles = missingRoles.slice(0, 3);

  // Score hero based on context
  function scoreHero(hero) {
    let score = TIER_VAL[hero.tier] || 4;
    // Bonus if fills missing role
    if (hero.role.some(r => urgentRoles.includes(r))) score += 3;
    // Bonus if counters enemy picks
    const countersEnemy = enemyPicks.filter(e => (hero.counters||[]).includes(e.id)).length;
    score += countersEnemy * 2;
    // Penalty if countered by our picks
    const counteredByUs = myPicks.filter(p => (hero.counteredBy||[]).includes(p.id)).length;
    score -= counteredByUs;
    // Synergy with team
    const synergyCount = myPicks.filter(p => (hero.synergy||[]).includes(p.id) || (p.synergy||[]).includes(hero.id)).length;
    score += synergyCount * 1.5;
    return score;
  }

  // BAN suggestions: target high-tier enemy meta heroes, or heroes that counter our picks
  function getBanSuggestions() {
    return available
      .filter(h => !bannedIds.has(h.id))
      .map(h => {
        let score = TIER_VAL[h.tier] || 4;
        // Priority ban if counters our current picks
        const countersUs = myPicks.filter(p => (h.counters||[]).includes(p.id)).length;
        score += countersUs * 3;
        // Priority ban S+ and S tier
        if (h.tier === "S+") score += 4;
        if (h.tier === "S") score += 2;
        return { hero:h, score, reason: countersUs > 0
          ? `Counter ${myPicks.filter(p=>(h.counters||[]).includes(p.id)).map(p=>p.name).join(", ")} ของเรา`
          : `${h.tier} Tier — Priority pick ของศัตรู`
        };
      })
      .sort((a,b)=>b.score-a.score)
      .slice(0,4);
  }

  // PICK suggestions: fill roles, counter enemy, synergy
  function getPickSuggestions() {
    return available
      .map(h => {
        const score = scoreHero(h);
        const reasons = [];
        if (hero_counters_enemy(h)) reasons.push(`Counter ${enemyPicks.filter(e=>(h.counters||[]).includes(e.id)).map(e=>e.name).join(", ")}`);
        if (h.role.some(r=>urgentRoles.includes(r))) reasons.push(`เติม ${h.role.filter(r=>urgentRoles.includes(r)).join("/")}`);
        const syn = myPicks.filter(p=>(h.synergy||[]).includes(p.id)||(p.synergy||[]).includes(h.id));
        if (syn.length) reasons.push(`Synergy กับ ${syn.map(p=>p.name).join(", ")}`);
        if (!reasons.length) reasons.push(`${h.tier} Tier — Strong pick`);
        return { hero:h, score, reason: reasons[0] };
      })
      .sort((a,b)=>b.score-a.score)
      .slice(0,4);
  }

  function hero_counters_enemy(h) {
    return enemyPicks.some(e=>(h.counters||[]).includes(e.id));
  }

  const isBanPhase = cur.phase === "ban";
  const suggestions = isBanPhase ? getBanSuggestions() : getPickSuggestions();
  const teamColor = myTeam === "blue" ? "#4a9eff" : "#ff5555";
  const teamLabel = myTeam === "blue" ? (draftState.blueLabel||"Blue Team") : (draftState.redLabel||"Red Team");

  // Composition hint
  const compHints = [];
  if (!isBanPhase) {
    if (myPicks.length > 0) {
      if (!myRoles.has("Tank") && myPicks.length >= 2) compHints.push({ icon:"⚠️", text:"ยังไม่มี Tank", color:"#fbbf24" });
      if (!myRoles.has("Marksman") && !myRoles.has("Mage") && myPicks.length >= 2) compHints.push({ icon:"⚠️", text:"ยังไม่มี Carry", color:"#fbbf24" });
      if (!myRoles.has("Support") && myPicks.length >= 3) compHints.push({ icon:"⚠️", text:"ยังไม่มี Support", color:"#fb923c" });
      if (enemyPicks.length > 0) {
        const enemyRoles = new Set(enemyPicks.flatMap(h=>h.role));
        if (enemyRoles.has("Assassin") && !myRoles.has("Tank")) compHints.push({ icon:"🎯", text:"ศัตรูมี Assassin — ควร Pick Tank", color:"#f87171" });
      }
    }
  }

  if (suggestions.length === 0) return null;

  return (
    <div style={{ background:"#0d1525", borderRadius:8, border:`1px solid ${teamColor}33`, padding:"8px 10px", marginBottom:8 }}>
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
        <div style={{ width:3, height:14, background:teamColor, borderRadius:2 }} />
        <span style={{ fontSize:11, fontWeight:600, color:teamColor }}>
          {isBanPhase ? "🚫 แนะนำ BAN" : "✅ แนะนำ PICK"} — {teamLabel}
        </span>
        {compHints.length > 0 && (
          <div style={{ display:"flex", gap:4, marginLeft:"auto", flexWrap:"wrap" }}>
            {compHints.map((h,i)=>(
              <span key={i} style={{ fontSize:9, background:`${h.color}22`, color:h.color, borderRadius:4, padding:"1px 6px", border:`1px solid ${h.color}44` }}>{h.icon} {h.text}</span>
            ))}
          </div>
        )}
      </div>
      <div style={{ display:"flex", gap:5, overflowX:"auto" }}>
        {suggestions.map(({hero, score, reason}, i) => (
          <div key={hero.id} style={{ flexShrink:0, background:`${hero.color}18`, border:`1px solid ${i===0?teamColor:hero.color+"55"}`, borderRadius:8, padding:"6px 8px", minWidth:90, maxWidth:110 }}>
            <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:3 }}>
              {i === 0 && <span style={{ fontSize:9, background:teamColor+"33", color:teamColor, borderRadius:3, padding:"0 4px", fontWeight:700 }}>TOP</span>}
              <span style={{ fontSize:9, background:TIER_COLORS[hero.tier]+"33", color:TIER_COLORS[hero.tier], borderRadius:3, padding:"0 3px", fontWeight:700 }}>{hero.tier}</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <span style={{ fontSize:20 }}>{hero.emoji}</span>
              <div>
                <div style={{ fontSize:10, fontWeight:600, color:"#e2e8f0" }}>{hero.name}</div>
                <div style={{ fontSize:8, color:"#64748b" }}>{hero.role.join("/")}</div>
              </div>
            </div>
            <div style={{ fontSize:8, color:"#94a3b8", marginTop:3, lineHeight:1.3 }}>{reason}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== DRAFT ANALYSIS ====================
function DraftAnalysis({ draftState, heroes }) {
  const { bluePicks, redPicks, blueBans, redBans } = draftState;

  function analyzeTeam(picks, bans, label, color) {
    const validPicks = picks.filter(Boolean);
    const validBans = bans.filter(Boolean);
    if (!validPicks.length) return null;

    const roles = {};
    validPicks.forEach(h => { h.role.forEach(r => { roles[r] = (roles[r]||0)+1; }); });
    const avgTier = getAvgTierScore(validPicks);
    const tierLabel = avgTier >= 9 ? "S+ Tier Team" : avgTier >= 7 ? "S Tier Team" : avgTier >= 5 ? "A Tier Team" : "B Tier Team";
    const hasCarry = validPicks.some(h => h.role.includes("Marksman") || h.role.includes("Mage"));
    const hasTank = validPicks.some(h => h.role.includes("Tank"));
    const hasSupport = validPicks.some(h => h.role.includes("Support"));
    const hasCC = validPicks.some(h => h.role.includes("Tank") || h.role.includes("Support"));

    // Ban analysis
    const bannedTiers = validBans.map(h=>h.tier);
    const highValueBans = validBans.filter(h=>h.tier==="S+"||h.tier==="S").length;

    const strengths = [];
    const weaknesses = [];
    if (hasTank) strengths.push("มีตัวรับดาเมจ");
    else weaknesses.push("ขาด Tank");
    if (hasCarry) strengths.push("มี Carry หลัก");
    else weaknesses.push("ขาด Carry");
    if (hasSupport) strengths.push("มี Support");
    else weaknesses.push("ขาด Support");
    if (hasCC) strengths.push("มี CC/Control");
    if (validPicks.filter(h=>h.role.includes("Assassin")).length>=2) strengths.push("Burst damage สูง");
    if (validPicks.filter(h=>h.role.includes("Assassin")).length>=2 && !hasTank) weaknesses.push("อาจบางมากใน Late");

    return { label, color, picks: validPicks, bans: validBans, roles, tierLabel, avgTier, strengths, weaknesses, highValueBans };
  }

  const blueAna = analyzeTeam(bluePicks, blueBans, draftState.blueLabel||"Blue Team", "#4a9eff");
  const redAna = analyzeTeam(redPicks, redBans, draftState.redLabel||"Red Team", "#ff5555");

  function getWinFavor() {
    if (!blueAna || !redAna) return null;
    const diff = blueAna.avgTier - redAna.avgTier;
    if (Math.abs(diff) < 0.5) return { label:"สมดุล", color:"#fbbf24" };
    const favor = diff > 0 ? blueAna : redAna;
    return { label:`${favor.label} เป็นต่อ`, color: favor.color };
  }

  const favor = getWinFavor();

  return (
    <div style={{ background:"#0d1220", borderRadius:10, border:"1px solid #1e2a3a", padding:14, marginTop:12 }}>
      <div style={{ fontSize:15, fontWeight:600, color:"#c8a84b", marginBottom:12 }}>📊 วิเคราะห์ Draft</div>

      {favor && (
        <div style={{ textAlign:"center", marginBottom:12, padding:"8px", background:`${favor.color}22`, borderRadius:8, border:`1px solid ${favor.color}44` }}>
          <span style={{ color:favor.color, fontWeight:600 }}>⚖️ {favor.label}</span>
        </div>
      )}

      <div style={{ display:"flex", gap:12 }}>
        {[blueAna, redAna].map((ana, idx) => ana && (
          <div key={idx} style={{ flex:1, background:"#111827", borderRadius:8, padding:12, border:`1px solid ${ana.color}33` }}>
            <div style={{ color:ana.color, fontWeight:600, marginBottom:6, fontSize:13 }}>{ana.label}</div>
            <div style={{ fontSize:11, color:"#888", marginBottom:6 }}>Tier Score: <span style={{ color:TIER_COLORS[ana.tierLabel.split(" ")[0]]||"#fff" }}>{ana.avgTier.toFixed(1)} — {ana.tierLabel}</span></div>

            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:10, color:"#666", marginBottom:4 }}>COMPOSITION</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:3 }}>
                {Object.entries(ana.roles).map(([r,c]) => (
                  <span key={r} style={{ fontSize:9, background:"#1e2a3a", color:"#aaa", borderRadius:4, padding:"2px 6px" }}>{r} ×{c}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:10, color:"#22c55e", marginBottom:3 }}>✓ จุดแข็ง</div>
              {ana.strengths.map((s,i)=><div key={i} style={{ fontSize:10, color:"#86efac" }}>• {s}</div>)}
              {ana.weaknesses.map((s,i)=><div key={i} style={{ fontSize:10, color:"#fca5a5" }}>⚠ {s}</div>)}
            </div>

            <div>
              <div style={{ fontSize:10, color:"#f87171", marginBottom:3 }}>🚫 Ban ({ana.bans.length} ตัว)</div>
              <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
                {ana.bans.map((h,i)=>(
                  <span key={i} style={{ fontSize:9, background:"#f8717122", color:"#fca5a5", borderRadius:4, padding:"2px 5px", border:"1px solid #f8717133" }}>{h.emoji}{h.name} [{h.tier}]</span>
                ))}
              </div>
              {ana.highValueBans > 0 && <div style={{ fontSize:10, color:"#fbbf24", marginTop:3 }}>⭐ แบน S/S+ ไป {ana.highValueBans} ตัว — กดดัน Priority Hero ได้ดี</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getAvgTierScore(picks) {
  const val = { "S+":10,"S":8,"A":6,"B":4,"C":2,"D":1 };
  return picks.reduce((sum,h)=>sum+(val[h.tier]||4),0) / (picks.length||1);
}

// ==================== ADMIN PAGE ====================
function AdminPage({ heroes, setHeroes, fetchHeroes, adminTab, setAdminTab, apiBase }) {
  return (
    <div style={{ padding:"12px 16px" }}>
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {[["heroes","🦸 จัดการฮีโร่"],["tier","📊 Tier List"],["relations","🔗 Counter/Synergy"]].map(([t,l])=>(
          <button key={t} onClick={()=>setAdminTab(t)} style={{ background:adminTab===t?"#c8a84b22":"#111827", color:adminTab===t?"#c8a84b":"#888", border:`1px solid ${adminTab===t?"#c8a84b55":"#2a3040"}`, borderRadius:7, padding:"7px 16px", cursor:"pointer", fontSize:13, fontWeight:adminTab===t?600:400 }}>{l}</button>
        ))}
      </div>
      {adminTab === "heroes"    && <AdminHeroes    heroes={heroes} setHeroes={setHeroes} fetchHeroes={fetchHeroes} apiBase={apiBase} />}
      {adminTab === "tier"      && <AdminTier      heroes={heroes} setHeroes={setHeroes} fetchHeroes={fetchHeroes} apiBase={apiBase} />}
      {adminTab === "relations" && <AdminRelations heroes={heroes} setHeroes={setHeroes} fetchHeroes={fetchHeroes} apiBase={apiBase} />}
    </div>
  );
}

// ==================== ADMIN: HEROES ====================
const EMPTY_FORM = { name:"", role:[], tier:"A", emoji:"⚔️", color:"#60a5fa", img:"", imgFile: null };

function AdminHeroes({ heroes, setHeroes, fetchHeroes, apiBase }) {
  const [form, setForm]       = useState(EMPTY_FORM);
  const [editId, setEditId]   = useState(null);
  const [search, setSearch]   = useState("");
  const [msg, setMsg]         = useState({ text:"", ok:true });
  const [saving, setSaving]   = useState(false);
  const [dragOver, setDragOver] = useState(false);

  function showMsg(text, ok=true) { setMsg({text,ok}); setTimeout(()=>setMsg({text:"",ok:true}),3000); }

  // Preview image from file or existing URL
  function handleImageFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => setForm(f => ({ ...f, img: e.target.result, imgFile: file }));
    reader.readAsDataURL(file);
  }
  function onFileInput(e) { handleImageFile(e.target.files[0]); }
  function onDrop(e) { e.preventDefault(); setDragOver(false); handleImageFile(e.dataTransfer.files[0]); }

  async function save() {
    if (!form.name.trim()) { showMsg("⚠️ กรุณาใส่ชื่อฮีโร่", false); return; }
    if (!form.role.length) { showMsg("⚠️ กรุณาเลือก Role", false); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name",        form.name.trim());
      fd.append("role",        JSON.stringify(form.role));
      fd.append("tier",        form.tier);
      fd.append("emoji",       form.emoji);
      fd.append("color",       form.color);
      fd.append("counters",    JSON.stringify([]));
      fd.append("counteredBy", JSON.stringify([]));
      fd.append("synergy",     JSON.stringify([]));
      if (form.imgFile) fd.append("image", form.imgFile);

      if (editId) {
        await fetch(`${apiBase}/api/heroes/${editId}`, { method:"PUT", body:fd });
        showMsg("✅ แก้ไขฮีโร่แล้ว");
      } else {
        await fetch(`${apiBase}/api/heroes`, { method:"POST", body:fd });
        showMsg("✅ เพิ่มฮีโร่แล้ว");
      }
      setForm(EMPTY_FORM); setEditId(null);
      await fetchHeroes();
    } catch (err) {
      showMsg("❌ " + err.message, false);
    } finally {
      setSaving(false);
    }
  }

  function cancel() { setForm(EMPTY_FORM); setEditId(null); }

  async function del(hero) {
    if (!window.confirm(`ลบ ${hero.name}?`)) return;
    try {
      await fetch(`${apiBase}/api/heroes/${hero.id || hero._id}`, { method:"DELETE" });
      showMsg("🗑️ ลบแล้ว");
      await fetchHeroes();
    } catch (err) {
      showMsg("❌ " + err.message, false);
    }
  }

  function edit(h) {
    setEditId(h.id || h._id);
    setForm({ name:h.name, role:h.role||[], tier:h.tier||"A", emoji:h.emoji||"⚔️", color:h.color||"#60a5fa", img:h.img||"", imgFile:null });
    window.scrollTo({ top:0, behavior:"smooth" });
  }

  function toggleRole(r) {
    setForm(f => ({ ...f, role: f.role.includes(r) ? f.role.filter(x=>x!==r) : [...f.role,r] }));
  }

  const filtered = heroes.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {/* ── Form ── */}
      <div style={{ background:"#0d1525", borderRadius:12, padding:16, marginBottom:16, border:`1px solid ${editId?"#c8a84b44":"#1e2a3a"}` }}>
        <div style={{ fontSize:13, color:"#c8a84b", fontWeight:600, marginBottom:12 }}>
          {editId ? "✏️ แก้ไขฮีโร่" : "➕ เพิ่มฮีโร่ใหม่"}
        </div>

        <div style={{ display:"flex", gap:16, flexWrap:"wrap", alignItems:"flex-start" }}>
          {/* Image upload */}
          <div>
            <div style={{ fontSize:11, color:"#666", marginBottom:6 }}>รูปภาพฮีโร่</div>
            <div
              onDragOver={e=>{ e.preventDefault(); setDragOver(true); }}
              onDragLeave={()=>setDragOver(false)}
              onDrop={onDrop}
              onClick={()=>document.getElementById("hero-img-input").click()}
              style={{ width:90, height:90, borderRadius:10, border:`2px dashed ${dragOver?"#c8a84b":"#2a3040"}`, background:dragOver?"#c8a84b11":"#111827", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", overflow:"hidden", position:"relative", transition:"all 0.15s" }}>
              {form.img ? (
                <img src={form.img} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              ) : (
                <>
                  <div style={{ fontSize:28 }}>📷</div>
                  <div style={{ fontSize:9, color:"#555", textAlign:"center" }}>คลิกหรือลากรูป</div>
                </>
              )}
            </div>
            <input id="hero-img-input" type="file" accept="image/*" onChange={onFileInput} style={{ display:"none" }} />
            {form.img && <button onClick={()=>setForm(f=>({...f,img:"",imgFile:null}))} style={{ marginTop:4, background:"transparent", color:"#f87171", border:"none", cursor:"pointer", fontSize:10, padding:0 }}>✕ ลบรูป</button>}
          </div>

          {/* Fields */}
          <div style={{ flex:1, minWidth:260 }}>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:10 }}>
              <div style={{ flex:1, minWidth:140 }}>
                <div style={{ fontSize:11, color:"#666", marginBottom:4 }}>ชื่อฮีโร่ <span style={{ color:"#f87171" }}>*</span></div>
                <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="เช่น Nakroth"
                  style={{ background:"#111827", border:"1px solid #2a3040", borderRadius:7, padding:"7px 10px", color:"#fff", fontSize:13, width:"100%", outline:"none" }} />
              </div>
              <div>
                <div style={{ fontSize:11, color:"#666", marginBottom:4 }}>Emoji</div>
                <input value={form.emoji} onChange={e=>setForm(f=>({...f,emoji:e.target.value}))}
                  style={{ background:"#111827", border:"1px solid #2a3040", borderRadius:7, padding:"7px 8px", color:"#fff", fontSize:18, width:56, textAlign:"center", outline:"none" }} />
              </div>
              <div>
                <div style={{ fontSize:11, color:"#666", marginBottom:4 }}>สีธีม</div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <input type="color" value={form.color} onChange={e=>setForm(f=>({...f,color:e.target.value}))}
                    style={{ width:40, height:34, borderRadius:6, border:"1px solid #2a3040", cursor:"pointer", padding:2 }} />
                  <span style={{ fontSize:10, color:form.color }}>{form.color}</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize:11, color:"#666", marginBottom:4 }}>Tier</div>
                <select value={form.tier} onChange={e=>setForm(f=>({...f,tier:e.target.value}))}
                  style={{ background:"#111827", border:"1px solid #2a3040", borderRadius:7, padding:"7px 10px", color:TIER_COLORS[form.tier], fontSize:13, fontWeight:700, outline:"none" }}>
                  {TIERS.map(t=><option key={t} value={t} style={{color:TIER_COLORS[t]}}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <div style={{ fontSize:11, color:"#666", marginBottom:6 }}>Role <span style={{ color:"#f87171" }}>*</span></div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {ROLES.map(r => {
                  const on = form.role.includes(r);
                  const rc = {Tank:"#60a5fa",Warrior:"#f97316",Assassin:"#a78bfa",Mage:"#818cf8",Marksman:"#34d399",Support:"#f472b6"}[r]||"#aaa";
                  return <button key={r} onClick={()=>toggleRole(r)} style={{ background:on?`${rc}22`:"#111827", color:on?rc:"#555", border:`1px solid ${on?`${rc}77`:"#2a3040"}`, borderRadius:6, padding:"5px 12px", cursor:"pointer", fontSize:12, fontWeight:on?600:400 }}>{r}</button>;
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        {form.name && (
          <div style={{ marginTop:12, padding:"8px 12px", background:"#111827", borderRadius:8, display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ fontSize:10, color:"#555" }}>Preview:</div>
            {form.img ? <img src={form.img} style={{ width:36, height:36, borderRadius:6, objectFit:"cover" }} />
              : <div style={{ width:36, height:36, borderRadius:6, background:`${form.color}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{form.emoji}</div>}
            <span style={{ fontSize:13, fontWeight:600 }}>{form.name}</span>
            <span style={{ fontSize:10, background:TIER_COLORS[form.tier]+"33", color:TIER_COLORS[form.tier], borderRadius:4, padding:"1px 5px", fontWeight:700 }}>{form.tier}</span>
            {form.role.map(r=><span key={r} style={{ fontSize:10, background:"#1e2a3a", color:"#aaa", borderRadius:4, padding:"2px 6px" }}>{r}</span>)}
          </div>
        )}

        {msg.text && <div style={{ marginTop:8, fontSize:12, color:msg.ok?"#22c55e":"#f87171" }}>{msg.text}</div>}

        <div style={{ display:"flex", gap:8, marginTop:12 }}>
          <button onClick={save} disabled={saving} style={{ background:"#c8a84b", color:"#000", border:"none", borderRadius:7, padding:"8px 24px", cursor:"pointer", fontSize:13, fontWeight:700, opacity:saving?0.6:1 }}>
            {saving ? "⏳ กำลังบันทึก..." : editId ? "💾 บันทึก" : "➕ เพิ่มฮีโร่"}
          </button>
          {editId && <button onClick={cancel} style={{ background:"transparent", color:"#888", border:"1px solid #333", borderRadius:7, padding:"8px 16px", cursor:"pointer", fontSize:13 }}>ยกเลิก</button>}
        </div>
      </div>

      {/* ── Hero list ── */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ค้นหาฮีโร่..."
          style={{ flex:1, background:"#111827", border:"1px solid #2a3040", borderRadius:7, padding:"8px 12px", color:"#ccc", fontSize:13, outline:"none" }} />
        <span style={{ fontSize:11, color:"#555" }}>{filtered.length} ตัว</span>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:8 }}>
        {filtered.map(h => (
          <div key={h.id||h._id} style={{ background:"#111827", borderRadius:10, padding:"10px 12px", border:`1px solid ${editId===(h.id||h._id)?"#c8a84b55":"#1e2a3a"}`, display:"flex", alignItems:"center", gap:10 }}>
            {h.img
              ? <img src={h.img} alt={h.name} style={{ width:48, height:48, borderRadius:8, objectFit:"cover", border:`1px solid ${h.color}55`, flexShrink:0 }} />
              : <div style={{ width:48, height:48, borderRadius:8, background:`${h.color}22`, border:`1px solid ${h.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{h.emoji}</div>
            }
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:600, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{h.name}</div>
              <div style={{ fontSize:10, color:"#555", marginBottom:2 }}>{(h.role||[]).join(", ")}</div>
              <span style={{ fontSize:10, background:TIER_COLORS[h.tier]+"33", color:TIER_COLORS[h.tier], borderRadius:4, padding:"0 5px", fontWeight:700 }}>{h.tier}</span>
              {!h.img && <span style={{ marginLeft:5, fontSize:9, color:"#444" }}>ยังไม่มีรูป</span>}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:4, flexShrink:0 }}>
              <button onClick={()=>edit(h)} style={{ background:"#3b82f622", color:"#60a5fa", border:"1px solid #3b82f644", borderRadius:5, padding:"4px 10px", cursor:"pointer", fontSize:11 }}>✏️ แก้</button>
              <button onClick={()=>del(h)}  style={{ background:"#f8717122", color:"#f87171", border:"1px solid #f8717144", borderRadius:5, padding:"4px 10px", cursor:"pointer", fontSize:11 }}>🗑️ ลบ</button>
            </div>
          </div>
        ))}
      </div>

// ==================== ADMIN: TIER LIST ====================
function AdminTier({ heroes, setHeroes, fetchHeroes, apiBase }) {
  const [dragging, setDragging] = useState(null);
  const [hovering, setHovering] = useState(null);
  const [saving, setSaving] = useState(false);

  async function setTier(heroId, tier) {
    // Optimistic update
    setHeroes(prev => prev.map(h => (h.id===heroId||h._id===heroId) ? { ...h, tier } : h));
    try {
      const fd = new FormData();
      fd.append("tier", tier);
      await fetch(`${apiBase}/api/heroes/${heroId}`, { method:"PUT", body:fd });
    } catch (err) {
      fetchHeroes(); // revert on error
    }
  }

  const byTier = TIERS.reduce((acc,t) => {
    acc[t] = heroes.filter(h=>h.tier===t);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ fontSize:12, color:"#666", marginBottom:12 }}>คลิกที่ Tier เพื่อย้ายฮีโร่</div>
      {TIERS.map(tier => (
        <div key={tier} style={{ display:"flex", alignItems:"stretch", gap:0, marginBottom:6, borderRadius:8, overflow:"hidden", border:"1px solid #1e2a3a" }}>
          <div style={{ width:48, background:TIER_COLORS[tier]+"33", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, color:TIER_COLORS[tier], flexShrink:0 }}>{tier}</div>
          <div style={{ flex:1, background:"#0d1220", display:"flex", flexWrap:"wrap", gap:5, padding:"8px 10px", minHeight:52 }}
            onDragOver={e=>{ e.preventDefault(); setHovering(tier); }}
            onDrop={e=>{ if(dragging) setTier(dragging, tier); setDragging(null); setHovering(null); }}>
            {byTier[tier].map(h=>(
              <div key={h.id} draggable onDragStart={()=>setDragging(h.id)} onDragEnd={()=>setDragging(null)}
                style={{ background:`${h.color}22`, border:`1px solid ${h.color}44`, borderRadius:7, padding:"4px 8px", display:"flex", alignItems:"center", gap:4, cursor:"grab", fontSize:12 }}>
                <span>{h.emoji}</span>
                <span style={{ color:"#ccc" }}>{h.name}</span>
                <div style={{ display:"flex", flexDirection:"column", gap:1, marginLeft:2 }}>
                  {TIERS.map(t=> t!==tier && (
                    <button key={t} onClick={()=>setTier(h.id,t)} style={{ background:"transparent", color:TIER_COLORS[t], border:"none", cursor:"pointer", fontSize:8, padding:"0 2px", lineHeight:1.2 }}>{t}▾</button>
                  ))}
                </div>
              </div>
            ))}
            {hovering===tier && dragging && <div style={{ width:50, height:40, border:"2px dashed #c8a84b66", borderRadius:7 }} />}
          </div>
        </div>
      ))}
      <div style={{ fontSize:11, color:"#555", marginTop:8 }}>💡 Drag & Drop หรือกดปุ่ม tier เพื่อย้าย</div>
    </div>
  );
}

// ==================== ADMIN: RELATIONS ====================
function AdminRelations({ heroes, setHeroes, fetchHeroes, apiBase }) {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("counters");
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");

  const hero = selected ? heroes.find(h=>(h.id===selected||h._id===selected)) : null;

  async function toggle(type, targetId) {
    if (!hero) return;
    const hid = hero.id || hero._id;
    const arr = hero[type] || [];
    const next = arr.includes(targetId) ? arr.filter(x=>x!==targetId) : [...arr, targetId];
    // Optimistic
    setHeroes(prev => prev.map(h => (h.id===hid||h._id===hid) ? { ...h, [type]: next } : h));
    try {
      await fetch(`${apiBase}/api/heroes/${hid}/relations`, {
        method: "PATCH",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ [type]: next }),
      });
      setMsg("✅ บันทึกแล้ว"); setTimeout(()=>setMsg(""),1500);
    } catch (err) {
      fetchHeroes();
      setMsg("❌ " + err.message); setTimeout(()=>setMsg(""),2000);
    }
  }

  const filtered = heroes.filter(h => h.id!==selected && h.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display:"flex", gap:12 }}>
      {/* Hero list */}
      <div style={{ width:200, flexShrink:0 }}>
        <div style={{ fontSize:12, color:"#666", marginBottom:6 }}>เลือกฮีโร่</div>
        <div style={{ maxHeight:600, overflowY:"auto" }}>
          {heroes.map(h=>(
            <div key={h.id||h._id} onClick={()=>{ setSelected(h.id||h._id); setSearch(""); }} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 8px", borderRadius:7, cursor:"pointer", background:selected===(h.id||h._id)?"#c8a84b22":"transparent", border:`1px solid ${selected===(h.id||h._id)?"#c8a84b55":"transparent"}`, marginBottom:3 }}>
              <span style={{ fontSize:18 }}>{h.emoji}</span>
              <div>
                <div style={{ fontSize:12, color:selected===h.id?"#c8a84b":"#ccc" }}>{h.name}</div>
                <div style={{ fontSize:9, color:"#555" }}>{h.role.join(", ")}</div>
              </div>
              <span style={{ marginLeft:"auto", fontSize:9, color:TIER_COLORS[h.tier], fontWeight:700 }}>{h.tier}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Relations panel */}
      <div style={{ flex:1 }}>
        {!hero ? (
          <div style={{ color:"#555", fontSize:13, padding:20, textAlign:"center" }}>👆 เลือกฮีโร่ทางซ้าย</div>
        ) : (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <span style={{ fontSize:28 }}>{hero.emoji}</span>
              <div>
                <div style={{ fontSize:15, fontWeight:600 }}>{hero.name}</div>
                <div style={{ fontSize:11, color:"#666" }}>{hero.role.join(", ")} · <span style={{ color:TIER_COLORS[hero.tier] }}>{hero.tier}</span></div>
              </div>
            </div>

            {msg && <div style={{ color:"#22c55e", fontSize:11, marginBottom:8 }}>{msg}</div>}

            <div style={{ display:"flex", gap:6, marginBottom:12 }}>
              {[["counters","🗡️ Counter","#f97316"],["counteredBy","🛡️ Countered By","#ef4444"],["synergy","💫 Synergy","#22c55e"]].map(([t,l,c])=>(
                <button key={t} onClick={()=>setTab(t)} style={{ background:tab===t?`${c}22`:"#111827", color:tab===t?c:"#666", border:`1px solid ${tab===t?c+"55":"#2a3040"}`, borderRadius:6, padding:"5px 12px", cursor:"pointer", fontSize:12 }}>{l}</button>
              ))}
            </div>

            {/* Current relations */}
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:11, color:"#888", marginBottom:5 }}>
                {tab==="counters"?"ตัวที่ฮีโร่นี้ Counter ได้":tab==="counteredBy"?"ตัวที่ Counter ฮีโร่นี้":"Synergy ด้วย"}
                {" ("}{ (hero[tab]||[]).length}{"ตัว)"}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {(hero[tab]||[]).map(id=>{ const h=heroes.find(x=>x.id===id); return h?(
                  <div key={id} style={{ display:"flex", alignItems:"center", gap:4, background:"#1e2a3a", borderRadius:6, padding:"3px 8px" }}>
                    <span>{h.emoji}</span><span style={{ fontSize:11, color:"#ccc" }}>{h.name}</span>
                    <button onClick={()=>toggle(tab,id)} style={{ background:"transparent", color:"#f87171", border:"none", cursor:"pointer", fontSize:10, marginLeft:2 }}>×</button>
                  </div>
                ):null; })}
              </div>
            </div>

            {/* Add relations */}
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ค้นหาเพื่อเพิ่ม..." style={{ background:"#111827", border:"1px solid #2a3040", borderRadius:7, padding:"7px 10px", color:"#ccc", fontSize:12, width:"100%", outline:"none", marginBottom:8 }} />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:5, maxHeight:280, overflowY:"auto" }}>
              {filtered.map(h => {
                const isOn = (hero[tab]||[]).includes(h.id);
                return (
                  <div key={h.id} onClick={()=>toggle(tab,h.id)} style={{ display:"flex", alignItems:"center", gap:6, background:isOn?"#22c55e22":"#111827", border:`1px solid ${isOn?"#22c55e55":"#1e2a3a"}`, borderRadius:7, padding:"6px 8px", cursor:"pointer" }}>
                    <span style={{ fontSize:16 }}>{h.emoji}</span>
                    <div>
                      <div style={{ fontSize:11, color:isOn?"#86efac":"#ccc" }}>{h.name}</div>
                      <div style={{ fontSize:8, color:"#555" }}>{h.tier}</div>
                    </div>
                    {isOn && <span style={{ marginLeft:"auto", color:"#22c55e", fontSize:12 }}>✓</span>}
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
}
)

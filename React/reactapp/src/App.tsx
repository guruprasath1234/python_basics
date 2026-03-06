import { useState, useEffect, useRef, useCallback } from "react";

type Phase = "idle" | "playing" | "success" | "fail";
type FloatText = { id: number; text: string; x: number; y: number; color: string };

let _id = 0;
const uid = () => ++_id;

const LEVELS = [
  { target: 10,  timeLimit: 12, step: 1,  label: "ROOKIE"  },
  { target: 25,  timeLimit: 15, step: 1,  label: "SOLDIER" },
  { target: 50,  timeLimit: 18, step: 2,  label: "WARRIOR" },
  { target: 100, timeLimit: 20, step: 3,  label: "VETERAN" },
  { target: 200, timeLimit: 22, step: 5,  label: "ELITE"   },
  { target: 500, timeLimit: 25, step: 10, label: "LEGEND"  },
];

export default function App() {
  const [phase, setPhase]       = useState<Phase>("idle");
  const [levelIdx, setLevelIdx] = useState(0);
  const [count, setCount]       = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore]       = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [floats, setFloats]     = useState<FloatText[]>([]);
  const [shakeKey, setShakeKey] = useState(0);
  const [shakeDir, setShakeDir] = useState<"l"|"r"|null>(null);
  const [flash, setFlash]       = useState<"green"|"red"|null>(null);
  const [combo, setCombo]       = useState(0);
  const [lastDir, setLastDir]   = useState<"up"|"down"|null>(null);
  const [countKey, setCountKey] = useState(0);

  const timerRef   = useRef<ReturnType<typeof setInterval>|null>(null);
  const scoreRef   = useRef(score);
  const comboRef   = useRef(combo);
  const timeLRef   = useRef(timeLeft);
  scoreRef.current = score;
  comboRef.current = combo;
  timeLRef.current = timeLeft;

  const level    = LEVELS[Math.min(levelIdx, LEVELS.length - 1)];
  const progress = Math.min(1, Math.max(0, count / level.target));
  const timePct  = timeLeft / level.timeLimit;
  const timeColor = timePct > 0.5 ? "#00ffaa" : timePct > 0.25 ? "#ffdd44" : "#ff4466";
  const comboColor = combo >= 5 ? "#ff9900" : combo >= 3 ? "#ffdd44" : "#aaaaff";

  const spawnFloat = (text: string, color: string, btn?: HTMLButtonElement|null) => {
    const x = btn ? btn.getBoundingClientRect().left + btn.offsetWidth / 2 : window.innerWidth / 2;
    const y = btn ? btn.getBoundingClientRect().top - 10 : window.innerHeight / 2;
    const f: FloatText = { id: uid(), text, x, y, color };
    setFloats(p => [...p.slice(-14), f]);
    setTimeout(() => setFloats(p => p.filter(q => q.id !== f.id)), 1000);
  };

  const doShake = (d: "l"|"r") => {
    setShakeDir(d); setShakeKey(k => k + 1);
    setTimeout(() => setShakeDir(null), 400);
  };

  const doFlash = (c: "green"|"red") => {
    setFlash(c); setTimeout(() => setFlash(null), 300);
  };

  const endFail = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    doFlash("red"); doShake("l");
    setBestScore(b => Math.max(b, scoreRef.current));
    setTimeout(() => setPhase("fail"), 200);
  }, []);

  const endSuccess = useCallback((lIdx: number, tLeft: number, sc: number, cb: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    doFlash("green");
    const bonus = Math.ceil(tLeft * 10 + cb * 50);
    const newScore = sc + bonus;
    setScore(newScore);
    setBestScore(b => Math.max(b, newScore));
    spawnFloat(`+${bonus} BONUS!`, "#ffdd44");
    setTimeout(() => {
      const next = lIdx + 1;
      if (next >= LEVELS.length) { setPhase("success"); return; }
      setLevelIdx(next);
      setCount(0); setCombo(0); setLastDir(null);
      setTimeLeft(LEVELS[next].timeLimit);
      setPhase("playing");
    }, 700);
  }, []);

  // Timer
  useEffect(() => {
    if (phase !== "playing") return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { endFail(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, levelIdx, endFail]);

  // Win check
  useEffect(() => {
    if (phase === "playing" && count >= level.target) {
      endSuccess(levelIdx, timeLRef.current, scoreRef.current, comboRef.current);
    }
  }, [count, level.target, phase, levelIdx, endSuccess]);

  const startGame = () => {
    setCount(0); setLevelIdx(0); setScore(0); setCombo(0);
    setLastDir(null); setTimeLeft(LEVELS[0].timeLimit); setPhase("playing");
  };

  const handleInc = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (phase !== "playing") return;
    const btn = e.currentTarget;
    const newDir = "up" as const;
    const newCombo = lastDir === newDir ? combo + 1 : 1;
    setCombo(newCombo); setLastDir(newDir);
    const multiplier = newCombo >= 5 ? 3 : newCombo >= 3 ? 2 : 1;
    const step = level.step * multiplier;
    setCount(c => Math.min(c + step, level.target));
    setCountKey(k => k + 1);
    const pts = step;
    setScore(s => s + pts);
    const txt = newCombo >= 5 ? `🔥 +${step}` : newCombo >= 3 ? `⚡ +${step}` : `+${step}`;
    const col = newCombo >= 5 ? "#ff9900" : newCombo >= 3 ? "#ffdd44" : "#00ffaa";
    spawnFloat(txt, col, btn);
  };

  const handleDec = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (phase !== "playing") return;
    const btn = e.currentTarget;
    const newCombo = lastDir === "down" ? combo + 1 : 1;
    setCombo(newCombo); setLastDir("down");
    setCount(c => Math.max(c - level.step, 0));
    setCountKey(k => k + 1);
    doShake("r");
    spawnFloat(`−${level.step}`, "#ff4466", btn);
  };

  const pct = Math.round(progress * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #070510;
          min-height: 100vh;
          font-family: 'Rajdhani', sans-serif;
          overflow: hidden;
          user-select: none;
          -webkit-user-select: none;
        }

        .bg {
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse 90% 50% at 50% 0%, rgba(100,30,220,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 10% 90%, rgba(0,180,100,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 85%, rgba(220,40,80,0.08) 0%, transparent 55%);
        }

        .grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(100,60,200,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,60,200,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .scene {
          position: fixed; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }

        /* Floating texts */
        .float-layer { position: fixed; inset: 0; pointer-events: none; z-index: 50; }
        .ft {
          position: fixed;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          pointer-events: none;
          transform: translateX(-50%);
          animation: ftUp 1s ease forwards;
          filter: drop-shadow(0 0 6px currentColor);
          white-space: nowrap;
        }
        @keyframes ftUp {
          0%   { opacity: 1; transform: translateX(-50%) scale(1.3) translateY(0); }
          70%  { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) scale(0.8) translateY(-75px); }
        }

        /* Flash */
        .flash { position: fixed; inset: 0; z-index: 45; pointer-events: none; animation: flashOut 0.3s ease forwards; }
        @keyframes flashOut { 0%{opacity:.3} 100%{opacity:0} }

        /* Card */
        .card {
          width: min(430px, 95vw);
          background: rgba(12, 8, 28, 0.92);
          border: 1px solid rgba(120, 80, 220, 0.25);
          box-shadow: 0 0 80px rgba(100,40,220,0.15), 0 50px 100px rgba(0,0,0,0.6);
          padding: 32px 36px 36px;
          position: relative;
          backdrop-filter: blur(24px);
          z-index: 5;
        }
        .card.sl { animation: sl 0.4s ease; }
        .card.sr { animation: sr 0.35s ease; }
        @keyframes sl {
          0%,100%{transform:translateX(0) rotate(0)}
          20%{transform:translateX(-14px) rotate(-1.5deg)}
          50%{transform:translateX(10px) rotate(1deg)}
          80%{transform:translateX(-6px)}
        }
        @keyframes sr {
          0%,100%{transform:translateX(0)}
          25%{transform:translateX(9px)}
          60%{transform:translateX(-5px)}
          85%{transform:translateX(3px)}
        }

        /* Top bar */
        .topbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:22px; }
        .lvl-badge {
          font-family:'Bebas Neue',sans-serif; font-size:11px; letter-spacing:.3em;
          padding:5px 14px; border:1px solid rgba(140,90,255,.4); color:#bb88ff;
          background:rgba(110,40,240,.12);
        }
        .score-val {
          font-family:'Bebas Neue',sans-serif; font-size:24px; color:#ffdd44;
          text-shadow:0 0 18px rgba(255,220,68,.55); letter-spacing:.05em;
        }

        /* Target */
        .tgt-area { text-align:center; margin-bottom:18px; }
        .tgt-lbl { font-size:11px; letter-spacing:.35em; color:rgba(170,140,255,.5); text-transform:uppercase; margin-bottom:2px; }
        .tgt-val {
          font-family:'Bebas Neue',sans-serif; font-size:70px; line-height:1; color:#fff;
          text-shadow:0 0 35px rgba(140,80,255,.6);
        }

        /* Progress */
        .prog-wrap { margin-bottom:6px; }
        .prog-track { height:8px; background:rgba(255,255,255,.06); position:relative; overflow:visible; }
        .prog-fill {
          height:100%; transition:width .12s cubic-bezier(.4,0,.2,1);
          background:linear-gradient(90deg,#6622ee,#cc44ff,#ff44aa);
          box-shadow:0 0 14px rgba(200,60,255,.7); position:relative;
        }
        .prog-fill::after {
          content:''; position:absolute; right:-1px; top:-4px;
          width:2px; height:16px; background:#fff; box-shadow:0 0 8px #fff;
        }
        .prog-pct { font-family:'Bebas Neue',sans-serif; font-size:13px; color:rgba(190,150,255,.6); letter-spacing:.1em; text-align:right; margin-top:4px; }

        /* Count */
        .cnt-area { text-align:center; margin:14px 0 6px; }
        .cnt {
          font-family:'Bebas Neue',sans-serif; font-size:104px; line-height:1;
          display:inline-block; transition:color .2s, text-shadow .2s;
        }
        .cnt.bump { animation:bump .18s ease; }
        @keyframes bump { 0%{transform:scale(1)} 45%{transform:scale(1.14) translateY(-6px)} 100%{transform:scale(1)} }

        /* Combo */
        .combo-row {
          text-align:center; height:30px; margin-bottom:14px;
          display:flex; align-items:center; justify-content:center; gap:8px;
          font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:.1em;
          transition:color .2s;
        }

        /* Timer */
        .timer-area { margin-bottom:22px; }
        .timer-track { height:5px; background:rgba(255,255,255,.06); }
        .timer-fill { height:100%; transition:width .9s linear, background .5s ease; }
        .timer-lbl {
          display:flex; justify-content:space-between; margin-top:6px;
          font-size:11px; letter-spacing:.25em; color:rgba(170,140,255,.5); text-transform:uppercase;
        }
        .timer-num { font-family:'Bebas Neue',sans-serif; font-size:24px; letter-spacing:.05em; }

        /* Buttons */
        .btn-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .gbtn {
          font-family:'Bebas Neue',sans-serif; font-size:44px; letter-spacing:.02em;
          border:none; cursor:pointer; padding:26px 0 20px;
          position:relative; overflow:hidden;
          transition:transform .1s ease, box-shadow .2s ease, filter .1s ease;
          outline:none; -webkit-tap-highlight-color:transparent;
        }
        .gbtn:active { transform:scale(.91); filter:brightness(.7); }
        .gbtn-inc {
          background:rgba(0,220,120,.09); border:1px solid rgba(0,220,120,.4);
          color:#00ffaa; box-shadow:0 0 20px rgba(0,220,120,.12);
        }
        .gbtn-inc:hover { box-shadow:0 0 40px rgba(0,220,120,.35); }
        .gbtn-dec {
          background:rgba(255,40,80,.09); border:1px solid rgba(255,40,80,.4);
          color:#ff4466; box-shadow:0 0 20px rgba(255,40,80,.12);
        }
        .gbtn-dec:hover { box-shadow:0 0 40px rgba(255,40,80,.35); }
        .gbtn::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,.12) 0%,transparent 50%);
          opacity:0; transition:opacity .2s;
        }
        .gbtn:hover::before { opacity:1; }

        /* Step hint */
        .step-hint { text-align:center; margin-top:12px; font-size:12px; letter-spacing:.2em; color:rgba(150,120,220,.4); text-transform:uppercase; }

        /* Overlay */
        .overlay {
          position:fixed; inset:0; z-index:60;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          background:rgba(7,5,16,.93); backdrop-filter:blur(12px);
          animation:fadeIn .45s ease;
        }
        @keyframes fadeIn { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }
        .ov-title { font-family:'Bebas Neue',sans-serif; font-size:76px; letter-spacing:.07em; line-height:1.05; margin-bottom:10px; text-align:center; }
        .ov-sub { font-size:13px; letter-spacing:.25em; text-transform:uppercase; color:rgba(170,140,255,.55); margin-bottom:36px; }
        .ov-score { font-family:'Bebas Neue',sans-serif; font-size:52px; color:#ffdd44; text-shadow:0 0 25px rgba(255,220,68,.5); margin-bottom:6px; }
        .ov-best { font-size:12px; letter-spacing:.25em; color:rgba(170,140,255,.45); margin-bottom:44px; }
        .play-btn {
          font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:.3em;
          padding:18px 64px; background:linear-gradient(135deg,#6622ee,#cc44ff);
          color:#fff; border:none; cursor:pointer;
          box-shadow:0 0 35px rgba(140,40,255,.5);
          clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
          transition:transform .15s, box-shadow .15s, filter .15s;
        }
        .play-btn:hover { transform:translateY(-3px); box-shadow:0 0 55px rgba(140,40,255,.7); filter:brightness(1.1); }
        .play-btn:active { transform:scale(.94); }

        /* Instructions on idle */
        .instructions { margin-bottom:40px; text-align:center; }
        .instr-row { display:flex; gap:20px; justify-content:center; margin-top:16px; }
        .instr-btn {
          font-family:'Bebas Neue',sans-serif; font-size:26px; padding:14px 30px;
          border:1px solid; opacity:.7;
        }
        .instr-btn.i { color:#00ffaa; border-color:rgba(0,220,120,.4); background:rgba(0,220,120,.08); }
        .instr-btn.d { color:#ff4466; border-color:rgba(255,40,80,.4); background:rgba(255,40,80,.08); }
        .instr-lbl { font-size:11px; letter-spacing:.2em; color:rgba(170,140,255,.4); margin-top:10px; }
      `}</style>

      <div className="bg" /><div className="grid" />

      {/* Floats */}
      <div className="float-layer">
        {floats.map(f => (
          <div key={f.id} className="ft" style={{ left: f.x, top: f.y, color: f.color }}>{f.text}</div>
        ))}
      </div>

      {/* Flash */}
      {flash && (
        <div className="flash" style={{ background: flash === "green" ? "rgba(0,255,130,.9)" : "rgba(255,40,80,.9)" }} />
      )}

      {/* IDLE */}
      {phase === "idle" && (
        <div className="overlay">
          <div className="ov-title" style={{ color: "#cc44ff", textShadow: "0 0 50px #9922ff" }}>
            NUMBER<br/>RUSH
          </div>
          <div className="ov-sub">Tap + to reach the target before time runs out</div>
          <div className="instructions">
            <div className="instr-row">
              <div className="instr-btn i">＋</div>
              <div className="instr-btn d">−</div>
            </div>
            <div className="instr-lbl">Chain + taps for COMBO multipliers 🔥</div>
          </div>
          {bestScore > 0 && <div className="ov-best">BEST SCORE: {bestScore} PTS</div>}
          <button className="play-btn" onClick={startGame}>START GAME</button>
        </div>
      )}

      {/* SUCCESS */}
      {phase === "success" && (
        <div className="overlay">
          <div className="ov-title" style={{ color: "#ffdd44", textShadow: "0 0 50px #dd9900" }}>🏆<br/>LEGEND!</div>
          <div className="ov-sub">All 6 levels conquered!</div>
          <div className="ov-score">{score} PTS</div>
          <div className="ov-best">BEST: {bestScore} PTS</div>
          <button className="play-btn" onClick={startGame}>PLAY AGAIN</button>
        </div>
      )}

      {/* FAIL */}
      {phase === "fail" && (
        <div className="overlay">
          <div className="ov-title" style={{ color: "#ff4466", textShadow: "0 0 50px #cc1133" }}>TIME'S<br/>UP!</div>
          <div className="ov-sub">Level {levelIdx + 1} · {level.label}</div>
          <div className="ov-score">{score} PTS</div>
          <div className="ov-best">BEST: {bestScore} PTS</div>
          <button className="play-btn" onClick={startGame}>TRY AGAIN</button>
        </div>
      )}

      {/* GAME */}
      <div className="scene">
        <div className={`card ${shakeDir === "l" ? "sl" : shakeDir === "r" ? "sr" : ""}`} key={shakeKey}>
          <div className="topbar">
            <div className="lvl-badge">LV {levelIdx + 1} · {level.label}</div>
            <div className="score-val">⭐ {score}</div>
          </div>

          <div className="tgt-area">
            <div className="tgt-lbl">reach target</div>
            <div className="tgt-val">{level.target}</div>
          </div>

          <div className="prog-wrap">
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="prog-pct">{pct}%</div>
          </div>

          <div className="cnt-area">
            <span
              key={countKey}
              className="cnt bump"
              style={{
                color: count >= level.target ? "#00ffaa" : "#fff",
                textShadow: count >= level.target ? "0 0 40px #00ffaa" : "0 0 35px rgba(140,80,255,.55)",
              }}
            >
              {count}
            </span>
          </div>

          <div className="combo-row" style={{ color: comboColor }}>
            {combo >= 3 && (
              <span style={{ textShadow: `0 0 14px ${comboColor}`, animation: "bump .18s ease" }}>
                {combo >= 5 ? "🔥 BLAZING" : "⚡ COMBO"} ×{combo}
              </span>
            )}
          </div>

          <div className="timer-area">
            <div className="timer-track">
              <div className="timer-fill" style={{ width: `${timePct * 100}%`, background: timeColor, boxShadow: `0 0 12px ${timeColor}` }} />
            </div>
            <div className="timer-lbl">
              <span>Time</span>
              <span className="timer-num" style={{ color: timeColor, textShadow: `0 0 12px ${timeColor}` }}>{timeLeft}s</span>
            </div>
          </div>

          <div className="btn-row">
            <button className="gbtn gbtn-inc" onClick={handleInc}>＋</button>
            <button className="gbtn gbtn-dec" onClick={handleDec}>−</button>
          </div>

          <div className="step-hint">
            step ×{level.step}{combo >= 3 ? ` · combo ×${combo >= 5 ? 3 : 2}` : ""}
          </div>
        </div>
      </div>
    </>
  );
}
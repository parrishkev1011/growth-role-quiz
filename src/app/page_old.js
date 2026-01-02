"use client";

import { useMemo, useState } from "react";

const ROLE_COPY = {
  architect: {
    title: "The Architect",
    paragraph:
      "You naturally look for structure before you move. When things feel messy or uncertain, your instinct is to slow down and understand how everything fits together beneath the surface. You think in systems, patterns, and long-term logic, which often makes you the person others rely on for clarity when things feel overwhelming. You're not indecisive — you're deliberate. When you do act, it's usually because the plan actually makes sense.",
    strength: "You turn complexity into clear direction.",
    friction: "You can stay in planning mode longer than momentum requires.",
  },
  driver: {
    title: "The Driver",
    paragraph:
      "You're wired for movement. When something feels stuck, your instinct is to act rather than analyze. You gain clarity through motion, not overthinking, and you're often the one who pushes things forward while others are still deciding. You're comfortable making decisions with incomplete information, trusting that progress will reveal what needs to change next.",
    strength: "You create energy and progress quickly.",
    friction:
      "You can outpace clarity and create issues that need revisiting later.",
  },
  guide: {
    title: "The Guide",
    paragraph:
      "You're naturally attuned to people. You notice tone, energy, and unspoken dynamics, often before anything is said out loud. When others feel disconnected or uncertain, you tend to step in to restore understanding and alignment. You care less about forcing outcomes and more about making sure people feel seen, heard, and supported as things move forward.",
    strength: "You create trust and alignment that keeps groups moving together.",
    friction: "You can slow momentum by prioritizing harmony over decisions.",
  },
  builder: {
    title: "The Builder",
    paragraph:
      "You're focused on creating things that last. While others are energized by ideas or speed, you're thinking about how something actually gets built, maintained, and improved over time. You value reliability, consistency, and systems that don't fall apart under pressure. You're often the person who turns plans into something solid and repeatable.",
    strength: "You create durable systems that hold up over time.",
    friction: "You can resist change once something is working.",
  },
  stabilizer: {
    title: "The Stabilizer",
    paragraph:
      "You bring steadiness when things feel uncertain. People often rely on you to keep situations grounded, manageable, and calm — especially when emotions or chaos start to rise. You value balance, patience, and consistency more than speed or recognition. Your presence helps prevent things from spiraling out of control.",
    strength: "You create stability others can depend on.",
    friction:
      "You may tolerate imbalance longer than you should.",
  },
  visionary: {
    title: "The Visionary",
    paragraph:
      "You naturally think ahead. While others focus on what's happening now, your attention is already on what's coming next and how today's choices shape the future. You're drawn to patterns, possibilities, and connections that aren't obvious yet. You're often the one introducing new directions or perspectives that help others see beyond the present moment.",
    strength: "You see possibilities before they’re fully formed.",
    friction:
      "You can feel disconnected from the pace or priorities of the present.",
  },
};

const QUESTIONS = [
  // Architect (3)
  {
    text: "When you’re faced with a new project and limited information, what do you usually do first?",
    options: [
      { label: "Start mapping out how all the pieces might fit together before acting", role: "architect" },
      { label: "Take a small action to see what happens and adjust later", role: "driver" },
      { label: "Talk it through with others to get perspective", role: "guide" },
      { label: "Focus on the long-term possibility and work backward", role: "visionary" },
    ],
  },
  {
    text: "What tends to slow you down the most?",
    options: [
      { label: "Not having enough clarity about how things connect", role: "architect" },
      { label: "Feeling constrained by too many rules or steps", role: "driver" },
      { label: "Unclear dynamics or tension between people", role: "guide" },
      { label: "Losing sight of the bigger picture", role: "visionary" },
    ],
  },
  {
    text: "When pressure is high and decisions need to be made quickly, you’re most likely to:",
    options: [
      { label: "Pause to make sure the decision fits the overall system", role: "architect" },
      { label: "Move forward quickly and fix issues as they come up", role: "driver" },
      { label: "Check in on how people will be affected", role: "guide" },
      { label: "Focus on where this choice leads in the future", role: "visionary" },
    ],
  },

  // Driver (3)
  {
    text: "When something feels stuck or unclear, what’s your most natural response?",
    options: [
      { label: "Take action to create momentum and adjust as things unfold", role: "driver" },
      { label: "Step back and design a clearer plan before moving", role: "architect" },
      { label: "Talk it through with others to understand different perspectives", role: "guide" },
      { label: "Reframe the situation around the bigger picture", role: "visionary" },
    ],
  },
  {
    text: "Which situation is most frustrating for you?",
    options: [
      { label: "Long discussions that don’t lead to a clear next step", role: "driver" },
      { label: "Being asked to move without understanding the full system", role: "architect" },
      { label: "Tension between people slowing things down", role: "guide" },
      { label: "Losing sight of where things are ultimately heading", role: "visionary" },
    ],
  },
  {
    text: "When you make a decision and it doesn’t go perfectly, you’re most likely to:",
    options: [
      { label: "Adjust quickly and keep moving forward", role: "driver" },
      { label: "Rework the structure to prevent future issues", role: "architect" },
      { label: "Check in with people to repair alignment", role: "guide" },
      { label: "Reevaluate the long-term direction", role: "visionary" },
    ],
  },

  // Guide (3)
  {
    text: "When there’s tension or misunderstanding in a group, what do you usually do first?",
    options: [
      { label: "Step in to help people understand each other", role: "guide" },
      { label: "Push forward so progress isn’t delayed", role: "driver" },
      { label: "Reorganize the plan to reduce friction", role: "builder" },
      { label: "Refocus everyone on the bigger picture", role: "visionary" },
    ],
  },
  {
    text: "Which situation is most draining for you?",
    options: [
      { label: "Being around unresolved tension or emotional distance", role: "guide" },
      { label: "Feeling slowed down by too much discussion", role: "driver" },
      { label: "Working without a clear structure or system", role: "builder" },
      { label: "Losing sight of long-term direction", role: "visionary" },
    ],
  },
  {
    text: "When making a difficult decision, you’re most influenced by:",
    options: [
      { label: "How it will affect the people involved", role: "guide" },
      { label: "Whether it keeps things moving", role: "driver" },
      { label: "Whether it fits the overall structure", role: "architect" },
      { label: "Whether it aligns with future goals", role: "visionary" },
    ],
  },

  // Builder (3)
  {
    text: "When a new idea is introduced, what’s your first instinct?",
    options: [
      { label: "Ask how it would actually be built and maintained", role: "builder" },
      { label: "Look for ways to move on it quickly", role: "driver" },
      { label: "Consider how people will respond to it", role: "guide" },
      { label: "Focus on how it fits into the long-term vision", role: "visionary" },
    ],
  },
  {
    text: "Which situation frustrates you the most?",
    options: [
      { label: "Constant changes that disrupt systems that already work", role: "builder" },
      { label: "Slow decision-making that kills momentum", role: "driver" },
      { label: "Emotional tension that blocks progress", role: "guide" },
      { label: "Big ideas with no clear future direction", role: "visionary" },
    ],
  },
  {
    text: "When something breaks or fails, you’re most likely to:",
    options: [
      { label: "Fix the process so it doesn’t happen again", role: "builder" },
      { label: "Push forward and solve it on the fly", role: "driver" },
      { label: "Check in with people affected", role: "guide" },
      { label: "Step back and rethink the overall direction", role: "architect" },
    ],
  },

  // Stabilizer (2)
  {
    text: "When things become chaotic or emotionally charged, what’s your natural response?",
    options: [
      { label: "Stay calm and help steady the situation", role: "stabilizer" },
      { label: "Push forward to regain momentum", role: "driver" },
      { label: "Reorganize systems to restore order", role: "builder" },
      { label: "Focus on where things need to go long-term", role: "visionary" },
    ],
  },
  {
    text: "Which situation are you most likely to tolerate longer than others?",
    options: [
      { label: "Carrying extra responsibility to keep things balanced", role: "stabilizer" },
      { label: "Moving too slowly when action is needed", role: "driver" },
      { label: "Working without a clear plan or structure", role: "architect" },
      { label: "Losing sight of the bigger picture", role: "visionary" },
    ],
  },

  // Visionary (3)
  {
    text: "When you’re thinking about a decision, what naturally gets your attention first?",
    options: [
      { label: "Where this could lead in the future", role: "visionary" },
      { label: "How to take action quickly", role: "driver" },
      { label: "How to build it in a reliable way", role: "builder" },
      { label: "How people will be affected right now", role: "guide" },
    ],
  },
  {
    text: "Which situation is most frustrating for you?",
    options: [
      { label: "Being stuck dealing only with immediate details", role: "visionary" },
      { label: "Slow momentum when action is needed", role: "driver" },
      { label: "Systems that feel rigid or outdated", role: "builder" },
      { label: "Emotional tension that disrupts focus", role: "stabilizer" },
    ],
  },
  {
    text: "When others want step-by-step plans, you’re more likely to:",
    options: [
      { label: "Explain the direction and let the details unfold", role: "visionary" },
      { label: "Push forward and refine as you go", role: "driver" },
      { label: "Build the process before moving", role: "builder" },
      { label: "Slow down to align everyone emotionally", role: "guide" },
    ],
  },
];

function resetScores() {
  return { architect: 0, driver: 0, guide: 0, builder: 0, stabilizer: 0, visionary: 0 };
}
function resetFirstSignalAt() {
  return { architect: null, driver: null, guide: null, builder: null, stabilizer: null, visionary: null };
}

function computeScoresAndFirstSignal(answers) {
  const sc = resetScores();
  const first = resetFirstSignalAt();
  for (let i = 0; i < QUESTIONS.length; i++) {
    const pick = answers[i];
    if (pick == null) continue;
    const role = QUESTIONS[i].options[pick].role;
    sc[role] += 1;
    if (first[role] == null) first[role] = i;
  }
  return { sc, first };
}

function pickWinner(sc, first) {
  const entries = Object.entries(sc).sort((a, b) => b[1] - a[1]);
  const topRole = entries[0][0];
  const topScore = entries[0][1];
  const secondScore = entries[1][1];

  // Rule A: clear win
  if (topScore >= 2 && topScore >= secondScore + 1) return topRole;

  // Rule C: low-signal (no role > 1)
  if (topScore <= 1) {
    let bestRole = null;
    let bestIdx = Infinity;
    for (const [role, score] of Object.entries(sc)) {
      if (score >= 1 && first[role] != null && first[role] < bestIdx) {
        bestIdx = first[role];
        bestRole = role;
      }
    }
    return bestRole || "architect";
  }

  // Rule B: tie for highest => earliest signal wins among tied roles
  const tied = entries.filter(([_, score]) => score === topScore).map(([role]) => role);
  if (tied.length === 1) return tied[0];

  let winner = tied[0];
  let winnerIdx = first[winner] ?? Infinity;
  for (const r of tied) {
    const fi = first[r] ?? Infinity;
    if (fi < winnerIdx) {
      winner = r;
      winnerIdx = fi;
    }
  }
  return winner;
}

export default function Page() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  const chosen = answers[idx];

  const progress = useMemo(() => Math.round(((idx + 1) / QUESTIONS.length) * 100), [idx]);

  function choose(optIdx) {
    const next = [...answers];
    next[idx] = optIdx;
    setAnswers(next);
  }

  function back() {
    setIdx((i) => Math.max(0, i - 1));
  }

  function next() {
    if (chosen == null) return;
    if (idx < QUESTIONS.length - 1) setIdx((i) => i + 1);
    else setDone(true);
  }

  function restart() {
    setIdx(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setDone(false);
    setEmail("");
  }
async function startCheckout(role, email) {
  try {
    const resp = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, email }),
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data?.error || "Checkout failed");

    window.location.href = data.url;
  } catch (e) {
    alert(e?.message || "Checkout error");
  }
}

  const result = useMemo(() => {
    if (!done) return null;
    const { sc, first } = computeScoresAndFirstSignal(answers);
    const winner = pickWinner(sc, first);
    return { winner, ...ROLE_COPY[winner] };
  }, [done, answers]);

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <header style={styles.hero}>
          <div>
            <div style={styles.kicker}>KP Growth Systems</div>
            <div style={{ ...styles.kicker, marginTop: 4 }}>Home of the Momentum Mapping Framework™</div>
            <h1 style={styles.h1}>What's Your Momentum Type?</h1>
            <p style={styles.sub}>
              A short, entertaining quiz that reveals how you naturally create momentum — and what might be slowing you down.
            </p>
          </div>
        </header>

        {!done ? (
          <section style={styles.card}>
            <div style={styles.quizTop}>
              <div>
                <div style={styles.quizTitle}>Take the quiz</div>
                <div style={styles.progressText}>Question {idx + 1} of {QUESTIONS.length}</div>
                <div style={styles.barOuter}><div style={{ ...styles.barInner, width: `${progress}%` }} /></div>
              </div>
              <button style={styles.smallBtn} onClick={restart}>Restart</button>
            </div>

            <div style={styles.qText}>{QUESTIONS[idx].text}</div>

            <div style={styles.opts}>
              {QUESTIONS[idx].options.map((o, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => choose(optIdx)}
                  style={{
                    ...styles.opt,
                    ...(chosen === optIdx ? styles.optSelected : null),
                  }}
                >
                  <b>{String.fromCharCode(65 + optIdx)}.</b> {o.label}
                </button>
              ))}
            </div>

            <div style={styles.nav}>
              <button style={{ ...styles.smallBtn, opacity: idx === 0 ? 0.5 : 1 }} onClick={back} disabled={idx === 0}>Back</button>
              <button style={{ ...styles.primaryBtn, opacity: chosen == null ? 0.6 : 1 }} onClick={next} disabled={chosen == null}>
                {idx === QUESTIONS.length - 1 ? "See my role" : "Next"}
              </button>
            </div>
          </section>
        ) : (
          <section style={styles.card}>
            <div style={styles.resultHead}>
              <div>
                <div style={styles.tag}>Your Growth Role</div>
                <h2 style={styles.h2}>{result.title}</h2>
              </div>
              <button style={styles.smallBtn} onClick={restart}>Retake</button>
            </div>

            <p style={styles.resultP}>{result.paragraph}</p>

            <div style={styles.sf}>
              <div style={styles.sfBox}>
                <b>Strength</b>
                <div style={styles.muted}>{result.strength}</div>
              </div>
              <div style={styles.sfBox}>
                <b>Friction</b>
                <div style={styles.muted}>{result.friction}</div>
              </div>
            </div>

            <div style={styles.upsell}>
              <h3 style={{ margin: "0 0 6px" }}>Want the full blueprint?</h3>
              <p style={styles.muted}>
                Unlock how your role shows up under stress, decision patterns, communication tendencies, blind spots,
                growth recommendations, and the environments you thrive in.
              </p>
              <div style={styles.emailRow}>
                <input
                  style={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email for delivery (recommended)"
                />
                <button
  style={styles.primaryBtn}
  onClick={() => startCheckout(result.winner, email)}
>
  Unlock for $7
</button>

              </div>
              <div style={{ ...styles.muted, fontSize: 13, marginTop: 8 }}>
                Checkout is coming next. For now, this button is a placeholder.
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 700px at 20% -10%, rgba(125,211,252,.18), transparent 55%), radial-gradient(900px 600px at 110% 10%, rgba(167,139,250,.18), transparent 50%), #0b0f14",
    color: "#e9eef5",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    padding: 24,
  },
  wrap: { maxWidth: 980, margin: "0 auto" },
  hero: {
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 18,
    padding: 22,
    background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
    boxShadow: "0 18px 50px rgba(0,0,0,.45)",
    marginBottom: 16,
  },
  kicker: { color: "#a9b7c7", fontSize: 13, letterSpacing: 0.4, textTransform: "uppercase" },
  h1: { margin: "10px 0 8px", fontSize: 40, lineHeight: 1.1 },
  sub: { margin: 0, color: "#a9b7c7", fontSize: 16, maxWidth: "65ch" },

  card: {
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 18,
    padding: 18,
    background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
    boxShadow: "0 18px 50px rgba(0,0,0,.45)",
  },

  quizTop: { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" },
  quizTitle: { fontWeight: 800, fontSize: 16 },
  progressText: { color: "#a9b7c7", fontSize: 13, marginTop: 4 },
  barOuter: { height: 8, borderRadius: 999, background: "rgba(255,255,255,.10)", overflow: "hidden", marginTop: 8 },
  barInner: { height: "100%", borderRadius: 999, background: "linear-gradient(90deg,#7dd3fc,#a78bfa)" },

  qText: { fontSize: 18, marginTop: 14, marginBottom: 12 },
  opts: { display: "grid", gap: 10 },
  opt: {
    textAlign: "left",
    border: "1px solid rgba(255,255,255,.10)",
    background: "rgba(17,27,39,.55)",
    borderRadius: 14,
    padding: 12,
    cursor: "pointer",
    color: "#e9eef5",
  },
  optSelected: {
    borderColor: "rgba(125,211,252,.55)",
    background: "rgba(125,211,252,.10)",
  },

  nav: { display: "flex", justifyContent: "space-between", gap: 12, marginTop: 14 },
  smallBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.10)",
    background: "rgba(17,27,39,.55)",
    color: "#e9eef5",
    cursor: "pointer",
  },
  primaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: 0,
    background: "linear-gradient(135deg,#7dd3fc,#a78bfa)",
    color: "#061018",
    fontWeight: 800,
    cursor: "pointer",
  },

  resultHead: { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" },
  tag: {
    display: "inline-block",
    border: "1px solid rgba(255,255,255,.10)",
    background: "rgba(17,27,39,.55)",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 13,
    color: "#e9eef5",
  },
  h2: { margin: "10px 0 8px", fontSize: 28 },
  resultP: { margin: 0, color: "#a9b7c7", fontSize: 16, lineHeight: 1.6, maxWidth: "75ch" },

  sf: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14, marginBottom: 16 },
  sfBox: {
    border: "1px solid rgba(255,255,255,.10)",
    borderRadius: 14,
    background: "rgba(17,27,39,.55)",
    padding: 12,
  },
  muted: { color: "#a9b7c7" },

  upsell: {
    border: "1px solid rgba(125,211,252,.22)",
    borderRadius: 16,
    padding: 14,
    background:
      "radial-gradient(600px 260px at 0% 0%, rgba(125,211,252,.12), transparent 65%), rgba(17,27,39,.55)",
  },
  emailRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 },
  input: {
    flex: 1,
    minWidth: 240,
    padding: "11px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.10)",
    background: "rgba(15,22,32,.75)",
    color: "#e9eef5",
    outline: "none",
  },
};

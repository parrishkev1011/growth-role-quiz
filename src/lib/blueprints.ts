export type BlueprintSection = {
  title: string;
  body: string[];
};

export type Blueprint = {
  subhead: string;
  sections: BlueprintSection[];
};

export const blueprints: Record<string, Blueprint> = {
  architect: {
    subhead:
      "You create momentum by understanding how things fit together. When the system makes sense, action feels obvious. When it doesn't, everything feels heavier than it should. You don't trust movement without logic — and that instinct has likely saved you from a lot of wasted effort. Your momentum comes from coherence, not speed.",
    sections: [
      {
        title: "Your Core Pattern",
        body: [
          "You create momentum by understanding how things fit together. When the system makes sense, action feels obvious. When it doesn't, everything feels heavier than it should. You don't trust movement without logic — and that instinct has likely saved you from a lot of wasted effort.",
          "Your momentum comes from coherence, not speed.",
        ],
      },
      {
        title: "Your Momentum Strength",
        body: [
          "You see structure where others see chaos.",
          "You're able to connect dots, anticipate consequences, and design approaches that hold up over time.",
          "When you're operating well, your clarity removes confusion for everyone around you.",
        ],
      },
      {
        title: "Your Momentum Leak",
        body: [
          "You can wait for perfect understanding before moving.",
          "Momentum doesn't stall because you're lazy — it stalls because you're still trying to resolve the system mentally. Over time, this turns preparation into avoidance and clarity into friction.",
        ],
      },
      {
        title: "Your 30-Day Focus",
        body: [
          "Shift from complete clarity to sufficient clarity.",
          "Your job this month is not to finish the map — it's to move the system forward with 70–80% confidence and let reality refine the rest.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less:",
          "- Over-modeling outcomes",
          "- Refining plans past usefulness",
          "- Waiting for certainty before acting",
          "Do more:",
          "- Small, intentional experiments",
          "- Committing before you feel \"ready\"",
          "- Letting feedback replace speculation",
        ],
      },
      {
        title: "Your Next 3 Actions",
        body: [
          "1. Choose one system you've been thinking about but not acting on",
          "2. Define the smallest real-world step that tests it",
          "3. Execute it within 48 hours — no redesign allowed",
          "Momentum will meet you after motion.",
        ],
      },
    ],
  },
  driver: {
    subhead:
      "You're wired for movement. When something feels stuck, your instinct is to act rather than analyze. You gain clarity through motion, not overthinking, and you're often the one who pushes things forward while others are still deciding. You're comfortable making decisions with incomplete information, trusting that progress will reveal what needs to change next.",
    sections: [
      {
        title: "Your Core Pattern",
        body: [
          "You create momentum through movement. Action clarifies things for you faster than thinking ever could. You trust progress to reveal problems — and you're usually right.",
          "Stagnation drains you more than mistakes.",
        ],
      },
      {
        title: "Your Momentum Strength",
        body: [
          "You create energy.",
          "You break inertia.",
          "You turn ideas into reality while others are still deciding.",
          "When things feel stuck, you're often the catalyst that gets everything moving again.",
        ],
      },
      {
        title: "Your Momentum Leak",
        body: [
          "You can outrun alignment.",
          "Because action comes easily, you may skip reflection just long enough for small problems to compound. Over time, this creates rework, friction, or burnout — not because you moved, but because you never paused.",
        ],
      },
      {
        title: "Your 30-Day Focus",
        body: [
          "Add intentional pauses, not restraint.",
          "You don't need to slow down — you need short check-ins that ensure momentum is compounding instead of scattering.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less:",
          "- Reacting immediately to every opportunity",
          "- Starting new things before finishing key ones",
          "- Confusing speed with progress",
          "Do more:",
          "- Weekly momentum reviews",
          "- Deciding what not to act on",
          "- Finishing before starting again",
        ],
      },
      {
        title: "Your Next 3 Actions",
        body: [
          "1. List everything currently in motion",
          "2. Identify the one action that actually moves the needle",
          "3. Finish it before starting anything new",
          "Momentum multiplies when it concentrates.",
        ],
      },
    ],
  },
  guide: {
    subhead:
      "You're naturally attuned to people. You notice tone, energy, and unspoken dynamics, often before anything is said out loud. When others feel disconnected or uncertain, you tend to step in to restore understanding and alignment. You care less about forcing outcomes and more about making sure people feel seen, heard, and supported as things move forward.",
    sections: [
      {
        title: "Your Core Pattern",
        body: [
          "You create momentum through alignment. When people feel understood and connected, progress happens naturally. You sense friction early — often before others notice anything is wrong.",
          "You move systems forward by stabilizing relationships.",
        ],
      },
      {
        title: "Your Momentum Strength",
        body: [
          "You build trust.",
          "You reduce resistance.",
          "You keep people engaged long enough for progress to happen.",
          "Groups function better because you're paying attention.",
        ],
      },
      {
        title: "Your Momentum Leak",
        body: [
          "You can over-prioritize harmony.",
          "When decisions feel uncomfortable or tension rises, you may delay clarity to preserve peace. Over time, this can quietly stall momentum — not because people disagree, but because nothing is decided.",
        ],
      },
      {
        title: "Your 30-Day Focus",
        body: [
          "Practice clear decisions with compassionate delivery.",
          "Alignment doesn't require consensus.",
          "Momentum needs direction — even if it's imperfect.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less:",
          "- Avoiding hard conversations",
          "- Waiting for emotional readiness",
          "- Absorbing others' discomfort",
          "Do more:",
          "- Naming decisions clearly",
          "- Separating care from consensus",
          "- Letting tension resolve through action",
        ],
      },
      {
        title: "Your Next 3 Actions",
        body: [
          "1. Identify one unresolved decision you've been circling",
          "2. Name the decision clearly (even if it's uncomfortable)",
          "3. Communicate it with empathy — then move",
          "Clarity is a form of care.",
        ],
      },
    ],
  },
  builder: {
    subhead:
      "You're focused on creating things that last. While others are energized by ideas or speed, you're thinking about how something actually gets built, maintained, and improved over time. You value reliability, consistency, and systems that don't fall apart under pressure. You're often the person who turns plans into something solid and repeatable.",
    sections: [
      {
        title: "Your Core Pattern",
        body: [
          "You create momentum by building things that last. While others chase speed or ideas, you focus on reliability, structure, and sustainability.",
          "Your instinct is to strengthen the foundation before stacking more on top.",
        ],
      },
      {
        title: "Your Momentum Strength",
        body: [
          "You create systems that don't collapse under pressure.",
          "You turn chaos into consistency and effort into durability.",
          "Your work compounds quietly — but powerfully.",
        ],
      },
      {
        title: "Your Momentum Leak",
        body: [
          "You can resist change once something works.",
          "Because stability matters to you, you may hold onto systems longer than they deserve. Over time, protection becomes limitation, and optimization turns into stagnation.",
        ],
      },
      {
        title: "Your 30-Day Focus",
        body: [
          "Introduce intentional disruption.",
          "Not chaos — controlled experimentation that keeps systems evolving instead of ossifying.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less:",
          "- Defending systems out of habit",
          "- Avoiding iteration once something works",
          "- Over-optimizing before validating",
          "Do more:",
          "- Stress-testing assumptions",
          "- Updating processes intentionally",
          "- Allowing temporary mess for long-term gain",
        ],
      },
      {
        title: "Your Next 3 Actions",
        body: [
          "1. Identify one system you're protecting",
          "2. Ask what would break if you changed it slightly",
          "3. Run a small experiment instead of a full overhaul",
          "Durability comes from adaptation.",
        ],
      },
    ],
  },
  stabilizer: {
    subhead:
      "You bring steadiness when things feel uncertain. People often rely on you to keep situations grounded, manageable, and calm — especially when emotions or chaos start to rise. You value balance, patience, and consistency more than speed or recognition. Your presence helps prevent things from spiraling out of control.",
    sections: [
      {
        title: "Your Core Pattern",
        body: [
          "You create momentum by keeping things grounded. When others panic or rush, you steady the system. You value balance, consistency, and preventing unnecessary volatility.",
          "Your presence alone reduces chaos.",
        ],
      },
      {
        title: "Your Momentum Strength",
        body: [
          "You create reliability.",
          "You keep things from spiraling.",
          "You help momentum survive turbulence.",
          "People trust you because you don't overreact.",
        ],
      },
      {
        title: "Your Momentum Leak",
        body: [
          "You can tolerate imbalance for too long.",
          "Because you're comfortable carrying weight, you may absorb dysfunction instead of addressing it. Over time, stability turns into stagnation — not because nothing works, but because nothing changes.",
        ],
      },
      {
        title: "Your 30-Day Focus",
        body: [
          "Move from absorbing pressure to redirecting it.",
          "Stability doesn't mean endurance.",
          "It means intentional correction.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less:",
          "- Carrying others' responsibilities silently",
          "- Normalizing imbalance",
          "- Waiting for things to self-correct",
          "Do more:",
          "- Naming strain early",
          "- Adjusting systems before burnout",
          "- Allowing small disruptions to restore balance",
        ],
      },
      {
        title: "Your Next 3 Actions",
        body: [
          "1. Identify where you're overcompensating",
          "2. Decide what needs adjustment, not endurance",
          "3. Make one corrective change this week",
          "Balance is maintained — not endured.",
        ],
      },
    ],
  },
  visionary: {
    subhead:
      "You naturally think ahead. While others focus on what's happening now, your attention is already on what's coming next and how today's choices shape the future. You're drawn to patterns, possibilities, and connections that aren't obvious yet. You're often the one introducing new directions or perspectives that help others see beyond the present moment.",
    sections: [
      {
        title: "Your Core Pattern",
        body: [
          "You create momentum by seeing what's possible. While others focus on the present, your attention naturally moves toward patterns, trajectories, and future implications.",
          "You move systems forward by expanding what people believe is possible.",
        ],
      },
      {
        title: "Your Momentum Strength",
        body: [
          "You introduce direction.",
          "You reveal opportunity.",
          "You help others see beyond immediate constraints.",
          "Without you, progress often lacks meaning.",
        ],
      },
      {
        title: "Your Momentum Leak",
        body: [
          "You can disconnect from the present.",
          "Because your focus is forward, execution details and immediate constraints may feel limiting. Over time, this creates friction between vision and reality.",
        ],
      },
      {
        title: "Your 30-Day Focus",
        body: [
          "Translate vision into near-term direction.",
          "Momentum requires the future to touch the present — not just inspire it.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less:",
          "- Skipping implementation details entirely",
          "- Moving on before ideas land",
          "- Assuming others see what you see",
          "Do more:",
          "- Anchoring vision in next steps",
          "- Communicating direction repeatedly",
          "- Letting execution refine the idea",
        ],
      },
      {
        title: "Your Next 3 Actions",
        body: [
          "1. Choose one future direction you care about",
          "2. Define the next concrete step this month",
          "3. Communicate it clearly — then support execution",
          "Vision compounds when it becomes actionable.",
        ],
      },
    ],
  },
};

export function getBlueprintByRole(roleSlug: string) {
  return blueprints[roleSlug.toLowerCase()];
}

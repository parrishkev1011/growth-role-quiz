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
      "Architects are not driven by noise. They’re driven by coherence. This blueprint exists to close the gap between structure and action.",
    sections: [
      {
        title: "You Are an Architect",
        body: [
          "Architects are not driven by noise. They’re driven by coherence.",
          "You naturally think in systems — how ideas connect, how effort compounds, how structure creates leverage.",
          "When this role is working, growth feels calm, intentional, and repeatable.",
          "When it isn’t, it feels like you’re always almost ready — refining, improving, and preparing for a moment that never quite arrives.",
          "This blueprint exists to close that gap.",
        ],
      },
      {
        title: "Your Strength Stack",
        body: [
          "At your core, you are a structural thinker. You instinctively organize chaos into frameworks, flows, and systems.",
          "You don’t just ask what works — you ask why it works and how to make it sustainable.",
          "Supporting that is your ability for pattern recognition. You spot misalignment early: wasted effort, bloated processes, strategies that look good but won’t scale.",
          "Your most underutilized advantage is long-term leverage. When you commit to a direction and allow it to compound, your results outpace people who rely on constant output or bursts of intensity.",
          "Most Architects never fully access this advantage — not because they lack discipline, but because they delay exposure.",
        ],
      },
      {
        title: "The Bottleneck Slowing You Down",
        body: [
          "Your bottleneck is overbuilding in isolation.",
          "Architects tend to confuse preparation with progress. You refine frameworks, strengthen systems, and optimize structure before reality has a chance to respond.",
          "But it delays feedback — and feedback is the raw material that turns good architecture into something alive.",
          "When this bottleneck runs unchecked, it creates a quiet loop: you stay productive but invisible; your work improves but adoption doesn’t; growth feels slower than it should.",
          "The problem isn’t effort. It’s sequencing.",
        ],
      },
      {
        title: "Your 30-Day Growth Focus",
        body: [
          "For the next 30 days, your job is not improvement. Your job is exposure.",
          "Select one core structure — one message, one offer, one system — and place it in front of real people before it feels complete.",
          "Ship something slightly uncomfortable once per week.",
          "No rebuilding unless feedback clearly demands it.",
          "This is how Architects unlock momentum without sacrificing depth.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less refining behind closed doors. Do more releasing early versions that invite response.",
          "Do less adding layers of complexity. Do more strengthening the single layer that already works.",
          "Do less planning for scale. Do more proving demand in a small, controlled environment.",
          "Growth doesn’t come from better blueprints. It comes from blueprints that survive contact with reality.",
        ],
      },
      {
        title: "The Path Forward",
        body: [
          "If this blueprint resonated, it’s because you don’t need more ideas. You need alignment between structure and action.",
          "Your next level comes from building systems in public, where feedback informs form.",
          "Use this blueprint as an anchor — not to build more, but to decide what deserves structure, and what simply needs to be released.",
        ],
      },
    ],
  },
  driver: {
    subhead:
      "Drivers are powered by momentum. You move quickly, decide fast, and act before certainty appears.",
    sections: [
      {
        title: "You Are a Driver",
        body: [
          "Drivers are powered by momentum.",
          "You move quickly, decide fast, and act before certainty appears. Where others hesitate, you push forward. Growth, for you, has always come from motion — trying things, testing ideas, and learning on the move.",
          "When this role is working, progress feels exciting and visible. When it isn't, it feels chaotic, exhausting, and strangely unfulfilling despite all the effort.",
          "This blueprint exists to turn your momentum into something that actually compounds.",
        ],
      },
      {
        title: "Your Strength Stack",
        body: [
          "Your primary strength is decisive action. You don't overthink — you move. This allows you to generate real-world data faster than almost anyone. While others are still planning, you're already testing.",
          "Supporting that is your ability to create energy. Your action attracts attention, collaborators, and opportunity. People feel your forward motion and want to plug into it.",
          "Your hidden advantage is speed-to-feedback. You learn faster than most — not because you're smarter, but because you engage reality sooner.",
          "When Drivers succeed long-term, it's not because they slow down. It's because they learn how to aim.",
        ],
      },
      {
        title: "The Bottleneck Slowing You Down",
        body: [
          "Your bottleneck is unfocused acceleration.",
          "Drivers often mistake movement for direction. You start many things, pivot quickly, and stack experiments without fully extracting the lesson from any one of them. It feels productive — and in the short term, it is.",
          "But over time, this creates friction: Momentum without clarity, Activity without leverage, Progress that resets instead of compounds.",
          "You're not doing too little. You're doing too much at once.",
        ],
      },
      {
        title: "Your 30-Day Growth Focus",
        body: [
          "For the next 30 days, your job is not to go faster.",
          "Your job is to hold direction.",
          "Choose one outcome — not one tactic, not one platform — one measurable result. Then align every action to serve that result, even if it feels repetitive or boring.",
          "Your non-negotiable behavior: Repeat the same action long enough to see signal.",
          "Your constraint: No new initiatives unless they directly serve the chosen outcome.",
          "This is how Drivers turn speed into leverage.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less chasing novelty. Do more extracting lessons from what's already in motion.",
          "Do less starting new projects. Do more finishing the ones that matter.",
          "Do less relying on adrenaline. Do more building systems that carry momentum forward.",
          "Growth doesn't reward speed alone. It rewards directed speed.",
        ],
      },
      {
        title: "The Path Forward",
        body: [
          "If this blueprint resonated, it's because you don't lack discipline or ambition.",
          "You lack containment.",
          "Your next level comes from narrowing your focus just enough that your natural momentum finally compounds. When Drivers do this well, they don't lose their edge — they sharpen it.",
          "Use this blueprint as a governor, not a brake. Not to slow you down — but to ensure that where you're going is actually worth arriving at.",
        ],
      },
    ],
  },
  guide: {
    subhead:
      "Guides grow through connection. You pay attention to people — what they need, what they're struggling with, what they're trying to become.",
    sections: [
      {
        title: "You Are a Guide",
        body: [
          "Guides grow through connection.",
          "You pay attention to people — what they need, what they're struggling with, what they're trying to become. You don't force growth. You facilitate it. When others feel seen, understood, and supported, momentum naturally follows.",
          "When this role is working, growth feels relational and meaningful. When it isn't, it feels slow, draining, and unfairly invisible.",
          "This blueprint exists to help you grow without betraying your nature.",
        ],
      },
      {
        title: "Your Strength Stack",
        body: [
          "Your primary strength is attunement. You sense emotional and contextual nuance that others miss. You understand where people are before they understand it themselves. This makes your guidance feel timely and personal.",
          "Supporting that is your ability to build trust. People open up to you quickly. They listen. They return. Your presence lowers resistance and raises clarity.",
          "Your hidden advantage is loyalty-driven growth. When Guides build correctly, they don't need constant reach — they create depth. Their audience doesn't just consume; they commit.",
          "Most Guides underuse this advantage by trying to grow like Drivers or Architects.",
        ],
      },
      {
        title: "The Bottleneck Slowing You Down",
        body: [
          "Your bottleneck is over-giving without structure.",
          "Guides tend to offer support freely and continuously. You help, clarify, respond, and reassure — often without boundaries or a clear container. It feels generous. It feels aligned.",
          "But it dilutes your impact.",
          "When guidance isn't framed, it becomes invisible. When value isn't structured, it becomes expected rather than appreciated. Over time, this leads to: High effort, low leverage, Emotional fatigue, Growth that depends entirely on your availability.",
          "You're not giving too much. You're giving without containment.",
        ],
      },
      {
        title: "Your 30-Day Growth Focus",
        body: [
          "For the next 30 days, your job is not to help more people.",
          "Your job is to help in a repeatable way.",
          "Choose one recurring problem you're already addressing. Package your guidance around it. Say the same thing, in the same framing, often enough that people recognize it as your lane.",
          "Your non-negotiable behavior: Repeat your core message instead of customizing it endlessly.",
          "Your constraint: No new advice unless it fits inside the container you've defined.",
          "This is how Guides create scale without losing integrity.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less responding to everything. Do more directing people to one clear resource or framework.",
          "Do less personalizing every message. Do more refining a single articulation that travels further.",
          "Do less equating accessibility with value. Do more allowing boundaries to increase trust.",
          "Growth doesn't come from helping everyone. It comes from helping clearly.",
        ],
      },
      {
        title: "The Path Forward",
        body: [
          "If this blueprint resonated, it's because you already know how to support people.",
          "What you need now is structure that protects your energy and amplifies your voice.",
          "Your next level comes from turning your natural guidance into a system others can return to without needing you present every time. When Guides do this well, they don't lose connection — they deepen it.",
          "Use this blueprint as permission. Not to withdraw — but to lead with clarity instead of constant availability.",
        ],
      },
    ],
  },
  builder: {
    subhead:
      "Builders grow through consistency. You show up. You execute. You do the work even when it isn't glamorous.",
    sections: [
      {
        title: "You Are a Builder",
        body: [
          "Builders grow through consistency.",
          "You show up. You execute. You do the work even when it isn't glamorous. While others chase ideas or visibility, you focus on making things function. Progress, for you, has always come from reliability rather than excitement.",
          "When this role is working, growth feels steady and earned. When it isn't, it feels slow, unnoticed, and frustratingly taken for granted.",
          "This blueprint exists to turn your consistency into leverage.",
        ],
      },
      {
        title: "Your Strength Stack",
        body: [
          "Your primary strength is execution. You don't get stuck in theory — you translate plans into action. You're the person things actually get done through. Over time, this makes you dependable in a way few people are.",
          "Supporting that is your ability to build momentum quietly. You don't need bursts of motivation or external pressure. You improve through repetition, refinement, and follow-through.",
          "Your hidden advantage is trust accumulation. Every completed task, every kept promise, every shipped output compounds into credibility — even if it doesn't feel dramatic in the moment.",
          "Most Builders undervalue this advantage because it grows invisibly.",
        ],
      },
      {
        title: "The Bottleneck Slowing You Down",
        body: [
          "Your bottleneck is execution without direction.",
          "Builders are so good at doing the work that they often don't question why they're doing it. You take on tasks, requests, and responsibilities without stepping back to assess whether they actually move you forward.",
          "Over time, this creates a familiar pattern: High output, low recognition, Constant motion, limited progress, A sense of being essential but replaceable.",
          "You're not lacking effort. You're lacking selectivity.",
        ],
      },
      {
        title: "Your 30-Day Growth Focus",
        body: [
          "For the next 30 days, your job is not to do more.",
          "Your job is to choose what deserves your effort.",
          "Identify the one activity that creates the most downstream impact. Then deliberately deprioritize everything else, even if it feels uncomfortable or \"unfinished.\"",
          "Your non-negotiable behavior: Say no to tasks that don't compound.",
          "Your constraint: No new commitments unless they clearly connect to the outcome you care about.",
          "This is how Builders turn reliability into authority.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less saying yes by default. Do more protecting your time and energy.",
          "Do less equating busyness with value. Do more measuring outcomes instead of output.",
          "Do less building for others' priorities. Do more aligning effort with your own direction.",
          "Growth doesn't reward effort alone. It rewards effort aimed at the right thing.",
        ],
      },
      {
        title: "The Path Forward",
        body: [
          "If this blueprint resonated, it's because you already know how to work hard.",
          "What you need now is permission to be strategic with your effort.",
          "Your next level comes from pairing your execution strength with intentional direction. When Builders do this well, they don't just support growth — they own it.",
          "Use this blueprint as a filter. Not to work less — but to ensure that what you build actually moves you forward.",
        ],
      },
    ],
  },
  stabilizer: {
    subhead:
      "Stabilizers grow through reliability. You bring calm to chaos. You create order where things would otherwise wobble or break.",
    sections: [
      {
        title: "You Are a Stabilizer",
        body: [
          "Stabilizers grow through reliability.",
          "You bring calm to chaos. You create order where things would otherwise wobble or break. While others push for speed or novelty, you protect what already works and ensure it doesn't collapse under pressure.",
          "When this role is working, growth feels sustainable and grounded. When it isn't, it feels thankless — like you're holding everything together while momentum passes you by.",
          "This blueprint exists to help you grow without becoming invisible.",
        ],
      },
      {
        title: "Your Strength Stack",
        body: [
          "Your primary strength is consistency under pressure. You don't panic when things get messy. You hold standards, maintain quality, and keep systems running when others burn out or move on.",
          "Supporting that is your ability to reduce volatility. You smooth sharp edges, catch mistakes early, and prevent small issues from becoming costly failures. This makes you invaluable in environments that would otherwise be unstable.",
          "Your hidden advantage is long-term trust. People rely on you because you're predictable in the best way. Over time, this creates deep credibility — the kind that quietly determines who gets real responsibility.",
          "Most Stabilizers don't realize how rare this advantage is until it's missing.",
        ],
      },
      {
        title: "The Bottleneck Slowing You Down",
        body: [
          "Your bottleneck is self-erasure in service of stability.",
          "Stabilizers often prioritize keeping things running over being seen. You absorb problems, fix issues quietly, and protect momentum without drawing attention to your role in it. It feels right. It feels mature.",
          "But it comes at a cost.",
          "When your contribution is invisible, growth stalls. You become associated with maintenance rather than progress. Over time, this leads to: Being depended on but overlooked, Increased responsibility without increased opportunity, A sense of carrying weight that isn't fully acknowledged.",
          "You're not too passive. You're too quiet about your impact.",
        ],
      },
      {
        title: "Your 30-Day Growth Focus",
        body: [
          "For the next 30 days, your job is not to stabilize more.",
          "Your job is to name the stability you create.",
          "Choose one area where your presence prevents failure, friction, or regression. Make that contribution visible — not through self-promotion, but through clear articulation.",
          "Your non-negotiable behavior: Explicitly state what you are protecting and why it matters.",
          "Your constraint: No fixing problems silently when clarity would create alignment.",
          "This is how Stabilizers turn reliability into recognition.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less absorbing issues without acknowledgment. Do more documenting and communicating what stability enables.",
          "Do less defaulting to \"it's fine.\" Do more clarifying what would break without intervention.",
          "Do less hiding behind humility. Do more allowing your impact to be understood.",
          "Growth doesn't come from holding everything together forever. It comes from making stability visible and valued.",
        ],
      },
      {
        title: "The Path Forward",
        body: [
          "If this blueprint resonated, it's because you already know how to be dependable.",
          "What you need now is permission to be seen as essential, not just supportive.",
          "Your next level comes from pairing your stabilizing force with clear ownership. When Stabilizers do this well, they don't disrupt momentum — they become the reason it lasts.",
          "Use this blueprint as a lens. Not to change who you are — but to ensure your steadiness translates into growth.",
        ],
      },
    ],
  },
  visionary: {
    subhead:
      "Visionaries grow through possibility. You see what could exist long before others are ready to believe in it.",
    sections: [
      {
        title: "You Are a Visionary",
        body: [
          "Visionaries grow through possibility.",
          "You see what could exist long before others are ready to believe in it. You imagine futures, directions, and opportunities that don't yet have a clear path — but feel undeniably real to you. Growth, in your world, begins as an idea that pulls you forward.",
          "When this role is working, everything feels alive. When it isn't, it feels scattered, overwhelming, and frustratingly unrealized.",
          "This blueprint exists to help you turn vision into forward motion.",
        ],
      },
      {
        title: "Your Strength Stack",
        body: [
          "Your primary strength is future-oriented thinking. You naturally operate ahead of the present moment. You connect dots that haven't been drawn yet and spot opportunities others can't see because they're too focused on what already exists.",
          "Supporting that is your ability to inspire direction. Your ideas energize people. You help others see beyond constraints and imagine something bigger than their current reality.",
          "Your hidden advantage is narrative gravity. When a Visionary commits to a direction, it creates meaning — not just strategy. People don't just follow the plan; they buy into the story.",
          "Most Visionaries never fully access this advantage because the vision keeps evolving faster than execution.",
        ],
      },
      {
        title: "The Bottleneck Slowing You Down",
        body: [
          "Your bottleneck is idea proliferation without embodiment.",
          "Visionaries generate more ideas than they can ground. You move quickly from one insight to the next, refining the future while the present struggles to keep up. It feels expansive. It feels creative.",
          "But it fractures momentum.",
          "Over time, this creates a familiar tension: Powerful ideas without tangible outcomes, Excitement that fades before it materializes, A sense that your best thinking never quite lands.",
          "You're not unfocused. You're uncontained.",
        ],
      },
      {
        title: "Your 30-Day Growth Focus",
        body: [
          "For the next 30 days, your job is not to create more vision.",
          "Your job is to embody one.",
          "Choose a single idea that represents the future you keep describing. Give it form — through words, structure, or a concrete artifact others can interact with.",
          "Your non-negotiable behavior: Translate vision into something visible once per week.",
          "Your constraint: No new ideas unless they directly serve the chosen expression.",
          "This is how Visionaries make belief transferable.",
        ],
      },
      {
        title: "Do Less / Do More",
        body: [
          "Do less expanding the future endlessly. Do more anchoring it in the present.",
          "Do less refining ideas internally. Do more externalizing them into something others can respond to.",
          "Do less waiting for clarity to arrive. Do more letting clarity emerge through expression.",
          "Growth doesn't come from having the best vision. It comes from making the vision real enough to follow.",
        ],
      },
      {
        title: "The Path Forward",
        body: [
          "If this blueprint resonated, it's because you already live in the future.",
          "What you need now is a bridge back to the present.",
          "Your next level comes from committing to a vision long enough for it to take shape. When Visionaries do this well, they don't lose creativity — they give it weight.",
          "Use this blueprint as an anchor. Not to shrink your imagination — but to give it a place to land.",
        ],
      },
    ],
  },
};

export function getBlueprintByRole(roleSlug: string) {
  return blueprints[roleSlug.toLowerCase()];
}

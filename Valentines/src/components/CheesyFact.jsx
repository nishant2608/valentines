import '../styles/CheesyFact.css'

export default function CheesyFact({ isVisible, fact, onDismiss }) {
  const facts = {
    'photo-select': [
      "Studies show that couples who laugh together stay together... and I laugh at ALL your jokes! 😄❤️",
      "Did you know? Making eye contact for 3 minutes increases feelings of passionate love. Let's test it! 👀💕",
      "Scientists say holding hands releases oxytocin, the 'love hormone'... I want to hold your hand forever! 🤝💕"
    ],
    'jigsaw': [
      "Just like this puzzle, you and I fit together perfectly! 🧩💕",
      "Fun fact: Breaking up a puzzle together is 47% more romantic than any dinner date. (Totally made that up, but it's true!) 💕",
      "Every piece of this puzzle represents a moment I love you more. ✨❤️"
    ],
    'riddle': [
      "Did you know? The color of love isn't just red... it's your favorite color when you're smiling! 🌈💕",
      "Fun fact: Love makes your brain release dopamine, creating a natural high. YOU are my drug! 💊❤️",
      "Science says couples who play games together have better relationships. We're nailing this! 🎮💕"
    ],
    'envelope': [
      "Envelopes have held love letters for centuries... and now it's holding MY love for you! 💌❤️",
      "Did you know? Taking time to express your feelings makes your love grow stronger. This is working! 💕✨",
      "Every sealed envelope is a promise... I promise to love you endlessly! 🔒💕"
    ],
    'couples-quiz': [
      "Couples who know each other deeply are 70% more likely to... wait, that's not true, but I KNOW I love you! 💯❤️",
      "Fun fact: Every question you answered correctly is proof that we're soulmates! 👼💕",
      "Did you know? The more questions you answer about someone, the more you fall in love with them. It's science! 🔬💕"
    ],
    'valentine-question': [
      "The fact that you got THIS far means you must really like me... RIGHT?!? 👉👈❤️",
      "Statistically speaking, you're about to make the best decision of your life! 🎯💕",
      "Fun fact: I've been in love with you since before this started. This was just me being cheesy! 🧀❤️"
    ]
  }

  const getRandomFact = (stage) => {
    const stageFacts = facts[stage] || facts['valentine-question']
    return stageFacts[Math.floor(Math.random() * stageFacts.length)]
  }

  if (!isVisible) return null

  return (
    <div className="cheesy-fact-overlay" onClick={onDismiss}>
      <div className="cheesy-fact-container" onClick={(e) => e.stopPropagation()}>
        <p className="cheesy-fact-text">✨ {fact} ✨</p>
        <button onClick={onDismiss} className="cheesy-fact-btn">
          Continue 💕
        </button>
      </div>
    </div>
  )
}

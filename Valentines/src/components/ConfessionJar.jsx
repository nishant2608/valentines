import { useState, useEffect } from 'react'
import '../styles/ConfessionJar.css'

export default function ConfessionJar({ isVisible, onClose }) {
  const confessions = [
    "When I think of you, I can't help but smile 😊",
    "You make my heart skip a beat... okay, maybe like 10 beats 💓",
    "I love you more than pizza... and that's saying something 🍕💕",
    "You're my favorite notification 📱💘",
    "My love for you is like Wi-Fi - it's everywhere 📶💕",
    "You complete me like a text without a typo 📝❤️",
    "I'm not superstitious, but I did just make a wish on you 🌟💫",
    "You're the reason I check my phone seventeen times a day 📱😍",
    "My favorite place is inside your heart 💕🏡",
    "You're like a really good song on repeat... I never get tired 🎵💕",
    "If I had to describe you in one word: mine 💕🔐",
    "You make me want to be a better person... and also make bad puns 🥰",
    "Every love story is beautiful, but ours is my favorite 📖💕",
    "I love you for every laugh you make me laugh at 😄❤️",
    "You're my favorite reason to wake up 🌅💕",
  ]

  const [currentConfession, setCurrentConfession] = useState(confessions[0])
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const randomConfession = confessions[Math.floor(Math.random() * confessions.length)]
      setCurrentConfession(randomConfession)
      setAnimate(true)
    }
  }, [isVisible])

  const handleNewConfession = () => {
    setAnimate(false)
    setTimeout(() => {
      const randomConfession = confessions[Math.floor(Math.random() * confessions.length)]
      setCurrentConfession(randomConfession)
      setAnimate(true)
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div className="confession-jar-overlay" onClick={onClose}>
      <div className="confession-jar-modal" onClick={(e) => e.stopPropagation()}>
        <button className="confession-close-btn" onClick={onClose}>✕</button>
        
        <div className="confession-jar">
          <div className="jar-lid"></div>
          <div className="jar-body">
            <div className={`confession-message ${animate ? 'visible' : ''}`}>
              <p>{currentConfession}</p>
            </div>
          </div>
        </div>

        <button className="confession-next-btn" onClick={handleNewConfession}>
          Pick Another 💌
        </button>
      </div>
    </div>
  )
}

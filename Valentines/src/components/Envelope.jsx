import { useState } from 'react'
import '../styles/Envelope.css'

export default function Envelope({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
    setTimeout(onOpen, 800)
  }

  return (
    <div className="envelope-container">
      <h1>You've passed all the captchas! 🎉</h1>
      <p className="envelope-instruction">Click the envelope to reveal your surprise...</p>
      
      <div className={`envelope ${isOpen ? 'open' : ''}`} onClick={handleClick}>
        <div className="envelope-front">
          <div className="envelope-flap"></div>
          <div className="envelope-body"></div>
          <p className="envelope-text">Open Me ❤️</p>
        </div>
        
        <div className="envelope-letter">
          <div className="letter-content">
            <p className="letter-text">✨ Something special inside... ✨</p>
          </div>
        </div>
      </div>

      <div className="hearts-animation">
        <span>❤️</span>
        <span>💕</span>
        <span>💖</span>
        <span>💗</span>
        <span>💝</span>
      </div>
    </div>
  )
}
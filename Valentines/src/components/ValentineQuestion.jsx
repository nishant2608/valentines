import { useState } from 'react'
import '../styles/ValentineQuestion.css'

export default function ValentineQuestion({ onYes }) {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [yesScale, setYesScale] = useState(1)
  const [noClickCount, setNoClickCount] = useState(0)
  const [noButtonMoved, setNoButtonMoved] = useState(false)

  const handleNoClick = () => {
    // Move the no button
    const randomX = Math.random() * 300 - 150
    const randomY = Math.random() * 300 - 150
    setNoButtonPos({ x: randomX, y: randomY })
    setNoButtonMoved(true)
    
    // Make Yes button bigger continuously
    setNoClickCount(prev => prev + 1)
    setYesScale(prev => prev + 0.3)
  }

  const handleYesClick = () => {
    onYes()
  }

  return (
    <div className="valentine-container">
      <div className="valentine-content">
        <h1 className="main-question">Will you be my Valentine? 💝</h1>
        
        <div className="hearts-top">
          <span>❤️</span>
          <span>💕</span>
          <span>💖</span>
          <span>💗</span>
          <span>💝</span>
        </div>

        <div className="buttons-container">
          <button
            onClick={handleYesClick}
            className="button yes-button"
            style={{
              transform: `scale(${yesScale})`
            }}
          >
            Yes! 💕
          </button>

          <button
            onClick={handleNoClick}
            className={`button no-button ${noButtonMoved ? 'moved' : ''}`}
            style={noButtonMoved ? {
              position: 'absolute',
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
              transition: 'transform 0.3s ease-out',
              zIndex: 100
            } : {}}
          >
            No
          </button>
        </div>

        <div className="hearts-bottom">
          <span>💝</span>
          <span>💗</span>
          <span>💖</span>
          <span>💕</span>
          <span>❤️</span>
        </div>
      </div>

      <div className="floating-hearts">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`heart-float heart-${i}`}>
            {['❤️', '💕', '💖', '💗', '💝'][i % 5]}
          </div>
        ))}
      </div>
    </div>
  )
}
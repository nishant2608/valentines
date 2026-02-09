import { useState } from 'react'
import '../styles/RiddleCaptcha.css'

export default function RiddleCaptcha({ onComplete }) {
  const [answer, setAnswer] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState('')

  // Cheesy riddle/question - accepts multiple variations as correct
  const correctAnswers = ['orange','awrange','Orange','Awrange']
  const riddle = "What colour are my genes? 💕"
  const hint = "Hint: It's what I feel for you..."

  const handleSubmit = () => {
    const userAnswer = answer.toLowerCase().trim()
    
    if (correctAnswers.includes(userAnswer)) {
      setMessage('✨ That\'s so sweet! You got it! 💕')
      setTimeout(onComplete, 1500)
    } else {
      setAttempts(attempts + 1)
      setMessage('❌ Not quite... Think about us! 💭')
      setAnswer('')
      
      if (attempts >= 2) {
        setMessage('💡 Hint: Think of how you feel about me! Try: love, you, forever, always...')
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="captcha-container">
      <h1>Captcha 3: Answer the riddle</h1>
      
      <div className="riddle-card">
        <p className="riddle-question">❓ {riddle}</p>
        <p className="riddle-hint">{hint}</p>
        
        <div className="riddle-input-group">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here..."
            className="riddle-input"
            autoFocus
          />
          <button onClick={handleSubmit} className="submit-btn">
            Check Answer
          </button>
        </div>

        {attempts > 0 && (
          <p className="attempts">Attempts: {attempts}</p>
        )}

        {message && (
          <p className={`message ${message.includes('✨') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>

      <div className="riddle-background">
        <div className="heart">❤️</div>
        <div className="heart">💕</div>
        <div className="heart">💖</div>
      </div>
    </div>
  )
}
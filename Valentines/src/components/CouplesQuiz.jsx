import { useState } from 'react'
import '../styles/CouplesQuiz.css'

export default function CouplesQuiz({ onComplete }) {
  const quizQuestions = [
    {
      question: "What's my favorite thing to do with you?",
      options: ["Kiss your forehead", "Make you have goosebumps", "Look into your eyes", "All of the above! 💕"],
      correctAnswer: 3
    },
    {
      question: "What's the best thing about our love story?",
      options: ["We just some kittens", "Its da density", "Meow Language", "Everything!"],
      correctAnswer: 3
    },
    {
      question: "If I could describe you in one emoji, which would it be?",
      options: ["❤️", "💕", "💖", "All of them combined! 💕❤️💖"],
      correctAnswer: 3
    },
    {
      question: "Why do I love you?",
      options: ["You just a baby", "You just a smol one", "You just a kitten", "How can I not, you're pawfect 💕"],
      correctAnswer: 3
    },
    {
      question: "How much do I love you?",
      options: ["none of them", "some of them", "not all of them", "all of them 💕✨"],
      correctAnswer: 3
    }
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleAnswerClick = (index) => {
    if (answered) return

    setSelectedAnswer(index)
    
    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    
    setAnswered(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      onComplete()
    }
  }

  const question = quizQuestions[currentQuestion]
  const isAnswerCorrect = selectedAnswer === question.correctAnswer

  return (
    <div className="quiz-container">
      <h1>💕 Our Love Quiz 💕</h1>
      
      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">Question {currentQuestion + 1} of {quizQuestions.length}</p>
      </div>

      <div className="quiz-card">
        <h2 className="quiz-question">{question.question}</h2>

        <div className="quiz-options">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`quiz-option ${
                selectedAnswer === index ? (isAnswerCorrect ? 'correct' : 'incorrect') : ''
              } ${answered ? 'disabled' : ''}`}
              disabled={answered}
            >
              <span className="option-text">{option}</span>
              {selectedAnswer === index && (
                <span className="option-result">
                  {isAnswerCorrect ? '✨' : '💔'}
                </span>
              )}
            </button>
          ))}
        </div>

        {answered && (
          <div className={`quiz-feedback ${isAnswerCorrect ? 'correct-feedback' : ''}`}>
            {isAnswerCorrect ? (
              <>
                <p className="feedback-text">💕 You know me so well! 💕</p>
                <p className="feedback-subtext">This is the way I feel about you too!</p>
              </>
            ) : (
              <>
                <p className="feedback-text">So close! 💕</p>
                <p className="feedback-subtext">The answer is: {question.options[question.correctAnswer]}</p>
              </>
            )}
          </div>
        )}

        {answered && (
          <button onClick={handleNextQuestion} className="next-btn">
            {currentQuestion < quizQuestions.length - 1 ? 'Next Question ➜' : 'Finish! 💝'}
          </button>
        )}
      </div>

      <div className="quiz-hearts">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`quiz-heart heart-${i}`}>
            {['❤️', '💕', '💖', '💗', '💝'][i]}
          </span>
        ))}
      </div>
    </div>
  )
}

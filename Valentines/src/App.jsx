import { useState } from 'react'
import './App.css'
import PhotoSelectCaptcha from './components/PhotoSelectCaptcha'
import JigsawPuzzle from './components/JigsawPuzzle'
import RiddleCaptcha from './components/RiddleCaptcha'
import Envelope from './components/Envelope'
import ValentineQuestion from './components/ValentineQuestion'
import BoardingTicket from './components/BoardingTicket'
import LoveMeter from './components/LoveMeter'
import CouplesQuiz from './components/CouplesQuiz'
import CheesyFact from './components/CheesyFact'

function App() {
  const [currentStep, setCurrentStep] = useState('photo-select')
  const [showBoardingTicket, setShowBoardingTicket] = useState(false)
  const [showCheesyFact, setShowCheesyFact] = useState(false)
  const [currentFact, setCurrentFact] = useState('')
  const [nextStep, setNextStep] = useState('')

  const cheesyFacts = {
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
    ]
  }

  const getRandomFact = (stage) => {
    const facts = cheesyFacts[stage] || []
    return facts[Math.floor(Math.random() * facts.length)] || ''
  }

  const showFactThenProceed = (nextStage) => {
    const fact = getRandomFact(currentStep)
    setCurrentFact(fact)
    setNextStep(nextStage)
    setShowCheesyFact(true)
  }

  const handleFactDismiss = () => {
    setShowCheesyFact(false)
    setCurrentStep(nextStep)
  }

  const handlePhotoSelectComplete = () => {
    showFactThenProceed('jigsaw')
  }

  const handleJigsawComplete = () => {
    showFactThenProceed('riddle')
  }

  const handleRiddleComplete = () => {
    showFactThenProceed('envelope')
  }

  const handleEnvelopeOpen = () => {
    showFactThenProceed('couples-quiz')
  }

  const handleQuizComplete = () => {
    showFactThenProceed('valentine-question')
  }

  const handleValentineYes = () => {
    setShowBoardingTicket(true)
  }

  const getProgressStep = () => {
    const steps = ['photo-select', 'jigsaw', 'riddle', 'envelope', 'couples-quiz', 'valentine-question']
    return steps.indexOf(currentStep)
  }

  return (
    <div className="app-container">
      {!showBoardingTicket && <LoveMeter progress={getProgressStep()} />}
      
      <CheesyFact 
        isVisible={showCheesyFact} 
        fact={currentFact}
        onDismiss={handleFactDismiss} 
      />

      {showBoardingTicket && <BoardingTicket />}
      
      {!showBoardingTicket && (
        <>
          {currentStep === 'photo-select' && (
            <PhotoSelectCaptcha onComplete={handlePhotoSelectComplete} />
          )}
          
          {currentStep === 'jigsaw' && (
            <JigsawPuzzle onComplete={handleJigsawComplete} />
          )}
          
          {currentStep === 'riddle' && (
            <RiddleCaptcha onComplete={handleRiddleComplete} />
          )}
          
          {currentStep === 'envelope' && (
            <Envelope onOpen={handleEnvelopeOpen} />
          )}

          {currentStep === 'couples-quiz' && (
            <CouplesQuiz onComplete={handleQuizComplete} />
          )}
          
          {currentStep === 'valentine-question' && (
            <ValentineQuestion onYes={handleValentineYes} />
          )}
        </>
      )}
    </div>
  )
}

export default App

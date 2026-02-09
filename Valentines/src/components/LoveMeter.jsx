import '../styles/LoveMeter.css'

export default function LoveMeter({ progress }) {
  // progress is 0-5 based on current step
  const percentage = (progress / 5) * 100

  return (
    <div className="love-meter-container">
      <h3>Love Progress: {percentage.toFixed(0)}%</h3>
      <div className="love-meter-bar">
        <div className="love-meter-fill" style={{ width: `${percentage}%` }}>
          <span className="love-meter-hearts">
            {progress >= 1 && '❤️'}
            {progress >= 2 && '💕'}
            {progress >= 3 && '💖'}
            {progress >= 4 && '💗'}
            {progress >= 5 && '💝'}
          </span>
        </div>
      </div>
      <p className="love-meter-text">
        {progress === 0 && "Let's start this romantic journey! 💕"}
        {progress === 1 && "You're on your way! Keep going! 💖"}
        {progress === 2 && "You're halfway there! 💗"}
        {progress === 3 && "Almost there, my love! 💝"}
        {progress === 4 && "So close! One more step! ❤️"}
        {progress === 5 && "You did it! You won my heart! 💕✨"}
      </p>
    </div>
  )
}

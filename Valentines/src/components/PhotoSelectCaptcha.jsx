import { useState, useEffect } from 'react'
import '../styles/PhotoSelectCaptcha.css'
import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'
import pic3 from '../assets/pic3.jpg'
import pic4 from '../assets/pic4.jpg'
import pic5 from '../assets/pic5.jpg'
import pic6 from '../assets/pic6.jpg'
import pic7 from '../assets/pic7.jpg'
import pic8 from '../assets/pic8.jpg'
import pic9 from '../assets/pic9.jpg'

export default function PhotoSelectCaptcha({ onComplete }) {
  const correctImages = [pic1, pic2, pic3, pic4]
  const incorrectImages = [pic5, pic6, pic7, pic8, pic9]
  
  const [correctIndices, setCorrectIndices] = useState([])
  const [gridImages, setGridImages] = useState([])
  const [selected, setSelected] = useState(new Set())
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Randomly select 4 positions out of 9 for correct images
    const positions = new Set()
    while (positions.size < 4) {
      positions.add(Math.floor(Math.random() * 9))
    }
    const correctPos = Array.from(positions)
    setCorrectIndices(correctPos)

    // Assign images to all 9 positions
    const images = new Array(9)
    let correctIdx = 0
    let incorrectIdx = 0

    for (let i = 0; i < 9; i++) {
      if (correctPos.includes(i)) {
        images[i] = correctImages[correctIdx++]
      } else {
        images[i] = incorrectImages[incorrectIdx++]
      }
    }
    setGridImages(images)
  }, [])

  const handleImageClick = (index) => {
    const newSelected = new Set(selected)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelected(newSelected)
    setMessage('')
  }

  const handleSubmit = () => {
    if (selected.size !== 4) {
      setMessage('Please select exactly 4 pictures!')
      return
    }

    // Check if all selected are correct
    const allCorrect = Array.from(selected).every(idx => correctIndices.includes(idx))
    const allCorrectSelected = correctIndices.every(idx => selected.has(idx))

    if (allCorrect && allCorrectSelected) {
      setMessage('✨ Perfect! You know who the most beautiful girl is!')
      setTimeout(onComplete, 1500)
    } else {
      setMessage('❌ Not quite right. Try again!')
      setSelected(new Set())
    }
  }

  return (
    <div className="captcha-container">
      <h1>Select all the beautiful girls</h1>
      <p className="instructions">Please select exactly 4 images</p>
      
      <div className="photo-grid">
        {gridImages.map((image, index) => (
          <div
            key={index}
            className={`photo-item ${selected.has(index) ? 'selected' : ''}`}
            onClick={() => handleImageClick(index)}
          >
            <div className="photo-placeholder">
              <img
                src={image}
                alt={`Photo ${index + 1}`}
              />
            </div>
            {selected.has(index) && <div className="checkmark">✓</div>}
          </div>
        ))}
      </div>

      <div className="captcha-controls">
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
        {selected.size > 0 && (
          <p className="counter">Selected: {selected.size}/4</p>
        )}
      </div>

      {message && <p className={`message ${message.includes('✨') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  )
}
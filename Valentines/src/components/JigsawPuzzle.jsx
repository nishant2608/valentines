import { useState, useEffect, useRef } from 'react'
import '../styles/JigsawPuzzle.css'
import jigsawImage from '../assets/jigsaw.jpg'

export default function JigsawPuzzle({ onComplete }) {
  const GRID_SIZE = 3
  const TOTAL_PIECES = GRID_SIZE * GRID_SIZE
  const BASE_PIECE_SIZE = 100

  const [pieces, setPieces] = useState([])
  const [placed, setPlaced] = useState(new Array(TOTAL_PIECES).fill(null))
  const [draggedPiece, setDraggedPiece] = useState(null)
  const [message, setMessage] = useState('')
  const [touchPiece, setTouchPiece] = useState(null)
  const touchRef = useRef(null)

  const PIECE_SIZE = BASE_PIECE_SIZE
  const TOTAL_SIZE = GRID_SIZE * BASE_PIECE_SIZE

  useEffect(() => {
    // Initialize shuffled pieces
    const initialPieces = Array.from({ length: TOTAL_PIECES }, (_, i) => i)
    const shuffled = [...initialPieces].sort(() => Math.random() - 0.5)
    setPieces(shuffled)
  }, [])

  const getBackgroundPosition = (index) => {
    const row = Math.floor(index / GRID_SIZE)
    const col = index % GRID_SIZE
    return {
      backgroundPosition: `${-col * BASE_PIECE_SIZE}px ${-row * BASE_PIECE_SIZE}px`,
      backgroundSize: `${TOTAL_SIZE}px ${TOTAL_SIZE}px`
    }
  }

  const handleDragStart = (piece) => {
    setDraggedPiece(piece)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDropOnSlot = (slotIndex) => {
    if (draggedPiece === null) return

    // Allow placing any piece in any slot
    const newPlaced = [...placed]
    const oldPiece = newPlaced[slotIndex]
    
    // If there's already a piece here, move it back to available
    if (oldPiece !== null) {
      setPieces([...pieces, oldPiece])
    }

    // Place the dragged piece
    newPlaced[slotIndex] = draggedPiece
    setPlaced(newPlaced)
    setPieces(pieces.filter(p => p !== draggedPiece))
    setDraggedPiece(null)
    setMessage('')
  }

  const handleDropOnAvailable = () => {
    setDraggedPiece(null)
  }

  // Mobile click-based placement (tap a piece, then tap a slot)
  const handlePieceClick = (piece) => {
    // Toggle piece selection
    if (touchPiece === piece) {
      setTouchPiece(null)
    } else {
      setTouchPiece(piece)
    }
  }

  const handleSlotClick = (slotIndex) => {
    // If no piece is selected, try to pick up a placed piece
    if (touchPiece === null) {
      if (placed[slotIndex] !== null) {
        // Pick up the piece in this slot
        setTouchPiece(placed[slotIndex])
        const newPlaced = [...placed]
        newPlaced[slotIndex] = null
        setPlaced(newPlaced)
        setPieces([...pieces, placed[slotIndex]])
        setMessage('')
      }
      return
    }

    // Place the selected piece in this slot
    const newPlaced = [...placed]
    const oldPiece = newPlaced[slotIndex]
    
    // If there's already a piece here, move it back to available
    if (oldPiece !== null) {
      setPieces([...pieces, oldPiece])
    }

    // Place the selected piece
    newPlaced[slotIndex] = touchPiece
    setPlaced(newPlaced)
    setPieces(pieces.filter(p => p !== touchPiece))
    setTouchPiece(null)
    setMessage('')
  }

  const handleReset = () => {
    // Return all placed pieces back to available
    const allPieces = new Array(TOTAL_PIECES).fill(null)
    for (let i = 0; i < TOTAL_PIECES; i++) {
      if (placed[i] !== null) {
        allPieces[placed[i]] = placed[i]
      }
    }
    setPieces(Array.from({ length: TOTAL_PIECES }, (_, i) => i).sort(() => Math.random() - 0.5))
    setPlaced(new Array(TOTAL_PIECES).fill(null))
    setMessage('')
    setTouchPiece(null)
  }

  const isComplete = placed.every(p => p !== null)

  const handleContinue = () => {
    if (!isComplete) {
      setMessage('❌ Please place all pieces!')
      return
    }

    // Check if all pieces are in their correct positions
    const allCorrect = placed.every((piece, index) => piece === index)

    if (allCorrect) {
      setMessage('✨ Perfect! The puzzle is complete!')
      setTimeout(onComplete, 1500)
    } else {
      setMessage('❌ Some pieces are in wrong positions. Try again!')
    }
  }

  return (
    <div className="captcha-container">
      <h1>Captcha 2: Complete the jigsaw puzzle</h1>
      <p className="instructions">Drag pieces (desktop) or tap a piece then a slot (mobile)</p>

      <div className="puzzle-wrapper">
        <div className="puzzle-grid">
          {[...Array(TOTAL_PIECES)].map((_, index) => (
            <div
              key={index}
              className={`puzzle-slot ${touchPiece !== null ? 'has-selected' : ''}`}
              onDragOver={handleDragOver}
              onDrop={() => handleDropOnSlot(index)}
              onClick={() => handleSlotClick(index)}
            >
              {placed[index] !== null ? (
                <div 
                  className="puzzle-piece-placed"
                  style={{
                    backgroundImage: `url(${jigsawImage})`,
                    ...getBackgroundPosition(placed[index])
                  }}
                ></div>
              ) : (
                <div className="puzzle-slot-empty"></div>
              )}
            </div>
          ))}
        </div>

        <div className="available-pieces">
          <h3>Available Pieces</h3>
          <div
            className="pieces-container"
            onDragOver={handleDragOver}
            onDrop={handleDropOnAvailable}
          >
            {pieces.map(piece => (
              <div
                key={piece}
                className={`puzzle-piece ${touchPiece === piece ? 'selected' : ''}`}
                draggable
                onDragStart={() => handleDragStart(piece)}
                onClick={() => handlePieceClick(piece)}
                style={{
                  backgroundImage: `url(${jigsawImage})`,
                  ...getBackgroundPosition(piece)
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="captcha-controls">
        <button
          onClick={handleContinue}
          className="submit-btn"
        >
          {isComplete ? 'Submit' : `Place all pieces (${placed.filter(p => p !== null).length}/${TOTAL_PIECES})`}
        </button>
        <button
          onClick={handleReset}
          className="reset-btn"
        >
          Reset
        </button>
      </div>

      {message && <p className={`message ${message.includes('✨') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  )
}
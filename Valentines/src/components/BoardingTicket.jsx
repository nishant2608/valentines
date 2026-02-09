import { useState } from 'react'
import '../styles/BoardingTicket.css'

export default function BoardingTicket() {
  const [isRevealed, setIsRevealed] = useState(false)

  const ticketData = {
    passenger: 'Manimauu',
    from: '💔 Single Life',
    to: '💕 My Heart',
    date: 'TBA (To Be Always)',
    gate: '💑',
    seat: '👫',
    boardingTime: '24/7',
    flightNumber: 'LOVE2026'
  }

  return (
    <div className="boarding-ticket-container">
      <div className="celebration">
        <div className="confetti"></div>
        <h1>✨ YES! ✨</h1>
        <p className="celebration-text">You made me the happiest person! 💕</p>
      </div>

      <div className={`boarding-ticket ${isRevealed ? 'revealed' : ''}`} onClick={() => setIsRevealed(!isRevealed)}>
        <div className="ticket-header">
          <h2>BOARDING PASS</h2>
          <p className="click-hint">Click to {isRevealed ? 'hide' : 'reveal'}</p>
        </div>

        {!isRevealed ? (
          <div className="ticket-hidden">
            <p className="hidden-text">✨ Tap to reveal your boarding pass ✨</p>
          </div>
        ) : (
          <div className="ticket-content">
            <div className="ticket-row">
              <div className="ticket-field">
                <span className="label">Passenger</span>
                <span className="value">{ticketData.passenger}</span>
              </div>
              <div className="ticket-field">
                <span className="label">Flight</span>
                <span className="value">{ticketData.flightNumber}</span>
              </div>
            </div>

            <div className="ticket-row">
              <div className="ticket-field">
                <span className="label">From</span>
                <span className="value">{ticketData.from}</span>
              </div>
              <div className="ticket-field">
                <span className="label">To</span>
                <span className="value">{ticketData.to}</span>
              </div>
            </div>

            <div className="ticket-row">
              <div className="ticket-field">
                <span className="label">Date</span>
                <span className="value">{ticketData.date}</span>
              </div>
              <div className="ticket-field">
                <span className="label">Boarding Time</span>
                <span className="value">{ticketData.boardingTime}</span>
              </div>
            </div>

            <div className="ticket-row">
              <div className="ticket-field">
                <span className="label">Gate</span>
                <span className="value">{ticketData.gate}</span>
              </div>
              <div className="ticket-field">
                <span className="label">Seat</span>
                <span className="value">{ticketData.seat}</span>
              </div>
            </div>

            <div className="ticket-footer">
              <p className="footer-message">
                "Our love is the best journey we could take together" 💕
              </p>
              <div className="barcode">
                ████ ██ ███ █ ██ ███ █ ███ ██ █ ██ ███ █████
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="message-box">
        <p className="final-message">
          I love you so much! Can't wait for our Valentine's date! 💕✨
        </p>
      </div>

      <div className="floating-hearts-final">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`heart-fly heart-${i}`}>
            {['❤️', '💕', '💖', '💗', '💝'][i % 5]}
          </div>
        ))}
      </div>
    </div>
  )
}
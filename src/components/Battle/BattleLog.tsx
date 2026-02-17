import './BattleLog.css'

interface BattleLogProps {
  messages: string[]
}

const BattleLog = ({ messages }: BattleLogProps) => {
  return (
    <div className="battle-log">
      <div className="battle-log-content">
        {messages.slice(-4).map((message, index) => (
          <div key={index} className="log-message">
            {message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BattleLog

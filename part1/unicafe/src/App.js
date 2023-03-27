import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <>{text} {value} <br/> </>
  )
}

const Statistics = ({ stats }) => {

  let all = Object.values(stats).reduce((a, b) => a + b, 0)
  if (!all) {
    return (
      <div>
        <h2>Statistics</h2>
        No feedback given
      </div>
    )
  }

  let average = (Number(stats.good) * 1 + Number(stats.neutral) * 0 + Number(stats.bad) * -1) / all
  let positive = ((stats.good / all) * 100) + '%'
  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text='good' value={stats.good} />
      <StatisticLine text='neutral' value={stats.neutral} />
      <StatisticLine text='bad' value={stats.bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleGood = () => {
    setGood(good + 1)
    setStats({
      ...stats, good: stats.good + 1
    })
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setStats({
      ...stats, neutral: stats.neutral + 1
    })
  }

  const handleBad = () => {
    setBad(bad + 1)
    setStats({
      ...stats, bad: stats.bad + 1
    })
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics stats={stats} />
    </div>
  )
}

export default App
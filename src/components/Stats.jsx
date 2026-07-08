import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d)
  }
  return days
}

function Stats({ habits }) {
  const last7Days = getLast7Days()

  const chartData = last7Days.map((date) => {
    const dateString = date.toDateString()
    const label = date.toLocaleDateString('en-US', { weekday: 'short' })

    const completedCount = habits.filter((habit) =>
      habit.history.includes(dateString)
    ).length

    return { day: label, completed: completedCount }
  })

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 font-pixel-body" style={{ color: 'var(--color-text)' }}>
        Weekly Stats
      </h2>

      <div style={{ width: '100%', maxWidth: 500, height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="day" stroke="var(--color-text-muted)" />
            <YAxis allowDecimals={false} stroke="var(--color-text-muted)" />
            <Tooltip />
            <Bar dataKey="completed" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Stats
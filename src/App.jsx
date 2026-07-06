import { useState } from 'react'
import Sidebar from './components/Sidebar'
import HabitCard from './components/HabitCard'

function App() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink water', emoji: '💧', done: false },
    { id: 2, name: 'Read 10 pages', emoji: '📖', done: false },
    { id: 3, name: 'Stretch', emoji: '🧘', done: false },
  ])

  const [newHabitName, setNewHabitName] = useState('')

  function addHabit() {
    if (newHabitName.trim() === '') return

    const newHabit = {
      id: Date.now(),
      name: newHabitName,
      emoji: '⭐',
      done: false,
    }

    setHabits([...habits, newHabit])
    setNewHabitName('')
  }

  function toggleHabit(id) {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit
      )
    )
  }

  function deleteHabit(id) {
    setHabits(habits.filter((habit) => habit.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 p-8 text-slate-200">
        <h2 className="text-2xl font-bold mb-4 font-pixel-body">Today's Habits</h2>

        <div className="flex flex-col gap-3 max-w-sm mb-4">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              name={habit.name}
              emoji={habit.emoji}
              done={habit.done}
              onToggle={() => toggleHabit(habit.id)}
              onDelete={() => deleteHabit(habit.id)}
            />
          ))}
        </div>

        <div className="flex gap-2 max-w-sm">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="New habit..."
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800 text-slate-200 font-pixel-body outline-none"
          />
          <button
            onClick={addHabit}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 font-pixel-body"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
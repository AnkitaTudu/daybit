import { useState } from 'react'
import Sidebar from './components/Sidebar'
import HabitCard from './components/HabitCard'
import NoteCard from './components/NoteCard'

function App() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink water', emoji: '💧', done: false, streak: 0, lastCompletedDate: null },
    { id: 2, name: 'Read 10 pages', emoji: '📖', done: false, streak: 0, lastCompletedDate: null },
    { id: 3, name: 'Stretch', emoji: '🧘', done: false, streak: 0, lastCompletedDate: null },
  ])

  const [newHabitName, setNewHabitName] = useState('')
  const [notes, setNotes] = useState([])
  const [newNoteText, setNewNoteText] = useState('')

  function addHabit() {
    if (newHabitName.trim() === '') return

    const newHabit = {
      id: Date.now(),
      name: newHabitName,
      emoji: '⭐',
      done: false,
      streak: 0,
      lastCompletedDate: null,
    }

    setHabits([...habits, newHabit])
    setNewHabitName('')
  }

  function toggleHabit(id) {
    const today = new Date().toDateString()

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayString = yesterday.toDateString()

    setHabits(
      habits.map((habit) => {
        if (habit.id !== id) return habit

        if (habit.done) {
          return { ...habit, done: false, streak: Math.max(0, habit.streak - 1) }
        } else {
          const continuingStreak = habit.lastCompletedDate === yesterdayString
          return {
            ...habit,
            done: true,
            streak: continuingStreak ? habit.streak + 1 : 1,
            lastCompletedDate: today,
          }
        }
      })
    )
  }

  function deleteHabit(id) {
    setHabits(habits.filter((habit) => habit.id !== id))
  }

  function addNote() {
    if (newNoteText.trim() === '') return
    const newNote = { id: Date.now(), text: newNoteText }
    setNotes([newNote, ...notes])
    setNewNoteText('')
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id))
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
              streak={habit.streak}
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

        <h2 className="text-2xl font-bold mb-4 mt-10 font-pixel-body">Notes</h2>

        <div className="flex gap-2 max-w-sm mb-4">
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Write a note..."
            rows={2}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800 text-slate-200 font-pixel-body outline-none resize-none"
          />
          <button
            onClick={addNote}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 font-pixel-body h-fit"
          >
            Add
          </button>
        </div>

        <div className="flex flex-col gap-3 max-w-sm">
          {notes.map((note) => (
            <NoteCard key={note.id} text={note.text} onDelete={() => deleteNote(note.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
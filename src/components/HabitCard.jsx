function HabitCard({ name, emoji, done, onToggle, onDelete }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-colors ${
        done ? 'bg-emerald-500/30 text-emerald-200' : 'bg-slate-800 text-slate-300'
      }`}
    >
      <button onClick={onToggle} className="flex items-center gap-3 flex-1 text-left">
        <span className="text-xl">{emoji}</span>
        <span className="flex-1 font-pixel-body">{name}</span>
        <span className="text-lg">{done ? '✅' : '⬜'}</span>
      </button>
      <button onClick={onDelete} className="text-slate-500 hover:text-red-400 px-2">
        ✕
      </button>
    </div>
  )
}

export default HabitCard
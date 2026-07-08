function HabitCard({ name, emoji, done, streak, onToggle, onDelete }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-colors"
      style={{
        backgroundColor: done ? 'var(--color-accent-soft)' : 'var(--color-surface)',
        color: done ? 'var(--color-accent)' : 'var(--color-text)',
      }}
    >
      <button onClick={onToggle} className="flex items-center gap-3 flex-1 text-left">
        <span className="text-xl">{emoji}</span>
        <span className="flex-1 font-pixel-body">{name}</span>
        {streak > 0 && (
          <span className="text-xs font-pixel-body mr-2" style={{ color: 'var(--color-accent)' }}>
            🔥 {streak}
          </span>
        )}
        <span className="text-lg">{done ? '✅' : '⬜'}</span>
      </button>
      <button
        onClick={onDelete}
        className="px-2"
        style={{ color: 'var(--color-text-muted)' }}
      >
        ✕
      </button>
    </div>
  )
}

export default HabitCard
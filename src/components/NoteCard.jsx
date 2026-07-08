function NoteCard({ text, onDelete }) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2 relative"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <p className="font-pixel-body whitespace-pre-wrap" style={{ color: 'var(--color-text)' }}>
        {text}
      </p>
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-sm"
        style={{ color: 'var(--color-text-muted)' }}
      >
        ✕
      </button>
    </div>
  )
}

export default NoteCard
function NoteCard({ text, onDelete }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 flex flex-col gap-2 relative">
      <p className="font-pixel-body text-slate-200 whitespace-pre-wrap">{text}</p>
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-sm"
      >
        ✕
      </button>
    </div>
  )
}

export default NoteCard
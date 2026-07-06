function Sidebar() {
  return (
    <div className="w-56 bg-slate-800 min-h-screen flex flex-col p-4 gap-2">
      <h1 className="text-emerald-400 font-pixel text-sm mb-4">daybit</h1>

      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-left font-pixel-body">
        🏠 Home
      </button>
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 text-left font-pixel-body">
        ✅ Habits
      </button>
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 text-left font-pixel-body">
        📝 Notes
      </button>
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 text-left font-pixel-body">
        📊 Stats
      </button>
    </div>
  )
}

export default Sidebar
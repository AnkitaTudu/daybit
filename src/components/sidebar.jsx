function Sidebar({ view, onNavigate, theme, onToggleTheme }) {
 const navItems = [
  { key: 'home', label: 'Home', emoji: '🏠' },
  { key: 'habits', label: 'Habits', emoji: '✅' },
  { key: 'notes', label: 'Notes', emoji: '📝' },
  { key: 'calendar', label: 'Calendar', emoji: '📅' },
  { key: 'stats', label: 'Stats', emoji: '📊' },
]

  return (
    <div
      className="w-56 min-h-screen flex flex-col p-4 gap-2"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <h1 className="font-pixel text-sm mb-4" style={{ color: 'var(--color-accent)' }}>
        daybit
      </h1>

      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => onNavigate(item.key)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-left font-pixel-body"
          style={{
            backgroundColor: view === item.key ? 'var(--color-accent-soft)' : 'transparent',
            color: view === item.key ? 'var(--color-accent)' : 'var(--color-text-muted)',
          }}
        >
          {item.emoji} {item.label}
        </button>
      ))}

      <button
        onClick={onToggleTheme}
        className="mt-auto flex items-center gap-2 px-3 py-2 rounded-lg text-left font-pixel-body text-sm"
        style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
      >
        🎨 {theme === 'theme-dark' ? 'Pastel mode' : 'Dark mode'}
      </button>
    </div>
  )
}

export default Sidebar
import { useState } from 'react'

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState([]) // { id, dateString, title }
  const [selectedDateString, setSelectedDateString] = useState(null)
  const [eventTitle, setEventTitle] = useState('')

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth() // 0 = Jan

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = new Date(year, month, 1).getDay() // 0 = Sunday

  const monthLabel = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  function goToPrevMonth() {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  function goToNextMonth() {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  function dateStringFor(day) {
    return new Date(year, month, day).toDateString()
  }

  function handleDayClick(day) {
    setSelectedDateString(dateStringFor(day))
    setEventTitle('')
  }

  function addEvent() {
    if (eventTitle.trim() === '') return
    setEvents([
      ...events,
      { id: Date.now(), dateString: selectedDateString, title: eventTitle },
    ])
    setEventTitle('')
    setSelectedDateString(null)
  }

  function deleteEvent(id) {
    setEvents(events.filter((e) => e.id !== id))
  }

  function hasEvent(day) {
    return events.some((e) => e.dateString === dateStringFor(day))
  }

  const weeks = []
  let dayCounter = 1 - firstWeekday // padding for days before the 1st

  while (dayCounter <= daysInMonth) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push(dayCounter)
      dayCounter++
    }
    weeks.push(week)
  }

  const upcoming = [...events].sort(
    (a, b) => new Date(a.dateString) - new Date(b.dateString)
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 font-pixel-body">Calendar</h2>

      <div className="flex items-center justify-between mb-3 max-w-sm">
        <button onClick={goToPrevMonth} className="font-pixel-body px-2">
          ◀
        </button>
        <span className="font-pixel-body">{monthLabel}</span>
        <button onClick={goToNextMonth} className="font-pixel-body px-2">
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 max-w-sm mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="text-center text-xs font-pixel-body" style={{ color: 'var(--color-text-muted)' }}>
            {d}
          </div>
        ))}

        {weeks.flat().map((day, i) => {
          if (day < 1 || day > daysInMonth) {
            return <div key={i} />
          }
          const isSelected = selectedDateString === dateStringFor(day)
          return (
            <button
              key={i}
              onClick={() => handleDayClick(day)}
              className="aspect-square rounded-lg text-xs font-pixel-body flex flex-col items-center justify-center gap-0.5"
              style={{
                backgroundColor: isSelected ? 'var(--color-accent)' : 'var(--color-surface)',
                color: isSelected ? 'var(--color-bg)' : 'var(--color-text)',
              }}
            >
              {day}
              {hasEvent(day) && (
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: isSelected ? 'var(--color-bg)' : 'var(--color-accent)' }}
                />
              )}
            </button>
          )
        })}
      </div>

      {selectedDateString && (
        <div className="flex gap-2 max-w-sm mb-6">
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder={`Add event for ${selectedDateString}...`}
            className="flex-1 px-3 py-2 rounded-lg font-pixel-body text-sm outline-none"
            style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
          />
          <button
            onClick={addEvent}
            className="px-4 py-2 rounded-lg font-pixel-body text-sm"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
          >
            Add
          </button>
        </div>
      )}

      <h3 className="font-bold mb-2 font-pixel-body">Important Dates</h3>
      <div className="flex flex-col gap-2 max-w-sm">
        {upcoming.length === 0 && (
          <p className="text-sm font-pixel-body" style={{ color: 'var(--color-text-muted)' }}>
            No dates added yet.
          </p>
        )}
        {upcoming.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between px-3 py-2 rounded-lg"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <div>
              <p className="font-pixel-body text-sm">{e.title}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {e.dateString}
              </p>
            </div>
            <button onClick={() => deleteEvent(e.id)} style={{ color: 'var(--color-text-muted)' }}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
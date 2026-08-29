// pages/NotificationsPage.tsx

import { useState } from 'react'
import { BriefcaseIcon, MessageIcon, StarIcon, ShieldIcon, BellIcon } from '../components/Icons'
import { notifications as initialNotifs, User } from '../data/data'

interface Props {
  navigate: (page: string, params?: Record<string, string>) => void
  currentUser: User
}

const typeConfig = {
  achievement: { icon: ShieldIcon, color: '#1E56FF', bg: '#eef2ff' },
  project: { icon: BriefcaseIcon, color: '#D4A017', bg: '#fffbeb' },
  message: { icon: MessageIcon, color: '#10B981', bg: '#f0fdf4' },
  review: { icon: StarIcon, color: '#f59e0b', bg: '#fffbeb' },
  system: { icon: BellIcon, color: '#64748b', bg: '#f8fafc' },
}

export default function NotificationsPage({ navigate, currentUser }: Props) {
  // Filtrar notificaciones del usuario actual
  const userNotifs = initialNotifs.filter(n => n.userId === currentUser.id)
  const [notifs, setNotifs] = useState(userNotifs)

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  const unread = notifs.filter(n => !n.read)
  const read = notifs.filter(n => n.read)

  if (notifs.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-[#0a1628] mb-6">Notificaciones</h1>
        <div className="text-center py-16">
          <span className="text-5xl">🔔</span>
          <p className="text-[#0a1628] font-semibold mt-4">Sin notificaciones</p>
          <p className="text-sm text-[#64748b] mt-1">Aquí aparecerán tus notificaciones</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#0a1628]">Notificaciones</h1>
          {unread.length > 0 && (
            <p className="text-sm text-[#64748b] mt-0.5">{unread.length} sin leer</p>
          )}
        </div>
        {unread.length > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-semibold text-[#1E56FF] hover:text-[#0022AB] transition-colors"
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      {unread.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-3">Nuevas</p>
          <div className="space-y-2">
            {unread.map(notif => (
              <NotifCard key={notif.id} notif={notif} onRead={markRead} navigate={navigate} />
            ))}
          </div>
        </div>
      )}

      {read.length > 0 && (
        <div>
          <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-3">Anteriores</p>
          <div className="space-y-2">
            {read.map(notif => (
              <NotifCard key={notif.id} notif={notif} onRead={markRead} navigate={navigate} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function NotifCard({ notif, onRead, navigate }: {
  notif: typeof initialNotifs[0]
  onRead: (id: string) => void
  navigate: (page: string, params?: Record<string, string>) => void
}) {
  const config = typeConfig[notif.type]
  const Icon = config.icon

  const handleClick = () => {
    onRead(notif.id)
    if (notif.type === 'message') navigate('messages')
    if (notif.type === 'project') navigate('projects')
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-start gap-3 p-4 rounded-2xl border transition-all text-left hover:shadow-sm ${!notif.read
          ? 'bg-white border-[#c7d7ff] shadow-sm'
          : 'bg-white/70 border-[#e2e8f0]'
        }`}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: config.bg }}
      >
        <Icon size={20} style={{ color: config.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`text-sm font-semibold text-[#0a1628] ${!notif.read ? '' : 'font-medium'}`}>{notif.title}</p>
          {!notif.read && <span className="w-2 h-2 rounded-full bg-[#1E56FF] flex-shrink-0" />}
        </div>
        <p className="text-xs text-[#64748b] mt-0.5">{notif.body}</p>
        <p className="text-[10px] text-[#94a3b8] mt-1.5">{notif.time}</p>
      </div>
    </button>
  )
}
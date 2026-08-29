// pages/SettingsPage.tsx

import { useState } from 'react'
import { UserIcon, BellIcon, ShieldIcon, GlobeIcon, HelpIcon, LogoutIcon, ChevronRightIcon } from '../components/Icons'
import { User } from '../data/data'

interface Props {
  navigate: (page: string) => void
  onLogout: () => void
  currentUser: User
}

interface SettingItem {
  icon: React.FC<{ className?: string; size?: number }>
  label: string
  subtitle?: string
  action?: () => void
  toggle?: boolean
  value?: boolean
  onChange?: (v: boolean) => void
  danger?: boolean
}

export default function SettingsPage({ navigate, onLogout, currentUser }: Props) {
  const [notifProjects, setNotifProjects] = useState(true)
  const [notifMessages, setNotifMessages] = useState(true)
  const [notifReviews, setNotifReviews] = useState(true)
  const [notifSystem, setNotifSystem] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [email, setEmail] = useState(currentUser.email)

  const sections: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Cuenta',
      items: [
        { icon: UserIcon, label: 'Información personal', subtitle: 'Nombre, foto, ubicación', action: () => navigate('profile') },
        { icon: UserIcon, label: 'Correo electrónico', subtitle: email, action: () => setEditEmail(true) },
        { icon: ShieldIcon, label: 'Contraseña y seguridad', subtitle: 'Cambia tu contraseña' },
        { icon: UserIcon, label: 'Verificación de identidad', subtitle: 'Cuenta verificada ✓' },
      ],
    },
    {
      title: 'Notificaciones',
      items: [
        { icon: BellIcon, label: 'Nuevos proyectos', toggle: true, value: notifProjects, onChange: setNotifProjects },
        { icon: BellIcon, label: 'Mensajes nuevos', toggle: true, value: notifMessages, onChange: setNotifMessages },
        { icon: BellIcon, label: 'Reseñas recibidas', toggle: true, value: notifReviews, onChange: setNotifReviews },
        { icon: BellIcon, label: 'Actualizaciones del sistema', toggle: true, value: notifSystem, onChange: setNotifSystem },
      ],
    },
    {
      title: 'Privacidad',
      items: [
        { icon: ShieldIcon, label: 'Visibilidad del perfil', subtitle: 'Público' },
        { icon: ShieldIcon, label: 'Política de privacidad' },
        { icon: ShieldIcon, label: 'Términos de servicio' },
      ],
    },
    {
      title: 'App',
      items: [
        { icon: GlobeIcon, label: 'Idioma', subtitle: 'Español' },
        { icon: HelpIcon, label: 'Centro de ayuda' },
        { icon: HelpIcon, label: 'Reportar un problema' },
        { icon: HelpIcon, label: 'Versión', subtitle: 'NICtalent v1.0.0' },
      ],
    },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-10">
      <div className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] mb-5">
        <img
          src={currentUser.photo}
          alt={currentUser.name}
          className="w-14 h-14 rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-[#0a1628]">{currentUser.name}</h2>
          <p className="text-sm text-[#64748b]">{currentUser.bio || 'Usuario'}</p>
          <p className="text-xs text-[#94a3b8]">{email}</p>
        </div>
        <button
          onClick={() => navigate('profile')}
          className="ml-auto px-3 py-2 border border-[#1E56FF] text-[#1E56FF] text-xs font-semibold rounded-xl hover:bg-[#f0f4ff] transition-colors"
        >
          Editar
        </button>
      </div>

      {sections.map(section => (
        <div key={section.title} className="mb-5">
          <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2 px-1">{section.title}</p>
          <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden">
            {section.items.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  onClick={!item.toggle ? item.action : undefined}
                  className={`flex items-center gap-3 px-4 py-3.5 border-b border-[#f1f5f9] last:border-0 ${!item.toggle && item.action ? 'cursor-pointer hover:bg-[#f8faff]' : ''} transition-colors`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#f0f4ff] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#1E56FF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#0a1628]">{item.label}</p>
                    {item.subtitle && <p className="text-xs text-[#94a3b8]">{item.subtitle}</p>}
                  </div>
                  {item.toggle ? (
                    <button
                      onClick={() => item.onChange?.(!item.value)}
                      className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${item.value ? 'bg-[#1E56FF]' : 'bg-[#e2e8f0]'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform mx-1 ${item.value ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  ) : item.action ? (
                    <ChevronRightIcon size={16} className="text-[#94a3b8]" />
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <button
        onClick={() => setShowLogoutConfirm(true)}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#fff1f2] border border-[#fecdd3] text-red-500 rounded-2xl font-semibold text-sm hover:bg-[#ffe4e6] transition-colors"
      >
        <LogoutIcon size={18} />
        Cerrar sesión
      </button>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 text-center animate-scale-in">
            <div className="w-14 h-14 bg-[#fff1f2] rounded-full flex items-center justify-center mx-auto mb-4">
              <LogoutIcon size={24} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-[#0a1628]">¿Cerrar sesión?</h3>
            <p className="text-sm text-[#64748b] mt-2">¿Estás seguro que quieres cerrar sesión de NICtalent?</p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 border border-[#e2e8f0] text-[#64748b] rounded-xl font-semibold text-sm hover:bg-[#f8faff] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={onLogout}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {editEmail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-[#0a1628] mb-4">Editar correo</h3>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#f0f4ff] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-[#1E56FF] text-[#0a1628] mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => setEditEmail(false)} className="flex-1 py-3 border border-[#e2e8f0] text-[#64748b] rounded-xl font-semibold text-sm">Cancelar</button>
              <button onClick={() => setEditEmail(false)} className="flex-1 py-3 bg-[#1E56FF] text-white rounded-xl font-semibold text-sm">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
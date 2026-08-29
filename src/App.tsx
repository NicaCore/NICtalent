// App.tsx

import { useState } from 'react'
import Layout from './components/Layout'
import OnboardingPage from './pages/OnboardingPage'
import HomePage from './pages/HomePage'
import TalentDashboardPage from './pages/TalentDashboardPage'
import ExplorePage from './pages/ExplorePage'
import ProjectsPage from './pages/ProjectsPage'
import MessagesPage from './pages/MessagesPage'
import NotificationsPage from './pages/NotificationsPage'
import ProfilePage from './pages/ProfilePage'
import TalentDetailPage from './pages/TalentDetailPage'
import CoinsPage from './pages/CoinsPage'
import SavedPage from './pages/SavedPage'
import SettingsPage from './pages/SettingsPage'
import { users, User, talents, notifications, conversations } from './data/data'

type Page =
  | 'onboarding'
  | 'home'
  | 'talent-dashboard'
  | 'explore'
  | 'projects'
  | 'messages'
  | 'notifications'
  | 'profile'
  | 'talent-detail'
  | 'coins'
  | 'saved'
  | 'settings'
  | 'help'
  | 'user-select'

interface NavParams {
  talentId?: string
  convId?: string
  category?: string
  userId?: string
}

export default function App() {
  const [page, setPage] = useState<Page>('onboarding')
  const [params, setParams] = useState<NavParams>({})
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userType, setUserType] = useState<'talent' | 'client'>('client')

  const navigate = (newPage: string, newParams?: Record<string, string>) => {
    setPage(newPage as Page)
    setParams(newParams || {})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOnboardingSelect = (type: 'talent' | 'client') => {
    setUserType(type)
    if (type === 'talent') {
      setPage('user-select')
    } else {
      const clientUser = users.find(u => u.id === 'user9') || users[8]
      setCurrentUser(clientUser)
      setPage('home')
    }
  }

  const selectUser = (user: User) => {
    setCurrentUser(user)
    setUserType(user.type === 'talent' ? 'talent' : 'client')
    if (user.type === 'talent') {
      setPage('talent-dashboard')
    } else {
      setPage('home')
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setPage('onboarding')
    setParams({})
  }

  if (page === 'onboarding') {
    return <OnboardingPage onSelect={handleOnboardingSelect} />
  }

  if (page === 'user-select') {
    return <UserSelectPage users={users.filter(u => u.type === 'talent')} onSelect={selectUser} onBack={() => setPage('onboarding')} />
  }

  if (!currentUser) {
    setPage('onboarding')
    return <OnboardingPage onSelect={handleOnboardingSelect} />
  }

  const user = currentUser
  const unreadNotifications = notifications.filter(n => n.userId === user.id && !n.read).length
  const userConversations = conversations.filter(c => c.participants.includes(user.id))
  const unreadMessages = userConversations.reduce((acc, c) => acc + c.unread, 0)

  return (
    <Layout
      currentPage={page}
      navigate={navigate}
      unreadNotifications={unreadNotifications}
      unreadMessages={unreadMessages}
      currentUser={user}
    >
      <div className="animate-fade-in h-full">
        {page === 'home' && (
          <HomePage navigate={navigate} userType={userType} currentUser={user} />
        )}

        {page === 'talent-dashboard' && (
          <TalentDashboardPage navigate={navigate} userType={userType} currentUser={user} />
        )}

        {page === 'explore' && (
          <ExplorePage navigate={navigate} initialCategory={params.category} />
        )}

        {page === 'projects' && (
          <ProjectsPage navigate={navigate} />
        )}

        {page === 'messages' && (
          <MessagesPage navigate={navigate} initialConvId={params.convId} currentUser={user} />
        )}

        {page === 'notifications' && (
          <NotificationsPage navigate={navigate} currentUser={user} />
        )}

        {page === 'profile' && (
          <ProfilePage navigate={navigate} userType={userType} currentUser={user} />
        )}

        {page === 'talent-detail' && params.talentId && (
          <TalentDetailPage talentId={params.talentId} navigate={navigate} currentUser={user} />
        )}

        {page === 'talent-detail' && !params.talentId && (
          <ExplorePage navigate={navigate} />
        )}

        {page === 'coins' && (
          <CoinsPage navigate={navigate} currentUser={user} />
        )}

        {page === 'saved' && (
          <SavedPage navigate={navigate} currentUser={user} />
        )}

        {page === 'settings' && (
          <SettingsPage navigate={navigate} onLogout={handleLogout} currentUser={user} />
        )}

        {page === 'help' && (
          <HelpPage navigate={navigate} />
        )}
      </div>
    </Layout>
  )
}

function UserSelectPage({ users, onSelect, onBack }: { users: User[]; onSelect: (user: User) => void; onBack: () => void }) {
  const [search, setSearch] = useState('')

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    (u.bio && u.bio.toLowerCase().includes(search.toLowerCase())) ||
    (u.skills && u.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
  )

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl nictalent-gradient flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-3xl">N</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0a1628]">Selecciona tu perfil</h1>
          <p className="text-[#64748b] mt-1">¿Con qué talento deseas iniciar sesión?</p>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-[#e2e8f0] mb-4 shadow-sm">
          <span className="text-[#94a3b8]">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre, habilidad o especialidad..."
            className="flex-1 bg-transparent text-sm text-[#0a1628] placeholder-[#94a3b8] outline-none"
            autoFocus
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-[#94a3b8] hover:text-[#64748b]">
              ✕
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pb-4">
          {filtered.map(user => {
            const talent = talents.find(t => t.id === user.talentId)
            return (
              <button
                key={user.id}
                onClick={() => onSelect(user)}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border-2 border-[#e2e8f0] hover:border-[#1E56FF] hover:shadow-md transition-all text-left hover:scale-[1.02]"
              >
                <img src={user.photo} alt={user.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#e2e8f0]" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0a1628] text-sm">{user.name}</p>
                  <p className="text-xs text-[#64748b] truncate">{talent?.role || user.bio || 'Talento'}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {talent?.rating && (
                      <span className="text-xs text-[#D4A017]">⭐ {talent.rating}</span>
                    )}
                    {talent?.available !== undefined && (
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${talent.available ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#fef3c7] text-[#92400e]'}`}>
                        {talent.available ? 'Disponible' : 'Ocupado'}
                      </span>
                    )}
                  </div>
                  {talent?.hourlyRate && (
                    <p className="text-[10px] text-[#1E56FF] font-bold">${talent.hourlyRate}/hr</p>
                  )}
                </div>
                <span className="text-[#94a3b8]">→</span>
              </button>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#e2e8f0]">
            <span className="text-5xl">🔍</span>
            <p className="text-[#0a1628] font-semibold mt-4">No se encontraron talentos</p>
            <p className="text-sm text-[#64748b] mt-1">Prueba con otros términos de búsqueda</p>
          </div>
        )}

        <button onClick={onBack} className="mt-4 text-sm text-[#64748b] hover:text-[#1E56FF] transition-colors">
          ← Volver
        </button>
      </div>
    </div>
  )
}

function HelpPage({ navigate }: { navigate: (page: string) => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { q: '¿Cómo funciona NICtalent?', a: 'NICtalent conecta a talentos profesionales con clientes que buscan servicios. Crea tu perfil, muestra tu portafolio y comienza a recibir proyectos.' },
    { q: '¿Cómo se realizan los pagos?', a: 'Los pagos se realizan a través del sistema de monedas NICtalent. Los clientes depositan monedas que se liberan al talento al completar el proyecto.' },
    { q: '¿Cómo verifico mi cuenta?', a: 'Entra a Configuración > Verificación de identidad y sigue los pasos para validar tu cédula o pasaporte.' },
    { q: '¿Puedo ser talento y cliente a la vez?', a: 'Sí, puedes usar ambos roles con la misma cuenta. Cambia entre modos desde tu perfil.' },
    { q: '¿Cómo contacto a un talento?', a: 'Usa tus monedas NICtalent para desbloquear el contacto con el talento que te interesa. Son 10 monedas por contacto.' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-[#0a1628] mb-2">Centro de ayuda</h1>
      <p className="text-sm text-[#64748b] mb-6">¿Tienes alguna pregunta? Estamos aquí para ayudarte.</p>

      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-[#e2e8f0] shadow-sm mb-5">
        <span className="text-[#94a3b8]">🔍</span>
        <input placeholder="Buscar en la ayuda..." className="flex-1 text-sm outline-none bg-transparent text-[#0a1628] placeholder-[#94a3b8]" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { emoji: '💬', label: 'Contactar soporte' },
          { emoji: '📖', label: 'Guías de inicio' },
          { emoji: '🔒', label: 'Seguridad' },
          { emoji: '💳', label: 'Pagos y monedas' },
        ].map(({ emoji, label }) => (
          <button key={label} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#e2e8f0] shadow-sm hover:border-[#1E56FF] hover:bg-[#f0f4ff] transition-all text-sm font-medium text-[#0a1628]">
            <span className="text-xl">{emoji}</span>
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <h2 className="font-bold text-[#0a1628] text-sm">Preguntas frecuentes</h2>
        </div>
        <div className="divide-y divide-[#f1f5f9]">
          {faqs.map((faq, i) => (
            <div key={i} className="px-4 py-3">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left gap-3"
              >
                <span className="text-sm font-medium text-[#0a1628]">{faq.q}</span>
                <span className={`text-[#1E56FF] text-lg transition-transform flex-shrink-0 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openIndex === i && <p className="text-xs text-[#64748b] mt-2 leading-relaxed">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 p-4 bg-[#f0f4ff] border border-[#c7d7ff] rounded-2xl text-center">
        <p className="text-sm font-semibold text-[#0a1628]">¿No encontraste tu respuesta?</p>
        <p className="text-xs text-[#64748b] mt-1">Nuestro equipo está disponible de lunes a viernes de 8am a 6pm</p>
        <button className="mt-3 px-4 py-2 bg-[#1E56FF] text-white text-sm font-semibold rounded-xl hover:bg-[#0022AB] transition-colors">
          Escribir al soporte
        </button>
      </div>
    </div>
  )
}
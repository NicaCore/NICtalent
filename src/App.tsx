import { useState } from 'react'
import Layout from './components/Layout'
import OnboardingPage from './pages/OnboardingPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import ProjectsPage from './pages/ProjectsPage'
import MessagesPage from './pages/MessagesPage'
import NotificationsPage from './pages/NotificationsPage'
import ProfilePage from './pages/ProfilePage'
import TalentDetailPage from './pages/TalentDetailPage'
import CoinsPage from './pages/CoinsPage'
import SavedPage from './pages/SavedPage'
import SettingsPage from './pages/SettingsPage'

type Page =
  | 'onboarding'
  | 'home'
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

interface NavParams {
  talentId?: string
  convId?: string
  category?: string
}

export default function App() {
  const [page, setPage] = useState<Page>('onboarding')
  const [params, setParams] = useState<NavParams>({})
  const [userType, setUserType] = useState<'talent' | 'client'>('talent')

  const navigate = (newPage: string, newParams?: Record<string, string>) => {
    setPage(newPage as Page)
    setParams(newParams || {})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOnboardingSelect = (type: 'talent' | 'client') => {
    setUserType(type)
    navigate('home')
  }

  const handleLogout = () => {
    setPage('onboarding')
    setParams({})
  }

  if (page === 'onboarding') {
    return <OnboardingPage onSelect={handleOnboardingSelect} />
  }

  const unreadNotifications = 3
  const unreadMessages = 3

  return (
    <Layout
      currentPage={page}
      navigate={navigate}
      unreadNotifications={unreadNotifications}
      unreadMessages={unreadMessages}
    >
      <div className="animate-fade-in h-full">
        {page === 'home' && (
          <HomePage navigate={navigate} userType={userType} />
        )}

        {page === 'explore' && (
          <ExplorePage navigate={navigate} initialCategory={params.category} />
        )}

        {page === 'projects' && (
          <ProjectsPage navigate={navigate} />
        )}

        {page === 'messages' && (
          <MessagesPage navigate={navigate} initialConvId={params.convId} />
        )}

        {page === 'notifications' && (
          <NotificationsPage navigate={navigate} />
        )}

        {page === 'profile' && (
          <ProfilePage navigate={navigate} userType={userType} />
        )}

        {page === 'talent-detail' && params.talentId && (
          <TalentDetailPage talentId={params.talentId} navigate={navigate} />
        )}

        {page === 'talent-detail' && !params.talentId && (
          <ExplorePage navigate={navigate} />
        )}

        {page === 'coins' && (
          <CoinsPage navigate={navigate} />
        )}

        {page === 'saved' && (
          <SavedPage navigate={navigate} />
        )}

        {page === 'settings' && (
          <SettingsPage navigate={navigate} onLogout={handleLogout} />
        )}

        {page === 'help' && (
          <HelpPage navigate={navigate} />
        )}
      </div>
    </Layout>
  )
}

function HelpPage({ navigate }: { navigate: (page: string) => void }) {
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

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-[#e2e8f0] shadow-sm mb-5">
        <span className="text-[#94a3b8]">🔍</span>
        <input placeholder="Buscar en la ayuda..." className="flex-1 text-sm outline-none bg-transparent text-[#0a1628] placeholder-[#94a3b8]" />
      </div>

      {/* Quick links */}
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

      {/* FAQs */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <h2 className="font-bold text-[#0a1628] text-sm">Preguntas frecuentes</h2>
        </div>
        <div className="divide-y divide-[#f1f5f9]">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="px-4 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left gap-3"
      >
        <span className="text-sm font-medium text-[#0a1628]">{q}</span>
        <span className={`text-[#1E56FF] text-lg transition-transform flex-shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <p className="text-xs text-[#64748b] mt-2 leading-relaxed">{a}</p>}
    </div>
  )
}

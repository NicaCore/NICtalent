// pages/TalentDashboardPage.tsx

import { useState } from 'react'
import {
  TrendingIcon, BriefcaseIcon, StarIcon, ShieldIcon, CheckIcon,
  UserIcon, MessageIcon, BellIcon, PlusIcon, WalletIcon, BookmarkIcon
} from '../components/Icons'
import { talents, notifications, projects, User, users } from '../data/data'

interface Props {
  navigate: (page: string, params?: Record<string, string>) => void
  userType: 'talent' | 'client'
  currentUser: User
}

export default function TalentDashboardPage({ navigate, userType, currentUser }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'messages'>('overview')

  // Buscar el talento asociado al usuario
  const talent = talents.find(t => t.id === currentUser.talentId)

  // Notificaciones del usuario actual
  const userNotifications = notifications.filter(n => n.userId === currentUser.id)
  const unreadCount = userNotifications.filter(n => !n.read).length

  // Proyectos activos del talento
  const myActiveProjects = projects.filter(p => p.status === 'in-progress')
  const availableProjects = projects.filter(p => p.status === 'open').slice(0, 3)

  // Estadísticas del talento
  const stats = {
    projectsCompleted: talent?.reviews || 12,
    reviews: talent?.reviews || 32,
    rating: talent?.rating || 4.9,
    earnings: 2450,
    saved: 45
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0a1628]">
            Panel de Talento 👨‍🎨
          </h1>
          <p className="text-sm text-[#64748b] mt-0.5">
            Gestiona tu perfil, proyectos y oportunidades
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('notifications')}
            className="relative p-2.5 bg-white rounded-xl shadow-sm border border-[#e2e8f0] text-[#64748b] hover:text-[#1E56FF] transition-colors"
          >
            <BellIcon size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-red-500 text-[8px] text-white font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => navigate('profile')}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#f0f4ff] transition-colors"
          >
            <img
              src={currentUser.photo}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-semibold text-[#0a1628] hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon={<BriefcaseIcon size={18} />}
          value={stats.projectsCompleted}
          label="Proyectos completados"
          color="#1E56FF"
          bg="#eef2ff"
        />
        <StatCard
          icon={<StarIcon size={18} />}
          value={stats.rating}
          label="Calificación"
          color="#D4A017"
          bg="#fffbeb"
        />
        <StatCard
          icon={<WalletIcon size={18} />}
          value={`$${stats.earnings}`}
          label="Ganancias"
          color="#10B981"
          bg="#f0fdf4"
        />
        <StatCard
          icon={<BookmarkIcon size={18} />}
          value={stats.saved}
          label="Guardados"
          color="#1E56FF"
          bg="#eef2ff"
        />
      </div>

      <div className="bg-gradient-to-r from-[#f0f4ff] to-[#e8f0ff] border border-[#c7d7ff] rounded-2xl p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-[#0a1628] text-sm">Completa tu perfil 🚀</h3>
            <p className="text-xs text-[#64748b] mt-0.5">Aumenta tus oportunidades de ser contratado</p>
          </div>
          <span className="text-[#1E56FF] font-bold text-sm">50%</span>
        </div>
        <div className="h-2 bg-[#dbeafe] rounded-full overflow-hidden mb-3">
          <div className="h-full bg-[#1E56FF] rounded-full" style={{ width: '50%' }} />
        </div>
        <button
          onClick={() => navigate('profile')}
          className="w-full py-2.5 bg-[#1E56FF] text-white rounded-xl text-sm font-semibold hover:bg-[#0022AB] transition-colors"
        >
          Completar perfil
        </button>
      </div>

      <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#e2e8f0]">
        {[
          { id: 'overview', label: 'Resumen' },
          { id: 'projects', label: 'Mis Proyectos' },
          { id: 'messages', label: 'Mensajes' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === tab.id
                ? 'bg-[#1E56FF] text-white shadow-sm'
                : 'text-[#64748b] hover:text-[#1E56FF]'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[#0a1628] text-base">Proyectos disponibles para ti</h2>
              <button onClick={() => navigate('projects')} className="text-xs font-semibold text-[#1E56FF] hover:text-[#0022AB]">
                Ver todos →
              </button>
            </div>
            <div className="space-y-3">
              {availableProjects.map(project => (
                <div key={project.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <img
                      src={project.clientPhoto}
                      alt={project.clientName}
                      className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#0a1628] text-sm">{project.title}</h3>
                      <p className="text-xs text-[#64748b]">{project.clientName}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[#64748b]">
                        <span className="font-bold text-[#1E56FF]">${project.budget}</span>
                        <span>·</span>
                        <span>{project.proposals} propuestas</span>
                        <span>·</span>
                        <span>📅 {project.deadline}</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-[#1E56FF] text-white text-xs font-semibold rounded-lg hover:bg-[#0022AB] transition-colors">
                      Aplicar
                    </button>
                  </div>
                </div>
              ))}
              {availableProjects.length === 0 && (
                <div className="text-center py-8 bg-white rounded-2xl border border-[#e2e8f0]">
                  <p className="text-sm text-[#64748b]">No hay proyectos disponibles en este momento</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
              <h3 className="font-semibold text-[#0a1628] text-sm mb-2">📊 Rendimiento</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-[#64748b]">
                    <span>Tasa de aceptación</span>
                    <span className="font-semibold text-[#0a1628]">85%</span>
                  </div>
                  <div className="h-1.5 bg-[#f1f5f9] rounded-full mt-1">
                    <div className="h-full bg-[#10B981] rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-[#64748b]">
                    <span>Entregas a tiempo</span>
                    <span className="font-semibold text-[#0a1628]">92%</span>
                  </div>
                  <div className="h-1.5 bg-[#f1f5f9] rounded-full mt-1">
                    <div className="h-full bg-[#1E56FF] rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
              <h3 className="font-semibold text-[#0a1628] text-sm mb-2">🎯 Próximos pasos</h3>
              <ul className="space-y-2 text-xs text-[#64748b]">
                <li className="flex items-center gap-2">
                  <span className="text-[#1E56FF]">•</span>
                  Completa tu portafolio
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#1E56FF]">•</span>
                  Agrega más habilidades
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#1E56FF]">•</span>
                  Solicita a 3 proyectos
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-3">
          {myActiveProjects.length > 0 ? (
            myActiveProjects.map(project => (
              <div key={project.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-[#0a1628] text-sm">{project.title}</h3>
                    <p className="text-xs text-[#64748b]">{project.clientName}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className="px-2 py-0.5 bg-[#eef2ff] text-[#1E56FF] rounded-full font-medium">En progreso</span>
                      <span className="text-[#64748b]">📅 {project.deadline}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 border border-[#1E56FF] text-[#1E56FF] text-xs font-semibold rounded-lg hover:bg-[#f0f4ff] transition-colors">
                    Ver detalles
                  </button>
                </div>
                <div className="mt-3 pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                  <span className="text-xs text-[#64748b]">Presupuesto: <span className="font-bold text-[#0a1628]">${project.budget}</span></span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-[#64748b]">Progreso</span>
                    <div className="w-20 h-1.5 bg-[#f1f5f9] rounded-full">
                      <div className="h-full bg-[#D4A017] rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#e2e8f0]">
              <span className="text-5xl">📋</span>
              <p className="text-[#0a1628] font-semibold mt-4">No tienes proyectos activos</p>
              <p className="text-sm text-[#64748b] mt-1">Explora proyectos disponibles y comienza a trabajar</p>
              <button onClick={() => navigate('projects')} className="mt-4 px-4 py-2 bg-[#1E56FF] text-white text-sm font-semibold rounded-xl">
                Ver proyectos
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4">
          <div className="flex items-center gap-3 text-[#64748b]">
            <MessageIcon size={20} />
            <span className="text-sm">No tienes mensajes nuevos</span>
            <button
              onClick={() => navigate('messages')}
              className="ml-auto text-sm font-semibold text-[#1E56FF] hover:text-[#0022AB]"
            >
              Ir a mensajes →
            </button>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-[#D4A017] to-[#f5c842] rounded-2xl p-5 text-white shadow-md shadow-yellow-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">✨ Destaca tu perfil</h3>
            <p className="text-white/80 text-sm">Aparece en los primeros resultados y duplica tus oportunidades</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold bg-white/20 px-3 py-1.5 rounded-lg">5 monedas / día</span>
            <button className="px-4 py-2 bg-white text-[#D4A017] rounded-xl font-bold text-sm hover:bg-[#f0f4ff] transition-colors">
              Destacar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label, color, bg }: {
  icon: React.ReactNode
  value: string | number
  label: string
  color: string
  bg: string
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <div>
          <p className="text-lg font-extrabold text-[#0a1628]">{value}</p>
          <p className="text-[10px] text-[#64748b] font-medium">{label}</p>
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { SearchIcon, FilterIcon, StarIcon, MapPinIcon, BookmarkIcon, BellIcon, TrendingIcon, BriefcaseIcon, ShieldIcon, CheckIcon } from '../components/Icons'
import { talents, categories, notifications } from '../data/data'

interface Props {
  navigate: (page: string, params?: Record<string, string>) => void
  userType: 'talent' | 'client'
}

export default function HomePage({ navigate, userType }: Props) {
  const [search, setSearch] = useState('')
  const [savedIds, setSavedIds] = useState<string[]>(talents.filter(t => t.saved).map(t => t.id))
  const unreadCount = notifications.filter(n => !n.read).length

  const toggleSave = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0a1628]">
            ¡Hola, Ana! <span>👋</span>
          </h1>
          <p className="text-sm text-[#64748b] mt-0.5">
            {userType === 'talent' ? '¿Qué talento vas a compartir hoy?' : '¿Qué talento buscas hoy?'}
          </p>
        </div>
        <button
          onClick={() => navigate('notifications')}
          className="relative p-2.5 bg-white rounded-xl shadow-sm border border-[#e2e8f0] text-[#64748b] hover:text-[#1E56FF] transition-colors lg:hidden"
        >
          <BellIcon size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-red-500 text-[8px] text-white font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div
        onClick={() => navigate('explore')}
        className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-[#e2e8f0] cursor-pointer hover:border-[#1E56FF] transition-colors"
      >
        <SearchIcon size={18} className="text-[#94a3b8]" />
        <span className="text-sm text-[#94a3b8] flex-1">Buscar servicio o talento...</span>
        <button className="p-1.5 bg-[#f0f4ff] rounded-lg text-[#1E56FF]">
          <FilterIcon size={16} />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate('profile')}
          className="bg-gradient-to-br from-[#1E56FF] to-[#0022AB] rounded-2xl p-4 text-left shadow-md shadow-blue-200"
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
            <TrendingIcon className="text-white" size={22} />
          </div>
          <h3 className="text-white font-semibold text-sm">Soy talento</h3>
          <p className="text-white/75 text-xs mt-1">Ofrece tu habilidad y conoce oportunidades.</p>
        </button>
        <button
          onClick={() => navigate('explore')}
          className="bg-gradient-to-br from-[#D4A017] to-[#f5c842] rounded-2xl p-4 text-left shadow-md shadow-yellow-200"
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
            <BriefcaseIcon className="text-white" size={22} />
          </div>
          <h3 className="text-white font-semibold text-sm">Busco talento</h3>
          <p className="text-white/75 text-xs mt-1">Encuentra el talento ideal para tu proyecto.</p>
        </button>
      </div>

      {/* Profile Completion Card (talent only) */}
      {userType === 'talent' && (
        <div className="bg-gradient-to-r from-[#f0f4ff] to-[#e8f0ff] border border-[#c7d7ff] rounded-2xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-[#0a1628] text-sm">Impulsa tu talento 🚀</h3>
              <p className="text-xs text-[#64748b] mt-0.5">Completa tu perfil y aumenta tus oportunidades</p>
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
      )}

      {/* Popular Categories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-[#0a1628] text-base">Categorías populares</h2>
          <button onClick={() => navigate('explore')} className="text-xs font-semibold text-[#1E56FF] hover:text-[#0022AB]">
            Ver todas →
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate('explore', { category: cat.id })}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-[#e2e8f0] hover:border-[#1E56FF] hover:shadow-md transition-all min-w-[80px]"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium text-[#0a1628] text-center">{cat.label}</span>
              <span className="text-[10px] text-[#94a3b8]">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Nearby Talents */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-[#0a1628] text-base">Talentos cerca de ti</h2>
          <button onClick={() => navigate('explore')} className="text-xs font-semibold text-[#1E56FF] hover:text-[#0022AB]">
            Ver todos →
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {talents.slice(0, 6).map(talent => (
            <div
              key={talent.id}
              className="flex-shrink-0 w-36 bg-white rounded-2xl p-3 shadow-sm border border-[#e2e8f0] cursor-pointer hover:shadow-md hover:border-[#c7d7ff] transition-all"
              onClick={() => navigate('talent-detail', { talentId: talent.id })}
            >
              <div className="relative mb-2">
                <img
                  src={talent.photo}
                  alt={talent.name}
                  className="w-full h-24 object-cover rounded-xl"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSave(talent.id) }}
                  className={`absolute top-1.5 right-1.5 p-1.5 rounded-lg backdrop-blur-sm ${savedIds.includes(talent.id) ? 'bg-[#1E56FF] text-white' : 'bg-white/80 text-[#64748b]'}`}
                >
                  <BookmarkIcon size={12} filled={savedIds.includes(talent.id)} />
                </button>
                {talent.available && (
                  <span className="absolute bottom-1.5 left-1.5 text-[9px] font-semibold bg-[#10B981] text-white px-1.5 py-0.5 rounded-md">
                    Disponible
                  </span>
                )}
              </div>
              <h3 className="text-xs font-bold text-[#0a1628] truncate">{talent.name}</h3>
              <p className="text-[10px] text-[#64748b] truncate mb-1">{talent.role}</p>
              <div className="flex items-center gap-1">
                <StarIcon size={10} />
                <span className="text-[10px] font-semibold text-[#0a1628]">{talent.rating}</span>
                <span className="text-[10px] text-[#94a3b8]">({talent.reviews})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Notifications */}
      <div>
        <h2 className="font-bold text-[#0a1628] text-base mb-3">Notificaciones motivadoras</h2>
        <div className="space-y-3">
          {[
            { icon: ShieldIcon, color: '#1E56FF', title: '¡Sigue así!', body: 'Cada actualización de tu perfil te acerca a nuevas oportunidades.' },
            { icon: StarIcon, color: '#D4A017', title: 'Tu talento inspira', body: 'Alguien guardó tu perfil en sus favoritos.' },
            { icon: BriefcaseIcon, color: '#0022AB', title: 'Nuevo proyecto para ti', body: 'Tenemos un proyecto que podría ser perfecto para tus habilidades.' },
            { icon: CheckIcon, color: '#10B981', title: 'Primer paso completado', body: '¡Genial! Completa tu portafolio y destaca aún más.' },
          ].map(({ icon: Icon, color, title, body }, i) => (
            <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0a1628]">{title}</p>
                <p className="text-xs text-[#64748b] mt-0.5">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Desktop Promo */}
      <div className="nictalent-gradient rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold leading-tight">
              El talento que necesitas,<br />
              la oportunidad que buscas.
            </h2>
            <p className="text-white/80 text-sm mt-2">
              Conectamos habilidades con oportunidades reales.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() => navigate('explore')}
              className="px-5 py-2.5 bg-white text-[#1E56FF] rounded-xl text-sm font-bold hover:bg-[#f0f4ff] transition-colors"
            >
              Busca talento
            </button>
            <button
              onClick={() => navigate('projects')}
              className="px-5 py-2.5 bg-white/20 border border-white/40 text-white rounded-xl text-sm font-bold hover:bg-white/30 transition-colors"
            >
              Publicar proyecto
            </button>
          </div>
        </div>
      </div>

      <div className="h-4" />
    </div>
  )
}

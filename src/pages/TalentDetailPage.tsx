// pages/TalentDetailPage.tsx

import { useState } from 'react'
import { ChevronLeftIcon, StarIcon, MapPinIcon, BookmarkIcon, MessageIcon, CheckIcon } from '../components/Icons'
import { talents, User } from '../data/data'

interface Props {
  talentId: string
  navigate: (page: string, params?: Record<string, string>) => void
  currentUser: User
}

export default function TalentDetailPage({ talentId, navigate, currentUser }: Props) {
  const talent = talents.find(t => t.id === talentId)
  const [saved, setSaved] = useState(talent?.saved || false)
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'reviews'>('about')
  const [hired, setHired] = useState(false)

  if (!talent) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <p className="text-[#64748b]">Talento no encontrado</p>
        <button onClick={() => navigate('explore')} className="mt-4 px-4 py-2 bg-[#1E56FF] text-white rounded-xl text-sm font-semibold">
          Volver a explorar
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <div className="sticky top-0 z-10 bg-[#f0f4ff] px-4 pt-4 pb-2 flex items-center gap-2">
        <button
          onClick={() => navigate('explore')}
          className="p-2 bg-white rounded-xl shadow-sm border border-[#e2e8f0] text-[#64748b] hover:text-[#1E56FF] transition-colors"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <span className="font-semibold text-[#0a1628] text-sm">Perfil del talento</span>
        <button
          onClick={() => setSaved(!saved)}
          className={`ml-auto p-2 rounded-xl border shadow-sm transition-colors ${saved ? 'bg-[#1E56FF] border-[#1E56FF] text-white' : 'bg-white border-[#e2e8f0] text-[#64748b] hover:text-[#1E56FF]'}`}
        >
          <BookmarkIcon size={18} filled={saved} />
        </button>
      </div>

      <div className="px-4 pb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2e8f0] mb-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={talent.photo}
                alt={talent.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              {talent.available && (
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-[#0a1628]">{talent.name}</h1>
              <p className="text-[#64748b] text-sm">{talent.role}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-[#64748b]">
                <span className="flex items-center gap-1">
                  <MapPinIcon size={13} />
                  {talent.location}
                </span>
                <span className="flex items-center gap-1">
                  <StarIcon size={13} />
                  <span className="font-semibold text-[#0a1628]">{talent.rating}</span>
                  <span>({talent.reviews} reseñas)</span>
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${talent.available ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#fef3c7] text-[#92400e]'}`}>
                  {talent.available ? 'Disponible' : 'Ocupado'}
                </span>
                <span className="text-xs font-bold text-[#1E56FF]">
                  ${talent.hourlyRate}/hr
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate('messages', { convId: `conv${talent.id}` })}
              className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#1E56FF] text-[#1E56FF] rounded-xl font-semibold text-sm hover:bg-[#f0f4ff] transition-colors"
            >
              <MessageIcon size={16} />
              Enviar mensaje
            </button>
            <button
              onClick={() => setHired(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-colors ${hired ? 'bg-[#10B981] text-white' : 'bg-[#1E56FF] text-white hover:bg-[#0022AB]'}`}
            >
              {hired ? <><CheckIcon size={16} />Contratado</> : 'Contratar'}
            </button>
          </div>
        </div>

        <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#e2e8f0] mb-4">
          {(['about', 'portfolio', 'reviews'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors capitalize ${activeTab === tab ? 'bg-[#1E56FF] text-white shadow-sm' : 'text-[#64748b] hover:text-[#1E56FF]'}`}
            >
              {tab === 'about' ? 'Acerca de' : tab === 'portfolio' ? 'Portafolio' : 'Reseñas'}
            </button>
          ))}
        </div>

        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
              <h3 className="font-bold text-[#0a1628] text-sm mb-2">Sobre mí</h3>
              <p className="text-sm text-[#64748b] leading-relaxed">{talent.bio}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
              <h3 className="font-bold text-[#0a1628] text-sm mb-3">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-[#f0f4ff] text-[#1E56FF] text-xs font-medium rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
              <h3 className="font-bold text-[#0a1628] text-sm mb-3">Estadísticas</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-[#f0f4ff] rounded-xl">
                  <p className="text-xl font-extrabold text-[#1E56FF]">{talent.reviews}</p>
                  <p className="text-[10px] text-[#64748b] font-medium">Reseñas</p>
                </div>
                <div className="text-center p-3 bg-[#fffbeb] rounded-xl">
                  <p className="text-xl font-extrabold text-[#D4A017]">{talent.rating}</p>
                  <p className="text-[10px] text-[#64748b] font-medium">Calificación</p>
                </div>
                <div className="text-center p-3 bg-[#f0fdf4] rounded-xl">
                  <p className="text-xl font-extrabold text-[#10B981]">{talent.portfolio.length}</p>
                  <p className="text-[10px] text-[#64748b] font-medium">Proyectos</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-2 gap-3">
            {talent.portfolio.map(item => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e2e8f0]">
                <img src={item.img} alt={item.title} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#0a1628] line-clamp-2">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-[#0a1628]">{talent.rating}</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <StarIcon key={i} size={14} />
                  ))}
                </div>
                <p className="text-xs text-[#64748b] mt-0.5">{talent.reviews} reseñas</p>
              </div>
              <div className="flex-1 space-y-1">
                {[5, 4, 3, 2, 1].map(stars => {
                  const pct = stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 10 : 0
                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs text-[#64748b] w-3">{stars}</span>
                      <div className="flex-1 h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#D4A017] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {talent.reviewsList.map((rev, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1E56FF] flex items-center justify-center text-white text-xs font-bold">
                      {rev.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-[#0a1628]">{rev.author}</p>
                      <p className="text-[10px] text-[#94a3b8]">{rev.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => <StarIcon key={i} size={12} />)}
                  </div>
                </div>
                <p className="text-xs text-[#64748b]">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
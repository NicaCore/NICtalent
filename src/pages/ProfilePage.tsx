// pages/ProfilePage.tsx

import { useState } from 'react'
import { EditIcon, CameraIcon, MapPinIcon, StarIcon, BookmarkIcon, CheckIcon } from '../components/Icons'
import { User, talents } from '../data/data'

interface Props {
  navigate: (page: string, params?: Record<string, string>) => void
  userType: 'talent' | 'client'
  currentUser: User
}

export default function ProfilePage({ navigate, userType, currentUser }: Props) {
  const talent = talents.find(t => t.id === currentUser.talentId)

  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(talent?.bio || currentUser.bio || '')
  const [skills, setSkills] = useState<string[]>(talent?.skills || currentUser.skills || [])
  const [newSkill, setNewSkill] = useState('')
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'reviews'>('about')

  const isTalent = userType === 'talent' && talent
  const completion = isTalent ? 50 : 100

  const myPortfolio = talent?.portfolio || [
    { title: 'Proyecto de diseño', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop' },
    { title: 'App Móvil', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop' },
  ]

  const myReviews = talent?.reviewsList || [
    { author: 'Usuario', rating: 5, comment: 'Excelente trabajo.', date: 'Ago 2026' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-10">
      <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden mb-4">
        <div className="h-24 nictalent-gradient relative">
          <button className="absolute top-3 right-3 p-2 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-colors">
            <CameraIcon size={16} />
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="relative -mt-10 mb-3 flex items-end justify-between">
            <div className="relative">
              <img
                src={currentUser.photo}
                alt={currentUser.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#1E56FF] rounded-full flex items-center justify-center border-2 border-white">
                <CameraIcon size={10} className="text-white" />
              </button>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-colors text-xs font-semibold ${editing ? 'bg-[#1E56FF] border-[#1E56FF] text-white' : 'bg-white border-[#e2e8f0] text-[#64748b] hover:border-[#1E56FF] hover:text-[#1E56FF]'}`}
            >
              {editing ? <><CheckIcon size={14} />Guardar</> : <><EditIcon size={14} />Editar</>}
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#0a1628]">{currentUser.name}</h1>
              <span className="w-5 h-5 bg-[#1EE6FF]/20 rounded-full flex items-center justify-center">
                <CheckIcon size={10} className="text-[#0022AB]" />
              </span>
            </div>
            <p className="text-sm text-[#64748b]">{talent?.role || currentUser.bio || 'Usuario'}</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-[#64748b]">
              <span className="flex items-center gap-1">
                <MapPinIcon size={12} />
                {talent?.location || currentUser.location || 'Nicaragua'}
              </span>
              {talent?.rating && (
                <span className="flex items-center gap-1">
                  <StarIcon size={12} />
                  <span className="font-semibold text-[#0a1628]">{talent.rating}</span>
                  <span>({talent.reviews} reseñas)</span>
                </span>
              )}
            </div>
            {talent?.hourlyRate && (
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${talent.available ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#fef3c7] text-[#92400e]'}`}>
                  {talent.available ? 'Disponible' : 'Ocupado'}
                </span>
                <span className="text-xs font-bold text-[#1E56FF]">${talent.hourlyRate}/hr</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isTalent && completion < 100 && (
        <div className="bg-gradient-to-r from-[#f0f4ff] to-[#e8f0ff] border border-[#c7d7ff] rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-[#0a1628] text-sm">Completa tu perfil</h3>
              <p className="text-xs text-[#64748b] mt-0.5">Agrega portafolio para destacar más</p>
            </div>
            <span className="text-[#1E56FF] font-extrabold text-lg">{completion}%</span>
          </div>
          <div className="h-2 bg-[#dbeafe] rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#1E56FF] rounded-full transition-all" style={{ width: `${completion}%` }} />
          </div>
          <div className="flex gap-4 text-xs">
            {[
              { label: 'Foto de perfil', done: true },
              { label: 'Datos personales', done: true },
              { label: 'Habilidades', done: true },
              { label: 'Portafolio', done: false },
              { label: 'Reseñas', done: false },
            ].map(({ label, done }) => (
              <span key={label} className={`flex items-center gap-1 ${done ? 'text-[#10B981]' : 'text-[#94a3b8]'}`}>
                {done ? '✓' : '○'} {label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#e2e8f0] mb-4">
        {(['about', 'portfolio', 'reviews'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${activeTab === tab ? 'bg-[#1E56FF] text-white shadow-sm' : 'text-[#64748b] hover:text-[#1E56FF]'}`}
          >
            {tab === 'about' ? 'Acerca de' : tab === 'portfolio' ? 'Portafolio' : 'Reseñas'}
          </button>
        ))}
      </div>

      {activeTab === 'about' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-[#0a1628] text-sm">Sobre mí</h3>
              {editing && <button className="text-[#1E56FF] text-xs font-medium">Editar</button>}
            </div>
            {editing ? (
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={4}
                className="w-full bg-[#f0f4ff] rounded-xl px-3 py-2 text-sm text-[#0a1628] outline-none focus:ring-2 ring-[#1E56FF] resize-none"
              />
            ) : (
              <p className="text-sm text-[#64748b] leading-relaxed">{bio || 'Sin descripción'}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#0a1628] text-sm">Habilidades</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="flex items-center gap-1 px-3 py-1.5 bg-[#f0f4ff] text-[#1E56FF] text-xs font-medium rounded-full">
                  {skill}
                  {editing && (
                    <button onClick={() => setSkills(prev => prev.filter(s => s !== skill))} className="ml-1 text-[#1E56FF]/60 hover:text-red-500">×</button>
                  )}
                </span>
              ))}
              {editing && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && newSkill.trim()) { setSkills(prev => [...prev, newSkill.trim()]); setNewSkill('') } }}
                    placeholder="+ Agregar"
                    className="px-3 py-1.5 border-2 border-dashed border-[#1E56FF] text-[#1E56FF] text-xs rounded-full outline-none bg-transparent w-24"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden">
            {[
              { label: 'Configuración de cuenta', action: () => navigate('settings') },
              { label: 'Monedas y pagos', action: () => navigate('coins') },
              { label: 'Proyectos guardados', action: () => navigate('saved') },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="w-full flex items-center justify-between px-4 py-3.5 border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8faff] transition-colors text-sm text-[#0a1628] font-medium"
              >
                {label}
                <span className="text-[#94a3b8]">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {myPortfolio.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e2e8f0]">
                <img src={item.img} alt={item.title} className="w-full h-28 object-cover" />
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#0a1628] line-clamp-2">{item.title}</p>
                </div>
              </div>
            ))}
            <button className="bg-white rounded-2xl border-2 border-dashed border-[#c7d7ff] flex flex-col items-center justify-center gap-2 p-6 text-[#1E56FF] hover:border-[#1E56FF] hover:bg-[#f0f4ff] transition-colors" style={{ minHeight: 120 }}>
              <span className="text-2xl">+</span>
              <span className="text-xs font-medium">Agregar trabajo</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-3">
          {talent?.rating && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-[#0a1628]">{talent.rating}</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} size={14} />)}
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
          )}
          {myReviews.map((rev, i) => (
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
  )
}
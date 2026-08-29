import { useState } from 'react'
import { BookmarkIcon, StarIcon, MapPinIcon, XIcon } from '../components/Icons'
import { talents, projects } from '../data/data'

interface Props {
  navigate: (page: string, params?: Record<string, string>) => void
}

export default function SavedPage({ navigate }: Props) {
  const [tab, setTab] = useState<'talents' | 'projects'>('talents')
  const [savedTalents, setSavedTalents] = useState<string[]>(talents.filter(t => t.saved).map(t => t.id))
  const [savedProjects, setSavedProjects] = useState<string[]>(projects.filter(p => p.saved).map(p => p.id))

  const savedTalentsList = talents.filter(t => savedTalents.includes(t.id))
  const savedProjectsList = projects.filter(p => savedProjects.includes(p.id))

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-[#0a1628] mb-4">Guardados</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#e2e8f0] mb-4">
        <button
          onClick={() => setTab('talents')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'talents' ? 'bg-[#1E56FF] text-white shadow-sm' : 'text-[#64748b] hover:text-[#1E56FF]'}`}
        >
          Talentos ({savedTalentsList.length})
        </button>
        <button
          onClick={() => setTab('projects')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'projects' ? 'bg-[#1E56FF] text-white shadow-sm' : 'text-[#64748b] hover:text-[#1E56FF]'}`}
        >
          Proyectos ({savedProjectsList.length})
        </button>
      </div>

      {tab === 'talents' && (
        <div>
          {savedTalentsList.length === 0 ? (
            <Empty
              icon="🔖"
              title="Sin talentos guardados"
              subtitle="Guarda talentos para encontrarlos fácilmente"
              action={() => navigate('explore')}
              actionLabel="Explorar talentos"
            />
          ) : (
            <div className="space-y-3">
              {savedTalentsList.map(talent => (
                <div key={talent.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <img
                      src={talent.photo}
                      alt={talent.name}
                      onClick={() => navigate('talent-detail', { talentId: talent.id })}
                      className="w-14 h-14 rounded-xl object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    />
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate('talent-detail', { talentId: talent.id })}>
                      <h3 className="font-bold text-[#0a1628] text-sm hover:text-[#1E56FF] transition-colors">{talent.name}</h3>
                      <p className="text-xs text-[#64748b]">{talent.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <StarIcon size={11} />
                          <span className="text-xs font-semibold text-[#0a1628]">{talent.rating}</span>
                        </div>
                        <span className="text-[#94a3b8]">·</span>
                        <div className="flex items-center gap-1">
                          <MapPinIcon size={11} className="text-[#94a3b8]" />
                          <span className="text-xs text-[#64748b]">{talent.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => setSavedTalents(prev => prev.filter(id => id !== talent.id))}
                        className="p-1.5 text-[#94a3b8] hover:text-red-500 hover:bg-[#fff1f2] rounded-lg transition-colors"
                      >
                        <XIcon size={14} />
                      </button>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${talent.available ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#fef3c7] text-[#92400e]'}`}>
                        {talent.available ? 'Disponible' : 'Ocupado'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f1f5f9]">
                    <span className="text-xs text-[#64748b]">Desde <span className="font-bold text-[#0a1628]">${talent.hourlyRate}/hr</span></span>
                    <button
                      onClick={() => navigate('talent-detail', { talentId: talent.id })}
                      className="px-3 py-1.5 bg-[#1E56FF] text-white text-xs font-semibold rounded-lg hover:bg-[#0022AB] transition-colors"
                    >
                      Ver perfil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'projects' && (
        <div>
          {savedProjectsList.length === 0 ? (
            <Empty
              icon="📋"
              title="Sin proyectos guardados"
              subtitle="Guarda proyectos para aplicar después"
              action={() => navigate('projects')}
              actionLabel="Ver proyectos"
            />
          ) : (
            <div className="space-y-3">
              {savedProjectsList.map(project => (
                <div key={project.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <img src={project.clientPhoto} alt="" className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-[#0a1628] text-sm leading-tight">{project.title}</h3>
                          <p className="text-xs text-[#64748b]">{project.clientName}</p>
                        </div>
                        <button
                          onClick={() => setSavedProjects(prev => prev.filter(id => id !== project.id))}
                          className="p-1.5 text-[#94a3b8] hover:text-red-500 hover:bg-[#fff1f2] rounded-lg transition-colors flex-shrink-0"
                        >
                          <XIcon size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-[#64748b] mt-1 line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f1f5f9]">
                    <div className="text-xs text-[#64748b]">
                      <span className="font-bold text-[#0a1628]">${project.budget}</span> · {project.proposals} propuestas
                    </div>
                    <button className="px-3 py-1.5 bg-[#1E56FF] text-white text-xs font-semibold rounded-lg hover:bg-[#0022AB] transition-colors">
                      Aplicar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Empty({ icon, title, subtitle, action, actionLabel }: { icon: string; title: string; subtitle: string; action: () => void; actionLabel: string }) {
  return (
    <div className="text-center py-16">
      <span className="text-5xl">{icon}</span>
      <p className="text-[#0a1628] font-semibold mt-4">{title}</p>
      <p className="text-sm text-[#64748b] mt-1">{subtitle}</p>
      <button onClick={action} className="mt-4 px-4 py-2 bg-[#1E56FF] text-white text-sm font-semibold rounded-xl hover:bg-[#0022AB] transition-colors">
        {actionLabel}
      </button>
    </div>
  )
}

import { useState } from 'react'
import { BriefcaseIcon, BookmarkIcon, SearchIcon, PlusIcon, XIcon, MapPinIcon } from '../components/Icons'
import { projects } from '../data/data'

interface Props {
  navigate: (page: string, params?: Record<string, string>) => void
}

export default function ProjectsPage({ navigate }: Props) {
  const [tab, setTab] = useState<'all' | 'mine'>('all')
  const [showPost, setShowPost] = useState(false)
  const [savedIds, setSavedIds] = useState<string[]>(projects.filter(p => p.saved).map(p => p.id))
  const [search, setSearch] = useState('')
  const [formTitle, setFormTitle] = useState('')
  const [formCategory, setFormCategory] = useState('')
  const [formBudget, setFormBudget] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [posted, setPosted] = useState(false)

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const openProjects = projects.filter(p => p.status === 'open')
  const myProjects = projects.filter(p => p.status === 'in-progress')
  const display = (tab === 'all' ? openProjects : myProjects).filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))

  const statusColors: Record<string, string> = {
    open: '#10B981',
    'in-progress': '#1E56FF',
    completed: '#94a3b8',
  }
  const statusLabels: Record<string, string> = {
    open: 'Abierto',
    'in-progress': 'En progreso',
    completed: 'Completado',
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-[#0a1628]">Proyectos</h1>
        <button
          onClick={() => setShowPost(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1E56FF] text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200 hover:bg-[#0022AB] transition-colors"
        >
          <PlusIcon size={16} />
          Publicar proyecto
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#e2e8f0] mb-4">
        <button
          onClick={() => setTab('all')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'all' ? 'bg-[#1E56FF] text-white shadow-sm' : 'text-[#64748b] hover:text-[#1E56FF]'}`}
        >
          Proyectos disponibles ({openProjects.length})
        </button>
        <button
          onClick={() => setTab('mine')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'mine' ? 'bg-[#1E56FF] text-white shadow-sm' : 'text-[#64748b] hover:text-[#1E56FF]'}`}
        >
          Mis proyectos ({myProjects.length})
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-[#e2e8f0] mb-4">
        <SearchIcon size={16} className="text-[#94a3b8]" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar proyectos..."
          className="flex-1 text-sm text-[#0a1628] placeholder-[#94a3b8] outline-none bg-transparent"
        />
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {display.map(project => (
          <div key={project.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-3">
              <img
                src={project.clientPhoto}
                alt={project.clientName}
                className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-[#0a1628] text-sm leading-tight">{project.title}</h3>
                  <button onClick={(e) => toggleSave(project.id, e)} className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${savedIds.includes(project.id) ? 'text-[#1E56FF]' : 'text-[#94a3b8] hover:text-[#1E56FF]'}`}>
                    <BookmarkIcon size={14} filled={savedIds.includes(project.id)} />
                  </button>
                </div>
                <p className="text-xs text-[#64748b]">{project.clientName}</p>
              </div>
            </div>

            <p className="text-xs text-[#64748b] line-clamp-2 mb-3">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.skills.map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-[#f0f4ff] text-[#1E56FF] text-[10px] font-medium rounded-full">{skill}</span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-[#64748b]">
                <span className="font-bold text-[#0a1628] text-sm">${project.budget}</span>
                <span>•</span>
                <span>📅 {project.deadline}</span>
                <span>•</span>
                <span>{project.proposals} propuestas</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-1 rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: `${statusColors[project.status]}15`, color: statusColors[project.status] }}
                >
                  {statusLabels[project.status]}
                </span>
                {project.status === 'open' && (
                  <button className="px-3 py-1.5 bg-[#1E56FF] text-white text-xs font-semibold rounded-lg hover:bg-[#0022AB] transition-colors">
                    Aplicar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {display.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl">📋</span>
            <p className="text-[#0a1628] font-semibold mt-4">
              {tab === 'mine' ? 'No tienes proyectos activos' : 'No hay proyectos disponibles'}
            </p>
            <p className="text-sm text-[#64748b] mt-1">
              {tab === 'mine' ? 'Publica tu primer proyecto' : 'Vuelve más tarde'}
            </p>
            {tab === 'mine' && (
              <button onClick={() => setShowPost(true)} className="mt-4 px-4 py-2 bg-[#1E56FF] text-white text-sm font-semibold rounded-xl">
                Publicar proyecto
              </button>
            )}
          </div>
        )}
      </div>

      {/* Post Project Modal */}
      {showPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4" onClick={() => setShowPost(false)}>
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            {posted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="text-xl font-bold text-[#0a1628]">¡Proyecto publicado!</h3>
                <p className="text-sm text-[#64748b] mt-2">Los talentos ya pueden ver y aplicar a tu proyecto.</p>
                <button
                  onClick={() => { setShowPost(false); setPosted(false) }}
                  className="mt-6 px-6 py-3 bg-[#1E56FF] text-white rounded-xl font-semibold"
                >
                  Entendido
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-[#0a1628]">Publicar proyecto</h2>
                  <button onClick={() => setShowPost(false)} className="p-2 rounded-xl hover:bg-[#f0f4ff] text-[#64748b]">
                    <XIcon size={18} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-[#0a1628] mb-1.5 block">Título del proyecto *</label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={e => setFormTitle(e.target.value)}
                      placeholder="Ej: Diseño de logo para mi empresa"
                      className="w-full bg-[#f0f4ff] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-[#1E56FF] text-[#0a1628] placeholder-[#94a3b8]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#0a1628] mb-1.5 block">Categoría</label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value)}
                      className="w-full bg-[#f0f4ff] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-[#1E56FF] text-[#0a1628]"
                    >
                      <option value="">Seleccionar categoría</option>
                      <option>Diseño y Creatividad</option>
                      <option>Programación y Tech</option>
                      <option>Marketing Digital</option>
                      <option>Fotografía y Video</option>
                      <option>Redacción y Traducción</option>
                      <option>Finanzas y Contabilidad</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#0a1628] mb-1.5 block">Presupuesto (USD)</label>
                    <input
                      type="number"
                      value={formBudget}
                      onChange={e => setFormBudget(e.target.value)}
                      placeholder="Ej: 500"
                      className="w-full bg-[#f0f4ff] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-[#1E56FF] text-[#0a1628] placeholder-[#94a3b8]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#0a1628] mb-1.5 block">Descripción del proyecto</label>
                    <textarea
                      value={formDesc}
                      onChange={e => setFormDesc(e.target.value)}
                      rows={3}
                      placeholder="Describe lo que necesitas..."
                      className="w-full bg-[#f0f4ff] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-[#1E56FF] text-[#0a1628] placeholder-[#94a3b8] resize-none"
                    />
                  </div>
                  <button
                    disabled={!formTitle}
                    onClick={() => setPosted(true)}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${formTitle ? 'bg-[#1E56FF] text-white hover:bg-[#0022AB]' : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'}`}
                  >
                    Publicar proyecto
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

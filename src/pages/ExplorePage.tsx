import { useState } from 'react'
import { SearchIcon, FilterIcon, StarIcon, MapPinIcon, BookmarkIcon, XIcon } from '../components/Icons'
import { talents, categories } from '../data/data'

interface Props {
  navigate: (page: string, params?: Record<string, string>) => void
  initialCategory?: string
}

const locations = ['Todos', 'Managua', 'León', 'Masaya', 'Estelí', 'Granada', 'Chinandega']
const availability = ['Todos', 'Disponible ahora', 'En los próximos días', 'Flexible']
const modalities = ['Todos', 'Presencial', 'Remoto', 'Híbrido']

export default function ExplorePage({ navigate, initialCategory }: Props) {
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState(initialCategory || 'all')
  const [selectedLoc, setSelectedLoc] = useState('Todos')
  const [selectedAvail, setSelectedAvail] = useState('Todos')
  const [selectedMod, setSelectedMod] = useState('Todos')
  const [showFilters, setShowFilters] = useState(false)
  const [savedIds, setSavedIds] = useState<string[]>(talents.filter(t => t.saved).map(t => t.id))

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const filtered = talents.filter(t => {
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.role.toLowerCase().includes(search.toLowerCase()) || t.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const matchCat = selectedCat === 'all' || t.category.toLowerCase().includes(selectedCat)
    const matchLoc = selectedLoc === 'Todos' || t.location === selectedLoc
    const matchAvail = selectedAvail === 'Todos' || (selectedAvail === 'Disponible ahora' ? t.available : true)
    return matchSearch && matchCat && matchLoc && matchAvail
  })

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="sticky top-0 bg-[#f0f4ff] z-10 px-4 pt-6 pb-3 space-y-3">
        <h1 className="text-xl font-bold text-[#0a1628]">Explorar talentos</h1>
        <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm border border-[#e2e8f0] focus-within:border-[#1E56FF] transition-colors">
          <SearchIcon size={18} className="text-[#94a3b8] flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar servicio o talento..."
            className="flex-1 bg-transparent text-sm text-[#0a1628] placeholder-[#94a3b8] outline-none"
            autoFocus
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-[#94a3b8] hover:text-[#64748b]">
              <XIcon size={16} />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-1.5 rounded-lg transition-colors ${showFilters ? 'bg-[#1E56FF] text-white' : 'bg-[#f0f4ff] text-[#1E56FF]'}`}
          >
            <FilterIcon size={16} />
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <FilterChip label="Categoría" value={selectedCat !== 'all' ? categories.find(c => c.id === selectedCat)?.label : undefined} onClear={() => setSelectedCat('all')} />
          <FilterChip label={selectedLoc !== 'Todos' ? selectedLoc : 'Localidad'} active={selectedLoc !== 'Todos'} onClear={() => setSelectedLoc('Todos')} />
          <FilterChip label={selectedAvail !== 'Todos' ? selectedAvail : 'Disponibilidad'} active={selectedAvail !== 'Todos'} onClear={() => setSelectedAvail('Todos')} />
          <FilterChip label={selectedMod !== 'Todos' ? selectedMod : 'Modalidad'} active={selectedMod !== 'Todos'} onClear={() => setSelectedMod('Todos')} />
        </div>
      </div>

      <div className="flex gap-4 px-4 pb-6">
        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-3 pt-1">
            <button
              onClick={() => setSelectedCat('all')}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${selectedCat === 'all' ? 'bg-[#1E56FF] text-white' : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:border-[#1E56FF]'}`}
            >
              Todos
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${selectedCat === cat.id ? 'bg-[#1E56FF] text-white' : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:border-[#1E56FF]'}`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-xs text-[#64748b] mb-3 font-medium">
            {filtered.length} {filtered.length === 1 ? 'talento encontrado' : 'talentos encontrados'}
          </p>

          {/* Talent Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map(talent => (
              <div
                key={talent.id}
                onClick={() => navigate('talent-detail', { talentId: talent.id })}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] hover:shadow-md hover:border-[#c7d7ff] transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={talent.photo}
                      alt={talent.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    {talent.available && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10B981] rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-[#0a1628] text-sm group-hover:text-[#1E56FF] transition-colors">{talent.name}</h3>
                        <p className="text-xs text-[#64748b]">{talent.role}</p>
                      </div>
                      <button
                        onClick={(e) => toggleSave(talent.id, e)}
                        className={`p-1.5 rounded-lg transition-colors ${savedIds.includes(talent.id) ? 'text-[#1E56FF]' : 'text-[#94a3b8] hover:text-[#1E56FF]'}`}
                      >
                        <BookmarkIcon size={14} filled={savedIds.includes(talent.id)} />
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <StarIcon size={11} />
                      <span className="text-xs font-semibold text-[#0a1628]">{talent.rating}</span>
                      <span className="text-xs text-[#94a3b8]">({talent.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPinIcon size={11} className="text-[#94a3b8]" />
                      <span className="text-xs text-[#64748b]">{talent.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {talent.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-[#f0f4ff] text-[#1E56FF] text-[10px] font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                  {!talent.available && (
                    <span className="px-2 py-0.5 bg-[#fef3c7] text-[#92400e] text-[10px] font-medium rounded-full">
                      Ocupado
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f1f5f9]">
                  <span className="text-xs text-[#64748b]">
                    Desde <span className="font-bold text-[#0a1628]">${talent.hourlyRate}/hr</span>
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate('talent-detail', { talentId: talent.id }) }}
                    className="px-3 py-1.5 bg-[#1E56FF] text-white text-xs font-semibold rounded-lg hover:bg-[#0022AB] transition-colors"
                  >
                    Ver perfil
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <span className="text-5xl">🔍</span>
              <p className="text-[#0a1628] font-semibold mt-4">No encontramos talentos</p>
              <p className="text-sm text-[#64748b] mt-1">Intenta con otros términos de búsqueda</p>
              <button onClick={() => { setSearch(''); setSelectedCat('all') }} className="mt-4 px-4 py-2 bg-[#1E56FF] text-white text-sm font-semibold rounded-xl">
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-4 sticky top-40 space-y-5">
            <h3 className="font-bold text-[#0a1628] text-sm">Filtros inteligentes</h3>

            <FilterSection title="Localidad">
              {locations.map(loc => (
                <button
                  key={loc}
                  onClick={() => setSelectedLoc(loc)}
                  className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${selectedLoc === loc ? 'bg-[#1E56FF] text-white' : 'text-[#64748b] hover:bg-[#f0f4ff]'}`}
                >
                  {loc}
                </button>
              ))}
            </FilterSection>

            <FilterSection title="Disponibilidad">
              {availability.map(av => (
                <button
                  key={av}
                  onClick={() => setSelectedAvail(av)}
                  className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${selectedAvail === av ? 'bg-[#1E56FF] text-white' : 'text-[#64748b] hover:bg-[#f0f4ff]'}`}
                >
                  {av}
                </button>
              ))}
            </FilterSection>

            <FilterSection title="Modalidad">
              {modalities.map(mod => (
                <button
                  key={mod}
                  onClick={() => setSelectedMod(mod)}
                  className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${selectedMod === mod ? 'bg-[#1E56FF] text-white' : 'text-[#64748b] hover:bg-[#f0f4ff]'}`}
                >
                  {mod}
                </button>
              ))}
            </FilterSection>

            <FilterSection title="Tipo de servicio">
              <div className="grid grid-cols-3 gap-2">
                {[{ emoji: '💻', label: 'Diseño' }, { emoji: '📣', label: 'Mkt' }, { emoji: '📷', label: 'Foto/Video' }, { emoji: '⚡', label: 'Prog.' }, { emoji: '✍️', label: 'Texto' }, { emoji: '💰', label: 'Más' }].map(({ emoji, label }) => (
                  <button key={label} className="flex flex-col items-center gap-1 p-2 rounded-xl border border-[#e2e8f0] hover:border-[#1E56FF] hover:bg-[#f0f4ff] transition-all">
                    <span className="text-lg">{emoji}</span>
                    <span className="text-[9px] text-[#64748b] font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </FilterSection>

            <button
              onClick={() => { setSelectedCat('all'); setSelectedLoc('Todos'); setSelectedAvail('Todos'); setSelectedMod('Todos') }}
              className="w-full py-2.5 bg-[#1E56FF] text-white rounded-xl text-xs font-bold hover:bg-[#0022AB] transition-colors"
            >
              Aplicar Filtros
            </button>
            <button
              onClick={() => { setSelectedCat('all'); setSelectedLoc('Todos'); setSelectedAvail('Todos'); setSelectedMod('Todos'); setSearch('') }}
              className="w-full py-2 text-[#1E56FF] text-xs font-semibold hover:text-[#0022AB] transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterChip({ label, value, active, onClear }: { label: string; value?: string; active?: boolean; onClear: () => void }) {
  const isActive = active || !!value
  return (
    <button
      onClick={isActive ? onClear : undefined}
      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${isActive ? 'bg-[#1E56FF] text-white border-[#1E56FF]' : 'bg-white text-[#64748b] border-[#e2e8f0] hover:border-[#1E56FF]'}`}
    >
      {value || label}
      {isActive && <XIcon size={10} />}
    </button>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold text-[#0a1628] mb-2">{title}</p>
      {children}
    </div>
  )
}

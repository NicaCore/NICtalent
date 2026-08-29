import { useState } from 'react'
import { TrendingIcon, BriefcaseIcon, ShieldIcon, StarIcon } from '../components/Icons'

interface Props {
  onSelect: (type: 'talent' | 'client') => void
}

export default function OnboardingPage({ onSelect }: Props) {
  const [selected, setSelected] = useState<'talent' | 'client' | null>(null)

  return (
    <div className="min-h-full bg-gradient-to-br from-[#0022AB] via-[#1E56FF] to-[#1EE6FF] flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-4 shadow-xl">
          <span className="text-white font-extrabold text-4xl leading-none">N</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          NIC<span className="text-[#1EE6FF]">talent</span>
        </h1>
        <p className="text-white/80 mt-2 text-base font-medium">
          Conectamos talento con oportunidades en Nicaragua
        </p>
      </div>

      {/* Cards */}
      <div className="w-full max-w-md space-y-4 animate-slide-up">
        <p className="text-center text-white/90 font-semibold text-lg mb-6">
          ¿Cómo quieres usar NICtalent?
        </p>

        <button
          onClick={() => setSelected('talent')}
          className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
            selected === 'talent'
              ? 'bg-white border-white shadow-2xl scale-[1.02]'
              : 'bg-white/15 border-white/30 hover:bg-white/25 hover:border-white/50'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${selected === 'talent' ? 'bg-[#1E56FF]' : 'bg-white/20'}`}>
              <TrendingIcon className={selected === 'talent' ? 'text-white' : 'text-white'} size={28} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${selected === 'talent' ? 'text-[#0022AB]' : 'text-white'}`}>
                Soy talento
              </h2>
              <p className={`text-sm mt-0.5 ${selected === 'talent' ? 'text-[#64748b]' : 'text-white/75'}`}>
                Ofrece tus habilidades y consigue proyectos
              </p>
            </div>
            {selected === 'talent' && (
              <div className="ml-auto w-6 h-6 rounded-full bg-[#1E56FF] flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
        </button>

        <button
          onClick={() => setSelected('client')}
          className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
            selected === 'client'
              ? 'bg-white border-white shadow-2xl scale-[1.02]'
              : 'bg-white/15 border-white/30 hover:bg-white/25 hover:border-white/50'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${selected === 'client' ? 'bg-[#D4A017]' : 'bg-white/20'}`}>
              <BriefcaseIcon className="text-white" size={28} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${selected === 'client' ? 'text-[#0022AB]' : 'text-white'}`}>
                Busco talento
              </h2>
              <p className={`text-sm mt-0.5 ${selected === 'client' ? 'text-[#64748b]' : 'text-white/75'}`}>
                Encuentra profesionales para tus proyectos
              </p>
            </div>
            {selected === 'client' && (
              <div className="ml-auto w-6 h-6 rounded-full bg-[#D4A017] flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
        </button>

        <button
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 mt-4 ${
            selected
              ? 'bg-white text-[#1E56FF] shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]'
              : 'bg-white/20 text-white/50 cursor-not-allowed'
          }`}
        >
          Comenzar ahora →
        </button>
      </div>

      {/* Trust features */}
      <div className="mt-10 w-full max-w-md grid grid-cols-2 gap-3 animate-fade-in">
        {[
          { Icon: ShieldIcon, text: 'Perfiles verificados' },
          { Icon: StarIcon, text: 'Sin favoritismos' },
          { Icon: TrendingIcon, text: 'Primera oportunidad' },
          { Icon: BriefcaseIcon, text: 'Para todos' },
        ].map(({ Icon, text }, i) => (
          <div key={i} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5">
            <Icon className="text-[#1EE6FF]" size={16} />
            <span className="text-white/90 text-xs font-medium">{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

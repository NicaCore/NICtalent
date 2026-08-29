import {
  HomeIcon, SearchIcon, BriefcaseIcon, CoinsIcon, BellIcon,
  BookmarkIcon, UserIcon, SettingsIcon, MessageIcon, PlusIcon, HelpIcon,
} from './Icons'

type Page = string

interface NavItem {
  id: Page
  label: string
  Icon: React.FC<{ className?: string; size?: number }>
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Inicio', Icon: HomeIcon },
  { id: 'explore', label: 'Buscar', Icon: SearchIcon },
  { id: 'projects', label: 'Proyectos', Icon: BriefcaseIcon },
  { id: 'coins', label: 'Monedas', Icon: CoinsIcon },
  { id: 'notifications', label: 'Notificaciones', Icon: BellIcon },
  { id: 'saved', label: 'Guardados', Icon: BookmarkIcon },
  { id: 'profile', label: 'Mi Perfil', Icon: UserIcon },
]

const bottomItems: NavItem[] = [
  { id: 'settings', label: 'Configuración', Icon: SettingsIcon },
  { id: 'help', label: 'Ayuda', Icon: HelpIcon },
]

interface Props {
  currentPage: Page
  navigate: (page: Page) => void
  unreadNotifications?: number
  unreadMessages?: number
  children: React.ReactNode
}

export default function Layout({ currentPage, navigate, unreadNotifications = 3, unreadMessages = 3, children }: Props) {
  return (
    <div className="flex h-full bg-[#f0f4ff]">
      {/* Tablet/Desktop Side Nav */}
      <aside className="hidden md:flex flex-col bg-white border-r border-[#e2e8f0] w-16 lg:w-60 flex-shrink-0 shadow-sm z-20">
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-[#e2e8f0]">
          <div className="w-9 h-9 rounded-xl nictalent-gradient flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg leading-none">N</span>
          </div>
          <span className="hidden lg:block text-xl font-bold text-[#0022AB] tracking-tight">
            NIC<span className="text-[#1E56FF]">talent</span>
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(({ id, label, Icon }) => {
            const isActive = currentPage === id
            const hasBadge = (id === 'notifications' && unreadNotifications > 0) || (id === 'messages' && unreadMessages > 0)
            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 w-full text-left relative ${
                  isActive
                    ? 'bg-[#1E56FF] text-white shadow-md shadow-blue-200'
                    : 'text-[#64748b] hover:bg-[#f0f4ff] hover:text-[#1E56FF]'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="hidden lg:block text-sm font-medium">{label}</span>
                {hasBadge && (
                  <span className={`absolute top-1.5 ${isActive ? 'right-2' : 'left-5 lg:left-auto lg:right-2'} w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center`}>
                    {id === 'notifications' ? unreadNotifications : unreadMessages}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom items */}
        <div className="border-t border-[#e2e8f0] py-4 px-2 flex flex-col gap-1">
          {bottomItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 w-full text-left ${
                currentPage === id
                  ? 'bg-[#1E56FF] text-white'
                  : 'text-[#64748b] hover:bg-[#f0f4ff] hover:text-[#1E56FF]'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="hidden lg:block text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Desktop Top Search Bar */}
        <header className="hidden lg:flex items-center gap-4 bg-white border-b border-[#e2e8f0] px-6 py-3 shadow-sm z-10">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-2 bg-[#f0f4ff] rounded-xl px-4 py-2.5">
              <SearchIcon size={18} className="text-[#64748b]" />
              <input
                type="text"
                placeholder="Busca servicio o talento..."
                className="flex-1 bg-transparent text-sm text-[#0a1628] placeholder-[#94a3b8] outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('messages')}
              className="relative p-2.5 rounded-xl hover:bg-[#f0f4ff] text-[#64748b] hover:text-[#1E56FF] transition-colors"
            >
              <MessageIcon size={20} />
              {unreadMessages > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('notifications')}
              className="relative p-2.5 rounded-xl hover:bg-[#f0f4ff] text-[#64748b] hover:text-[#1E56FF] transition-colors"
            >
              <BellIcon size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('profile')}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#f0f4ff] transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop"
                alt="Mi perfil"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-[#0a1628]">Ana H.</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e8f0] z-30 shadow-lg">
          <div className="flex items-center justify-around px-2 py-2">
            {/* Inicio */}
            <MobileNavBtn icon={<HomeIcon size={22} />} label="Inicio" active={currentPage === 'home'} onClick={() => navigate('home')} />
            {/* Buscar */}
            <MobileNavBtn icon={<SearchIcon size={22} />} label="Buscar" active={currentPage === 'explore'} onClick={() => navigate('explore')} />
            {/* FAB + */}
            <button
              onClick={() => navigate('projects')}
              className="w-14 h-14 -mt-5 rounded-full bg-[#1E56FF] shadow-lg shadow-blue-300 flex items-center justify-center text-white active:scale-95 transition-transform"
            >
              <PlusIcon size={26} />
            </button>
            {/* Mensajes */}
            <MobileNavBtn
              icon={
                <span className="relative inline-flex">
                  <MessageIcon size={22} />
                  {unreadMessages > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] text-white font-bold flex items-center justify-center">{unreadMessages}</span>}
                </span>
              }
              label="Mensajes"
              active={currentPage === 'messages'}
              onClick={() => navigate('messages')}
            />
            {/* Más → Profile */}
            <MobileNavBtn icon={<UserIcon size={22} />} label="Más" active={['profile', 'settings', 'saved', 'coins', 'notifications'].includes(currentPage)} onClick={() => navigate('profile')} />
          </div>
        </nav>
      </div>
    </div>
  )
}

function MobileNavBtn({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-0.5 px-3 py-1 min-w-[3rem]">
      <span className={active ? 'text-[#1E56FF]' : 'text-[#94a3b8]'}>{icon}</span>
      <span className={`text-[10px] font-medium ${active ? 'text-[#1E56FF]' : 'text-[#94a3b8]'}`}>{label}</span>
    </button>
  )
}

// pages/MessagesPage.tsx

import { useState } from 'react'
import { SearchIcon, SendIcon, ChevronLeftIcon } from '../components/Icons'
import { conversations, chatMessages, User } from '../data/data'

interface Props {
  navigate: (page: string, params?: Record<string, string>) => void
  initialConvId?: string
  currentUser: User
}

export default function MessagesPage({ navigate, initialConvId, currentUser }: Props) {
  const [activeConv, setActiveConv] = useState<string | null>(initialConvId || null)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [localMessages, setLocalMessages] = useState(chatMessages)

  const userConversations = conversations.filter(c => c.participants.includes(currentUser.id))

  const filtered = userConversations.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  )

  const conv = activeConv ? userConversations.find(c => c.id === activeConv) : null
  const msgs = activeConv ? (localMessages[activeConv] || []) : []

  const sendMessage = () => {
    if (!message.trim() || !activeConv) return
    const newMsg = {
      id: `m${Date.now()}`,
      conversationId: activeConv,
      from: currentUser.id,
      to: conv?.participants.find(p => p !== currentUser.id) || '',
      text: message.trim(),
      time: 'Ahora',
      read: false
    }
    setLocalMessages(prev => ({ ...prev, [activeConv]: [...(prev[activeConv] || []), newMsg] }))
    setMessage('')
  }

  if (userConversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <span className="text-6xl">💬</span>
          <p className="text-[#0a1628] font-semibold mt-4 text-lg">Sin conversaciones</p>
          <p className="text-sm text-[#64748b] mt-1">Aún no tienes mensajes</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full max-h-full overflow-hidden">
      <div className={`flex flex-col bg-white border-r border-[#e2e8f0] ${activeConv ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-shrink-0`}>
        <div className="px-4 pt-6 pb-3">
          <h1 className="text-xl font-bold text-[#0a1628] mb-3">Mensajes</h1>
          <div className="flex items-center gap-2 bg-[#f0f4ff] rounded-xl px-4 py-2.5">
            <SearchIcon size={16} className="text-[#94a3b8]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar conversación..."
              className="flex-1 text-sm text-[#0a1628] placeholder-[#94a3b8] outline-none bg-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <span className="text-4xl">💬</span>
              <p className="text-[#64748b] text-sm mt-3">No hay conversaciones</p>
            </div>
          )}
          {filtered.map(conv => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 border-b border-[#f1f5f9] hover:bg-[#f8faff] transition-colors text-left ${activeConv === conv.id ? 'bg-[#f0f4ff]' : ''}`}
            >
              <div className="relative">
                <img src={conv.photo} alt={conv.name} className="w-12 h-12 rounded-full object-cover" />
                {conv.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#1E56FF] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-sm text-[#0a1628] truncate">{conv.name}</span>
                  <span className="text-[10px] text-[#94a3b8] flex-shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className="text-xs text-[#94a3b8] truncate">{conv.role}</p>
                <p className={`text-xs truncate mt-0.5 ${conv.unread > 0 ? 'font-semibold text-[#0a1628]' : 'text-[#94a3b8]'}`}>
                  {conv.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={`flex-1 flex flex-col min-w-0 bg-[#f8faff] ${activeConv ? 'flex' : 'hidden md:flex'}`}>
        {conv ? (
          <>
            <div className="flex items-center gap-3 px-4 py-3.5 bg-white border-b border-[#e2e8f0] shadow-sm">
              <button
                onClick={() => setActiveConv(null)}
                className="md:hidden p-2 rounded-xl hover:bg-[#f0f4ff] text-[#64748b]"
              >
                <ChevronLeftIcon size={20} />
              </button>
              <img src={conv.photo} alt={conv.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h2 className="font-bold text-[#0a1628] text-sm">{conv.name}</h2>
                <p className="text-xs text-[#64748b]">{conv.role}</p>
              </div>
              <button
                onClick={() => navigate('talent-detail', { talentId: conv.talentId })}
                className="ml-auto px-3 py-1.5 border border-[#1E56FF] text-[#1E56FF] text-xs font-semibold rounded-lg hover:bg-[#f0f4ff] transition-colors"
              >
                Ver perfil
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {msgs.map(msg => {
                const isFromMe = msg.from === currentUser.id
                return (
                  <div key={msg.id} className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}>
                    {!isFromMe && (
                      <img src={conv.photo} alt="" className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0 self-end" />
                    )}
                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${isFromMe ? 'bg-[#1E56FF] text-white rounded-br-sm' : 'bg-white text-[#0a1628] border border-[#e2e8f0] rounded-bl-sm'}`}>
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${isFromMe ? 'text-white/60' : 'text-[#94a3b8]'}`}>{msg.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="px-4 py-3 bg-white border-t border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-[#f0f4ff] rounded-xl px-4 py-3 text-sm text-[#0a1628] placeholder-[#94a3b8] outline-none focus:ring-2 ring-[#1E56FF]"
                />
                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${message.trim() ? 'bg-[#1E56FF] text-white hover:bg-[#0022AB]' : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'}`}
                >
                  <SendIcon size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl">💬</span>
              <p className="text-[#0a1628] font-semibold mt-4 text-lg">Selecciona una conversación</p>
              <p className="text-sm text-[#64748b] mt-1">Elige una conversación para comenzar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
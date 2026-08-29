// pages/CoinsPage.tsx

import { useState } from 'react'
import { WalletIcon, TrendingIcon, XIcon } from '../components/Icons'
import { transactions, User } from '../data/data'

interface Props {
  navigate: (page: string) => void
  currentUser: User
}

const packs = [
  { id: 'p1', amount: 50, price: 5, bonus: '' },
  { id: 'p2', amount: 100, price: 9, bonus: '+10 bonus', popular: true },
  { id: 'p3', amount: 250, price: 20, bonus: '+40 bonus' },
  { id: 'p4', amount: 500, price: 35, bonus: '+100 bonus' },
]

export default function CoinsPage({ navigate, currentUser }: Props) {
  const userTransactions = transactions.filter(t => t.userId === currentUser.id)
  const [balance, setBalance] = useState(currentUser.coins || 120)
  const [showRecharge, setShowRecharge] = useState(false)
  const [localTx, setLocalTx] = useState(userTransactions)
  const [recharged, setRecharged] = useState(false)
  const [selectedPack, setSelectedPack] = useState<string | null>(null)

  const handleRecharge = () => {
    const pack = packs.find(p => p.id === selectedPack)
    if (!pack) return
    const bonus = parseInt(pack.bonus?.replace(/\D/g, '') || '0')
    const total = pack.amount + bonus
    setBalance(prev => prev + total)
    setLocalTx(prev => [
      { id: `t${Date.now()}`, userId: currentUser.id, type: 'credit' as const, amount: total, description: `Recarga de ${pack.amount} monedas`, date: 'Ahora' },
      ...prev,
    ])
    setRecharged(true)
  }

  if (localTx.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-[#0a1628] mb-5">Mis Monedas</h1>
        <div className="nictalent-gradient rounded-2xl p-6 text-white shadow-lg mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <WalletIcon size={22} className="text-white" />
            </div>
            <div>
              <p className="text-white/75 text-xs font-medium">Saldo disponible</p>
              <p className="text-3xl font-extrabold">{balance} <span className="text-lg font-semibold text-white/80">monedas</span></p>
            </div>
          </div>
          <button
            onClick={() => setShowRecharge(true)}
            className="mt-4 w-full py-3 bg-white text-[#1E56FF] rounded-xl font-bold text-sm hover:bg-[#f0f4ff] transition-colors"
          >
            Recargar monedas
          </button>
        </div>
        <div className="text-center py-8 bg-white rounded-2xl border border-[#e2e8f0]">
          <span className="text-4xl">💰</span>
          <p className="text-[#0a1628] font-semibold mt-3">Sin transacciones</p>
          <p className="text-sm text-[#64748b]">Aún no tienes movimientos en tu cuenta</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-[#0a1628] mb-5">Mis Monedas</h1>

      <div className="nictalent-gradient rounded-2xl p-6 text-white shadow-lg mb-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <WalletIcon size={22} className="text-white" />
          </div>
          <div>
            <p className="text-white/75 text-xs font-medium">Saldo disponible</p>
            <p className="text-3xl font-extrabold">{balance} <span className="text-lg font-semibold text-white/80">monedas</span></p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white/75 text-xs">
          <TrendingIcon size={14} />
          <span>~${(balance * 0.10).toFixed(2)} USD equivalente</span>
        </div>
        <button
          onClick={() => setShowRecharge(true)}
          className="mt-4 w-full py-3 bg-white text-[#1E56FF] rounded-xl font-bold text-sm hover:bg-[#f0f4ff] transition-colors"
        >
          Recargar monedas
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] mb-5">
        <h3 className="font-bold text-[#0a1628] text-sm mb-3">¿Cómo usar las monedas?</h3>
        <div className="space-y-2">
          {[
            { emoji: '💬', label: 'Contactar talento', cost: '10 monedas' },
            { emoji: '⭐', label: 'Destacar tu perfil (7 días)', cost: '5 monedas' },
            { emoji: '📋', label: 'Publicar proyecto premium', cost: '15 monedas' },
            { emoji: '🔍', label: 'Búsqueda avanzada', cost: '3 monedas' },
          ].map(({ emoji, label, cost }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-[#f1f5f9] last:border-0">
              <span className="flex items-center gap-2 text-sm text-[#0a1628]">
                <span>{emoji}</span>
                {label}
              </span>
              <span className="text-xs font-bold text-[#D4A017]">{cost}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-[#0a1628] text-sm mb-3">Historial de transacciones</h2>
        <div className="space-y-2">
          {localTx.map(tx => (
            <div key={tx.id} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-[#e2e8f0]">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === 'credit' ? 'bg-[#dcfce7]' : 'bg-[#fee2e2]'}`}>
                <span className="text-base">{tx.type === 'credit' ? '⬆️' : '⬇️'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0a1628] truncate">{tx.description}</p>
                <p className="text-xs text-[#94a3b8]">{tx.date}</p>
              </div>
              <span className={`font-bold text-sm flex-shrink-0 ${tx.type === 'credit' ? 'text-[#10B981]' : 'text-red-500'}`}>
                {tx.type === 'credit' ? '+' : '-'}{tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showRecharge && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4" onClick={() => { setShowRecharge(false); setRecharged(false); setSelectedPack(null) }}>
          <div className="bg-white rounded-3xl w-full max-w-md p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            {recharged ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#dcfce7] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="text-xl font-bold text-[#0a1628]">¡Recarga exitosa!</h3>
                <p className="text-sm text-[#64748b] mt-2">Tus monedas han sido acreditadas.</p>
                <p className="text-2xl font-extrabold text-[#1E56FF] mt-3">Saldo: {balance} monedas</p>
                <button
                  onClick={() => { setShowRecharge(false); setRecharged(false); setSelectedPack(null) }}
                  className="mt-6 px-6 py-3 bg-[#1E56FF] text-white rounded-xl font-semibold"
                >
                  ¡Perfecto!
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-[#0a1628]">Recargar monedas</h2>
                  <button onClick={() => setShowRecharge(false)} className="p-2 rounded-xl hover:bg-[#f0f4ff] text-[#64748b]">
                    <XIcon size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {packs.map(pack => (
                    <button
                      key={pack.id}
                      onClick={() => setSelectedPack(pack.id)}
                      className={`relative p-4 rounded-2xl border-2 transition-all text-center ${selectedPack === pack.id ? 'border-[#1E56FF] bg-[#f0f4ff]' : 'border-[#e2e8f0] hover:border-[#c7d7ff]'}`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#D4A017] text-white text-[9px] font-bold rounded-full whitespace-nowrap">
                          MÁS POPULAR
                        </span>
                      )}
                      <p className="text-2xl font-extrabold text-[#0a1628]">{pack.amount}</p>
                      <p className="text-xs text-[#64748b]">monedas</p>
                      {pack.bonus && <p className="text-xs font-semibold text-[#10B981] mt-1">{pack.bonus}</p>}
                      <p className="text-sm font-bold text-[#1E56FF] mt-2">${pack.price} USD</p>
                    </button>
                  ))}
                </div>
                <button
                  disabled={!selectedPack}
                  onClick={handleRecharge}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${selectedPack ? 'bg-[#1E56FF] text-white hover:bg-[#0022AB]' : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'}`}
                >
                  {selectedPack ? `Recargar con PayPal / Tarjeta` : 'Selecciona un paquete'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
function StatBar({ label, value, tone }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0))

  const toneClasses = {
    gold: { fill: 'from-amber-400/70 to-yellow-600/70', glow: 'shadow-amber-500/20' },
    silver: { fill: 'from-slate-300/70 to-slate-500/70', glow: 'shadow-slate-400/20' },
    platinum: { fill: 'from-gray-300/70 to-gray-500/70', glow: 'shadow-gray-400/20' },
    copper: { fill: 'from-orange-500/70 to-red-700/70', glow: 'shadow-orange-500/20' },
    other: { fill: 'from-white/20 to-white/30', glow: 'shadow-white/10' },
  }

  const { fill, glow } = toneClasses[tone] || toneClasses.other

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/60 font-light tracking-wide">{label}</span>
          <span className="text-xs text-white/45 font-light tabular-nums">
            {pct.toFixed(1)}%
          </span>
        </div>

        <div className="h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${fill} ${glow} transition-all duration-700`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="hidden sm:block text-[10px] text-white/25 tracking-widest uppercase">
        {Math.round(pct)}%
      </div>
    </div>
  )
}

export default function StatsModal({
  isOpen,
  stats,
  onClose,
  formatEUR,
  formatMonthLabel,
}) {
  if (!isOpen || !stats) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* subtle ambient glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-slate-400/10 rounded-full blur-3xl" />

        <div className="relative p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
              <span className="text-lg">📊</span>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-light tracking-wide text-white/85">
                Collection Stats
              </h3>
              <p className="text-xs font-light tracking-widest uppercase text-white/35 mt-1">
                Based on current filters
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT — KPI + Insights */}
            <div className="lg:col-span-1 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] tracking-widest uppercase text-white/35 mb-2">
                  Total coins
                </div>
                <div className="text-2xl font-light text-white/85">{stats.total}</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] tracking-widest uppercase text-white/35 mb-2">
                  Avg. price
                </div>
                <div className="text-2xl font-light text-white/85">{formatEUR(stats.avg)}</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] tracking-widest uppercase text-white/35 mb-2">
                  Most expensive
                </div>
                <div className="text-sm text-white/80 font-light line-clamp-1">
                  {stats.mostExpensive ? stats.mostExpensive.name : '—'}
                </div>
                <div className="text-xs text-white/40 font-light mt-1">
                  {stats.mostExpensive ? formatEUR(Number(stats.mostExpensive.price || 0)) : ''}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] tracking-widest uppercase text-white/35 mb-2">
                  Highest spending month
                </div>
                <div className="text-sm text-white/80 font-light">
                  {stats.highestMonthEntry ? `${formatMonthLabel(stats.highestMonthEntry[0])}` : '—'}
                </div>
                <div className="text-xs text-white/40 font-light mt-1">
                  {stats.highestMonthEntry ? formatEUR(stats.highestMonthEntry[1]) : ''}
                </div>
              </div>
            </div>

            {/* RIGHT — Material Distribution */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs font-light tracking-widest uppercase text-white/40">
                  Material Distribution
                </div>
                <div className="text-[10px] tracking-widest uppercase text-white/30">%</div>
              </div>

              <div className="space-y-5">
                <StatBar label="Gold" value={stats.goldPct} tone="gold" />
                <StatBar label="Silver" value={stats.silverPct} tone="silver" />
                <StatBar label="Platinum" value={stats.platinumPct} tone="platinum" />
                <StatBar label="Copper" value={stats.copperPct} tone="copper" />
                <StatBar label="Other" value={stats.otherPct} tone="other" />
              </div>
            </div>
          </div>

          {/* Bottom insights */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-[10px] tracking-widest uppercase text-white/35 mb-2">
                Spend this month
              </div>
              <div className="text-sm text-white/80 font-light">{formatEUR(stats.spendThisMonth)}</div>
              <div className="text-xs text-white/40 font-light mt-1">Current month total</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
              <div className="text-[10px] tracking-widest uppercase text-white/35 mb-2">
                Highest spending month
              </div>
              <div className="text-sm text-white/80 font-light">
                {stats.highestMonthEntry
                  ? `${formatMonthLabel(stats.highestMonthEntry[0])} — ${formatEUR(stats.highestMonthEntry[1])}`
                  : '—'}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-light tracking-widest uppercase text-white/70 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

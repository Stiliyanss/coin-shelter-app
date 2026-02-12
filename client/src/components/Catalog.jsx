import { useMemo, useState } from "react";
import CoinDetails from "./CoinDetails";

function Catalog({ coins, onAddCoin, onEditCoin, onDeleteCoin }) {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [sortOrder, setSortOrder] = useState("none");
  const [materialFilter, setMaterialFilter] = useState("all");
  const [showStats, setShowStats] = useState(false);


  const visibleCoins = useMemo(() => {
    // 1) filter
    let list = [...coins];
    if (materialFilter !== "all") {
      list = list.filter((c) => {
        const m = (c.material ?? "").toString().toLowerCase();
        return m === materialFilter;
      });
    }

    // 2) sort
    if (sortOrder === "price_asc") {
      list.sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));
    } else if (sortOrder === "price_desc") {
      list.sort((a, b) => Number(b.price ?? 0) - Number(a.price ?? 0));
    } else if (sortOrder === 'date_asc') {
  list.sort((a, b) => {
    const da = a.purchased_at ? new Date(a.purchased_at).getTime() : Infinity
    const db = b.purchased_at ? new Date(b.purchased_at).getTime() : Infinity
    return da - db
  })
} else if (sortOrder === 'date_desc') {
  list.sort((a, b) => {
    const da = a.purchased_at ? new Date(a.purchased_at).getTime() : -Infinity
    const db = b.purchased_at ? new Date(b.purchased_at).getTime() : -Infinity
    return db - da
  })
}

    return list;
  }, [coins, sortOrder, materialFilter]);

  const totalValue = useMemo(() => {
    return visibleCoins.reduce((sum, c) => sum + (Number(c.price) || 0), 0);
  }, [visibleCoins]);

  const formatEUR = (value) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    }).format(value);

    const formatMonthLabel = (yyyyMm) => {
  // yyyyMm: "YYYY-MM"
  const [y, m] = yyyyMm.split('-').map(Number)
  const d = new Date(y, (m || 1) - 1, 1)
  return new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(d)
}

const clampPct = (n) => Math.max(0, Math.min(100, n))

const stats = useMemo(() => {
  const total = visibleCoins.length
  if (!total) return null

  const counts = visibleCoins.reduce((acc, coin) => {
    const m = (coin.material ?? 'other').toString().toLowerCase() || 'other'
    acc[m] = (acc[m] || 0) + 1
    return acc
  }, {})

  const pct = (key) => clampPct(((counts[key] || 0) / total) * 100)

  // Spending by month (uses purchased_at)
  const spendingByMonth = {}
  visibleCoins.forEach((coin) => {
    if (!coin.purchased_at) return
    const monthKey = coin.purchased_at.slice(0, 7) // YYYY-MM
    spendingByMonth[monthKey] = (spendingByMonth[monthKey] || 0) + Number(coin.price || 0)
  })

  const highestMonthEntry = Object.entries(spendingByMonth).sort((a, b) => b[1] - a[1])[0] || null

  // Spend this month (nice extra)
  const now = new Date()
  const thisMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const spendThisMonth = spendingByMonth[thisMonthKey] || 0

  // Most expensive coin
  const mostExpensive = [...visibleCoins].sort((a, b) => Number(b.price || 0) - Number(a.price || 0))[0] || null

  // Average price
  const avg =
    visibleCoins.reduce((sum, c) => sum + Number(c.price || 0), 0) / total

  return {
    total,
    goldPct: pct('gold'),
    silverPct: pct('silver'),
    platinumPct: pct('platinum'),
    copperPct: pct('copper'),
    otherPct: pct('other'),
    highestMonthEntry,
    spendThisMonth,
    avg,
    mostExpensive,
  }
}, [visibleCoins])


  const getMaterialColor = (material) => {
    const m = (material ?? "").toString().toLowerCase();
    switch (m) {
      case "gold":
        return "from-amber-400 to-yellow-600";
      case "silver":
        return "from-slate-300 to-slate-500";
      case "platinum":
        return "from-gray-300 to-gray-500";
      case "copper":
        return "from-orange-600 to-red-700";
      default:
        return "from-white/20 to-white/40";
    }
  };

  const getMaterialGlow = (material) => {
    const m = (material ?? "").toString().toLowerCase();
    switch (m) {
      case "gold":
        return "shadow-amber-500/50";
      case "silver":
        return "shadow-slate-400/50";
      case "platinum":
        return "shadow-gray-400/50";
      case "copper":
        return "shadow-orange-500/50";
      default:
        return "shadow-white/20";
    }
  };

  if (selectedCoin) {
    return (
      <CoinDetails
        coin={selectedCoin}
        onBack={() => setSelectedCoin(null)}
        onEdit={onEditCoin}
        onDelete={onDeleteCoin}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {coins.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-12 relative">
            <div className="w-32 h-32 rounded-full border border-white/10 bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center backdrop-blur-sm">
              <div className="w-20 h-20 rounded-full border-2 border-amber-400/30 flex items-center justify-center">
                <span className="text-4xl opacity-50">🪙</span>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50 animate-pulse"></div>
            <div
              className="absolute -bottom-1 -left-1 w-3 h-3 bg-slate-400 rounded-full shadow-lg shadow-slate-400/50 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <h2 className="text-3xl font-light tracking-wide text-white/80 mb-4">
            No Coins Yet
          </h2>
          <p className="text-sm text-white/40 font-light tracking-wide max-w-sm mb-12 leading-relaxed">
            Start building your collection by adding your first coin
          </p>

          <button
            onClick={onAddCoin}
            className="group relative px-8 py-3 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-amber-400/50"
          >
            <span className="text-sm font-light tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
              Add Coin
            </span>
            <div className="absolute inset-0 border border-amber-400/0 group-hover:border-amber-400/30 transition-all duration-300"></div>
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-xl font-light tracking-wide text-white/70 mb-2">
                Your Collection
              </h2>
              <p className="text-sm text-white/40 font-light">
                Showing {visibleCoins.length} of {coins.length}{" "}
                {coins.length === 1 ? "coin" : "coins"}
              </p>

              <div className="mt-4 sm:mt-3 inline-block px-5 py-3 border border-white/10 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-xs font-light tracking-widest uppercase text-white/40 mb-1">
                  Total value
                </div>
                <div className="text-xl sm: text-2xl font-light text-white/85 tracking-wide">
                  {formatEUR(totalValue)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
  <button
  onClick={() => setShowStats(true)}
  className="w-full sm:w-auto px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-light tracking-widest uppercase text-white/70 transition-all duration-300"
>
  Stats
</button>

                <div className="flex flex-col">
                  <label className="block text-xs font-light tracking-widest uppercase text-white/40 mb-2">
                    Material
                  </label>
                  <select
                    value={materialFilter}
                    onChange={(e) => setMaterialFilter(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                  >
                    <option value="all" className="bg-black">
                      All
                    </option>
                    <option value="gold" className="bg-black">
                      Gold
                    </option>
                    <option value="silver" className="bg-black">
                      Silver
                    </option>
                    <option value="platinum" className="bg-black">
                      Platinum
                    </option>
                    <option value="copper" className="bg-black">
                      Copper
                    </option>
                    <option value="other" className="bg-black">
                      Other
                    </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="block text-xs font-light tracking-widest uppercase text-white/40 mb-2">
                    Sort by
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                  >
                    <option value="none" className="bg-black">
                      Default
                    </option>
                    <option value="price_asc" className="bg-black">
                      Price: Low → High
                    </option>
                    <option value="price_desc" className="bg-black">
                      Price: High → Low
                    </option>
                     <option value="date_desc" className="bg-black">
                      Purchase date: New → Old
                    </option>
                    <option value="date_asc" className="bg-black">
                      Purchase date: Old → New
                    </option>
                  </select>
                </div>
              </div>

              {(materialFilter !== "all" || sortOrder !== "none") && (
                <button
                  onClick={() => {
                    setMaterialFilter("all");
                    setSortOrder("none");
                  }}
                  className="text-xs font-light tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleCoins.map((coin) => {
              const mat = (coin.material ?? '').toString().toLowerCase()

              return(
              <div
                key={coin.id}
                className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-amber-400/30 transition-all duration-300 backdrop-blur-sm"
              >
                {/* Material indicator */}
                <div
                  className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br ${getMaterialColor(coin.material)} shadow-lg ${getMaterialGlow(coin.material)}`}
                ></div>

                {/* Coin Image */}
                <div className="aspect-square bg-white/5 flex items-center justify-center overflow-hidden">
                  {coin.image ? (
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getMaterialColor(coin.material)}/20 ${coin.image ? "hidden" : ""}`}
                  >
                    <span className="text-6xl opacity-30">🪙</span>
                  </div>
                </div>

                {/* Coin Info */}
                <div className="p-5">
                  <h3 className="text-lg font-light text-white/90 mb-2 line-clamp-2">
                    {coin.name}
                  </h3>

                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getMaterialColor(coin.material)}/20 text-white/70 font-light tracking-wide border`}
                      style={{
                        borderColor:
    mat === "gold"
      ? "rgba(251, 191, 36, 0.3)"
      : mat === "silver"
        ? "rgba(148, 163, 184, 0.3)"
        : mat === "platinum"
          ? "rgba(156, 163, 175, 0.3)"
          : mat === "copper"
            ? "rgba(234, 88, 12, 0.3)"
            : "rgba(255, 255, 255, 0.1)",
}}
                    >
                      {coin.material}
                    </span>
                    <span className="text-lg font-light text-white/90">
                      €{parseFloat(coin.price || 0).toFixed(2)}
                    </span>
                  </div>

                  {coin.purchased_at && (
                    <div className="flex items-center gap-2 text-xs font-light tracking-widest uppercase text-amber-400/70 mb-2">
                      Purchased on: {coin.purchased_at}
                    </div>
                  )}

                  {coin.description && (
                    <p className="text-xs text-white/50 font-light leading-relaxed line-clamp-2 mb-4">
                      {coin.description}
                    </p>
                  )}

                  <div className="pt-3 border-t border-white/5 flex gap-2">
                    <button
                      onClick={() => setSelectedCoin(coin)}
                      className="flex-1 text-xs font-light tracking-widest uppercase text-white/50 hover:text-white/70 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCoin(coin);
                      }}
                      className="px-3 py-1 text-xs font-light tracking-widest uppercase text-amber-400/70 hover:text-amber-400 border border-amber-400/30 hover:border-amber-400/50 rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCoin(coin.id);
                      }}
                      className="px-3 py-1 text-xs font-light tracking-widest uppercase text-red-400/70 hover:text-red-400 border border-red-400/30 hover:border-red-400/50 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </>
      )}

      {showStats && stats && (
  <div
    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={() => setShowStats(false)}
  >
    <div
      className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* subtle ambient glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-slate-400/10 rounded-full blur-3xl" />

      <div className="relative p-6 sm:p-7">
        <button
          onClick={() => setShowStats(false)}
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

        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] tracking-widest uppercase text-white/35 mb-2">
              Total coins
            </div>
            <div className="text-2xl font-light text-white/85">
              {stats.total}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] tracking-widest uppercase text-white/35 mb-2">
              Avg. price
            </div>
            <div className="text-2xl font-light text-white/85">
              {formatEUR(stats.avg)}
            </div>
          </div>
        </div>

        {/* Material distribution */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-light tracking-widest uppercase text-white/40">
              Material distribution
            </div>
            <div className="text-[10px] tracking-widest uppercase text-white/30">
              %
            </div>
          </div>

          <div className="space-y-4">
            <StatBar label="Gold" value={stats.goldPct} tone="gold" />
            <StatBar label="Silver" value={stats.silverPct} tone="silver" />
            <StatBar label="Platinum" value={stats.platinumPct} tone="platinum" />
            <StatBar label="Copper" value={stats.copperPct} tone="copper" />
            <StatBar label="Other" value={stats.otherPct} tone="other" />
          </div>
        </div>

        {/* Insights */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              Spend this month
            </div>
            <div className="text-sm text-white/80 font-light">
              {formatEUR(stats.spendThisMonth)}
            </div>
            <div className="text-xs text-white/40 font-light mt-1">
              Current month total
            </div>
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
            onClick={() => setShowStats(false)}
            className="px-5 py-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-light tracking-widest uppercase text-white/70 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

function StatBar({ label, value, tone }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0))

  const toneClasses = {
    gold: {
      fill: 'from-amber-400/70 to-yellow-600/70',
      glow: 'shadow-amber-500/20'
    },
    silver: {
      fill: 'from-slate-300/70 to-slate-500/70',
      glow: 'shadow-slate-400/20'
    },
    platinum: {
      fill: 'from-gray-300/70 to-gray-500/70',
      glow: 'shadow-gray-400/20'
    },
    copper: {
      fill: 'from-orange-500/70 to-red-700/70',
      glow: 'shadow-orange-500/20'
    },
    other: {
      fill: 'from-white/20 to-white/30',
      glow: 'shadow-white/10'
    }
  }

  const { fill, glow } = toneClasses[tone] || toneClasses.other

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/60 font-light tracking-wide">
            {label}
          </span>
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


export default Catalog;

import { useMemo, useState } from "react";
import CoinDetails from "./CoinDetails";
import EmptyCatalog from "./EmptyCatalog";
import StatsModal from "./StatsModal";
import CoinCard from "./CoinCard";
import MaterialFilter from "./MaterialFIlter";
import SortSelect from "./SortSelect";

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
        <EmptyCatalog onAddCoin={onAddCoin} />
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

                <MaterialFilter
  value={materialFilter}
  onChange={setMaterialFilter}
/>

<SortSelect
  value={sortOrder}
  onChange={setSortOrder}
/>
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
            {visibleCoins.map((coin) => (
    <CoinCard
      key={coin.id}
      coin={coin}
      getMaterialColor={getMaterialColor}
      getMaterialGlow={getMaterialGlow}
      onViewDetails={() => setSelectedCoin(coin)}
      onEdit={() => onEditCoin(coin)}
      onDelete={() => onDeleteCoin(coin.id)}
    />
  ))}
          </div>
        </>
      )}

      <StatsModal
  isOpen={showStats}
  stats={stats}
  onClose={() => setShowStats(false)}
  formatEUR={formatEUR}
  formatMonthLabel={formatMonthLabel}
/>


    </div>
  );
}

export default Catalog;

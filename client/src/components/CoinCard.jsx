export default function CoinCard({
  coin,
  getMaterialColor,
  getMaterialGlow,
  onViewDetails,
  onEdit,
  onDelete,
}) {
  const mat = (coin.material ?? "").toString().toLowerCase()

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-amber-400/30 transition-all duration-300 backdrop-blur-sm">
      {/* Material indicator */}
      <div
        className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br ${getMaterialColor(
          coin.material
        )} shadow-lg ${getMaterialGlow(coin.material)}`}
      ></div>

      {/* Coin Image */}
      <div className="aspect-square bg-white/5 flex items-center justify-center overflow-hidden">
        {coin.image ? (
          <img
            src={coin.image}
            alt={coin.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = "none"
              const fallback = e.currentTarget.nextSibling
              if (fallback) fallback.style.display = "flex"
            }}
          />
        ) : null}

        <div
          className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getMaterialColor(
            coin.material
          )}/20 ${coin.image ? "hidden" : ""}`}
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
            className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getMaterialColor(
              coin.material
            )}/20 text-white/70 font-light tracking-wide border`}
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
            onClick={onViewDetails}
            className="flex-1 text-xs font-light tracking-widest uppercase text-white/50 hover:text-white/70 transition-colors"
          >
            View Details
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            className="px-3 py-1 text-xs font-light tracking-widest uppercase text-amber-400/70 hover:text-amber-400 border border-amber-400/30 hover:border-amber-400/50 rounded transition-colors"
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="px-3 py-1 text-xs font-light tracking-widest uppercase text-red-400/70 hover:text-red-400 border border-red-400/30 hover:border-red-400/50 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

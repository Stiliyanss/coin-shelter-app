function CoinDetails({ coin, onBack, onEdit, onDelete }) {
  const getMaterialColor = (material) => {
  const m = (material ?? '').toString().toLowerCase()
  switch (m) {
    case 'gold': return 'from-amber-400 to-yellow-600'
    case 'silver': return 'from-slate-300 to-slate-500'
    case 'platinum': return 'from-gray-300 to-gray-500'
    case 'copper': return 'from-orange-600 to-red-700'
    default: return 'from-white/20 to-white/40'
  }
}

const getMaterialGlow = (material) => {
  const m = (material ?? '').toString().toLowerCase()
  switch (m) {
    case 'gold': return 'shadow-amber-500/50'
    case 'silver': return 'shadow-slate-400/50'
    case 'platinum': return 'shadow-gray-400/50'
    case 'copper': return 'shadow-orange-500/50'
    default: return 'shadow-white/20'
  }
}

  const getMaterialBorderColor = (material) => {
    switch (material.toLowerCase()) {
      case 'gold':
        return 'rgba(251, 191, 36, 0.3)'
      case 'silver':
        return 'rgba(148, 163, 184, 0.3)'
      case 'platinum':
        return 'rgba(156, 163, 175, 0.3)'
      case 'copper':
        return 'rgba(234, 88, 12, 0.3)'
      default:
        return 'rgba(255, 255, 255, 0.1)'
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="mb-8 text-white/40 hover:text-white/70 transition-colors flex items-center gap-2 group"
      >
        <span className="text-xl">←</span>
        <span className="text-sm font-light tracking-widest uppercase">Back to Catalog</span>
      </button>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        {/* Coin Image Section */}
        <div className="relative">
          {coin.image ? (
            <div className="aspect-video bg-white/5 flex items-center justify-center overflow-hidden">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className={`w-full h-full hidden items-center justify-center bg-gradient-to-br ${getMaterialColor(coin.material)}/20`}>
                <span className="text-8xl opacity-30">🪙</span>
              </div>
            </div>
          ) : (
            <div className={`aspect-video flex items-center justify-center bg-gradient-to-br ${getMaterialColor(coin.material)}/20`}>
              <span className="text-8xl opacity-30">🪙</span>
            </div>
          )}
          
          {/* Material indicator */}
          <div className={`absolute top-6 right-6 w-4 h-4 rounded-full bg-gradient-to-br ${getMaterialColor(coin.material)} shadow-lg ${getMaterialGlow(coin.material)}`}></div>
        </div>

        {/* Coin Information Section */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-white/90 mb-4">
              {coin.name}
            </h1>
            
            <div className="flex items-center gap-4 flex-wrap">
              <span 
                className={`text-sm px-4 py-2 rounded-full bg-gradient-to-r ${getMaterialColor(coin.material)}/20 text-white/70 font-light tracking-wide border`}
                style={{ borderColor: getMaterialBorderColor(coin.material) }}
              >
                {coin.material}
              </span>
              <div className="text-3xl font-light text-white/90">
                €{parseFloat(coin.price || 0).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Description Section */}
          {coin.description && (
            <div className="mb-8 pt-8 border-t border-white/10">
              <h2 className="text-sm font-light tracking-widest uppercase text-white/50 mb-4">
                Description
              </h2>
              <p className="text-base font-light text-white/70 leading-relaxed">
                {coin.description}
              </p>
            </div>
          )}

          {/* Additional Details Section */}
          <div className="pt-8 border-t border-white/10">
            <h2 className="text-sm font-light tracking-widest uppercase text-white/50 mb-6">
              Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-light tracking-widest uppercase text-white/40 mb-2">
                  Material
                </p>
                <p className="text-base font-light text-white/70">
                  {coin.material || '—'}
                </p>
              </div>
              <div>
                <p className="text-xs font-light tracking-widest uppercase text-white/40 mb-2">
                  Value
                </p>
                <p className="text-base font-light text-white/70">
                  €{parseFloat(coin.price || 0).toFixed(2)}
                </p>
              </div>
              {coin.mint && (
                <div>
                  <p className="text-xs font-light tracking-widest uppercase text-white/40 mb-2">
                    Mint
                  </p>
                  <p className="text-base font-light text-white/70">
                    {coin.mint}
                  </p>
                </div>
              )}
              {coin.country && (
                <div>
                  <p className="text-xs font-light tracking-widest uppercase text-white/40 mb-2">
                    Country
                  </p>
                  <p className="text-base font-light text-white/70">
                    {coin.country}
                  </p>
                </div>
              )}
              {coin.year && (
                <div>
                  <p className="text-xs font-light tracking-widest uppercase text-white/40 mb-2">
                    Year
                  </p>
                  <p className="text-base font-light text-white/70">
                    {coin.year}
                  </p>
                </div>
              )}
              {coin.weight && (
                <div>
                  <p className="text-xs font-light tracking-widest uppercase text-white/40 mb-2">
                    Weight
                  </p>
                  <p className="text-base font-light text-white/70">
                    {coin.weight} g
                  </p>
                </div>
              )}
              {coin.diameter && (
                <div>
                  <p className="text-xs font-light tracking-widest uppercase text-white/40 mb-2">
                    Diameter
                  </p>
                  <p className="text-base font-light text-white/70">
                    {coin.diameter} mm
                  </p>
                </div>
              )}
              {coin.pieces && (
                <div>
                  <p className="text-xs font-light tracking-widest uppercase text-white/40 mb-2">
                    Pieces
                  </p>
                  <p className="text-base font-light text-white/70">
                    {coin.pieces}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs font-light tracking-widest uppercase text-white/40 mb-2">
                  Certificate
                </p>
                <p className="text-base font-light text-white/70">
                  {coin.certificate ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 border-t border-white/10 flex gap-4">
            <button
              onClick={() => {
                onEdit(coin)
                onBack()
              }}
              className="flex-1 px-6 py-3 border border-amber-400/50 bg-amber-400/10 hover:bg-amber-400/20 hover:border-amber-400/70 transition-all duration-300 rounded-lg"
            >
              <span className="text-sm font-light tracking-widest uppercase text-white/90">
                Edit Coin
              </span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this coin?')) {
                  onDelete(coin.id)
                  onBack()
                }
              }}
              className="flex-1 px-6 py-3 border border-red-400/50 bg-red-400/10 hover:bg-red-400/20 hover:border-red-400/70 transition-all duration-300 rounded-lg"
            >
              <span className="text-sm font-light tracking-widest uppercase text-white/90">
                Delete Coin
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinDetails

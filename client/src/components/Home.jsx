
export default function Home({
  isAuthenticated,
  coinsCount,
  onAddCoin,
  onGoCatalog,
}) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-3xl font-light tracking-wide text-white/80 mb-4">
          Welcome to Coins Shelter
        </h2>

        <p className="text-sm text-white/40 font-light tracking-wide max-w-sm mb-12 leading-relaxed">
          Manage your coin collection with ease. Add coins, view your catalog, and keep track of your valuable collection.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onAddCoin}
            disabled={!isAuthenticated}
            className={`w-full sm:w-auto group relative px-8 py-3 border backdrop-blur-sm transition-all duration-300
              ${
                isAuthenticated
                  ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-400/50'
                  : 'border-white/10 bg-white/5 opacity-40 cursor-not-allowed'
              }`}
          >
            <span className="text-sm font-light tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
              Add Coin
            </span>
          </button>

          {coinsCount > 0 && (
            <button
              onClick={onGoCatalog}
              className="w-full sm:w-auto group relative px-8 py-3 border border-amber-400/50 bg-amber-400/10 hover:bg-amber-400/20 hover:border-amber-400/70 transition-all duration-300"
            >
              <span className="text-sm font-light tracking-widest uppercase text-white/90">
                View Catalog
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

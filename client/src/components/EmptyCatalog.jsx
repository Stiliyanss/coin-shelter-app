export default function EmptyCatalog({ onAddCoin }) {
  return (
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
  )
}

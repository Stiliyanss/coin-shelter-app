export default function Header({
  currentPage,
  setCurrentPage,
  isAuthenticated,
  isAuthLoading,
  displayName,
  onAddCoin,
  onLogin,
  onLogout,
}) {
  return (
    <header className="border-b border-white/5 backdrop-blur-sm bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center text-xl shadow-lg shadow-amber-500/50">
              🪙
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-light tracking-wider text-white/90">
                COINS SHELTER
              </h1>
              <p className="text-xs text-white/40 font-light tracking-widest uppercase mt-1">
                Coin Collection Manager
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-start sm:justify-end gap-2 sm:gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-light tracking-widest uppercase transition-colors ${
                currentPage === 'home'
                  ? 'text-white/90 border-b border-amber-400/50 pb-1'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentPage('catalog')}
              className={`text-sm font-light tracking-widest uppercase transition-colors ${
                currentPage === 'catalog'
                  ? 'text-white/90 border-b border-amber-400/50 pb-1'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              Catalog
            </button>

            <button
              onClick={onAddCoin}
              disabled={!isAuthenticated}
              className={`px-4 sm:px-6 py-2 border rounded-lg transition-all duration-300
                ${
                  isAuthenticated
                    ? 'border-amber-400/50 bg-amber-400/10 hover:bg-amber-400/20 hover:border-amber-400/70'
                    : 'border-white/10 bg-white/5 opacity-40 cursor-not-allowed'
                }`}
            >
              <span className="text-xs font-light tracking-widest uppercase text-white/90">
                + Add Coin
              </span>
            </button>

            <div className="hidden sm:block h-6 w-px bg-white/10"></div>

            {isAuthLoading ? (
              <div className="text-xs font-light text-white/50">Loading...</div>
            ) : isAuthenticated ? (
              <>
                <div className="text-xs font-light text-white/50">{displayName}</div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-lg"
                >
                  <span className="text-xs font-light tracking-widest uppercase text-white/70">
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-lg"
              >
                <span className="text-xs font-light tracking-widest uppercase text-white/70">
                  Login
                </span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
